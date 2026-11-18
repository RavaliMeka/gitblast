# Trail-map theme: parchment with green contour lines, wooden-signpost highlights, forest-green captions
THEME = {"title": "Terraform init, plan, apply Explainer", "replace": [
    ('''    background-color: var(--bg);
    background-image: radial-gradient(var(--grid) 3px, transparent 3.5px), radial-gradient(1200px 500px at 50% 0%, #fff8ec, transparent);
    background-size: 60px 60px, 100% 100%;''', '''    background-color: #f3edd7;
    background-image: repeating-radial-gradient(ellipse 70% 45% at 25% 30%, transparent 0 46px, rgba(45,106,79,.10) 46px 49px), repeating-radial-gradient(ellipse 60% 50% at 85% 80%, transparent 0 54px, rgba(45,106,79,.08) 54px 57px);
    background-size: 100% 100%;'''),
    ("color: var(--ink); letter-spacing: -1.5px; }", "color: #283618; letter-spacing: -1px; }"),
    ("#title { left: 40px; right: 40px; top: 220px;", "#title { left: 40px; right: 40px; top: 170px; font-size: 64px;"),
    ('.hl::after { content: ""; position: absolute; left: -10px; right: -10px; bottom: -2px; top: 10px; z-index: -1; border-radius: 14px; rotate: -1.5deg; background: var(--mark, #cfe0ff);',
     '.hl::after { content: ""; position: absolute; left: -16px; right: -40px; bottom: -6px; top: 0; z-index: -1; border-radius: 6px 0 0 6px; rotate: 0deg; clip-path: polygon(0 0, calc(100% - 28px) 0, 100% 50%, calc(100% - 28px) 100%, 0 100%); background: var(--mark, #7f5539);'),
    ("  .hl span { position: relative; }", "  .hl span { position: relative; }\n  #title .hl { margin: 0 .55em 0 .3em; }"),
    ("#caption { left: 0; right: 0; top: 1500px;", "#caption { left: 40px; right: 40px; top: 1750px; z-index: 5;"),
    ("#caption div { background: #ffd84a; color: #151515; font-weight: 800; font-size: 52px; padding: 16px 34px 20px; border-radius: 999px; border: 4px solid #151515; box-shadow: 6px 6px 0 #151515;",
     "#caption div { background: #283618; color: #fefae0; font-weight: 800; font-size: 38px; line-height: 1.25; text-align: center; max-width: 980px; padding: 18px 40px 22px; border-radius: 44px 12px 44px 12px; border: none; box-shadow: 0 0 0 5px #606c38, 0 14px 30px rgba(40,54,24,.25);"),
    ("#prop { left: 470px; top: 560px; width: 580px; height: 860px; }", "#prop { left: 106px; top: 300px; width: 620px; height: 860px; transform: scale(1.4); transform-origin: 0 0; }"),
    ("#char { left: 30px; top: 610px; width: 470px; height: 964px; }", "#char { left: -30px; top: 960px; width: 470px; height: 964px; overflow: visible; z-index: 2; }"),
    (".step.on { background: #151515; color: #ffd84a; letter-spacing: 1px; }", ".step.on { background: #2d6a4f; color: #fefae0; letter-spacing: 1px; }"),
    (".step { min-width: 46px; height: 46px; border-radius: 23px; background: #e3e2dc; color: #777;", ".step { min-width: 46px; height: 46px; border-radius: 23px; background: #fefae0; border: 2px solid #ddd3ad; color: #7c8466;"),
    ("#steps { left: 0; right: 0; top: 150px;", "#steps { left: 0; right: 0; top: 90px;"),
    ('const COL = { blue: ["var(--blue)", "#d4e2ff"], green: ["var(--green)", "#d3f1df"], red: ["var(--red)", "#ffd9da"] };',
     'const COL = { wood: ["#fefae0", "#7f5539"], green: ["#fefae0", "#2d6a4f"], orange: ["#fff", "#e76f51"] };'),
]}
