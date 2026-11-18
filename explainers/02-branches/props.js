/* ---------- Props: subway-map visuals (left side) ---------- */
const BLUE = "#2563eb", GREEN = "#16a34a", RED = "#e11d48", TEAL = "#0f3b40";
// a metro line drawn left to right, revealed by progress k (0..1)
function line(x1, y1, x2, y2, col, k = 1, w = 16, extra = "") {
  const len = Math.hypot(x2 - x1, y2 - y1);
  return `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" fill="none" stroke-dasharray="${len}" stroke-dashoffset="${len * (1 - clamp(k))}" ${extra}/>`;
}
function curve(d, len, col, k = 1, w = 16, extra = "") {
  return `<path d="${d}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" fill="none" stroke-dasharray="${len}" stroke-dashoffset="${len * (1 - clamp(k))}" ${extra}/>`;
}
function station(x, y, col, k = 1, label = "", below = true) {
  if (k <= 0) return "";
  const s = backOut(clamp(k / .5));
  return `<g transform="translate(${x} ${y}) scale(${s})"><circle r="17" fill="#fff" stroke="${col}" stroke-width="8"/></g>` +
    (label ? `<text x="${x}" y="${y + (below ? 52 : -32)}" text-anchor="middle" font-family="Inter" font-weight="700" font-size="24" fill="${TEAL}" opacity="${clamp(k * 2)}">${label}</text>` : "");
}
function tag(x, y, text, col, k = 1) {
  if (k <= 0) return "";
  const w = text.length * 15 + 40;
  return `<g opacity="${clamp(k * 2)}" transform="translate(${x} ${y + (1 - easeOut(clamp(k))) * 10})"><rect x="0" y="-22" width="${w}" height="44" rx="22" fill="${col}"/><text x="${w / 2}" y="8" text-anchor="middle" font-family="Inter" font-weight="800" font-size="22" fill="#fff">${text}</text></g>`;
}
const svg = (inner, h = 620) => `<svg class="abs" style="left:0;top:40px" width="600" height="${h}" viewBox="0 0 600 ${h}">${inner}</svg>`;

const P = {
  hook: lt => svg(`
    <g style="${pop(lt, .1)}"><rect x="70" y="80" width="420" height="300" rx="28" fill="#fff" stroke="#cfe3dc" stroke-width="3"/>
      <rect x="70" y="80" width="420" height="56" rx="28" fill="${TEAL}"/><rect x="70" y="110" width="420" height="26" fill="${TEAL}"/>
      <circle cx="104" cy="108" r="8" fill="#ff5f57"/><circle cx="130" cy="108" r="8" fill="#febc2e"/><circle cx="156" cy="108" r="8" fill="#28c840"/>
      <text x="280" y="215" text-anchor="middle" font-family="Inter" font-weight="800" font-size="40" fill="${TEAL}">my-app</text>
      <text x="280" y="262" text-anchor="middle" font-family="Inter" font-weight="600" font-size="26" fill="${GREEN}">✓ working</text>
      <rect x="150" y="300" width="260" height="22" rx="11" fill="#e5f3ee"/><rect x="150" y="300" width="190" height="22" rx="11" fill="#bfe5d6"/></g>
    <g style="${pop(lt, .9)}" transform="rotate(-8 440 90)"><rect x="350" y="40" width="200" height="64" rx="14" fill="#ffd84a"/><text x="450" y="82" text-anchor="middle" font-family="Inter" font-weight="800" font-size="26" fill="${TEAL}">new feature?</text></g>
    <g style="${pop(lt, 2.2)}"><path d="M280 430 L340 530 L220 530 Z" fill="${RED}"/><text x="280" y="518" text-anchor="middle" font-family="Inter" font-weight="900" font-size="58" fill="#fff">!</text></g>`),

  slots: lt => {
    const slot = (y, d, num, name, sub, col, icon) => `<g style="${pop(lt, d)}">
      <rect x="40" y="${y}" width="500" height="150" rx="24" fill="#fff" stroke="${col}" stroke-width="5"/>
      <rect x="40" y="${y}" width="110" height="150" rx="24" fill="${col}"/><rect x="120" y="${y}" width="30" height="150" fill="${col}"/>
      <text x="95" y="${y + 62}" text-anchor="middle" font-family="Inter" font-weight="800" font-size="20" fill="#fff" opacity=".85">SLOT</text>
      <text x="95" y="${y + 108}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="48" fill="#fff">${num}</text>
      <text x="180" y="${y + 68}" font-family="DejaVu Sans Mono, monospace" font-weight="700" font-size="36" fill="${TEAL}">${name}</text>
      <text x="180" y="${y + 110}" font-family="Inter" font-weight="600" font-size="26" fill="#5b7c78">${sub}</text>
      <text x="500" y="${y + 92}" text-anchor="end" font-size="44">${icon}</text></g>`;
    return svg(slot(90, .2, 1, "main", "your real game, safe", BLUE, "🔒") + slot(290, 2.2, 2, "feature", "try anything here", GREEN, "🧪") +
      `<text x="290" y="520" text-anchor="middle" font-family="Inter" font-weight="700" font-size="28" fill="#5b7c78" opacity="${clamp((lt - 5) / .4)}">experiment freely, main stays safe</text>`);
  },

  main: lt => svg(line(40, 300, 560, 300, BLUE, lt / .9) +
    [0, 1, 2, 3].map(i => station(90 + i * 140, 300, BLUE, (lt - .4 - i * .35) / .4, "C" + (i + 1))).join("") +
    tag(40, 200, "main", BLUE, (lt - .2) / .3)),

  create: lt => {
    const k = clamp((lt - 3.2) / .9);
    return term(lt, [[.2, `<span class="p">$</span> git switch -c feature`], [3, `<span class="ok">Switched to a new branch 'feature'</span>`]], 0) +
      svg(line(40, 420, 560, 420, BLUE) + [0, 1, 2].map(i => station(90 + i * 150, 420, BLUE, 1, "", true)).join("") + tag(40, 340, "main", BLUE) +
        curve("M240 420 C 300 420, 300 540, 380 540 L 560 540", 380, GREEN, k) + tag(400, 590, "feature", GREEN, (lt - 4) / .3), 640);
  },

  commits: lt => svg(line(40, 230, 560, 230, BLUE) + [0, 1, 2].map(i => station(90 + i * 150, 230, BLUE)).join("") + tag(40, 150, "main", BLUE) +
    curve("M240 230 C 300 230, 300 380, 380 380 L 560 380", 380, GREEN) +
    [0, 1, 2].map(i => station(380 + i * 75, 380, GREEN, (lt - 1.2 - i * 1.1) / .4, "F" + (i + 1))).join("") + tag(330, 470, "feature", GREEN) +
    `<g opacity="${clamp((lt - 4.5) / .4)}"><rect x="300" y="120" width="250" height="56" rx="28" fill="#e6efff" stroke="${BLUE}" stroke-width="3"/><text x="425" y="157" text-anchor="middle" font-family="Inter" font-weight="800" font-size="24" fill="${BLUE}">main unchanged</text></g>`),

  broke: lt => {
    const glitch = lt < 2.2 ? Math.sin(lt * 60) * 5 * clamp(lt / .3) : 0, gone = clamp((lt - 2.2) / .6);
    const col = lt > .3 ? RED : GREEN;
    return svg(line(40, 230, 560, 230, BLUE) + [0, 1, 2].map(i => station(90 + i * 150, 230, BLUE)).join("") + tag(40, 150, "main", BLUE) +
      `<g transform="translate(${glitch} 0)" opacity="${1 - gone}">` + curve("M240 230 C 300 230, 300 380, 380 380 L 560 380", 380, col) +
      [0, 1, 2].map(i => station(380 + i * 75, 380, col)).join("") + `<text x="470" y="450" text-anchor="middle" font-size="44">💥</text></g>` +
      `<g style="${pop(lt, 2.4)}"><text x="420" y="420" text-anchor="middle" font-size="64">🗑️</text></g>` +
      tag(300, 560, "main ✓ untouched", GREEN, (lt - 3) / .3));
  },

  merge: lt => {
    const k = clamp((lt - 6) / 1), joined = lt > 7;
    return term(lt, [[1.8, `<span class="p">$</span> git switch main`], [5, `<span class="p">$</span> git merge feature`], [6.8, `<span class="ok">✓ feature merged into main</span>`]], 0) +
      svg(line(40, 400, 560, 400, BLUE) + [0, 1].map(i => station(90 + i * 120, 400, BLUE)).join("") + tag(40, 320, "main", BLUE) +
        curve("M210 400 C 260 400, 260 520, 320 520 L 380 520", 240, GREEN) + station(330, 520, GREEN) +
        curve("M380 520 C 440 520, 440 400, 500 400", 180, GREEN, k) +
        station(500, 400, joined ? GREEN : BLUE, joined ? 1 + Math.sin((lt - 7) * 8) * .15 * Math.exp(-(lt - 7) * 2) : (lt > 6 ? .9 : 0)) +
        tag(330, 600, "merged!", GREEN, (lt - 7.1) / .3), 660);
  },

  pr: lt => `<div class="abs" style="left:30px;top:70px;width:540px;${pop(lt, .3)}">
      <div style="background:#fff;border:3px solid #cfe3dc;border-radius:26px;padding:28px 30px;box-shadow:0 16px 40px rgba(15,59,64,.12)">
        <div style="display:flex;align-items:center;gap:12px;font:700 22px Inter;color:${GREEN}"><span style="background:${GREEN};color:#fff;border-radius:20px;padding:6px 16px">Open</span> Pull request #12</div>
        <div style="font:800 36px Inter;color:${TEAL};margin:20px 0 10px">Add new feature</div>
        <div style="font:600 24px 'DejaVu Sans Mono',monospace;color:#5b7c78">feature → main</div>
        <div style="height:2px;background:#e3efea;margin:24px 0"></div>
        <div style="display:flex;align-items:center;gap:14px;font:600 24px Inter;color:#5b7c78">Reviewers
          <span style="width:46px;height:46px;border-radius:50%;background:#ffd84a;display:inline-block;${pop(lt, 2)}"></span>
          <span style="width:46px;height:46px;border-radius:50%;background:#9bd4ff;display:inline-block;margin-left:-22px;${pop(lt, 2.4)}"></span></div>
        <div style="margin-top:22px;font:800 26px Inter;color:${GREEN};opacity:${clamp((lt - 5.2) / .3)}">✓ Approved</div>
        <div style="margin-top:22px;background:${GREEN};color:#fff;font:800 28px Inter;border-radius:16px;height:66px;display:flex;align-items:center;justify-content:center">Merge pull request</div>
      </div></div>`,

  recap: lt => svg(line(40, 300, 560, 300, TEAL, lt / .8, 14) +
    [["Branch", GREEN], ["Commit", BLUE], ["Merge", RED]].map(([w, c], i) =>
      `<g>${station(110 + i * 190, 300, c, (lt - .2 - i * .9) / .4)}<text x="${110 + i * 190}" y="${380}" text-anchor="middle" font-family="Inter" font-weight="800" font-size="34" fill="${c}" opacity="${clamp((lt - .3 - i * .9) / .3)}">${w}</text></g>`).join("")),

  follow: lt => `
    <div class="abs" style="left:40px;top:100px;width:500px;background:#fff;border:3px solid #cfe3dc;border-radius:26px;padding:30px;display:flex;gap:22px;align-items:center;${pop(lt, .2)}">
      <svg width="90" height="90" viewBox="0 0 90 90"><path d="M10 30 H80" stroke="${BLUE}" stroke-width="10" stroke-linecap="round"/><path d="M10 62 H80" stroke="${GREEN}" stroke-width="10" stroke-linecap="round"/><path d="M40 30 C 50 30, 50 62, 62 62" stroke="${RED}" stroke-width="10" fill="none" stroke-linecap="round"/></svg>
      <div><div style="font:800 38px Inter;color:${TEAL}">Up next</div><div style="font:600 26px Inter;color:#5b7c78">Merge conflicts, made easy</div></div></div>
    <div class="abs" style="left:110px;top:380px;width:360px;height:110px;border-radius:55px;background:${TEAL};color:#fff;font:800 46px Inter;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 30px rgba(15,59,64,.25);${pop(lt, 2)}">+ Follow</div>
    <div class="abs sub" style="left:0;right:0;top:520px;color:#5b7c78;${fade(lt, 2.4)}">DevOps, one simple idea at a time</div>`,
};
