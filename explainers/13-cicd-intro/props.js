/* ---------- Props: factory theme (conveyor belt and stations) ---------- */
const ST = "#37474f", YE = "#ffc300", OR2 = "#f77f00", GN2 = "#2a9d5c", RD3 = "#d62839", BLU = "#3d7dd8", MU4 = "#78909c";
const mono = "DejaVu Sans Mono, monospace";
const svg = (inner, h = 690) => `<svg class="abs" style="left:0;top:0" width="620" height="${h}" viewBox="0 0 620 ${h}">${inner}</svg>`;
const T = (x, y, s, col = ST, size = 28, weight = 800, anchor = "middle", font = "Inter", op = 1) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${font}" font-weight="${weight}" font-size="${size}" fill="${col}" opacity="${clamp(op)}">${s}</text>`;
const grow = (k, inner, x, y) => k <= 0 ? "" : `<g transform="translate(${x} ${y}) scale(${backOut(clamp(k / .4))})">${inner}</g>`;
const plate = (x, y, w, h, col = "#fff", stroke = "#cfd8dc") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${col}" stroke="${stroke}" stroke-width="4"/>`;
// conveyor belt at height y, moving with time t
function belt(y, t, x1 = 10, x2 = 610) {
  const off = (t * 60) % 40;
  return `<rect x="${x1}" y="${y}" width="${x2 - x1}" height="26" rx="13" fill="${ST}"/>` +
    Array.from({ length: Math.ceil((x2 - x1) / 40) }, (_, i) => { const x = x1 + 8 + i * 40 + off; return x < x2 - 14 ? `<rect x="${x}" y="${y + 9}" width="16" height="8" rx="2" fill="#607d8b"/>` : ""; }).join("") +
    [x1 + 13, (x1 + x2) / 2, x2 - 13].map(x => `<circle cx="${x}" cy="${y + 13}" r="9" fill="#90a4ae"/>`).join("") +
    `<path d="M${x1 + 40} ${y + 26} V${y + 70} M${x2 - 40} ${y + 26} V${y + 70}" stroke="${ST}" stroke-width="10"/>`;
}
// a station gantry over the belt
function station(x, y, label, col, active = false, t = 0) {
  const press = active ? Math.abs(Math.sin(t * 6)) * 14 : 0;
  return `<path d="M${x - 62} ${y} V${y - 150} H${x + 62} V${y}" fill="none" stroke="${ST}" stroke-width="10"/>
    <rect x="${x - 70}" y="${y - 196}" width="140" height="50" rx="8" fill="${col}"/><text x="${x}" y="${y - 162}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="24" fill="#fff">${label}</text>
    <rect x="${x - 8}" y="${y - 146}" width="16" height="${50 + press}" fill="#90a4ae"/><rect x="${x - 26}" y="${y - 98 + press}" width="52" height="14" rx="4" fill="${col}"/>
    <circle cx="${x + 48}" cy="${y - 171}" r="7" fill="${active ? "#fff" : "rgba(255,255,255,.35)"}"/>`;
}
const crate = (x, y, col = BLU, label = "", s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-30" y="-54" width="60" height="54" rx="6" fill="${col}"/><rect x="-30" y="-54" width="60" height="10" rx="5" fill="#fff" opacity=".3"/>${label ? `<text y="-20" text-anchor="middle" font-family="${mono}" font-weight="700" font-size="16" fill="#fff">${label}</text>` : ""}</g>`;
const tick = (x, y, k, col = GN2) => grow(k, `<circle r="18" fill="${col}"/><path d="M-8 0 l6 7 l11 -13" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>`, x, y);
const gear = (x, y, r, t, col = ST) => `<g transform="translate(${x} ${y}) rotate(${t * 90})">${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="-7" y="${-r - 9}" width="14" height="18" rx="3" fill="${col}" transform="rotate(${i * 45})"/>`).join("")}<circle r="${r}" fill="${col}"/><circle r="${r * .4}" fill="#eceff1"/></g>`;
const SX = [130, 310, 490];

const P = {
  manual: lt => svg(["🧪 run tests", "🔨 build app", "📤 upload files", "🚀 deploy"].map((w, i) => `<g transform="translate(310 ${110 + i * 112})"><g style="${pop(lt, 2 + i * .7)}">${plate(-250, -44, 500, 88)}${T(-220, 12, w, ST, 32, 800, "start")}${T(220, 10, "by hand ✋", MU4, 22, 700, "end", mono)}</g></g>`).join("") +
    (lt > 6 ? `<g transform="translate(310 590)"><g style="${pop(lt, 6)}">${T(0, 0, "× every single time", RD3, 38, 900)}</g></g>` : "") + (lt < 2 ? T(310, 300, "🐛 → ✅", ST, 80, 800, "middle", "Inter", lt / .3) : "")),

  enter: lt => svg(`<g transform="translate(310 280)"><g style="${pop(lt, .1)}">${gear(-150, -60, 60, lt)}${gear(-60, 40, 44, -lt * 1.4, OR2)}<rect x="-40" y="-110" width="320" height="200" rx="20" fill="${YE}"/>${T(120, 10, "CI/CD", ST, 84, 900)}</g></g>` +
    T(310, 520, "automate the boring part", MU4, 28, 700, "middle", mono, (lt - .8) / .3)),

  line: lt => { const k = clamp((lt - 3) / 4.6), x = lerp(-40, 660, k), stage = x < 130 ? 0 : x < 310 ? 1 : x < 490 ? 2 : 3;
    return svg(SX.map((sx, i) => station(sx, 380, ["TEST", "BUILD", "SHIP"][i], [GN2, BLU, OR2][i], Math.abs(x - sx) < 44, lt)).join("") + belt(380, lt) +
      (lt > 3 ? crate(x, 380, [MU4, GN2, BLU, OR2][stage], ["code", "ok", "app", "live"][stage]) : "") +
      T(60, 480, "code in", MU4, 22, 700, "middle", mono, (lt - 3) / .3) + T(560, 480, "app out ✓", GN2, 22, 800, "middle", mono, (lt - 6.4) / .3) +
      T(310, 590, lt > 6.6 ? "tested · built · shipped" : "", ST, 30, 900)); },

  ci: lt => { let out = "";
    for (let i = 0; i < 4; i++) { const d = 3 + i * 1.5, bad = i === 3, k = clamp((lt - d) / 2.2); if (lt < d) continue;
      let x = lerp(-40, 660, k), y = 380; const tested = x > 310;
      if (bad && tested) { const f = clamp((x - 310) / 140); x = 310 + f * 60; y = 380 + f * f * 170; }
      out += crate(x, y, tested ? (bad ? RD3 : GN2) : MU4, tested ? (bad ? "bug" : "ok") : "push"); }
    return svg(station(310, 380, "TEST", GN2, lt > 3 && ((lt - 3) % 1.5) > .9 && ((lt - 3) % 1.5) < 1.4, lt) + belt(380, lt) + out +
      `<path d="M330 560 h110 l-12 80 h-86 z" fill="#b0bec5"/><rect x="322" y="548" width="126" height="16" rx="6" fill="${ST}"/>` + T(385, 668, "rejected", RD3, 20, 800, "middle", mono, (lt - 9) / .3) +
      T(120, 250, "every push", MU4, 24, 700, "middle", mono, (lt - 3) / .3) + T(520, 250, "passes ✓", GN2, 24, 800, "middle", mono, (lt - 4.6) / .3)); },

  cd: lt => { let out = "";
    for (let i = 0; i < 3; i++) { const d = 2 + i * 1.3, k = clamp((lt - d) / 2); if (lt < d) continue; const x = lerp(-40, 440, easeOut(k)); if (k < 1) out += crate(x, 380, GN2, "ok"); }
    const n = Math.min(3, Math.floor(Math.max(0, lt - 3.6) / 1.3) + (lt > 3.6 ? 1 : 0));
    return svg(belt(380, lt, 10, 430) + out +
      `<g transform="translate(490 330)"><path d="M-70 0 C -110 0, -110 -55, -70 -58 C -65 -100, -5 -110, 10 -75 C 30 -105, 90 -95, 85 -50 C 120 -48, 120 0, 85 0 Z" fill="#fff" stroke="${OR2}" stroke-width="6"/><text x="5" y="-22" text-anchor="middle" font-family="Inter" font-weight="900" font-size="26" fill="${OR2}">LIVE</text></g>` +
      Array.from({ length: n }, (_, i) => tick(450 + i * 46, 400, 1)).join("") +
      (lt > 6 ? `<g transform="translate(160 160)"><g style="${pop(lt, 6)}">${plate(-130, -60, 260, 120)}<text x="-70" y="16" text-anchor="middle" font-size="54">🌙</text>${T(40, 4, "2 a.m.", MU4, 24, 700, "middle", mono)}${T(40, 34, "deploys", MU4, 24, 700, "middle", mono)}<path d="M-120 50 L120 -50" stroke="${RD3}" stroke-width="8" stroke-linecap="round"/></g></g>` : "") +
      T(310, 560, lt > 2 ? "passes → ships itself" : "", ST, 30, 900, "middle", "Inter", (lt - 2.4) / .3)); },

  tool: lt => svg(`<g transform="translate(310 220)"><g style="${pop(lt, .2)}">${plate(-270, -140, 540, 280, "#fff", YE)}<circle cx="-160" cy="0" r="62" fill="${ST}"/><path d="M-178 -30 L-128 0 L-178 30 Z" fill="${YE}"/>${T(60, -14, "GitHub", ST, 46, 900)}${T(60, 44, "Actions", OR2, 50, 900)}</g></g>` +
    [["built into GitHub", GN2], ["free to start", BLU]].map(([w, c], i) => `<g transform="translate(${170 + i * 280} 470)"><g style="${pop(lt, 3 + i * .5)}"><rect x="-130" y="-36" width="260" height="72" rx="36" fill="${c}"/>${T(0, 9, w, "#fff", 24, 800)}</g></g>`).join("")),

  robots: lt => svg(plate(40, 40, 540, 90, ST, ST) + T(70, 96, "$ git push", YE, 30, 700, "start", mono) + gear(200, 300, 70, lt * 2) + gear(318, 372, 50, -lt * 2.8, OR2) + gear(420, 290, 58, lt * 2.4, BLU) +
    ["test", "build", "deploy"].map((w, i) => tick(150 + i * 160, 520, lt - .8 - i * .5) + T(150 + i * 160, 580, w, ST, 24, 800, "middle", mono, (lt - .9 - i * .5) / .2)).join("")),

  recap: lt => svg([["CI", "test every change", GN2, .1], ["CD", "ship every change", OR2, 2.4]].map(([a, b, c, d], i) => `<g transform="translate(310 ${170 + i * 240})"><g style="${pop(lt, d)}">${plate(-280, -95, 560, 190, "#fff", c)}<rect x="-250" y="-60" width="150" height="120" rx="16" fill="${c}"/>${T(-175, 22, a, "#fff", 62, 900)}${T(-70, 14, b, ST, 32, 800, "start")}</g></g>`).join("")),

  next: lt => svg(`<g transform="translate(310 200)"><g style="${pop(lt, .2)}">${plate(-280, -105, 560, 210)}${T(-240, -34, "Part 2", MU4, 28, 800, "start", mono)}${T(-240, 40, "Your first workflow", ST, 44, 900, "start")}</g></g>` +
    `<g transform="translate(310 440)"><g style="${pop(lt, 2.2)}"><rect x="-180" y="-52" width="360" height="104" rx="16" fill="${YE}"/>${T(0, 16, "+ Follow", ST, 44, 900)}</g></g>`),
};
