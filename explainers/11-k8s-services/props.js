/* ---------- Props: bistro theme ---------- */
const WINE = "#b23a48", GOLD = "#d9a441", ESP = "#3b2a25", OLV = "#5b8c5a", CRM = "#fffaf2", MUT3 = "#8a7468", SKY3 = "#3a7ca5";
const mono = "DejaVu Sans Mono, monospace", serif = "DejaVu Serif, Georgia, serif";
const svg = (inner, h = 640) => `<svg class="abs" style="left:0;top:0" width="640" height="${h}" viewBox="0 0 640 ${h}">${inner}</svg>`;
const T = (x, y, s, col = ESP, size = 28, weight = 800, anchor = "middle", font = "Inter", op = 1) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${font}" font-weight="${weight}" font-size="${size}" fill="${col}" opacity="${clamp(op)}">${s}</text>`;
const grow = (k, inner, x, y) => k <= 0 ? "" : `<g transform="translate(${x} ${y}) scale(${backOut(clamp(k / .45))})">${inner}</g>`;
const menu = (x, y, w, h, stroke = GOLD) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${CRM}" stroke="${stroke}" stroke-width="4"/><rect x="${x + 10}" y="${y + 10}" width="${w - 20}" height="${h - 20}" rx="8" fill="none" stroke="${stroke}" stroke-width="1.5" opacity=".6"/>`;
// a table = a pod. busy tables are darker; ip label optional
function table(x, y, k = 1, busy = false, ip = "", o = 1) {
  return grow(k, `<g opacity="${o}"><ellipse cy="52" rx="46" ry="10" fill="rgba(59,42,37,.12)"/><rect x="-6" y="0" width="12" height="50" fill="${ESP}"/>
    <ellipse rx="58" ry="24" fill="${busy ? WINE : "#fff"}" stroke="${busy ? "#8f2d3a" : GOLD}" stroke-width="4"/>
    ${busy ? `<circle cx="-16" cy="-4" r="8" fill="#fff" opacity=".8"/><circle cx="16" cy="2" r="8" fill="#fff" opacity=".8"/>` : `<circle r="6" fill="${GOLD}"/>`}
    ${ip ? `<text y="88" text-anchor="middle" font-family="${mono}" font-weight="700" font-size="18" fill="${MUT3}">${ip}</text>` : ""}</g>`, x, y);
}
function person(x, y, col = SKY3, s = 1) { return `<g transform="translate(${x} ${y}) scale(${s})"><circle cy="-52" r="18" fill="#f2c9a5"/><path d="M-22 -30 Q0 -44 22 -30 L26 30 H-26 Z" fill="${col}"/></g>`; }
function host(x, y, t = 0) { const a = Math.sin(t * 4) * 8;
  return `<g transform="translate(${x} ${y})"><circle cy="-66" r="22" fill="#f2c9a5"/><path d="M-22 -80 Q0 -100 22 -80 Z" fill="${ESP}"/>
    <path d="M-28 -40 Q0 -56 28 -40 L32 40 H-32 Z" fill="${ESP}"/><path d="M-8 -42 L0 -28 L8 -42 Z" fill="#fff"/><path d="M-6 -30 l6 6 l6 -6 l-6 -5 z" fill="${WINE}"/>
    <g transform="rotate(${a} 28 -30)"><path d="M28 -30 L66 -46" stroke="${ESP}" stroke-width="12" stroke-linecap="round"/><circle cx="68" cy="-47" r="9" fill="#f2c9a5"/></g>
    <rect x="-46" y="42" width="92" height="56" rx="6" fill="${GOLD}"/><text y="78" text-anchor="middle" font-family="${serif}" font-weight="700" font-size="20" fill="${ESP}">HOST</text></g>`; }
const TX = [150, 320, 490];
const arrow = (d, len, col, k, w = 5) => k <= 0 ? "" : `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-dasharray="${len}" stroke-dashoffset="${len * (1 - clamp(k))}"/>`;

const P = {
  changing: lt => { const sw = lt > 3 ? Math.floor((lt - 3) / 1) % 3 : -1, ips = ["10.0.1.7", "10.0.2.4", "10.0.3.9"], ips2 = ["10.0.5.2", "10.0.6.8", "10.0.4.1"];
    return svg(TX.map((x, i) => table(x, 200, lt - .2 - i * .2, false, sw === i ? ips2[i] : ips[i], sw === i ? .5 + .5 * Math.abs(Math.sin(lt * 8)) : 1)).join("") +
      person(320, 520) + T(320, 420, "?", WINE, 70, 900, "middle", serif, (lt - 1) / .3) +
      T(320, 600, lt > 3 ? "addresses keep changing" : "which pod do I call?", lt > 3 ? WINE : MUT3, 26, 700, "middle", mono, (lt - 1.2) / .3)); },

  meet: lt => svg(`<g transform="translate(320 260)"><g style="${pop(lt, .1)}">${menu(-230, -150, 460, 300, WINE)}${T(0, -40, "Service", WINE, 64, 800, "middle", serif)}${T(0, 30, "one stable address", ESP, 28, 700, "middle", mono)}${T(0, 90, "my-app:80", GOLD, 34, 800, "middle", mono)}</g></g>`),

  restaurant: lt => svg(TX.map((x, i) => table(x, 170, lt - 2 - i * .25, i === 1, "pod " + (i + 1))).join("") +
    grow(lt - 5, host(0, 0, lt), 320, 470) + T(320, 610, lt > 5 ? "the Service" : "", WINE, 32, 800, "middle", serif, (lt - 5.3) / .3) +
    (lt < 2 ? T(320, 300, "🍽️", ESP, 120, 400, "middle", "Inter", lt / .3) : "")),

  balance: lt => { const tgt = [0, 2, 1]; let ppl = "";
    for (let i = 0; i < 3; i++) { const d = .4 + i * 1.5, k = clamp((lt - d) / 1.4); if (lt < d) continue;
      const k1 = clamp(k * 2), k2 = clamp(k * 2 - 1), x = lerp(lerp(40, 250, easeOut(k1)), TX[tgt[i]], easeOut(k2)), y = lerp(lerp(560, 500, k1), 250, easeOut(k2));
      ppl += person(x, y, [SKY3, OLV, GOLD][i], lerp(1, .8, k2)); }
    return svg(TX.map((x, i) => table(x, 170, 1, lt > 1.6 + [0, 3, 1.5][i])).join("") + host(320, 470, lt) + ppl +
      (lt > 5 ? `<g transform="translate(320 600)"><g style="${pop(lt, 5)}">${T(0, 0, "load balancing ✓", WINE, 36, 800, "middle", serif)}</g></g>` : "")); },

  kinds: lt => svg(`<g transform="translate(170 250)"><g style="${pop(lt, .2)}">${menu(-142, -190, 284, 380, OLV)}${T(0, -120, "ClusterIP", OLV, 34, 800, "middle", serif)}
        <rect x="-100" y="-80" width="200" height="150" rx="20" fill="none" stroke="${OLV}" stroke-width="4" stroke-dasharray="10 8"/><circle cx="-40" cy="-5" r="22" fill="${OLV}"/><circle cx="40" cy="-5" r="22" fill="${OLV}"/><path d="M-18 -5 H18" stroke="${ESP}" stroke-width="4"/>
        ${T(0, 120, "inside only", ESP, 24, 700, "middle", mono)}${T(0, 155, "🔒", ESP, 28, 400)}</g></g>` +
    `<g transform="translate(470 250)"><g style="${pop(lt, 3)}">${menu(-142, -190, 284, 380, WINE)}${T(0, -120, "LoadBalancer", WINE, 32, 800, "middle", serif)}
        <text y="-40" text-anchor="middle" font-size="54">🌍</text><path d="M0 -20 V30" stroke="${WINE}" stroke-width="5"/><path d="M-10 20 L0 34 L10 20" stroke="${WINE}" stroke-width="5" fill="none"/><circle cx="-34" cy="60" r="18" fill="${WINE}"/><circle cx="34" cy="60" r="18" fill="${WINE}"/>
        ${T(0, 120, "open to internet", ESP, 24, 700, "middle", mono)}${T(0, 155, "🔓", ESP, 28, 400)}</g></g>`),

  ingress: lt => { const k1 = (lt - 5.2) / .7, k2 = (lt - 7) / .7;
    return svg(`<g opacity="${clamp((lt - 2) / .4)}"><path d="M200 330 V120 Q320 30 440 120 V330 Z" fill="${CRM}" stroke="${WINE}" stroke-width="6"/><path d="M320 80 V330" stroke="${WINE}" stroke-width="4"/>
        <circle cx="300" cy="230" r="7" fill="${GOLD}"/><circle cx="340" cy="230" r="7" fill="${GOLD}"/>${T(320, 62, "Ingress", WINE, 30, 800, "middle", serif)}</g>` +
      T(320, 395, "myshop.com", ESP, 28, 800, "middle", mono, (lt - 2.4) / .3) +
      arrow("M260 410 C 200 450, 150 460, 130 500", 190, OLV, k1) + arrow("M380 410 C 440 450, 490 460, 510 500", 190, SKY3, k2) +
      grow(lt - 5.2, `<rect x="-70" y="-26" width="140" height="52" rx="10" fill="${OLV}"/><text y="9" text-anchor="middle" font-family="${mono}" font-weight="800" font-size="26" fill="#fff">/shop</text>`, 150, 440) +
      grow(lt - 7, `<rect x="-60" y="-26" width="120" height="52" rx="10" fill="${SKY3}"/><text y="9" text-anchor="middle" font-family="${mono}" font-weight="800" font-size="26" fill="#fff">/api</text>`, 490, 440) +
      grow(lt - 5.8, menu(-90, -40, 180, 80, OLV) + `<text y="10" text-anchor="middle" font-family="${serif}" font-weight="700" font-size="24" fill="${ESP}">shop service</text>`, 130, 560) +
      grow(lt - 7.6, menu(-90, -40, 180, 80, SKY3) + `<text y="10" text-anchor="middle" font-family="${serif}" font-weight="700" font-size="24" fill="${ESP}">api service</text>`, 510, 560) +
      (lt < 2 ? T(320, 300, "many services?", MUT3, 34, 800, "middle", serif, lt / .3) : ""), 660); },

  recap: lt => svg(`<g transform="translate(320 160)"><g style="${pop(lt, .1)}">${menu(-290, -95, 580, 190, WINE)}<g transform="translate(-215 20) scale(.72)">${host(0, 0)}</g>${T(-120, -8, "Service", ESP, 42, 800, "start", serif)}${T(-120, 36, "a stable address", MUT3, 24, 700, "start", mono)}</g></g>` +
    `<g transform="translate(320 400)"><g style="${pop(lt, 2.4)}">${menu(-290, -95, 580, 190, GOLD)}<path d="M-250 60 V-30 Q-210 -70 -170 -30 V60 Z" fill="${CRM}" stroke="${WINE}" stroke-width="5"/>${T(-120, -8, "Ingress", ESP, 42, 800, "start", serif)}${T(-120, 36, "smart routing", MUT3, 24, 700, "start", mono)}</g></g>`),

  next: lt => svg(`<g transform="translate(320 190)"><g style="${pop(lt, .2)}">${menu(-290, -105, 580, 210)}${T(-250, -34, "Part 4", MUT3, 28, 800, "start", mono)}${T(-250, 40, "Scaling & updates", ESP, 46, 800, "start", serif)}</g></g>` +
    `<g transform="translate(320 440)"><g style="${pop(lt, 3.6)}"><rect x="-180" y="-52" width="360" height="104" rx="52" fill="${WINE}"/>${T(0, 16, "+ Follow", "#fff", 44, 900)}</g></g>`),
};
