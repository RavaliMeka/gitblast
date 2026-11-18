# Building-blocks theme: sunny yellow with a stud-dot pattern, brick-shaped highlights, green baseplate captions
THEME = {"title": "What is Terraform Explainer", "replace": [
    ('''    background-color: var(--bg);
    background-image: radial-gradient(var(--grid) 3px, transparent 3.5px), radial-gradient(1200px 500px at 50% 0%, #fff8ec, transparent);
    background-size: 60px 60px, 100% 100%;''', '''    background-color: #fff6d6;
    background-image: radial-gradient(circle at 50% 50%, rgba(255,195,0,.30) 0 10px, transparent 11px), linear-gradient(180deg, #fffbe9, #ffefc2);
    background-size: 64px 64px, 100% 100%;'''),
    ("color: var(--ink); letter-spacing: -1.5px; }", "color: #22223b; letter-spacing: -1px; }"),
    ("#title { left: 40px; right: 40px; top: 220px;", "#title { left: 40px; right: 40px; top: 170px; font-size: 64px;"),
    ('.hl::after { content: ""; position: absolute; left: -10px; right: -10px; bottom: -2px; top: 10px; z-index: -1; border-radius: 14px; rotate: -1.5deg; background: var(--mark, #cfe0ff);',
     '.hl::after { content: ""; position: absolute; left: -16px; right: -16px; bottom: -6px; top: 0; z-index: -1; border-radius: 8px; rotate: 0deg; background: var(--mark, #1d7dd8); box-shadow: inset 0 9px 0 rgba(255,255,255,.3), 0 8px 0 rgba(34,34,59,.22);'),
    ("  .hl span { position: relative; }", "  .hl span { position: relative; }\n  #title .hl { margin: 0 .32em; }"),
    ("#caption { left: 0; right: 0; top: 1500px;", "#caption { left: 40px; right: 40px; top: 1740px; z-index: 5;"),
    ("#caption div { background: #ffd84a; color: #151515; font-weight: 800; font-size: 52px; padding: 16px 34px 20px; border-radius: 999px; border: 4px solid #151515; box-shadow: 6px 6px 0 #151515;",
     "#caption div { background: radial-gradient(circle 7px at 50% 50%, rgba(255,255,255,.16) 98%, transparent) 0 0 / 30px 30px, #2bb673; color: #fff; font-weight: 800; font-size: 38px; line-height: 1.25; text-align: center; max-width: 980px; padding: 18px 36px 22px; border-radius: 14px; border: none; box-shadow: 0 10px 0 #1e8a56, 0 22px 30px rgba(34,34,59,.18);"),
    ("#prop { left: 470px; top: 560px; width: 580px; height: 860px; }", "#prop { left: 40px; top: 310px; width: 620px; height: 860px; transform: scale(1.25); transform-origin: 0 0; }"),
    ("#char { left: 30px; top: 610px; width: 470px; height: 964px; }", "#char { left: 660px; top: 910px; width: 470px; height: 964px; overflow: visible; z-index: 2; }"),
    (".step.on { background: #151515; color: #ffd84a; letter-spacing: 1px; }", ".step.on { background: #e63946; color: #fff; letter-spacing: 1px; }"),
    (".step { min-width: 46px; height: 46px; border-radius: 23px; background: #e3e2dc; color: #777;", ".step { min-width: 46px; height: 46px; border-radius: 10px; background: #fff; border: 2px solid #eadfb8; color: #7b7f9e;"),
    ("#steps { left: 0; right: 0; top: 150px;", "#steps { left: 0; right: 0; top: 90px;"),
    ('const COL = { blue: ["var(--blue)", "#d4e2ff"], green: ["var(--green)", "#d3f1df"], red: ["var(--red)", "#ffd9da"] };',
     'const COL = { blue: ["#fff", "#1d7dd8"], red: ["#fff", "#e63946"], green: ["#fff", "#2bb673"], yellow: ["#22223b", "#ffc300"] };'),
]}
