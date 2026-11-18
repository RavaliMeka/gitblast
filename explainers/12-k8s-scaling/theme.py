# Arcade theme: pastel lilac with a pixel grid, monospace headlines, blocky highlights and a game dialog-box caption
THEME = {"title": "Kubernetes Scaling and Rolling Updates Explainer", "replace": [
    ('''    background-color: var(--bg);
    background-image: radial-gradient(var(--grid) 3px, transparent 3.5px), radial-gradient(1200px 500px at 50% 0%, #fff8ec, transparent);
    background-size: 60px 60px, 100% 100%;''', '''    background-color: #ece8ff;
    background-image: linear-gradient(rgba(27,27,58,.05) 3px, transparent 3px), linear-gradient(90deg, rgba(27,27,58,.05) 3px, transparent 3px), linear-gradient(180deg, #f3eaff, #e2ecff 55%, #ffe9f2);
    background-size: 54px 54px, 54px 54px, 100% 100%;'''),
    ("color: var(--ink); letter-spacing: -1.5px; }", "color: #1b1b3a; letter-spacing: -1px; font-family: 'DejaVu Sans Mono', monospace; }"),
    ("#title { left: 40px; right: 40px; top: 220px;", "#title { left: 30px; right: 30px; top: 170px; font-size: 58px;"),
    ('.hl::after { content: ""; position: absolute; left: -10px; right: -10px; bottom: -2px; top: 10px; z-index: -1; border-radius: 14px; rotate: -1.5deg; background: var(--mark, #cfe0ff);',
     '.hl::after { content: ""; position: absolute; left: -14px; right: -14px; bottom: -4px; top: 0; z-index: -1; border-radius: 0; rotate: 0deg; border: 5px solid #1b1b3a; box-shadow: 8px 8px 0 #1b1b3a; background: var(--mark, #ff5d8f);'),
    ("  .hl span { position: relative; }", "  .hl span { position: relative; }\n  #title .hl { margin: 0 .35em; }"),
    ("#caption { left: 0; right: 0; top: 1500px;", "#caption { left: 40px; right: 40px; top: 1720px; z-index: 5;"),
    ("#caption div { background: #ffd84a; color: #151515; font-weight: 800; font-size: 52px; padding: 16px 34px 20px; border-radius: 999px; border: 4px solid #151515; box-shadow: 6px 6px 0 #151515;",
     "#caption div { background: #fff; color: #1b1b3a; font-family: 'DejaVu Sans Mono', monospace; font-weight: 700; font-size: 32px; line-height: 1.3; text-align: center; max-width: 980px; padding: 18px 30px 20px; border-radius: 0; border: 6px solid #1b1b3a; box-shadow: 10px 10px 0 #1b1b3a;"),
    ("#prop { left: 470px; top: 560px; width: 580px; height: 860px; }", "#prop { left: 70px; top: 330px; width: 620px; height: 860px; transform: scale(1.5); transform-origin: 0 0; }"),
    ("#char { left: 30px; top: 610px; width: 470px; height: 964px; }", "#char { left: 660px; top: 910px; width: 470px; height: 964px; overflow: visible; z-index: 2; }"),
    (".step.on { background: #151515; color: #ffd84a; letter-spacing: 1px; }", ".step.on { background: #1b1b3a; color: #ffcb47; letter-spacing: 1px; }"),
    (".step { min-width: 46px; height: 46px; border-radius: 23px; background: #e3e2dc; color: #777;", ".step { min-width: 46px; height: 46px; border-radius: 0; background: #fff; border: 4px solid #1b1b3a; color: #1b1b3a;"),
    ("#steps { left: 0; right: 0; top: 150px;", "#steps { left: 0; right: 0; top: 84px;"),
    ('const COL = { blue: ["var(--blue)", "#d4e2ff"], green: ["var(--green)", "#d3f1df"], red: ["var(--red)", "#ffd9da"] };',
     'const COL = { pink: ["#fff", "#ff5d8f"], blue: ["#fff", "#4d7cff"], green: ["#fff", "#2ec27e"], yellow: ["#1b1b3a", "#ffcb47"] };'),
]}
