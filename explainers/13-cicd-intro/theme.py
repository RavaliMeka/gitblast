# Factory theme: light steel-grey wall with a hazard-stripe floor line, yellow safety-sign highlights, riveted steel-plate captions
THEME = {"title": "What is CI/CD Explainer", "replace": [
    ('''    background-color: var(--bg);
    background-image: radial-gradient(var(--grid) 3px, transparent 3.5px), radial-gradient(1200px 500px at 50% 0%, #fff8ec, transparent);
    background-size: 60px 60px, 100% 100%;''', '''    background-color: #eceff1;
    background-image: linear-gradient(rgba(55,71,79,.06) 2px, transparent 2px), radial-gradient(900px 600px at 50% 25%, #ffffff, transparent 70%), linear-gradient(180deg, #e3e8eb, #f4f6f7 50%, #dfe5e8);
    background-size: 100% 120px, 100% 100%, 100% 100%;'''),
    ("color: var(--ink); letter-spacing: -1.5px; }", "color: #37474f; letter-spacing: -1px; }"),
    ("#title { left: 40px; right: 40px; top: 220px;", "#title { left: 40px; right: 40px; top: 170px; font-size: 64px;"),
    ('.hl::after { content: ""; position: absolute; left: -10px; right: -10px; bottom: -2px; top: 10px; z-index: -1; border-radius: 14px; rotate: -1.5deg; background: var(--mark, #cfe0ff);',
     '.hl::after { content: ""; position: absolute; left: -14px; right: -14px; bottom: -6px; top: 0; z-index: -1; border-radius: 6px; rotate: 0deg; border-bottom: 10px solid transparent; border-image: repeating-linear-gradient(135deg, #37474f 0 10px, #ffc300 10px 20px) 10; background: var(--mark, #ffc300); background-clip: padding-box;'),
    ("  .hl span { position: relative; }", "  .hl span { position: relative; }\n  #title .hl { margin: 0 .28em; }"),
    ("#caption { left: 0; right: 0; top: 1500px;", "#caption { left: 40px; right: 40px; top: 1730px; z-index: 5;"),
    ("#caption div { background: #ffd84a; color: #151515; font-weight: 800; font-size: 52px; padding: 16px 34px 20px; border-radius: 999px; border: 4px solid #151515; box-shadow: 6px 6px 0 #151515;",
     "#caption div { background: radial-gradient(circle 7px at 18px 18px, #b0bec5 98%, transparent), radial-gradient(circle 7px at calc(100% - 18px) 18px, #b0bec5 98%, transparent), radial-gradient(circle 7px at 18px calc(100% - 18px), #b0bec5 98%, transparent), radial-gradient(circle 7px at calc(100% - 18px) calc(100% - 18px), #b0bec5 98%, transparent), linear-gradient(180deg, #455a64, #37474f); color: #fff; font-weight: 800; font-size: 38px; line-height: 1.25; text-align: center; max-width: 980px; padding: 22px 48px 26px; border-radius: 10px; border: none; box-shadow: 0 14px 30px rgba(55,71,79,.3);"),
    ("#prop { left: 470px; top: 560px; width: 580px; height: 860px; }", "#prop { left: 40px; top: 310px; width: 620px; height: 860px; transform: scale(1.25); transform-origin: 0 0; }"),
    ("#char { left: 30px; top: 610px; width: 470px; height: 964px; }", "#char { left: 660px; top: 910px; width: 470px; height: 964px; overflow: visible; z-index: 2; }"),
    (".step.on { background: #151515; color: #ffd84a; letter-spacing: 1px; }", ".step.on { background: #37474f; color: #ffc300; letter-spacing: 1px; }"),
    (".step { min-width: 46px; height: 46px; border-radius: 23px; background: #e3e2dc; color: #777;", ".step { min-width: 46px; height: 46px; border-radius: 8px; background: #fff; border: 2px solid #cfd8dc; color: #78909c;"),
    ("#steps { left: 0; right: 0; top: 150px;", "#steps { left: 0; right: 0; top: 90px;"),
    ('const COL = { blue: ["var(--blue)", "#d4e2ff"], green: ["var(--green)", "#d3f1df"], red: ["var(--red)", "#ffd9da"] };',
     'const COL = { yellow: ["#37474f", "#ffc300"], green: ["#fff", "#2a9d5c"], orange: ["#fff", "#f77f00"], red: ["#fff", "#d62839"] };'),
    ('  <div id="caption" class="abs"></div>', '''  <div class="abs" style="left:0;right:0;bottom:0;height:44px;background:repeating-linear-gradient(135deg,#37474f 0 30px,#ffc300 30px 60px)"></div>
  <div id="caption" class="abs"></div>'''),
]}
