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

`presenter.json` holds your own 3D character (made with Google Gemini): four face frames (mouth closed, talking, wide open, eyes closed) and four poses (pointing, arms crossed, thumbs up, cheering). He sits in a rounded card on the left. While a line is spoken the face frames switch with the speech, he blinks every few seconds, and when a scene's gesture starts the card cuts to the matching pose for a moment.

Render with him:

```bash
node render.mjs --avatar presenter.json
```

Add your recording and the mouth follows your voice:

```bash
node render.mjs --avatar presenter.json --voice my-voice.m4a
```

## Change the words or timing

Each scene in the `S` list has a start time, title, captions (`[seconds into scene, text]`), poses and a prop. Preview a single moment with `explainer.html?t=34`, or render stills with:

```bash
node render.mjs --stills 3,20,50
```
