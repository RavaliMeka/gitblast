"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { areaOf } from "@/lib/area";
import { compact, num, plural } from "@/lib/format";
import { rank, reachOf, type Ranked } from "@/lib/graph";
import { isTest, langOf } from "@/lib/lang";
import { resolveFocus } from "@/lib/route";
import type { Impacted, PRFile, RepoMap } from "@/lib/types";
import { useApi } from "@/lib/useApi";
import { BlastRadar, Legend } from "./BlastRadar";
import { CopyLink } from "./CopyLink";
import { ErrorState, Loading, Stat } from "./States";

const MAX_SHOWN = 400;
const MAX_EDGES = 900;
const TOP_SHOWN = 10;

/** With `secondary`, the view sits under another map on the same page and takes a smaller heading. */
export function MapView({ owner, repo, focus, secondary = false }: { owner: string; repo: string; focus?: string[]; secondary?: boolean }) {
  const state = useApi<RepoMap>(`/api/map?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`);
  if (state.status === "loading") {
    return (
      <Loading
        title={`Mapping ${owner}/${repo}`}
        hint="Downloading the source and following every import. Large repositories can take up to a minute."
        elapsed={state.elapsed}
      />
    );
  }
  if (state.status === "error") return <ErrorState error={state.error} githubUrl={`https://github.com/${owner}/${repo}`} />;
  return <Explorer map={state.data} focus={focus} secondary={secondary} />;
}

function Explorer({ map, focus, secondary }: { map: RepoMap; focus?: string[]; secondary: boolean }) {
  const Title = secondary ? "h2" : "h1";
  const { repo } = map;
  const home = `/${repo.owner}/${repo.repo}`;
  const users = useMemo(() => {
    const m = new Map<string, string[]>();
    for (const [from, to] of map.edges) {
      const list = m.get(map.files[to]);
      if (list) list.push(map.files[from]);
      else m.set(map.files[to], [map.files[from]]);
    }
    return m;
  }, [map]);

  const target = useMemo(() => (focus ? resolveFocus(focus, map.files) : {}), [focus, map.files]);
  const folder = target.folder;
  const ranked = useMemo(() => (folder ? rank(users, (p) => p.startsWith(`${folder}/`)) : map.top), [folder, users, map.top]);
  const [center, setCenter] = useState(target.file ?? ranked[0]?.path ?? map.files[0] ?? "");
  const [active, setActive] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [all, setAll] = useState(false);

  // Keep the address in step with the file at the centre, so the link can be shared
  // and still maps back to the same file on GitHub.
  const [picked, setPicked] = useState(false);
  useEffect(() => {
    if (picked) window.history.replaceState(null, "", `${home}/blob/${[repo.defaultBranch, ...center.split("/")].map(encodeURIComponent).join("/")}`);
  }, [picked, center, home, repo.defaultBranch]);
  const pick = (path: string) => {
    setCenter(path);
    setPicked(true);
    setActive(null);
  };

  const view = useMemo(() => {
    const reach = reachOf(center, users);
    const all = [...reach.entries()].sort((a, b) => a[1].depth - b[1].depth || a[0].localeCompare(b[0]));
    const impacted: Impacted[] = all.slice(0, MAX_SHOWN).map(([path, r]) => ({ path, depth: r.depth, via: center, test: isTest(path) }));
    const shown = new Set([center, ...impacted.map((i) => i.path)]);
    const edges: [string, string][] = [];
    for (const to of shown) for (const from of users.get(to) ?? []) if (shown.has(from) && edges.length < MAX_EDGES) edges.push([from, to]);
    const lang = langOf(center);
    const file: PRFile = { path: center, status: "modified", additions: 0, deletions: 0, role: "source", lang: lang.name, color: lang.color, usedBy: 0, reach: reach.size };
    return {
      files: [file],
      impacted,
      edges,
      total: reach.size,
      core: { n: num(reach.size), k: "reached" },
      direct: all.filter(([, r]) => r.depth === 1).length,
      tests: all.filter(([p]) => isTest(p)).map(([p]) => p),
    };
  }, [center, users]);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? map.files.filter((f) => f.toLowerCase().includes(q)).slice(0, 12) : null;
  }, [query, map.files]);

  const fileUrl = (path: string) => `https://github.com/${repo.owner}/${repo.repo}/blob/${map.sha}/${path.split("/").map(encodeURIComponent).join("/")}`;
  const missed = focus && !target.file && !target.folder;

  if (map.files.length === 0) {
    return (
      <div className="card error-box">
        <h1>No imports to follow</h1>
        <p>
          gitblast couldn&apos;t find any imports between files in {repo.owner}/{repo.repo}. It may be written in a language gitblast
          doesn&apos;t read yet, or hold no code.
        </p>
        <div className="actions">
          <Link href={`${home}/timelapse`} className="btn btn-primary">
            Watch its time-lapse
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="page-head">
        <Title className="page-title">What breaks if this changes</Title>
        <div className="meta-row">
          {repo.description && !secondary && <span style={{ flexBasis: "100%", color: "var(--muted)" }}>{repo.description}</span>}
          <span>★ {compact(repo.stars)}</span>
          <span>{plural(map.files.length, "connected file")}</span>
          <span>{plural(map.edges.length, "import")}</span>
          <span className="head-actions">
            <CopyLink />
            <a className="btn btn-primary btn-sm" href={fileUrl(center)} target="_blank" rel="noopener noreferrer">
              Open file on GitHub ↗
            </a>
          </span>
        </div>
      </header>

      {(map.partial || missed) && (
        <div className="notice" role="note">
          <span aria-hidden="true">⚠</span>
          <span>
            {missed
              ? "That file or folder isn't part of the import graph: nothing imports it, and it imports nothing gitblast can follow. Showing the most load-bearing file instead."
              : "This repository is very large, so only part of it was read. The real reach may be bigger than shown."}
          </span>
        </div>
      )}

      <section className="report-grid">
        <div className="stack map-col">
        <div className="card map-card">
          <div className="map-head">
            <h2 className="map-file" title={center}>
              <bdi>{center}</bdi>
            </h2>
            <span className="faint" style={{ fontSize: 12 }}>Click a file to put it at the centre</span>
          </div>
          <BlastRadar
            key={center}
            files={view.files}
            impacted={view.impacted}
            edges={view.edges}
            totals={map.areaTotals}
            active={active}
            onActive={setActive}
            fileUrl={fileUrl}
            onPick={pick}
            core={view.core}
          />
          <Legend single />
        </div>
        <FolderGrid map={map} home={home} />
        </div>

        <div className="stack">
          <div className="card card-pad">
            <h2>If this file changes</h2>
            <div className="stat-grid stat-grid-3">
              <Stat v={num(view.total)} k="files reached" />
              <Stat v={num(view.direct)} k="import it directly" />
              <Stat v={num(view.tests.length)} k="tests to run" />
            </div>
            {view.total === 0 && <p className="muted" style={{ margin: "16px 0 0" }}>Nothing imports this file, so a change stays inside it.</p>}
            {view.total > MAX_SHOWN && (
              <p className="faint" style={{ fontSize: 12.5, margin: "12px 0 0" }}>
                The radar shows the nearest {num(MAX_SHOWN)} of {num(view.total)}.
              </p>
            )}
          </div>

          <div className="card card-pad">
            <h2>{folder ? `Most load-bearing in ${folder}` : "Most load-bearing files"}</h2>
            {folder && (
              <p className="muted" style={{ margin: "0 0 12px", fontSize: 13 }}>
                <Link href={home}>Show the whole repository</Link>
              </p>
            )}
            <div className="urlbox compact">
              <label htmlFor="map-find" className="sr-only">Find a file</label>
              <input id="map-find" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find any file…" autoComplete="off" spellCheck={false} />
            </div>
            {matches ? (
              <ol className="rank">
                {matches.length === 0 && <li className="faint" style={{ padding: "8px 10px", fontSize: 13 }}>No connected file matches.</li>}
                {matches.map((path) => (
                  <RankRow key={path} row={{ path, reach: -1, direct: users.get(path)?.length ?? 0 }} max={0} on={path === center} onPick={pick} onActive={setActive} />
                ))}
              </ol>
            ) : (
              <ol className="rank">
                {(all ? ranked : ranked.slice(0, TOP_SHOWN)).map((r, i) => (
                  <RankRow key={r.path} index={i + 1} row={r} max={ranked[0].reach} on={r.path === center} onPick={pick} onActive={setActive} />
                ))}
              </ol>
            )}
            {!matches && ranked.length > TOP_SHOWN && (
              <button className="btn btn-ghost more-btn" onClick={() => setAll(!all)}>
                {all ? "Show fewer" : `Show top ${ranked.length}`}
              </button>
            )}
          </div>

          {view.tests.length > 0 && (
            <div className="card card-pad">
              <h2>
                Tests to run <span className="count">{view.tests.length}</span>
              </h2>
              <ul className="path-list">
                {view.tests.slice(0, 20).map((t) => <li key={t} title={t}>{t}</li>)}
              </ul>
              {view.tests.length > 20 && <p className="faint" style={{ fontSize: 12.5, margin: "8px 0 0" }}>and {view.tests.length - 20} more</p>}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

const GRID_AREAS = 8;

/** Which areas of the repository import which: one square per pair, darker for more imports. */
function FolderGrid({ map, home }: { map: RepoMap; home: string }) {
  const { areas, count, max } = useMemo(() => {
    const count = new Map<string, number>();
    const weight = new Map<string, number>();
    for (const [from, to] of map.edges) {
      const a = areaOf(map.files[from]);
      const b = areaOf(map.files[to]);
      count.set(`${a}>${b}`, (count.get(`${a}>${b}`) ?? 0) + 1);
      if (a !== b) for (const x of [a, b]) weight.set(x, (weight.get(x) ?? 0) + 1);
    }
    const areas = [...weight.entries()].sort((x, y) => y[1] - x[1] || x[0].localeCompare(y[0])).slice(0, GRID_AREAS).map(([a]) => a);
    const max = Math.max(1, ...areas.flatMap((a) => areas.filter((b) => b !== a).map((b) => count.get(`${a}>${b}`) ?? 0)));
    return { areas, count, max };
  }, [map]);
  if (areas.length < 2) return null;
  const link = (area: string) => (area.startsWith("(") ? home : `${home}/tree/${[map.repo.defaultBranch, ...area.split("/")].map(encodeURIComponent).join("/")}`);

  return (
    <div className="card card-pad">
      <h2>How the areas depend on each other</h2>
      <p className="muted" style={{ margin: "0 0 14px", fontSize: 13 }}>
        Each square counts the imports from the area on the left into the area on top. A full column is an area everything leans on.
      </p>
      <div className="dep-scroll">
        <table className="dep-grid">
          <thead>
            <tr>
              <td />
              {areas.map((a) => (
                <th key={a} scope="col" title={a}>
                  <span>{a}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {areas.map((from) => (
              <tr key={from}>
                <th scope="row" title={from}>
                  <Link href={link(from)}>{from}</Link>
                </th>
                {areas.map((to) => {
                  const n = count.get(`${from}>${to}`) ?? 0;
                  const t = n / max;
                  return from === to ? (
                    <td key={to} className="self" title={`${num(n)} imports inside ${from}`}>{n > 0 ? num(n) : ""}</td>
                  ) : (
                    <td
                      key={to}
                      title={`${from} imports from ${to} ${num(n)} time${n === 1 ? "" : "s"}`}
                      style={n > 0 ? { background: `color-mix(in srgb, var(--changed) ${Math.round(12 + t * 78)}%, transparent)`, color: t > 0.45 ? "#fff" : undefined } : undefined}
                    >
                      {n > 0 ? num(n) : ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RankRow({
  row,
  index,
  max,
  on,
  onPick,
  onActive,
}: {
  row: Ranked;
  index?: number;
  max: number;
  on: boolean;
  onPick: (path: string) => void;
  onActive: (path: string | null) => void;
}) {
  return (
    <li>
      <button
        type="button"
        className="rank-row"
        aria-pressed={on}
        title={row.path}
        onClick={() => onPick(row.path)}
        onMouseEnter={() => onActive(row.path)}
        onMouseLeave={() => onActive(null)}
      >
        <span className="i">{index ?? "·"}</span>
        <span className="p">
          <bdi>{row.path}</bdi>
        </span>
        <span className="n">{row.reach >= 0 ? `reaches ${num(row.reach)}` : `${num(row.direct)} import it`}</span>
        {max > 0 && (
          <span className="bar">
            <i style={{ width: `${(row.reach / max) * 100}%` }} />
          </span>
        )}
      </button>
    </li>
  );
}
