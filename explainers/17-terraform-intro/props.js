/* ---------- Props: building-blocks theme ---------- */
const RD = "#e63946", BL = "#1d7dd8", YE = "#ffc300", GR = "#2bb673", INK = "#22223b", MU = "#7b7f9e";
const mono = "DejaVu Sans Mono, monospace";
const svg = (inner, h = 640) => `<svg class="abs" style="left:0;top:0" width="620" height="${h}" viewBox="0 0 620 ${h}">${inner}</svg>`;
const T = (x, y, s, col = INK, size = 28, weight = 800, anchor = "middle", font = "Inter", op = 1) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${font}" font-weight="${weight}" font-size="${size}" fill="${col}" opacity="${clamp(op)}">${s}</text>`;
const grow = (k, inner, x, y) => k <= 0 ? "" : `<g transform="translate(${x} ${y}) scale(${backOut(clamp(k / .4))})">${inner}</g>`;
const card = (x, y, w, h, stroke = "#eadfb8") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#fff" stroke="${stroke}" stroke-width="4"/>`;
const tick = (x, y, k) => grow(k, `<circle r="18" fill="${GR}"/><path d="M-8 0 l6 7 l11 -13" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>`, x, y);
// a brick n studs wide that drops into place as k goes 0..1
function block(x, y, n, col, k = 1) {
  if (k <= 0) return "";
  const w = n * 40, dy = (1 - easeOut(clamp(k / .35))) * -70;
  return `<g transform="translate(${x} ${y + dy})" opacity="${clamp(k * 3)}">${Array.from({ length: n }, (_, i) => `<rect x="${i * 40 + 9}" y="-9" width="22" height="11" rx="3" fill="${col}"/>`).join("")}<rect width="${w}" height="44" rx="5" fill="${col}"/><rect width="${w}" height="8" rx="4" fill="#fff" opacity=".28"/></g>`;
}
// a little house built from 4 bricks; kf(i) is the progress of brick i
function model(x, y, kf, s = 1) {
  const B = [[0, 0, 6, GR], [40, -44, 4, RD], [40, -88, 4, BL], [80, -132, 2, YE]];
  return `<g transform="translate(${x} ${y}) scale(${s})">${B.map(([dx, dy, n, c], i) => block(dx, dy, n, c, kf(i))).join("")}</g>`;
}
function bigBrick(x, y, w, col, label, k) {
  return grow(k, `${Array.from({ length: Math.floor(w / 60) }, (_, i) => `<rect x="${-w / 2 + 14 + i * 60}" y="-58" width="32" height="14" rx="4" fill="${col}"/>`).join("")}<rect x="${-w / 2}" y="-46" width="${w}" height="92" rx="10" fill="${col}"/><rect x="${-w / 2}" y="-46" width="${w}" height="12" rx="6" fill="#fff" opacity=".28"/><text y="14" text-anchor="middle" font-family="Inter" font-weight="900" font-size="38" fill="#fff">${label}</text>`, x, y);
}
function tterm(lt, rows, top = 20) {
  return `<rect x="16" y="${top}" width="588" height="${36 + rows.length * 46}" rx="16" fill="${INK}"/>` + rows.map(([d, txt, col], i) => T(42, top + 54 + i * 46, txt, col || "#f1f1ff", 24, 700, "start", mono, (lt - d) / .25)).join("");
}

const P = {
  clicks: lt => { const rows = ["Create server", "Pick a size", "Set up network", "Open ports"], idx = Math.min(3, Math.max(0, Math.floor((lt - .2) / .6)));
    return svg(rows.map((w, i) => { const on = lt > .5 + i * .6; return card(40, 40 + i * 100, 540, 80) + `<rect x="64" y="${62 + i * 100}" width="36" height="36" rx="8" fill="${on ? BL : "#fff"}" stroke="${BL}" stroke-width="4"/>` + (on ? `<path d="M72 ${80 + i * 100} l8 9 l14 -17" stroke="#fff" stroke-width="5" fill="none"/>` : "") + T(124, 92 + i * 100, w, INK, 30, 800, "start"); }).join("") +
      `<path d="M0 0 L0 34 L9 26 L16 42 L22 39 L15 24 L27 24 Z" fill="${INK}" stroke="#fff" stroke-width="3" transform="translate(500 ${78 + idx * 100})"/>` +
      T(310, 500, lt > 3 ? "now repeat that… exactly?" : "", RD, 34, 900, "middle", "Inter", (lt - 3) / .3), 560); },

  iac: lt => svg(`<g transform="translate(310 240)"><g style="${pop(lt, .1)}">${card(-270, -140, 540, 280, BL)}<rect x="-230" y="-80" width="160" height="160" rx="22" fill="${BL}"/>${T(-150, 26, "{ }", "#fff", 70, 900, "middle", mono)}${T(90, -14, "Infrastructure", INK, 38, 900)}${T(90, 44, "as Code", BL, 48, 900)}</g></g>`, 480),

  booklet: lt => svg(card(20, 60, 230, 430) + T(135, 112, "Instructions", INK, 26, 900) + [GR, RD, BL, YE].map((c, i) => `<circle cx="62" cy="${174 + i * 82}" r="20" fill="${INK}"/>${T(62, 184 + i * 82, String(i + 1), "#fff", 24, 900)}<rect x="100" y="${154 + i * 82}" width="${[120, 90, 90, 50][i]}" height="38" rx="5" fill="${c}"/>`).join("") +
    model(300, 440, i => lt - 3 - i * .7, 1.25) + T(450, 560, lt > 6 ? "same model, every time" : "", GR, 26, 900, "middle", "Inter", (lt - 6) / .3), 600),

  file: lt => svg(card(16, 20, 588, 250) + `<rect x="16" y="20" width="588" height="52" rx="18" fill="${INK}"/><rect x="16" y="54" width="588" height="18" fill="${INK}"/>` + T(42, 56, "main.tf", "#fff", 22, 700, "start", mono) +
    [['resource "server"   "web"  { … }', 3, RD], ['resource "database" "db"   { … }', 4, BL], ['resource "network"  "main" { … }', 5, GR]].map(([l, d, c], i) => `<rect x="34" y="${92 + i * 54}" width="12" height="38" rx="4" fill="${c}" opacity="${clamp((lt - d) / .2)}"/>` + T(60, 120 + i * 54, l.replace(/ /g, " "), INK, 22, 700, "start", mono, (lt - d) / .25)).join("") +
    [["server", RD], ["database", BL], ["network", GR]].map(([w, c], i) => block(30 + i * 200, 400, 4, c, lt - 3.2 - i) + T(110 + i * 200, 490, w, INK, 24, 800, "middle", mono, (lt - 3.4 - i) / .2)).join(""), 540),

  build: lt => svg(tterm(lt, [[.1, "$ terraform apply"], [2.8, "Apply complete!", "#8dffb8"]]) + model(160, 480, i => lt - .9 - i * .45, 1.25) + tick(520, 330, lt - 2.8) + T(310, 590, lt > 2.8 ? "built for you" : "", GR, 30, 900), 620),

  providers: lt => svg([["AWS", YE], ["Azure", BL], ["Google Cloud", RD]].map(([w, c], i) => `<g transform="translate(${110 + i * 200} 200)"><g style="${pop(lt, .2 + i * .5)}">${card(-92, -90, 184, 180, c)}<rect x="-60" y="-52" width="120" height="44" rx="5" fill="${c}"/>${[0, 1, 2].map(j => `<rect x="${-51 + j * 40}" y="-61" width="22" height="11" rx="3" fill="${c}"/>`).join("")}${T(0, 50, w, INK, w.length > 6 ? 22 : 30, 900)}</g></g>`).join("") +
    (lt > 4 ? `<g transform="translate(310 430)"><g style="${pop(lt, 4)}"><rect x="-230" y="-42" width="460" height="84" rx="42" fill="${INK}"/>${T(0, 12, "providers = plugins", YE, 32, 900)}</g></g>` : ""), 520),

  change: lt => { const n = lt > 2 ? 3 : 1;
    return svg(card(16, 20, 588, 150) + T(46, 80, 'resource "server" "web" {', INK, 24, 700, "start", mono) + T(46, 126, "  count = " + n + "  }", lt > 2 ? RD : INK, 26, 800, "start", mono) +
      block(40, 330, 4, RD, 1) + [0, 1].map(i => block(230 + i * 190, 330, 4, RD, lt - 2.6 - i * .4)).join("") +
      T(420, 290, lt > 3.2 ? "+2 new" : "", GR, 26, 900, "middle", mono) + T(120, 290, "unchanged", MU, 22, 700, "middle", mono, (lt - 3.4) / .3) +
      T(310, 470, lt > 3.6 ? "only what's different" : "", INK, 32, 900, "middle", "Inter", (lt - 3.6) / .3), 520); },

  same: lt => svg(["dev", "staging", "prod"].map((w, j) => model(30 + j * 200, 320, i => lt - .2 - j * .5 - i * .12, .62) + T(105 + j * 200, 410, w, INK, 28, 900, "middle", mono, (lt - .4 - j * .5) / .2) + tick(105 + j * 200, 460, lt - 1 - j * .5)).join("") +
    T(310, 560, lt > 2.4 ? "identical ✓" : "", GR, 40, 900), 600),

  recap: lt => svg(bigBrick(310, 120, 480, BL, "Write it", lt - .1) + bigBrick(310, 280, 480, YE, "Review it", lt - .9) + bigBrick(310, 440, 480, GR, "Reuse it", lt - 1.7), 540),

  next: lt => svg(`<g transform="translate(310 190)"><g style="${pop(lt, .2)}">${card(-280, -105, 560, 210)}${T(-240, -34, "Part 2", MU, 28, 800, "start", mono)}${T(-240, 40, "init · plan · apply", INK, 46, 900, "start")}</g></g>` + bigBrick(310, 440, 360, RD, "+ Follow", lt - 3), 540),
};
