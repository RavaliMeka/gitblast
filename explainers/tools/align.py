import sys, wave, json, re
from pocketsphinx import Decoder
LINES = ["Git and GitHub", "are they the same thing", "Let's clear it up in sixty seconds",
 "Like a save point in a game", "Git saves every version of your code",
 "Broke something No stress", "Just go back to an older version",
 "Git lives on your laptop", "It doesn't even need internet",
 "GitHub is an online home for your code", "Backup Share Teamwork",
 "Git is the camera", "GitHub is Instagram",
 "Step one make a folder", "then run git init",
 "git add picks your files", "commit makes save point number one",
 "On GitHub hit New repository", "and give it the same name",
 "Add the remote", "run git push", "and your code is live",
 "Init Add Commit Push", "That's all you need to start",
 "Next up Branches", "If this helped", "follow along for more"]
PRON = {"git": "G IH T", "github": "G IH T HH AH B", "init": "IH N IH T", "teamwork": "T IY M W ER K",
        "instagram": "IH N S T AH G R AE M", "backup": "B AE K AH P", "repository": "R IH P AA Z AH T AO R IY"}
d = Decoder(samprate=16000)
for w, p in PRON.items():
    if d.lookup_word(w) is None: d.add_word(w, p, True)
words, line_of = [], []
for i, l in enumerate(LINES):
    for w in re.sub(r"[^a-z' ]", " ", l.lower()).split():
        words.append(w); line_of.append(i)
for w in set(words):
    if d.lookup_word(w) is None: print("missing", w)
d.set_align_text(" ".join(words))
wv = wave.open(sys.argv[1], 'rb'); data = wv.readframes(wv.getnframes())
d.start_utt(); d.process_raw(data, full_utt=True); d.end_utt()
segs = [(s.word, s.start_frame / 100, s.end_frame / 100) for s in d.seg()]
segs = [s for s in segs if s[0] not in ("<s>", "</s>", "<sil>")]
print(len(segs), "aligned words of", len(words))
out = []; k = 0
for w, a, b in segs:
    out.append({"w": w, "a": a, "b": b, "line": line_of[k] if k < len(line_of) else None}); k += 1
starts = {}
for o in out:
    if o["line"] is not None and o["line"] not in starts: starts[o["line"]] = o["a"]
for i, l in enumerate(LINES): print(i, starts.get(i), l)
json.dump({"words": out, "starts": starts, "end": out[-1]["b"] if out else 0}, open(sys.argv[2], "w"))
