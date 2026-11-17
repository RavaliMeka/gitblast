# Cut the presenter frames out of their grey background -> presenter-blend.json
import json, base64, io, sys
from collections import deque
from PIL import Image, ImageFilter
import numpy as np

src, out = sys.argv[1], sys.argv[2]
d = json.load(open(src))

def load(uri):
    return Image.open(io.BytesIO(base64.b64decode(uri.split(",", 1)[1]))).convert("RGB")

def mask_for(im, fade_bottom=.14, side=.12):
    a = np.asarray(im).astype(float); H, W, _ = a.shape
    corners = np.concatenate([a[:6, :6].reshape(-1, 3), a[:6, -6:].reshape(-1, 3)])
    bg = corners.mean(0)
    dist = np.sqrt(((a - bg) ** 2).sum(2))
    cand = dist < 26
    seen = np.zeros((H, W), bool); q = deque()
    for x in range(W):
        for y in (0,):
            if cand[y, x]: seen[y, x] = 1; q.append((y, x))
    for y in range(H):
        for x in (0, W - 1):
            if cand[y, x] and not seen[y, x]: seen[y, x] = 1; q.append((y, x))
    while q:
        y, x = q.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < H and 0 <= nx < W and cand[ny, nx] and not seen[ny, nx]:
                seen[ny, nx] = 1; q.append((ny, nx))
    alpha = np.where(seen, 0, 255).astype(np.uint8)
    # soft edge: grow slightly, then feather; keep partial alpha where colour is close to the background
    A = Image.fromarray(alpha).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.2))
    al = np.asarray(A).astype(float) / 255
    edge = (al > 0) & (al < 1)
    al[edge] = np.minimum(al[edge], np.clip((dist[edge] - 6) / 30, 0, 1) * .5 + al[edge] * .5)
    # fade the bottom of the hoodie into the page
    yy = np.arange(H)[:, None] / H
    al *= np.clip((1 - yy) / fade_bottom, 0, 1)
    xx = np.arange(W)[None, :] / W
    al *= np.clip(np.minimum(xx, 1 - xx) / side, 0, 1) ** 1.5   # soften the picture's side edges
    return al

def cut(im, al):
    rgba = np.dstack([np.asarray(im), (al * 255).astype(np.uint8)])
    b = io.BytesIO(); Image.fromarray(rgba, "RGBA").save(b, "WEBP", quality=90)
    return "data:image/webp;base64," + base64.b64encode(b.getvalue()).decode()

base = load(d["closed"]); al = mask_for(base)
o = {"cutout": True}
for k in ["closed", "mid", "ee", "blink"]:
    if k in d: o[k] = cut(load(d[k]), al)          # frames are aligned: one mask for all
if "cuts" in d:
    o["cuts"] = {}
    for k, u in d["cuts"].items():
        im = load(u); o["cuts"][k] = cut(im, mask_for(im, .1, .3))
json.dump(o, open(out, "w"))
Image.fromarray((al * 255).astype(np.uint8)).save(out.replace(".json", "-mask.png"))
print("ok", round(len(json.dumps(o)) / 1e6, 2), "MB")
