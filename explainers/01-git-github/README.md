# DevOps explainers: Episode 1, Git & GitHub

A 64-second vertical (1080×1920) explainer in short-video style: a dark background, a headline with one highlighted word, a bright "screen" panel with the visuals, English captions, and you as the talking head at the bottom.

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

`presenter.png` is your picture with the background removed (`presenter.js` holds the same picture so the page can animate it). It sits bottom-left with the captions in a speech bubble. While a line is spoken the jaw opens and closes with the mouth showing inside, the eyes blink every few seconds, the brows lift as each new line starts, and the head nods slightly. With `--voice`, the mouth follows the loudness of your recording instead of a made-up rhythm.

## Change the words or timing

Each scene in the `S` list has a start time, title, captions (`[seconds into scene, text]`), poses and a prop. Preview a single moment with `explainer.html?t=34`, or render stills with:

```bash
node render.mjs --stills 3,20,50
```
