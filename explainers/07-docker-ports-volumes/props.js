/* ---------- Props: blueprint theme (architect's line drawings) ---------- */
const BP = "#1e55a8", OG = "#f08a24", GD = "#1f9d6b", RE = "#d6453d", FAINT = "#9db6db";
const mono = "DejaVu Sans Mono, monospace";
const svg = (inner, h = 680) => `<svg class="abs" style="left:0;top:0" width="640" height="${h}" viewBox="0 0 640 ${h}">${inner}</svg>`;
const T = (x, y, s, col = BP, size = 28, weight = 700, anchor = "middle", font = mono, op = 1) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${font}" font-weight="${weight}" font-size="${size}" fill="${col}" opacity="${clamp(op)}">${s}</text>`;
// stroke drawn on over time
const D = (d, len, col = BP, k = 1, w = 5, dash = "") => `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${dash ? `stroke-dasharray="${dash}"` : `stroke-dasharray="${len}" stroke-dashoffset="${len * (1 - clamp(k))}"`}/>`;
const rect = (x, y, w, h, col = BP, k = 1, wd = 5) => D(`M${x} ${y} H${x + w} V${y + h} H${x} Z`, 2 * (w + h), col, k, wd);
const dim = (x1, x2, y, label, k = 1) => k <= 0 ? "" : `<g opacity="${clamp(k * 2)}">${D(`M${x1} ${y} H${x2} M${x1} ${y - 10} V${y + 10} M${x2} ${y - 10} V${y + 10}`, 0, FAINT, 1, 3, "none")}${T((x1 + x2) / 2, y - 12, label, FAINT, 20, 700)}</g>`;
// apartment block: 2 floors x 2 units, highlighted unit = the container
function building(x, y, k = 1, hi = -1) {
  let s = rect(x, y, 300, 300, BP, k) + D(`M${x - 20} ${y} L${x + 150} ${y - 90} L${x + 320} ${y}`, 420, BP, k - .2);
  for (let r = 0; r < 2; r++) for (let c = 0; c < 2; c++) {
    const ux = x + 20 + c * 140, uy = y + 20 + r * 140, i = r * 2 + c;
    s += `<rect x="${ux}" y="${uy}" width="120" height="120" fill="${i === hi ? "rgba(240,138,36,.14)" : "none"}"/>` + rect(ux, uy, 120, 120, i === hi ? OG : BP, k - .3 - i * .1, i === hi ? 6 : 3);
  }
  return s;
}
const lock = (x, y, k) => k <= 0 ? "" : `<g transform="translate(${x} ${y}) scale(${backOut(clamp(k / .4))})">${D("M-16 -6 V-20 a16 16 0 0 1 32 0 V-6", 0, OG, 1, 6, "none")}<rect x="-24" y="-8" width="48" height="38" rx="6" fill="${OG}"/></g>`;
const person = (x, y, col = BP) => `<g transform="translate(${x} ${y})"><circle cy="-46" r="16" fill="none" stroke="${col}" stroke-width="5"/>${D("M0 -30 V10 M-22 -14 H22 M0 10 L-16 40 M0 10 L16 40", 0, col, 1, 5, "none")}</g>`;
const file = (x, y, col = BP, o = 1) => `<g transform="translate(${x} ${y})" opacity="${o}"><path d="M-20 -26 h28 l12 12 v40 h-40 z" fill="#fff" stroke="${col}" stroke-width="4"/><path d="M-12 -4 h24 M-12 6 h24" stroke="${col}" stroke-width="3"/></g>`;
function term3(lt, cmd, d, top) {
  const k = clamp((lt - d) / .8), txt = cmd.slice(0, Math.ceil(cmd.length * k));
  return lt < d ? "" : `<rect x="40" y="${top}" width="560" height="70" rx="10" fill="#fff" stroke="${BP}" stroke-width="4"/>` + T(60, top + 44, "$ " + txt, BP, 22, 800, "start");
}

const P = {
  hook: lt => svg(rect(60, 60, 520, 230, BP, lt / .5) + T(320, 150, "localhost:8000", FAINT, 26, 700, "middle", mono, (lt - .3) / .3) +
    T(320, 225, "can't reach this page", RE, 32, 800, "middle", mono, (lt - .6) / .3) +
    rect(200, 360, 240, 200, BP, (lt - 2.8) / .5) + [0, 1, 2].map(i => file(260 + i * 60, 450, BP, clamp(1 - (lt - 3.4) / .6))).join("") +
    T(320, 610, "data: 0 files", RE, 28, 800, "middle", mono, (lt - 3.8) / .3)),

  two: lt => svg(`<g style="${pop(lt, .2)}">${rect(40, 120, 260, 300, BP)}${T(170, 250, "🚪", BP, 80, 400)}${T(170, 360, "PORTS", BP, 40, 900)}</g>` +
    `<g style="${pop(lt, 1)}">${rect(340, 120, 260, 300, OG)}${T(470, 250, "🗄️", OG, 80, 400)}${T(470, 360, "VOLUMES", OG, 40, 900)}</g>`),

  apartment: lt => svg(building(170, 200, lt / .8, 3) + lock(500, 440, (lt - 1.4)) + T(320, 600, "sealed: no way in, nothing kept", BP, 26, 700, "middle", mono, (lt - 1.8) / .3) + dim(170, 470, 560, "container", (lt - 1) / .3)),

  ports: lt => {
    const walk = easeOut(clamp((lt - 5.3) / 1.4));
    return svg(rect(300, 140, 300, 330, BP) + T(450, 180, "container", FAINT, 22, 700) +
      rect(330, 330, 70, 140, OG, (lt - .3) / .6, 6) + T(365, 315, "8000", OG, 26, 900, "middle", mono, (lt - .5) / .3) +
      rect(480, 220, 90, 90, BP, (lt - .8) / .5, 4) + T(525, 272, "app", BP, 24, 800, "middle", mono, (lt - 1) / .3) + T(525, 340, "3000", BP, 26, 900, "middle", mono, (lt - 1.1) / .3) +
      person(lerp(120, 300, walk), 450) + (walk > .95 ? D("M400 400 C 440 400, 450 330, 480 290", 200, GD, (lt - 6.7) / .6, 6) : "") +
      term3(lt, "docker run -p 8000:3000 my-app", 2, 540) +
      T(150, 250, "outside", FAINT, 24, 700, "middle", mono, lt / .3), 660);
  },

  lost: lt => {
    const gone = clamp((lt - 2.6) / .8);
    return svg(`<g opacity="${1 - gone * .85}">${rect(170, 140, 300, 300, BP)}${[0, 1, 2, 3].map(i => file(230 + (i % 2) * 90 + 30, 230 + Math.floor(i / 2) * 110, BP, 1 - gone)).join("")}</g>` +
      (lt > 2.6 ? D("M180 150 L460 430 M460 150 L180 430", 800, RE, (lt - 2.6) / .5, 8) : "") +
      T(320, 540, "docker rm my-app", BP, 28, 800, "middle", mono, (lt - 2) / .3) + T(320, 600, "everything inside: gone", RE, 28, 800, "middle", mono, (lt - 3.2) / .3));
  },

  volume: lt => svg(rect(60, 140, 270, 270, BP) + T(195, 180, "container", FAINT, 22, 700) + T(195, 300, "/data", BP, 30, 800, "middle", mono) +
    rect(420, 200, 170, 210, OG, (lt - .4) / .6, 6) + [0, 1, 2].map(i => `<path d="M440 ${240 + i * 50} h130" stroke="${OG}" stroke-width="3" opacity="${clamp((lt - 1) / .3)}"/>`).join("") +
    T(505, 450, "my-data", OG, 26, 900, "middle", mono, (lt - 1) / .3) +
    D("M330 300 H420", 90, GD, (lt - 6) / .5, 10) + (lt > 6.5 ? `<circle cx="375" cy="300" r="10" fill="${GD}"/>` : "") +
    term3(lt, "docker run -v my-data:/data my-app", 3, 530)),

  survive: lt => {
    const old = clamp(1 - lt / .8), neu = clamp((lt - 2) / .6);
    return svg(`<g opacity="${old}">${rect(60, 140, 270, 270, BP)}${D("M70 150 L320 400 M320 150 L70 400", 0, RE, 1, 6, "none")}</g>` +
      `<g opacity="${neu}">${rect(60, 140, 270, 270, GD)}${T(195, 180, "new container", FAINT, 20, 700)}${[0, 1, 2].map(i => file(130 + i * 65, 290, GD)).join("")}</g>` +
      rect(420, 200, 170, 210, OG, 1, 6) + T(505, 450, "my-data", OG, 26, 900) + D("M330 300 H420", 0, GD, 1, 10, "none") +
      T(320, 560, lt > 3 ? "data still there ✓" : "", GD, 34, 900, "middle", mono, (lt - 3) / .3));
  },

  recap: lt => svg(`<g style="${pop(lt, .1)}">${rect(40, 100, 560, 160, BP)}${T(110, 200, "🚪", BP, 60, 400)}${T(180, 170, "PORTS", BP, 36, 900, "start")}${T(180, 220, "let traffic in", BP, 28, 700, "start")}</g>` +
    `<g style="${pop(lt, 2)}">${rect(40, 320, 560, 160, OG)}${T(110, 420, "🗄️", OG, 60, 400)}${T(180, 390, "VOLUMES", OG, 36, 900, "start")}${T(180, 440, "keep data safe", OG, 28, 700, "start")}</g>`),

  next: lt => svg(`<g style="${pop(lt, .2)}">${rect(40, 80, 560, 200, BP)}${T(80, 150, "Part 4", FAINT, 28, 800, "start")}${T(80, 225, "Docker Compose", BP, 46, 900, "start")}</g>` +
    [0, 1, 2].map(i => `<g style="${pop(lt, 1.2 + i * .3)}">${rect(120 + i * 140, 320, 110, 80, [BP, OG, GD][i])}</g>`).join("") +
    `<g transform="translate(320 520)"><g style="${pop(lt, 5)}"><rect x="-180" y="-50" width="360" height="100" rx="50" fill="${BP}"/>${T(0, 14, "+ Follow", "#fff", 40, 900, "middle", "Inter")}</g></g>`),
};
