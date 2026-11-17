// Renders explainer.html to a vertical 1080x1920 MP4.
//   node render.mjs                -> git-github-explainer.mp4 (30 fps)
//   node render.mjs --stills 2,8   -> PNG stills at those seconds (for checking)
//   node render.mjs --voice vo.m4a -> same video with your recorded voiceover mixed in
import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
// CommonJS require finds a globally installed playwright too
const { chromium } = createRequire(import.meta.url)("playwright");
const args = process.argv.slice(2);
const opt = n => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const FPS = Number(opt("--fps") || 30);
const out = opt("--out") || path.join(here, "git-github-explainer.mp4");
const voice = opt("--voice");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
await page.goto("file://" + path.join(here, "explainer.html") + "?render=1");
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => window.READY);
if (opt("--avatar")) {
  // a JSON file of avatar frames: { closed, mid, open, wide?, blink }
  const { readFileSync } = await import("node:fs");
  await page.evaluate(a => { window.AVATAR = a; }, JSON.parse(readFileSync(opt("--avatar"), "utf8")));
}
if (voice) {
  // loudness of the recording per video frame drives the mouth
  const pcm = await new Promise((res, rej) => {
    const p = spawn("ffmpeg", ["-v", "error", "-i", voice, "-ac", "1", "-ar", "16000", "-f", "s16le", "-"]);
    const chunks = []; p.stdout.on("data", c => chunks.push(c)); p.on("close", () => res(Buffer.concat(chunks))); p.on("error", rej);
  });
  const samples = new Int16Array(pcm.buffer, pcm.byteOffset, pcm.length >> 1), per = 16000 / FPS, env = [];
  for (let i = 0; i * per < samples.length; i++) {
    let sum = 0; const a = Math.floor(i * per), b = Math.min(samples.length, Math.floor((i + 1) * per));
    for (let j = a; j < b; j++) sum += samples[j] * samples[j];
    env.push(Math.sqrt(sum / Math.max(1, b - a)));
  }
  const peak = [...env].sort((x, y) => x - y)[Math.floor(env.length * .97)] || 1;
  const norm = env.map(v => Math.min(1, Math.max(0, (v / peak - .08) / .8)));
  const smooth = norm.map((v, i) => (v + (norm[i - 1] ?? v) * .6) / 1.6);
  await page.evaluate(([env, fps]) => { window.VOICE = { env, fps }; }, [smooth, FPS]);
}
const stage = await page.$("#stage");

if (opt("--stills")) {
  for (const s of opt("--stills").split(",").map(Number)) {
    await page.evaluate(t => window.render(t), s);
    await stage.screenshot({ path: path.join(opt("--dir") || here, `still-${s}.png`) });
  }
  await browser.close();
  process.exit(0);
}

const duration = await page.evaluate(() => window.DURATION);
const from = Number(opt("--from") || 0), to = Number(opt("--to") || duration);
const frames = Math.ceil((to - from) * FPS);
const ff = spawn("ffmpeg", [
  "-y", "-v", "error", "-f", "image2pipe", "-framerate", String(FPS), "-i", "-",
  ...(voice ? ["-i", voice] : ["-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo"]),
  "-map", "0:v", "-map", "1:a", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "medium", "-crf", "20",
  "-c:a", "aac", "-b:a", "160k", "-t", String(to - from), "-movflags", "+faststart", out,
], { stdio: ["pipe", "inherit", "inherit"] });

for (let f = 0; f < frames; f++) {
  await page.evaluate(t => window.render(t), from + f / FPS);
  const buf = await stage.screenshot({ type: "jpeg", quality: 92 });
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once("drain", r));
  if (f % 150 === 0) console.log(`frame ${f}/${frames}`);
}
ff.stdin.end();
await new Promise(r => ff.on("close", r));
await browser.close();
console.log("wrote", out);
