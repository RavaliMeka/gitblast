/* ---------- Props: concert theme (sheet music, gold and burgundy) ---------- */
const BU = "#8c1c3a", GO = "#c9971f", NA = "#1f2a44", IV = "#fffaf0", MU2 = "#7d6b5a", OK = "#2e8b57";
const mono = "DejaVu Sans Mono, monospace", serif = "DejaVu Serif, Georgia, serif";
const svg = (inner, h = 680) => `<svg class="abs" style="left:0;top:0" width="620" height="${h}" viewBox="0 0 620 ${h}">${inner}</svg>`;
const T = (x, y, s, col = NA, size = 30, weight = 700, anchor = "middle", font = "Inter", op = 1) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${font}" font-weight="${weight}" font-size="${size}" fill="${col}" opacity="${clamp(op)}">${s}</text>`;
const card = (x, y, w, h, stroke = "#e8dcc6") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${IV}" stroke="${stroke}" stroke-width="3" filter="url(#lift)"/>`;
const SV = [["web", "🌐", "#3b6fd8"], ["api", "⚙️", BU], ["db", "🗄️", GO]];
// a service as a musician: coloured circle with icon and a small music stand
function musician(x, y, i, k = 1, on = false, play = 0) {
  if (k <= 0) return "";
  const [n, ic, c] = SV[i], s = backOut(clamp(k / .45)), bob = play ? Math.sin(play * 7 + i) * 5 : 0;
  return `<g transform="translate(${x} ${y + bob}) scale(${s})"><circle r="62" fill="${c}"/><circle r="62" fill="#fff" opacity=".12"/>
    <text y="18" text-anchor="middle" font-size="50">${ic}</text>
    ${on ? `<circle cx="46" cy="-46" r="13" fill="${OK}" stroke="#fff" stroke-width="4"/>` : ""}</g>` + T(x, y + 100, n, NA, 28, 800, "middle", mono, k * 2);
}
const note = (x, y, o) => `<g transform="translate(${x} ${y})" opacity="${o}"><ellipse rx="11" ry="8" fill="${GO}" transform="rotate(-20)"/><path d="M9 -3 V-38 l14 6" stroke="${GO}" stroke-width="4" fill="none"/></g>`;
function notes(t, x, y) { return [0, 1, 2].map(i => { const p = (t * .6 + i / 3) % 1; return note(x + Math.sin(p * 6 + i) * 30 + i * 20, y - p * 120, Math.sin(p * Math.PI)); }).join(""); }
function baton(x, y, t) { const a = Math.sin(t * 5) * 25 - 20; return `<g transform="translate(${x} ${y}) rotate(${a})"><path d="M0 0 L90 -60" stroke="${NA}" stroke-width="6" stroke-linecap="round"/><circle r="10" fill="${GO}"/></g>`; }

const P = {
  three: lt => svg(SV.map((_, i) => musician(120 + i * 190, 260, i, (lt - .2 - i * .7))).join("")),

  ugh: lt => `<div class="abs term" style="left:10px;top:40px;width:600px;font-size:20px;line-height:1.7;${pop(lt, 0, .3)}">
      ${["docker run -d --name web -p 80:80 --network app web:1.2", "docker run -d --name api -p 3000:3000 -e DB=db --network app api:2.0", "docker run -d --name db -v pgdata:/var/lib/pg --network app postgres:16"].map((c, i) =>
        `<div style="opacity:${clamp((lt - i * .6) / .2)};white-space:nowrap;overflow:hidden"><span class="p">$</span> ${c}</div>`).join("")}</div>` +
    svg(T(310, 420, "😩", NA, 110, 400, "middle", "Inter", (lt - 1.8) / .3)),

  meet: lt => svg(`<g style="${pop(lt, .1)}">${card(60, 120, 500, 300, GO)}${baton(170, 300, lt)}${T(380, 250, "Docker", NA, 52, 800, "middle", serif)}${T(380, 320, "Compose", BU, 56, 800, "middle", serif)}</g>`),

  orchestra: lt => svg(`<path d="M60 470 Q310 520 560 470" stroke="#e8dcc6" stroke-width="6" fill="none"/>` +
    SV.map((_, i) => musician(130 + i * 180, 380 - (i === 1 ? 30 : 0), i, (lt - 2 - i * .3), false, lt > 4 ? lt : 0)).join("") +
    (lt > 4 ? `<g style="${pop(lt, 4)}"><circle cx="310" cy="140" r="54" fill="${NA}"/>${T(310, 155, "🎩", NA, 44, 400)}${T(310, 235, "Compose", BU, 30, 800, "middle", serif)}</g>${baton(360, 120, lt)}` + notes(lt, 480, 300) : "") +
    T(310, 600, lt > 2 ? "musicians = containers" : "", MU2, 26, 700, "middle", "Inter", (lt - 2.2) / .3)),

  yaml: lt => {
    const L = [["services:", 0, .2], ["  web:", 3, 3], ["    image: nginx", 3, 3.2], ['    ports: ["80:80"]', 6, 6], ["  api:", 3, 3.4], ["    build: ./api", 6, 6.3], ["    depends_on: [db]", 9, 9], ["  db:", 3, 3.6], ["    image: postgres:16", 6, 6.6], ["    volumes: [pgdata:/data]", 6, 6.9]];
    return svg(card(10, 20, 600, 560) + `<rect x="10" y="20" width="600" height="60" rx="18" fill="${NA}"/><rect x="10" y="60" width="600" height="20" fill="${NA}"/>` +
      T(40, 60, "compose.yaml", "#fff", 26, 800, "start", mono) + [0, 1, 2, 3, 4].map(i => `<path d="M30 ${120 + i * 92} H590" stroke="#efe5d2" stroke-width="2"/>`).join("") +
      L.map(([l, grp, d], i) => {
        const hi = l.includes("depends_on") && lt > 9;
        return (hi ? `<rect x="30" y="${108 + i * 46}" width="440" height="40" rx="8" fill="${GO}" opacity=".25"/>` : "") +
          T(46, 136 + i * 46, l.replace(/ /g, " "), l.endsWith(":") && !l.startsWith("    ") ? BU : NA, 26, 700, "start", mono, (lt - d) / .3);
      }).join("") + (lt > 9.4 ? T(560, 412, "db first", GO, 22, 800, "end", "Inter", (lt - 9.4) / .3) : ""), 600);
  },

  up: lt => `<div class="abs term" style="left:10px;top:30px;width:600px;font-size:26px;${pop(lt, 0, .3)}"><span class="p">$</span> docker compose up</div>` +
    svg(SV.map((_, i) => musician(130 + i * 180, 360, i, (lt - .8 - i * .25), lt > 2.6, lt > 3 ? lt : 0)).join("") +
      (lt > 3 ? notes(lt, 300, 260) + T(310, 560, "all running ✓", OK, 36, 900, "middle", "Inter", (lt - 3) / .3) : "")),

  down: lt => `<div class="abs term" style="left:10px;top:30px;width:600px;font-size:26px;${pop(lt, 0, .3)}"><span class="p">$</span> docker compose down</div>` +
    svg(SV.map((_, i) => `<g opacity="${lerp(1, .3, clamp((lt - 1) / .8))}">${musician(130 + i * 180, 360, i, 1, false)}</g>`).join("") + T(310, 560, "all stopped", MU2, 32, 800, "middle", "Inter", (lt - 1.6) / .3)),

  team: lt => svg(`<g style="${pop(lt, .1)}">${card(220, 70, 180, 220, GO)}${T(310, 170, "📄", NA, 64, 400)}${T(310, 250, "compose.yaml", NA, 20, 800, "middle", mono)}</g>` +
    [0, 1, 2].map(i => { const x = 110 + i * 200, d = .8 + i * .3; return (lt > d ? `<path d="M310 300 C 310 360, ${x} 360, ${x} 400" stroke="${GO}" stroke-width="4" fill="none" stroke-dasharray="8 8" opacity="${clamp((lt - d) / .3)}"/>` : "") +
      `<g style="${pop(lt, d + .2)}"><circle cx="${x}" cy="460" r="52" fill="${["#ffd27a", "#9bd4ff", "#ffb3c7"][i]}"/>${T(x, 478, ["🧑‍💻", "👩‍💻", "👨‍💻"][i], NA, 50, 400)}</g>`; }).join("")),

  recap: lt => svg(["Dockerfile", "Image", "Container", "Ports", "Volumes", "Compose"].map((w, i) => {
    const d = 1.6 + i * .55, x = 40 + (i % 2) * 290, y = 60 + Math.floor(i / 2) * 150;
    return `<g style="${pop(lt, d)}">${card(x, y, 260, 110, i === 5 ? GO : "#e8dcc6")}<circle cx="${x + 48}" cy="${y + 55}" r="24" fill="${OK}"/><path d="M${x + 36} ${y + 55} l9 10 l17 -18" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>${T(x + 86, y + 66, w, NA, 28, 800, "start", serif)}</g>`;
  }).join("")),

  next: lt => svg(`<g style="${pop(lt, .2)}">${card(40, 50, 540, 220, GO)}<g transform="translate(130 160) rotate(${lt * 40})">${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path d="M0 0 L0 -64" stroke="${GO}" stroke-width="8" stroke-linecap="round" transform="rotate(${i * 45})"/>`).join("")}<circle r="44" fill="none" stroke="${NA}" stroke-width="10"/><circle r="14" fill="${NA}"/></g>
      ${T(220, 140, "Next topic?", MU2, 28, 700, "start")}${T(220, 210, "Kubernetes", NA, 50, 800, "start", serif)}</g>` +
    `<g transform="translate(310 360)"><g style="${pop(lt, 1.2)}"><rect x="-220" y="-48" width="440" height="96" rx="20" fill="#fff" stroke="#e8dcc6" stroke-width="3"/>${T(-150, 14, "💬", NA, 40, 400)}${T(30, 16, "comment K8S", BU, 40, 900, "middle", mono)}</g></g>` +
    `<g transform="translate(310 500)"><g style="${pop(lt, 5)}"><rect x="-180" y="-50" width="360" height="100" rx="50" fill="${BU}"/>${T(0, 15, "+ Follow", "#fff", 42, 900)}</g></g>`),
};
