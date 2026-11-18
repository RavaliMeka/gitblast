# Library-ledger theme: ruled parchment with a red margin line, serif headlines, rubber-stamp highlights, index-card captions
THEME = {"title": "Terraform State and Variables Explainer", "replace": [
    ('''    background-color: var(--bg);
    background-image: radial-gradient(var(--grid) 3px, transparent 3.5px), radial-gradient(1200px 500px at 50% 0%, #fff8ec, transparent);
    background-size: 60px 60px, 100% 100%;''', '''    background-color: #fdf6e3;
    background-image: linear-gradient(90deg, transparent 84px, rgba(157,2,8,.28) 84px 87px, transparent 87px), repeating-linear-gradient(180deg, transparent 0 68px, rgba(43,45,66,.10) 68px 70px);
    background-size: 100% 100%;'''),
    ("color: var(--ink); letter-spacing: -1.5px; }", "color: #2b2d42; letter-spacing: -.5px; font-family: 'DejaVu Serif', Georgia, serif; }"),
    ("#title { left: 40px; right: 40px; top: 220px;", "#title { left: 40px; right: 40px; top: 170px; font-size: 60px;"),
    ('.hl::after { content: ""; position: absolute; left: -10px; right: -10px; bottom: -2px; top: 10px; z-index: -1; border-radius: 14px; rotate: -1.5deg; background: var(--mark, #cfe0ff);',
     '.hl::after { content: ""; position: absolute; left: -16px; right: -16px; bottom: -8px; top: -2px; z-index: -1; border-radius: 10px; rotate: -2.5deg; border: 6px double var(--mark, #9d0208); background: rgba(255,255,255,.6);'),
    ("  .hl span { position: relative; }", "  .hl span { position: relative; }\n  #title .hl { margin: 0 .35em; }"),
    ("#caption { left: 0; right: 0; top: 1500px;", "#caption { left: 40px; right: 40px; top: 1750px; z-index: 5;"),
    ("#caption div { background: #ffd84a; color: #151515; font-weight: 800; font-size: 52px; padding: 16px 34px 20px; border-radius: 999px; border: 4px solid #151515; box-shadow: 6px 6px 0 #151515;",
     "#caption div { background: repeating-linear-gradient(180deg, #ffffff 0 48px, #cfe1f5 48px 50px); color: #2b2d42; font-family: 'DejaVu Serif', Georgia, serif; font-weight: 700; font-size: 33px; line-height: 50px; text-align: center; max-width: 980px; padding: 4px 36px 8px; border-radius: 6px; border: none; border-top: 12px solid #9d0208; box-shadow: 0 14px 30px rgba(43,45,66,.18);"),
    ("#prop { left: 470px; top: 560px; width: 580px; height: 860px; }", "#prop { left: 60px; top: 320px; width: 640px; height: 860px; transform: scale(1.5); transform-origin: 0 0; }"),
    ("#char { left: 30px; top: 610px; width: 470px; height: 964px; }", "#char { left: 305px; top: 1010px; width: 470px; height: 964px; overflow: visible; z-index: 2; }"),
    (".step.on { background: #151515; color: #ffd84a; letter-spacing: 1px; }", ".step.on { background: #9d0208; color: #fff; letter-spacing: 1px; }"),
    (".step { min-width: 46px; height: 46px; border-radius: 23px; background: #e3e2dc; color: #777;", ".step { min-width: 46px; height: 46px; border-radius: 6px; background: #fffdf5; border: 2px solid #e0d6b8; color: #7d7a6d;"),
    ("#steps { left: 0; right: 0; top: 150px;", "#steps { left: 0; right: 0; top: 90px;"),
    ('const COL = { blue: ["var(--blue)", "#d4e2ff"], green: ["var(--green)", "#d3f1df"], red: ["var(--red)", "#ffd9da"] };',
     'const COL = { red: ["#9d0208", "#9d0208"], green: ["#386641", "#386641"], navy: ["#2b2d42", "#2b2d42"] };'),
]}
