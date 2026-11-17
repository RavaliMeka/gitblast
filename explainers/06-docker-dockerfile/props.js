/* ---------- Props: recipe-card theme ---------- */
const RD2 = "#d9412b", BR = "#4a2c1d", GN = "#3f8f4a", MS = "#e7a42a", PAPER = "#fffdf6", SOFT2 = "#8a6f5c";
const mono = "DejaVu Sans Mono, monospace", serif = "DejaVu Serif, Georgia, serif";
const svg = (inner, h = 680) => `<svg class="abs" style="left:0;top:0" width="600" height="${h}" viewBox="0 0 600 ${h}">${inner}</svg>`;
const T = (x, y, s, col = BR, size = 30, weight = 700, anchor = "start", font = "Inter", op = 1) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${font}" font-weight="${weight}" font-size="${size}" fill="${col}" opacity="${clamp(op)}">${s}</text>`;
const LINES = ["FROM node:20", "WORKDIR /app", "COPY . .", "RUN npm install", "EXPOSE 3000", 'CMD ["node", "app.js"]'];

// the recipe card: lines 0..n-1 written, line n-1 highlighted and typed
function recipe(n, lt, top = 10) {
  const rows = LINES.map((l, i) => {
    const y = top + 112 + i * 40;
    if (i >= n) return `<line x1="70" y1="${y + 8}" x2="560" y2="${y + 8}" stroke="#ead9c4" stroke-width="2"/>`;
    const cur = i === n - 1, k = cur ? clamp(lt / .7) : 1;
    const txt = l.slice(0, Math.ceil(l.length * k));
    return (cur ? `<rect x="58" y="${y - 24}" width="510" height="38" rx="8" fill="${MS}" opacity=".22"/>` : "") +
      T(40, y, String(i + 1), RD2, 20, 800, "middle", "Inter") + T(70, y, txt, BR, 24, 700, "start", mono);
  }).join("");
  return `<g filter="url(#paper)"><rect x="18" y="${top}" width="564" height="${110 + 6 * 40}" rx="14" fill="${PAPER}" stroke="#ead9c4" stroke-width="3"/></g>
    <rect x="18" y="${top}" width="564" height="62" rx="14" fill="${RD2}"/><rect x="18" y="${top + 40}" width="564" height="22" fill="${RD2}"/>
    ${T(300, top + 42, "Recipe: Dockerfile", "#fff", 28, 800, "middle", serif)}
    <line x1="58" y1="${top + 72}" x2="58" y2="${top + 100 + 6 * 40}" stroke="#f1b8ad" stroke-width="2"/>${rows}`;
}
// the box being cooked
function crate(x, y, w, h, inner = "", lid = 1) {
  return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="#c98b4e"/>
    ${[1, 2, 3].map(i => `<rect x="${x}" y="${y + i * h / 4 - 3}" width="${w}" height="6" fill="#a86f39"/>`).join("")}
    <rect x="${x + 14}" y="${y + 14}" width="${w - 28}" height="${h - 28}" rx="6" fill="#fff6e6"/>${inner}
    <rect x="${x - 8}" y="${y - 18 - (1 - lid) * 40}" width="${w + 16}" height="22" rx="6" fill="#b7793f" transform="rotate(${(1 - lid) * -14} ${x} ${y})"/></g>`;
}
const ILL = 410; // y where illustrations start

const P = {
  asked: lt => svg([["DOCKER", 60, 120, .2], ["DOCKER 🔥", 330, 220, .6], ["docker pls", 90, 330, 1], ["DOCKER!!", 340, 430, 1.4]].map(([w, x, y, d]) =>
    `<g transform="translate(${x} ${y})"><g style="${pop(lt, d)}"><rect x="0" y="-46" width="${w.length * 22 + 90}" height="76" rx="38" fill="#fff" stroke="#ead9c4" stroke-width="3"/><circle cx="36" cy="-8" r="22" fill="${["#ffd27a", "#9bd4ff", "#ffb3c7", "#b9e8c2"][Math.round(d * 2.5) % 4]}"/>${T(70, 4, w, BR, 30, 800, "start", mono)}</g></g>`).join("") +
    T(300, 590, "your first Dockerfile ↓", RD2, 36, 800, "middle", serif, (lt - 2.2) / .3)),

  recipe: lt => svg(recipe(0, lt) + T(300, 520, "each line = one step", RD2, 34, 800, "middle", serif, (lt - 2) / .3)),

  from: lt => svg(recipe(1, lt) + `<g transform="translate(300 ${ILL + 120})"><g style="${pop(lt, 2.8)}">
      <circle r="105" fill="#e8b874"/><circle r="84" fill="#f6d9a4"/><circle cx="-30" cy="-20" r="6" fill="#e8b874"/><circle cx="35" cy="10" r="5" fill="#e8b874"/><circle cx="-5" cy="40" r="6" fill="#e8b874"/></g></g>` +
    T(300, ILL + 270, "ready-made base: node 20", SOFT2, 26, 700, "middle", "Inter", (lt - 3.4) / .3), 720),

  workdir: lt => svg(recipe(2, lt) + crate(170, ILL + 30, 260, 200,
    `<g transform="translate(300 ${ILL + 130})"><g style="${pop(lt, 1.6)}"><path d="M-60 -32 h40 l12 14 h68 v58 h-120 z" fill="${MS}"/>${T(0, 22, "/app", BR, 26, 800, "middle", mono)}</g></g>`, 0), 720),

  copy: lt => svg(recipe(3, lt) + crate(220, ILL + 30, 260, 200, "", 0) +
    [["app.js", 0], ["package.json", .5]].map(([f, d]) => {
      const k = easeOut(clamp((lt - 1.4 - d) / .8)), x = lerp(30, 290, k), y = lerp(ILL + 40 + d * 120, ILL + 110 + d * 40, k);
      return lt < 1.4 + d ? "" : `<g transform="translate(${x} ${y})"><rect x="0" y="0" width="${f.length * 15 + 40}" height="52" rx="8" fill="#fff" stroke="${BR}" stroke-width="3"/>${T(20, 34, f, BR, 22, 700, "start", mono)}</g>`;
    }).join(""), 720),

  run: lt => svg(recipe(4, lt) + crate(170, ILL + 30, 260, 200,
    [0, 1, 2, 3, 4, 5].map(i => { const d = 1.4 + i * .35, k = easeOut(clamp((lt - d) / .4)); return lt < d ? "" :
      `<rect x="${200 + (i % 3) * 66}" y="${lerp(ILL - 60, ILL + 60 + Math.floor(i / 3) * 62, k)}" width="56" height="50" rx="6" fill="${[RD2, GN, MS][i % 3]}"/>`; }).join(""), 0) +
    `<rect x="170" y="${ILL + 250}" width="260" height="16" rx="8" fill="#ead9c4"/><rect x="170" y="${ILL + 250}" width="${260 * clamp((lt - 1.2) / 3)}" height="16" rx="8" fill="${GN}"/>` +
    T(300, ILL + 300, "npm install", SOFT2, 24, 700, "middle", mono, (lt - 1.2) / .3), 740),

  expose: lt => { const open = easeOut(clamp((lt - 1.8) / .6));
    return svg(recipe(5, lt) + crate(140, ILL + 30, 260, 200, "", 1) +
      `<rect x="398" y="${ILL + 80}" width="${70 * (1 - open) + 8}" height="110" rx="6" fill="${RD2}"/><rect x="398" y="${ILL + 80}" width="70" height="110" rx="6" fill="none" stroke="${BR}" stroke-width="4"/>` +
      `<g transform="translate(500 ${ILL + 70})"><g style="${pop(lt, 1.4)}"><rect x="-44" y="-24" width="88" height="40" rx="8" fill="${BR}"/>${T(0, 6, "3000", "#fff", 24, 800, "middle", mono)}</g></g>` +
      T(300, ILL + 290, "the door your app talks through", SOFT2, 26, 700, "middle", "Inter", (lt - 2.4) / .3), 740); },

  cmd: lt => svg(recipe(6, lt) + crate(170, ILL + 30, 260, 200,
    `<g transform="translate(300 ${ILL + 130})"><g style="${pop(lt, 1.8)}"><circle r="52" fill="${GN}"/><path d="M-16 -26 L28 0 L-16 26 Z" fill="#fff"/></g></g>`, 1) +
    T(300, ILL + 290, "runs when the box starts", SOFT2, 26, 700, "middle", "Inter", (lt - 2.2) / .3), 740),

  buildrun: lt => `<div class="abs term" style="left:20px;top:40px;width:560px;font-size:24px;${pop(lt, 0, .3)}">
      <div><span class="p">$</span> docker build -t my-app .</div>
      <div class="ok" style="opacity:${clamp((lt - 1.6) / .3)}">✓ image my-app built</div>
      <div style="margin-top:18px;opacity:${clamp((lt - 4) / .3)}"><span class="p">$</span> docker run -p 3000:3000 my-app</div>
      <div class="ok" style="opacity:${clamp((lt - 6.5) / .3)}">✓ listening on port 3000</div></div>` +
    svg(`<g transform="translate(160 470)"><g style="${pop(lt, 1.7)}">${crate(-90, -70, 180, 140, "", 1)}</g></g>${T(160, 600, "image", SOFT2, 26, 800, "middle", "Inter", (lt - 1.8) / .3)}` +
      `<path d="M270 470 H330" stroke="${BR}" stroke-width="5" opacity="${clamp((lt - 4.5) / .3)}"/><path d="M318 458 L332 470 L318 482" stroke="${BR}" stroke-width="5" fill="none" opacity="${clamp((lt - 4.5) / .3)}"/>` +
      `<g transform="translate(440 470)"><g style="${pop(lt, 6.5)}">${crate(-90, -70, 180, 140, `<circle cx="68" cy="52" r="10" fill="${GN}"/>`, 1)}</g></g>${T(440, 600, "running", GN, 26, 800, "middle", "Inter", (lt - 6.6) / .3)}`, 680),

  alive: lt => svg(`<g style="${pop(lt, .1)}"><rect x="30" y="60" width="540" height="380" rx="20" fill="#fff" stroke="#ead9c4" stroke-width="3"/>
      <rect x="30" y="60" width="540" height="62" rx="20" fill="#f3e6d3"/><rect x="30" y="100" width="540" height="22" fill="#f3e6d3"/>
      <circle cx="64" cy="92" r="9" fill="#ff5f57"/><circle cx="92" cy="92" r="9" fill="#febc2e"/><circle cx="120" cy="92" r="9" fill="#28c840"/>
      <rect x="150" y="76" width="380" height="34" rx="17" fill="#fff"/>${T(170, 101, "localhost:3000", SOFT2, 22, 700, "start", mono)}
      ${T(300, 260, "Hello from", BR, 40, 800, "middle", serif, (lt - .6) / .3)}${T(300, 320, "Docker! 🐳", RD2, 52, 800, "middle", serif, (lt - .9) / .3)}</g>`),

  next: lt => svg(`<g style="${pop(lt, .2)}"><rect x="40" y="60" width="520" height="190" rx="18" fill="${PAPER}" stroke="#ead9c4" stroke-width="3"/>
      ${T(80, 130, "Part 3", RD2, 30, 800, "start", serif)}${T(80, 200, "Ports & Volumes", BR, 46, 800, "start", serif)}</g>` +
    `<g transform="translate(300 380)"><g style="${pop(lt, 2)}"><rect x="-180" y="-52" width="360" height="104" rx="52" fill="${RD2}"/>${T(0, 16, "+ Follow", "#fff", 44, 800, "middle")}</g></g>` +
    T(300, 500, "🔖 save for your next project", SOFT2, 28, 700, "middle", "Inter", (lt - 2.4) / .3)),
};
