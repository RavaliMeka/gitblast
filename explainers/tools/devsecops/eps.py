# Writes the six DevSecOps episodes (scenes.js, props.js, house.json) and builds them in the house style.
import json, os, subprocess, sys
here = os.path.dirname(os.path.abspath(__file__)); root = os.path.join(here, "..", ".."); LIB = open(os.path.join(here, "lib.js")).read()
def hl(c, w): return '<hl c="%s">%s</hl>' % (c, w)
def scene(t, title, pose, cap, prop, step=None):
    return "  { t: %s, %stitle: %s, pose: [[0,%s]], mood: \"happy\",\n    cap: %s, prop: %s }," % (t, "step: %d, " % step if step else "", json.dumps(title), json.dumps(pose), json.dumps(cap), json.dumps(prop))
EPS = {}

EPS["21-devsecops-intro"] = dict(title="What is DevSecOps?", keys="security end most devsecops automatically left early cheap sast sca dast secret passwords pipeline push blocked fixed".split(), end=58.5, scenes=[
  (0, "Security at the " + hl("red", "end") + "?", "shrug", [[0, "Most teams test security at the very end."], [3.4, "That's when fixes cost the most."]], "late"),
  (6.6, "Meet " + hl("red", "DevSecOps"), "present", [[0, "DevSecOps fixes that."], [1.8, "Security checks run at every step, automatically."]], "hero"),
  (12.4, "Shift " + hl("red", "left"), "point", [[0, "It's called shifting left:"], [2.2, "catch problems early, while they're cheap to fix."]], "shift", 1),
  (19, "Check " + hl("green", "early"), "present", [[0, "Like building a house:"], [1.9, "check the wiring before the walls go up."]], "house"),
  (24.6, "Four " + hl("red", "checks"), "point", [[0, "Four checks do most of the work."], [2.6, "SAST reads your code."], [4.8, "SCA checks your libraries."], [7, "DAST attacks the running app."], [9.4, "And secret scanning finds leaked passwords."]], "four", 2),
  (37.4, "Inside your " + hl("blue", "pipeline"), "point", [[0, "They all run inside your CI pipeline,"], [2.8, "on every push."]], "pipe", 3),
  (42.6, "Fail? " + hl("red", "Blocked"), "shrug", [[0, "A check fails? The merge is blocked,"], [3, "until it's fixed."]], "block"),
  (47.6, "Dev. Sec. " + hl("green", "Ops."), "thumb", [[0, "Dev. Sec. Ops."], [1.8, "One team, one pipeline."]], "recap"),
  (52.2, "Next: " + hl("red", "SAST"), "present", [[0, "Next: SAST, scanning your code."], [2.6, "Follow for part two."]], "next"),
], props='''
const P = {
  late: lt => svg(stages(lt, ["code", "build", "test", "deploy"], 110, .2) + G(lt, 2.2, 320, 290, box(-200, -64, 400, 128, DS.red, "#fff1f3", 18) + shield(-140, 0, 1.1, DS.red, "!") + T(-86, -4, "security check", DS.ink, 28, 800, "start") + T(-86, 30, "at the very end", DS.red, 22, 700, "start")) +
    (lt > 2.6 ? `<path d="M540 148 V${148 + 70 * clamp((lt - 2.6) / .3)} H524" fill="none" stroke="${DS.red}" stroke-width="5" stroke-dasharray="9 8"/>` : "") + T(320, 430, "late = expensive", DS.red, 28, 800, "middle", SANS, (lt - 3.6) / .3), 480),
  hero: lt => svg(hero(lt, "DevSecOps", "security in every step"), 460),
  shift: lt => { const k = easeOut(clamp((lt - 1.2) / 1.2)); return svg(stages(lt, ["code", "build", "test", "deploy"], 100, .1, [], .15) + shield(lerp(545, 95, k), 100 - 64, .7, DS.red) +
    (lt > 1.2 ? `<path d="M500 190 H${500 - 330 * k}" stroke="${DS.red}" stroke-width="6" stroke-linecap="round"/><path d="M${500 - 330 * k} 190 l16 -11 v22 z" fill="${DS.red}"/>` : "") + T(320, 240, "shift left", DS.red, 26, 800, "middle", SANS, (lt - 1.6) / .3) +
    [["early", 60, DS.green, "cheap fix"], ["late", 190, DS.red, "costly fix"]].map(([n, h, c, s], i) => G(lt, 2.8 + i * .8, 190 + i * 260, 500, `<rect x="-70" y="${-h}" width="140" height="${h}" rx="12" fill="${c}"/>` + T(0, -h - 16, s, c, 22, 800) + T(0, 36, n, DS.ink, 24, 800))).join(""), 560); },
  house: lt => svg(compare(lt, { title: "check early", lines: ["wiring first", "walls after", "small fix"], col: DS.green, last: 1 }, { title: "check late", lines: ["walls are up", "open them again", "big repair"], col: DS.red, last: 1, d: 2 }, 30, 290), 370),
  four: lt => svg(bullets(lt, [[2.6, "SAST", "reads your code", DS.red], [4.8, "SCA", "checks your libraries", DS.amber], [7, "DAST", "attacks the running app", DS.blue], [9.4, "Secrets", "finds leaked passwords", DS.green]], 10, 104), 440),
  pipe: lt => svg(stages(lt, ["push", "SAST", "SCA", "DAST"], 130, .2, ["ok", "shield", "shield", "shield"], .45) + T(320, 250, "every push · automatic", DS.mute, 24, 700, "middle", MONO, (lt - 2.8) / .3), 300),
  block: lt => svg(stages(lt, ["push", "SAST", "SCA", "merge"], 110, .1, ["ok", "ok", "bad"], .25) + G(lt, 1.6, 320, 290, box(-230, -56, 460, 112, DS.red, "#fff1f3", 18) + T(0, 12, "✕  Merging is blocked", DS.red, 30, 800)) + T(320, 420, "fix it → check runs again", DS.mute, 22, 700, "middle", MONO, (lt - 3) / .3), 460),
  recap: lt => svg(recap(lt, [["Dev", "writes the code", DS.blue], ["Sec", "checks every step", DS.red], ["Ops", "ships it safely", DS.green]]), 450),
  next: lt => svg(nextCard(lt, "Part 2", "SAST: scan your code", 2.6), 450),
};''')

EPS["22-devsecops-sast"] = dict(title="SAST explained", keys="reading sast static scans running security mistakes sql injection semgrep exact line parameterized fast pull request false alarms early sca".split(), end=59.5, scenes=[
  (0, "Bugs found by " + hl("red", "reading"), "shrug", [[0, "Can a tool find security bugs just by reading your code?"], [4.2, "Yes. It's called SAST."]], "q"),
  (7, "What is " + hl("red", "SAST") + "?", "present", [[0, "Static Application Security Testing."], [2.6, "It scans your source code, without running it."]], "hero"),
  (13.6, "A security " + hl("blue", "spell-checker"), "point", [[0, "Think of a spell-checker,"], [2, "but for security mistakes."]], "spell"),
  (18.4, "The classic " + hl("red", "mistake"), "point", [[0, "Here's a classic:"], [1.6, "a SQL query glued together with user input."], [5, "That's SQL injection."]], "bad", 1),
  (26.4, "Run the " + hl("blue", "scan"), "point", [[0, "Run a scanner like Semgrep:"], [2.4, "semgrep scan --config auto"], [5.2, "It flags the exact line."]], "scan", 2),
  (35, "The " + hl("green", "fix"), "point", [[0, "The fix: a parameterized query."], [3, "Now the input can't change the SQL."]], "fix", 3),
  (42.4, "Good to " + hl("blue", "know"), "present", [[0, "SAST is fast, and runs on every pull request."], [3.6, "But it can raise false alarms, so review the findings."]], "know"),
  (50, "SAST in " + hl("green", "one line"), "thumb", [[0, "SAST: reads code, finds risky patterns, early."]], "recap"),
  (54, "Next: " + hl("red", "SCA"), "present", [[0, "Next: SCA, checking your dependencies."], [3, "Follow for part three."]], "next"),
], props='''
const BAD = [[.2, "const id = req.query.id;"], [1.2, 'db.query("SELECT * FROM users', "bad"], [2.2, '  WHERE id = " + id);', "bad"]];
const P = {
  q: lt => svg(codeCard(lt, "app.js", [[.2, "const id = req.query.id;"], [.6, 'db.query("SELECT * FROM users'], [1, '  WHERE id = " + id);']]) +
    G(lt, 1.8, 480 - 150 * Math.abs(Math.sin(lt * .9)), 300, `<circle r="52" fill="#fff" fill-opacity=".5" stroke="${DS.ink}" stroke-width="9"/><path d="M38 38 L76 76" stroke="${DS.ink}" stroke-width="13" stroke-linecap="round"/>`), 400),
  hero: lt => svg(hero(lt, "SAST", "Static Application Security Testing"), 460),
  spell: lt => svg(box(20, 30, 600, 150, DS.line) + T(50, 118, "teh quick brown fox", DS.ink, 40, 700, "start") + (lt > .8 ? `<path d="M50 132 q9 -9 18 0 t18 0 t18 0 t18 0" fill="none" stroke="${DS.red}" stroke-width="4" opacity="${clamp((lt - .8) / .3)}"/>` : "") +
    G(lt, 2, 320, 300, box(-300, -60, 600, 120, DS.line) + T(-270, 12, 'WHERE id = " + id', DS.ink, 30, 500, "start", MONO) + `<path d="M-270 28 ${Array.from({ length: 17 }, (_, i) => `q9 -9 18 0`).join(" ")}" fill="none" stroke="${DS.red}" stroke-width="4"/>`) +
    T(320, 420, "same idea · different mistakes", DS.mute, 22, 700, "middle", MONO, (lt - 3) / .3), 450),
  bad: lt => svg(codeCard(lt, "app.js", BAD) + G(lt, 5, 320, 330, box(-200, -46, 400, 92, DS.red, "#fff1f3", 46) + T(0, 12, "SQL injection", DS.red, 34, 800)), 400),
  scan: lt => svg(shell(lt, [[2.4, "$ semgrep scan --config auto"], [4.4, "scanning files…", "#94a3b8"], [5.2, "1 finding", "#fda4af"]]) + finding(lt, 5.6, 280, "High", "SQL injection", "app.js · line 2"), 360),
  fix: lt => svg(codeCard(lt, "app.js", [[.2, "const id = req.query.id;"], [1, 'db.query("SELECT * FROM users', "good"], [1.9, '  WHERE id = ?", [id]);', "good"]]) + T(320, 300, "input stays data, never becomes SQL", DS.green, 22, 800, "middle", SANS, (lt - 3.2) / .3), 330),
  know: lt => svg(compare(lt, { title: "strong at", lines: ["fast", "every pull request", "exact line"], col: DS.green }, { title: "watch for", lines: ["false alarms", "review findings", "tune the rules"], col: DS.amber, d: 3.6 }, 30, 290), 370),
  recap: lt => svg(recap(lt, [["Reads", "your source code", DS.blue], ["Finds", "risky patterns", DS.red], ["Early", "before it runs", DS.green]]), 450),
  next: lt => svg(nextCard(lt, "Part 3", "SCA: check your libraries", 3), 450),
};''')

EPS["23-devsecops-sca"] = dict(title="SCA explained", keys="didn't libraries sca software composition analysis dependency vulnerabilities recall npm audit lodash injection upgrade fix patched sbom ingredient ship dast".split(), end=56.5, scenes=[
  (0, "Code you " + hl("red", "didn't") + " write", "shrug", [[0, "Most of your app is code you didn't write."], [3.4, "So who checks those libraries?"]], "share"),
  (6.4, "What is " + hl("red", "SCA") + "?", "present", [[0, "SCA does."], [1.4, "Software Composition Analysis."]], "hero"),
  (11, "Every " + hl("blue", "dependency"), "point", [[0, "It lists every dependency you use,"], [2.8, "and compares them with known vulnerabilities."]], "deps"),
  (18, "A " + hl("amber", "recall list"), "present", [[0, "Like a product recall list,"], [2.2, "for your ingredients."]], "recall"),
  (23, "Try " + hl("blue", "npm audit"), "point", [[0, "Try it now: npm audit"], [2.6, "It found one: lodash 4.17.20,"], [5.8, "a known command injection flaw."]], "audit", 1),
  (32.6, "Upgrade to " + hl("green", "fix"), "point", [[0, "The fix is usually an upgrade."], [2.6, "npm audit fix"], [4.6, "Now you're on 4.17.21. Patched."]], "fix", 2),
  (41, "Your " + hl("blue", "SBOM"), "present", [[0, "SCA can also build an SBOM,"], [2.6, "a full ingredient list of your software."]], "sbom", 3),
  (47.4, "SCA in " + hl("green", "one line"), "thumb", [[0, "SCA: know what you ship, patch what's broken."]], "recap"),
  (51.4, "Next: " + hl("red", "DAST"), "present", [[0, "Next: DAST, attacking your running app."], [3, "Follow for part four."]], "next"),
], props='''
const DEPS = ["express 4.19.2", "lodash 4.17.20", "axios 1.7.2", "dotenv 16.4.5"];
const depList = (lt, d0, flagAt) => box(20, 16, 600, 290, DS.ink, "#fff", 16) + `<path d="M20 68 V32 a16 16 0 0 1 16 -16 H604 a16 16 0 0 1 16 16 V68 Z" fill="${DS.ink}"/>` + T(44, 51, "package.json", "#fff", 22, 700, "start", MONO) +
  DEPS.map((n, i) => { const d = d0 + i * .45, bad = i === 1 && lt > flagAt; return (bad ? `<rect x="30" y="${84 + i * 52}" width="580" height="44" rx="8" fill="${DS.red}" opacity=".14"/>` : "") +
    T(48, 114 + i * 52, n, DS.ink, 23, 500, "start", MONO, (lt - d) / .2) + (lt > d + .5 ? T(588, 115 + i * 52, bad ? "✕" : "✓", bad ? DS.red : DS.green, 26, 800, "end") : ""); }).join("");
const P = {
  share: lt => svg(G(lt, .2, 320, 220, `<rect x="-280" y="-60" width="110" height="120" rx="14" fill="${DS.blue}"/><rect x="-160" y="-60" width="440" height="120" rx="14" fill="${DS.amber}"/>` + T(-225, 100, "your code", DS.blue, 22, 800) + T(60, 100, "open-source libraries", "#b45309", 22, 800)) +
    T(320, 420, "who checks these?", DS.red, 30, 800, "middle", SANS, (lt - 3.4) / .3), 460),
  hero: lt => svg(hero(lt, "SCA", "Software Composition Analysis"), 460),
  deps: lt => svg(depList(lt, .3, 99) + T(320, 356, "checked against known vulnerabilities", DS.mute, 21, 700, "middle", MONO, (lt - 3) / .3), 390),
  recall: lt => svg(G(lt, .2, 320, 190, box(-240, -150, 480, 300, DS.amber, "#fffbeb", 20) + T(0, -92, "RECALL LIST", "#b45309", 30, 800) + ["flour · batch 12", "eggs · batch 7", "milk · batch 3"].map((s, i) => T(-190, -30 + i * 54, s, DS.ink, 26, 600, "start") + (i === 1 && lt > 2.4 ? `<rect x="-206" y="${-62 + i * 54}" width="412" height="44" rx="8" fill="${DS.red}" opacity=".16"/>` : "")).join("")) +
    T(320, 400, "is anything you use on the list?", DS.mute, 22, 700, "middle", SANS, (lt - 2.8) / .3), 430),
  audit: lt => svg(shell(lt, [[.3, "$ npm audit"], [2.6, "lodash  4.17.20", "#fda4af"], [3.2, "1 high severity vulnerability", "#fda4af"]]) + finding(lt, 5.8, 290, "High", "Command injection", "lodash · CVE-2021-23337"), 370),
  fix: lt => svg(shell(lt, [[2.6, "$ npm audit fix"], [4.4, "found 0 vulnerabilities", "#86efac"]], 16) + G(lt, 4.8, 320, 250, box(-290, -52, 580, 104, DS.green, "#f0fdf4", 16) + T(-260, 12, "lodash", DS.ink, 28, 800, "start", MONO) + T(-110, 12, "4.17.20", DS.red, 26, 500, "start", MONO) + T(30, 12, "→", DS.mute, 30, 800, "start") + T(90, 12, "4.17.21 ✓", DS.green, 26, 700, "start", MONO)), 330),
  sbom: lt => svg(G(lt, .2, 320, 200, box(-220, -170, 440, 340, DS.blue, "#fff", 20) + T(0, -110, "SBOM", DS.blue, 44, 800) + T(0, -76, "software bill of materials", DS.mute, 19, 600) + DEPS.map((n, i) => T(-170, -20 + i * 46, "• " + n.replace("4.17.20", "4.17.21"), DS.ink, 22, 500, "start", MONO, (lt - 2.6 - i * .3) / .2)).join("")), 420),
  recap: lt => svg(recap(lt, [["List", "every dependency", DS.blue], ["Match", "known vulnerabilities", DS.red], ["Patch", "upgrade the version", DS.green]]), 450),
  next: lt => svg(nextCard(lt, "Part 4", "DAST: test the running app", 3), 450),
};''')

EPS["24-devsecops-dast"] = dict(title="DAST explained", keys="clean running safe dast dynamic outside attacker recipe dish zap staging crawls requests header own production secret".split(), end=56.5, scenes=[
  (0, "Clean scan. " + hl("red", "Safe?"), "shrug", [[0, "Your code scan is clean."], [2.2, "So is the running app safe?"], [4.4, "Not yet."]], "q"),
  (6.4, "What is " + hl("red", "DAST") + "?", "present", [[0, "That's what DAST is for."], [2.2, "Dynamic Application Security Testing."]], "hero"),
  (12, "From the " + hl("blue", "outside"), "point", [[0, "It tests your app from the outside, while it's running,"], [4, "just like an attacker would."]], "outside"),
  (19, "Recipe vs " + hl("amber", "dish"), "present", [[0, "SAST reads the recipe."], [2.2, "DAST tastes the dish."]], "taste"),
  (24, "Scan with " + hl("blue", "ZAP"), "point", [[0, "Point a scanner like OWASP ZAP at a test site:"], [3.8, "zap-baseline.py, dash t, then your staging URL."]], "zap", 1),
  (32.4, "What it " + hl("red", "finds"), "point", [[0, "It crawls your pages and sends tricky requests,"], [3.4, "then reports what it found:"], [5.6, "a missing security header, for example."]], "report", 2),
  (41.4, "Scan what you " + hl("red", "own"), "shrug", [[0, "Important: only scan apps you own,"], [2.8, "and use staging, not production."]], "own", 3),
  (47.4, "DAST in " + hl("green", "one line"), "thumb", [[0, "DAST: test the running app, from the outside."]], "recap"),
  (51.4, "Next: " + hl("red", "secrets"), "present", [[0, "Next: secret scanning."], [2.2, "Follow for part five."]], "next"),
], props='''
const app = (x, y, lt, d, label = "running app") => G(lt, d, x, y, box(-120, -90, 240, 180, DS.ink, "#fff", 16) + `<path d="M-120 -46 V-74 a16 16 0 0 1 16 -16 H104 a16 16 0 0 1 16 16 V-46 Z" fill="${DS.ink}"/><circle cx="-96" cy="-68" r="6" fill="#f87171"/><circle cx="-76" cy="-68" r="6" fill="#fbbf24"/><circle cx="-56" cy="-68" r="6" fill="#4ade80"/>` + T(0, 20, label, DS.ink, 24, 800) + T(0, 54, "● live", DS.green, 20, 700, "middle", MONO));
const P = {
  q: lt => svg(G(lt, .2, 170, 150, box(-140, -70, 280, 140, DS.green, "#f0fdf4", 18) + T(0, -8, "code scan", DS.ink, 26, 800) + T(0, 30, "✓ clean", DS.green, 26, 800)) + app(470, 150, lt, 2.2) + T(320, 330, "?", DS.red, 80 + Math.sin(lt * 6) * 5, 800, "middle", SANS, (lt - 2.6) / .3), 380),
  hero: lt => svg(hero(lt, "DAST", "Dynamic Application Security Testing"), 460),
  outside: lt => svg(G(lt, .2, 130, 190, box(-100, -70, 200, 140, DS.red, "#fff1f3", 18) + T(0, -6, "scanner", DS.red, 28, 800) + T(0, 28, "outside", DS.mute, 20, 600, "middle", MONO)) + app(480, 190, lt, .6) +
    [0, 1, 2].map(i => { const k = ((lt - 1.4 - i * .5) % 1.5) / 1.5; return lt > 1.4 + i * .5 ? `<circle cx="${240 + 110 * k}" cy="${160 + i * 30}" r="9" fill="${DS.red}" opacity="${1 - k}"/>` : ""; }).join("") +
    T(320, 350, "no source code needed", DS.mute, 22, 700, "middle", MONO, (lt - 4) / .3), 390),
  taste: lt => svg(compare(lt, { title: "SAST", lines: ["reads the recipe", "source code", "before it runs"], col: DS.blue }, { title: "DAST", lines: ["tastes the dish", "running app", "from outside"], col: DS.red, d: 2.2 }, 30, 290), 370),
  zap: lt => svg(shell(lt, [[3.8, "$ zap-baseline.py \\\\"], [4.6, "    -t https://staging.example.com"]]) + T(320, 190, "staging = your test copy", DS.mute, 22, 700, "middle", MONO, (lt - 6) / .3), 230),
  report: lt => svg(G(lt, .2, 130, 110, box(-100, -60, 200, 120, DS.red, "#fff1f3", 18) + T(0, 10, "ZAP", DS.red, 36, 800)) + app(480, 120, lt, .2, "staging app") +
    [0, 1, 2].map(i => { const k = ((lt - .8 - i * .5) % 1.5) / 1.5; return lt > .8 + i * .5 && lt < 5.4 ? `<circle cx="${240 + 110 * k}" cy="${90 + i * 30}" r="9" fill="${DS.red}" opacity="${1 - k}"/>` : ""; }).join("") +
    finding(lt, 5.6, 330, "Medium", "CSP header not set", "Content-Security-Policy"), 410),
  own: lt => svg(bullets(lt, [[.3, "✓", "apps you own", DS.green], [1.4, "✓", "staging or test site", DS.green], [2.8, "✕", "production", DS.red], [3.6, "✕", "someone else's site", DS.red]], 10, 104), 440),
  recap: lt => svg(recap(lt, [["Running", "tests the live app", DS.blue], ["Outside", "like an attacker", DS.red], ["Staging", "never production", DS.green]]), 450),
  next: lt => svg(nextCard(lt, "Part 5", "Secret scanning", 2.2), 450),
};''')

EPS["25-devsecops-secrets"] = dict(title="Secret scanning explained", keys="password everything forgets secret scanning keys passwords patterns tokens gitleaks commit deleting history rotate store variable block pushed hook git images".split(), end=57.5, scenes=[
  (0, "One leaked " + hl("red", "password"), "shrug", [[0, "One pushed password can cost you everything."], [3.6, "And Git never forgets."]], "leak"),
  (6.6, "Secret " + hl("red", "scanning"), "present", [[0, "Secret scanning catches keys and passwords in your code."]], "hero"),
  (11.6, "It looks for " + hl("blue", "patterns"), "point", [[0, "It looks for patterns:"], [1.8, "API keys, tokens, private keys."]], "patterns"),
  (17, "Scan with " + hl("blue", "Gitleaks"), "point", [[0, "Scan your repo with Gitleaks:"], [2.6, "gitleaks detect"], [4.4, "It checks every commit, not just the latest."]], "scan", 1),
  (26, "Deleting isn't " + hl("red", "enough"), "shrug", [[0, "Found one? Deleting the line is not enough."], [3.6, "It's still in your history."]], "history", 2),
  (33, hl("green", "Rotate") + " it first", "point", [[0, "Rotate the key first."], [2, "Then move it to a secret store, or an environment variable."]], "rotate", 3),
  (41, "Block it " + hl("green", "early"), "present", [[0, "Best of all: block it before it's pushed,"], [3.4, "with a pre-commit hook, or push protection."]], "block"),
  (48.4, "Secrets in " + hl("green", "one line"), "thumb", [[0, "Scan, rotate, and keep secrets out of Git."]], "recap"),
  (52.4, "Next: " + hl("red", "images"), "present", [[0, "Next: scanning container images."], [2.6, "Follow for part six."]], "next"),
], props='''
const commits = (lt, d0, bad, y = 120) => `<path d="M70 ${y} H570" stroke="${DS.ink}" stroke-width="6" stroke-linecap="round" opacity="${clamp((lt - d0) / .3)}"/>` + [0, 1, 2, 3].map(i => G(lt, d0 + .2 + i * .3, 100 + i * 147, y, `<circle r="24" fill="${i === bad ? DS.red : "#fff"}" stroke="${i === bad ? DS.red : DS.ink}" stroke-width="6"/>` + T(0, 64, "c" + (i + 1), DS.mute, 20, 700, "middle", MONO) + (i === bad ? T(0, 9, "🔑", "#fff", 22) : ""))).join("");
const P = {
  leak: lt => svg(codeCard(lt, "config.js", [[.2, 'const DB_HOST = "db.internal";'], [1.2, 'const API_KEY = "sk_live_••••••";', "bad"]]) + G(lt, 3.6, 320, 290, box(-240, -48, 480, 96, DS.red, "#fff1f3", 48) + T(0, 12, "pushed = public forever", DS.red, 28, 800)), 360),
  hero: lt => svg(hero(lt, "Secrets", "find keys and passwords in code"), 460),
  patterns: lt => svg(bullets(lt, [[1.8, "API key", "sk_live_••••••••", DS.red], [2.6, "Token", "ghp_••••••••", DS.amber], [3.4, "Private key", "-----BEGIN…", DS.blue]], 10, 108), 350),
  scan: lt => svg(shell(lt, [[2.6, "$ gitleaks detect"], [4.4, "scanning commits…", "#94a3b8"], [5.6, "leaks found: 1", "#fda4af"]]) + finding(lt, 6.2, 280, "High", "API key in code", "config.js · commit c2"), 360),
  history: lt => svg(commits(lt, .2, 1) + G(lt, 2, 541, 20, box(-80, -24, 160, 48, DS.green, "#f0fdf4", 24) + T(0, 8, "line deleted", DS.green, 19, 800)) + (lt > 3.6 ? `<path d="M247 190 V250" stroke="${DS.red}" stroke-width="5" stroke-dasharray="8 8"/>` : "") +
    G(lt, 3.8, 320, 310, box(-250, -50, 500, 100, DS.red, "#fff1f3", 18) + T(0, 12, "still in commit c2", DS.red, 30, 800)), 380),
  rotate: lt => svg(bullets(lt, [[.3, "1", "rotate: make a new key", DS.red], [2.2, "2", "store it in a secret store", DS.blue], [4.2, "3", "read it from an env variable", DS.green]], 10, 108) + T(320, 372, "process.env.API_KEY", DS.ink, 26, 700, "middle", MONO, (lt - 5) / .3), 400),
  block: lt => svg(stages(lt, ["commit", "scan", "push"], 110, .2, ["ok", "bad"], .5) + G(lt, 2, 320, 280, box(-240, -52, 480, 104, DS.red, "#fff1f3", 18) + T(0, 12, "✕  secret found · push blocked", DS.red, 25, 800)) + T(320, 410, "pre-commit hook · push protection", DS.mute, 21, 700, "middle", MONO, (lt - 3.6) / .3), 440),
  recap: lt => svg(recap(lt, [["Scan", "every commit", DS.blue], ["Rotate", "leaked keys", DS.red], ["Store", "outside of Git", DS.green]]), 450),
  next: lt => svg(nextCard(lt, "Part 6", "Scan container images", 2.6), 450),
};''')

EPS["26-devsecops-containers"] = dict(title="Container image scanning explained", keys="hundreds packages vulnerable image scanning layer base libraries trivy severity small fewer rebuild patches fail critical scan toolkit".split(), end=57, scenes=[
  (0, "What's " + hl("red", "inside") + "?", "shrug", [[0, "Your Docker image has hundreds of packages inside."], [3.8, "Any one of them could be vulnerable."]], "inside"),
  (7, "Image " + hl("red", "scanning"), "present", [[0, "Image scanning checks them all."]], "hero"),
  (10.6, "Every " + hl("blue", "layer"), "point", [[0, "It reads every layer:"], [1.8, "the base image, system packages, and your libraries."]], "layers"),
  (17.6, "Scan with " + hl("blue", "Trivy"), "point", [[0, "Scan it with Trivy:"], [1.8, "trivy image my-app:latest"], [4.6, "You get a list, sorted by severity."]], "scan", 1),
  (26, "A " + hl("green", "smaller") + " base", "point", [[0, "Fix one: use a small, up-to-date base image."], [3.6, "Fewer packages, fewer problems."]], "base", 2),
  (33.4, hl("green", "Rebuild") + " often", "present", [[0, "Fix two: rebuild often, so patches get in."]], "rebuild", 3),
  (37.6, "Scan in " + hl("blue", "CI"), "point", [[0, "Then add the scan to your pipeline,"], [2.8, "and fail the build on critical findings."]], "ci"),
  (45.6, "Three " + hl("green", "habits"), "thumb", [[0, "Small base. Rebuild often. Scan every build."]], "recap"),
  (50.6, "Your DevSecOps " + hl("red", "toolkit"), "present", [[0, "That's your DevSecOps toolkit!"], [2.6, "Follow for more."]], "done"),
], props='''
const LAY = [["your app", DS.blue], ["libraries", DS.amber], ["system packages", "#7c3aed"], ["base image", DS.ink]];
const layers = (lt, d0, ticks) => LAY.map(([n, c], i) => G(lt, d0 + (3 - i) * .35, 320, 70 + i * 86, `<rect x="-225" y="-27" width="460" height="72" rx="14" fill="${DS.ink}" opacity=".1"/><rect x="-230" y="-36" width="460" height="72" rx="14" fill="${c}"/>` + T(-200, 10, n, "#fff", 26, 800, "start") +
  (ticks && lt > ticks + (3 - i) * .5 ? `<circle cx="196" cy="0" r="18" fill="#fff"/>` + T(196, 9, "✓", DS.green, 24, 800) : ""))).join("");
const P = {
  inside: lt => svg(layers(lt, .2) + T(320, 420, "one weak package is enough", DS.red, 26, 800, "middle", SANS, (lt - 3.8) / .3), 450),
  hero: lt => svg(hero(lt, "Image scan", "check every package in the image"), 460),
  layers: lt => svg(layers(lt, .1, 1.8), 400),
  scan: lt => svg(shell(lt, [[1.8, "$ trivy image my-app:latest"]]) + [["CRITICAL", SEV.Critical, 150], ["HIGH", DS.red, 300], ["MEDIUM", DS.amber, 420], ["LOW", DS.blue, 240]].map(([n, c, w], i) => { const k = easeOut(clamp((lt - 4.6 - i * .3) / .5));
    return T(40, 172 + i * 62, n, DS.ink, 22, 800, "start", MONO, (lt - 4.4 - i * .3) / .2) + `<rect x="190" y="${150 + i * 62}" width="${w * k}" height="32" rx="8" fill="${c}"/>`; }).join(""), 400),
  base: lt => svg(compare(lt, { title: "node:20", lines: ["full system", "many packages", "more to patch"], col: DS.red, last: 1 }, { title: "node:20-alpine", lines: ["minimal system", "few packages", "less to patch"], col: DS.green, last: 1, d: 2 }, 30, 290), 370),
  rebuild: lt => svg(shell(lt, [[.3, "$ docker build --pull -t my-app ."]]) + G(lt, 2, 320, 210, box(-270, -52, 540, 104, DS.green, "#f0fdf4", 18) + T(0, 12, "fresh base = latest patches", DS.green, 27, 800)), 290),
  ci: lt => svg(shell(lt, [[.3, "$ trivy image --exit-code 1 \\\\"], [1.4, "    --severity CRITICAL my-app:latest"]]) + stages(lt, ["build", "scan", "deploy"], 240, 2.8, ["ok", "bad"], .4) + T(320, 350, "critical finding → build fails", DS.red, 24, 800, "middle", SANS, (lt - 4.6) / .3), 390),
  recap: lt => svg(recap(lt, [["Small", "minimal base image", DS.blue], ["Fresh", "rebuild often", DS.amber], ["Scanned", "on every build", DS.green]]), 450),
  done: lt => svg(bullets(lt, [[.2, "SAST", "your code", DS.red], [.6, "SCA", "your libraries", DS.amber], [1, "DAST", "your running app", DS.blue], [1.4, "Secrets", "your keys", DS.green], [1.8, "Images", "your containers", "#7c3aed"]], 0, 92) + G(lt, 2.8, 320, 520, `<rect x="-180" y="-46" width="360" height="92" rx="46" fill="${DS.red}"/>` + T(0, 13, "+ Follow", "#fff", 38, 800)), 580),
};''')

for name, e in EPS.items():
    d = os.path.join(root, name); os.makedirs(d, exist_ok=True)
    open(os.path.join(d, "scenes.js"), "w").write("const S = [\n" + "\n".join(scene(*s) for s in e["scenes"]) + "\n];\nlet END = %s;\n" % e["end"])
    for f in ("scenes.js.orig", "house.json"):
        if os.path.exists(os.path.join(d, f)): os.remove(os.path.join(d, f))
    open(os.path.join(d, "props.js"), "w").write(LIB + e["props"] + "\n")
    json.dump({"title": e["title"], "meta": "ep.%s · %s" % (name[:2], name[3:].replace("-", " ")), "keys": e["keys"]}, open(os.path.join(d, "house.json"), "w"), indent=2)
    subprocess.check_call([sys.executable, os.path.join(here, "..", "convert_house.py"), d])
