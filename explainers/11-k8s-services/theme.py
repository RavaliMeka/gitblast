# Bistro theme: warm cream wall, striped awning along the top, serif headlines on ribbon highlights, menu-card captions
THEME = {"title": "Kubernetes Services and Ingress Explainer", "replace": [
    ('''    background-color: var(--bg);
    background-image: radial-gradient(var(--grid) 3px, transparent 3.5px), radial-gradient(1200px 500px at 50% 0%, #fff8ec, transparent);
    background-size: 60px 60px, 100% 100%;''', '''    background-color: #fbefdc;
    background-image: radial-gradient(700px 500px at 50% 28%, #fff8ea, transparent 70%), repeating-linear-gradient(90deg, rgba(178,58,72,.035) 0 90px, transparent 90px 180px);
    background-size: 100% 100%, auto;'''),
    ("color: var(--ink); letter-spacing: -1.5px; }", "color: #3b2a25; letter-spacing: -.5px; font-family: 'DejaVu Serif', Georgia, serif; }"),
    ("#title { left: 40px; right: 40px; top: 220px;", "#title { left: 40px; right: 40px; top: 190px; font-size: 62px;"),
    ('.hl::after { content: ""; position: absolute; left: -10px; right: -10px; bottom: -2px; top: 10px; z-index: -1; border-radius: 14px; rotate: -1.5deg; background: var(--mark, #cfe0ff);',
     '.hl::after { content: ""; position: absolute; left: -26px; right: -26px; bottom: -6px; top: 0; z-index: -1; border-radius: 0; rotate: -1deg; clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 50%, 100% 100%, 0 100%, 16px 50%); background: var(--mark, #b23a48);'),
    ("  .hl span { position: relative; }", "  .hl span { position: relative; }\n  #title .hl { margin: 0 .45em; }"),
    ("#caption { left: 0; right: 0; top: 1500px;", "#caption { left: 40px; right: 40px; top: 1760px; z-index: 5;"),
    ("#caption div { background: #ffd84a; color: #151515; font-weight: 800; font-size: 52px; padding: 16px 34px 20px; border-radius: 999px; border: 4px solid #151515; box-shadow: 6px 6px 0 #151515;",
     "#caption div { background: #fffaf2; color: #3b2a25; font-family: 'DejaVu Serif', Georgia, serif; font-weight: 700; font-size: 34px; line-height: 1.3; text-align: center; max-width: 980px; padding: 18px 38px 22px; border-radius: 8px; border: 3px solid #d9a441; outline: 2px solid #d9a441; outline-offset: -12px; box-shadow: 0 14px 30px rgba(59,42,37,.15);"),
    ("#prop { left: 470px; top: 560px; width: 580px; height: 860px; }", "#prop { left: 60px; top: 330px; width: 640px; height: 860px; transform: scale(1.5); transform-origin: 0 0; }"),
    ("#char { left: 30px; top: 610px; width: 470px; height: 964px; }", "#char { left: 305px; top: 1010px; width: 470px; height: 964px; overflow: visible; z-index: 2; }"),
    (".step.on { background: #151515; color: #ffd84a; letter-spacing: 1px; }", ".step.on { background: #b23a48; color: #fff; letter-spacing: 1px; }"),
    (".step { min-width: 46px; height: 46px; border-radius: 23px; background: #e3e2dc; color: #777;", ".step { min-width: 46px; height: 46px; border-radius: 23px; background: #fffaf2; border: 2px solid #d9a441; color: #8a7468;"),
    ("#steps { left: 0; right: 0; top: 150px;", "#steps { left: 0; right: 0; top: 118px;"),
    ('const COL = { blue: ["var(--blue)", "#d4e2ff"], green: ["var(--green)", "#d3f1df"], red: ["var(--red)", "#ffd9da"] };',
     'const COL = { red: ["#fff", "#b23a48"], gold: ["#3b2a25", "#e9c46a"], green: ["#fff", "#5b8c5a"], blue: ["#fff", "#3a7ca5"] };'),
    ('  <div id="caption" class="abs"></div>', '''  <svg class="abs" style="left:0;top:0" width="1080" height="110" viewBox="0 0 1080 110">''' +
     "".join(f'<path d="M{i * 90} 0 H{i * 90 + 90} V70 a45 30 0 0 1 -90 0 Z" fill="{"#b23a48" if i % 2 == 0 else "#fffaf2"}"/>' for i in range(12)) + '''<rect width="1080" height="10" fill="#3b2a25"/></svg>
  <div id="caption" class="abs"></div>'''),
]}
