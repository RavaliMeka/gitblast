# Writes the "Tech Stories" episodes (well-documented outages and attacks) and builds them in the house style.
import json, os, subprocess, sys
here = os.path.dirname(os.path.abspath(__file__)); root = os.path.join(here, "..", ".."); LIB = open(os.path.join(here, "lib.js")).read()
def hl(c, w): return '<hl c="%s">%s</hl>' % (c, w)
def scene(t, title, pose, cap, prop, step=None):
    return "  { t: %s, %stitle: %s, pose: [[0,%s]], mood: \"happy\",\n    cap: %s, prop: %s }," % (t, "step: %d, " % step if step else "", json.dumps(title), json.dumps(pose), json.dumps(cap), json.dumps(prop))
EPS = {}

EPS["27-now-outage-wave"] = dict(title="Six days of outages", keys="six outages microsoft flights grounded attack no different bug update once connected fail plan ready".split(), end=57.5, scenes=[
  (0, "Six days of " + hl("red", "outages"), "shrug", [[0, "Six days. Microsoft, the FAA, AWS, Chase, United, Apple."], [5, "All had outages."]], "case"),
  (7.4, "The " + hl("blue", "timeline"), "point", [[0, "It started November 12, with Microsoft 365."], [3.4, "Then flights were grounded."], [5.6, "Then AWS, Chase, United, and Apple."]], "timeline", 1),
  (17.6, "One big " + hl("red", "attack") + "?", "shrug", [[0, "So was it one giant cyber attack?"], [2.8, "Officials say there is no evidence of that."]], "not"),
  (23.4, "Different " + hl("amber", "causes"), "point", [[0, "The reported causes are all different:"], [2.8, "a hidden bug, unstable old equipment, an internal update."]], "causes", 2),
  (31.4, "Why all at " + hl("blue", "once") + "?", "present", [[0, "So why all at once?"], [2, "Partly coincidence. Partly, everything is connected."]], "linked"),
  (38.4, "The " + hl("green", "lesson"), "point", [[0, "The lesson for engineers: assume your dependencies will fail."], [4.4, "And plan for it."]], "lesson", 3),
  (46.6, "Remember " + hl("green", "this"), "thumb", [[0, "Outages aren't rare. Being ready is."]], "recap"),
  (50.8, "Follow for " + hl("red", "more"), "present", [[0, "If this helped,"], [1.6, "follow for more."]], "next"),
], props="""
const P = {
  case: lt => svg(caseCard(lt, "NOV 2026", "The outage wave", DS.red, "public reports · 19 Nov 2026"), 420),
  timeline: lt => svg(bullets(lt, [[.2, "Nov 12", "Microsoft 365", DS.blue], [3.4, "Nov 13", "FAA ground stop", DS.red], [5.6, "Nov 15", "AWS US-East", DS.amber], [6.4, "Nov 16", "Chase · United", DS.ink], [7.2, "Nov 17", "Apple services", DS.mute]], 0, 92), 470),
  not: lt => svg(bullets(lt, [[.3, "?", "one giant cyber attack", DS.red], [2.8, "✕", "no evidence, officials say", DS.green]], 30, 120), 300),
  causes: lt => svg(bullets(lt, [[2.8, "1", "a hidden software bug", DS.blue], [4, "2", "unstable old equipment", DS.amber], [5.2, "3", "an internal update", DS.red]], 10, 108), 350),
  linked: lt => svg(G(lt, .2, 320, 90, box(-130, -50, 260, 100, DS.blue, "#eff6ff", 18) + T(0, 12, "one cloud service", DS.blue, 24, 800)) + ["banks", "airlines", "apps", "shops"].map((n, i) => G(lt, 2.2 + i * .3, 100 + i * 147, 280, box(-66, -36, 132, 72, DS.line, "#fff", 12) + T(0, 8, n, DS.ink, 21, 700))).join("") +
    (lt > 2.2 ? [0, 1, 2, 3].map(i => `<path d="M320 140 L${100 + i * 147} 244" stroke="${DS.mute}" stroke-width="3" stroke-dasharray="6 7"/>`).join("") : ""), 340),
  lesson: lt => svg(bullets(lt, [[.3, "1", "timeouts and retries", DS.blue], [2.4, "2", "a fallback mode", DS.amber], [4.4, "3", "a second region", DS.green]], 10, 108), 350),
  recap: lt => svg(recap(lt, [["Expect", "things to fail", DS.red], ["Limit", "the blast radius", DS.amber], ["Practice", "the recovery", DS.green]]), 450),
  next: lt => svg(followCard(lt), 450),
};""")

EPS["28-now-microsoft-365"] = dict(title="What broke Microsoft 365", keys="down hours three bug load percent offline teams earlier safety healthy overloaded eighty cascading capacity shed headroom small".split(), end=60.5, scenes=[
  (0, "Microsoft 365 " + hl("red", "down"), "shrug", [[0, "November 12. Outlook and Teams went down,"], [3.4, "for about a day."]], "case"),
  (7, "Three things at " + hl("amber", "once"), "present", [[0, "Microsoft's early report describes three things at once."]], "three"),
  (12, "One: a hidden " + hl("red", "bug"), "point", [[0, "One: a hidden bug that froze gateway servers under heavy load."]], "bug", 1),
  (17.6, "Two: less " + hl("amber", "capacity"), "point", [[0, "Two: about 14 percent of those servers were already offline."]], "cap"),
  (23, "Three: more " + hl("blue", "traffic"), "point", [[0, "Three: Teams traffic had been moved onto them hours earlier."]], "traffic"),
  (28.6, "The " + hl("red", "cascade"), "point", [[0, "Then the safety system kicked in."], [2.4, "It moved traffic to the healthy servers,"], [5.2, "and overloaded them too."]], "cascade", 2),
  (37.4, "Over " + hl("red", "80%"), "shrug", [[0, "At the worst point, over 80 percent had stopped responding."]], "eighty"),
  (42.6, "The " + hl("green", "lesson"), "point", [[0, "That's a cascading failure."], [2.2, "The fix: spare capacity, and shed load before servers fall over."]], "lesson", 3),
  (51.4, "Remember " + hl("green", "this"), "thumb", [[0, "Leave headroom. Fail small, not all at once."]], "recap"),
  (55.4, "Follow for " + hl("red", "more"), "present", [[0, "If this helped,"], [1.6, "follow for more."]], "next"),
], props="""
const servers = (lt, downAt) => Array.from({ length: 16 }, (_, i) => { const x = 80 + (i % 8) * 68, y = 70 + Math.floor(i / 8) * 76, off = lt > downAt(i);
  return `<rect x="${x - 27}" y="${y - 30}" width="54" height="60" rx="10" fill="${off ? "#fff" : DS.green}" stroke="${off ? DS.red : DS.green}" stroke-width="4" stroke-dasharray="${off ? "6 6" : "0"}"/>` + (off ? T(x, y + 9, "✕", DS.red, 24, 800) : ""); }).join("");
const P = {
  case: lt => svg(caseCard(lt, "12 NOV 2026", "Microsoft 365 goes down", DS.blue, "public reports · 19 Nov 2026"), 420),
  three: lt => svg(stat(lt, .2, "3", "things went wrong together", DS.amber), 360),
  bug: lt => svg(servers(lt, i => i === 5 ? 1.6 : 99) + G(lt, 2.2, 320, 260, box(-260, -48, 520, 96, DS.red, "#fff1f3", 18) + T(0, 11, "heavy load → server freezes", DS.red, 26, 800)), 330),
  cap: lt => svg(stat(lt, .2, "14%", "of gateway capacity already offline", DS.amber), 360),
  traffic: lt => svg(stages(lt, ["Teams", "traffic", "gateways"], 120, .3, [], .7) + T(320, 240, "moved there about 15 hours earlier", DS.mute, 21, 700, "middle", MONO, (lt - 3) / .3), 290),
  cascade: lt => svg(servers(lt, i => 2.4 + ((i * 7) % 16) * .34) + T(320, 240, lt < 5.2 ? "traffic moves to healthy servers…" : "…and they overload too", lt < 5.2 ? DS.mute : DS.red, 25, 800), 280),
  eighty: lt => svg(stat(lt, .2, ">80%", "of gateway servers not responding", DS.red), 360),
  lesson: lt => svg(bullets(lt, [[2.2, "1", "keep spare capacity", DS.green], [4.2, "2", "shed load early", DS.amber], [6, "3", "limit automatic failover", DS.blue]], 10, 108), 350),
  recap: lt => svg(recap(lt, [["Headroom", "never run at the edge", DS.green], ["Shed", "drop some, save most", DS.amber], ["Limit", "stop the chain", DS.red]]), 450),
  next: lt => svg(followCard(lt), 450),
};""")

EPS["29-now-faa-ground-stop"] = dict(title="Why every US flight stopped", keys="stopped four ground stop flying nothing network traffic old attack investigated decades load protect limits copy unprotected".split(), end=56, scenes=[
  (0, "Every flight: " + hl("red", "stopped"), "shrug", [[0, "November 13. Every departure in the US, stopped."], [4, "For more than four hours."]], "case"),
  (7.4, "A ground " + hl("red", "stop"), "present", [[0, "It's called a ground stop."], [2.2, "Planes in the air keep flying. Nothing new takes off."]], "stop"),
  (14.4, "A " + hl("blue", "network") + " problem", "point", [[0, "The FAA points to its old network equipment:"], [3.2, "it became unstable under too much traffic."]], "flood", 1),
  (22, "Not an " + hl("green", "attack"), "present", [[0, "Officials say there's no evidence of a cyberattack."], [3.6, "The root cause is still being investigated."]], "not"),
  (29.4, "Old " + hl("amber", "systems"), "point", [[0, "Old systems are the hard part."], [2.4, "They work for decades, until the load changes."]], "old", 2),
  (36.6, "The " + hl("green", "lesson"), "point", [[0, "The lesson: protect old systems from traffic floods."], [3.8, "Use rate limits, and test changes on a copy first."]], "lesson", 3),
  (46, "Remember " + hl("green", "this"), "thumb", [[0, "Old isn't the problem. Unprotected is."]], "recap"),
  (50, "Follow for " + hl("red", "more"), "present", [[0, "If this helped,"], [1.6, "follow for more."]], "next"),
], props="""
const P = {
  case: lt => svg(caseCard(lt, "13 NOV 2026", "Flights grounded", DS.red, "public reports · 19 Nov 2026"), 420),
  stop: lt => svg(compare(lt, { title: "in the air", lines: ["keep flying", "land normally", "✓"], col: DS.green, last: 1, d: 2.2 }, { title: "on the ground", lines: ["no take-offs", "wait at the gate", "✕"], col: DS.red, last: 1, d: 4 }, 30, 290), 370),
  flood: lt => svg(G(lt, .2, 480, 150, box(-110, -80, 220, 160, DS.amber, "#fffbeb", 18) + T(0, -6, "old", "#b45309", 30, 800) + T(0, 30, "equipment", "#b45309", 26, 800)) +
    Array.from({ length: 9 }, (_, i) => { const k = ((lt - 3 - i * .16) % 1.2) / 1.2; return lt > 3 + i * .16 ? `<circle cx="${60 + 290 * k}" cy="${90 + (i % 3) * 60}" r="10" fill="${DS.red}" opacity="${1 - k * .6}"/>` : ""; }).join("") +
    T(320, 300, "too much traffic for old equipment", DS.red, 24, 800, "middle", SANS, (lt - 4.6) / .3), 330),
  not: lt => svg(bullets(lt, [[.3, "✓", "no evidence of an attack", DS.green], [3.6, "…", "root cause: under investigation", DS.amber]], 30, 120), 300),
  old: lt => svg(compare(lt, { title: "strength", lines: ["proven", "runs for decades", "well understood"], col: DS.green }, { title: "weakness", lines: ["built for old loads", "hard to change", "breaks on surprises"], col: DS.amber, d: 2.4 }, 30, 290), 370),
  lesson: lt => svg(bullets(lt, [[.3, "1", "rate limits in front", DS.blue], [3.8, "2", "test on a copy first", DS.amber], [5.6, "3", "change one site at a time", DS.green]], 10, 108), 350),
  recap: lt => svg(recap(lt, [["Shield", "limit the traffic", DS.blue], ["Stage", "one site at a time", DS.amber], ["Rehearse", "on a copy", DS.green]]), 450),
  next: lt => svg(followCard(lt), 450),
};""")

EPS["30-now-java4shell"] = dict(title="Java4Shell explained", keys="java4shell ai openjdk engine decoder memory code hour exploit attacks fix update patched sca sbom fast".split(), end=61.5, scenes=[
  (0, "Meet " + hl("red", "Java4Shell"), "shrug", [[0, "A new Java bug has a scary name: Java4Shell."], [4, "And an AI helped find it."]], "case"),
  (7.4, "Inside " + hl("blue", "OpenJDK"), "present", [[0, "It's in OpenJDK, the engine that runs most Java apps."]], "jdk"),
  (12.6, "A tiny " + hl("amber", "decoder"), "point", [[0, "The bug hides in a tiny, speed-tuned piece of code:"], [3.6, "the Base64 decoder."]], "b64", 1),
  (19.6, "Memory gets " + hl("red", "corrupted"), "point", [[0, "Feed it the wrong data, and it corrupts memory."], [3.4, "That can let an attacker run code."]], "mem"),
  (26.8, "Found with " + hl("blue", "AI"), "point", [[0, "The twist: the research firm says it took about an hour to find,"], [4.6, "using an AI coding tool."]], "ai", 2),
  (34.4, "Don't " + hl("green", "panic"), "shrug", [[0, "Good news: it's hard to exploit,"], [2.4, "and no attacks have been reported so far."]], "fast"),
  (39.4, "The " + hl("green", "fix") + " is out", "point", [[0, "Oracle shipped a fix on November 17."], [3, "Update to your Java vendor's patched build."]], "fix", 3),
  (46.6, "Which Java do " + hl("blue", "you") + " run?", "present", [[0, "Don't know which Java you run?"], [2.6, "That's what SCA and an SBOM are for."]], "which"),
  (53, "Remember " + hl("green", "this"), "thumb", [[0, "Find it. Patch it. Fast."]], "recap"),
  (56.6, "Follow for " + hl("red", "more"), "present", [[0, "If this helped,"], [1.6, "follow for more."]], "next"),
], props="""
const P = {
  case: lt => svg(caseCard(lt, "17 NOV 2026", "Java4Shell", DS.red, "public reports · 19 Nov 2026"), 420),
  jdk: lt => svg(G(lt, .2, 320, 110, box(-150, -60, 300, 120, DS.blue, "#eff6ff", 18) + T(0, 12, "OpenJDK", DS.blue, 42, 800)) + ["web apps", "build servers", "login systems", "your app"].map((n, i) => G(lt, 1.6 + i * .3, 100 + i * 147, 280, box(-66, -36, 132, 72, DS.line, "#fff", 12) + T(0, 8, n, DS.ink, 16, 700))).join("") +
    (lt > 1.6 ? [0, 1, 2, 3].map(i => `<path d="M320 170 L${100 + i * 147} 244" stroke="${DS.mute}" stroke-width="3" stroke-dasharray="6 7"/>`).join("") : ""), 340),
  b64: lt => svg(G(lt, .2, 320, 80, box(-290, -50, 580, 100, DS.line, "#fff", 14) + T(-264, 10, "SGVsbG8gd29ybGQ=", DS.ink, 28, 500, "start", MONO) + T(264, 10, "Base64", DS.mute, 20, 700, "end", MONO)) + T(320, 190, "↓ decode", DS.mute, 24, 700, "middle", MONO, (lt - 1.4) / .3) +
    G(lt, 2, 320, 270, box(-290, -50, 580, 100, DS.green, "#f0fdf4", 14) + T(-264, 10, "Hello world", DS.ink, 28, 500, "start", MONO)) + T(320, 380, "CVE-2026-114938", DS.red, 22, 800, "middle", MONO, (lt - 4) / .3), 410),
  mem: lt => svg(Array.from({ length: 8 }, (_, i) => `<rect x="${44 + i * 70}" y="60" width="62" height="80" rx="10" fill="${i > 4 && lt > 1 + (i - 5) * .5 ? DS.red : "#dbeafe"}" stroke="${DS.ink}" stroke-width="4"/>`).join("") + T(215, 180, "buffer", DS.mute, 20, 700, "middle", MONO) + T(495, 180, "overwritten", DS.red, 20, 700, "middle", MONO, (lt - 1.4) / .3) +
    G(lt, 3.4, 320, 290, box(-260, -48, 520, 96, DS.red, "#fff1f3", 18) + T(0, 11, "attacker's code can run", DS.red, 28, 800)), 360),
  ai: lt => svg(stat(lt, .2, "~1 hour", "to find it · the research firm's claim", DS.blue), 360),
  fast: lt => svg(bullets(lt, [[.3, "✓", "hard to exploit", DS.green], [2.4, "✓", "no attacks reported so far", DS.green], [3.8, "!", "still: patch it", DS.amber]], 10, 108), 350),
  fix: lt => svg(shell(lt, [[.3, "$ java -version"]]) + bullets(lt, [[2, "1", "check your version", DS.blue], [3.2, "2", "read your vendor's advisory", DS.amber], [4.4, "3", "install the patched build", DS.green]], 110, 100), 440),
  which: lt => svg(bullets(lt, [[.3, "SCA", "find vulnerable versions", DS.amber], [2.6, "SBOM", "list what you run", DS.blue]], 30, 120), 300),
  recap: lt => svg(recap(lt, [["Find", "which Java you run", DS.blue], ["Patch", "to a fixed build", DS.green], ["Fast", "before attackers", DS.red]]), 450),
  next: lt => svg(followCard(lt), 450),
};""")

for name, e in EPS.items():
    d = os.path.join(root, name); os.makedirs(d, exist_ok=True)
    open(os.path.join(d, "scenes.js"), "w").write("const S = [\n" + "\n".join(scene(*s) for s in e["scenes"]) + "\n];\nlet END = %s;\n" % e["end"])
    for f in ("scenes.js.orig", "house.json"):
        if os.path.exists(os.path.join(d, f)): os.remove(os.path.join(d, f))
    open(os.path.join(d, "props.js"), "w").write(LIB + e["props"] + "\n")
    json.dump({"title": e["title"], "meta": "tech news · %s" % name[7:].replace("-", " "), "keys": e["keys"]}, open(os.path.join(d, "house.json"), "w"), indent=2)
    subprocess.check_call([sys.executable, os.path.join(here, "..", "convert_house.py"), d])
