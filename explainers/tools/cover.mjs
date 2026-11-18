// Makes a 1080x1920 cover image for an episode, in that episode's own background.
//   node ../tools/cover.mjs <episode-dir> --kicker "EP 1 · GIT BASICS" --line1 "Git vs" --line2 "GitHub?" --tag "explained in 60 seconds" [--accent "#2f6fe4"] [--ink "#151515"]
// Key content stays inside the centre 1080x1350 area, which is what the profile grid shows.
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import path from "node:path";
const { chromium } = createRequire(import.meta.url)("playwright");
const args = process.argv.slice(2), dir = path.resolve(args[0]);
const opt = (n, d = "") => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const A = JSON.parse(readFileSync(path.join(dir, "presenter.json"), "utf8"));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
await page.goto("file://" + path.join(dir, "explainer.html") + "?render=1");
await page.evaluate(([o, face]) => {
  const st = document.getElementById("stage");
  [...st.children].forEach(c => { if (c.tagName !== "svg" || c.id === "char") c.style.display = "none"; });
  const d = document.createElement("div");
  d.style.cssText = "position:absolute;inset:0;font-family:Inter,sans-serif;";
  d.innerHTML = `
    <div style="position:absolute;left:0;right:0;top:330px;display:flex;justify-content:center"><div style="background:${o.ink};color:#fff;font-weight:800;font-size:38px;letter-spacing:3px;padding:14px 34px;border-radius:999px">${o.kicker}</div></div>
    <div style="position:absolute;left:40px;right:40px;top:440px;text-align:center;font-weight:900;font-size:176px;line-height:1.02;letter-spacing:-5px;color:${o.ink}">${o.line1}<br><span style="color:${o.accent}">${o.line2}</span></div>
    <div style="position:absolute;left:0;right:0;top:850px;display:flex;justify-content:center"><div style="background:#ffd84a;color:#151515;font-weight:900;font-size:52px;padding:18px 44px 22px;border-radius:999px;border:5px solid #151515;box-shadow:8px 8px 0 #151515;rotate:-2deg">${o.tag}</div></div>
    <img src="${face}" style="position:absolute;left:150px;top:960px;width:780px;height:780px;filter:drop-shadow(0 16px 30px rgba(0,0,0,.18))">`;
  st.appendChild(d);
}, [{ kicker: opt("--kicker"), line1: opt("--line1"), line2: opt("--line2"), tag: opt("--tag"), accent: opt("--accent", "#2f6fe4"), ink: opt("--ink", "#151515") }, A.closed]);
await page.waitForTimeout(300);
const out = path.join(dir, "final", "cover.png");
await (await page.$("#stage")).screenshot({ path: out });
await browser.close();
console.log("wrote", out);
