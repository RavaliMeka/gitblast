# Concert theme: warm ivory sheet-music paper (faint staff lines), serif headlines on gold ticket highlights, ticket-stub captions
THEME = {"title": "Docker Compose Explainer", "replace": [
    ('''    background-color: var(--bg);
    background-image: radial-gradient(var(--grid) 3px, transparent 3.5px), radial-gradient(1200px 500px at 50% 0%, #fff8ec, transparent);
    background-size: 60px 60px, 100% 100%;''', '''    background-color: #fdf6e9;
    background-image: repeating-linear-gradient(180deg, transparent 0 96px, rgba(140,28,58,.07) 96px 98px, transparent 98px 112px, rgba(140,28,58,.07) 112px 114px, transparent 114px 128px, rgba(140,28,58,.07) 128px 130px, transparent 130px 144px, rgba(140,28,58,.07) 144px 146px, transparent 146px 160px, rgba(140,28,58,.07) 160px 162px, transparent 162px 260px),
      radial-gradient(900px 500px at 50% 0%, rgba(201,151,31,.16), transparent 70%);
    background-size: auto, 100% 100%;'''),
    ("color: var(--ink); letter-spacing: -1.5px; }", "color: #1f2a44; letter-spacing: -.5px; font-family: 'DejaVu Serif', Georgia, serif; }"),
    ("#title { left: 40px; right: 40px; top: 220px;", "#title { left: 40px; right: 40px; top: 160px; font-size: 62px;"),
    ('.hl::after { content: ""; position: absolute; left: -10px; right: -10px; bottom: -2px; top: 10px; z-index: -1; border-radius: 14px; rotate: -1.5deg; background: var(--mark, #cfe0ff);',
     '.hl::after { content: ""; position: absolute; left: -16px; right: -16px; bottom: -6px; top: 2px; z-index: -1; border-radius: 10px; rotate: -1deg; background: var(--mark, #c9971f); -webkit-mask: radial-gradient(circle 9px at 0 50%, transparent 98%, #000) left / 51% 100% no-repeat, radial-gradient(circle 9px at 100% 50%, transparent 98%, #000) right / 51% 100% no-repeat;'),
    ("  .hl span { position: relative; }", "  .hl span { position: relative; }\n  #title .hl { margin: 0 .3em; }"),
    ("#caption { left: 0; right: 0; top: 1500px;", "#caption { left: 40px; right: 40px; top: 1770px; z-index: 5;"),
    ("#caption div { background: #ffd84a; color: #151515; font-weight: 800; font-size: 52px; padding: 16px 34px 20px; border-radius: 999px; border: 4px solid #151515; box-shadow: 6px 6px 0 #151515;",
     "#caption div { background: #8c1c3a; color: #fff6e0; font-family: 'DejaVu Serif', Georgia, serif; font-weight: 700; font-size: 34px; line-height: 1.3; text-align: center; max-width: 980px; padding: 18px 40px 22px; border-radius: 12px; border: 3px dashed #e8c76a; outline: 6px solid #8c1c3a; box-shadow: 0 14px 30px rgba(140,28,58,.25);"),
    ("#prop { left: 470px; top: 560px; width: 580px; height: 860px; }", "#prop { left: 106px; top: 290px; width: 620px; height: 860px; transform: scale(1.4); transform-origin: 0 0; }"),
    ("#char { left: 30px; top: 610px; width: 470px; height: 964px; }", "#char { left: -40px; top: 860px; width: 470px; height: 964px; overflow: visible; z-index: 2; }"),
    (".step.on { background: #151515; color: #ffd84a; letter-spacing: 1px; }", ".step.on { background: #8c1c3a; color: #fff6e0; letter-spacing: 1px; }"),
    (".step { min-width: 46px; height: 46px; border-radius: 23px; background: #e3e2dc; color: #777;", ".step { min-width: 46px; height: 46px; border-radius: 23px; background: #fff; border: 2px solid #e8dcc6; color: #7d6b5a;"),
    ("#steps { left: 0; right: 0; top: 150px;", "#steps { left: 0; right: 0; top: 80px;"),
    ('const COL = { blue: ["var(--blue)", "#d4e2ff"], green: ["var(--green)", "#d3f1df"], red: ["var(--red)", "#ffd9da"] };',
     'const COL = { gold: ["#1f2a44", "#e8c76a"], red: ["#fff6e0", "#8c1c3a"], blue: ["#fff", "#3b6fd8"], green: ["#fff", "#2e8b57"] };'),
    ('  <div id="caption" class="abs"></div>', '''  <svg width="0" height="0" style="position:absolute"><filter id="lift" x="-10%" y="-10%" width="120%" height="140%"><feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#8c1c3a" flood-opacity=".12"/></filter></svg>
  <div id="caption" class="abs"></div>'''),
]}
