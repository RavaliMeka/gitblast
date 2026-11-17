# Blueprint theme: pale drafting paper with a blue grid, line drawings, outlined key words, monospace captions
THEME = {"title": "Docker Ports and Volumes Explainer", "replace": [
    ('''    background-color: var(--bg);
    background-image: radial-gradient(var(--grid) 3px, transparent 3.5px), radial-gradient(1200px 500px at 50% 0%, #fff8ec, transparent);
    background-size: 60px 60px, 100% 100%;''', '''    background-color: #f2f7fd;
    background-image: linear-gradient(rgba(30,85,168,.16) 2px, transparent 2px), linear-gradient(90deg, rgba(30,85,168,.16) 2px, transparent 2px),
      linear-gradient(rgba(30,85,168,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(30,85,168,.07) 1px, transparent 1px);
    background-size: 150px 150px, 150px 150px, 30px 30px, 30px 30px;'''),
    ("color: var(--ink); letter-spacing: -1.5px; }", "color: #1e55a8; letter-spacing: 0; text-transform: uppercase; }"),
    ("#title { left: 40px; right: 40px; top: 220px;", "#title { left: 40px; right: 40px; top: 160px; font-size: 58px;"),
    ('.hl::after { content: ""; position: absolute; left: -10px; right: -10px; bottom: -2px; top: 10px; z-index: -1; border-radius: 14px; rotate: -1.5deg; background: var(--mark, #cfe0ff);',
     '.hl::after { content: ""; position: absolute; left: -14px; right: -14px; bottom: -6px; top: 2px; z-index: -1; border-radius: 0; rotate: 0deg; background: rgba(255,255,255,.7); border: 4px solid var(--mark, #1e55a8);'),
    ("  .hl span { position: relative; }", "  .hl span { position: relative; }\n  #title .hl { margin: 0 .3em; }"),
    ("#caption { left: 0; right: 0; top: 1500px;", "#caption { left: 40px; right: 40px; top: 1770px; z-index: 5;"),
    ("#caption div { background: #ffd84a; color: #151515; font-weight: 800; font-size: 52px; padding: 16px 34px 20px; border-radius: 999px; border: 4px solid #151515; box-shadow: 6px 6px 0 #151515;",
     "#caption div { background: #fff; color: #1e55a8; font-family: 'DejaVu Sans Mono', monospace; font-weight: 700; font-size: 32px; line-height: 1.3; text-align: center; max-width: 980px; padding: 16px 28px 18px; border-radius: 0; border: 4px solid #1e55a8; box-shadow: 8px 8px 0 rgba(30,85,168,.18);"),
    ("#prop { left: 470px; top: 560px; width: 580px; height: 860px; }", "#prop { left: 60px; top: 290px; width: 640px; height: 860px; transform: scale(1.5); transform-origin: 0 0; }"),
    ("#char { left: 30px; top: 610px; width: 470px; height: 964px; }", "#char { left: 305px; top: 1010px; width: 470px; height: 964px; overflow: visible; z-index: 2; }"),
    (".step.on { background: #151515; color: #ffd84a; letter-spacing: 1px; }", ".step.on { background: #1e55a8; color: #fff; letter-spacing: 1px; }"),
    (".step { min-width: 46px; height: 46px; border-radius: 23px; background: #e3e2dc; color: #777;", ".step { min-width: 46px; height: 46px; border-radius: 0; background: #fff; border: 3px solid #9db6db; color: #1e55a8;"),
    ("#steps { left: 0; right: 0; top: 150px;", "#steps { left: 0; right: 0; top: 80px;"),
    ('const COL = { blue: ["var(--blue)", "#d4e2ff"], green: ["var(--green)", "#d3f1df"], red: ["var(--red)", "#ffd9da"] };',
     'const COL = { blue: ["#1e55a8", "#1e55a8"], green: ["#1f9d6b", "#1f9d6b"], red: ["#d6453d", "#d6453d"], orange: ["#f08a24", "#f08a24"] };'),
]}
