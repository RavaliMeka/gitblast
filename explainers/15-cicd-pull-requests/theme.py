# Lab theme: clean aqua-white with a honeycomb pattern, pill highlights, lab-label captions with a teal side tab
THEME = {"title": "CI on Pull Requests Explainer", "replace": [
    ('''    background-color: var(--bg);
    background-image: radial-gradient(var(--grid) 3px, transparent 3.5px), radial-gradient(1200px 500px at 50% 0%, #fff8ec, transparent);
    background-size: 60px 60px, 100% 100%;''', '''    background-color: #eefafb;
    background-image: radial-gradient(circle at 50% 50%, transparent 22px, rgba(15,163,177,.10) 23px 25px, transparent 26px), radial-gradient(circle at 0 0, transparent 22px, rgba(15,163,177,.10) 23px 25px, transparent 26px), radial-gradient(900px 700px at 50% 20%, #ffffff, transparent 70%);
    background-size: 90px 90px, 90px 90px, 100% 100%;'''),
    ("color: var(--ink); letter-spacing: -1.5px; }", "color: #16324f; letter-spacing: -1px; }"),
    ("#title { left: 40px; right: 40px; top: 220px;", "#title { left: 40px; right: 40px; top: 170px; font-size: 66px;"),
    ('.hl::after { content: ""; position: absolute; left: -10px; right: -10px; bottom: -2px; top: 10px; z-index: -1; border-radius: 14px; rotate: -1.5deg; background: var(--mark, #cfe0ff);',
     '.hl::after { content: ""; position: absolute; left: -22px; right: -22px; bottom: -4px; top: 2px; z-index: -1; border-radius: 999px; rotate: 0deg; background: radial-gradient(circle 7px at 22px 30%, rgba(255,255,255,.55) 98%, transparent), radial-gradient(circle 4px at 40px 62%, rgba(255,255,255,.45) 98%, transparent), var(--mark, #0fa3b1);'),
    ("  .hl span { position: relative; }", "  .hl span { position: relative; }\n  #title .hl { margin: 0 .4em; }"),
    ("#caption { left: 0; right: 0; top: 1500px;", "#caption { left: 40px; right: 40px; top: 1760px; z-index: 5;"),
    ("#caption div { background: #ffd84a; color: #151515; font-weight: 800; font-size: 52px; padding: 16px 34px 20px; border-radius: 999px; border: 4px solid #151515; box-shadow: 6px 6px 0 #151515;",
     "#caption div { background: #fff; color: #16324f; font-weight: 800; font-size: 38px; line-height: 1.25; text-align: center; max-width: 980px; padding: 18px 34px 22px 50px; border-radius: 14px; border: 3px solid #c5e4ea; border-left: 18px solid #0fa3b1; box-shadow: 0 14px 30px rgba(22,50,79,.12);"),
    ("#prop { left: 470px; top: 560px; width: 580px; height: 860px; }", "#prop { left: 60px; top: 310px; width: 640px; height: 860px; transform: scale(1.5); transform-origin: 0 0; }"),
    ("#char { left: 30px; top: 610px; width: 470px; height: 964px; }", "#char { left: 305px; top: 1010px; width: 470px; height: 964px; overflow: visible; z-index: 2; }"),
    (".step.on { background: #151515; color: #ffd84a; letter-spacing: 1px; }", ".step.on { background: #0fa3b1; color: #fff; letter-spacing: 1px; }"),
    (".step { min-width: 46px; height: 46px; border-radius: 23px; background: #e3e2dc; color: #777;", ".step { min-width: 46px; height: 46px; border-radius: 23px; background: #fff; border: 2px solid #c5e4ea; color: #6c8a9b;"),
    ("#steps { left: 0; right: 0; top: 150px;", "#steps { left: 0; right: 0; top: 90px;"),
    ('const COL = { blue: ["var(--blue)", "#d4e2ff"], green: ["var(--green)", "#d3f1df"], red: ["var(--red)", "#ffd9da"] };',
     'const COL = { teal: ["#fff", "#0fa3b1"], green: ["#fff", "#2fbf71"], red: ["#fff", "#e5383b"], purple: ["#fff", "#7b5ea7"] };'),
]}
