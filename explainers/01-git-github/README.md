# DevOps explainers: Episode 1, Git & GitHub

A 64-second vertical (1080×1920) cartoon explainer: an original look-alike presenter, a headline with one highlighted word, a visual on the right, and English captions.

| File | What it is |
| --- | --- |
| `git-github-explainer.mp4` | The rendered video (silent track, ready for your voiceover) |
| `VOICEOVER.md` | The timed script to record |
| `explainer.html` | The animation itself; open it in a browser to preview |
| `render.mjs` | Turns the HTML into the MP4 |

## Add your voice

Record `VOICEOVER.md` as one take (phone voice memo is fine), then:

```bash
node render.mjs --voice my-voice.m4a
```

## The presenter

Your own 3D character (made with Google Gemini), cut out of his grey background so he stands in the scene with soft, faded edges. The mouth switches cleanly between closed, talking and a light "ee" shape following the words; he blinks every few seconds and cheers once, when the code goes live.

| File | What it is |
| --- | --- |
| `presenter.json` | The blended presenter (used by default) |
| `presenter-card.json` | The same presenter in a rounded card, if you ever want that look back |
| `../tools/cutout.py` | Makes a blended presenter from a card one: `python3 ../tools/cutout.py presenter-card.json presenter.json` (then set `"card": true`) |

```bash
node render.mjs --avatar presenter.json
node render.mjs --avatar presenter.json --voice my-voice.m4a
```

## Change the words or timing

Each scene in the `S` list has a start time, title, captions (`[seconds into scene, text]`), poses and a prop. Preview a single moment with `explainer.html?t=34`, or render stills with:

```bash
node render.mjs --stills 3,20,50
```
