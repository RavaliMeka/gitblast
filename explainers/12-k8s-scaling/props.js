/* ---------- Props: arcade theme (pastel pixel game) ---------- */
const PK = "#ff5d8f", BL = "#4d7cff", GRN = "#2ec27e", YL = "#ffcb47", PIX = "#1b1b3a", LIL = "#8f86c9";
const mono = "DejaVu Sans Mono, monospace";
const svg = (inner, h = 660) => `<svg class="abs" style="left:0;top:0" width="620" height="${h}" viewBox="0 0 620 ${h}" shape-rendering="crispEdges">${inner}</svg>`;
const T = (x, y, s, col = PIX, size = 28, weight = 700, anchor = "middle", op = 1) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${mono}" font-weight="${weight}" font-size="${size}" fill="${col}" opacity="${clamp(op)}">${s}</text>`;
const grow = (k, inner, x, y) => k <= 0 ? "" : `<g transform="translate(${x} ${y}) scale(${backOut(clamp(k / .35))})">${inner}</g>`;
// pixel window with hard shadow
const win = (x, y, w, h, col = "#fff") => `<rect x="${x + 8}" y="${y + 8}" width="${w}" height="${h}" fill="${PIX}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${col}" stroke="${PIX}" stroke-width="5"/>`;
// a pod as a pixel sprite; v = version colour
function sprite(x, y, col = BL, k = 1, t = 0, label = "") {
  const hop = Math.abs(Math.sin(t * 5 + x)) * -6;
  return grow(k, `<g transform="translate(0 ${hop})"><rect x="-24" y="-24" width="48" height="48" fill="${col}" stroke="${PIX}" stroke-width="5"/><rect x="-14" y="-10" width="8" height="10" fill="${PIX}"/><rect x="6" y="-10" width="8" height="10" fill="${PIX}"/><rect x="-10" y="8" width="20" height="5" fill="${PIX}"/>
    <rect x="-18" y="24" width="10" height="10" fill="${PIX}"/><rect x="8" y="24" width="10" height="10" fill="${PIX}"/></g>${label ? `<text y="62" text-anchor="middle" font-family="${mono}" font-weight="700" font-size="18" fill="${PIX}">${label}</text>` : ""}`, x, y);
}
const user = (x, y, o = 1) => `<g transform="translate(${x} ${y})" opacity="${o}"><rect x="-7" y="-20" width="14" height="14" fill="${PIX}"/><rect x="-10" y="-6" width="20" height="18" fill="${LIL}"/></g>`;
function cmd(lt, d, text, y, ok = "") {
  const k = clamp((lt - d) / .8);
  return lt < d ? "" : win(20, y, 580, ok ? 110 : 70, PIX) + T(44, y + 46, "> " + text.slice(0, Math.ceil(text.length * k)), YL, 24, 700, "start") + (ok ? T(44, y + 88, ok, "#8dffb8", 22, 700, "start", (lt - d - 1) / .2) : "");
}
function bar(x, y, w, val, col, label) {
  return `<rect x="${x}" y="${y}" width="${w}" height="34" fill="#fff" stroke="${PIX}" stroke-width="5"/><rect x="${x + 5}" y="${y + 5}" width="${(w - 10) * clamp(val)}" height="24" fill="${col}"/>` + T(x - 14, y + 26, label, PIX, 22, 700, "end");
}
const grid = (n, y0, col, lt, d0 = 0, step = .12, t = 0) => Array.from({ length: n }, (_, i) => sprite(95 + (i % 5) * 108, y0 + Math.floor(i / 5) * 110, typeof col === "function" ? col(i) : col, lt - d0 - i * step, t)).join("");

const P = {
  viral: lt => { const n = Math.floor(clamp(lt / 2.6) * 40), danger = lt > 3;
    return svg(win(20, 30, 580, 300) + Array.from({ length: n }, (_, i) => user(60 + (i % 10) * 56, 90 + Math.floor(i / 10) * 62)).join("") +
      T(310, 390, "users: x10", PK, 34, 700, "middle", (lt - .6) / .3) +
      sprite(310, 490, danger ? PK : BL, 1, danger ? lt * 3 : 0, "1 pod") +
      (danger ? T(310, 620, "CRASH?!", PK, 44, 700, "middle", .5 + .5 * Math.sin(lt * 14)) : "")); },

  manual: lt => svg(cmd(lt, 1, "kubectl scale --replicas=10", 20, "deployment scaled") +
    (lt < 3 ? sprite(95, 250, BL, 1, lt) : grid(10, 250, BL, lt, 3, .14, lt)) +
    T(310, 520, lt > 5 ? "10 pods · ready" : "", GRN, 36, 700, "middle", (lt - 5) / .3), 600),

  auto: lt => { const cpu = lt < 2 ? .3 : lt < 6.5 ? .3 + .6 * clamp((lt - 2) / 2.5) : .9 - .65 * clamp((lt - 6.8) / 1.4);
    const n = lt < 5 ? 2 : lt < 7.3 ? 2 + Math.floor(clamp((lt - 5) / 1.6) * 6) : 8 - Math.floor(clamp((lt - 7.3) / 1.3) * 5);
    return svg(win(20, 20, 580, 150) + T(50, 66, "AUTOSCALER", PIX, 26, 700, "start") + bar(170, 100, 390, cpu, cpu > .7 ? PK : GRN, "CPU") +
      T(560, 66, Math.round(cpu * 100) + "%", cpu > .7 ? PK : GRN, 26, 700, "end") +
      Array.from({ length: 10 }, (_, i) => i < n ? sprite(95 + (i % 5) * 108, 280 + Math.floor(i / 5) * 110, BL, 1, lt) : "").join("") +
      T(310, 540, lt > 7.3 ? "quiet: removing pods" : lt > 5 ? "busy: adding pods!" : "watching…", lt > 7.3 ? LIL : lt > 5 ? PK : LIL, 28, 700), 600); },

  rolling: lt => { const done = Math.floor(clamp((lt - 4) / 3.6) * 5.01);
    return svg(`<rect x="170" y="34" width="34" height="34" fill="${BL}" stroke="${PIX}" stroke-width="4"/>` + T(246, 60, "v1", PIX, 26, 700) + T(310, 60, "→", PIX, 30, 700) +
      `<rect x="360" y="34" width="34" height="34" fill="${GRN}" stroke="${PIX}" stroke-width="4"/>` + T(436, 60, "v2", PIX, 26, 700) +
      Array.from({ length: 5 }, (_, i) => { const sw = lt - 4 - i * .72, flip = i < done; return sprite(95 + i * 108, 220, flip ? GRN : BL, 1, sw > 0 && sw < .5 ? lt * 4 : 0, flip ? "v2" : "v1"); }).join("") +
      bar(170, 360, 390, clamp((lt - 4) / 3.6), GRN, "ROLL") +
      win(60, 450, 500, 110) + T(310, 500, "uptime", LIL, 22, 700) + T(310, 540, "100%  no downtime", GRN, 28, 700, "middle", (lt - 8) / .3), 600); },

  undo: lt => { const back = lt > 3.2;
    return svg((lt < 2 ? win(120, 30, 380, 110, "#ffe3ea") + T(310, 98, "v2 has a bug!", PK, 30, 700) : cmd(lt, 2, "kubectl rollout undo", 30, "rolled back to v1")) +
      Array.from({ length: 5 }, (_, i) => sprite(95 + i * 108, 300, back ? BL : PK, 1, back ? lt : 0, back ? "v1" : "v2")).join("") +
      T(310, 480, back ? "safe again ✓" : "", GRN, 38, 700, "middle", (lt - 3.2) / .3), 560); },

  recap: lt => svg(["cluster", "pods", "deployments", "services", "ingress", "scaling"].map((w, i) => { const d = 2 + i * .7, x = 20 + (i % 2) * 300, y = 40 + Math.floor(i / 2) * 150;
    return lt < d ? "" : `<g transform="translate(${x + 140} ${y + 55})"><g style="${pop(lt, d)}">${win(-140, -55, 280, 110)}<rect x="-118" y="-22" width="44" height="44" fill="${GRN}" stroke="${PIX}" stroke-width="4"/><path d="M-108 0 l9 9 l17 -19" stroke="#fff" stroke-width="6" fill="none"/>${T(-56, 10, w, PIX, 26, 700, "start")}</g></g>`; }).join("") +
    T(310, 540, lt > 6.4 ? "LEVEL COMPLETE" : "", PK, 40, 700, "middle", .6 + .4 * Math.sin(lt * 10)), 600),

  next: lt => svg(`<g transform="translate(310 160)"><g style="${pop(lt, .2)}">${win(-280, -110, 560, 220)}${T(-240, -40, "NEXT LEVEL", LIL, 26, 700, "start")}${T(-240, 30, "CI/CD", PIX, 70, 700, "start")}
      <g transform="translate(150 0)">${[0, 1, 2].map(i => `<rect x="${-70 + i * 50}" y="-18" width="36" height="36" fill="${[BL, YL, GRN][i]}" stroke="${PIX}" stroke-width="4"/>`).join("")}<path d="M-34 0 h14 M16 0 h14" stroke="${PIX}" stroke-width="5"/></g></g></g>` +
    `<g transform="translate(310 370)"><g style="${pop(lt, 4)}">${win(-240, -46, 480, 92, YL)}${T(0, 12, "comment CICD", PIX, 38, 700)}</g></g>` +
    `<g transform="translate(310 510)"><g style="${pop(lt, 4.6)}">${win(-180, -46, 360, 92, PK)}${T(0, 14, "+ FOLLOW", "#fff", 40, 700)}</g></g>`, 600),
};
