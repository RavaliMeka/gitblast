/* ---------- Props: movie-set theme ---------- */
const BK = "#1c1917", GD2 = "#e0a82e", RD4 = "#c1121f", CR = "#fffaf0", GN3 = "#2d9d5f", MU5 = "#8d8478", AMB = "#f4a52e";
const mono = "DejaVu Sans Mono, monospace";
const svg = (inner, h = 640) => `<svg class="abs" style="left:0;top:0" width="620" height="${h}" viewBox="0 0 620 ${h}">${inner}</svg>`;
const T = (x, y, s, col = BK, size = 28, weight = 800, anchor = "middle", font = "Inter", op = 1) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${font}" font-weight="${weight}" font-size="${size}" fill="${col}" opacity="${clamp(op)}">${s}</text>`;
const grow = (k, inner, x, y) => k <= 0 ? "" : `<g transform="translate(${x} ${y}) scale(${backOut(clamp(k / .4))})">${inner}</g>`;
const card = (x, y, w, h, stroke = "#e7dcc8") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${CR}" stroke="${stroke}" stroke-width="4"/>`;
const stripes = (x, y, w, h) => `<clipPath id="cp${x}${y}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/></clipPath><g clip-path="url(#cp${x}${y})"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${BK}"/>${Array.from({ length: Math.ceil(w / 60) + 1 }, (_, i) => `<path d="M${x + i * 60} ${y + h} l28 ${-h} h28 l-28 ${h} z" fill="#fff"/>`).join("")}</g>`;
// clapperboard; open: 0 closed .. 1 open
function clapper(open, text = "ACTIONS") {
  return `<rect x="-200" y="-40" width="400" height="230" rx="12" fill="${BK}"/>${stripes(-200, -40, 400, 44)}
    <g transform="rotate(${-28 * open} -200 -44)">${stripes(-200, -92, 400, 44)}</g>
    <text x="0" y="70" text-anchor="middle" font-family="Inter" font-weight="900" font-size="54" fill="#fff">${text}</text>
    <text x="-170" y="140" font-family="${mono}" font-size="20" fill="#a8a29e">SCENE 1   TAKE 1</text><text x="-170" y="168" font-family="${mono}" font-size="20" fill="#a8a29e">FILE ci.yml</text>`;
}
const Y = ["name: CI", "on: [push]", "jobs:", "  test:", "    runs-on: ubuntu-latest", "    steps:", "      - uses: actions/checkout@v4", "      - run: npm install", "      - run: npm test"];
// the script page: lines 0..n-1 shown; lines from `from` appear at delays ds; note = margin label for the new lines
function page(from, n, lt, ds = [.2], note = "") {
  const rows = Y.map((l, i) => { if (i >= n) return ""; const isNew = i >= from, d = isNew ? ds[Math.min(i - from, ds.length - 1)] : 0, y = 122 + i * 44;
    return (isNew && lt > d ? `<rect x="30" y="${y - 30}" width="560" height="40" rx="6" fill="${GD2}" opacity=".28"/>` : "") + T(48, y, l.replace(/ /g, " "), BK, 23, isNew ? 800 : 600, "start", mono, isNew ? (lt - d) / .25 : 1); }).join("");
  return card(16, 20, 588, 500) + `<rect x="16" y="20" width="588" height="56" rx="16" fill="${BK}"/><rect x="16" y="56" width="588" height="20" fill="${BK}"/>` +
    T(44, 58, ".github/workflows/ci.yml", "#fff", 22, 700, "start", mono) + rows +
    (note ? `<g transform="translate(310 580)"><g style="${pop(lt, ds[0] + .5)}"><rect x="-260" y="-36" width="520" height="72" rx="36" fill="${RD4}"/>${T(0, 10, note, "#fff", 26, 800)}</g></g>` : "");
}
const check = (x, y, k) => grow(k, `<circle r="17" fill="${GN3}"/><path d="M-8 0 l6 7 l11 -13" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>`, x, y);
const spin = (x, y, t) => `<g transform="translate(${x} ${y}) rotate(${t * 300})"><circle r="15" fill="none" stroke="${AMB}" stroke-width="6" stroke-dasharray="60 34"/></g>`;

const P = {
  clap: lt => { const open = lt < 2 ? 1 : lt < 2.25 ? 1 - (lt - 2) / .25 : 0;
    return svg(`<g transform="translate(310 250)"><g style="${pop(lt, .1)}">${clapper(open)}</g></g>` +
      (lt > 2.25 && lt < 3 ? `<g opacity="${1 - (lt - 2.25) / .75}">${[0, 1, 2, 3, 4, 5].map(i => `<path d="M310 120 l${Math.cos(i) * 200} ${-80 - i * 12}" stroke="${GD2}" stroke-width="6" stroke-linecap="round"/>`).join("")}</g>` : "") +
      T(310, 540, "automate with GitHub Actions", MU5, 26, 700, "middle", mono, (lt - 2.6) / .3)); },

  tree: lt => svg(card(40, 30, 540, 430) + [["📁 my-repo/", 0, .2], ["📁 .github/", 1, 3], ["📁 workflows/", 2, 3.5], ["📄 ci.yml", 3, 4.1], ["📁 src/", 1, .5], ["📄 package.json", 1, .7]].map(([w, ind, d], i) => {
      const hot = ind > 0 && i < 4 && lt > d;
      return (hot ? `<rect x="${70 + ind * 44}" y="${72 + i * 62}" width="${w.length * 17 + 30}" height="48" rx="8" fill="${GD2}" opacity=".3"/>` : "") + T(84 + ind * 44, 106 + i * 62, w, BK, 28, hot ? 800 : 600, "start", mono, (lt - d) / .25); }).join("") +
    T(310, 530, "the script for your robots", MU5, 26, 700, "middle", mono, (lt - 4.6) / .3)),

  y1: lt => svg(page(0, 1, lt, [.3], "just a label")),
  y2: lt => svg(page(1, 2, lt, [.3], "runs on every push")),
  y3: lt => svg(page(2, 4, lt, [.2, .7], "the work to do")),
  y4: lt => svg(page(4, 5, lt, [.3]) + `<g transform="translate(310 570)"><g style="${pop(lt, 2)}"><rect x="-200" y="-50" width="400" height="100" rx="14" fill="${BK}"/><rect x="-176" y="-28" width="92" height="56" rx="6" fill="#44403c"/><circle cx="-150" cy="0" r="7" fill="${GN3}"/><circle cx="-126" cy="0" r="7" fill="${AMB}"/>${T(50, -4, "runner", "#fff", 28, 800)}${T(50, 26, "fresh machine", "#a8a29e", 18, 600, "middle", mono)}</g></g>`, 660),
  y5: lt => svg(page(5, 9, lt, [.2, .9, 4, 5.2], "checkout → install → test")),

  push: lt => svg(card(20, 40, 580, 250, BK) + `<rect x="20" y="40" width="580" height="250" rx="16" fill="${BK}"/>` +
    [["$ git add .github", .1], ['$ git commit -m "add CI"', .7], ["$ git push", 1.4]].map(([l, d], i) => T(50, 110 + i * 60, l, i === 2 ? GD2 : "#fafaf9", 28, 700, "start", mono, (lt - d) / .2)).join("") +
    (lt > 2 ? `<g transform="translate(310 430)"><g style="${pop(lt, 2)}">${clapper(0, "ROLLING…")}</g></g>` : "").replace(/translate\(310 430\)/, "translate(310 400) scale(.62)")),

  run: lt => { const steps = ["Set up job", "actions/checkout@v4", "npm install", "npm test"], t0 = 2, per = .75, done = lt > t0 + steps.length * per;
    return svg(card(16, 20, 588, 520) + `<rect x="16" y="20" width="588" height="60" rx="16" fill="#f1e9d8"/><rect x="16" y="60" width="588" height="20" fill="#f1e9d8"/>` +
      ["Code", "Issues", "Actions"].map((w, i) => T(60 + i * 120, 60, w, i === 2 ? BK : MU5, 22, i === 2 ? 900 : 600, "start")).join("") + `<rect x="296" y="72" width="92" height="6" fill="${RD4}"/>` +
      (done ? check(64, 134, 1) : lt > .6 ? spin(64, 134, lt) : "") + T(100, 144, "CI · add CI", BK, 28, 800, "start", "Inter", (lt - .5) / .3) + T(560, 142, done ? "passed" : "running", done ? GN3 : AMB, 22, 800, "end", mono, (lt - .8) / .3) +
      `<path d="M40 184 H580" stroke="#e7dcc8" stroke-width="3"/>` +
      steps.map((w, i) => { const a = t0 + i * per, st = lt > a + per ? 2 : lt > a ? 1 : 0;
        return (st === 2 ? check(70, 236 + i * 72, 1) : st === 1 ? spin(70, 236 + i * 72, lt) : `<circle cx="70" cy="${236 + i * 72}" r="14" fill="none" stroke="#d6cdbb" stroke-width="4"/>`) + T(110, 245 + i * 72, w, st ? BK : MU5, 26, 700, "start", mono); }).join("") +
      (done ? `<g transform="translate(310 600)"><g style="${pop(lt, t0 + steps.length * per)}">${T(0, 0, "it passed ✓", GN3, 40, 900)}</g></g>` : ""), 660); },

  recap: lt => svg([["Trigger", "on: push", RD4], ["Job", "test", GD2], ["Runner", "ubuntu-latest", BK], ["Steps", "checkout · install · test", GN3]].map(([a, b, c], i) =>
    `<g transform="translate(310 ${100 + i * 132})"><g style="${pop(lt, .1 + i * .75)}">${card(-280, -52, 560, 104, c)}<rect x="-280" y="-52" width="24" height="104" rx="8" fill="${c}"/>${T(-232, 2, a, BK, 34, 900, "start")}${T(-232, 34, b, MU5, 20, 700, "start", mono)}</g></g>`).join("")),

  next: lt => svg(`<g transform="translate(310 190)"><g style="${pop(lt, .2)}">${card(-280, -105, 560, 210)}${T(-240, -34, "Part 3", MU5, 28, 800, "start", mono)}${T(-240, 40, "CI on pull requests", BK, 42, 900, "start")}</g></g>` +
    `<g transform="translate(310 430)"><g style="${pop(lt, 3)}"><rect x="-180" y="-52" width="360" height="104" rx="52" fill="${RD4}"/>${T(0, 16, "+ Follow", "#fff", 44, 900)}</g></g>`),
};
