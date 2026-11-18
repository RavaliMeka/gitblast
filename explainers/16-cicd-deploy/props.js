/* ---------- Props: launch-pad theme ---------- */
const ORG = "#ff6b35", NVY = "#1d3557", VIO = "#6a4c93", GRN5 = "#2ba84a", RED5 = "#d90429", SKYB = "#457b9d", MU7 = "#7a8ba3";
const mono = "DejaVu Sans Mono, monospace";
const svg = (inner, h = 660) => `<svg class="abs" style="left:0;top:0" width="620" height="${h}" viewBox="0 0 620 ${h}">${inner}</svg>`;
const T = (x, y, s, col = NVY, size = 28, weight = 800, anchor = "middle", font = "Inter", op = 1) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${font}" font-weight="${weight}" font-size="${size}" fill="${col}" opacity="${clamp(op)}">${s}</text>`;
const grow = (k, inner, x, y) => k <= 0 ? "" : `<g transform="translate(${x} ${y}) scale(${backOut(clamp(k / .4))})">${inner}</g>`;
const card = (x, y, w, h, stroke = "#d7e3f0") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#fff" stroke="${stroke}" stroke-width="4"/>`;
const check = (x, y, k, col = GRN5) => grow(k, `<circle r="18" fill="${col}"/><path d="M-8 0 l6 7 l11 -13" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>`, x, y);
// rocket; flame 0..1
function rocket(x, y, flame = 0, t = 0, s = 1) {
  const fl = flame > 0 ? `<path d="M-20 92 Q0 ${150 + Math.sin(t * 30) * 16 + flame * 50} 20 92 Z" fill="${ORG}"/><path d="M-10 92 Q0 ${122 + Math.sin(t * 40) * 10 + flame * 26} 10 92 Z" fill="#ffd166"/>` : "";
  return `<g transform="translate(${x} ${y}) scale(${s})">${fl}<path d="M-34 60 L-64 104 L-30 92 Z" fill="${ORG}"/><path d="M34 60 L64 104 L30 92 Z" fill="${ORG}"/>
    <path d="M0 -110 C 44 -70, 44 30, 32 92 H-32 C -44 30, -44 -70, 0 -110 Z" fill="#fff" stroke="${NVY}" stroke-width="6"/><path d="M0 -110 C 22 -90, 32 -66, 36 -44 H-36 C -32 -66, -22 -90, 0 -110 Z" fill="${ORG}"/>
    <circle cy="-6" r="20" fill="#bde0fe" stroke="${NVY}" stroke-width="6"/><rect x="-32" y="60" width="64" height="12" fill="${NVY}"/></g>`;
}
const tower = (x, y) => `<path d="M${x} ${y} V${y - 260} M${x + 44} ${y} V${y - 260}" stroke="#8d99ae" stroke-width="8"/>${[0, 1, 2, 3, 4].map(i => `<path d="M${x} ${y - i * 52} L${x + 44} ${y - 52 - i * 52} M${x + 44} ${y - i * 52} L${x} ${y - 52 - i * 52}" stroke="#8d99ae" stroke-width="4"/>`).join("")}<path d="M${x + 44} ${y - 190} H${x + 96}" stroke="#8d99ae" stroke-width="8"/>`;
const pad = y => `<rect x="120" y="${y}" width="380" height="24" rx="6" fill="${NVY}"/><rect x="160" y="${y + 24}" width="300" height="16" fill="#8d99ae"/>`;
const smoke = (x, y, k, t) => k <= 0 ? "" : [0, 1, 2, 3, 4, 5].map(i => `<circle cx="${x + (i - 2.5) * 46 * (1 + k)}" cy="${y - Math.abs(Math.sin(t * 3 + i)) * 14}" r="${28 + k * 22 + (i % 2) * 10}" fill="#fff" opacity="${.85 * clamp(1.4 - k)}"/>`).join("");
function codeCard(lt, lines, top = 20, title = "ci.yml") {
  return card(16, top, 588, 64 + lines.length * 46) + `<rect x="16" y="${top}" width="588" height="52" rx="18" fill="${NVY}"/><rect x="16" y="${top + 34}" width="588" height="18" fill="${NVY}"/>` + T(42, top + 36, title, "#fff", 22, 700, "start", mono) +
    lines.map(([l, d, hi], i) => (hi && lt > d ? `<rect x="30" y="${top + 64 + i * 46}" width="560" height="40" rx="8" fill="${hi}" opacity=".2"/>` : "") + T(46, top + 93 + i * 46, l.replace(/ /g, " "), hi ? NVY : MU7, 24, hi ? 800 : 600, "start", mono, (lt - d) / .25)).join("");
}

const P = {
  pad: lt => svg(tower(140, 520) + pad(520) + rocket(310, 400, 0, lt) + ["test", "build"].map((w, i) => check(440, 150 + i * 70, lt - .3 - i * .4) + T(470, 160 + i * 70, w, NVY, 26, 800, "start", mono, (lt - .4 - i * .4) / .2)).join("") +
    T(310, 610, "ready for launch", ORG, 30, 900, "middle", "Inter", (lt - 1.4) / .3)),

  job: lt => svg(codeCard(lt, [["jobs:", 0], ["  test: …", 0], ["  deploy:", .3, ORG], ["    needs: test", 2, GRN5], ["    if: github.ref_name == 'main'", 6, VIO], ["    steps:", .6], ["      - run: ./deploy.sh", .8]]) +
    (lt > 2.6 && lt < 6 ? `<g transform="translate(310 500)"><g style="${pop(lt, 2.6)}"><rect x="-90" y="-36" width="180" height="72" rx="14" fill="${GRN5}"/>${T(0, 10, "test ✓", "#fff", 26, 800)}</g></g><path d="M400 500 H470" stroke="${NVY}" stroke-width="5" opacity="${clamp((lt - 3) / .3)}"/>` .replace("translate(310 500)", "translate(190 500)").replace("M400 500 H470", "M290 500 H340") + grow(lt - 3.2, `<rect x="-90" y="-36" width="180" height="72" rx="14" fill="${ORG}"/><text y="10" text-anchor="middle" font-family="Inter" font-weight="800" font-size="26" fill="#fff">deploy</text>`, 440, 500) : "") +
    (lt > 6 ? `<g transform="translate(310 500)"><g style="${pop(lt, 6.2)}"><rect x="-200" y="-36" width="400" height="72" rx="36" fill="${VIO}"/>${T(0, 10, "main branch only", "#fff", 26, 800)}</g></g>` : ""), 600),

  secrets: lt => { if (lt < 5) return svg(codeCard(lt, [["deploy.sh", .1], ['TOKEN="ghp_a1B2c3D4e5…"', .5, RED5]], 60, "bad idea") +
      (lt > 3 ? `<path d="M40 110 L580 250 M580 110 L40 250" stroke="${RED5}" stroke-width="10" stroke-linecap="round" opacity="${clamp((lt - 3) / .2)}"/><g transform="translate(310 380)"><g style="${pop(lt, 3.2)}">${T(0, 0, "never in your code!", RED5, 38, 900)}</g></g>` : T(310, 380, "needs a token…", MU7, 28, 700, "middle", mono, (lt - 1) / .3)), 500);
    if (lt < 8) return svg(card(16, 20, 588, 300) + T(46, 78, "Settings › Secrets", NVY, 30, 900, "start") + `<rect x="46" y="110" width="528" height="76" rx="12" fill="#f1f5fb" stroke="#d7e3f0" stroke-width="3"/>` +
      T(70, 158, "🔑 DEPLOY_TOKEN", NVY, 26, 800, "start", mono, (lt - 5.4) / .3) + T(552, 158, "••••••••", MU7, 28, 800, "end", mono, (lt - 5.8) / .3) +
      grow(lt - 6.4, `<rect x="-130" y="-30" width="260" height="60" rx="12" fill="${GRN5}"/><text y="9" text-anchor="middle" font-family="Inter" font-weight="800" font-size="24" fill="#fff">saved, encrypted</text>`, 310, 250), 500);
    return svg(codeCard(lt - 8, [["- run: ./deploy.sh", .1], ["  env:", .3], ["    TOKEN: ${{ secrets.DEPLOY_TOKEN }}", .6, ORG]]) +
      (lt > 12 ? `<g transform="translate(310 350)"><g style="${pop(lt, 12)}"><rect x="-290" y="-80" width="580" height="160" rx="18" fill="${NVY}"/>${T(-260, -30, "logs", MU7, 20, 700, "start", mono)}${T(-260, 12, "deploying with token ***", "#bde0fe", 26, 700, "start", mono)}${T(-260, 52, "✓ hidden automatically", "#9ef0b0", 24, 700, "start", mono)}</g></g>` : ""), 500); },

  approve: lt => { const ok = lt > 4;
    return svg(`<g transform="translate(310 220)"><g style="${pop(lt, .2)}">${card(-280, -170, 560, 340, VIO)}${T(-240, -110, "Environment: production", NVY, 30, 900, "start")}${T(-240, -60, "waiting for review", ok ? MU7 : VIO, 24, 700, "start", mono)}
        <circle cx="-196" cy="30" r="44" fill="#ffd27a"/>${T(-196, 46, "👩‍💻", NVY, 44, 400)}${T(-130, 22, "reviewer", NVY, 28, 800, "start")}${T(-130, 58, ok ? "approved ✓" : "…", ok ? GRN5 : MU7, 24, 800, "start", mono)}
        <rect x="-240" y="100" width="480" height="50" rx="12" fill="${ok ? GRN5 : "#cfd8e3"}"/>${T(0, 134, ok ? "Approved, deploying" : "Approve and deploy", "#fff", 24, 800)}</g></g>` +
      T(310, 470, "a human says go", VIO, 28, 800, "middle", mono, (lt - 2.4) / .3), 520); },

  launch: lt => { const stage = lt < 2 ? -1 : Math.min(2, Math.floor((lt - 2) / 1)), go = clamp((lt - 5) / 2.6), y = 400 - easeOut(go) * 0 - go * go * 620;
    return svg(tower(140, 520) + pad(520) + smoke(310, 520, lt > 4.6 ? (lt - 4.6) / 3 : 0, lt) + rocket(310, y + (lt > 4.6 && go < .05 ? Math.sin(lt * 60) * 3 : 0), lt > 4.6 ? .4 + go : 0, lt) +
      ["test", "build", "deploy"].map((w, i) => check(460, 150 + i * 70, stage >= i ? lt - 2 - i : 0) + T(490, 160 + i * 70, w, stage >= i ? NVY : MU7, 26, 800, "start", mono, (lt - .3) / .3)).join("") +
      (lt < 2 ? T(310, 610, "merged to main", VIO, 30, 900, "middle", "Inter", lt / .3) : "") +
      (lt > 5.6 ? `<g transform="translate(310 610)"><g style="${pop(lt, 5.6)}"><rect x="-150" y="-46" width="300" height="92" rx="46" fill="${GRN5}"/>${T(0, 16, "LIVE 🌍", "#fff", 44, 900)}</g></g>` : "")); },

  recap: lt => svg(["push", "test", "build", "deploy"].map((w, i) => `<g transform="translate(${100 + i * 140} 240)"><g style="${pop(lt, .3 + i * .6)}"><circle r="56" fill="${[SKYB, GRN5, VIO, ORG][i]}"/>${T(0, 10, w, "#fff", 26, 900)}</g></g>` +
      (i < 3 ? `<path d="M${164 + i * 140} 240 h12" stroke="${NVY}" stroke-width="6" stroke-linecap="round" opacity="${clamp((lt - .6 - i * .6) / .2)}"/>` : "")).join("") +
    T(310, 400, "all automatic", NVY, 40, 900, "middle", "Inter", (lt - 2.8) / .3) + T(310, 450, "from git push to production", MU7, 24, 700, "middle", mono, (lt - 3.1) / .3), 520),

  next: lt => svg(`<g transform="translate(310 170)"><g style="${pop(lt, .2)}">${card(-280, -110, 560, 220, VIO)}<g transform="translate(-190 0)">${[0, 1, 2].map(i => `<rect x="${-40 + i * 12}" y="${-46 + i * 30}" width="80" height="26" rx="6" fill="${[VIO, "#8f6fc0", "#b79ce0"][i]}"/>`).join("")}</g>${T(-90, -30, "Next topic?", MU7, 28, 700, "start")}${T(-90, 36, "Terraform", NVY, 52, 900, "start")}</g></g>` +
    `<g transform="translate(310 370)"><g style="${pop(lt, 2)}">${card(-250, -46, 500, 92)}${T(0, 14, "💬 comment TERRAFORM", VIO, 30, 900, "middle", mono)}</g></g>` +
    `<g transform="translate(310 500)"><g style="${pop(lt, 2.6)}"><rect x="-180" y="-50" width="360" height="100" rx="50" fill="${ORG}"/>${T(0, 15, "+ Follow", "#fff", 42, 900)}</g></g>`, 600),
};
