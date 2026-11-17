import sys
S = sys.argv[1]
s = open('01-git-github/explainer.html').read()
def cut(a, b, new):
    global s
    i = s.index(a); j = s.index(b, i); s = s[:i] + new + s[j:]
def rep(a, b):
    global s
    assert s.count(a) == 1, a; s = s.replace(a, b)
cut('const S = [', '\nS.forEach((s, i) => s.end', open(S + '/ep5_scenes.js').read().rstrip('\n'))
cut('/* ---------- Props (right side) ---------- */', 'function term(', open(S + '/ep5_props.js').read() + '\n')
rep('<title>Git &amp; GitHub Explainer</title>', '<title>What is Docker Explainer</title>')
rep('''    background-color: var(--bg);
    background-image: radial-gradient(var(--grid) 3px, transparent 3.5px), radial-gradient(1200px 500px at 50% 0%, #fff8ec, transparent);
    background-size: 60px 60px, 100% 100%; transform-origin: center center;''', '''    transform-origin: center center;
    background: radial-gradient(500px 300px at 85% 8%, rgba(255,210,120,.45), transparent 70%), linear-gradient(180deg, #d9eeff 0%, #eef7ff 45%, #f6fbff 75%, #e3f1fb 100%);''')
rep('color: var(--ink); letter-spacing: -1.5px; }', 'color: #0b2545; letter-spacing: -1.5px; }')
rep('#title { left: 40px; right: 40px; top: 220px;', '#title { left: 40px; right: 40px; top: 190px; font-size: 76px;')
rep('.hl::after { content: ""; position: absolute; left: -10px; right: -10px; bottom: -2px; top: 10px; z-index: -1; border-radius: 14px; rotate: -1.5deg; background: var(--mark, #cfe0ff);',
    '.hl::after { content: ""; position: absolute; left: -16px; right: -16px; bottom: -6px; top: 4px; z-index: -1; border-radius: 8px; rotate: 0deg; background: repeating-linear-gradient(90deg, rgba(0,0,0,.09) 0 6px, transparent 6px 18px), var(--mark, #1d63ed); box-shadow: inset 0 6px 0 rgba(255,255,255,.25);')
rep('  .hl span { position: relative; }', '  .hl span { position: relative; }\n  #title .hl { margin: 0 .25em; }')
rep('#caption { left: 0; right: 0; top: 1500px;', '#caption { left: 40px; right: 40px; top: 1590px;')
rep('#caption div { background: #ffd84a; color: #151515; font-weight: 800; font-size: 52px; padding: 16px 34px 20px; border-radius: 999px; border: 4px solid #151515; box-shadow: 6px 6px 0 #151515;',
    '#caption div { background: #0b2545; color: #fff; font-weight: 800; font-size: 42px; padding: 18px 34px 22px 58px; border-radius: 12px; border: none; position: relative; overflow: hidden; box-shadow: 0 14px 30px rgba(11,37,69,.25);')
rep('  .card {', '  #caption div::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 26px; background: repeating-linear-gradient(135deg, #ffc531 0 12px, #0b2545 12px 24px); }\n  .card {')
rep('#prop { left: 470px; top: 560px; width: 580px; height: 860px; }', '#prop { left: 16px; top: 400px; width: 600px; height: 860px; transform: scale(1.08); transform-origin: 0 0; }')
rep('#char { left: 30px; top: 610px; width: 470px; height: 964px; }', '#char { left: 620px; top: 690px; width: 470px; height: 964px; overflow: visible; z-index: 2; }')
rep('.step.on { background: #151515; color: #ffd84a; letter-spacing: 1px; }', '.step.on { background: #1d63ed; color: #fff; letter-spacing: 1px; }')
rep('.step { min-width: 46px; height: 46px; border-radius: 23px; background: #e3e2dc; color: #777;', '.step { min-width: 46px; height: 46px; border-radius: 23px; background: rgba(255,255,255,.8); color: #5b7089;')
rep('#steps { left: 0; right: 0; top: 150px;', '#steps { left: 0; right: 0; top: 100px;')
rep('[1, 2, 3, 4].map(n =>', '[1, 2, 3].map(n =>')
rep('const COL = { blue: ["var(--blue)", "#d4e2ff"], green: ["var(--green)", "#d3f1df"], red: ["var(--red)", "#ffd9da"] };',
    'const COL = { blue: ["#fff", "#1d63ed"], green: ["#fff", "#1fa971"], red: ["#fff", "#e5484d"], orange: ["#fff", "#ff7a2f"] };')
dock = '''  <svg id="dock" class="abs" style="left:0;bottom:0" width="1080" height="230" viewBox="0 0 1080 230">
    <rect x="0" y="150" width="1080" height="80" fill="#cfe6f7"/><path d="M0 160 Q 60 150 120 160 T 240 160 T 360 160 T 480 160 T 600 160 T 720 160 T 840 160 T 960 160 T 1080 160" stroke="#9ccbee" stroke-width="5" fill="none"/>
    <rect x="0" y="128" width="1080" height="24" fill="#8aa3bd"/>
    ''' + "".join(f'<rect x="{x}" y="{y}" width="{w}" height="46" rx="5" fill="{c}" opacity=".9"/>' for x, y, w, c in [
        (20, 82, 130, "#ff7a2f"), (156, 82, 130, "#1fa971"), (292, 82, 130, "#1d63ed"), (88, 36, 130, "#e5484d"), (224, 36, 130, "#ffc531"),
        (760, 82, 130, "#1d63ed"), (896, 82, 130, "#ff7a2f"), (828, 36, 130, "#1fa971")]) + '''
  </svg>'''
rep('  <div id="caption" class="abs"></div>', dock + '\n  <div id="caption" class="abs"></div>')
open('05-docker/explainer.html', 'w').write(s)
print("ok")
