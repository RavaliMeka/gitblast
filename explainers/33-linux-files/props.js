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
// story helpers: a dated case card and a big-number stat
function caseCard(lt, date, name, col = DS.red, note = "a true story") {
  return G(lt, .1, 320, 230, `<rect x="-262" y="-136" width="540" height="300" rx="36" fill="${DS.ink}" opacity=".16"/><rect x="-272" y="-150" width="540" height="300" rx="36" fill="#fff" stroke="${DS.ink}" stroke-width="10"/>` +
    `<rect x="-272" y="-150" width="540" height="78" rx="36" fill="${DS.ink}"/><rect x="-272" y="-110" width="540" height="38" fill="${DS.ink}"/>` + T(-236, -98, "CASE FILE", "#fff", 24, 800, "start", MONO) + `<circle cx="226" cy="-110" r="11" fill="${col}"/>` +
    T(0, -8, date, col, 46, 800, "middle", MONO) + T(0, 62, name, DS.ink, name.length > 20 ? 30 : 38, 800) + T(0, 108, note, DS.mute, note.length > 20 ? 17 : 20, 600, "middle", MONO));
}
function stat(lt, d, big, label, col = DS.red, y = 200) {
  return G(lt, d, 320, y, box(-280, -130, 560, 260, col, "#fff", 26, 6) + T(0, 28, big, col, big.length > 6 ? 78 : 120, 800) + T(0, 92, label, DS.mute, label.length > 30 ? 19 : 22, 700, "middle", MONO));
}
// closing card with no next topic: just the handle and a follow button
function followCard(lt, line = "DevOps, one simple idea at a time") {
  return G(lt, .2, 320, 150, box(-290, -96, 580, 192, DS.line, "#fff", 22) + T(0, -14, "@dnimbus.ai", DS.ink, 46, 800, "middle", MONO) + T(0, 40, line, DS.mute, 22, 600)) +
    G(lt, 1.6, 320, 370, `<rect x="-176" y="-44" width="360" height="100" rx="50" fill="${DS.ink}" opacity=".18"/><rect x="-180" y="-52" width="360" height="100" rx="50" fill="${DS.red}"/>` + T(0, 12, "+ Follow", "#fff", 40, 800));
}
// plain title sticker (no shield) and a labelled stack of layers
function titleCard(lt, big, sub, col = DS.blue) {
  return G(lt, .1, 320, 230, `<rect x="-262" y="-116" width="540" height="260" rx="60" fill="${DS.ink}" opacity=".16"/><rect x="-272" y="-130" width="540" height="260" rx="60" fill="#fff"/>` +
    `<rect x="-248" y="-106" width="492" height="212" rx="42" fill="#fff" stroke="${DS.ink}" stroke-width="10"/>` + T(0, 12, big, col, big.length > 8 ? 64 : 92, 800) + T(0, 68, sub, DS.mute, 22, 600));
}
function stack(lt, rows, d0 = .2, top = 60) {
  return rows.map(([n, c, note], i) => G(lt, d0 + (rows.length - 1 - i) * .4, 320, top + i * 92, `<rect x="-225" y="-27" width="460" height="76" rx="14" fill="${DS.ink}" opacity=".1"/><rect x="-230" y="-36" width="460" height="76" rx="14" fill="${c}"/>` +
    T(-200, 12, n, "#fff", 28, 800, "start") + (note ? T(206, 11, note, "#fff", 19, 600, "end", MONO) : ""))).join("");
}
const TL = "#0d9488";

const P = {
  log: lt => svg(shell(lt, [[.1, "12:01 info  request ok", "#94a3b8"], [.3, "12:02 info  request ok", "#94a3b8"], [.5, "12:03 info  request ok", "#94a3b8"], [.7, "12:04 info  request ok", "#94a3b8"], [.9, "…10,000 more lines", "#64748b"]]) + T(320, 320, "where is the error?", DS.red, 26, 800, "middle", SANS, (lt - 3) / .3), 350),
  four: lt => svg(bullets(lt, [[.2, "cat", "print a file", TL], [.7, "tail", "show the end", DS.blue], [1.2, "grep", "search for a word", DS.amber], [1.7, "|", "join commands", DS.ink]], 10, 104), 440),
  cat: lt => svg(shell(lt, [[.3, "$ cat notes.txt"], [1.6, "buy milk", "#86efac"], [1.8, "call the bank", "#86efac"]]), 200),
  tail: lt => svg(shell(lt, [[.3, "$ tail -n 3 app.log"], [2, "12:03 info  request ok", "#94a3b8"], [2.2, "12:04 error db timeout", "#fda4af"], [2.4, "12:05 info  request ok", "#94a3b8"]]) + T(320, 250, "-n 3 = the last three lines", DS.mute, 21, 700, "middle", MONO, (lt - 3.4) / .3), 290),
  grep: lt => svg(shell(lt, [[2.4, "$ grep error app.log"], [4.4, "12:04 error db timeout", "#fda4af"]]) + T(320, 190, "only the matching lines", DS.mute, 21, 700, "middle", MONO, (lt - 5.2) / .3), 230),
  pipe: lt => svg(shell(lt, [[2.6, "$ tail -n 100 app.log | grep error"], [5.4, "12:04 error db timeout", "#fda4af"]]) + stages(lt, ["tail", "|", "grep"], 250, .4, [], .5) + T(320, 340, "output of one → input of the next", DS.mute, 21, 700, "middle", MONO, (lt - 3.4) / .3), 380),
  live: lt => svg(shell(lt, [[1.6, "$ tail -f app.log"], [3.2, "12:06 info  request ok", "#94a3b8"], [4, "12:07 info  request ok", "#94a3b8"], [4.8, "12:08 error db timeout", "#fda4af"]]), 250),
  recap: lt => svg(recap(lt, [["cat", "print it", TL], ["tail", "see the end", DS.blue], ["grep", "search it", DS.amber]]), 450),
  next: lt => svg(nextCard(lt, "Part 4", "File permissions", 2.2), 450),
};
