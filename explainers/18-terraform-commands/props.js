/* ---------- Props: trail-map theme ---------- */
const FO = "#2d6a4f", TR = "#e76f51", WD = "#7f5539", SA = "#fefae0", DK = "#283618", SKY = "#457b9d", MU = "#7c8466";
const mono = "DejaVu Sans Mono, monospace";
const svg = (inner, h = 640) => `<svg class="abs" style="left:0;top:0" width="620" height="${h}" viewBox="0 0 620 ${h}">${inner}</svg>`;
const T = (x, y, s, col = DK, size = 28, weight = 800, anchor = "middle", font = "Inter", op = 1) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${font}" font-weight="${weight}" font-size="${size}" fill="${col}" opacity="${clamp(op)}">${s}</text>`;
const grow = (k, inner, x, y) => k <= 0 ? "" : `<g transform="translate(${x} ${y}) scale(${backOut(clamp(k / .4))})">${inner}</g>`;
const card = (x, y, w, h, stroke = "#ddd3ad") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${SA}" stroke="${stroke}" stroke-width="4"/>`;
const tick = (x, y, k) => grow(k, `<circle r="18" fill="${FO}"/><path d="M-8 0 l6 7 l11 -13" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>`, x, y);
// wooden signpost pointing right
const sign = (x, y, label, col, k, sub = "") => grow(k, `<rect x="-200" y="-10" width="16" height="${sub ? 96 : 76}" fill="${WD}"/><path d="M-190 -40 H150 L190 0 L150 40 H-190 Z" fill="${col}"/><text x="-20" y="13" text-anchor="middle" font-family="${mono}" font-weight="800" font-size="34" fill="${SA}">${label}</text>${sub ? `<text x="-20" y="74" text-anchor="middle" font-family="Inter" font-weight="700" font-size="24" fill="${DK}">${sub}</text>` : ""}`, x, y);
function tterm(lt, rows, top = 16) {
  return `<rect x="16" y="${top}" width="588" height="${34 + rows.length * 44}" rx="16" fill="${DK}"/>` + rows.map(([d, txt, col], i) => T(40, top + 52 + i * 44, txt, col || SA, 23, 700, "start", mono, (lt - d) / .25)).join("");
}
// the route across the map
const RT = [[60, 230], [160, 170], [250, 215], [350, 130], [450, 160], [545, 70]];
const RLEN = RT.slice(1).reduce((a, p, i) => a + Math.hypot(p[0] - RT[i][0], p[1] - RT[i][1]), 0);
function along(k) { const n = RT.length - 1, f = clamp(k) * n, i = Math.min(n - 1, Math.floor(f)), u = f - i; return [lerp(RT[i][0], RT[i + 1][0], u), lerp(RT[i][1], RT[i + 1][1], u)]; }
function map(y0, routeK, hikerK = -1) {
  const d = "M" + RT.map(p => p[0] + " " + (p[1] + y0)).join(" L"), [hx, hy] = along(hikerK);
  return card(16, y0, 588, 290) + [0, 1, 2].map(i => `<ellipse cx="${170 + i * 150}" cy="${y0 + 150 + (i % 2) * 30}" rx="${90 - i * 12}" ry="${60 - i * 8}" fill="none" stroke="${FO}" stroke-width="2" opacity=".25"/><ellipse cx="${170 + i * 150}" cy="${y0 + 150 + (i % 2) * 30}" rx="${50 - i * 8}" ry="${32 - i * 5}" fill="none" stroke="${FO}" stroke-width="2" opacity=".25"/>`).join("") +
    `<path d="${d}" fill="none" stroke="${TR}" stroke-width="7" stroke-linecap="round" stroke-dasharray="16 12" opacity="${clamp(routeK * 4)}"/>` +
    `<rect x="${16 + 588 * clamp(routeK)}" y="${y0 + 4}" width="${Math.max(0, 584 - 588 * clamp(routeK))}" height="282" fill="${SA}" opacity="${routeK >= 1 ? 0 : .96}"/>` +
    `<circle cx="${RT[0][0]}" cy="${RT[0][1] + y0}" r="12" fill="${DK}"/>` +
    (routeK >= .98 ? `<path d="M${RT[5][0]} ${RT[5][1] + y0} v-50" stroke="${DK}" stroke-width="5"/><path d="M${RT[5][0]} ${RT[5][1] + y0 - 50} l34 12 l-34 12 z" fill="${TR}"/>` : "") +
    (hikerK >= 0 ? `<circle cx="${hx}" cy="${hy + y0}" r="17" fill="${FO}" stroke="#fff" stroke-width="5"/>` : "");
}

const P = {
  three: lt => svg(sign(330, 90, "init", FO, lt - .3) + sign(330, 230, "plan", WD, lt - .9) + sign(330, 370, "apply", TR, lt - 1.5) +
    (lt > 3 ? `<g transform="translate(310 520)"><g style="${pop(lt, 3)}"><path d="M-150 60 L-60 -60 L-10 10 L40 -40 L150 60 Z" fill="${FO}"/><path d="M-60 -60 l-22 30 l22 -8 l20 10 z" fill="#fff"/><circle cx="110" cy="-50" r="26" fill="#f4c95d"/></g></g>` : ""), 620),

  tf: lt => svg(card(16, 20, 588, 470) + `<rect x="16" y="20" width="588" height="52" rx="18" fill="${DK}"/><rect x="16" y="54" width="588" height="18" fill="${DK}"/>` + T(42, 56, "main.tf", SA, 22, 700, "start", mono) +
    [['provider "aws" {', 2, FO], ['  region = "us-east-1"', 2.2, 0], ["}", 2.4, 0], ["", 0, 0], ['resource "aws_instance" "web" {', 4, TR], ['  ami           = "ami-123"', 4.3, 0], ['  instance_type = "t3.micro"', 4.6, 0], ["}", 4.9, 0]].map(([l, d, hi], i) =>
      (hi && lt > d ? `<rect x="30" y="${88 + i * 48}" width="560" height="42" rx="8" fill="${hi}" opacity=".18"/>` : "") + T(44, 118 + i * 48, l.replace(/ /g, " "), DK, 22, hi ? 800 : 600, "start", mono, (lt - d) / .25)).join("") +
    T(310, 560, lt > 5.2 ? "one provider · one server" : "", MU, 26, 700, "middle", mono, (lt - 5.2) / .3), 600),

  init: lt => svg(tterm(lt, [[.1, "$ terraform init"], [3.2, "✓ Installed hashicorp/aws", "#b7e4c7"], [4.2, "Terraform has been initialized!", "#b7e4c7"]]) +
    `<g transform="translate(310 430)"><path d="M-110 -120 Q0 -190 110 -120 V110 Q0 140 -110 110 Z" fill="${FO}"/><rect x="-80" y="-10" width="160" height="90" rx="14" fill="#40916c"/><path d="M-50 -130 Q0 -210 50 -130" fill="none" stroke="${DK}" stroke-width="12"/><rect x="-20" y="20" width="40" height="14" rx="6" fill="${SA}"/></g>` +
    ["aws plugin", "lock file"].map((w, i) => { const d = 1.6 + i * 1, k = easeOut(clamp((lt - d) / .9)); return lt < d || k >= 1 ? "" : `<g transform="translate(${lerp(90 + i * 440, 310, k)} ${lerp(230, 350, k)}) scale(${lerp(1, .5, k)})"><rect x="-80" y="-26" width="160" height="52" rx="10" fill="${TR}"/><text y="8" text-anchor="middle" font-family="${mono}" font-weight="700" font-size="20" fill="#fff">${w}</text></g>`; }).join("") +
    T(310, 600, lt > 4.2 ? "gear packed ✓" : "", FO, 30, 900), 630),

  plan: lt => svg(tterm(lt, [[.1, "$ terraform plan"], [3, "  + aws_instance.web", "#b7e4c7"], [7, "Plan: 1 to add, 0 to change,", "#ffd9a8"], [7, "      0 to destroy.", "#ffd9a8"]]) + map(240, (lt - .8) / 2.2) +
    `<g transform="translate(310 580)"><g style="${pop(lt, 3.6)}"><rect x="-190" y="-34" width="380" height="68" rx="34" fill="${WD}"/>${T(0, 10, "preview only: nothing built", SA, 24, 800)}</g></g>`, 630),

  apply: lt => svg(tterm(lt, [[.1, "$ terraform apply"], [3, "  Enter a value: yes", "#ffd9a8"], [6, "Apply complete! 1 added.", "#b7e4c7"]]) + map(210, 1, clamp((lt - 3.4) / 2.6)) +
    T(310, 570, lt > 6 ? "arrived ✓" : lt > 3.4 ? "building…" : "", lt > 6 ? FO : TR, 32, 900), 620),

  live: lt => svg(`<g transform="translate(310 250)"><g style="${pop(lt, .1)}">${card(-220, -170, 440, 340, FO)}${[0, 1, 2].map(i => `<rect x="-150" y="${-120 + i * 70}" width="300" height="56" rx="10" fill="${DK}"/><circle cx="-116" cy="${-92 + i * 70}" r="9" fill="#95d5b2"/><rect x="-90" y="${-98 + i * 70}" width="170" height="12" rx="6" fill="#52796f"/>`).join("")}${T(0, 135, "aws_instance.web", DK, 24, 800, "middle", mono)}</g></g>` +
    tick(500, 110, lt - .8) + T(310, 500, "created from code", FO, 32, 900, "middle", "Inter", (lt - 1) / .3), 560),

  rule: lt => svg(`<g transform="translate(310 220)"><g style="${pop(lt, .1)}">${card(-280, -150, 560, 300, TR)}<ellipse cx="0" cy="-50" rx="110" ry="58" fill="#fff" stroke="${DK}" stroke-width="7"/><circle cx="${Math.sin(lt * 2) * 30}" cy="-50" r="30" fill="${FO}"/><circle cx="${Math.sin(lt * 2) * 30}" cy="-50" r="12" fill="${DK}"/>${T(0, 70, "read the plan", DK, 40, 900)}${T(0, 114, "then apply", MU, 26, 700, "middle", mono)}</g></g>` +
    ["plan", "read", "apply"].map((w, i) => `<g transform="translate(${130 + i * 180} 480)"><g style="${pop(lt, 1.2 + i * .5)}"><rect x="-72" y="-34" width="144" height="68" rx="34" fill="${[WD, TR, FO][i]}"/>${T(0, 10, w, SA, 26, 800, "middle", mono)}</g></g>` + (i < 2 ? T(220 + i * 180, 490, "→", DK, 30, 900, "middle", "Inter", (lt - 1.5 - i * .5) / .2) : "")).join(""), 560),

  recap: lt => svg(sign(330, 90, "init", FO, lt - .1, "pack your gear") + sign(330, 260, "plan", WD, lt - .9, "check the map") + sign(330, 430, "apply", TR, lt - 1.7, "start walking"), 580),

  next: lt => svg(`<g transform="translate(310 190)"><g style="${pop(lt, .2)}">${card(-280, -105, 560, 210)}${T(-240, -34, "Part 3", MU, 28, 800, "start", mono)}${T(-240, 40, "State & variables", DK, 46, 900, "start")}</g></g>` +
    `<g transform="translate(310 430)"><g style="${pop(lt, 2.4)}"><path d="M-190 -52 H150 L196 0 L150 52 H-190 Z" fill="${TR}"/>${T(-16, 16, "+ Follow", "#fff", 44, 900)}</g></g>`, 540),
};
