// Renders a cheat sheet template to PDF (A4, one page) and PNG.
//   node ../../tools/cheatsheet.mjs <template.html> <presenter.json> <out-basename>
import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
const { chromium } = createRequire(import.meta.url)("playwright");
const [tpl, presenter, out] = process.argv.slice(2).map(p => path.resolve(p));
const face = JSON.parse(readFileSync(presenter, "utf8")).closed;
const html = readFileSync(tpl, "utf8").replace("{{FACE}}", face);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 2.5 });
await page.setContent(html, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
const over = await page.evaluate(() => document.documentElement.scrollHeight - 1123);
await page.pdf({ path: out + ".pdf", format: "A4", printBackground: true, preferCSSPageSize: true });
await page.screenshot({ path: out + ".png", clip: { x: 0, y: 0, width: 794, height: 1123 } });
await browser.close();
console.log("wrote", out + ".pdf", out + ".png", "overflow px:", over);
