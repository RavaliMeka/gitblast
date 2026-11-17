# Explainer tools

The pipeline used for Episode 1, in order:

| Step | Command | What it does |
| --- | --- | --- |
| 1. Align | `python3 align.py voice16k.wav align.json` | Matches the recorded voice to the script word by word (pocketsphinx, `pip install pocketsphinx`). Edit `LINES` for a new script. |
| 2. Timing | `python3 timing.py align.json timing.json` | When each caption and each word starts. Edit `CAPS` to match the page's captions. |
| 3. Voice | see below | Clean-up, slight pitch lift, -14 LUFS |
| 4. Score | `python3 score.py timing.json outdir/` | Original synthesised music bed + whooshes, pops and a success chime, timed to the scenes |
| 5. Mix | see below | Voice in front, music ducked under speech, effects, -14 LUFS |
| 6. Render | `node render.mjs --page explainer-pro.html --avatar presenter.json --timing audio/timing.json --voice voice.wav --scale 2 --crf 17 --preset slow` | 4K (2160×3840) render; the mouth follows the voice |
| 7. Mux | `ffmpeg -i video.mp4 -i final-mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k out.mp4` | Puts the final mix on the video |

`cutout.py` makes the blended (no card) presenter from a card one.

Voice chain (ffmpeg `-af`):
```
highpass=f=85,lowpass=f=15000,afftdn=nf=-48:nr=10,equalizer=f=220:t=q:w=1.1:g=-2.5,equalizer=f=3200:t=q:w=1.2:g=3.5,equalizer=f=9500:t=q:w=0.9:g=2,deesser=i=0.35,acompressor=threshold=-24dB:ratio=3:attack=8:release=120:makeup=4
```
then two-pass `loudnorm=I=-14:TP=-1.5`.

Mix (`-filter_complex`, inputs voice, music, sfx):
```
[0:a]apad=pad_dur=2,asplit=2[v][vsc];[1:a]volume=0.16[m];[m][vsc]sidechaincompress=threshold=0.03:ratio=6:attack=40:release=450[md];[2:a]volume=0.55[fx];[v][md][fx]amix=inputs=3:normalize=0,alimiter=limit=0.9
```
then two-pass `loudnorm=I=-14:TP=-1.5:LRA=9`.
