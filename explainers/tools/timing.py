# Build timing.json: when each on-screen caption (and each of its words) starts, from the forced alignment
import json, re, sys
al = json.load(open(sys.argv[1]))
W = al["words"]
norm = lambda s: re.sub(r"\(\d+\)$", "", s).lower()

# captions in screen order: (script line index, display text, first spoken word of the caption within that line)
CAPS = [
 (0, "Git and GitHub...", None), (1, "are they the same thing?", None), (2, "Let's clear it up in 60 seconds.", None),
 (3, "Like a save point in a game,", None), (4, "Git saves every version", None), (4, "of your code.", "of"),
 (5, "Broke something? No stress.", None), (6, "Just go back to an older version.", None),
 (7, "Git lives on your laptop.", None), (8, "It doesn't even need internet.", None),
 (9, "GitHub is an online", None), (9, "home for your code.", "home"), (10, "Backup, share, teamwork.", None),
 (11, "Git is the camera,", None), (12, "GitHub is Instagram.", None),
 (13, "Step 1: make a folder,", None), (14, "then run git init.", None),
 (15, "git add picks your files,", None), (16, "commit makes save point #1!", None),
 (17, "On GitHub, hit New repository,", None), (18, "and give it the same name.", None),
 (19, "Add the remote,", None), (20, "run git push...", None), (21, "and your code is live!", None),
 (22, "init, add, commit, push.", None), (23, "That's all you need to start.", None),
 (24, "Next up: Branches.", None), (25, "If this helped,", None), (26, "follow along for more.", None),
]
by_line = {}
for w in W:
    by_line.setdefault(w["line"], []).append(w)

out = []
for li, text, first in CAPS:
    ws = by_line[li]
    if first:  # caption starts mid-line
        k = next(i for i, w in enumerate(ws) if norm(w["w"]) == first)
        ws = ws[k:]
    elif any(c[0] == li and c[2] for c in CAPS):  # first half of a split line: stop before the split word
        split = next(c[2] for c in CAPS if c[0] == li and c[2])
        k = next(i for i, w in enumerate(ws) if norm(w["w"]) == split)
        ws = ws[:k]
    start, end = ws[0]["a"], ws[-1]["b"]
    toks = text.split()
    # word highlight times: match display tokens to spoken words in order, interpolate the rest
    spoken = [(re.sub(r"[^a-z']", "", norm(w["w"])), w["a"]) for w in ws]
    times, j = [], 0
    for t in toks:
        key = re.sub(r"[^a-z']", "", t.lower())
        hit = next((m for m in range(j, len(spoken)) if spoken[m][0] == key), None)
        if hit is not None:
            times.append(spoken[hit][1]); j = hit + 1
        else:
            times.append(None)
    # fill gaps by interpolation between known times
    known = [(i, x) for i, x in enumerate(times) if x is not None]
    for i in range(len(times)):
        if times[i] is None:
            prev = max((k for k in known if k[0] < i), default=(-1, start), key=lambda k: k[0])
            nxt = min((k for k in known if k[0] > i), default=(len(times), end), key=lambda k: k[0])
            times[i] = prev[1] + (nxt[1] - prev[1]) * (i - prev[0]) / max(1, nxt[0] - prev[0])
    out.append({"text": text, "start": round(start, 2), "end": round(end, 2), "words": [round(x, 2) for x in times]})
    print(f"{start:6.2f} {end:6.2f}  {text}")
json.dump({"caps": out, "end": round(W[-1]["b"], 2)}, open(sys.argv[2], "w"), indent=0)
