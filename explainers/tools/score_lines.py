# Score each script line in two takes: clarity (recognizer confidence), pace, level -> choose the better take per line
import json, sys, wave, re
import numpy as np
from pocketsphinx import Decoder
sys.path.insert(0, sys.argv[1])
LINES = json.load(open(sys.argv[2]))
takes = {"A": ("a16.wav", "align-a.json"), "B": ("b16.wav", "align-b.json")}
PRON = {"git": "G IH T", "github": "G IH T HH AH B", "init": "IH N IH T", "teamwork": "T IY M W ER K",
        "instagram": "IH N S T AH G R AE M", "backup": "B AE K AH P", "repository": "R IH P AA Z AH T AO R IY"}

def pcm(f):
    w = wave.open(f, "rb"); return np.frombuffer(w.readframes(w.getnframes()), dtype="<i2")

def line_spans(al):
    words = al["words"]; spans = {}
    for w in words:
        s = spans.setdefault(w["line"], [w["a"], w["b"]]); s[1] = max(s[1], w["b"])
    return spans

res = {}
for k, (wavf, alf) in takes.items():
    x = pcm(wavf); al = json.load(open(alf)); sp = line_spans(al); out = []
    for i, text in enumerate(LINES):
        a, b = sp[i]; seg = x[int(max(0, a - .1) * 16000): int((b + .1) * 16000)]
        # free recognition of the line; count script words recognised
        d = Decoder(samprate=16000)
        d.start_utt(); d.process_raw(seg.tobytes(), full_utt=True); d.end_utt()
        hyp = (d.hyp().hypstr if d.hyp() else "").lower().split()
        want = re.sub(r"[^a-z' ]", " ", text.lower()).split()
        hit = sum(1 for w in want if w in hyp) / len(want)
        # forced alignment confidence per frame
        d2 = Decoder(samprate=16000)
        for w, p in PRON.items():
            if d2.lookup_word(w) is None: d2.add_word(w, p, True)
        d2.set_align_text(" ".join(want))
        d2.start_utt(); d2.process_raw(seg.tobytes(), full_utt=True); d2.end_utt()
        segs = [s for s in d2.seg() if s.word not in ("<s>", "</s>", "<sil>")]
        frames = sum(s.end_frame - s.start_frame + 1 for s in segs) or 1
        ascore = sum(s.ascore for s in segs) / frames
        rms = 20 * np.log10(np.sqrt((seg.astype(float) ** 2).mean()) + 1e-9)
        rate = len(want) / max(.1, b - a)
        out.append({"start": a, "end": b, "hit": round(hit, 2), "ascore": round(ascore, 1), "rms": round(rms, 1), "wps": round(rate, 2)})
    res[k] = out
choice = []
for i, text in enumerate(LINES):
    A, B = res["A"][i], res["B"][i]
    # clarity first (recognised words), then alignment confidence; penalise rushed delivery (> 3.6 words/s)
    def q(r): return r["hit"] * 2 + r["ascore"] / 2000 - max(0, r["wps"] - 3.6) * .3
    c = "A" if q(A) >= q(B) else "B"; choice.append(c)
    print(f"{i:2d} {c}  A hit {A['hit']:.2f} as {A['ascore']:7.1f} {A['wps']:.1f}w/s | B hit {B['hit']:.2f} as {B['ascore']:7.1f} {B['wps']:.1f}w/s  {text}")
json.dump({"scores": res, "choice": choice}, open("choice.json", "w"))
print("A lines:", choice.count("A"), "B lines:", choice.count("B"))
