import sys
S = sys.argv[1]
s = open('01-git-github/explainer.html').read()
def cut(a, b, new):
    global s
    i = s.index(a); j = s.index(b, i); s = s[:i] + new + s[j:]
def rep(a, b):
    global s
    assert s.count(a) == 1, a; s = s.replace(a, b)
cut('const S = [', '\nS.forEach((s, i) => s.end', open(S + '/ep4_scenes.js').read().rstrip('\n'))
cut('/* ---------- Props (right side) ---------- */', 'function term(', open(S + '/ep4_props.js').read() + '\n')
rep('<title>Git &amp; GitHub Explainer</title>', '<title>Undoing Mistakes Explainer</title>')
rep('''    background-color: var(--bg);
    background-image: radial-gradient(var(--grid) 3px, transparent 3.5px), radial-gradient(1200px 500px at 50% 0%, #fff8ec, transparent);
    background-size: 60px 60px, 100% 100%; transform-origin: center center;''', '''    transform-origin: center center;
    background: radial-gradient(520px 520px at 22% 82%, rgba(255,140,90,.38), transparent 70%), radial-gradient(900px 700px at 90% 10%, rgba(185,160,255,.35), transparent 70%), linear-gradient(170deg, #fff1e6 0%, #fde6ef 50%, #efe6ff 100%);''')
rep('color: var(--ink); letter-spacing: -1.5px; }', 'color: #2b2140; letter-spacing: -1.5px; }')
rep('#title { left: 40px; right: 40px; top: 220px;', '#title { left: 50px; right: 50px; top: 190px; font-size: 76px;')
rep('.hl::after { content: ""; position: absolute; left: -10px; right: -10px; bottom: -2px; top: 10px; z-index: -1; border-radius: 14px; rotate: -1.5deg;',
    '.hl::after { content: ""; position: absolute; left: -16px; right: -16px; bottom: -4px; top: 2px; z-index: -1; border-radius: 22px; rotate: 0deg;')
rep('  .hl span { position: relative; }', '  .hl span { position: relative; }\n  #title .hl { margin: 0 .25em; }')
rep('#caption { left: 0; right: 0; top: 1500px;', '#caption { left: 40px; right: 40px; top: 1660px;')
rep('#caption div { background: #ffd84a; color: #151515; font-weight: 800; font-size: 52px; padding: 16px 34px 20px; border-radius: 999px; border: 4px solid #151515; box-shadow: 6px 6px 0 #151515;',
    '#caption div { background: linear-gradient(90deg, #ff5a3c, #7c5cff); color: #fff; font-weight: 800; font-size: 42px; padding: 18px 34px 22px; border-radius: 26px; border: none; box-shadow: 0 16px 34px rgba(124,92,255,.3);')
rep('#prop { left: 470px; top: 560px; width: 580px; height: 860px; }', '#prop { left: 230px; top: 420px; width: 620px; height: 860px; transform: scale(1.2); transform-origin: 50% 0; }')
rep('#char { left: 30px; top: 610px; width: 470px; height: 964px; }', '#char { left: -20px; top: 760px; width: 470px; height: 964px; overflow: visible; z-index: 2; }')
rep('.step.on { background: #151515; color: #ffd84a; letter-spacing: 1px; }', '.step.on { background: #2b2140; color: #fff; letter-spacing: 1px; }')
rep('.step { min-width: 46px; height: 46px; border-radius: 23px; background: #e3e2dc; color: #777;', '.step { min-width: 46px; height: 46px; border-radius: 23px; background: rgba(255,255,255,.7); color: #7b6f8f;')
rep('#steps { left: 0; right: 0; top: 150px;', '#steps { left: 0; right: 0; top: 100px;')
rep('[1, 2, 3, 4].map(n =>', '[1, 2, 3].map(n =>')
rep('const COL = { blue: ["var(--blue)", "#d4e2ff"], green: ["var(--green)", "#d3f1df"], red: ["var(--red)", "#ffd9da"] };',
    'const COL = { blue: ["#fff", "#7c5cff"], green: ["#fff", "#12b5a5"], red: ["#fff", "#ff5a3c"] };')
rep('  #hint {', '''  #player { left: 60px; right: 60px; top: 1830px; height: 40px; display: flex; align-items: center; gap: 18px; z-index: 5; }
  #player .ic { font: 900 28px Inter; color: #2b2140; }
  #player .bar { flex: 1; height: 10px; border-radius: 5px; background: rgba(43,33,64,.12); position: relative; }
  #player .fill { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 5px; background: linear-gradient(90deg, #ff5a3c, #7c5cff); }
  #player .knob { position: absolute; top: 50%; width: 26px; height: 26px; margin: -13px 0 0 -13px; border-radius: 50%; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,.2); }
  #player .tm { font: 700 24px "DejaVu Sans Mono", monospace; color: #7b6f8f; }
  #hint {''')
rep('<div id="stage">', '''<div id="stage">
  <svg width="0" height="0" style="position:absolute"><filter id="soft" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#7c5cff" flood-opacity=".14"/></filter></svg>''')
rep('  <div id="caption" class="abs"></div>', '  <div id="caption" class="abs"></div>\n  <div id="player" class="abs"></div>')
rep('  $("prop").innerHTML = P[sc.prop](warpOld(sc, lt));', '''  $("prop").innerHTML = P[sc.prop](warpOld(sc, lt));
  { const k = clamp(t / END), mm = s => Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");
    $("player").innerHTML = `<span class="ic">⏪</span><div class="bar"><div class="fill" style="width:${k * 100}%"></div><div class="knob" style="left:${k * 100}%"></div></div><span class="tm">${mm(t)}</span>`; }''')
open('04-undoing-mistakes/explainer.html', 'w').write(s)
print("ok")
