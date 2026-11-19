/* ---------- Props: whiteboard marker drawings (centre) ---------- */
const MB = "#1f5fd6", MR = "#d63031", MG = "#1f9d55", INK = "#1d2433";
const svg = (inner, h = 640) => `<svg class="abs" style="left:0;top:20px" width="620" height="${h}" viewBox="0 0 620 ${h}"><g filter="url(#rough)">${inner}</g></svg>`;
// hand-drawn stroke revealed by k
const draw = (d, len, col, k = 1, w = 7) => `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${len}" stroke-dashoffset="${len * (1 - clamp(k))}"/>`;
const ring = (cx, cy, rx, ry, col, k) => k <= 0 ? "" : draw(`M${cx + rx} ${cy} A ${rx} ${ry} 0 1 1 ${cx + rx - 1} ${cy - 8}`, Math.PI * (rx + ry) * 1.05, col, k, 6);
const word = (x, y, t, col = INK, size = 30, k = 1, anchor = "start", weight = 700, font = "Inter") =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${font}" font-weight="${weight}" font-size="${size}" fill="${col}" opacity="${clamp(k * 2)}">${t}</text>`;
const board = (x, y, w, h, col = INK, k = 1) => draw(`M${x + 14} ${y} H${x + w - 14} Q${x + w} ${y} ${x + w} ${y + 14} V${y + h - 14} Q${x + w} ${y + h} ${x + w - 14} ${y + h} H${x + 14} Q${x} ${y + h} ${x} ${y + h - 14} V${y + 14} Q${x} ${y} ${x + 14} ${y}`, 2 * (w + h), col, k, 5);
const mono = "DejaVu Sans Mono, monospace";

const P = {
  alarm: lt => svg(
    board(40, 40, 540, 230, INK, lt / .5) +
    word(70, 100, "$ git merge feature", INK, 30, (lt - .3) / .3, "start", 700, mono) +
    word(70, 160, "CONFLICT (content):", MR, 30, (lt - 1.6) / .2, "start", 800, mono) +
    word(70, 205, "Merge conflict in app.js", MR, 28, (lt - 1.8) / .2, "start", 700, mono) +
    (lt > 1.6 ? `<g transform="translate(310 410) scale(${backOut(clamp((lt - 1.6) / .35))})">${draw("M-110 0 L-40 -30 L-60 -100 L0 -50 L50 -110 L45 -35 L120 -40 L60 10 L110 70 L30 45 L0 115 L-25 45 L-100 70 L-50 15 Z", 1150, MR, 1, 7)}<text x="0" y="28" text-anchor="middle" font-family="Inter" font-weight="900" font-size="90" fill="${MR}">!</text></g>` : "") +
    (lt > 4 ? `<g transform="translate(470 560) rotate(-6) scale(${backOut(clamp((lt - 4) / .3))})"><rect x="-110" y="-40" width="220" height="80" rx="12" fill="#fff6a8"/>${word(0, 12, "it's normal 🙂", INK, 30, 1, "middle", 800)}</g>` : "")),

  twolines: lt => svg(
    board(150, 250, 320, 300, INK, lt / .4) + word(310, 300, "app.js", INK, 30, (lt - .3) / .3, "middle", 800, mono) +
    [0, 1, 2, 3, 4].map(i => `<rect x="185" y="${330 + i * 40}" width="${[200, 160, 230, 180, 140][i]}" height="14" rx="7" fill="${i === 2 && lt > 2 ? MR : "#c9cfd9"}" opacity="${clamp((lt - .4 - i * .08) / .2)}"/>`).join("") +
    draw("M40 90 C 120 110, 140 380, 180 418", 420, MB, (lt - .6) / .6) + word(30, 70, "main", MB, 32, (lt - .6) / .3, "start", 800) +
    draw("M580 90 C 500 110, 480 380, 430 418", 420, MG, (lt - 1.2) / .6) + word(590, 70, "feature", MG, 32, (lt - 1.2) / .3, "end", 800) +
    ring(300, 418, 150, 30, MR, (lt - 2.2) / .5) + word(310, 600, "same line!", MR, 36, (lt - 2.6) / .3, "middle", 900)),

  versus: lt => svg(
    board(20, 120, 260, 200, MB, lt / .4) + word(150, 170, "main", MB, 30, (lt - .2) / .3, "middle", 800) + word(150, 250, 'greet =', INK, 26, (lt - .3) / .3, "middle", 700, mono) + word(150, 292, '"Hello"', MB, 34, (lt - .4) / .3, "middle", 800, mono) +
    board(340, 120, 260, 200, MG, (lt - 2) / .4) + word(470, 170, "feature", MG, 30, (lt - 2.2) / .3, "middle", 800) + word(470, 250, 'greet =', INK, 26, (lt - 2.3) / .3, "middle", 700, mono) + word(470, 292, '"Hi there"', MG, 34, (lt - 2.4) / .3, "middle", 800, mono) +
    word(310, 235, "vs", MR, 54, (lt - 1.2) / .3, "middle", 900) +
    word(310, 430, "both changed line 3", INK, 32, (lt - 3.2) / .3, "middle", 700)),

  asks: lt => svg(
    draw("M120 90 H500 Q540 90 540 130 V280 Q540 320 500 320 H260 L200 380 L210 320 H120 Q80 320 80 280 V130 Q80 90 120 90 Z", 1500, INK, lt / .6, 6) +
    word(310, 175, "Git:", MR, 34, (lt - .4) / .3, "middle", 900) + word(310, 245, "Which one do you want?", INK, 34, (lt - .6) / .3, "middle", 800) +
    `<g style="${pop(lt, 2)}">${board(70, 440, 220, 90, MB)}${word(180, 497, '"Hello"', MB, 32, 1, "middle", 800, mono)}</g>` +
    `<g style="${pop(lt, 2.3)}">${board(330, 440, 220, 90, MG)}${word(440, 497, '"Hi there"', MG, 32, 1, "middle", 800, mono)}</g>`),

  markers: lt => {
    const L = [["<<<<<<< HEAD", MR], ['greet = "Hello"', MB], ["=======", MR], ['greet = "Hi there"', MG], [">>>>>>> feature", MR]];
    return svg(board(30, 60, 560, 380, INK, lt / .4) + word(60, 112, "app.js", "#7a8494", 26, (lt - .2) / .3, "start", 700, mono) +
      L.map(([t, c], i) => word(60, 175 + i * 56, t, c, 30, (lt - (c === MR ? 1 : .4) - i * .08) / .25, "start", 800, mono)).join("") +
      ring(250, 211, 230, 36, MB, (lt - 3) / .5) + word(560, 220, "yours", MB, 30, (lt - 3.3) / .3, "end", 900) +
      ring(270, 323, 250, 36, MG, (lt - 6) / .5) + word(560, 400, "theirs", MG, 30, (lt - 6.3) / .3, "end", 900) +
      word(310, 520, "Git adds these markers", INK, 30, (lt - 1.5) / .3, "middle", 700));
  },

  resolve: lt => {
    const gone = clamp((lt - 3.2) / .6);
    const rows = [["<<<<<<< HEAD", MR, 1], ['greet = "Hello"', MB, 1], ["=======", MR, 1], ['greet = "Hi there"', MG, 0], [">>>>>>> feature", MR, 1]];
    let y = 175, out = "";
    rows.forEach(([t, c, del], i) => {
      const o = del ? 1 - gone : 1;
      out += `<g opacity="${o}">${word(60, y, t, c, 30, 1, "start", 800, mono)}${del ? draw(`M55 ${y - 10} H${70 + t.length * 18}`, 420, MR, (lt - 2 - i * .12) / .3, 5) : ""}</g>`;
      y += del ? 56 * (1 - gone) + 0 : 56;
    });
    return svg(board(30, 60, 560, 380, INK) + word(60, 112, "app.js", "#7a8494", 26, 1, "start", 700, mono) + out +
      (gone > .9 ? `<g transform="translate(470 175) scale(${backOut(clamp((lt - 3.9) / .3))})">${draw("M-22 0 L-6 18 L26 -20", 80, MG, 1, 9)}</g>` : "") +
      word(310, 520, gone > .9 ? "clean ✓" : "keep one, delete markers", gone > .9 ? MG : INK, 32, 1, "middle", 800));
  },

  commit: lt => svg(board(30, 60, 560, 250, INK, lt / .4) +
    word(60, 130, "$ git add app.js", INK, 30, (lt - .2) / .3, "start", 700, mono) +
    word(60, 190, '$ git commit -m "fix conflict"', INK, 26, (lt - 2) / .3, "start", 700, mono) +
    word(60, 250, "✓ merged", MG, 30, (lt - 3.3) / .3, "start", 800, mono) +
    (lt > 4 ? `<g transform="translate(310 440) rotate(-8) scale(${backOut(clamp((lt - 4) / .3))})">${board(-190, -60, 380, 120, MG)}<text x="0" y="22" text-anchor="middle" font-family="Inter" font-weight="900" font-size="66" fill="${MG}" letter-spacing="6">SOLVED</text></g>` : "")),

  tip: lt => svg(
    `<g style="${pop(lt, .2)}">${board(60, 80, 500, 120, MB)}${word(100, 155, "⬇", MB, 44, 1, "start", 800)}${word(170, 156, "pull often", INK, 40, 1, "start", 800)}</g>` +
    `<g style="${pop(lt, 3)}">${board(60, 250, 500, 120, MG)}${word(100, 325, "✂", MG, 44, 1, "start", 800)}${word(170, 326, "small branches", INK, 40, 1, "start", 800)}</g>` +
    draw("M310 400 V450", 50, INK, (lt - 4.2) / .3, 6) + word(310, 520, "= fewer conflicts", MR, 42, (lt - 4.5) / .3, "middle", 900)),

  recap: lt => svg([["Conflict", MR], ["Fix the file", MB], ["Add", MG], ["Commit", MG]].map(([w, c], i) => {
    const d = [.1, .9, 2, 2.8][i];
    return `<g opacity="${clamp((lt - d) / .2)}">${ring(90, 110 + i * 120, 34, 34, c, (lt - d) / .4)}${word(90, 124 + i * 120, String(i + 1), c, 40, 1, "middle", 900)}${word(150, 124 + i * 120, w, INK, 42, 1, "start", 800)}${draw(`M480 ${112 + i * 120} l14 16 l28 -32`, 70, MG, (lt - d - .4) / .3, 8)}</g>`;
  }).join("")),

  follow: lt => svg(
    `<g style="${pop(lt, .2)}">${board(60, 80, 500, 160, INK)}${word(100, 150, "Up next", INK, 42, 1, "start", 900)}${word(100, 200, "Undoing mistakes", MR, 34, 1, "start", 800)}</g>` +
    `<g style="${pop(lt, 2)}"><rect x="140" y="320" width="340" height="104" rx="52" fill="${MB}"/><text x="310" y="388" text-anchor="middle" font-family="Inter" font-weight="900" font-size="44" fill="#fff">+ Follow</text></g>` +
    word(310, 500, "DevOps, one simple idea at a time", "#5d6675", 28, (lt - 2.4) / .3, "middle", 600)),
};
