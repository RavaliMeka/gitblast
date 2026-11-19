# Build an episode page in the house style (kinetic headline, commit-timeline progress, gesturing presenter).
#   python3 build_house.py <episode-dir>
# The episode dir holds scenes.js (const S = [...]; let END = ...;), props.js (const P = {...}) and house.json:
#   { "title": "...", "meta": "ep.02 · branches", "keys": ["branch", "merge", ...], "accent": "#ff5a1f" }
# The base is 01-git-github/explainer-v2.html. Use tools/presenter-poses.json as the presenter.
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

here = os.path.dirname(os.path.abspath(__file__))
ep = os.path.abspath(sys.argv[1])
cfg = json.load(open(os.path.join(ep, "house.json")))
s = open(os.path.join(here, "..", "01-git-github", "explainer-v2.html")).read()

def cut(a, b, new):
    global s
    i = s.index(a); j = s.index(b, i); s = s[:i] + new + s[j:]

def rep(a, b):
    global s
    if s.count(a) != 1:
        raise SystemExit(f"anchor not found exactly once: {a[:70]!r}")
    s = s.replace(a, b)

cut("const S = [", "\nS.forEach((s, i) => s.end", open(os.path.join(ep, "scenes.js")).read().rstrip("\n"))
cut("/* ---------- Props (right side) ---------- */", "function term(", open(os.path.join(ep, "props.js")).read() + "\n")
rep("<title>Git &amp; GitHub Explainer v2</title>", f"<title>{cfg['title']}</title>")
rep("// ep.01 · git &amp; github", "// " + cfg["meta"])
cut("const KEY = new Set([", "\n", "const KEY = new Set(" + json.dumps(cfg["keys"]) + ");")
if cfg.get("accent", "#ff5a1f") != "#ff5a1f":
    s = s.replace("#ff5a1f", cfg["accent"])

# layout: waist-up presenter bottom-right, visuals a little smaller so they clear his head
rep("#char { left: 590px; top: 1000px; width: 490px; height: 1004px; z-index: 6; overflow: visible; }",
    "#char { left: 240px; top: 1110px; width: 920px; height: 1886px; z-index: 6; overflow: visible; }")
rep("#prop { left: 60px; top: 580px;", "#prop { left: 60px; top: 450px;")
rep("font-weight: 800; font-size: 86px; line-height: 1.12;", "font-weight: 800; font-size: 80px; line-height: 1.12;")
rep("scale(${lerp(1.3, 1.38, sk)", "scale(${fitScale(sc) * lerp(1, 1.03, sk)")
rep("$(\"prop\").style.transform = `translate(${Math.sin(t * .5 + si) * 12 +", "$(\"prop\").style.transform = `translate(${fitScale(sc) * 0 + sc.fitX + Math.sin(t * .5 + si) * 8 +")
rep("function kinetic(t) {", '''// Each scene's visual is measured once and scaled to fit the visual area (960 x 540 px, starting at y 540),
// so nothing ever sits behind the presenter, whose head starts below that area. Narrow visuals are centred.
const FIT = { W: 960, H: 680, MAX: 1.5 };
function fitScale(sc) {
  if (sc.fit) return sc.fit;
  const box = document.createElement("div"); box.style.cssText = "position:absolute;left:0;top:0;width:600px;visibility:hidden";
  $("stage").appendChild(box);
  const k = $("stage").getBoundingClientRect().width / 1080, len = sc.oldLen ?? (sc.end - sc.t);
  let w = 10, h = 10;
  [.35, .7, 1].forEach(f => {
    box.innerHTML = P[sc.prop](len * f - .05); const o = box.getBoundingClientRect();
    box.querySelectorAll("*").forEach(e => {
      if (["svg", "g", "defs", "clipPath", "filter"].includes(e.tagName) || e.closest("defs")) return;
      const r = e.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) { w = Math.max(w, (r.right - o.left) / k); h = Math.max(h, (r.bottom - o.top) / k); }
    });
  });
  box.remove();
  sc.fit = Math.min(FIT.MAX, FIT.W / w, FIT.H / h); sc.fitX = Math.max(0, (FIT.W - w * sc.fit) / 2);
  return sc.fit;
}
function kinetic(t) {''')
# background symbols: no words, and they fade out before the presenter's area
rep('["{ }", "$", "git", "</>", "+", "#", ">_", "✓", "main", "//"]', '["{ }", "$", "+", "</>", "+", "#", ">_", "✓", "*", "//"]')
rep("#bgfx { inset: 0; z-index: 1;", "#bgfx { inset: 0; z-index: 1; -webkit-mask-image: linear-gradient(180deg, #000 0, #000 52%, transparent 60%); mask-image: linear-gradient(180deg, #000 0, #000 52%, transparent 60%);")

rep("width:540px;min-height:300px;", "width:540px;min-height:150px;")   # terminals only as tall as their lines

# captions work before a voice exists: a stand-in timing made from the scene captions
rep('  if (!window.TIMING) return "";\n  const C = window.TIMING.caps;', "  const C = tm().caps;")
rep("if (window.TIMING) window.TIMING.caps.forEach(c => {", "tm().caps.forEach(c => {")
rep("function kinetic(t) {", '''function tm() {
  if (window.TIMING) return window.TIMING;
  if (!window.SYN) {
    const caps = [];
    S.forEach(sc => sc.cap.forEach(([d, text], ci) => {
      const start = sc.t + d + .1, nxt = ci + 1 < sc.cap.length ? sc.t + sc.cap[ci + 1][0] : sc.end, n = text.split(" ").length, dur = Math.max(.3, Math.min(nxt - start - .3, n * .32));
      caps.push({ text, start, end: start + dur, words: text.split(" ").map((_, i) => start + dur * i / n) });
    }));
    window.SYN = { caps, end: END - 1.6 };
  }
  return window.SYN;
}
function kinetic(t) {''')

# presenter: aligned pose pictures; calm poses talk, lively ones are short accents that settle into a calm pose
rep("function avatarSvg(t, talking) {", '''const REST = "__REST__";   // the normal talking pose: "stand" (hands down) unless house.json says "rest": "cross"
const POSE_MAP = {   // scene pose -> [accent picture or null, seconds, picture to settle into]
  // the default is the master pose (arms crossed): it has its own closed, small, round and wide mouths and a blink
  present: [null, 0, REST], idle: [null, 0, REST], cross: [null, 0, "cross"], stand: [null, 0, "stand"], both: [null, 0, "both"],
  point: [null, 0, "point1"], thumb: [null, 0, "thumb"], shrug: [null, 0, "shrug"], peace: [null, 0, "peace"],
  cheer: ["cheer", 3, REST], idea: ["idea", 1.6, REST], think: ["think", 1.8, REST],
};
function avatarPose(t, talking, A) {
  let st = 0, name = "idle";
  S.forEach(s => s.pose.forEach(([d, n]) => { if (s.t + d <= t) { st = s.t + d; name = n; } }));
  const [accent, secs, rest] = POSE_MAP[name] || POSE_MAP.idle, since = t - st;
  const showAccent = accent && since < secs, pic = showAccent ? accent : rest;
  const tick = Math.floor(t * 12), sp = speech(tick / 12, talking), open = sp.open;
  const has = k => A[k] && A[k][pic];
  const blink = (t + 1.3) % 3.9 < .13;
  let src = A.poseImg[pic];
  if (!showAccent) {
    const round = sp.wide < .3 || (tick * 7919) % 7 === 0;            // rounded vowels, plus a little variety
    if (open > .32) src = open > .8 && has("poseWide") ? A.poseWide[pic] : round && has("poseRound") ? A.poseRound[pic]
      : blink && has("poseBlinkTalk") ? A.poseBlinkTalk[pic] : A.poseTalk[pic] || src;
    else if (blink && has("poseBlink")) src = A.poseBlink[pic];
  }
  const change = showAccent ? since : accent ? since - secs : since;          // time since the picture last changed
  const pop = 1 + (change >= 0 && change < .28 ? Math.sin(Math.PI * change / .28) * .03 : 0);
  return `<g transform="translate(200 400) scale(${pop}) translate(-200 -400) translate(0 ${Math.sin(t * 2.2) * 2})"><image href="${src}" x="0" y="0" width="400" height="400"/></g>`;
}
function avatarSvg(t, talking) {
  if (window.AVATAR.poseImg) return avatarPose(t, talking, window.AVATAR);''')

# the sound bars follow the estimated speech until a voice recording is attached
rep("(window.VOICE.env[Math.floor(t * window.VOICE.fps)] || 0) : 0;\n    $(\"eq\")", "(window.VOICE.env[Math.floor(t * window.VOICE.fps)] || 0) : speech(t, true).open;\n    $(\"eq\")")
# --- motion: masked word reveal. Each headline word rises from behind a mask instead of fading in.
rep("const style = `opacity:${k};transform:translateY(${(1 - easeOut(k)) * 14}px)`;", "const style = ``, rise = `transform:translateY(${(1 - easeOut(clamp((t - (st - .06)) / .26))) * 105}%)`;")
rep('<span style="position:relative">${tk}</span></span>`;', '<span class="m"><span style="${rise}">${tk}</span></span></span>`;')
rep("#kin .w { display: inline-block; margin-right: .24em; position: relative; }",
    "#kin .w { display: inline-block; margin-right: .24em; position: relative; }\n  #kin .m { display: inline-block; overflow: hidden; vertical-align: bottom; position: relative; padding: .06em .04em .1em; margin: -.06em -.04em -.1em; }\n  #kin .m > span { display: inline-block; }")
rep("transform:scale(${1 + .4 * (1 - easeOut((t - st) / .22))})", "transform:scale(${1 + .14 * (1 - easeOut((t - st) / .22))})")   # gentler chip pop, stays inside the margin
# --- motion: one directional wipe per chapter change (scenes that carry a step number), across the visual area only
rep('$("wipe").innerHTML = "";', '''{ const ch = S.find(x => x.step && x.t > 0 && t > x.t - .22 && t < x.t + .5), p = ch ? (t - (ch.t - .22)) / .72 : -1;
    const e = p < 0 ? 0 : p < .5 ? 2 * p * p : 1 - 2 * (1 - p) * (1 - p);     // ease in-out
    $("wipe").innerHTML = ch ? `<div style="left:${-560 + e * 1700}px;top:400px;bottom:auto;height:760px;width:420px;transform:skewX(-14deg);background:ACCENT;border-radius:40px"></div><div style="left:${-760 + e * 1700}px;top:400px;bottom:auto;height:760px;width:120px;transform:skewX(-14deg);background:#151515;border-radius:30px"></div>` : ""; }''')
rep("#wipe { inset: 0; z-index: 7;", "#wipe { inset: 0; z-index: 5;")
# the incoming visual of a chapter appears as the wipe passes over it
rep("function kinetic(t) {", "const CHAPTER_IN = .14;\nfunction kinetic(t) {")
# titles written for older themes use colour names the house page does not know
rep("color:${COL[c][0]};--mark:${COL[c][1]}", "color:${(COL[c] || COL.blue)[0]};--mark:${(COL[c] || COL.blue)[1]}")
# series art: badge beside the episode label, themed background shapes, a strip along the bottom edge
if cfg.get("series"):
    from series_art import ART
    art = ART[cfg["series"]]; acc = cfg.get("accent", "#ff5a1f"); col = lambda x: x.replace("ACC", acc)
    rep("// " + cfg["meta"], '<span style="display:inline-flex;align-items:center;gap:14px"><span style="font-size:60px;margin:-18px 0">' + col(art["badge"]) + '</span>' + cfg["meta"] + '</span>')
    if art["shapes"]:
        rep('["{ }", "$", "+", "</>", "+", "#", ">_", "✓", "*", "//"]', json.dumps([col(x) for x in art["shapes"]] * 2))
        rep("#bgfx span { position: absolute; opacity: .06; }", "#bgfx span { position: absolute; opacity: .13; }")
        # themed shapes stay clear of the headline: they only show in the visual area
        s = s.replace("linear-gradient(180deg, #000 0, #000 52%, transparent 60%)", "linear-gradient(180deg, transparent 0, transparent 19%, #000 23%, #000 52%, transparent 60%)")
    if art["strip"]:
        rep('<div id="eq" class="abs"></div>', '<div id="eq" class="abs"></div>\n  <div class="abs" style="left:0;bottom:0;z-index:2;opacity:.2">' + col(art["strip"]) + '</div>')
# series look: paper colour, grid dots, and any SVG filters the episode's visuals refer to
if cfg.get("bg"): s = s.replace("transparent 70%), #f3f1ea !important", f"transparent 70%), {cfg['bg']} !important")
if cfg.get("bg"): rep("--bg: #fbf3e4; --grid: #ead9bd;", f"--bg: {cfg['bg']}; --grid: {cfg.get('grid', '#ead9bd')};")
if cfg.get("defs"): s = s.replace('<div id="eq" class="abs"></div>', '<div id="eq" class="abs"></div>\n  ' + "\n  ".join(cfg["defs"]), 1)
# --- type: display face for the headline, italic serif for the emphasised word, a proper coding face for commands
import base64
def face(name, file, weight, style="normal"):
    d = base64.b64encode(open(os.path.join(here, "fonts", file), "rb").read()).decode()
    return f'@font-face {{ font-family: "{name}"; font-weight: {weight}; font-style: {style}; src: url(data:font/woff2;base64,{d}) format("woff2"); }}'
s = s.replace("DejaVu Sans Mono", "JetBrains Mono")
rep("#kin { left: 60px; right: 60px; top: 190px; height: 330px;", '#kin { font-family: "Bricolage Grotesque", Inter, sans-serif; left: 60px; right: 60px; top: 190px; height: 330px;')
rep('#kin .w:has(.box) { color: #fff; font-family: "JetBrains Mono", monospace; font-size: .82em; letter-spacing: -2px; margin: 0 .36em 0 .14em; }',
    '#kin .w:has(.box) { color: #fff; font-family: "Instrument Serif", Georgia, serif; font-style: italic; font-weight: 400; font-size: 1.1em; line-height: 1; letter-spacing: -1px; margin: 0 .34em 0 .16em; }')
rep("  * { box-sizing: border-box;", "  " + "\n  ".join([face("Bricolage Grotesque", "bricolage-grotesque-latin-800-normal.woff2", 800), face("Instrument Serif", "instrument-serif-latin-400-italic.woff2", 400, "italic"),
    face("JetBrains Mono", "jetbrains-mono-latin-500-normal.woff2", 500), face("JetBrains Mono", "jetbrains-mono-latin-700-normal.woff2", 700)]) + "\n  * { box-sizing: border-box;")
s = s.replace("__REST__", cfg.get("rest", "stand"))
s = s.replace("background:ACCENT;", "background:" + cfg.get("accent", "#ff5a1f") + ";")
open(os.path.join(ep, "explainer.html"), "w").write(s)
print("built", os.path.join(ep, "explainer.html"))
