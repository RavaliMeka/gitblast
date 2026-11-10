"use client";

import { useMemo, useRef, useState, type MouseEvent } from "react";
import { num } from "@/lib/format";
import type { Impacted, PRFile } from "@/lib/types";
import { arcPath, BAND, buildRadar, CENTER, CORE, LABEL, polar, RINGS, SIZE, trace, type RadarNode, type RadarSector, type State } from "./radar";

const STATE_COLOR: Record<State, string> = {
  changed: "var(--changed)",
  added: "var(--added)",
  removed: "var(--removed)",
  ripple1: "var(--ripple1)",
  ripple2: "var(--ripple2)",
  ripple3: "var(--ripple3)",
};

const STATE_LABEL: Record<State, string> = {
  changed: "Changed here",
  added: "Added here",
  removed: "Deleted here",
  ripple1: "Imports the change directly",
  ripple2: "Two imports away from the change",
  ripple3: "Three imports away from the change",
};

// Room around the circle for the area names, which are set large enough to read once the drawing is scaled down.
const PAD_X = 96;
const PAD_Y = 40;
const LABEL_CHARS = 10;

type Tip = { x: number; y: number } & ({ node: RadarNode } | { sector: RadarSector });

export function BlastRadar({
  files,
  impacted,
  edges,
  totals,
  active,
  onActive,
  fileUrl,
  onPick,
  core,
}: {
  files: PRFile[];
  impacted: Impacted[];
  edges: [string, string][];
  totals: Record<string, number>;
  active: string | null;
  onActive: (path: string | null) => void;
  fileUrl: (path: string) => string;
  /** Called when a file is clicked. Without it, a click opens the file on GitHub. */
  onPick?: (path: string) => void;
  /** Replaces the count of changed files at the centre. */
  core?: { n: string; k: string };
}) {
  const radar = useMemo(() => buildRadar(files, impacted, edges, totals, Boolean(core)), [files, impacted, edges, totals, core]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<Tip | null>(null);
  const [area, setArea] = useState<string | null>(null);
  // Bumping this remounts the shockwave so it plays again.
  const [wave, setWave] = useState(0);

  const lit = useMemo(() => (active && radar.byPath.has(active) ? trace(radar, active) : null), [radar, active]);
  const dimmed = (n: RadarNode) => (lit ? !lit.has(n.path) : area !== null && n.area !== area);

  function place(e: MouseEvent) {
    const box = wrapRef.current?.getBoundingClientRect();
    return box ? { x: e.clientX - box.left, y: e.clientY - box.top } : { x: 0, y: 0 };
  }

  return (
    <div className="radar" ref={wrapRef} onMouseLeave={() => { setTip(null); setArea(null); onActive(null); }}>
      <svg viewBox={`-${PAD_X} -${PAD_Y} ${SIZE + PAD_X * 2} ${SIZE + PAD_Y * 2}`} role="img" aria-label="Blast radar: the changed files at the centre, and the files that import them on rings further out, grouped by area">
        <defs>
          <radialGradient id="radar-core" cx="40%" cy="35%" r="70%">
            <stop offset="0" stopColor="#ffb340" />
            <stop offset="0.55" stopColor="#ff3b30" />
            <stop offset="1" stopColor="#d70040" />
          </radialGradient>
        </defs>

        {/* Ring guides */}
        {RINGS.map((r, i) => (
          <circle key={r} className="radar-guide" cx={CENTER} cy={CENTER} r={r} style={{ animationDelay: `${i * 220}ms` }} />
        ))}

        {/* Shockwave */}
        <g key={wave} className="radar-wave" aria-hidden="true">
          <circle cx={CENTER} cy={CENTER} r={CORE} />
          <circle cx={CENTER} cy={CENTER} r={CORE} style={{ animationDelay: "0.45s" }} />
        </g>

        {/* Slices: a track per area, filled by the share of the area the change reaches */}
        {radar.sectors.map((s) => {
          const share = Math.min(1, (s.changed + s.impacted) / Math.max(1, s.total));
          const on = area === s.area;
          return (
            <g
              key={s.area}
              className="radar-sector"
              onMouseEnter={(e) => { setArea(s.area); setTip({ ...place(e), sector: s }); }}
              onMouseMove={(e) => setTip({ ...place(e), sector: s })}
              onMouseLeave={() => { setArea(null); setTip(null); }}
            >
              <path className="radar-wedge" d={wedge(s)} style={{ opacity: on ? 1 : 0 }} />
              <path className="radar-track" d={arcPath(BAND, s.start, s.end)} />
              <path className="radar-hit" d={arcPath(BAND, s.start, s.end)} />
              <path
                className="radar-fill"
                d={arcPath(BAND, s.start, s.start + Math.max(0.012, (s.end - s.start) * share))}
                style={{ opacity: area && !on ? 0.3 : 1 }}
              />
              <SectorLabel sector={s} on={on} />
            </g>
          );
        })}

        {/* Import lines */}
        <g className="radar-links">
          {radar.links.map((l, i) => (
            <path
              key={i}
              d={l.d}
              pathLength={1}
              style={{ opacity: lit ? 0.05 : area ? 0.08 : undefined, animationDelay: `${1100 + Math.min(i, 60) * 8}ms` }}
            />
          ))}
        </g>

        {/* The hovered file's import path, drawn afresh each time */}
        {lit && (
          <g key={active} className="radar-trace" aria-hidden="true">
            {radar.links.map((l, i) => lit.has(l.from) && lit.has(l.to) && <path key={i} d={l.d} pathLength={1} />)}
          </g>
        )}

        {/* Files */}
        {radar.nodes.filter((n) => n.r > 0).map((n) => {
          const isActive = active === n.path;
          return (
            <circle
              key={n.path}
              className={`radar-node${n.state === "removed" ? " removed" : ""}`}
              cx={n.x}
              cy={n.y}
              r={isActive ? n.r * 1.35 : n.r}
              style={{
                fill: n.state === "removed" ? "transparent" : STATE_COLOR[n.state],
                stroke: n.state === "removed" ? STATE_COLOR.removed : isActive ? "var(--text)" : "var(--surface)",
                opacity: dimmed(n) ? 0.15 : 1,
                animationDelay: `${n.depth * 320 + 250 + Math.min(n.order, 80) * 6}ms`,
                cursor: n.state === "removed" ? "default" : "pointer",
              }}
              onMouseEnter={(e) => { onActive(n.path); setTip({ ...place(e), node: n }); }}
              onMouseMove={(e) => setTip({ ...place(e), node: n })}
              onMouseLeave={() => { onActive(null); setTip(null); }}
              onClick={() => n.state !== "removed" && (onPick ? onPick(n.path) : window.open(fileUrl(n.path), "_blank", "noopener,noreferrer"))}
            />
          );
        })}

        {/* Core: click to replay the shockwave */}
        <g className="radar-core" onClick={() => setWave((w) => w + 1)}>
          <circle cx={CENTER} cy={CENTER} r={CORE} fill="url(#radar-core)" />
          <text x={CENTER} y={CENTER - 4} className="radar-core-n">{core?.n ?? num(files.length)}</text>
          <text x={CENTER} y={CENTER + 24} className="radar-core-k">{core?.k ?? "changed"}</text>
        </g>
      </svg>

      {tip && (
        <div className={`tooltip${tip.y < 110 ? " below" : ""}`} style={{ left: tip.x, top: tip.y }}>
          {"node" in tip ? (
            <>
              <div className="p">{tip.node.path}</div>
              <div className="s">
                {STATE_LABEL[tip.node.state]}
                {tip.node.via && tip.node.via !== tip.node.path && <> · from <span className="mono">{basename(tip.node.via)}</span></>}
              </div>
            </>
          ) : (
            <>
              <div className="p">{tip.sector.area}</div>
              <div className="s">
                {num(tip.sector.changed)} changed · {num(tip.sector.impacted)} in the ripple · of {num(tip.sector.total)} files (
                {Math.round(((tip.sector.changed + tip.sector.impacted) / Math.max(1, tip.sector.total)) * 100)}%)
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function SectorLabel({ sector, on }: { sector: RadarSector; on: boolean }) {
  const mid = (sector.start + sector.end) / 2;
  const [x, y] = polar(LABEL, mid);
  const cos = Math.cos(mid);
  const anchor = cos > 0.25 ? "start" : cos < -0.25 ? "end" : "middle";
  // Names sit outside the circle, so they are cut to what fits in the margin beside it.
  const name = sector.area.length > LABEL_CHARS ? `${sector.area.slice(0, LABEL_CHARS - 1)}…` : sector.area;
  return (
    <text x={x} y={y + 6} textAnchor={anchor} className={`radar-label${on ? " on" : ""}`}>
      {name}
    </text>
  );
}

/** The whole slice from the core to the band, shown faintly while hovered. */
function wedge(s: RadarSector): string {
  const [x1, y1] = polar(CORE + 8, s.start);
  const [x2, y2] = polar(BAND + 14, s.start);
  const [x3, y3] = polar(BAND + 14, s.end);
  const [x4, y4] = polar(CORE + 8, s.end);
  const large = s.end - s.start > Math.PI ? 1 : 0;
  return `M ${x1} ${y1} L ${x2} ${y2} A ${BAND + 14} ${BAND + 14} 0 ${large} 1 ${x3} ${y3} L ${x4} ${y4} A ${CORE + 8} ${CORE + 8} 0 ${large} 0 ${x1} ${y1} Z`;
}

function basename(p: string): string {
  return p.slice(p.lastIndexOf("/") + 1);
}

export function Legend({ single = false }: { single?: boolean }) {
  const items: [State, string][] = [
    ["changed", single ? "Selected file" : "Changed"],
    ...(single ? [] : ([["added", "Added"], ["removed", "Deleted"]] as [State, string][])),
    ["ripple1", "Imports it"],
    ["ripple2", "2 steps away"],
    ["ripple3", "3 steps away"],
  ];
  return (
    <div className="legend">
      {items.map(([s, label]) => (
        <span key={s}>
          <i className="dot" style={s === "removed" ? { border: "1.5px dashed var(--removed)" } : { background: STATE_COLOR[s] }} />
          {label}
        </span>
      ))}
      <span>
        <i className="legend-band" />
        Share of the area affected
      </span>
    </div>
  );
}
