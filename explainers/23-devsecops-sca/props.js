/* ---------- Props: DevSecOps series (shared drawing helpers) ---------- */
const DS = { ink: "#14213d", red: "#e11d48", green: "#16a34a", amber: "#f59e0b", blue: "#2563eb", mute: "#64748b", line: "#e2e8f0" };
const MONO = "JetBrains Mono, monospace", SANS = "Inter, sans-serif";
const svg = (inner, h = 560) => `<svg class="abs" style="left:0;top:0" width="640" height="${h}" viewBox="0 0 640 ${h}">${inner}</svg>`;
const xs = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/ /g, " ");
const T = (x, y, s, col = DS.ink, size = 28, weight = 700, anchor = "middle", font = SANS, op = 1) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${font}" font-weight="${weight}" font-size="${size}" fill="${col}" opacity="${clamp(op)}">${xs(s)}</text>`;
const G = (lt, d, x, y, inner) => lt <= d ? "" : `<g transform="translate(${x} ${y}) scale(${backOut(clamp((lt - d) / .4))})">${inner}</g>`;
const box = (x, y, w, h, stroke = DS.line, fill = "#fff", r = 18, sw = 4) =>
  `<rect x="${x + 5}" y="${y + 9}" width="${w}" height="${h}" rx="${r}" fill="${DS.ink}" opacity=".1"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const typed = (txt, lt, d, dur = .7) => txt.slice(0, Math.ceil(txt.length * clamp((lt - d) / dur)));
const shield = (x, y, s = 1, col = DS.red, mark = "✓") => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 -34 L28 -24 V2 C28 20 14 30 0 36 C-14 30 -28 20 -28 2 V-24 Z" fill="${col}"/>${mark ? `<text y="10" text-anchor="middle" font-family="${SANS}" font-weight="800" font-size="30" fill="#fff">${mark}</text>` : ""}</g>`;
const SEV = { Critical: "#be123c", High: DS.red, Medium: DS.amber, Low: DS.blue };

// file with code lines: [delay, text, "bad" | "good" | undefined]
function codeCard(lt, name, lines, top = 16) {
  const h = 74 + lines.length * 46;
  return box(20, top, 600, h, DS.ink, "#fff", 16) + `<path d="M20 ${top + 52} V${top + 16} a16 16 0 0 1 16 -16 H604 a16 16 0 0 1 16 16 V${top + 52} Z" fill="${DS.ink}"/>` +
    T(44, top + 35, name, "#fff", 22, 700, "start", MONO) + lines.map(([d, txt, flag], i) => { const y = top + 98 + i * 46, on = lt > d + .5;
      return (flag && on ? `<rect x="30" y="${y - 30}" width="580" height="42" rx="8" fill="${flag === "bad" ? DS.red : DS.green}" opacity=".14"/>` + T(590, y, flag === "bad" ? "✕" : "✓", flag === "bad" ? DS.red : DS.green, 26, 800, "end") : "") +
        T(44, y, typed(txt, lt, d), DS.ink, 21, 500, "start", MONO); }).join("");
}
// terminal rows: [delay, text, colour]
function shell(lt, rows, top = 16) {
  const h = 44 + rows.length * 44;
  return `<rect x="25" y="${top + 9}" width="600" height="${h}" rx="16" fill="${DS.ink}" opacity=".15"/><rect x="20" y="${top}" width="600" height="${h}" rx="16" fill="#0f172a"/>` +
    rows.map(([d, txt, col], i) => T(44, top + 52 + i * 44, typed(txt, lt, d, txt.startsWith("$") ? .9 : .25), col || "#e2e8f0", 21, 500, "start", MONO)).join("");
}
function finding(lt, d, y, sev, title, sub) {
  return G(lt, d, 320, y, box(-290, -58, 580, 116, SEV[sev], "#fff", 16) + `<rect x="-270" y="-24" width="${sev.length * 15 + 34}" height="48" rx="24" fill="${SEV[sev]}"/>` +
    T(-253, 8, sev, "#fff", 22, 800, "start") + T(-270 + sev.length * 15 + 52, -4, title, DS.ink, 24, 800, "start") + T(-270 + sev.length * 15 + 52, 30, sub, DS.mute, 19, 500, "start", MONO));
}
// pipeline: names in a row; marks[i] = "ok" | "bad" | "shield" | undefined, shown after delays d0 + i * gap
function stages(lt, names, y, d0 = .2, marks = [], gap = .35) {
  const w = (600 - (names.length - 1) * 22) / names.length;
  return names.map((n, i) => { const x = 20 + i * (w + 22), d = d0 + i * gap, m = marks[i], col = m === "bad" ? DS.red : m ? DS.green : DS.ink;
    return (i ? `<path d="M${x - 19} ${y} h14" stroke="${DS.mute}" stroke-width="4" stroke-linecap="round" opacity="${clamp((lt - d) / .2)}"/>` : "") +
      G(lt, d, x + w / 2, y, `<rect x="${-w / 2}" y="-34" width="${w}" height="68" rx="14" fill="#fff" stroke="${col}" stroke-width="4"/>` + T(0, 8, n, col, w < 120 ? 19 : 22, 800)) +
      (m && lt > d + .5 ? (m === "shield" ? shield(x + w / 2, y - 62, .62 * backOut(clamp((lt - d - .5) / .3)), DS.red) :
        `<circle cx="${x + w - 6}" cy="${y - 30}" r="${15 * backOut(clamp((lt - d - .5) / .3))}" fill="${col}"/>` + T(x + w - 6, y - 23, m === "bad" ? "✕" : "✓", "#fff", 18, 800)) : ""); }).join("");
}
function hero(lt, big, sub, col = DS.red) {
  return G(lt, .1, 320, 250, `<rect x="-262" y="-150" width="540" height="320" rx="60" fill="${DS.ink}" opacity=".16"/><rect x="-272" y="-164" width="540" height="320" rx="60" fill="#fff"/>` +
    `<rect x="-248" y="-140" width="492" height="272" rx="42" fill="#fff1f3" stroke="${DS.ink}" stroke-width="10"/>` + shield(0, -62, 1.25, col) +
    T(0, 52, big, DS.ink, big.length > 8 ? 62 : 84, 800) + T(0, 98, sub, DS.mute, sub.length > 32 ? 19 : 22, 600));
}
// rows: [delay, tag, text, colour]
function bullets(lt, items, top = 30, gap = 104) {
  return items.map(([d, tag, text, col = DS.red], i) => G(lt, d, 320, top + 44 + i * gap, box(-290, -42, 580, 84, DS.line, "#fff", 16) +
    `<rect x="-290" y="-42" width="${Math.max(120, tag.length * 17 + 36)}" height="84" rx="16" fill="${col}"/>` + T(-290 + Math.max(120, tag.length * 17 + 36) / 2, 10, tag, "#fff", 26, 800) +
    T(-290 + Math.max(120, tag.length * 17 + 36) + 22, 9, text, DS.ink, text.length > 24 ? 21 : 24, 700, "start"))).join("");
}
// two cards side by side: { title, lines: [...], col, d }
function compare(lt, L, R, top = 30, h = 300) {
  return [L, R].map((c, i) => G(lt, c.d ?? .2 + i * 1.2, 165 + i * 310, top + h / 2, box(-145, -h / 2, 290, h, c.col, "#fff", 18) +
    `<path d="M-145 ${-h / 2 + 62} V${-h / 2 + 18} a18 18 0 0 1 18 -18 H127 a18 18 0 0 1 18 18 V${-h / 2 + 62} Z" fill="${c.col}"/>` + T(0, -h / 2 + 42, c.title, "#fff", 24, 800) +
    c.lines.map((l, j) => T(0, -h / 2 + 116 + j * 44, l, j === c.lines.length - 1 && c.last ? c.col : DS.ink, l.length > 18 ? 19 : 22, j === c.lines.length - 1 && c.last ? 800 : 600)).join(""))).join("");
}
function recap(lt, rows, top = 30) {
  return rows.map(([a, b, col], i) => G(lt, .1 + i * .9, 320, top + 60 + i * 136, box(-290, -52, 580, 104, col, "#fff", 16) + `<rect x="-290" y="-52" width="22" height="104" rx="8" fill="${col}"/>` +
    T(-244, 12, a, DS.ink, a.length > 12 ? 28 : 36, 800, "start") + T(266, 11, b, col, b.length > 16 ? 21 : 25, 700, "end"))).join("");
}
function nextCard(lt, part, title, d2 = 2.2) {
  return G(lt, .2, 320, 150, box(-290, -96, 580, 192, DS.line, "#fff", 22) + T(-250, -30, part, DS.mute, 24, 700, "start", MONO) + T(-250, 36, title, DS.ink, title.length > 22 ? 32 : 40, 800, "start")) +
    G(lt, d2, 320, 370, `<rect x="-176" y="-44" width="360" height="100" rx="50" fill="${DS.ink}" opacity=".18"/><rect x="-180" y="-52" width="360" height="100" rx="50" fill="${DS.red}"/>` + T(0, 12, "+ Follow", "#fff", 40, 800));
}

const DEPS = ["express 4.19.2", "lodash 4.17.20", "axios 1.7.2", "dotenv 16.4.5"];
const depList = (lt, d0, flagAt) => box(20, 16, 600, 290, DS.ink, "#fff", 16) + `<path d="M20 68 V32 a16 16 0 0 1 16 -16 H604 a16 16 0 0 1 16 16 V68 Z" fill="${DS.ink}"/>` + T(44, 51, "package.json", "#fff", 22, 700, "start", MONO) +
  DEPS.map((n, i) => { const d = d0 + i * .45, bad = i === 1 && lt > flagAt; return (bad ? `<rect x="30" y="${84 + i * 52}" width="580" height="44" rx="8" fill="${DS.red}" opacity=".14"/>` : "") +
    T(48, 114 + i * 52, n, DS.ink, 23, 500, "start", MONO, (lt - d) / .2) + (lt > d + .5 ? T(588, 115 + i * 52, bad ? "✕" : "✓", bad ? DS.red : DS.green, 26, 800, "end") : ""); }).join("");
const P = {
  share: lt => svg(G(lt, .2, 320, 220, `<rect x="-280" y="-60" width="110" height="120" rx="14" fill="${DS.blue}"/><rect x="-160" y="-60" width="440" height="120" rx="14" fill="${DS.amber}"/>` + T(-225, 100, "your code", DS.blue, 22, 800) + T(60, 100, "open-source libraries", "#b45309", 22, 800)) +
    T(320, 420, "who checks these?", DS.red, 30, 800, "middle", SANS, (lt - 3.4) / .3), 460),
  hero: lt => svg(hero(lt, "SCA", "Software Composition Analysis"), 460),
  deps: lt => svg(depList(lt, .3, 99) + T(320, 356, "checked against known vulnerabilities", DS.mute, 21, 700, "middle", MONO, (lt - 3) / .3), 390),
  recall: lt => svg(G(lt, .2, 320, 190, box(-240, -150, 480, 300, DS.amber, "#fffbeb", 20) + T(0, -92, "RECALL LIST", "#b45309", 30, 800) + ["flour · batch 12", "eggs · batch 7", "milk · batch 3"].map((s, i) => T(-190, -30 + i * 54, s, DS.ink, 26, 600, "start") + (i === 1 && lt > 2.4 ? `<rect x="-206" y="${-62 + i * 54}" width="412" height="44" rx="8" fill="${DS.red}" opacity=".16"/>` : "")).join("")) +
    T(320, 400, "is anything you use on the list?", DS.mute, 22, 700, "middle", SANS, (lt - 2.8) / .3), 430),
  audit: lt => svg(shell(lt, [[.3, "$ npm audit"], [2.6, "lodash  4.17.20", "#fda4af"], [3.2, "1 high severity vulnerability", "#fda4af"]]) + finding(lt, 5.8, 290, "High", "Command injection", "lodash · CVE-2021-23337"), 370),
  fix: lt => svg(shell(lt, [[2.6, "$ npm audit fix"], [4.4, "found 0 vulnerabilities", "#86efac"]], 16) + G(lt, 4.8, 320, 250, box(-290, -52, 580, 104, DS.green, "#f0fdf4", 16) + T(-260, 12, "lodash", DS.ink, 28, 800, "start", MONO) + T(-110, 12, "4.17.20", DS.red, 26, 500, "start", MONO) + T(30, 12, "→", DS.mute, 30, 800, "start") + T(90, 12, "4.17.21 ✓", DS.green, 26, 700, "start", MONO)), 330),
  sbom: lt => svg(G(lt, .2, 320, 200, box(-220, -170, 440, 340, DS.blue, "#fff", 20) + T(0, -110, "SBOM", DS.blue, 44, 800) + T(0, -76, "software bill of materials", DS.mute, 19, 600) + DEPS.map((n, i) => T(-170, -20 + i * 46, "• " + n.replace("4.17.20", "4.17.21"), DS.ink, 22, 500, "start", MONO, (lt - 2.6 - i * .3) / .2)).join("")), 420),
  recap: lt => svg(recap(lt, [["List", "every dependency", DS.blue], ["Match", "known vulnerabilities", DS.red], ["Patch", "upgrade the version", DS.green]]), 450),
  next: lt => svg(nextCard(lt, "Part 4", "DAST: test the running app", 3), 450),
};
