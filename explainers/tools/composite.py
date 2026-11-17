# Build one voice track from the better take of each line, keeping take A's pacing between lines
import json, sys, wave
import numpy as np
SR = 48000
choice = json.loads(sys.argv[1])          # {"1": "B", ...}; default A
def load(f):
    w = wave.open(f, "rb"); return np.frombuffer(w.readframes(w.getnframes()), dtype="<i2").astype(float)
X = {"A": load("a.wav"), "B": load("b.wav")}            # 48 kHz mono
AL = {"A": json.load(open("align-a.json")), "B": json.load(open("align-b.json"))}
def spans(al):
    sp = {}
    for w in al["words"]:
        s = sp.setdefault(w["line"], [w["a"], w["b"]]); s[1] = max(s[1], w["b"])
    return sp
SP = {k: spans(v) for k, v in AL.items()}
rmsA = []
n = len(SP["A"])
pieces = []; t = SP["A"][0][0] - .08                      # keep A's lead-in
pieces.append(np.zeros(int(t * SR)))
for i in range(n):
    k = choice.get(str(i), "A"); a, b = SP[k][i]
    clip = X[k][int((a - .08) * SR): int((b + .14) * SR)].copy()
    ref = X["A"][int(SP["A"][i][0] * SR): int(SP["A"][i][1] * SR)]
    if k != "A":   # match loudness of the swapped line to take A's version of it
        g = np.sqrt((ref ** 2).mean()) / max(1e-9, np.sqrt((X[k][int(a * SR): int(b * SR)] ** 2).mean()))
        clip *= g
    f = int(.015 * SR); clip[:f] *= np.linspace(0, 1, f); clip[-f:] *= np.linspace(1, 0, f)
    pieces.append(clip)
    if i + 1 < n:   # take A's natural gap to the next line
        gap = max(.22, SP["A"][i + 1][0] - SP["A"][i][1] - .22)
        pieces.append(np.zeros(int(gap * SR)))
pieces.append(np.zeros(int(.6 * SR)))
y = np.concatenate(pieces); y = np.clip(y, -32768, 32767)
w = wave.open("comp.wav", "wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(y.astype("<i2").tobytes()); w.close()
print("ok", round(len(y) / SR, 2), "s")
