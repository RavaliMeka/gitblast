/* ---------- Props: lab theme (jobs are test tubes) ---------- */
const TEAL = "#0fa3b1", GRN4 = "#2fbf71", RED4 = "#e5383b", PUR = "#7b5ea7", NAV = "#16324f", MU6 = "#6c8a9b", GLASS = "#dff3f6";
const mono = "DejaVu Sans Mono, monospace";
const svg = (inner, h = 640) => `<svg class="abs" style="left:0;top:0" width="640" height="${h}" viewBox="0 0 640 ${h}">${inner}</svg>`;
const T = (x, y, s, col = NAV, size = 28, weight = 800, anchor = "middle", font = "Inter", op = 1) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${font}" font-weight="${weight}" font-size="${size}" fill="${col}" opacity="${clamp(op)}">${s}</text>`;
const grow = (k, inner, x, y) => k <= 0 ? "" : `<g transform="translate(${x} ${y}) scale(${backOut(clamp(k / .4))})">${inner}</g>`;
const card = (x, y, w, h, stroke = "#c5e4ea") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#fff" stroke="${stroke}" stroke-width="4"/>`;
// a test tube: fill 0..1, state "run" | "pass" | "fail"
function tube(x, y, fill, state, label, t = 0, h = 190, w = 62) {
  const col = state === "fail" ? RED4 : state === "pass" ? GRN4 : TEAL, lvl = h * clamp(fill) * .82, id = "tb" + Math.round(x) + Math.round(y);
  const bubbles = state === "run" && fill > .05 ? [0, 1, 2].map(i => { const p = (t * .9 + i / 3) % 1; return `<circle cx="${(i - 1) * 13}" cy="${h - 12 - p * lvl}" r="${4 + i}" fill="#fff" opacity="${.7 * (1 - p)}"/>`; }).join("") : "";
  return `<g transform="translate(${x} ${y})"><clipPath id="${id}"><path d="M${-w / 2} 0 V${h - w / 2} a${w / 2} ${w / 2} 0 0 0 ${w} 0 V0 Z"/></clipPath>
    <path d="M${-w / 2} 0 V${h - w / 2} a${w / 2} ${w / 2} 0 0 0 ${w} 0 V0 Z" fill="${GLASS}"/>
    <g clip-path="url(#${id})"><rect x="${-w / 2}" y="${h - lvl}" width="${w}" height="${lvl + 2}" fill="${col}"/>${bubbles}</g>
    <path d="M${-w / 2} 0 V${h - w / 2} a${w / 2} ${w / 2} 0 0 0 ${w} 0 V0" fill="none" stroke="${NAV}" stroke-width="5"/><rect x="${-w / 2 - 8}" y="-10" width="${w + 16}" height="14" rx="7" fill="${NAV}"/>
    <rect x="${-w / 2 + 9}" y="14" width="7" height="${h * .5}" rx="3.5" fill="#fff" opacity=".6"/>
    ${state === "pass" ? `<circle cy="${h + 44}" r="18" fill="${GRN4}"/><path d="M-8 ${h + 44} l6 7 l11 -13" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>` : state === "fail" ? `<circle cy="${h + 44}" r="18" fill="${RED4}"/><path d="M-7 ${h + 37} l14 14 M7 ${h + 37} l-14 14" stroke="#fff" stroke-width="5" stroke-linecap="round"/>` : ""}
    <text y="-26" text-anchor="middle" font-family="${mono}" font-weight="700" font-size="22" fill="${NAV}">${label}</text></g>`;
}
const rack = (y, x1 = 60, x2 = 580) => `<rect x="${x1}" y="${y}" width="${x2 - x1}" height="18" rx="8" fill="#b9d7de"/><path d="M${x1 + 30} ${y + 18} V${y + 70} M${x2 - 30} ${y + 18} V${y + 70}" stroke="#b9d7de" stroke-width="12"/>`;
function mergeBtn(x, y, state, k = 1) { // "locked" | "ready" | "wait"
  const c = state === "ready" ? GRN4 : "#b8c7cf", label = state === "ready" ? "Merge pull request" : state === "locked" ? "🔒 Merging is blocked" : "Checks running…";
  return grow(k, `<rect x="-200" y="-36" width="400" height="72" rx="14" fill="${c}"/><text y="10" text-anchor="middle" font-family="Inter" font-weight="800" font-size="26" fill="#fff">${label}</text>`, x, y);
}
const TXS = [170, 320, 470];

const P = {
  broke: lt => { const boom = lt > 1.6;
    return svg(`<g transform="translate(320 150)"><g style="${pop(lt, .1)}">${card(-270, -90, 540, 180, boom ? RED4 : "#c5e4ea")}${T(-230, -24, "Pull request #42", NAV, 30, 900, "start")}${T(-230, 26, boom ? "merged → main is broken" : "looks fine to me 👍", boom ? RED4 : MU6, 24, 700, "start", mono)}</g></g>` +
      (boom ? Array.from({ length: 6 }, (_, i) => grow(lt - 1.6 - i * .12, `<rect x="-70" y="-26" width="140" height="52" rx="10" fill="#ffe3e3" stroke="${RED4}" stroke-width="3"/><text y="8" text-anchor="middle" font-family="${mono}" font-weight="700" font-size="20" fill="${RED4}">${["500 error", "crash", "login ✗", "cart ✗", "bug", "404"][i]}</text>`, 130 + (i % 3) * 190, 330 + Math.floor(i / 3) * 80)).join("") : "") +
      (lt > 4 ? `<g transform="translate(320 560)"><g style="${pop(lt, 4)}">${T(0, 0, "never again", TEAL, 44, 900)}</g></g>` : "")); },

  trigger: lt => { const sw = lt > 1.2;
    return svg(card(40, 30, 560, 150) + T(70, 90, "on:", NAV, 30, 700, "start", mono) + T(150, 90, sw ? "[pull_request]" : "[push]", sw ? TEAL : MU6, 30, 800, "start", mono) + T(70, 140, sw ? "runs when a PR opens or updates" : "", MU6, 20, 600, "start", mono, (lt - 1.5) / .3) +
      (lt > 3 ? `<g transform="translate(320 360)"><g style="${pop(lt, 3)}">${card(-270, -110, 540, 220)}${T(-230, -50, "Pull request #43", NAV, 30, 900, "start")}<g transform="translate(-205 10) rotate(${lt * 260})"><circle r="16" fill="none" stroke="#f4a52e" stroke-width="6" stroke-dasharray="64 36"/></g>${T(-170, 20, "CI running…", "#f4a52e", 26, 800, "start", mono)}${T(-230, 76, "tested before it merges", MU6, 22, 700, "start", mono)}</g></g>` : "") +
      (lt > 3.6 ? mergeBtn(320, 560, "wait", lt - 3.6) : "")); },

  jobs: lt => { const f = i => clamp((lt - 3.2) / (2 + i * .5)), st = i => f(i) >= 1 ? "pass" : "run";
    return svg(rack(180) + ["lint", "test", "build"].map((w, i) => `<g opacity="${clamp((lt - .3 - i * .7) / .3)}">${tube(TXS[i], 200, lt > 3.2 ? f(i) : 0, lt > 3.2 ? st(i) : "run", w, lt)}</g>`).join("") +
      T(320, 560, lt > 3.2 ? "same time · separate runners" : "", TEAL, 28, 800, "middle", mono, (lt - 3.4) / .3)); },

  matrix: lt => svg(`<g transform="translate(320 90)"><g style="${pop(lt, .2)}">${card(-280, -64, 560, 128, PUR)}${T(-250, -12, "strategy:", NAV, 24, 700, "start", mono)}${T(-250, 32, "  matrix: { node: [18, 20, 22] }", PUR, 24, 800, "start", mono)}</g></g>` +
    (lt > 2 ? rack(250) + [18, 20, 22].map((v, i) => { const f = clamp((lt - 2.8 - i * .3) / 2.4); return `<g opacity="${clamp((lt - 2 - i * .25) / .3)}">${tube(TXS[i], 270, f, f >= 1 ? "pass" : "run", "node " + v, lt, 170)}</g>`; }).join("") : "") +
    T(320, 600, lt > 3 ? "1 job × 3 versions" : "", PUR, 28, 800, "middle", mono, (lt - 3) / .3)),

  fail: lt => svg(rack(100) + tube(TXS[0], 120, 1, "pass", "lint", lt, 170) + tube(TXS[1], 120, lt > .6 ? 1 : .6, lt > .6 ? "fail" : "run", "test", lt, 170) + tube(TXS[2], 120, 1, "pass", "build", lt, 170) +
    (lt > 3 ? mergeBtn(320, 470, "locked", lt - 3) + T(320, 550, "branch protection: checks must pass", MU6, 22, 700, "middle", mono, (lt - 3.6) / .3) : T(320, 470, lt > .8 ? "1 check failed" : "", RED4, 30, 900)), 600),

  fix: lt => { const f = clamp((lt - 1.4) / 1.5), ok = f >= 1;
    return svg(card(60, 16, 520, 64, NAV) + `<rect x="60" y="16" width="520" height="64" rx="18" fill="${NAV}"/>` + T(86, 58, "$ git push   (fix the bug)", "#bff3fa", 24, 700, "start", mono, lt / .3) +
      rack(130) + tube(TXS[0], 150, 1, "pass", "lint", lt, 160) + tube(TXS[1], 150, lt < 1.4 ? .1 : f, ok ? "pass" : "run", "test", lt, 160) + tube(TXS[2], 150, 1, "pass", "build", lt, 160) +
      mergeBtn(320, 490, ok ? "ready" : "wait", 1) + (ok ? T(320, 570, "all checks passed ✓", GRN4, 30, 900, "middle", "Inter", (lt - 3) / .3) : ""), 620); },

  robots: lt => svg(tube(320, 90, .75, "run", "", lt, 260, 130) + `<g transform="translate(320 ${290 + Math.sin(lt * 4) * 8})"><ellipse rx="26" ry="20" fill="${PUR}"/><circle cx="-10" cy="-6" r="5" fill="#fff"/><circle cx="10" cy="-6" r="5" fill="#fff"/><path d="M-26 0 h-16 M26 0 h16 M-20 12 l-14 12 M20 12 l14 12" stroke="${PUR}" stroke-width="5" stroke-linecap="round"/></g>` +
    T(320, 440, "caught in the lab", TEAL, 32, 900, "middle", "Inter", (lt - .4) / .3) + T(320, 490, "not in production", MU6, 26, 700, "middle", mono, (lt - 1.6) / .3), 560),

  recap: lt => svg([["PR trigger", "on: [pull_request]", TEAL], ["Parallel jobs", "lint · test · build", GRN4], ["Matrix", "many versions at once", PUR], ["Protection", "red = no merge", RED4]].map(([a, b, c], i) =>
    `<g transform="translate(320 ${90 + i * 132})"><g style="${pop(lt, .1 + i * .7)}">${card(-290, -52, 580, 104, c)}<circle cx="-240" cy="0" r="26" fill="${c}"/>${T(-240, 10, String(i + 1), "#fff", 28, 900)}${T(-196, 0, a, NAV, 32, 900, "start")}${T(-196, 32, b, MU6, 20, 700, "start", mono)}</g></g>`).join("")),

  next: lt => svg(`<g transform="translate(320 180)"><g style="${pop(lt, .2)}">${card(-290, -105, 580, 210)}${T(-250, -34, "Part 4", MU6, 28, 800, "start", mono)}${T(-250, 40, "Deploy automatically", NAV, 44, 900, "start")}</g></g>` +
    `<g transform="translate(320 420)"><g style="${pop(lt, 2.4)}"><rect x="-180" y="-52" width="360" height="104" rx="52" fill="${TEAL}"/>${T(0, 16, "+ Follow", "#fff", 44, 900)}</g></g>`),
};
