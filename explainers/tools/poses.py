# Cut pose pictures out of their grey background and line them up, so the presenter can switch gestures.
#   python3 poses.py <presenter.json> <out.json> name=path [name=path ...]
# Each pose is scaled and shifted so the head has the same size and position in every picture
# (measured from the glasses: the darkest wide band across the face), then placed on a 1200x1200 canvas.
import base64, io, json, sys
from collections import deque
from PIL import Image, ImageFilter
import numpy as np

SIZE, HEAD_W, HEAD_CX, HEAD_TOP = 1200, 330, 600, 150   # target head width / centre / top of hair on the canvas

def alpha_of(im, close=0):
    a = np.asarray(im.convert("RGB")).astype(float); H, W, _ = a.shape
    bg = np.concatenate([a[:8, :8].reshape(-1, 3), a[:8, -8:].reshape(-1, 3)]).mean(0)
    dist = np.sqrt(((a - bg) ** 2).sum(2)); cand = dist < 24
    seen = np.zeros((H, W), bool); q = deque()
    for x in range(W):
        if cand[0, x]: seen[0, x] = 1; q.append((0, x))
    for y in range(H):
        for x in (0, W - 1):
            if cand[y, x] and not seen[y, x]: seen[y, x] = 1; q.append((y, x))
    while q:
        y, x = q.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < H and 0 <= nx < W and cand[ny, nx] and not seen[ny, nx]:
                seen[ny, nx] = 1; q.append((ny, nx))
    al = np.where(seen, 0, 255).astype(np.uint8)
    # keep only the figure: the largest connected opaque region (drops watermarks and stray specks)
    fg = al > 0; lab = np.zeros((H, W), int); best, n = 0, 0
    for sy, sx in zip(*np.where(fg[::8, ::8])):
        sy, sx = sy * 8, sx * 8
        if lab[sy, sx]: continue
        n += 1; lab[sy, sx] = n; q = deque([(sy, sx)]); cnt = 0
        while q:
            y, x = q.popleft(); cnt += 1
            for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                ny, nx = y + dy, x + dx
                if 0 <= ny < H and 0 <= nx < W and fg[ny, nx] and not lab[ny, nx]:
                    lab[ny, nx] = n; q.append((ny, nx))
        if cnt > best: best, keep = cnt, n
    al = np.where(lab == keep, 255, 0).astype(np.uint8)
    if close:   # fill small bites where the hoodie is as grey as the background
        cl = np.asarray(Image.fromarray(al).filter(ImageFilter.MaxFilter(close)).filter(ImageFilter.MinFilter(close)))
        al = al.copy(); al[int(H * .6):] = cl[int(H * .6):]          # body only: hair and neck keep their real outline
    al = np.asarray(Image.fromarray(al).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.1))).astype(float) / 255
    return al

def head_box(al):
    # top of the hair, then the widest run of opaque pixels in the band just below it = the head (hair + ears)
    rows = np.where(al.max(1) > .5)[0]; top = rows[0]
    H, W = al.shape
    # hair width: measured a little below the top, where arms are never present unless raised; use the
    # connected run that contains the column of the topmost pixel
    cx0 = int(np.median(np.where(al[top + 4] > .5)[0]))
    widths = []
    for y in range(top + int(H * .06), top + int(H * .2)):
        row = al[y] > .5; l = cx0
        while l > 0 and row[l - 1]: l -= 1
        r = cx0
        while r < W - 1 and row[r + 1]: r += 1
        widths.append((r - l, l, r))
    wmed = sorted(widths)[len(widths) // 2]
    return top, wmed[1], wmed[2]

def place(im, close=0):
    al = alpha_of(im, close); top, l, r = head_box(al)
    s = HEAD_W / (r - l)
    W, H = im.size; nw, nh = round(W * s), round(H * s)
    rgba = np.dstack([np.asarray(im.convert("RGB")), (al * 255).astype(np.uint8)])
    p = Image.fromarray(rgba, "RGBA").resize((nw, nh), Image.LANCZOS)
    can = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    ox, oy = round(HEAD_CX - (l + r) / 2 * s), round(HEAD_TOP - top * s)
    can.alpha_composite(p, (ox, oy)) if ox >= 0 and oy >= 0 else can.paste(p, (ox, oy), p)
    a = np.asarray(can).astype(float)
    yy = np.arange(SIZE)[:, None] / SIZE
    yb = min(SIZE, oy + nh) / SIZE                               # where the picture ends
    a[..., 3] *= np.clip((yb - yy) / .1, 0, 1)                   # fade the bottom of the hoodie
    return Image.fromarray(a.astype(np.uint8), "RGBA"), (round(s, 3), ox, oy)

def uri(img):
    b = io.BytesIO(); img.save(b, "WEBP", quality=88)
    return "data:image/webp;base64," + base64.b64encode(b.getvalue()).decode()

def load_uri(u):
    return Image.open(io.BytesIO(base64.b64decode(u.split(",", 1)[1]))).convert("RGBA")

# Talking mouth: the close-up face frames (closed / mid) are fitted onto each calm pose's head, and only the
# lips are blended in, colour-matched to the pose. Poses that already have an open mouth are left as they are.
TALKABLE = {"cross", "peace", "thumb", "shrug", "point1"}
EYES = (330, 318, 590, 392)        # glasses band in the 900px face frame, used to fit the head
MOUTH = (459, 494, 96, 68)         # whole-mouth ellipse in the 900px face frame: moustache edge down to the top of the goatee
NOSE = (398, 372, 522, 446)        # nose band, used to fine-tune the position (the nose does not move with expressions)

def fit_face(face, pose):
    fa = np.asarray(face)[..., 3].astype(float) / 255
    top, l, r = head_box(fa); s0 = HEAD_W / (r - l)
    P = np.asarray(pose.convert("L")).astype(float)
    best = None
    for s in np.arange(s0 * .9, s0 * 1.1, s0 * .01):
        F = np.asarray(face.convert("L").resize((round(900 * s), round(900 * s)), Image.BILINEAR)).astype(float)
        x0, y0, x1, y1 = [round(v * s) for v in EYES]; R = F[y0:y1:2, x0:x1:2]
        ox0, oy0 = round(HEAD_CX - (l + r) / 2 * s), round(HEAD_TOP - top * s)
        for dx in range(-24, 25, 3):
            for dy in range(-24, 25, 3):
                px, py = ox0 + dx + x0, oy0 + dy + y0
                if px < 0 or py < 0: continue
                C = P[py:py + (y1 - y0):2, px:px + (x1 - x0):2]
                if C.shape != R.shape: continue
                e = np.abs(R - C).mean()
                if best is None or e < best[0]: best = (e, s, ox0 + dx, oy0 + dy)
    # fine-tune the position on the nose, one pixel at a time
    e, s, ox, oy = best
    F = np.asarray(face.convert("L").resize((round(900 * s), round(900 * s)), Image.LANCZOS)).astype(float)
    x0, y0, x1, y1 = [round(v * s) for v in NOSE]; R = F[y0:y1, x0:x1]; fine = None
    for dx in range(-12, 13):
        for dy in range(-12, 13):
            C = P[oy + dy + y0:oy + dy + y1, ox + dx + x0:ox + dx + x1]
            if C.shape != R.shape: continue
            e2 = np.abs((R - R.mean()) - (C - C.mean())).mean()
            if fine is None or e2 < fine[0]: fine = (e2, dx, dy)
    return (fine[0], s, ox + fine[1], oy + fine[2])

# The open mouth is pasted a little smaller than life (SPEAK), anchored on the lip line, so it reads as plain
# talking and not as a laugh. Per-pose TWEAK multiplies it where the head is turned and the face is smaller.
LIPS = (459, 492, 80, 56)          # open-mouth area in the 900px frame: lips and chin patch, none of the beard edge
ANCHOR = (459, 462)                # centre of the closed lip line
SPEAK = (.9, .85)                 # width, height of the open mouth
TWEAK = {"cross": (.74, -3, -10)}

def talk_variant(pose, face, fit, tweak=(1, 0, 0), k=(1, 1), M=MOUTH):
    e, s, ox, oy = fit
    t, tx, ty = tweak; ax, ay = ox + ANCHOR[0] * s + tx, oy + ANCHOR[1] * s + ty
    sx, sy = s * t * k[0], s * t * k[1]; ox, oy = round(ax - ANCHOR[0] * sx), round(ay - ANCHOR[1] * sy)
    F = face.resize((round(900 * sx), round(900 * sy)), Image.LANCZOS)
    layer = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0)); layer.paste(F, (ox, oy))
    A, B = np.asarray(pose).astype(float), np.asarray(layer).astype(float)
    yy, xx = np.mgrid[0:SIZE, 0:SIZE]
    cx, cy, rx, ry = ox + M[0] * sx, oy + M[1] * sy, M[2] * sx, M[3] * sy
    dist = np.sqrt(((xx - cx) / rx) ** 2 + ((yy - cy) / ry) ** 2)
    m = np.clip((1 - dist) / .3, 0, 1)
    ring = (dist > .95) & (dist < 1.2)
    off = np.median(A[ring][:, :3], 0) - np.median(B[ring][:, :3], 0)   # match skin and beard tone around the lips
    res = A.copy(); res[..., :3] = A[..., :3] * (1 - m[..., None]) + np.clip(B[..., :3] + off, 0, 255) * m[..., None]
    return Image.fromarray(res.astype(np.uint8), "RGBA")

# A master pose brings its own mouth and blink pictures ("name@small=path", "@round", "@wide", "@blink"): the same
# picture with only the face changed. Only the lower face (or the eyes) is taken from each one, on top of the closed
# picture, so hair, eyebrows and body are identical in every frame and nothing wobbles.
LOWER = (514, 440, 76, 54)         # moustache, lips and chin patch in the 1024px master picture
EYELIDS = (514, 335, 122, 44)      # both eyes, inside the glasses
def own_variant(base, other, E):
    A, B = np.asarray(base.convert("RGB")).astype(float), np.asarray(other.convert("RGB")).astype(float)
    yy, xx = np.mgrid[0:A.shape[0], 0:A.shape[1]]
    dist = np.sqrt(((xx - E[0]) / E[2]) ** 2 + ((yy - E[1]) / E[3]) ** 2)
    m = np.clip((1 - dist) / .3, 0, 1)[..., None]
    return Image.fromarray((A * (1 - m) + B * m).astype(np.uint8), "RGB")

src, out = sys.argv[1], sys.argv[2]
d = json.load(open(src)); d["poseImg"] = {}; d["poseTalk"] = {}; sheet = []
face_closed, face_mid = load_uri(d["closed"]), load_uri(d["mid"])
own = {}
for a in sys.argv[3:]:
    if "@" in a.split("=", 1)[0]: own.setdefault(a.split("@")[0], {})[a.split("@")[1].split("=")[0]] = a.split("=", 1)[1]
KEYS = {"small": "poseTalk", "round": "poseRound", "wide": "poseWide", "blink": "poseBlink"}
for k in list(KEYS.values()) + ["poseBlinkTalk"]: d[k] = {}
for arg in sys.argv[3:]:
    name, path = arg.split("=", 1)
    if "@" in name: continue
    if name in own:
        base = Image.open(path); img, info = place(base, 41); d["poseImg"][name] = uri(img); sheet.append(img); print(name, info, "master")
        for kind, p in own[name].items():
            v, info2 = place(own_variant(base, Image.open(p), EYELIDS if kind == "blink" else LOWER), 41)
            assert info2 == info, "variant is not lined up with the closed picture"
            d[KEYS[kind]][name] = uri(v); sheet.append(v)
        if "blink" in own[name] and "small" in own[name]:        # blinking while talking
            both = own_variant(own_variant(base, Image.open(own[name]["small"]), LOWER), Image.open(own[name]["blink"]), EYELIDS)
            d["poseBlinkTalk"][name] = uri(place(both, 41)[0])
        continue
    img, info = place(Image.open(path))
    d["poseImg"][name] = uri(img); sheet.append(img); print(name, info)
    if name in TALKABLE:
        # both mouths come from the close-up frames, so closed and talking always differ clearly
        fit = fit_face(face_closed, img)
        tw = TWEAK.get(name, (1, 0, 0)); cv = talk_variant(img, face_closed, fit, tw); tv = talk_variant(cv, face_mid, fit, tw, SPEAK, LIPS)
        d["poseImg"][name] = uri(cv); d["poseTalk"][name] = uri(tv); sheet[-1] = cv; sheet.append(tv)
        print("   talk fit: err %.1f scale %.3f at %d,%d" % fit)
d["poseBox"] = {"size": SIZE, "headW": HEAD_W, "headCx": HEAD_CX, "headTop": HEAD_TOP}
json.dump(d, open(out, "w"))
W = Image.new("RGB", (300 * len(sheet), 300), (243, 241, 234))
for i, im in enumerate(sheet): W.paste(im.resize((300, 300)), (i * 300, 0), im.resize((300, 300)))
W.save(out.replace(".json", "-poses.png"))
print("ok", round(len(json.dumps(d)) / 1e6, 2), "MB")
