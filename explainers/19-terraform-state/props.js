/* ---------- Props: library-ledger theme ---------- */
const NV = "#2b2d42", OX = "#9d0208", BRS = "#c9a227", GN = "#386641", PA = "#fffdf5", MU = "#7d7a6d";
const mono = "DejaVu Sans Mono, monospace", serif = "DejaVu Serif, Georgia, serif";
const svg = (inner, h = 600) => `<svg class="abs" style="left:0;top:0" width="640" height="${h}" viewBox="0 0 640 ${h}">${inner}</svg>`;
const T = (x, y, s, col = NV, size = 28, weight = 700, anchor = "middle", font = serif, op = 1) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${font}" font-weight="${weight}" font-size="${size}" fill="${col}" opacity="${clamp(op)}">${s}</text>`;
const grow = (k, inner, x, y) => k <= 0 ? "" : `<g transform="translate(${x} ${y}) scale(${backOut(clamp(k / .4))})">${inner}</g>`;
const card = (x, y, w, h, stroke = "#e0d6b8") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${PA}" stroke="${stroke}" stroke-width="4"/>`;
const tick = (x, y, k, col = GN) => grow(k, `<circle r="16" fill="${col}"/><path d="M-7 0 l5 6 l10 -12" stroke="#fff" stroke-width="4.5" fill="none" stroke-linecap="round"/>`, x, y);
const book = (x, y, h, col, k) => grow(k, `<rect x="-24" y="${-h}" width="48" height="${h}" rx="4" fill="${col}"/><rect x="-24" y="${-h + 16}" width="48" height="8" fill="${BRS}"/><rect x="-24" y="-26" width="48" height="8" fill="${BRS}"/>`, x, y);
const fileIcon = (label, col = OX) => `<path d="M-70 -90 h100 l40 40 v140 h-140 z" fill="${PA}" stroke="${col}" stroke-width="6"/><path d="M30 -90 v40 h40" fill="none" stroke="${col}" stroke-width="6"/><path d="M-44 -20 h88 M-44 8 h88 M-44 36 h60" stroke="${col}" stroke-width="5" opacity=".5"/><text y="132" text-anchor="middle" font-family="${mono}" font-weight="700" font-size="22" fill="${NV}">${label}</text>`;
const person = (x, y, col) => `<g transform="translate(${x} ${y})"><circle cy="-56" r="22" fill="#f2c9a5"/><path d="M-30 -30 Q0 -46 30 -30 L34 40 H-34 Z" fill="${col}"/></g>`;
const cross = (x1, y1, x2, y2, k) => k <= 0 ? "" : `<path d="M${x1} ${y1} L${x1 + (x2 - x1) * clamp(k)} ${y1 + (y2 - y1) * clamp(k)}" stroke="${OX}" stroke-width="7" stroke-linecap="round"/>`;
function lterm(lt, rows, top = 30) {
  return `<rect x="30" y="${top}" width="580" height="${36 + rows.length * 46}" rx="12" fill="${NV}"/>` + rows.map(([d, txt, col], i) => T(56, top + 54 + i * 46, txt.replace(/ /g, " "), col || "#edf2f4", 23, 700, "start", mono, (lt - d) / .25)).join("");
}

const P = {
  q: lt => svg(card(30, 60, 250, 150) + T(155, 112, "your code", MU, 22, 700, "middle", mono) + T(155, 162, 'server "web"', NV, 24, 700, "middle", mono) +
    card(360, 60, 250, 150, GN) + T(485, 112, "the real cloud", MU, 22, 700, "middle", mono) + T(485, 162, "i-0a1b2c", GN, 24, 700, "middle", mono) +
    (lt < 3 ? T(320, 160, "?", OX, 70 + Math.sin(lt * 6) * 6, 700) : `<path d="M280 135 H360" stroke="${OX}" stroke-width="5" stroke-dasharray="8 8"/>`) +
    grow(lt - 3, fileIcon("terraform.tfstate"), 320, 370), 560),

  ledger: lt => svg(`<rect x="60" y="150" width="520" height="14" rx="5" fill="#b08968"/>` + [OX, NV, GN, BRS, "#5f0f40"].map((c, i) => book(140 + i * 90, 150, 96 + (i % 2) * 18, c, lt - .3 - i * .25)).join("") +
    card(60, 200, 520, 330) + `<rect x="60" y="200" width="520" height="50" rx="10" fill="${NV}"/>` + T(84, 234, "Ledger", "#fff", 24, 700, "start") +
    ["Book 1", "Book 2", "Book 3", "Book 4", "Book 5"].map((w, i) => { const d = 2 + i * .45; return `<path d="M84 ${300 + i * 46} H556" stroke="#e0d6b8" stroke-width="2"/>` + T(90, 290 + i * 46, w + " · on shelf", NV, 22, 400, "start", serif, (lt - d) / .2) + tick(536, 282 + i * 46, lt - d - .1); }).join(""), 560),

  map: lt => svg([["web", "i-0a1b2c"], ["db", "db-77f3"], ["network", "vpc-9c2e"]].map(([a, b], i) => { const d = 3 + i * .6, y = 110 + i * 130;
      return card(20, y - 40, 170, 80) + T(105, y + 9, a, NV, 24, 700, "middle", mono) + card(450, y - 40, 170, 80, GN) + T(535, y + 9, b, GN, 22, 700, "middle", mono) +
        (lt > d ? `<path d="M190 ${y} H${190 + 260 * clamp((lt - d) / .5)}" stroke="${OX}" stroke-width="5" stroke-dasharray="8 8"/>` : ""); }).join("") +
    `<rect x="250" y="40" width="140" height="400" rx="10" fill="${PA}" stroke="${OX}" stroke-width="5" opacity=".95"/>` + T(320, 90, "tfstate", OX, 24, 700, "middle", mono) +
    [0, 1, 2].map(i => T(320, 120 + i * 130, "↔", OX, 34, 700, "middle", serif, (lt - 3.3 - i * .6) / .2)).join("") +
    T(105, 480, "code", MU, 22, 700, "middle", mono) + T(535, 480, "real", MU, 22, 700, "middle", mono), 520),

  warn: lt => svg(`<g transform="translate(320 150) scale(.8)">${fileIcon("terraform.tfstate")}</g>` +
    `<g opacity="${clamp((lt - .2) / .3)}">${card(60, 300, 520, 70)}${T(90, 345, "✎  edit by hand", NV, 26, 700, "start")}</g>` + cross(70, 335, 570, 335, (lt - .8) / .4) +
    `<g opacity="${clamp((lt - 2) / .3)}">${card(60, 390, 520, 70)}${T(90, 435, "git add terraform.tfstate", NV, 22, 700, "start", mono)}</g>` + cross(70, 425, 570, 425, (lt - 2.6) / .4) +
    T(320, 520, lt > 3.6 ? "it can hold secrets 🔑" : "", OX, 30, 700, "middle", serif, (lt - 3.6) / .3), 560),

  remote: lt => svg(`<g transform="translate(320 170)"><g style="${pop(lt, .2)}"><path d="M-120 60 C -180 60, -180 -20, -120 -26 C -112 -90, -20 -104, 10 -52 C 50 -98, 140 -80, 132 -14 C 190 -10, 186 60, 130 60 Z" fill="${PA}" stroke="${NV}" stroke-width="6"/>${T(0, 10, "tfstate", OX, 26, 700, "middle", mono)}${T(0, 44, "remote storage", MU, 18, 700, "middle", mono)}</g></g>` +
    grow(lt - 1.4, `<path d="M-14 -8 V-24 a14 14 0 0 1 28 0 V-8" fill="none" stroke="${BRS}" stroke-width="7"/><rect x="-24" y="-10" width="48" height="40" rx="7" fill="${BRS}"/>`, 462, 150) +
    (lt > 3 ? person(140, 430, GN) + T(140, 500, "has the lock ✓", GN, 22, 700, "middle", mono) + `<path d="M170 380 L270 270" stroke="${GN}" stroke-width="5" stroke-dasharray="8 8"/>` + `<g opacity="${clamp((lt - 3.6) / .3)}">${person(500, 430, "#adb5bd")}${T(500, 500, "waits…", MU, 22, 700, "middle", mono)}</g>` : ""), 540),

  vars: lt => { if (lt < 5) return svg(card(30, 40, 580, 200) + T(60, 104, 'instance_type = "t3.micro"', lt > 1.6 ? MU : NV, 24, 700, "start", mono) + cross(54, 96, 470, 96, (lt - 1.6) / .4) +
      (lt > 2.2 ? `<rect x="48" y="140" width="460" height="48" rx="8" fill="${BRS}" opacity=".3"/>` : "") + T(60, 174, "instance_type = var.size", NV, 24, 700, "start", mono, (lt - 2.2) / .25) +
      `<g transform="translate(320 380)"><g style="${pop(lt, 3)}">${card(-220, -60, 440, 120, BRS)}${T(0, -8, 'variable "size" { }', NV, 26, 700, "middle", mono)}${T(0, 34, "fill in the blank", MU, 22, 400)}</g></g>`, 520);
    return svg(`<g transform="translate(320 80)"><g style="${pop(lt, 5)}">${card(-130, -44, 260, 88, NV)}${T(0, 10, "same code", NV, 28, 700)}</g></g>` +
      [["dev", '"t3.micro"', 150, .66, GN], ["prod", '"m5.large"', 490, 1, OX]].map(([n, v, x, s, c], i) => `<path d="M320 124 C 320 180, ${x} 160, ${x} 210" fill="none" stroke="${MU}" stroke-width="4" stroke-dasharray="8 8" opacity="${clamp((lt - 5.4 - i * .5) / .3)}"/>` +
        `<g transform="translate(${x} 340)"><g style="${pop(lt, 5.6 + i * .5)}">${card(-130, -130, 260, 260, c)}${T(0, -84, n, c, 32, 700)}<g transform="scale(${s})">${[0, 1, 2].map(j => `<rect x="-70" y="${-50 + j * 36}" width="140" height="28" rx="6" fill="${NV}"/><circle cx="-52" cy="${-36 + j * 36}" r="5" fill="#95d5b2"/>`).join("")}</g>${T(0, 106, "size = " + v, NV, 19, 700, "middle", mono)}</g></g>`).join(""), 520); },

  out: lt => svg(lterm(lt, [[.2, 'output "ip" {'], [.5, "  value = server.web.public_ip"], [.8, "}"]]) +
    `<g transform="translate(320 330)"><g style="${pop(lt, 2)}">${card(-250, -70, 500, 140, GN)}${T(0, -14, "Outputs:", MU, 22, 700, "middle", mono)}${T(0, 34, 'ip = "54.12.8.101"', GN, 30, 700, "middle", mono)}</g></g>`, 460),

  recap: lt => svg([["State", "remembers", OX], ["Variables", "customize", BRS], ["Outputs", "report", GN]].map(([a, b, c], i) => `<g transform="translate(320 ${100 + i * 150})"><g style="${pop(lt, .1 + i * 1)}">${card(-280, -58, 560, 116, c)}<rect x="-280" y="-58" width="20" height="116" fill="${c}"/>${T(-232, 12, a, NV, 38, 700, "start")}${T(250, 12, b, c === BRS ? "#8a6a00" : c, 30, 700, "end")}</g></g>`).join(""), 500),

  next: lt => svg(`<g transform="translate(320 170)"><g style="${pop(lt, .2)}">${card(-280, -100, 560, 200)}${T(-240, -30, "Part 4", MU, 26, 700, "start", mono)}${T(-240, 40, "Modules & cleanup", NV, 42, 700, "start")}</g></g>` +
    `<g transform="translate(320 400)"><g style="${pop(lt, 2.6)}"><rect x="-180" y="-52" width="360" height="104" rx="10" fill="${OX}"/><rect x="-170" y="-42" width="340" height="84" rx="6" fill="none" stroke="${BRS}" stroke-width="3"/>${T(0, 16, "+ Follow", "#fff", 42, 700)}</g></g>`, 500),
};
