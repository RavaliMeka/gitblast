# Workshop theme: tan pegboard with rows of holes, masking-tape highlights, red toolbox-lid captions
THEME = {"title": "Terraform Modules and Destroy Explainer", "replace": [
    ('''    background-color: var(--bg);
    background-image: radial-gradient(var(--grid) 3px, transparent 3.5px), radial-gradient(1200px 500px at 50% 0%, #fff8ec, transparent);
    background-size: 60px 60px, 100% 100%;''', '''    background-color: #f1e3c4;
    background-image: radial-gradient(circle at 50% 50%, rgba(73,80,87,.30) 0 6px, transparent 7px), linear-gradient(180deg, #f7ecd3, #ecd9b0);
    background-size: 72px 72px, 100% 100%;'''),
    ("color: var(--ink); letter-spacing: -1.5px; }", "color: #212529; letter-spacing: -1px; }"),
    ("#title { left: 40px; right: 40px; top: 220px;", "#title { left: 40px; right: 40px; top: 170px; font-size: 64px;"),
    ('.hl::after { content: ""; position: absolute; left: -10px; right: -10px; bottom: -2px; top: 10px; z-index: -1; border-radius: 14px; rotate: -1.5deg; background: var(--mark, #cfe0ff);',
     '.hl::after { content: ""; position: absolute; left: -20px; right: -20px; bottom: -4px; top: 2px; z-index: -1; border-radius: 0; rotate: -2deg; clip-path: polygon(0 10%, 2% 0, 4% 9%, 96% 3%, 98% 10%, 100% 0, 100% 90%, 98% 100%, 96% 92%, 4% 97%, 2% 90%, 0 100%); background: var(--mark, #ffd43b);'),
    ("  .hl span { position: relative; }", "  .hl span { position: relative; }\n  #title .hl { margin: 0 .35em; }"),
    ("#caption { left: 0; right: 0; top: 1500px;", "#caption { left: 40px; right: 40px; top: 1740px; z-index: 5;"),
    ("#caption div { background: #ffd84a; color: #151515; font-weight: 800; font-size: 52px; padding: 16px 34px 20px; border-radius: 999px; border: 4px solid #151515; box-shadow: 6px 6px 0 #151515;",
     "#caption div { background: #d62828; color: #fff; font-weight: 800; font-size: 38px; line-height: 1.25; text-align: center; max-width: 980px; padding: 18px 36px 22px; border-radius: 14px; border: none; border-top: 14px solid #495057; box-shadow: 0 10px 0 #9d1c1c, 0 22px 30px rgba(33,37,41,.2);"),
    ("#prop { left: 470px; top: 560px; width: 580px; height: 860px; }", "#prop { left: 40px; top: 310px; width: 620px; height: 860px; transform: scale(1.25); transform-origin: 0 0; }"),
    ("#char { left: 30px; top: 610px; width: 470px; height: 964px; }", "#char { left: 660px; top: 910px; width: 470px; height: 964px; overflow: visible; z-index: 2; }"),
    (".step.on { background: #151515; color: #ffd84a; letter-spacing: 1px; }", ".step.on { background: #212529; color: #ffd43b; letter-spacing: 1px; }"),
    (".step { min-width: 46px; height: 46px; border-radius: 23px; background: #e3e2dc; color: #777;", ".step { min-width: 46px; height: 46px; border-radius: 23px; background: #fffdf6; border: 2px solid #dcc99a; color: #8a7d62;"),
    ("#steps { left: 0; right: 0; top: 150px;", "#steps { left: 0; right: 0; top: 90px;"),
    ('const COL = { blue: ["var(--blue)", "#d4e2ff"], green: ["var(--green)", "#d3f1df"], red: ["var(--red)", "#ffd9da"] };',
     'const COL = { tape: ["#212529", "#ffd43b"], red: ["#fff", "#d62828"], teal: ["#fff", "#0a9396"] };'),
]}
