/* ---------- Props: workshop theme (pegboard, toolboxes, tape labels) ---------- */
const TRD = "#d62828", STL = "#495057", TEA = "#0a9396", ORA = "#ee9b00", INK = "#212529", TAPE = "#ffd43b", MU = "#8a7d62", GRN = "#2b9348";
const mono = "DejaVu Sans Mono, monospace";
const svg = (inner, h = 620) => `<svg class="abs" style="left:0;top:0" width="620" height="${h}" viewBox="0 0 620 ${h}">${inner}</svg>`;
const T = (x, y, s, col = INK, size = 28, weight = 800, anchor = "middle", font = "Inter", op = 1) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${font}" font-weight="${weight}" font-size="${size}" fill="${col}" opacity="${clamp(op)}">${s}</text>`;
const grow = (k, inner, x, y) => k <= 0 ? "" : `<g transform="translate(${x} ${y}) scale(${backOut(clamp(k / .4))})">${inner}</g>`;
const card = (x, y, w, h, stroke = "#dcc99a") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="#fffdf6" stroke="${stroke}" stroke-width="4"/>`;
const tick = (x, y, k) => grow(k, `<circle r="18" fill="${GRN}"/><path d="M-8 0 l6 7 l11 -13" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>`, x, y);
// a toolbox with a tape label
const toolbox = (label, col = TRD, s = 1) => `<g transform="scale(${s})"><path d="M-50 -70 V-96 a14 14 0 0 1 14 -14 H36 a14 14 0 0 1 14 14 V-70" fill="none" stroke="${STL}" stroke-width="12"/><rect x="-130" y="-74" width="260" height="46" rx="10" fill="${col}"/><rect x="-130" y="-34" width="260" height="110" rx="10" fill="${col}"/><rect x="-130" y="-34" width="260" height="12" fill="#000" opacity=".18"/>
  <rect x="-20" y="-44" width="40" height="30" rx="5" fill="${STL}"/><rect x="-96" y="8" width="192" height="44" rx="3" fill="${TAPE}" transform="rotate(-2)"/><text y="38" text-anchor="middle" font-family="${mono}" font-weight="800" font-size="24" fill="${INK}" transform="rotate(-2)">${label}</text></g>`;
function wterm(lt, rows, top = 20) {
  return `<rect x="16" y="${top}" width="588" height="${36 + rows.length * 46}" rx="14" fill="${INK}"/>` + rows.map(([d, txt, col], i) => T(42, top + 54 + i * 46, txt.replace(/ /g, " "), col || "#f8f9fa", 23, 700, "start", mono, (lt - d) / .25)).join("");
}
const codeMini = (x, y, name, k, bad = false) => grow(k, `<rect x="-88" y="-110" width="176" height="220" rx="12" fill="#fffdf6" stroke="${bad ? TRD : "#dcc99a"}" stroke-width="4"/><text y="-74" text-anchor="middle" font-family="Inter" font-weight="800" font-size="20" fill="${INK}">${name}</text>${[0, 1, 2, 3, 4].map(i => `<rect x="-66" y="${-48 + i * 28}" width="${[130, 100, 120, 90, 110][i]}" height="12" rx="6" fill="${bad ? "#f3b0b0" : "#cfd4da"}"/>`).join("")}`, x, y);

const P = {
  copy: lt => svg(["Project A", "Project B", "Project C"].map((w, i) => codeMini(110 + i * 200, 180, w, lt - .2 - i * .7, lt > 4)).join("") +
    [0, 1].map(i => T(210 + i * 200, 190, "⧉", STL, 40, 800, "middle", "Inter", (lt - .9 - i * .7) / .2)).join("") +
    T(310, 380, lt > 4 ? "" : "same code × 3", MU, 28, 700, "middle", mono, (lt - 2.2) / .3) +
    (lt > 4 ? `<g transform="translate(310 430)"><g style="${pop(lt, 4)}">${toolbox("module", TRD, .9)}</g></g>` : ""), 560),

  kit: lt => svg(`<g transform="translate(310 220)"><g style="${pop(lt, .2)}">${toolbox("network", TRD, 1.5)}</g></g>` +
    ["vpc", "subnets", "firewall"].map((w, i) => `<g transform="translate(${130 + i * 180} 440)"><g style="${pop(lt, 2 + i * .4)}"><rect x="-76" y="-32" width="152" height="64" rx="10" fill="${[TEA, ORA, STL][i]}"/>${T(0, 9, w, "#fff", 24, 800, "middle", mono)}</g></g>`).join("") +
    T(310, 540, lt > 3.4 ? "everything inside, ready to reuse" : "", MU, 24, 700, "middle", mono, (lt - 3.4) / .3), 580),

  use: lt => { if (lt < 4) return svg(card(16, 20, 588, 300) + `<rect x="16" y="20" width="588" height="52" rx="14" fill="${INK}"/><rect x="16" y="54" width="588" height="18" fill="${INK}"/>` + T(42, 56, "main.tf", "#fff", 22, 700, "start", mono) +
      [['module "network" {', .2, TAPE], ['  source = "./modules/network"', .8, 0], ["  cidr   = var.cidr", 1.6, TEA], ["}", 2, 0]].map(([l, d, hi], i) => (hi && lt > d ? `<rect x="30" y="${90 + i * 52}" width="560" height="44" rx="8" fill="${hi}" opacity=".3"/>` : "") + T(44, 121 + i * 52, l.replace(/ /g, " "), INK, 23, hi ? 800 : 600, "start", mono, (lt - d) / .25)).join("") +
      T(310, 400, lt > 2.2 ? "source + variables" : "", MU, 26, 700, "middle", mono, (lt - 2.2) / .3), 460);
    return svg(`<g transform="translate(310 130)">${toolbox("network", TRD, .9)}</g>` + ["shop", "blog", "api"].map((w, i) => { const x = 110 + i * 200, d = 4.2 + i * .4;
      return `<path d="M310 200 C 310 260, ${x} 250, ${x} 310" fill="none" stroke="${STL}" stroke-width="5" stroke-dasharray="8 8" opacity="${clamp((lt - d) / .3)}"/>` + grow(lt - d - .1, `<rect x="-84" y="-50" width="168" height="100" rx="12" fill="#fffdf6" stroke="${TEA}" stroke-width="4"/><text y="10" text-anchor="middle" font-family="Inter" font-weight="800" font-size="28" fill="${INK}">${w}</text>`, x, 370); }).join("") +
      T(310, 500, lt > 5.6 ? "one kit · many projects" : "", TEA, 30, 900, "middle", "Inter", (lt - 5.6) / .3), 540); },

  registry: lt => svg(card(16, 20, 588, 500, TEA) + `<rect x="16" y="20" width="588" height="60" rx="14" fill="${TEA}"/><rect x="16" y="60" width="588" height="20" fill="${TEA}"/>` + T(44, 62, "Terraform Registry", "#fff", 26, 800, "start") +
    ["vpc", "eks", "rds", "s3", "iam", "dns", "lb", "vm", "cdn"].map((w, i) => `<g transform="translate(${120 + (i % 3) * 190} ${160 + Math.floor(i / 3) * 124})"><g style="${pop(lt, .3 + i * .18)}">${toolbox(w, [TRD, ORA, STL][i % 3], .52)}</g></g>`).join("") +
    T(310, 570, lt > 2.4 ? "thousands, ready-made" : "", TEA, 28, 900, "middle", "Inter", (lt - 2.4) / .3), 600),

  tidy: lt => { if (lt < 4) { const k = easeOut(clamp((lt - 1.6) / .6)), ind = [60, 0, 34, 12], L = ['resource "server" "web" {', "ami = \"ami-123\"", "instance_type = \"t3.micro\"", "}"];
      return svg(wterm(lt, [[.2, "$ terraform fmt"]]) + card(16, 130, 588, 260) + L.map((l, i) => T(44 + lerp(ind[i], i === 0 || i === 3 ? 0 : 28, k), 190 + i * 52, l, INK, 23, 700, "start", mono)).join("") + tick(540, 180, lt - 2.2) +
        T(310, 450, lt > 2.2 ? "neat and consistent" : "messy…", lt > 2.2 ? GRN : MU, 28, 800, "middle", mono), 500); }
    return svg(wterm(lt - 4, [[.2, "$ terraform validate"], [1.2, "Success! The configuration is valid.", "#8ce99a"]]) +
      `<g transform="translate(310 300)"><g style="${pop(lt, 5.2)}"><circle r="90" fill="${GRN}"/><path d="M-40 0 l28 32 l54 -64" stroke="#fff" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g></g>` + T(310, 450, lt > 5.4 ? "no mistakes" : "", GRN, 30, 900), 500); },

  destroy: lt => svg(wterm(lt, [[.2, "$ terraform destroy"], [3.2, "Destroy complete! 3 destroyed.", "#ffc9c9"]]) +
    ["server", "database", "network"].map((w, i) => { const gone = clamp((lt - 1.4 - i * .5) / .5); return `<g transform="translate(${120 + i * 190} ${250 + gone * 30}) scale(${1 - gone * .4})" opacity="${1 - gone}"><rect x="-80" y="-50" width="160" height="100" rx="12" fill="${[TRD, TEA, ORA][i]}"/><text y="9" text-anchor="middle" font-family="${mono}" font-weight="800" font-size="22" fill="#fff">${w}</text></g>`; }).join("") +
    (lt > 4 ? `<g transform="translate(310 440)"><g style="${pop(lt, 4)}">${card(-200, -80, 400, 160, GRN)}${T(0, -26, "this month's bill", MU, 22, 700, "middle", mono)}${T(0, 40, "$0.00", GRN, 60, 900)}</g></g>` : ""), 560),

  recap: lt => svg(["write", "init", "plan", "apply", "state", "modules"].map((w, i) => { const d = 2 + i * .65, x = 30 + (i % 2) * 290, y = 40 + Math.floor(i / 2) * 150;
    return lt < d ? "" : `<g transform="translate(${x + 135} ${y + 55})"><g style="${pop(lt, d)}"><rect x="-135" y="-50" width="270" height="100" rx="4" fill="${TAPE}" transform="rotate(${i % 2 ? 1.5 : -1.5})"/><circle cx="-92" cy="0" r="22" fill="${GRN}"/><path d="M-102 0 l8 9 l14 -17" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>${T(-56, 11, w, INK, 30, 800, "start", mono)}</g></g>`; }).join(""), 520),

  next: lt => svg(`<g transform="translate(310 170)"><g style="${pop(lt, .2)}">${card(-280, -110, 560, 220, TEA)}<g transform="translate(-200 30)"><path d="M-50 20 L-20 -10 L5 10 L45 -40" fill="none" stroke="${TEA}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="M-56 -50 V34 H56" fill="none" stroke="${STL}" stroke-width="6" stroke-linecap="round"/></g>${T(-110, -30, "Next topic?", MU, 28, 700, "start")}${T(-110, 36, "Monitoring", INK, 50, 900, "start")}</g></g>` +
    `<g transform="translate(310 370)"><g style="${pop(lt, 2)}"><rect x="-240" y="-44" width="480" height="88" rx="4" fill="${TAPE}" transform="rotate(-1.5)"/>${T(0, 12, "💬 comment MONITOR", INK, 30, 800, "middle", mono)}</g></g>` +
    `<g transform="translate(310 500)"><g style="${pop(lt, 2.6)}"><rect x="-180" y="-50" width="360" height="100" rx="14" fill="${TRD}"/>${T(0, 15, "+ Follow", "#fff", 42, 900)}</g></g>`, 580),
};
