/* ---------- Props: control-tower theme ---------- */
const SL = "#1f2937", AM = "#ffb703", SK = "#3a86ff", TL = "#2a9d8f", RC = "#e63946", MT = "#6b7c93";
const mono = "DejaVu Sans Mono, monospace";
const svg = (inner, h = 700) => `<svg class="abs" style="left:0;top:0" width="620" height="${h}" viewBox="0 0 620 ${h}">${inner}</svg>`;
const T = (x, y, s, col = SL, size = 28, weight = 800, anchor = "middle", font = "Inter", op = 1) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${font}" font-weight="${weight}" font-size="${size}" fill="${col}" opacity="${clamp(op)}">${s}</text>`;
const grow = (k, inner, x, y) => k <= 0 ? "" : `<g transform="translate(${x} ${y}) scale(${backOut(clamp(k / .4))})">${inner}</g>`;
const pod = (x, y, col = SK, k = 1, r = 26) => grow(k, `<rect x="${-r}" y="${-r}" width="${2 * r}" height="${2 * r}" rx="${r * .35}" fill="${col}"/><rect x="${-r * .5}" y="${-r * .5}" width="${r}" height="${r}" rx="4" fill="#fff" opacity=".45"/>`, x, y);
const tickAt = (x, y, k) => grow(k, `<circle r="15" fill="${TL}"/><path d="M-7 0 l5 6 l9 -11" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>`, x, y);
const plane = (x, y, rot, col = SK, s = 1) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 -26 L7 -6 L30 6 L30 12 L7 6 L5 20 L12 26 L12 30 L0 26 L-12 30 L-12 26 L-5 20 L-7 6 L-30 12 L-30 6 L-7 -6 Z" fill="${col}"/></g>`;
function tower(x, y, t) {
  return `<g transform="translate(${x} ${y})"><path d="M-22 0 L-14 -190 H14 L22 0 Z" fill="#cbd5e1"/><path d="M-14 -190 H14 L22 0 H8 L2 -190 Z" fill="#b6c2d1"/>
    <path d="M-58 -190 L-46 -250 H46 L58 -190 Z" fill="${SL}"/><path d="M-44 -240 H44 L50 -204 H-50 Z" fill="#9bd4ff"/>
    ${[-25, 0, 25].map(v => `<path d="M${v} -240 V-204" stroke="${SL}" stroke-width="4"/>`).join("")}
    <rect x="-50" y="-262" width="100" height="14" rx="4" fill="${AM}"/><path d="M0 -262 V-300" stroke="${SL}" stroke-width="5"/>
    <g transform="translate(0 -300) rotate(${t * 120})"><path d="M0 0 L46 -10 A48 48 0 0 1 46 10 Z" fill="${TL}" opacity=".5"/></g><circle cy="-300" r="7" fill="${RC}"/></g>`;
}
const runway = (x, y, w = 250) => `<rect x="${x}" y="${y - 22}" width="${w}" height="44" rx="6" fill="#4a5568"/>${[0, 1, 2, 3, 4].map(i => `<rect x="${x + 22 + i * (w - 30) / 5}" y="${y - 3}" width="26" height="6" fill="#fff"/>`).join("")}`;
const NX = [40, 220, 400];
function nodeBox(i, k = 1, down = false) {
  return grow(k, `<rect x="-80" y="-115" width="160" height="230" rx="16" fill="${down ? "#fde2e4" : "#fff"}" stroke="${down ? RC : "#cbd5e1"}" stroke-width="4"/>
    <rect x="-80" y="-115" width="160" height="40" rx="16" fill="${down ? RC : SL}"/><rect x="-80" y="-90" width="160" height="15" fill="${down ? RC : SL}"/>
    <text x="0" y="-86" text-anchor="middle" font-family="${mono}" font-weight="700" font-size="20" fill="#fff">${down ? "down" : "node " + (i + 1)}</text>`, NX[i] + 90, 470);
}
// the cluster, built up in stages: 0 boundary, 1 nodes, 2 pods, 3 control plane
function cluster(stage, lt) {
  const k = (st, d = 0) => stage > st ? 1 : stage === st ? lt - d : 0;
  return `<rect x="16" y="120" width="588" height="490" rx="28" fill="rgba(255,255,255,.55)" stroke="${SK}" stroke-width="4" stroke-dasharray="14 10" opacity="${clamp(k(0) * 2)}"/>` +
    T(56, 160, "cluster", SK, 24, 800, "start", mono, k(0) * 2) +
    [0, 1, 2].map(i => nodeBox(i, k(1, .2 + i * .3))).join("") +
    [0, 1, 2].map(i => pod(NX[i] + 60, 450, SK, k(2, .3 + i * .25)) + pod(NX[i] + 120, 450, TL, k(2, .5 + i * .25)) + pod(NX[i] + 90, 515, AM, k(2, .9 + i * .25))).join("") +
    (k(3) > 0 ? [0, 1, 2].map(i => `<path d="M310 290 L${NX[i] + 90} 352" stroke="${AM}" stroke-width="4" stroke-dasharray="6 8" opacity="${clamp((k(3) - .5) * 2)}"/>`).join("") +
      grow(k(3), `<rect x="-150" y="-50" width="300" height="100" rx="18" fill="${SL}"/><text x="0" y="-4" text-anchor="middle" font-family="Inter" font-weight="800" font-size="28" fill="${AM}">control plane</text><text x="0" y="30" text-anchor="middle" font-family="${mono}" font-size="20" fill="#cbd5e1">the brain</text>`, 310, 240) : "");
}

const P = {
  many: lt => svg(lt < 2 ? pod(310, 300, SK, lt - .2, 70) + T(310, 430, "1 container", MT, 28, 700, "middle", mono, (lt - .5) / .3)
    : Array.from({ length: 48 }, (_, i) => pod(64 + (i % 8) * 70, 130 + Math.floor(i / 8) * 76, [SK, TL, AM][i % 3], lt - 2 - i * .025, 24)).join("") + T(310, 640, "× 100 ?!", RC, 44, 900, "middle", "Inter", (lt - 3.2) / .3)),

  who: lt => svg(Array.from({ length: 24 }, (_, i) => { const bad = [3, 10, 17, 20].includes(i) && lt > .5; return pod(64 + (i % 8) * 70, 110 + Math.floor(i / 8) * 76, bad ? RC : [SK, TL, AM][i % 3], 1, 24) + (bad ? T(64 + (i % 8) * 70, 120 + Math.floor(i / 8) * 76, "×", "#fff", 30, 900) : ""); }).join("") +
    T(310, 380, "crashed", RC, 28, 800, "middle", mono, (lt - .6) / .3) +
    `<g opacity="${clamp((lt - 2) / .3)}"><path d="M60 620 H570 M60 620 V430" stroke="${MT}" stroke-width="4"/><path d="M60 600 L200 590 L300 570 L380 480 L470 440 L560 432" fill="none" stroke="${RC}" stroke-width="7" stroke-linecap="round" stroke-dasharray="620" stroke-dashoffset="${620 * (1 - clamp((lt - 2.2) / 1))}"/></g>` +
    T(330, 660, "traffic spike", MT, 24, 700, "middle", mono, (lt - 2.6) / .3)),

  k8s: lt => svg(`<g transform="translate(310 300)"><g style="${pop(lt, .1)}"><g transform="rotate(${lt * 50})">${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path d="M0 0 L0 -150" stroke="${AM}" stroke-width="16" stroke-linecap="round" transform="rotate(${i * 45})"/>`).join("")}<circle r="104" fill="none" stroke="${SL}" stroke-width="22"/><circle r="30" fill="${SL}"/></g></g></g>` +
    T(310, 540, "Kubernetes", SL, 60, 900, "middle", "Inter", (lt - .5) / .3) + T(310, 590, "“K8s” for short", MT, 26, 700, "middle", mono, (lt - .8) / .3)),

  tower: lt => {
    const ys = [190, 370, 550];
    return svg(tower(110, 640, lt) + ys.map(y => runway(330, y)).join("") +
      ys.map((y, i) => { const d = 3.2 + i * .9, k = easeOut(clamp((lt - d) / 1.6)); if (lt < d) return "";
        const x = lerp(700, 455, k), yy = lerp(y - 190, y, k);
        return (lt > 5 && k < 1 ? `<path d="M110 340 L${x} ${yy}" stroke="${TL}" stroke-width="3" stroke-dasharray="6 8"/>` : "") + plane(x, yy, lerp(235, 270, k), [SK, TL, AM][i], 1.15); }).join("") +
      T(455, 640, "lands where there's room", MT, 22, 700, "middle", mono, (lt - 5.6) / .3));
  },

  c0: lt => svg(cluster(0, lt)), c1: lt => svg(cluster(1, lt)), c2: lt => svg(cluster(2, lt)), c3: lt => svg(cluster(3, lt)),

  want: lt => svg(`<g transform="translate(310 200)"><g style="${pop(lt, .2)}"><rect x="-260" y="-70" width="520" height="130" rx="26" fill="#fff" stroke="#cbd5e1" stroke-width="4"/>${T(0, 12, "“run on machine 3”", MT, 34, 700, "middle", mono)}</g></g>` +
    (lt > 1.6 ? `<path d="M70 200 H${70 + 480 * clamp((lt - 1.6) / .4)}" stroke="${RC}" stroke-width="10" stroke-linecap="round"/>` : "") +
    `<g transform="translate(310 480)"><g style="${pop(lt, 3)}"><rect x="-240" y="-110" width="480" height="220" rx="26" fill="${SL}"/>${T(0, -40, "I want:", "#cbd5e1", 30, 700, "middle", mono)}${T(0, 40, "replicas: 3", AM, 56, 900, "middle", mono)}</g></g>`),

  keeps: lt => svg(`<rect x="16" y="120" width="588" height="490" rx="28" fill="rgba(255,255,255,.55)" stroke="${SK}" stroke-width="4" stroke-dasharray="14 10"/>` + [0, 1, 2].map(i => nodeBox(i)).join("") +
    [0, 1, 2].map(i => pod(NX[i] + 90, 480, SK, lt - .4 - i * .5, 34) + tickAt(NX[i] + 132, 440, lt - .8 - i * .5)).join("") +
    T(310, 240, "wanted: 3 · running: 3", TL, 30, 900, "middle", mono, (lt - 2.2) / .3)),

  heal: lt => { const mv = easeOut(clamp((lt - 1.6) / .8)), down = lt > .5;
    return svg(`<rect x="16" y="120" width="588" height="490" rx="28" fill="rgba(255,255,255,.55)" stroke="${SK}" stroke-width="4" stroke-dasharray="14 10"/>` +
      nodeBox(0) + nodeBox(1, 1, down) + nodeBox(2) + pod(NX[0] + 90, 480, SK, 1, 34) + pod(NX[2] + 90, 450, SK, 1, 30) +
      pod(lerp(NX[1] + 90, NX[2] + 90, mv), lerp(480, 525, mv), down && mv < 1 ? AM : SK, 1, lerp(34, 30, mv)) +
      T(310, 240, mv >= 1 ? "moved ✓ still 3 running" : down ? "node 2 is down!" : "", mv >= 1 ? TL : RC, 30, 900, "middle", mono)); },

  recap: lt => svg([["Cluster", "the whole airport", SK], ["Node", "a machine", TL], ["Pod", "runs your container", AM], ["Control plane", "the tower", SL]].map(([w, sub, c], i) =>
    `<g transform="translate(310 ${130 + i * 140})"><g style="${pop(lt, .1 + i * .7)}"><rect x="-270" y="-55" width="540" height="110" rx="20" fill="#fff" stroke="${c}" stroke-width="5"/><rect x="-270" y="-55" width="26" height="110" rx="10" fill="${c}"/>${T(-220, 0, w, SL, 36, 900, "start")}${T(-220, 34, sub, MT, 22, 700, "start", mono)}</g></g>`).join("")),

  next: lt => svg(`<g transform="translate(310 200)"><g style="${pop(lt, .2)}"><rect x="-270" y="-100" width="540" height="200" rx="24" fill="#fff" stroke="#cbd5e1" stroke-width="4"/>${T(-230, -30, "Part 2", MT, 28, 800, "start", mono)}${T(-230, 40, "Pods & self-healing", SL, 44, 900, "start")}</g></g>` +
    `<g transform="translate(310 440)"><g style="${pop(lt, 2.4)}"><rect x="-180" y="-52" width="360" height="104" rx="52" fill="${SL}"/>${T(0, 16, "+ Follow", AM, 44, 900)}</g></g>`),
};
