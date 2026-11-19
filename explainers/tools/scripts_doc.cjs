// Builds one voice-over script document for every episode, with a pronunciation guide.
//   node tools/scripts_doc.cjs   -> VOICEOVER-ALL.md and VOICEOVER-ALL.html (run from explainers/)
const fs = require("fs"), path = require("path");
const SAY = [ // [pattern, term, how to say it]
  [/\bgit\b/i, "git", "git, hard G as in “give”"], [/github/i, "GitHub", "GIT-hub"], [/\brepo/i, "repo", "REE-poh"], [/commit/i, "commit", "kuh-MIT"],
  [/-c\b/, "-c", "“dash c”"], [/HEAD/, "HEAD~2", "“head tilde two”"], [/-m\b/, "-m", "“dash m”"],
  [/docker/i, "Docker", "DOK-er"], [/dockerfile/i, "Dockerfile", "DOK-er-file, one word"], [/npm/, "npm", "en-pee-em"], [/nginx/i, "nginx", "“engine x”"], [/postgres/i, "Postgres", "POST-gress"],
  [/yaml|\.yml/i, "YAML / .yml", "YAM-ul; “dot yam-ul”"], [/-p\b/, "-p 8000:3000", "“dash p, eight thousand, colon, three thousand”"], [/-v\b/, "-v", "“dash v”"], [/-t\b/, "-t", "“dash t”"], [/-f\b/, "-f", "“dash f”"],
  [/localhost/i, "localhost", "LOCAL-host, one word"], [/kubernetes/i, "Kubernetes", "koo-ber-NET-eez"], [/k8s/i, "K8s", "“kates”"], [/kubectl/i, "kubectl", "“kube control” (also heard: kube-C-T-L)"],
  [/clusterip/i, "ClusterIP", "“cluster I-P”"], [/ingress/i, "Ingress", "IN-gress"], [/replica/i, "replicas", "REP-li-kuz"], [/CI\/CD|\bCI\b/, "CI/CD", "“see-eye, see-dee”"],
  [/ubuntu/i, "ubuntu", "oo-BOON-too"], [/\.github/, ".github/workflows", "“dot github, slash, workflows”"], [/terraform/i, "Terraform", "TERRA-form"], [/tfstate/, "terraform.tfstate", "“terraform dot T-F-state”"],
  [/main\.tf/, "main.tf", "“main dot T-F”"], [/\binit\b/, "init", "in-IT"], [/AWS/, "AWS", "“A-W-S”"], [/devsecops/i, "DevSecOps", "dev-SEK-ops"], [/SAST/, "SAST", "“sast”, rhymes with “fast”"],
  [/SCA\b/, "SCA", "“S-C-A”"], [/DAST/, "DAST", "“dast”, rhymes with “fast”"], [/SBOM/, "SBOM", "ESS-bom"], [/semgrep/i, "Semgrep", "SEM-grep"], [/--config/, "--config auto", "“dash dash config, auto”"],
  [/SQL/, "SQL", "“sequel” (or S-Q-L; pick one and keep it)"], [/lodash/i, "lodash", "LOW-dash"], [/OWASP/, "OWASP ZAP", "OH-wasp zap"], [/zap-baseline/, "zap-baseline.py", "“zap baseline dot pie”"],
  [/gitleaks/i, "Gitleaks", "GIT-leeks"], [/trivy/i, "Trivy", "TRIV-ee"], [/API/, "API", "“A-P-I”"], [/java4shell/i, "Java4Shell", "“java for shell”"], [/openjdk/i, "OpenJDK", "“open J-D-K”"],
  [/base64/i, "Base64", "“base sixty-four”"], [/FAA/, "FAA", "“F-A-A”"], [/\bURL\b/, "URL", "“U-R-L”"], [/\bSSH\b/, "SSH", "“S-S-H”"], [/365/, "Microsoft 365", "“three sixty-five”"],
];
const dirs = fs.readdirSync(".").filter(d => /^(0[2-9]|[12]\d|30)-/.test(d) && fs.existsSync(path.join(d, "scenes.js"))).sort();
const eps = dirs.map(d => { const src = fs.readFileSync(path.join(d, "scenes.js"), "utf8"); const { S, END } = new Function(src + "; return { S, END };")();
  const cfg = JSON.parse(fs.readFileSync(path.join(d, "house.json"), "utf8")); const all = S.map(s => s.cap.map(c => c[1]).join(" ")).join(" ");
  const words = all.split(/\s+/).length; return { d, n: d.slice(0, 2), title: cfg.title.replace(/ Explainer$/, ""), series: cfg.series || "git", S, END, words, say: SAY.filter(([re]) => re.test(all)) }; });
const NAMES = { git: "Git", docker: "Docker", kubernetes: "Kubernetes", "ci/cd": "CI/CD with GitHub Actions", terraform: "Terraform", devsecops: "DevSecOps", stories: "Trending now" };
let md = `# Voice-over scripts: episodes 2–${eps[eps.length - 1].n}\n\n## How to record\n\n- **Pace:** each script is about 60 seconds. Speak a little slower than feels natural.\n- **Marks:** \`/\` is a short breath. A new paragraph is a pause of about one second.\n- **Smile on the first line.** The opening line is the hook; give it the most energy.\n- **Lift your voice on the win.** Every episode has one “it worked” moment, marked 🎉.\n- **Commands:** say them slowly and clearly, one word at a time.\n- **Fumbles:** repeat the line and keep going. The bad take gets cut.\n- **Room:** quiet room, phone a hand's width from your mouth, same spot every time.\n- **One file per episode,** named with the episode number.\n\n`;
let last = "";
for (const e of eps) {
  if (e.series !== last) { md += `\n# ${NAMES[e.series] || e.series}\n`; last = e.series; }
  md += `\n## Episode ${+e.n}: ${e.title}\n\n*About ${Math.round(e.END)} seconds · ${e.words} words*\n\n`;
  if (e.say.length) md += `**Say it like this**\n\n| Word | How to say it |\n|---|---|\n` + e.say.map(([, t, h]) => `| ${t.replace(/\|/g, "/")} | ${h} |`).join("\n") + "\n\n";
  md += `**Script**\n\n` + e.S.map(s => { const win = s.pose.some(p => p[1] === "cheer"); const line = s.cap.map(c => c[1]).join(" / "); return `> ${line}${win ? " 🎉" : ""}`; }).join("\n>\n") + "\n";
}
fs.writeFileSync("VOICEOVER-ALL.md", md);
const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const html = md.split("\n").map(l => { l = esc(l).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\*(.+?)\*/g, "<i>$1</i>").replace(/`(.+?)`/g, "<code>$1</code>");
  if (l.startsWith("# ")) return `<h1>${l.slice(2)}</h1>`; if (l.startsWith("## ")) return `<h2>${l.slice(3)}</h2>`; if (l.startsWith("&gt;")) return l.length > 5 ? `<p class="q">${l.slice(5)}</p>` : `<div class="gap"></div>`;
  if (l.startsWith("|---")) return ""; if (l.startsWith("| ")) { const c = l.split("|").slice(1, -1); return `<div class="row"><span>${c[0]}</span><span>${c[1]}</span></div>`; } if (l.startsWith("- ")) return `<li>${l.slice(2)}</li>`; return l ? `<p>${l}</p>` : ""; }).join("\n");
fs.writeFileSync("VOICEOVER-ALL.html", `<meta charset="utf-8"><style>body{font:15px/1.5 Inter,sans-serif;color:#14213d;max-width:720px;margin:auto;padding:24px}h1{font-size:24px;border-bottom:3px solid #ff5a1f;padding-bottom:6px;margin-top:34px;break-before:page}h1:first-of-type{break-before:auto}h2{font-size:18px;margin:26px 0 4px;break-after:avoid}.q{margin:2px 0 2px 14px;font-size:16px}.gap{height:12px}.row{display:flex;gap:12px;border-bottom:1px solid #e2e8f0;padding:3px 0;font-size:13px}.row span:first-child{flex:0 0 190px;font-family:monospace;font-weight:700}code{background:#f1f5f9;padding:0 4px;border-radius:4px}li{margin-left:18px}</style>` + html);
console.log(eps.length, "episodes", eps.reduce((a, e) => a + e.words, 0), "words");
