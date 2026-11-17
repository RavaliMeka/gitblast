# Build an episode page from the Episode 1 base: its scenes, its visuals and its theme.
#   python3 build_episode.py <episode-dir>
# The episode dir holds scenes.js (const S = [...]; let END = ...;), props.js (const P = {...}) and theme.py.
# theme.py defines THEME = {"title": ..., "replace": [(old, new), ...]} applied on top of BASE_THEME below.
import os, sys, runpy

here = os.path.dirname(os.path.abspath(__file__))
ep = os.path.abspath(sys.argv[1])
base_path = os.path.join(here, "..", "01-git-github", "explainer.html")
s = open(base_path).read()

def cut(a, b, new):
    global s
    i = s.index(a); j = s.index(b, i); s = s[:i] + new + s[j:]

def rep(a, b):
    global s
    if s.count(a) != 1:
        raise SystemExit(f"theme anchor not found exactly once: {a[:70]!r}")
    s = s.replace(a, b)

cut("const S = [", "\nS.forEach((s, i) => s.end", open(os.path.join(ep, "scenes.js")).read().rstrip("\n"))
cut("/* ---------- Props (right side) ---------- */", "function term(", open(os.path.join(ep, "props.js")).read() + "\n")
theme = runpy.run_path(os.path.join(ep, "theme.py"))["THEME"]
rep("<title>Git &amp; GitHub Explainer</title>", f"<title>{theme['title']}</title>")
rep("[1, 2, 3, 4].map(n =>", "[1, 2, 3].map(n =>")
for a, b in theme["replace"]:
    rep(a, b)
open(os.path.join(ep, "explainer.html"), "w").write(s)
print("built", os.path.join(ep, "explainer.html"))
