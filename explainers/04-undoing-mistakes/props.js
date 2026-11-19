/* ---------- Props: "Rewind" theme (soft cards on a sunset gradient) ---------- */
const CO = "#ff5a3c", PU = "#7c5cff", TE = "#12b5a5", DK = "#2b2140", SOFT = "#7b6f8f";
const svg = (inner, h = 640) => `<svg class="abs" style="left:0;top:10px" width="620" height="${h}" viewBox="0 0 620 ${h}">${inner}</svg>`;
const card = (x, y, w, h, extra = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="26" fill="#fff" ${extra} filter="url(#soft)"/>`;
const t = (x, y, s, col = DK, size = 30, weight = 800, anchor = "start", font = "Inter", op = 1) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${font}" font-weight="${weight}" font-size="${size}" fill="${col}" opacity="${clamp(op)}">${s}</text>`;
const mono = "DejaVu Sans Mono, monospace";
function dot(x, y, col, k = 1, label = "", r = 26, ghost = false) {
  if (k <= 0) return "";
  const s = backOut(clamp(k / .5));
  return `<g transform="translate(${x} ${y}) scale(${s})" opacity="${ghost ? .25 : 1}"><circle r="${r}" fill="${col}"/><circle r="${r - 9}" fill="#fff" opacity=".35"/></g>` +
    (label ? t(x, y + r + 34, label, ghost ? "#bbb" : SOFT, 24, 700, "middle", "Inter", k * 2) : "");
}
const rail = (x1, x2, y, k = 1) => `<rect x="${x1}" y="${y - 5}" width="${(x2 - x1) * clamp(k)}" height="10" rx="5" fill="#e6dcef"/>`;
function term4(lt, lines, top = 60) {
  const shown = lines.filter(([d]) => lt >= d);
  return `<div class="abs" style="left:40px;top:${top}px;width:540px;background:${DK};border-radius:22px;padding:22px 26px;font:600 25px/1.6 'DejaVu Sans Mono',monospace;color:#f3eefc;box-shadow:0 18px 40px rgba(43,33,64,.25);${pop(lt, 0, .3)}">
    ${shown.map(([d, h]) => `<div style="opacity:${clamp((lt - d) / .2)}">${h}</div>`).join("")}</div>`;
}

const P = {
  oops: lt => svg(card(30, 120, 560, 260) + rail(90, 530, 250, lt / .6) +
    [0, 1, 2].map(i => dot(110 + i * 150, 250, PU, (lt - .3 - i * .25) / .3, "C" + (i + 1))).join("") +
    (lt > 1.2 ? `<g transform="translate(560 250) scale(${backOut(clamp((lt - 1.2) / .3))})"><circle r="26" fill="${CO}"/><path d="M-8 -22 L4 -4 L-6 4 L8 22" stroke="#fff" stroke-width="5" fill="none"/></g>` + t(560, 310, "oops", CO, 24, 800, "middle") : "") +
    `<g style="${pop(lt, 1.8)}" transform="translate(310 500)">${card(-110, -70, 220, 140)}${t(0, 18, "⌘ Z ?", DK, 52, 900, "middle")}</g>`),

  three: lt => svg([["RESTORE", TE], ["RESET", CO], ["REVERT", PU]].map(([w, c], i) => {
    const d = i === 0 ? 1 : 2.9 + (i - 1) * .3;
    const s = backOut(clamp((lt - d) / .35));
    return lt < d ? "" : `<g transform="translate(310 ${130 + i * 170}) scale(${s})"><rect x="-240" y="-62" width="480" height="124" rx="62" fill="${c}" opacity=".18"/><rect x="-225" y="-55" width="450" height="104" rx="52" fill="${c}"/><rect x="-225" y="-55" width="450" height="58" rx="29" fill="#fff" opacity=".18"/>${t(0, 16, w, "#fff", 46, 900, "middle")}</g>`;
  }).join("")),

  restore: lt => {
    const wiped = clamp((lt - 4.2) / .6);
    const rows = [["+ new line", TE], ["- old line", CO], ["+ another edit", TE]];
    return svg(card(40, 40, 540, 330) + t(80, 100, "app.js", DK, 32, 800, "start", mono) +
      t(540, 100, wiped > .5 ? "clean" : "modified", wiped > .5 ? TE : CO, 24, 800, "end", "Inter", lt / .3) +
      rows.map(([s, c], i) => `<rect x="80" y="${135 + i * 70}" width="460" height="52" rx="12" fill="${c}" opacity="${(.14 * (1 - wiped)) * clamp((lt - .5 - i * .2) / .2)}"/>` +
        t(100, 170 + i * 70, s, c, 28, 700, "start", mono, clamp((lt - .5 - i * .2) / .2) * (1 - wiped))).join("") +
      (wiped > .5 ? t(310, 245, "back to the last save ✓", TE, 32, 800, "middle", "Inter", (wiped - .5) * 2) : ""), 400) +
      term4(lt, [[2.6, `<span style="color:#9df0e3">$</span> git restore app.js`]], 430);
  },

  reset: lt => {
    const k = clamp((lt - 3.6) / 1.2), hx = lerp(560, 260, easeOut(k));
    return svg(card(20, 60, 580, 280) + rail(80, 560, 200) +
      [0, 1, 2, 3].map(i => dot(110 + i * 150, 200, PU, 1, "C" + (i + 1), 24, i >= 2 && k > .6)).join("") +
      `<g transform="translate(${hx} 120)"><rect x="-56" y="-26" width="112" height="44" rx="22" fill="${CO}"/>${t(0, 6, "HEAD", "#fff", 22, 900, "middle")}<path d="M0 18 L0 50" stroke="${CO}" stroke-width="5"/></g>` +
      (k > 0 && k < 1 ? t(430, 300, "⏪ rewinding…", CO, 26, 800, "middle") : "") +
      (lt > 7 ? `<g style="${pop(lt, 7)}">${card(70, 400, 480, 120)}<path d="M120 490 L150 430 L180 490 Z" fill="${CO}"/>${t(150, 482, "!", "#fff", 30, 900, "middle")}${t(205, 455, "Only if you", DK, 28, 800)}${t(205, 495, "haven't pushed", CO, 30, 900)}</g>` : ""), 560) +
      (lt > 2.6 && lt < 7 ? term4(lt, [[2.6, `<span style="color:#9df0e3">$</span> git reset HEAD~2`]], 430) : "");
  },

  revert: lt => {
    const k = (lt - 4.2) / .4;
    return svg(card(10, 60, 600, 280) + rail(60, 580, 200) +
      dot(100, 200, PU, 1, "C1") + dot(230, 200, PU, 1, "C2") + dot(360, 200, CO, 1, "bad") +
      dot(500, 200, TE, k, "undo bad") +
      (lt > 4.2 ? `<path d="M480 160 C 440 110, 400 110, 375 160" stroke="${TE}" stroke-width="5" fill="none" stroke-dasharray="8 8" opacity="${clamp(k)}"/>` : "") +
      t(310, 120, "history is kept", SOFT, 26, 700, "middle", "Inter", (lt - 5.5) / .3) +
      (lt > 9 ? `<g style="${pop(lt, 9)}">${card(110, 410, 400, 130)}${[0, 1, 2].map(i => `<circle cx="${180 + i * 50}" cy="475" r="26" fill="${["#ffd27a", "#9bd4ff", "#ffb3c7"][i]}" stroke="#fff" stroke-width="5"/>`).join("")}${t(350, 470, "team stays", DK, 28, 800)}${t(350, 505, "in sync ✓", TE, 28, 900)}</g>` : ""), 580) +
      (lt > 2.8 && lt < 9 ? term4(lt, [[2.8, `<span style="color:#9df0e3">$</span> git revert C3`]], 430) : "");
  },

  rule: lt => svg([["not committed", "restore", TE], ["not pushed", "reset", CO], ["pushed", "revert", PU]].map(([a, b, c], i) => {
    const d = 1 + i * 2;
    return lt < d ? "" : `<g style="${pop(lt, d)}">${card(30, 60 + i * 175, 560, 140)}${t(70, 145 + i * 175, a, SOFT, 32, 700)}${t(330, 145 + i * 175, "→", SOFT, 34, 700)}<rect x="380" y="${100 + i * 175}" width="180" height="64" rx="32" fill="${c}"/>${t(470, 143 + i * 175, b, "#fff", 30, 900, "middle")}</g>`;
  }).join("")),

  wrap: lt => svg(card(40, 40, 540, 470) + t(310, 115, "Git basics", DK, 44, 900, "middle", "Inter", lt / .3) +
    ["Git & GitHub", "Branches", "Merge conflicts", "Undoing mistakes"].map((w, i) => {
      const d = .2 + i * .3;
      return `<g opacity="${clamp((lt - d) / .2)}"><circle cx="110" cy="${185 + i * 85}" r="24" fill="${TE}"/><path d="M98 ${185 + i * 85} l9 10 l17 -18" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>${t(155, 196 + i * 85, w, DK, 32, 800)}</g>`;
    }).join("") +
    Array.from({ length: 26 }, (_, i) => { const a = i * 2.4, r = 120 + (lt * 260 % 180); const o = clamp(1 - (lt - 1) / 2); return lt < .9 ? "" : `<rect x="${310 + Math.cos(a) * r}" y="${280 + Math.sin(a) * r * .8}" width="12" height="12" rx="3" fill="${[CO, PU, TE, "#ffc94a"][i % 4]}" opacity="${o}" transform="rotate(${i * 30 + lt * 200} ${310 + Math.cos(a) * r} ${280 + Math.sin(a) * r * .8})"/>`; }).join("")),

  follow: lt => svg(
    `<g style="${pop(lt, .2)}">${card(40, 40, 540, 230)}
      <g transform="translate(120 155)"><rect x="-55" y="-10" width="110" height="40" rx="8" fill="${PU}"/><rect x="-45" y="-48" width="40" height="34" rx="4" fill="${TE}"/><rect x="0" y="-48" width="40" height="34" rx="4" fill="${CO}"/><rect x="-22" y="-84" width="40" height="34" rx="4" fill="#ffc94a"/><path d="M-70 34 Q0 60 70 34" stroke="${PU}" stroke-width="6" fill="none"/></g>
      ${t(210, 130, "New topic", SOFT, 30, 700)}${t(210, 190, "Docker", DK, 60, 900)}</g>` +
    `<g style="${pop(lt, 4)}"><rect x="130" y="340" width="360" height="104" rx="52" fill="url(#cta)"/>${t(310, 408, "+ Follow", "#fff", 44, 900, "middle")}</g>` +
    t(310, 500, "DevOps, one simple idea at a time", SOFT, 28, 600, "middle", "Inter", (lt - 4.4) / .3) +
    `<defs><linearGradient id="cta" x1="0" x2="1"><stop offset="0" stop-color="${CO}"/><stop offset="1" stop-color="${PU}"/></linearGradient></defs>`),
};
