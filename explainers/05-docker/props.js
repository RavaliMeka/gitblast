/* ---------- Props: Harbor theme (cargo containers on a light port) ---------- */
const DB = "#1d63ed", OR = "#ff7a2f", GR = "#1fa971", RD = "#e5484d", NV = "#0b2545", MU = "#5b7089";
const svg = (inner, h = 640) => `<svg class="abs" style="left:0;top:10px" width="600" height="${h}" viewBox="0 0 600 ${h}">${inner}</svg>`;
const T = (x, y, s, col = NV, size = 30, weight = 800, anchor = "start", font = "Inter", op = 1) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${font}" font-weight="${weight}" font-size="${size}" fill="${col}" opacity="${clamp(op)}">${s}</text>`;
const mono = "DejaVu Sans Mono, monospace";
const panel = (x, y, w, h, extra = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="#fff" stroke="#d6e4f2" stroke-width="3" ${extra}/>`;
// a corrugated shipping container
function box(x, y, w, h, col, label = "", k = 1) {
  if (k <= 0) return "";
  const s = backOut(clamp(k / .45));
  const ribs = Array.from({ length: Math.floor(w / 18) - 1 }, (_, i) => `<rect x="${x + 12 + i * 18}" y="${y + 10}" width="6" height="${h - 20}" rx="3" fill="#000" opacity=".1"/>`).join("");
  return `<g transform="translate(${x + w / 2} ${y + h}) scale(${s}) translate(${-(x + w / 2)} ${-(y + h)})">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${col}"/>${ribs}
    <rect x="${x}" y="${y}" width="${w}" height="10" rx="5" fill="#fff" opacity=".25"/>
    ${label ? `<rect x="${x + w / 2 - label.length * 9 - 14}" y="${y + h / 2 - 22}" width="${label.length * 18 + 28}" height="44" rx="8" fill="#fff"/>` + T(x + w / 2, y + h / 2 + 10, label, col, 26, 900, "middle") : ""}</g>`;
}
const arrow = (x1, y, x2, label, col = MU, k = 1) => k <= 0 ? "" :
  `<g opacity="${clamp(k * 2)}"><path d="M${x1} ${y} H${x1 + (x2 - x1) * clamp(k)}" stroke="${col}" stroke-width="6" stroke-linecap="round"/><path d="M${x2 - 14} ${y - 12} L${x2} ${y} L${x2 - 14} ${y + 12}" stroke="${col}" stroke-width="6" fill="none" stroke-linecap="round" opacity="${clamp((k - .8) * 5)}"/>${T((x1 + x2) / 2, y - 18, label, col, 22, 800, "middle", mono)}</g>`;
const tick = (x, y, k) => k <= 0 ? "" : `<g transform="translate(${x} ${y}) scale(${backOut(clamp(k / .4))})"><circle r="22" fill="${GR}"/><path d="M-10 0 l7 8 l13 -15" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
const cross = (x, y, k) => k <= 0 ? "" : `<g transform="translate(${x} ${y}) scale(${backOut(clamp(k / .4))})"><circle r="22" fill="${RD}"/><path d="M-8 -8 L8 8 M8 -8 L-8 8" stroke="#fff" stroke-width="5" stroke-linecap="round"/></g>`;
const laptop = (x, y, s = 1, screen = "") => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-90" y="-120" width="180" height="120" rx="12" fill="${NV}"/><rect x="-80" y="-110" width="160" height="100" rx="6" fill="#e9f3ff"/>${screen}<path d="M-115 0 H115 L100 18 H-100 Z" fill="#b9c7d8"/></g>`;
const server = (x, y, s = 1, light = GR) => `<g transform="translate(${x} ${y}) scale(${s})">${[0, 1, 2].map(i => `<rect x="-70" y="${-150 + i * 50}" width="140" height="42" rx="8" fill="${NV}"/><circle cx="-48" cy="${-129 + i * 50}" r="6" fill="${light}"/><rect x="-30" y="${-133 + i * 50}" width="80" height="8" rx="4" fill="#3a5578"/>`).join("")}</g>`;
const cloud = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-70 0 C -110 0, -110 -55, -70 -58 C -65 -100, -5 -110, 10 -75 C 30 -105, 90 -95, 85 -50 C 120 -48, 120 0, 85 0 Z" fill="#fff" stroke="#bcd3ee" stroke-width="5"/></g>`;
function whale(x, y, s = 1) {   // sticker badge with the official Docker mark
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-176" y="-124" width="360" height="264" rx="64" fill="#0b2a4a" opacity=".18"/>
    <rect x="-184" y="-136" width="360" height="264" rx="64" fill="#fff"/>
    <rect x="-160" y="-112" width="312" height="216" rx="44" fill="#d9ecff" stroke="#14213d" stroke-width="12"/>
    <g transform="translate(-4 -4) scale(9) translate(-12 -12)"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" fill="#2496ED"/></g></g>`;
}

const P = {
  machine: lt => svg(laptop(300, 330, 1.6, `<path d="M-30 -60 l22 24 l40 -46" stroke="${GR}" stroke-width="12" fill="none" stroke-linecap="round" opacity="${clamp((lt - .3) / .3)}"/>`) +
    T(300, 420, "works!", GR, 40, 900, "middle", "Inter", (lt - .4) / .3) +
    (lt > 2 ? `<g transform="translate(470 120)"><g style="${pop(lt, 2)}"><rect x="-120" y="-50" width="240" height="96" rx="24" fill="#fff" stroke="#d6e4f2" stroke-width="3"/><path d="M-60 44 L-80 80 L-30 44" fill="#fff"/>${T(0, 10, "every dev 😅", NV, 30, 800, "middle")}</g></g>` : "")),

  server: lt => svg(server(300, 330, 1.6, lt > .4 ? RD : GR) + cross(420, 120, (lt - .5) / .3) +
    T(300, 420, "Error: module not found", RD, 28, 700, "middle", mono, (lt - .8) / .3) +
    T(300, 465, "node v14 ≠ v20", RD, 28, 700, "middle", mono, (lt - 1.2) / .3) +
    (lt > 2 ? `<g transform="translate(300 560)"><g style="${pop(lt, 2)}">${T(0, 0, "why?!", NV, 70, 900, "middle")}</g></g>` : "")),

  setups: lt => {
    const rows = [["Node 20", "Node 14"], ["Python 3.12", "Python 3.8"], ["libssl ✓", "libssl —"]];
    return svg(panel(20, 40, 270, 400) + panel(310, 40, 270, 400) +
      T(155, 100, "Your laptop", NV, 30, 900, "middle") + T(445, 100, "Server", NV, 30, 900, "middle") +
      rows.map(([a, b], i) => T(55, 180 + i * 90, a, NV, 28, 700, "start", mono, (lt - .2 - i * .3) / .2) + tick(255, 170 + i * 90, (lt - .3 - i * .3)) +
        T(345, 180 + i * 90, b, NV, 28, 700, "start", mono, (lt - 1 - i * .4) / .2) + cross(545, 170 + i * 90, (lt - 1.1 - i * .4))).join("") +
      T(300, 520, "different setup = broken app", RD, 32, 900, "middle", "Inter", (lt - 2.8) / .3));
  },

  enter: lt => svg(`<g transform="translate(300 300)"><g style="${pop(lt, .1, .5)}">${whale(0, 0, 1.4)}</g></g>` +
    T(300, 520, "docker", DB, 64, 900, "middle", "Inter", (lt - .5) / .3)),

  ship: lt => svg(box(200, 60, 200, 110, OR, "your app", (lt - .1)) +
    [["🚢", "ship"], ["🚆", "train"], ["🚚", "truck"]].map(([e, w], i) => {
      const d = 2 + i * .7;
      return `<g opacity="${clamp((lt - .6 - i * .2) / .3)}">${panel(25 + i * 190, 300, 170, 190)}${T(110 + i * 190, 395, e, NV, 70, 400, "middle")}${T(110 + i * 190, 455, w, MU, 26, 800, "middle")}</g>` + tick(165 + i * 190, 310, (lt - d) / 1) +
        (lt > d ? `<path d="M300 175 C 300 230, ${110 + i * 190} 240, ${110 + i * 190} 295" stroke="${OR}" stroke-width="5" fill="none" stroke-dasharray="10 10" opacity="${clamp((lt - d) / .3)}"/>` : "");
    }).join("") + T(300, 560, "fits everywhere", OR, 34, 900, "middle", "Inter", (lt - 4.4) / .3)),

  pack: lt => {
    const items = [["your code", NV], ["Node 20", GR], ["libraries", DB], ["settings", OR]];
    const closed = clamp((lt - 3.8) / .4);
    return svg(items.map(([w, c], i) => {
      const d = .4 + i * .7, k = easeOut(clamp((lt - d) / .7));
      const sx = 90 + (i % 2) * 300, sy = 90 + Math.floor(i / 2) * 90;
      const x = lerp(sx, 300, k), y = lerp(sy, 380, k), o = lt < d ? 0 : 1 - clamp((k - .85) * 7);
      return `<g opacity="${o}" transform="translate(${x} ${y}) scale(${lerp(1, .6, k)})"><rect x="-90" y="-28" width="180" height="56" rx="28" fill="${c}"/>${T(0, 10, w, "#fff", 26, 800, "middle")}</g>`;
    }).join("") +
      `<rect x="150" y="360" width="300" height="170" rx="10" fill="${DB}"/>` + Array.from({ length: 15 }, (_, i) => `<rect x="${165 + i * 18}" y="372" width="6" height="146" rx="3" fill="#000" opacity=".1"/>`).join("") +
      `<rect x="150" y="${lerp(300, 360, closed)}" width="300" height="20" rx="6" fill="#174fbe" transform="rotate(${lerp(-25, 0, closed)} 150 ${lerp(300, 360, closed)})"/>` +
      (closed > .9 ? `<rect x="215" y="420" width="170" height="48" rx="8" fill="#fff"/>` + T(300, 453, "my-app", DB, 30, 900, "middle") : ""));
  },

  dockerfile: lt => {
    const L = [["FROM node:20", "base"], ["COPY . /app", "your code"], ["RUN npm install", "libraries"], ['CMD ["node", "app.js"]', "start it"]];
    return svg(panel(20, 40, 560, 420) + `<rect x="20" y="40" width="560" height="64" rx="22" fill="${NV}"/><rect x="20" y="80" width="560" height="24" fill="${NV}"/>` +
      T(50, 82, "Dockerfile", "#fff", 30, 800, "start", mono) +
      L.map(([c, n], i) => T(50, 170 + i * 72, c, NV, 28, 700, "start", mono, (lt - .8 - i * .45) / .2) + T(560, 170 + i * 72, "← " + n, GR, 22, 800, "end", "Inter", (lt - 1 - i * .45) / .2)).join("") +
      T(300, 540, "a recipe for your box", MU, 30, 800, "middle", "Inter", (lt - 2.6) / .3));
  },

  image: lt => svg(panel(20, 160, 170, 200) + T(105, 270, "Docker", NV, 26, 800, "middle", mono, 1) + T(105, 302, "file", NV, 26, 800, "middle", mono, 1) +
    arrow(205, 260, 365, "docker build", DB, (lt - .3) / .8) +
    (lt > 1.1 ? `<g style="${pop(lt, 1.1)}">${[2, 1, 0].map(i => `<rect x="${395 + i * 8}" y="${170 + i * 22}" width="170" height="150" rx="14" fill="${DB}" opacity="${.45 + (2 - i) * .27}"/>`).join("")}<text x="480" y="305" text-anchor="middle" font-size="64">❄</text>${T(480, 400, "image", DB, 36, 900, "middle")}</g>` : "") +
    T(300, 500, "frozen snapshot of your app", MU, 30, 800, "middle", "Inter", (lt - 2.2) / .3)),

  container: lt => {
    const on = lt > 1.4, blink = .6 + .4 * Math.sin(lt * 6);
    return svg(`<g>${[2, 1, 0].map(i => `<rect x="${30 + i * 8}" y="${170 + i * 22}" width="150" height="140" rx="14" fill="${DB}" opacity="${.45 + (2 - i) * .27}"/>`).join("")}<text x="110" y="295" text-anchor="middle" font-size="56">❄</text>${T(110, 380, "image", DB, 30, 900, "middle")}</g>` +
      arrow(205, 260, 345, "docker run", OR, (lt - .2) / .8) +
      box(365, 170, 210, 170, OR, "", on ? 1 : 0) +
      (on ? `<rect x="390" y="195" width="160" height="100" rx="8" fill="#fff"/><rect x="405" y="212" width="90" height="12" rx="6" fill="#ffd2b8"/><rect x="405" y="236" width="130" height="12" rx="6" fill="#ffe3d3"/><rect x="405" y="260" width="70" height="12" rx="6" fill="#ffd2b8"/><circle cx="540" cy="320" r="10" fill="${GR}" opacity="${blink}"/>` + T(470, 380, "running", GR, 30, 900, "middle") : "") +
      T(300, 500, "your app, alive", MU, 30, 800, "middle", "Inter", (lt - 2.2) / .3));
  },

  many: lt => svg(`<g>${[2, 1, 0].map(i => `<rect x="${225 + i * 8}" y="${40 + i * 18}" width="140" height="110" rx="14" fill="${DB}" opacity="${.45 + (2 - i) * .27}"/>`).join("")}<text x="303" y="140" text-anchor="middle" font-size="48">❄</text></g>` +
    [0, 1, 2, 3].map(i => {
      const d = 1 + i * .45, x = 30 + i * 140;
      return (lt > d ? `<path d="M300 190 C 300 250, ${x + 60} 250, ${x + 60} 320" stroke="${MU}" stroke-width="4" fill="none" opacity="${clamp((lt - d) / .3)}"/>` : "") + box(x, 330, 120, 100, [OR, GR, RD, OR][i], "", lt - d);
    }).join("") + T(300, 520, "1 image → ∞ containers", NV, 36, 900, "middle", "Inter", (lt - 3) / .3)),

  everywhere: lt => {
    const spots = [[110, laptop(110, 300, .9), "laptop", 0], [300, server(300, 320, .9), "server", 2], [490, cloud(490, 300, 1.1), "cloud", 2.6]];
    return svg(spots.map(([x, art, w, d]) => `${art}${T(x, 380, w, MU, 28, 800, "middle")}` + box(x - 45, 130, 90, 60, OR, "", (lt - d - .1)) + tick(x + 55, 120, (lt - d - .5))).join("") +
      T(300, 520, "works everywhere ✓", GR, 40, 900, "middle", "Inter", (lt - 4) / .3));
  },

  recap: lt => svg([["Dockerfile", GR, "recipe"], ["Image", DB, "snapshot"], ["Container", OR, "running app"]].map(([w, c, sub], i) => {
    const d = .8 + i * .7, y = 40 + i * 175;
    return box(70, y, 460, 120, c, "", lt - d) + T(300, y + 66, w, "#fff", 42, 900, "middle", "Inter", (lt - d - .1) / .2) + T(300, y + 100, sub, "#fff", 22, 700, "middle", "Inter", (lt - d - .2) / .2) +
      (i < 2 ? T(300, y + 158, i === 0 ? "↓ build" : "↓ run", MU, 26, 800, "middle", mono, (lt - d - .4) / .2) : "");
  }).join("")),

  cta: lt => {
    const word = "DOCKER".slice(0, Math.floor(clamp((lt - 2.2) / .9) * 6));
    return svg(`<g transform="translate(300 160)"><g style="${pop(lt, .2)}"><rect x="-250" y="-90" width="500" height="170" rx="30" fill="#fff" stroke="#d6e4f2" stroke-width="3"/><path d="M-170 78 L-200 130 L-120 78" fill="#fff" stroke="#d6e4f2" stroke-width="3"/>
        <circle cx="-180" cy="-10" r="40" fill="#ffd27a"/>${T(-120, -25, "you", MU, 24, 700)}${T(-120, 30, word + (lt > 2 && lt < 3.3 ? "|" : ""), NV, 56, 900, "start", mono)}</g></g>` +
      (lt > 3.2 ? `<g transform="translate(470 270)"><g style="${pop(lt, 3.2)}"><text x="0" y="0" text-anchor="middle" font-size="64">❤️</text></g></g>` : "") +
      `<g transform="translate(300 420)"><g style="${pop(lt, 4)}"><rect x="-180" y="-52" width="360" height="104" rx="52" fill="${DB}"/>${T(0, 16, "+ Follow", "#fff", 44, 900, "middle")}</g></g>` +
      T(300, 540, "Part 2: your first Dockerfile 🐳", MU, 30, 800, "middle", "Inter", (lt - 4.4) / .3));
  },
};
