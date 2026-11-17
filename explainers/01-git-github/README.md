# DevOps explainers: Episode 1, Git & GitHub

A 64-second vertical (1080×1920) cartoon explainer in short-video style: a doodle presenter, a headline with one highlighted word, a prop on the right, and English captions.

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

## Make the character look like you

Edit the `LOOK` block at the top of the script in `explainer.html` (skin tone, hair style and colour, beard, moustache, glasses, shirt and shorts colours), then render again.

## Change the words or timing

Each scene in the `S` list has a start time, title, captions (`[seconds into scene, text]`), poses and a prop. Preview a single moment with `explainer.html?t=34`, or render stills with:

```bash
node render.mjs --stills 3,20,50
```
