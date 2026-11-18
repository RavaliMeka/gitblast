/* ---------- Props: greenhouse theme ---------- */
const LEAF = "#3a9d5d", DARKG = "#1f5f3a", TERRA = "#c8693f", SOIL = "#6b4a36", WILT = "#b5a27a", INK2 = "#23402f", MUT2 = "#6f8676";
const mono = "DejaVu Sans Mono, monospace";
const svg = (inner, h = 640) => `<svg class="abs" style="left:0;top:0" width="620" height="${h}" viewBox="0 0 620 ${h}">${inner}</svg>`;
const T = (x, y, s, col = INK2, size = 28, weight = 800, anchor = "middle", font = "Inter", op = 1) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${font}" font-weight="${weight}" font-size="${size}" fill="${col}" opacity="${clamp(op)}">${s}</text>`;
const grow = (k, inner, x, y) => k <= 0 ? "" : `<g transform="translate(${x} ${y}) scale(${backOut(clamp(k / .45))})">${inner}</g>`;
const panel = (x, y, w, h, stroke = "#cfe3d4") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20" fill="#fff" stroke="${stroke}" stroke-width="4"/>`;
// a potted plant = a pod. g: growth 0..1, dead: wilted
function plant(x, y, g = 1, dead = false, t = 0, label = "") {
  const c = dead ? WILT : LEAF, c2 = dead ? "#9c8a63" : DARKG, sway = dead ? 18 : Math.sin(t * 2 + x) * 3, h = 90 * clamp(g);
  return `<g transform="translate(${x} ${y})">
    <g transform="rotate(${sway} 0 0)"><path d="M0 0 V${-h}" stroke="${c2}" stroke-width="7" stroke-linecap="round"/>
      ${g > .4 ? `<path d="M0 ${-h * .45} C -34 ${-h * .5}, -44 ${-h * .85}, -40 ${-h * .95} C -18 ${-h * .95}, -2 ${-h * .7}, 0 ${-h * .45} Z" fill="${c}"/>` : ""}
      ${g > .7 ? `<path d="M0 ${-h * .7} C 34 ${-h * .75}, 46 ${-h * 1.1}, 42 ${-h * 1.2} C 18 ${-h * 1.2}, 2 ${-h * .95}, 0 ${-h * .7} Z" fill="${c}"/><circle cy="${-h - 6}" r="${dead ? 0 : 9}" fill="#ffd166"/>` : ""}</g>
    <path d="M-44 0 H44 L34 62 H-34 Z" fill="${TERRA}"/><rect x="-50" y="-10" width="100" height="18" rx="6" fill="#d97b50"/><rect x="-36" y="-6" width="72" height="8" rx="4" fill="${SOIL}"/>
    ${label ? `<text y="92" text-anchor="middle" font-family="${mono}" font-weight="700" font-size="20" fill="${MUT2}">${label}</text>` : ""}</g>`;
}
function gardener(x, y, t = 0) { const b = Math.sin(t * 3) * 3;
  return `<g transform="translate(${x} ${y + b})"><circle cy="-70" r="26" fill="#f2c9a5"/><path d="M-34 -84 Q0 -116 34 -84 L40 -78 H-40 Z" fill="#e9c46a"/><rect x="-48" y="-82" width="96" height="8" rx="4" fill="#d4a94a"/>
    <path d="M-30 -40 H30 L36 40 H-36 Z" fill="${DARKG}"/><rect x="-20" y="-36" width="40" height="50" rx="6" fill="#74c69d"/>
    <path d="M36 -20 L74 -6" stroke="#f2c9a5" stroke-width="12" stroke-linecap="round"/><path d="M70 -22 h30 l10 14 l-12 18 h-28 z" fill="#8ecae6"/><path d="M108 -10 l22 -12" stroke="#8ecae6" stroke-width="7" stroke-linecap="round"/></g>`; }
const shelf = (y, k = 1) => `<rect x="30" y="${y}" width="${560 * clamp(k)}" height="16" rx="6" fill="#b08968"/>`;
const PX = [130, 310, 490];
function kterm(lt, rows, top = 20) {
  return `<rect x="10" y="${top}" width="600" height="${50 + rows.length * 44}" rx="18" fill="${INK2}"/>` +
    rows.map(([d, txt, col], i) => T(36, top + 60 + i * 44, txt, col || "#e8f5ec", 22, 700, "start", mono, (lt - d) / .25)).join("");
}

const P = {
  night: lt => { const calm = lt > 3;
    return svg(`<rect x="60" y="40" width="500" height="330" rx="26" fill="${calm ? "#eaf6ee" : "#243b53"}"/>` +
      (calm ? T(310, 180, "😴", INK2, 110, 400) + T(310, 300, "all good. sleeping.", LEAF, 30, 800, "middle", mono)
        : `<circle cx="470" cy="110" r="34" fill="#ffe8a3"/>${T(200, 130, "03:00", "#ffe8a3", 60, 900, "middle", mono)}${T(310, 260, "💥 app crashed", "#ff8fa3", 36, 800, "middle", mono, (lt - .6) / .3)}`) +
      T(310, 460, calm ? "Kubernetes fixed it for you" : "who's waking up?", calm ? LEAF : MUT2, 28, 800, "middle", "Inter", calm ? (lt - 3.3) / .3 : (lt - 1.4) / .3)); },

  pod: lt => svg(grow(lt - 1, `<rect x="-170" y="-150" width="340" height="300" rx="40" fill="#e9f7ee" stroke="${LEAF}" stroke-width="6" stroke-dasharray="16 10"/><text x="-140" y="-108" font-family="${mono}" font-weight="700" font-size="24" fill="${LEAF}">pod</text>`, 310, 250) +
    grow(lt - 4, `<rect x="-90" y="-70" width="180" height="150" rx="14" fill="#3a86ff"/>${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="${-74 + i * 24}" y="-56" width="7" height="122" rx="3" fill="#000" opacity=".12"/>`).join("")}<text y="16" text-anchor="middle" font-family="Inter" font-weight="800" font-size="24" fill="#fff">container</text>`, 310, 260) +
    T(310, 480, "smallest unit in Kubernetes", MUT2, 26, 700, "middle", mono, (lt - 1.6) / .3)),

  plants: lt => svg(shelf(352, lt / .5) + PX.map((x, i) => `<g opacity="${clamp((lt - .4 - i * .3) / .3)}">${plant(x, 290, clamp((lt - .5 - i * .3) / 1), false, lt, "pod " + (i + 1))}</g>`).join("") +
    T(310, 500, "pods = plants", LEAF, 36, 900, "middle", "Inter", (lt - 1.8) / .3)),

  gardener: lt => svg(shelf(300) + PX.map((x, i) => plant(x, 230, 1, false, lt)).join("") + grow(lt - .2, gardener(0, 0, lt), 150, 520) +
    (lt > 2 ? `<g transform="translate(410 470)"><g style="${pop(lt, 2)}"><rect x="-170" y="-60" width="340" height="120" rx="24" fill="#fff" stroke="${LEAF}" stroke-width="4"/><path d="M-170 0 l-30 14 l30 14" fill="#fff" stroke="${LEAF}" stroke-width="4"/>${T(0, -8, "always keep", MUT2, 24, 700, "middle", mono)}${T(0, 36, "3 plants", LEAF, 40, 900)}</g></g>` : "")),

  heal: lt => { const dead = lt > .4 && lt < 3.4, regrow = clamp((lt - 3.4) / 1.4);
    return svg(shelf(300) + plant(PX[0], 230, 1, false, lt) + plant(PX[2], 230, 1, false, lt) +
      (lt < 3.4 ? plant(PX[1], 230, 1, dead, lt) : plant(PX[1], 230, .15 + regrow * .85, false, lt)) +
      (dead ? T(PX[1], 80, "✗", "#d1495b", 50, 900, "middle", "Inter", (lt - .5) / .3) : "") +
      grow(lt - 2, gardener(0, 0, lt), lerp(60, 110, easeOut(clamp((lt - 2) / 1))), 520) +
      T(430, 470, lt > 5 ? "self-healing ✓" : lt > 2 ? "noticed! replanting…" : "", lt > 5 ? LEAF : MUT2, lt > 5 ? 40 : 26, 900, "middle", lt > 5 ? "Inter" : mono) +
      T(430, 520, lt > 5 ? "wanted 3 · running 3" : "", MUT2, 24, 700, "middle", mono, (lt - 5.2) / .3)); },

  yaml: lt => { const L = [["kind: Deployment", 0.3, 1], ["metadata:", .7, 0], ["  name: my-app", .7, 0], ["spec:", 1.1, 0], ["  replicas: 3", 2.4, 1], ["  template:", 3.4, 0], ["    containers:", 3.4, 0], ["    - image: my-app:1.0", 4.2, 1]];
    return svg(panel(10, 10, 600, 470) + `<rect x="10" y="10" width="600" height="58" rx="20" fill="${INK2}"/><rect x="10" y="48" width="600" height="20" fill="${INK2}"/>` + T(36, 50, "deploy.yaml", "#fff", 24, 800, "start", mono) +
      L.map(([l, d, hi], i) => (hi && lt > d ? `<rect x="26" y="${84 + i * 48}" width="${l.length * 15.6 + 40}" height="42" rx="8" fill="#ffd166" opacity=".4"/>` : "") + T(40, 114 + i * 48, l.replace(/ /g, " "), hi ? DARKG : INK2, 26, hi ? 800 : 600, "start", mono, (lt - d) / .25)).join("") +
      T(310, 540, "tell the gardener what you want", MUT2, 26, 700, "middle", mono, (lt - 4.8) / .3)); },

  kubectl: lt => svg(kterm(lt, [[.2, "$ kubectl apply -f deploy.yaml"], [1.6, "deployment.apps/my-app created", "#95d5b2"], [4, "$ kubectl get pods"], [4.8, "my-app-7d9f-abc   Running", "#95d5b2"], [5.1, "my-app-7d9f-def   Running", "#95d5b2"], [5.4, "my-app-7d9f-ghi   Running", "#95d5b2"]]) +
    PX.map((x, i) => `<g opacity="${clamp((lt - 2 - i * .3) / .3)}">${plant(x, 520, clamp((lt - 2 - i * .3) / 1), false, lt)}</g>`).join(""), 660),

  test: lt => { const gone = lt > 1.2, back = clamp((lt - 2.4) / 1.2);
    return svg(kterm(lt, [[.2, "$ kubectl delete pod my-app-7d9f-def"], [1.2, 'pod "my-app-7d9f-def" deleted', "#ffb4a2"], [2.6, "my-app-7d9f-xyz   Running  (new!)", "#95d5b2"]]) + shelf(520) +
      plant(PX[0], 450, 1, false, lt) + plant(PX[2], 450, 1, false, lt) + (gone ? (lt > 2.4 ? plant(PX[1], 450, .15 + back * .85, false, lt) : "") : plant(PX[1], 450, 1, false, lt)) +
      T(310, 610, lt > 3.4 ? "back to 3 ✓" : "", LEAF, 34, 900), 660); },

  recap: lt => svg(`<g transform="translate(310 150)"><g style="${pop(lt, .1)}">${panel(-280, -90, 560, 180, LEAF)}<g transform="translate(-200 40) scale(.8)">${plant(0, 0, 1)}</g>${T(-110, -6, "Pod", INK2, 40, 900, "start")}${T(-110, 36, "runs your container", MUT2, 24, 700, "start", mono)}</g></g>` +
    `<g transform="translate(310 380)"><g style="${pop(lt, 2.2)}">${panel(-280, -90, 560, 180, TERRA)}<g transform="translate(-215 50) scale(.75)">${gardener(0, 0)}</g>${T(-110, -6, "Deployment", INK2, 40, 900, "start")}${T(-110, 36, "keeps them alive", MUT2, 24, 700, "start", mono)}</g></g>`),

  next: lt => svg(`<g transform="translate(310 180)"><g style="${pop(lt, .2)}">${panel(-280, -100, 560, 200)}${T(-240, -30, "Part 3", MUT2, 28, 800, "start", mono)}${T(-240, 40, "Services & Ingress", INK2, 44, 900, "start")}</g></g>` +
    `<g transform="translate(310 420)"><g style="${pop(lt, 2.6)}"><rect x="-180" y="-52" width="360" height="104" rx="52" fill="${LEAF}"/>${T(0, 16, "+ Follow", "#fff", 44, 900)}</g></g>`),
};
