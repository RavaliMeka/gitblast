# Launch-pad theme: dawn sky (peach to pale blue) with soft clouds, mission-patch highlights, mission-control captions
THEME = {"title": "CD and Secrets with GitHub Actions Explainer", "replace": [
    ('''    background-color: var(--bg);
    background-image: radial-gradient(var(--grid) 3px, transparent 3.5px), radial-gradient(1200px 500px at 50% 0%, #fff8ec, transparent);
    background-size: 60px 60px, 100% 100%;''', '''    background: radial-gradient(380px 120px at 20% 34%, rgba(255,255,255,.85), transparent 70%), radial-gradient(460px 130px at 84% 52%, rgba(255,255,255,.8), transparent 70%),
      radial-gradient(700px 500px at 50% 100%, rgba(255,107,53,.22), transparent 70%), linear-gradient(180deg, #cfe3ff 0%, #e8efff 40%, #ffe9dc 78%, #ffd9c2 100%);'''),
    ("color: var(--ink); letter-spacing: -1.5px; }", "color: #1d3557; letter-spacing: -1px; }"),
    ("#title { left: 40px; right: 40px; top: 220px;", "#title { left: 40px; right: 40px; top: 170px; font-size: 64px;"),
    ('.hl::after { content: ""; position: absolute; left: -10px; right: -10px; bottom: -2px; top: 10px; z-index: -1; border-radius: 14px; rotate: -1.5deg; background: var(--mark, #cfe0ff);',
     '.hl::after { content: ""; position: absolute; left: -20px; right: -20px; bottom: -6px; top: 0; z-index: -1; border-radius: 14px; rotate: -1deg; background: var(--mark, #ff6b35); box-shadow: inset 0 0 0 4px rgba(255,255,255,.55), 0 0 0 4px var(--mark, #ff6b35);'),
    ("  .hl span { position: relative; }", "  .hl span { position: relative; }\n  #title .hl { margin: 0 .4em; }"),
    ("#caption { left: 0; right: 0; top: 1500px;", "#caption { left: 40px; right: 40px; top: 1750px; z-index: 5;"),
    ("#caption div { background: #ffd84a; color: #151515; font-weight: 800; font-size: 52px; padding: 16px 34px 20px; border-radius: 999px; border: 4px solid #151515; box-shadow: 6px 6px 0 #151515;",
     "#caption div { background: #1d3557; color: #fff; font-weight: 800; font-size: 38px; line-height: 1.25; text-align: center; max-width: 980px; padding: 18px 36px 22px; border-radius: 16px; border: none; border-bottom: 8px solid #ff6b35; box-shadow: 0 14px 30px rgba(29,53,87,.3);"),
    ("#prop { left: 470px; top: 560px; width: 580px; height: 860px; }", "#prop { left: 106px; top: 300px; width: 620px; height: 860px; transform: scale(1.4); transform-origin: 0 0; }"),
    ("#char { left: 30px; top: 610px; width: 470px; height: 964px; }", "#char { left: -30px; top: 950px; width: 470px; height: 964px; overflow: visible; z-index: 2; }"),
    (".step.on { background: #151515; color: #ffd84a; letter-spacing: 1px; }", ".step.on { background: #ff6b35; color: #fff; letter-spacing: 1px; }"),
    (".step { min-width: 46px; height: 46px; border-radius: 23px; background: #e3e2dc; color: #777;", ".step { min-width: 46px; height: 46px; border-radius: 23px; background: rgba(255,255,255,.85); color: #7a8ba3;"),
    ("#steps { left: 0; right: 0; top: 150px;", "#steps { left: 0; right: 0; top: 90px;"),
    ('const COL = { blue: ["var(--blue)", "#d4e2ff"], green: ["var(--green)", "#d3f1df"], red: ["var(--red)", "#ffd9da"] };',
     'const COL = { orange: ["#fff", "#ff6b35"], violet: ["#fff", "#6a4c93"], red: ["#fff", "#d90429"], green: ["#fff", "#2ba84a"] };'),
]}
