# Recipe-card theme: cream kitchen paper, gingham strip, serif headlines with a wavy red underline
THEME = {"title": "Your First Dockerfile Explainer", "replace": [
    ('''    background-color: var(--bg);
    background-image: radial-gradient(var(--grid) 3px, transparent 3.5px), radial-gradient(1200px 500px at 50% 0%, #fff8ec, transparent);
    background-size: 60px 60px, 100% 100%;''', '''    background-color: #fbf3e4;
    background-image: repeating-linear-gradient(0deg, rgba(74,44,29,.025) 0 2px, transparent 2px 6px), radial-gradient(900px 600px at 50% 30%, #fffaf0, transparent 70%);
    background-size: auto, 100% 100%;'''),
    ("color: var(--ink); letter-spacing: -1.5px; }", "color: #4a2c1d; letter-spacing: -1px; font-family: 'DejaVu Serif', Georgia, serif; }"),
    ("#title { left: 40px; right: 40px; top: 220px;", "#title { left: 40px; right: 40px; top: 160px; font-size: 62px;"),
    ('.hl::after { content: ""; position: absolute;', '.hl::after { display: none; content: ""; position: absolute;'),
    ("  .hl span { position: relative; }", "  .hl span { position: relative; text-decoration: underline wavy #d9412b; text-decoration-thickness: 5px; text-underline-offset: 14px; }"),
    ("#caption { left: 0; right: 0; top: 1500px;", "#caption { left: 40px; right: 40px; top: 1690px; z-index: 5;"),
    ("#caption div { background: #ffd84a; color: #151515; font-weight: 800; font-size: 52px; padding: 16px 34px 20px; border-radius: 999px; border: 4px solid #151515; box-shadow: 6px 6px 0 #151515;",
     "#caption div { background: #fffdf6; color: #4a2c1d; font-family: 'DejaVu Serif', Georgia, serif; font-weight: 700; font-size: 34px; white-space: nowrap; padding: 18px 32px 22px; border-radius: 10px; border: 3px dashed #d9412b; box-shadow: 0 10px 24px rgba(74,44,29,.12);"),
    ("#prop { left: 470px; top: 560px; width: 580px; height: 860px; }", "#prop { left: 50px; top: 300px; width: 600px; height: 860px; transform: scale(1.22); transform-origin: 0 0; }"),
    ("#char { left: 30px; top: 610px; width: 470px; height: 964px; }", "#char { left: 650px; top: 930px; width: 470px; height: 964px; overflow: visible; z-index: 2; }"),
    ('const COL = { blue: ["var(--blue)", "#d4e2ff"], green: ["var(--green)", "#d3f1df"], red: ["var(--red)", "#ffd9da"] };',
     'const COL = { blue: ["#2a5fb0", "transparent"], green: ["#3f8f4a", "transparent"], red: ["#d9412b", "transparent"] };'),
    ('  <div id="caption" class="abs"></div>', '''  <div class="abs" style="left:0;right:0;top:0;height:46px;background:repeating-conic-gradient(#d9412b 0 25%, #fff 0 50%) 0 0/46px 46px;opacity:.85"></div>
  <svg width="0" height="0" style="position:absolute"><filter id="paper"><feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#4a2c1d" flood-opacity=".12"/></filter></svg>
  <div id="caption" class="abs"></div>'''),
]}
