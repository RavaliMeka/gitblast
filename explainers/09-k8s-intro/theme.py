# Control-tower theme: light sky, runway at the bottom, flight-board highlights and captions
THEME = {"title": "What is Kubernetes Explainer", "replace": [
    ('''    background-color: var(--bg);
    background-image: radial-gradient(var(--grid) 3px, transparent 3.5px), radial-gradient(1200px 500px at 50% 0%, #fff8ec, transparent);
    background-size: 60px 60px, 100% 100%;''', '''    background: radial-gradient(420px 160px at 18% 12%, rgba(255,255,255,.95), transparent 70%), radial-gradient(520px 180px at 82% 22%, rgba(255,255,255,.9), transparent 70%),
      linear-gradient(180deg, #cfe8ff 0%, #e9f5ff 45%, #fff7e6 100%);'''),
    ("color: var(--ink); letter-spacing: -1.5px; }", "color: #1f2937; letter-spacing: -.5px; }"),
    ("#title { left: 40px; right: 40px; top: 220px;", "#title { left: 40px; right: 40px; top: 160px; font-size: 64px;"),
    ('.hl::after { content: ""; position: absolute; left: -10px; right: -10px; bottom: -2px; top: 10px; z-index: -1; border-radius: 14px; rotate: -1.5deg; background: var(--mark, #cfe0ff);',
     '.hl::after { content: ""; position: absolute; left: -14px; right: -14px; bottom: -4px; top: 2px; z-index: -1; border-radius: 8px; rotate: 0deg; background: repeating-linear-gradient(90deg, transparent 0 34px, rgba(255,255,255,.08) 34px 36px), var(--mark, #1f2937);'),
    ("  .hl span { position: relative; }", "  .hl span { position: relative; }\n  #title .hl { margin: 0 .28em; }"),
    ("#caption { left: 0; right: 0; top: 1500px;", "#caption { left: 40px; right: 40px; top: 1700px; z-index: 5;"),
    ("#caption div { background: #ffd84a; color: #151515; font-weight: 800; font-size: 52px; padding: 16px 34px 20px; border-radius: 999px; border: 4px solid #151515; box-shadow: 6px 6px 0 #151515;",
     "#caption div { background: #1f2937; color: #ffb703; font-family: 'DejaVu Sans Mono', monospace; font-weight: 700; font-size: 32px; line-height: 1.3; text-align: center; max-width: 980px; padding: 18px 30px 20px; border-radius: 10px; border: none; box-shadow: 0 0 0 4px #374151, 0 14px 30px rgba(31,41,55,.3);"),
    ("#prop { left: 470px; top: 560px; width: 580px; height: 860px; }", "#prop { left: 40px; top: 300px; width: 620px; height: 860px; transform: scale(1.2); transform-origin: 0 0; }"),
    ("#char { left: 30px; top: 610px; width: 470px; height: 964px; }", "#char { left: 660px; top: 900px; width: 470px; height: 964px; overflow: visible; z-index: 2; }"),
    (".step.on { background: #151515; color: #ffd84a; letter-spacing: 1px; }", ".step.on { background: #1f2937; color: #ffb703; letter-spacing: 1px; }"),
    (".step { min-width: 46px; height: 46px; border-radius: 23px; background: #e3e2dc; color: #777;", ".step { min-width: 46px; height: 46px; border-radius: 8px; background: rgba(255,255,255,.8); color: #6b7c93;"),
    ("#steps { left: 0; right: 0; top: 150px;", "#steps { left: 0; right: 0; top: 80px;"),
    ('const COL = { blue: ["var(--blue)", "#d4e2ff"], green: ["var(--green)", "#d3f1df"], red: ["var(--red)", "#ffd9da"] };',
     'const COL = { amber: ["#ffb703", "#1f2937"], blue: ["#fff", "#3a86ff"], red: ["#fff", "#e63946"], green: ["#fff", "#2a9d8f"] };'),
    ('  <div id="caption" class="abs"></div>', '''  <svg class="abs" style="left:0;bottom:0" width="1080" height="96" viewBox="0 0 1080 96"><rect width="1080" height="96" fill="#4a5568"/>''' +
     "".join(f'<rect x="{30 + i * 110}" y="42" width="64" height="12" fill="#fff"/>' for i in range(10)) + '''</svg>
  <div id="caption" class="abs"></div>'''),
]}
