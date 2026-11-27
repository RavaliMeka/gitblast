
const P = {
  vs: lt => `
    <div class="abs card top-green" style="left:30px;top:90px;width:240px;height:200px;${pop(lt, .2)}">
      <div class="big" style="margin-top:36px">Git</div><div class="sub">tool</div></div>
    <div class="abs card top-blue" style="left:300px;top:90px;width:260px;height:200px;${pop(lt, .6)}">
      <div class="big" style="margin-top:36px">GitHub</div><div class="sub">website</div></div>
    <div class="abs" style="left:220px;top:330px;font-size:150px;font-weight:800;color:var(--red);${pop(lt, 1.6)}">?</div>`,

  saves: lt => {
    const items = [["v1", "login page"], ["v2", "fix bug"], ["v3", "dark mode"]];
    return `<div class="abs" style="left:60px;top:120px;width:6px;height:${clamp((lt - .3) / 2.5) * 470}px;background:var(--ink);border-radius:3px"></div>` +
      items.map(([v, m], i) => `
      <div class="abs" style="left:30px;top:${110 + i * 170}px;display:flex;align-items:center;gap:24px;${pop(lt, .4 + i * 1.1)}">
        <div style="width:66px;height:66px;border-radius:50%;background:var(--green);border:5px solid var(--ink);color:#fff;font-weight:800;font-size:26px;display:flex;align-items:center;justify-content:center">${v}</div>
        <div class="card" style="padding:18px 26px;font-size:32px;font-weight:700">${m}</div>
      </div>`).join("") +
      `<div class="abs sub" style="left:0;right:0;top:640px;${fade(lt, 3.6)}">every commit = a save point</div>`;
  },

  back: lt => `
    <div class="abs" style="left:30px;top:120px;display:flex;align-items:center;gap:24px;${pop(lt, .1)}">
      <div style="width:66px;height:66px;border-radius:50%;background:var(--green);border:5px solid var(--ink);color:#fff;font-weight:800;font-size:26px;display:flex;align-items:center;justify-content:center">v2</div>
      <div class="card" style="padding:18px 26px;font-size:32px;font-weight:700">working ✓</div></div>
    <div class="abs" style="left:30px;top:300px;display:flex;align-items:center;gap:24px;${pop(lt, .5)}">
      <div style="width:66px;height:66px;border-radius:50%;background:var(--red);border:5px solid var(--ink);color:#fff;font-weight:800;font-size:26px;display:flex;align-items:center;justify-content:center">v3</div>
      <div class="card" style="padding:18px 26px;font-size:32px;font-weight:700;border-color:var(--red);color:var(--red)">app broken</div></div>
    <svg class="abs" style="left:380px;top:110px;${fade(lt, 2.4)}" width="160" height="300" viewBox="0 0 160 300">
      <path d="M20 270 C 150 250, 150 60, 40 40" fill="none" stroke="var(--blue)" stroke-width="10" stroke-linecap="round" stroke-dasharray="420" stroke-dashoffset="${420 - 420 * clamp((lt - 2.4) / .8)}"/>
      <path d="M62 20 L 34 40 L 60 66" fill="none" stroke="var(--blue)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity="${clamp((lt - 3.1) / .2)}"/></svg>
    <div class="abs term" style="left:30px;top:480px;width:520px;${pop(lt, 3)}"><span class="p">$</span> git restore .<br><span class="ok">✓ back to v2</span></div>`,

  laptop: lt => `
    <svg class="abs" style="left:20px;top:80px;${pop(lt, .2)}" width="540" height="380" viewBox="0 0 540 380">
      <rect x="70" y="20" width="400" height="260" rx="22" fill="#fff" stroke="#151515" stroke-width="7"/>
      <rect x="95" y="45" width="350" height="210" rx="10" fill="#eef3ff"/>
      <path d="M20 300 H520 L495 345 H45 Z" fill="#fff" stroke="#151515" stroke-width="7" stroke-linejoin="round"/>
      <g transform="translate(160 85)"><path d="M0 18 a10 10 0 0 1 10 -10 h60 l16 16 h124 a10 10 0 0 1 10 10 v96 a10 10 0 0 1 -10 10 h-200 a10 10 0 0 1 -10 -10 Z" fill="#f2a33a" stroke="#151515" stroke-width="6"/>
      <text x="110" y="95" text-anchor="middle" font-family="DejaVu Sans Mono, monospace" font-weight="700" font-size="30" fill="#151515">my-app</text></g>
    </svg>
    <div class="abs" style="left:60px;top:500px;${pop(lt, 1)}"><span class="chip"><span style="font-family:DejaVu Sans Mono,monospace">.git</span> hidden folder = history</span></div>
    <div class="abs" style="left:60px;top:600px;${pop(lt, 2.6)}"><span class="chip" style="border-color:var(--green);color:var(--green)">✓ works offline</span></div>`,

  cloud: lt => `
    <svg class="abs" style="left:10px;top:40px;${pop(lt, .2)}" width="560" height="330" viewBox="0 0 560 330">
      <path d="M140 300 C 50 300, 30 200, 110 180 C 100 90, 230 60, 270 130 C 310 40, 470 70, 450 180 C 540 190, 530 300, 440 300 Z" fill="#fff" stroke="#151515" stroke-width="8" stroke-linejoin="round"/>
      <text x="280" y="250" text-anchor="middle" font-family="DejaVu Sans Mono, monospace" font-weight="700" font-size="30" fill="#2f6fe4">my-first-repo</text></svg>
    ${[["Backup", "var(--green)"], ["Share", "var(--blue)"], ["Team work", "var(--orange)"]].map(([w, c], i) => `
      <div class="abs" style="left:${30 + i * 0}px;top:${420 + i * 100}px;${pop(lt, 3.6 + i * .35)}"><span class="chip" style="border-color:${c}"><span style="width:18px;height:18px;border-radius:50%;background:${c};display:inline-block"></span>${w}</span></div>`).join("")}`,

  compare: lt => `
    <div class="abs card top-green" style="left:20px;top:60px;width:540px;height:250px;display:flex;align-items:center;gap:30px;padding:0 34px;${pop(lt, .1)}">
      <svg width="130" height="110" viewBox="0 0 130 110"><rect x="6" y="22" width="118" height="80" rx="16" fill="#fff" stroke="#151515" stroke-width="7"/><rect x="40" y="6" width="44" height="20" rx="6" fill="#151515"/><circle cx="65" cy="62" r="24" fill="#d3f1df" stroke="#151515" stroke-width="7"/></svg>
      <div><div style="font-weight:800;font-size:56px">Git</div><div class="sub" style="text-align:left">takes the snapshots</div></div></div>
    <div class="abs card top-blue" style="left:20px;top:370px;width:540px;height:250px;display:flex;align-items:center;gap:30px;padding:0 34px;${pop(lt, 2.4)}">
      <svg width="130" height="110" viewBox="0 0 130 110"><rect x="10" y="6" width="110" height="98" rx="26" fill="#fff" stroke="#151515" stroke-width="7"/><circle cx="65" cy="55" r="24" fill="#d4e2ff" stroke="#151515" stroke-width="7"/><circle cx="96" cy="26" r="6" fill="#151515"/></svg>
      <div><div style="font-weight:800;font-size:56px">GitHub</div><div class="sub" style="text-align:left">where you post them</div></div></div>`,

  init: lt => term(lt, [
    [.2, `<span class="p">$</span> mkdir my-first-repo`],
    [.9, `<span class="p">$</span> cd my-first-repo`],
    [2.5, `<span class="p">$</span> git init`],
    [3.4, `<span class="ok">Initialized empty Git repository</span>`],
  ]) + `<div class="abs" style="left:40px;top:520px;${pop(lt, 3.6)}"><span class="chip">📁 now Git is watching this folder</span></div>`,

  commit: lt => term(lt, [
    [.2, `<span class="p">$</span> git add .`],
    [1.2, `<span class="c"># files ready to save</span>`],
    [2.8, `<span class="p">$</span> git commit -m "first commit"`],
    [3.7, `<span class="ok">[main a1b2c3d] first commit</span>`],
    [3.9, `<span class="ok"> 3 files changed</span>`],
  ]) + `<div class="abs" style="left:40px;top:560px;display:flex;gap:16px;align-items:center;${pop(lt, 4.2)}">
      <div style="width:70px;height:70px;border-radius:50%;background:var(--green);border:5px solid var(--ink);color:#fff;font-weight:800;font-size:28px;display:flex;align-items:center;justify-content:center">v1</div>
      <span class="chip">save point #1</span></div>`,

  newrepo: lt => {
    const typed = "my-first-repo".slice(0, Math.floor(clamp((lt - 2.8) / 1.2) * 13));
    const press = lt > 4.3 && lt < 4.6 ? "transform:scale(.95);" : "";
    return `
    <div class="abs card" style="left:20px;top:60px;width:540px;padding:34px;${pop(lt, .2)}">
      <div style="font-weight:800;font-size:40px;margin-bottom:28px">New repository</div>
      <div style="font-weight:700;font-size:26px;color:var(--muted);margin-bottom:10px">Repository name</div>
      <div style="border:3px solid ${lt > 2.8 ? "var(--blue)" : "#ccc"};border-radius:12px;height:64px;padding:0 18px;display:flex;align-items:center;font-family:DejaVu Sans Mono,monospace;font-size:28px">${typed}<span style="width:3px;height:32px;background:var(--ink);margin-left:2px;opacity:${(lt * 2 | 0) % 2}"></span></div>
      <div style="display:flex;gap:18px;margin:26px 0;font-size:26px;font-weight:600"><span>◉ Public</span><span style="color:var(--muted)">○ Private</span></div>
      <div style="background:var(--green);color:#fff;font-weight:800;font-size:30px;border-radius:14px;height:70px;display:flex;align-items:center;justify-content:center;${press}">Create repository</div>
    </div>
    <div class="abs" style="left:40px;top:640px;${pop(lt, .9)}"><span class="chip">github.com → <b style="color:var(--blue)">+</b> → New repository</span></div>`;
  },

  push: lt => {
    const k = clamp((lt - 2.6) / 1.4), x = lerp(90, 470, easeOut(k)), y = lerp(600, 520, k) - Math.sin(k * Math.PI) * 140;
    return term(lt, [
      [.2, `<span class="p">$</span> git remote add origin \\`],
      [.2, `&nbsp;&nbsp;&lt;your-repo-url&gt;`],
      [2, `<span class="p">$</span> git push -u origin main`],
      [3.8, `<span class="ok">✓ main → origin/main</span>`],
    ], 60) + `
      <svg class="abs" style="left:0;top:0" width="580" height="860" viewBox="0 0 580 860">
        <g style="${pop(lt, 1.8)}"><rect x="30" y="560" width="120" height="80" rx="10" fill="#fff" stroke="#151515" stroke-width="6"/><path d="M15 650 H165 L155 668 H25 Z" fill="#fff" stroke="#151515" stroke-width="6" stroke-linejoin="round"/></g>
        <g style="${pop(lt, 1.8)}" transform="translate(0 110)"><path d="M420 470 C 380 470, 375 420, 410 412 C 405 370, 465 355, 482 390 C 500 350, 570 365, 560 415 C 590 420, 585 470, 550 470 Z" fill="#fff" stroke="#151515" stroke-width="6" stroke-linejoin="round"/></g>
        <path d="M150 590 Q 300 400 420 545" fill="none" stroke="#c9c8c2" stroke-width="5" stroke-dasharray="12 12" style="${fade(lt, 2)}"/>
        <g transform="translate(${x} ${y})" style="opacity:${lt > 2.6 && lt < 4.1 ? 1 : 0}"><rect x="-22" y="-22" width="44" height="44" rx="6" fill="var(--orange)" stroke="#151515" stroke-width="5"/><path d="M-22 -6 H22" stroke="#151515" stroke-width="4"/></g>
        <g style="${pop(lt, 4)}"><circle cx="555" cy="475" r="32" fill="var(--green)" stroke="#151515" stroke-width="5"/><path d="M540 475 l11 11 l20 -22" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></g>
      </svg>`;
  },

  recap: lt => {
    const cmds = [["git init", "start", "var(--blue)"], ["git add", "select", "var(--orange)"], ["git commit", "save", "var(--green)"], ["git push", "upload", "var(--red)"]];
    return cmds.map(([c, w, col], i) => {
      const on = lt > .3 + i * .5;
      return `<div class="abs" style="left:40px;top:${60 + i * 150}px;width:510px;height:116px;display:flex;align-items:center;gap:22px;${pop(lt, .3 + i * .5)}">
        <div style="width:64px;height:64px;border-radius:50%;background:${col};border:5px solid var(--ink);color:#fff;font-weight:800;font-size:30px;display:flex;align-items:center;justify-content:center">${i + 1}</div>
        <div class="card" style="flex:1;height:100px;display:flex;align-items:center;justify-content:space-between;padding:0 24px;border-color:${on ? col : "var(--ink)"}">
          <span style="font-family:DejaVu Sans Mono,monospace;font-weight:700;font-size:32px">${c}</span><span class="sub">${w}</span></div></div>`;
    }).join("");
  },

  follow: lt => `
    <div class="abs card top-blue" style="left:40px;top:100px;width:500px;padding:30px;display:flex;gap:22px;align-items:center;${pop(lt, .2)}">
      <svg width="90" height="90" viewBox="0 0 90 90"><circle cx="18" cy="70" r="11" fill="var(--blue)"/><circle cx="18" cy="20" r="11" fill="var(--blue)"/><circle cx="70" cy="34" r="11" fill="var(--green)"/><path d="M18 31 V59 M18 50 C18 40, 70 52, 70 45" fill="none" stroke="#151515" stroke-width="6" stroke-linecap="round"/></svg>
      <div><div style="font-weight:800;font-size:38px">Up next</div><div class="sub" style="text-align:left">Branches, made easy</div></div></div>
    <div class="abs" style="left:110px;top:380px;width:360px;height:110px;border-radius:24px;background:var(--red);color:#fff;font-weight:800;font-size:46px;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 0 rgba(0,0,0,.15);${pop(lt, 2)};${lt > 3.4 && lt < 3.7 ? "filter:brightness(.9)" : ""}">+ Follow</div>
    <div class="abs sub" style="left:0;right:0;top:520px;${fade(lt, 2.4)}">DevOps, one simple idea at a time</div>`,
};

