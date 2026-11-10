import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { LogoMark, Wordmark } from "@/components/Logo";
import { UrlBox } from "@/components/UrlBox";
import { SITE, swapParts } from "@/lib/site";

const EXAMPLES = ["facebook/react", "vercel/next.js", "golang/go", "sandeepkomal/blast-radius/pull/1"];

const PROMISES = ["Free and open source", "No sign-in, no install", "Public repositories only", "Your code is never stored"];

/** What each kind of GitHub link turns into. */
const GETS = [
  ["A repository", "github.com/owner/repo", "The blast map, the ripple effect, how its areas depend on each other and the time-lapse, all on one page."],
  ["A file or a folder", "…/blob/main/src/app.ts", "The same map, centred on that file or ranked within that folder."],
  ["A pull request, a commit or a branch", "…/pull/123 · …/commit/7f3e9a1 · …/compare/main...fix", "The blast radius report: a risk score, every file the change reaches, the tests to run and the order to review it in."],
];

const STEPS = [
  ["Reads the source.", "It downloads the public source at the commit you are looking at and keeps it in memory only."],
  ["Follows the imports.", "TypeScript, JavaScript, Python, Go, Rust, Java, Kotlin, Ruby, PHP, Dart, C and C++."],
  ["Walks outwards.", "Up to three steps through everything that imports the change, then it flags what needs a closer look."],
];

export default function Home() {
  return (
    <>
      <SiteHeader search={false} />
      <main>
        <section className="hero wrap">
          <div className="eyebrow">
            <LogoMark size={40} />
            <Wordmark />
          </div>
          <h1>Change one word. See your code differently.</h1>
          <p className="lede">
            Swap github.com for {SITE.host} in any GitHub link and get a map of the code: what breaks if it changes, how
            far a change ripples, and how the repository grew.
          </p>

          <Swap />

          <Start />

          <ul className="promises">
            {PROMISES.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>

        <section className="band band-alt">
          <div className="wrap">
            <div className="band-head">
              <h2>One swap. Everything about the code.</h2>
              <p>Every result comes from reading the code itself, so each line on a map can be traced back to an import.</p>
            </div>
            <div className="features">
              <article className="card feature">
                <div className="kicker">what breaks if this changes?</div>
                <h3>Blast radius.</h3>
                <p>
                  Pick any file and see everything a change to it would reach, the ripple it sends through the code and
                  the tests to run. On a pull request, commit or branch you also get a risk score and a review order.
                </p>
                <div className="art">
                  <BlastArt />
                </div>
              </article>
              <article className="card feature">
                <div className="kicker">how did it get here?</div>
                <h3>Time-lapse.</h3>
                <p>
                  Watch the codebase grow from its first commit to today. New folders appear, languages arrive, and big
                  rewrites show up as sudden changes in shape.
                </p>
                <div className="art">
                  <TimelapseArt />
                </div>
              </article>
            </div>

            <div className="card gets">
              <h3>What you get from each link</h3>
              <dl>
                {GETS.map(([what, link, get]) => (
                  <div key={what}>
                    <dt>
                      {what}
                      <span className="mono">{link}</span>
                    </dt>
                    <dd>{get}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="band" id="how">
          <div className="wrap">
            <div className="band-head">
              <h2>No guessing. No AI.</h2>
              <p>gitblast reads code the way your editor does, so every line on the map can be traced back to an import.</p>
            </div>
            <div className="steps">
              {STEPS.map(([title, text], i) => (
                <div key={title} className="card step band-alt">
                  <div className="n gradient-text">{i + 1}</div>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band band-alt closing">
          <div className="wrap">
            <div className="band-head" style={{ marginBottom: 40 }}>
              <h2>Try it on any repository.</h2>
              <p>Paste a link below, or just change github.com to {SITE.host} in your address bar.</p>
            </div>
            <Start examples={false} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

/** One search box for any GitHub link, with a few repositories to try. */
function Start({ examples = true }: { examples?: boolean }) {
  return (
    <div className="start">
      <UrlBox placeholder="Paste any GitHub link, or type owner/repo" cta="Show me" />
      {examples && (
        <div className="examples">
          <span className="faint">Try</span>
          {EXAMPLES.map((e) => (
            <Link key={e} href={`/${e}`}>
              {e.replace("/pull/", "#")}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function BlastArt() {
  const rings = [
    { r: 104, c: "var(--line)" },
    { r: 74, c: "var(--ripple2)" },
    { r: 46, c: "var(--ripple1)" },
  ];
  const dots = [
    [160, 125, 9, "var(--changed)"], [184, 108, 6, "var(--changed)"], [146, 102, 5, "var(--added)"],
    [212, 146, 5, "var(--ripple1)"], [122, 146, 5, "var(--ripple1)"], [168, 166, 4.5, "var(--ripple1)"],
    [232, 100, 4, "var(--ripple2)"], [96, 108, 4, "var(--ripple2)"], [196, 192, 4, "var(--ripple2)"],
    [112, 184, 4, "var(--ripple2)"], [252, 158, 3.5, "var(--ripple3)"], [70, 156, 3.5, "var(--ripple3)"],
  ] as const;
  return (
    <svg viewBox="0 0 320 250" width="100%" height="100%" aria-hidden="true">
      {rings.map((r) => (
        <circle key={r.r} cx="160" cy="125" r={r.r} fill="none" style={{ stroke: r.c }} strokeOpacity="0.6" strokeDasharray="2 5" />
      ))}
      {dots.slice(3).map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} Q160 125 165 115`} fill="none" style={{ stroke: "var(--ripple1)" }} strokeOpacity="0.35" />
      ))}
      {dots.map(([x, y, r, c], i) => (
        <circle key={i} cx={x} cy={y} r={r} style={{ fill: c }} />
      ))}
    </svg>
  );
}

function TimelapseArt() {
  const steps = [
    { x: 58, r: 15 },
    { x: 128, r: 28 },
    { x: 226, r: 52 },
  ];
  return (
    <svg viewBox="0 0 320 250" width="100%" height="100%" aria-hidden="true">
      <line x1="20" y1="222" x2="300" y2="222" style={{ stroke: "var(--line)" }} />
      {steps.map((s, i) => (
        <g key={i} opacity={0.4 + i * 0.3}>
          <circle cx={s.x} cy={130} r={s.r} style={{ fill: "var(--map-folder)", stroke: "var(--map-folder-line)" }} />
          <circle cx={s.x - s.r * 0.35} cy={130 - s.r * 0.2} r={s.r * 0.42} fill="#0a84ff" />
          <circle cx={s.x + s.r * 0.42} cy={130 + s.r * 0.18} r={s.r * 0.32} fill="#5e5ce6" />
          {i > 0 && <circle cx={s.x + s.r * 0.05} cy={130 + s.r * 0.62} r={s.r * 0.22} fill="#40c8e0" />}
          <circle cx={s.x} cy={222} r="3.5" style={{ fill: i === 2 ? "var(--text)" : "var(--line)" }} />
        </g>
      ))}
    </svg>
  );
}

function Swap() {
  const { pre, old, next, post } = swapParts();
  return (
    <div className="swap" aria-label={`Replace github.com with ${SITE.host} in the address`}>
      <span className="faint">https://{pre}</span>
      <span className="slot" style={{ minWidth: `${Math.max(old.length, next.length)}ch` }}>
        <span className="old">{old}</span>
        <span className="new gradient-text" aria-hidden="true">
          {next}
        </span>
      </span>
      <span className="faint">{post}/</span>
      <span>owner/repo</span>
    </div>
  );
}
