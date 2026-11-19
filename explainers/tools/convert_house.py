# Move an older themed episode into the house style.
#   python3 convert_house.py <episode-dir> [scenes.js props.js]
# Writes house.json (series colours, key words), freshens the poses in scenes.js, copies the presenter and builds.
import json, os, re, shutil, subprocess, sys

here = os.path.dirname(os.path.abspath(__file__))
ep = os.path.abspath(sys.argv[1]); name = os.path.basename(ep); num = int(name[:2])
if len(sys.argv) > 3:
    shutil.copy(sys.argv[2], os.path.join(ep, "scenes.js")); shutil.copy(sys.argv[3], os.path.join(ep, "props.js"))

SERIES = [  # first episode, label, accent, paper, grid dots
    (17, "terraform", "#7b42bc", "#f1e9fb", "#e3d8f1"),
    (13, "ci/cd", "#0f9d58", "#e6f5ea", "#d5e9da"),
    (9, "kubernetes", "#3d5afe", "#e8ecfd", "#d9def5"),
    (5, "docker", "#0b84e3", "#e3f1fc", "#d3e4f1"),
    (1, "git", "#ff5a1f", "#f3f1ea", "#ead9bd"),
]
first, label, accent, bg, grid = next(s for s in SERIES if num >= s[0])

sc_path = os.path.join(ep, "scenes.js"); sc = open(sc_path).read()
if not os.path.exists(sc_path + ".orig"): open(sc_path + ".orig", "w").write(sc)
sc = open(sc_path + ".orig").read()
# poses: stand is the normal one; every second pointing scene uses both hands; the goodbye is a peace sign
n = [0]
def both(m):
    n[0] += 1; return '[0,"both"]' if n[0] % 2 == 0 else m.group(0)
sc = re.sub(r'\[0,\s*"point"\]', both, sc)
last = sc.rfind("pose: [[")
sc = sc[:last] + re.sub(r'pose: \[\[0,\s*"\w+"\]', 'pose: [[0,"peace"]', sc[last:], count=1)
open(sc_path, "w").write(sc)

old = open(os.path.join(ep, "explainer.html")).read() if os.path.exists(os.path.join(ep, "explainer.html")) else ""
if os.path.exists(os.path.join(ep, "house.json")):
    cfg = json.load(open(os.path.join(ep, "house.json")))
else:
    m = re.search(r"<title>(.*?)</title>", old)
    keys = sorted({w.lower() for t in re.findall(r"<hl[^>]*>(.*?)</hl>", sc) for w in re.findall(r"[A-Za-z][A-Za-z0-9']+", t)})
    cfg = {"title": m.group(1) if m else name, "meta": "ep.%02d · %s" % (num, name[3:].replace("-", " ")), "keys": keys,
           "defs": re.findall(r'<svg width="0" height="0".*?</svg>', old, re.S)}   # filters and patterns the visuals use
cfg.update({"series": label, "accent": accent, "bg": bg, "grid": grid, "rest": "stand"})
json.dump(cfg, open(os.path.join(ep, "house.json"), "w"), indent=2, ensure_ascii=False)
shutil.copy(os.path.join(here, "presenter-poses.json"), os.path.join(ep, "presenter.json"))
subprocess.check_call([sys.executable, os.path.join(here, "build_house.py"), ep])
