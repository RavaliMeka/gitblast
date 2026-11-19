# Build an episode page in the house style (kinetic headline, commit-timeline progress, gesturing presenter).
#   python3 build_house.py <episode-dir>
# The episode dir holds scenes.js (const S = [...]; let END = ...;), props.js (const P = {...}) and house.json:
#   { "title": "...", "meta": "ep.02 · branches", "keys": ["branch", "merge", ...], "accent": "#ff5a1f" }
# The base is 01-git-github/explainer-v2.html. Use tools/presenter-poses.json as the presenter.
import json, os, sys

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

s = s.replace("__REST__", cfg.get("rest", "stand"))
open(os.path.join(ep, "explainer.html"), "w").write(s)
print("built", os.path.join(ep, "explainer.html"))
