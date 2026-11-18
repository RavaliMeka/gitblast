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
    "#char { left: 280px; top: 1110px; width: 840px; height: 1722px; z-index: 6; overflow: visible; }")
rep("#prop { left: 60px; top: 580px;", "#prop { left: 60px; top: 540px;")
rep("scale(${lerp(1.3, 1.38, sk)", "scale(${lerp(1.24, 1.3, sk)")

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
rep("function avatarSvg(t, talking) {", '''const POSE_MAP = {   // scene pose -> [accent picture or null, seconds, picture to settle into]
  present: [null, 0, "point1"], point: ["point", 1.5, "point1"], idea: ["idea", 1.6, "cross"], think: ["think", 1.8, "cross"],
  cheer: ["cheer", 2.4, "thumb"], cross: [null, 0, "cross"], thumb: [null, 0, "thumb"], shrug: [null, 0, "shrug"], peace: [null, 0, "peace"], idle: [null, 0, "cross"],
};
function avatarPose(t, talking, A) {
  let st = 0, name = "idle";
  S.forEach(s => s.pose.forEach(([d, n]) => { if (s.t + d <= t) { st = s.t + d; name = n; } }));
  const [accent, secs, rest] = POSE_MAP[name] || POSE_MAP.idle, since = t - st;
  const showAccent = accent && since < secs, pic = showAccent ? accent : rest;
  const tq = Math.floor(t * 12) / 12, open = speech(tq, talking).open;
  const src = !showAccent && open > .32 && A.poseTalk[pic] ? A.poseTalk[pic] : A.poseImg[pic];
  const change = showAccent ? since : accent ? since - secs : since;          // time since the picture last changed
  const pop = 1 + (change >= 0 && change < .28 ? Math.sin(Math.PI * change / .28) * .03 : 0);
  return `<g transform="translate(200 400) scale(${pop}) translate(-200 -400) translate(0 ${Math.sin(t * 2.2) * 2})"><image href="${src}" x="0" y="0" width="400" height="400"/></g>`;
}
function avatarSvg(t, talking) {
  if (window.AVATAR.poseImg) return avatarPose(t, talking, window.AVATAR);''')

open(os.path.join(ep, "explainer.html"), "w").write(s)
print("built", os.path.join(ep, "explainer.html"))
