# Original music bed + sound effects, synthesised (no third-party audio) -> music.wav, sfx.wav
import json, sys, wave
import numpy as np
T = json.load(open(sys.argv[1])); outdir = sys.argv[2]
SR = 48000; DUR = T["end"] + 2.2
n = int(SR * DUR); t = np.arange(n) / SR
rng = np.random.default_rng(7)

def lowpass(x, fc):
    # one-pole, run twice
    a = np.exp(-2 * np.pi * fc / SR); y = np.empty_like(x)
    for _ in range(2):
        acc = 0.0
        for i in range(len(x)):
            acc = (1 - a) * x[i] + a * acc; y[i] = acc
        x = y.copy()
    return y

# ---- music: warm pad + soft bell arpeggio, C - Am - F - G, 2.6 s per chord
hz = lambda m: 440 * 2 ** ((m - 69) / 12)
CH = [[48, 55, 60, 64], [45, 52, 57, 60], [41, 48, 53, 57], [43, 50, 55, 59]]
seg = 2.6
pad = np.zeros(n); arp = np.zeros(n)
for k in range(int(DUR / seg) + 1):
    s0 = int(k * seg * SR); s1 = min(n, int((k + 1) * seg * SR) + int(.6 * SR))
    if s0 >= n: break
    tt = np.arange(s1 - s0) / SR
    env = np.minimum(1, tt / .5) * np.exp(-np.maximum(0, tt - seg) * 5)
    for m in CH[k % 4]:
        f = hz(m)
        for det in (-0.12, 0.12):
            ph = 2 * np.pi * f * (1 + det / 100) * tt
            pad[s0:s1] += env * (np.sin(ph) + .25 * np.sin(2 * ph) + .08 * np.sin(3 * ph)) * .06
    # arpeggio: 8th notes, up the chord an octave higher, soft bell
    notes = CH[k % 4][1:] + [CH[k % 4][1] + 12]
    for j in range(8):
        a0 = s0 + int(j * seg / 8 * SR)
        if a0 >= n: break
        L = min(n - a0, int(.9 * SR)); tt2 = np.arange(L) / SR
        f = hz(notes[j % 4] + 12)
        bell = (np.sin(2 * np.pi * f * tt2) + .3 * np.sin(2 * np.pi * 2.01 * f * tt2)) * np.exp(-tt2 * 5.5) * np.minimum(1, tt2 / .005)
        arp[a0:a0 + L] += bell * (.05 if j % 2 == 0 else .035)
sub = np.zeros(n)
for k in range(int(DUR / seg) + 1):
    s0 = int(k * seg * SR)
    if s0 >= n: break
    L = min(n - s0, int(seg * SR)); tt = np.arange(L) / SR
    sub[s0:s0 + L] += np.sin(2 * np.pi * hz(CH[k % 4][0] - 12) * tt) * np.minimum(1, tt / .05) * np.exp(-tt * .8) * .12
music = pad + arp + sub
# fade in/out
fade = np.minimum(1, t / 1.5) * np.minimum(1, (DUR - t) / 2.0)
music *= fade
music /= np.abs(music).max() + 1e-9

# ---- sfx
sfx = np.zeros(n)
def add(at, x):
    a = int(at * SR)
    if a >= n: return
    L = min(len(x), n - a); sfx[a:a + L] += x[:L]
def whoosh(d=.42):
    L = int(d * SR); tt = np.arange(L) / SR
    noise = rng.standard_normal(L)
    # sweep a band by mixing two low-passed versions
    lo = lowpass(noise, 900); hi = noise - lowpass(noise, 2500)
    mix = lo * (1 - tt / d) + hi * (tt / d) * .5
    env = np.sin(np.pi * np.minimum(1, tt / d)) ** 2
    return mix * env * .22
def pop():
    L = int(.12 * SR); tt = np.arange(L) / SR
    f = 520 + 700 * np.exp(-tt * 45)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 38) * .28
def chime():
    L = int(1.6 * SR); tt = np.arange(L) / SR; x = np.zeros(L)
    for i, m in enumerate([84, 88, 91, 96]):
        d0 = int(i * .07 * SR); tt2 = tt[:L - d0]
        x[d0:] += np.sin(2 * np.pi * hz(m) * tt2) * np.exp(-tt2 * 3.2) * .14
    return x

caps = T["caps"]
# optional: score.py timing.json outdir "scene first captions" "chapter captions" "chime caption text"
# a soft pop on every new scene, a whoosh only on chapter changes, one chime on the win line
scene_first = [int(v) for v in sys.argv[3].split(",")] if len(sys.argv) > 3 else [0, 3, 6, 8, 10, 13, 15, 17, 19, 21, 24, 26]
chapters = [int(v) for v in sys.argv[4].split(",")] if len(sys.argv) > 4 else scene_first[1:]
win = sys.argv[5] if len(sys.argv) > 5 else "and your code is live"
for i in scene_first[1:]:
    st = caps[i]["start"] - .3
    add(st + .05, pop() * (.6 if i not in chapters else 1))
for i in chapters:
    add(caps[i]["start"] - .3 - .32, whoosh())
live = next(c for c in caps if c["text"].lower().startswith(win.lower()))
add(live["start"] + .05, chime())

def save(name, x):
    x = np.clip(x, -1, 1); w = wave.open(f"{outdir}/{name}", "wb")
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x * 32767).astype("<i2").tobytes()); w.close()
save("music.wav", music * .9); save("sfx.wav", sfx)
print("ok", round(DUR, 2))
