# Greenhouse theme: soft sage with white glass-pane lines, leaf-shaped highlights, wooden-plank captions
THEME = {"title": "Kubernetes Pods and Deployments Explainer", "replace": [
    ('''    background-color: var(--bg);
    background-image: radial-gradient(var(--grid) 3px, transparent 3.5px), radial-gradient(1200px 500px at 50% 0%, #fff8ec, transparent);
    background-size: 60px 60px, 100% 100%;''', '''    background-color: #e3f1e6;
    background-image: linear-gradient(rgba(255,255,255,.75) 6px, transparent 6px), linear-gradient(90deg, rgba(255,255,255,.75) 6px, transparent 6px), radial-gradient(800px 600px at 80% 0%, rgba(255,241,190,.7), transparent 70%), linear-gradient(180deg, #d8ecdd, #eef7ee 60%, #dcecd9);
    background-size: 270px 320px, 270px 320px, 100% 100%, 100% 100%;'''),
    ("color: var(--ink); letter-spacing: -1.5px; }", "color: #23402f; letter-spacing: -1px; }"),
    ("#title { left: 40px; right: 40px; top: 220px;", "#title { left: 40px; right: 40px; top: 160px; font-size: 66px;"),
    ('.hl::after { content: ""; position: absolute; left: -10px; right: -10px; bottom: -2px; top: 10px; z-index: -1; border-radius: 14px; rotate: -1.5deg; background: var(--mark, #cfe0ff);',
     '.hl::after { content: ""; position: absolute; left: -18px; right: -18px; bottom: -4px; top: 2px; z-index: -1; border-radius: 4px 30px 4px 30px; rotate: -1deg; background: var(--mark, #3a9d5d);'),
    ("  .hl span { position: relative; }", "  .hl span { position: relative; }\n  #title .hl { margin: 0 .3em; }"),
    ("#caption { left: 0; right: 0; top: 1500px;", "#caption { left: 40px; right: 40px; top: 1750px; z-index: 5;"),
    ("#caption div { background: #ffd84a; color: #151515; font-weight: 800; font-size: 52px; padding: 16px 34px 20px; border-radius: 999px; border: 4px solid #151515; box-shadow: 6px 6px 0 #151515;",
     "#caption div { background: repeating-linear-gradient(90deg, #b08968 0 180px, #a67c5b 180px 184px); color: #fff; font-weight: 800; font-size: 38px; line-height: 1.25; text-align: center; max-width: 980px; padding: 18px 36px 22px; border-radius: 12px; border: none; box-shadow: 0 8px 0 #7f5539, 0 18px 30px rgba(35,64,47,.2);"),
    ("#prop { left: 470px; top: 560px; width: 580px; height: 860px; }", "#prop { left: 106px; top: 300px; width: 620px; height: 860px; transform: scale(1.4); transform-origin: 0 0; }"),
    ("#char { left: 30px; top: 610px; width: 470px; height: 964px; }", "#char { left: 640px; top: 930px; width: 470px; height: 964px; overflow: visible; z-index: 2; }"),
    (".step.on { background: #151515; color: #ffd84a; letter-spacing: 1px; }", ".step.on { background: #3a9d5d; color: #fff; letter-spacing: 1px; }"),
    (".step { min-width: 46px; height: 46px; border-radius: 23px; background: #e3e2dc; color: #777;", ".step { min-width: 46px; height: 46px; border-radius: 23px; background: rgba(255,255,255,.85); color: #6f8676;"),
    ("#steps { left: 0; right: 0; top: 150px;", "#steps { left: 0; right: 0; top: 80px;"),
    ('const COL = { blue: ["var(--blue)", "#d4e2ff"], green: ["var(--green)", "#d3f1df"], red: ["var(--red)", "#ffd9da"] };',
     'const COL = { green: ["#fff", "#3a9d5d"], terra: ["#fff", "#c8693f"], red: ["#fff", "#d1495b"], blue: ["#fff", "#3a86ff"] };'),
]}
