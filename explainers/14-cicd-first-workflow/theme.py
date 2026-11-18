# Movie-set theme: warm cream with film-strip edges, marquee-style gold highlights, cinema-subtitle captions
THEME = {"title": "First GitHub Actions Workflow Explainer", "replace": [
    ('''    background-color: var(--bg);
    background-image: radial-gradient(var(--grid) 3px, transparent 3.5px), radial-gradient(1200px 500px at 50% 0%, #fff8ec, transparent);
    background-size: 60px 60px, 100% 100%;''', '''    background-color: #fdf3df;
    background-image: radial-gradient(700px 520px at 50% 22%, rgba(255,236,170,.75), transparent 70%), radial-gradient(900px 700px at 50% 100%, rgba(193,18,31,.07), transparent 70%);
    background-size: 100% 100%;'''),
    ("color: var(--ink); letter-spacing: -1.5px; }", "color: #1c1917; letter-spacing: -1px; }"),
    ("#title { left: 40px; right: 40px; top: 220px;", "#title { left: 70px; right: 70px; top: 170px; font-size: 62px;"),
    ('.hl::after { content: ""; position: absolute; left: -10px; right: -10px; bottom: -2px; top: 10px; z-index: -1; border-radius: 14px; rotate: -1.5deg; background: var(--mark, #cfe0ff);',
     '.hl::after { content: ""; position: absolute; left: -16px; right: -16px; bottom: -6px; top: 0; z-index: -1; border-radius: 10px; rotate: -1deg; background: radial-gradient(circle 4px at 8px 8px, rgba(255,255,255,.9) 98%, transparent) 0 0 / 22px 100% repeat-x, var(--mark, #e0a82e); box-shadow: 0 6px 0 rgba(28,25,23,.85);'),
    ("  .hl span { position: relative; }", "  .hl span { position: relative; }\n  #title .hl { margin: 0 .3em; }"),
    ("#caption { left: 0; right: 0; top: 1500px;", "#caption { left: 70px; right: 70px; top: 1740px; z-index: 5;"),
    ("#caption div { background: #ffd84a; color: #151515; font-weight: 800; font-size: 52px; padding: 16px 34px 20px; border-radius: 999px; border: 4px solid #151515; box-shadow: 6px 6px 0 #151515;",
     "#caption div { background: rgba(28,25,23,.88); color: #ffe9a8; font-weight: 700; font-size: 38px; line-height: 1.25; text-align: center; max-width: 900px; padding: 16px 34px 20px; border-radius: 8px; border: none; box-shadow: none;"),
    ("#prop { left: 470px; top: 560px; width: 580px; height: 860px; }", "#prop { left: 106px; top: 300px; width: 620px; height: 860px; transform: scale(1.4); transform-origin: 0 0; }"),
    ("#char { left: 30px; top: 610px; width: 470px; height: 964px; }", "#char { left: 20px; top: 930px; width: 470px; height: 964px; overflow: visible; z-index: 2; }"),
    (".step.on { background: #151515; color: #ffd84a; letter-spacing: 1px; }", ".step.on { background: #c1121f; color: #fff; letter-spacing: 1px; }"),
    (".step { min-width: 46px; height: 46px; border-radius: 23px; background: #e3e2dc; color: #777;", ".step { min-width: 46px; height: 46px; border-radius: 23px; background: #fffaf0; border: 2px solid #e7dcc8; color: #8d8478;"),
    ("#steps { left: 0; right: 0; top: 150px;", "#steps { left: 0; right: 0; top: 90px;"),
    ('const COL = { blue: ["var(--blue)", "#d4e2ff"], green: ["var(--green)", "#d3f1df"], red: ["var(--red)", "#ffd9da"] };',
     'const COL = { gold: ["#1c1917", "#e0a82e"], red: ["#fff", "#c1121f"], green: ["#fff", "#2d9d5f"] };'),
    ('  <div id="caption" class="abs"></div>', '''  <div class="abs" style="left:0;top:0;bottom:0;width:46px;background:radial-gradient(circle at 50% 50%, #fdf3df 0 9px, transparent 10px) 0 0/46px 64px, #1c1917"></div>
  <div class="abs" style="right:0;top:0;bottom:0;width:46px;background:radial-gradient(circle at 50% 50%, #fdf3df 0 9px, transparent 10px) 0 0/46px 64px, #1c1917"></div>
  <div id="caption" class="abs"></div>'''),
]}
