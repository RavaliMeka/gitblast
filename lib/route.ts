// Turns the path after gitblast.com/ (or anything a person pastes) into a view.
// Shared by the server and the browser, so it must stay free of Node APIs.

export type RepoView = "map" | "timelapse" | "pulls";

export type Route =
  | {
      kind: "repo";
      owner: string;
      repo: string;
      view: RepoView;
      /** Segments after /blob/ or /tree/: a branch name (which may contain slashes) followed by a path. */
      focus?: string[];
    }
  | { kind: "pr"; owner: string; repo: string; number: number }
  | { kind: "commit"; owner: string; repo: string; sha: string }
  | { kind: "compare"; owner: string; repo: string; base: string; head: string };

const SHA = /^[0-9a-f]{7,40}$/i;
const REF = /^[A-Za-z0-9][A-Za-z0-9._/-]{0,199}$/;

export function validSha(s: string): boolean {
  return SHA.test(s);
}

/** A branch or tag name that is safe to put in a GitHub API path. */
export function validRef(s: string): boolean {
  return REF.test(s) && !s.includes("..") && !s.includes("//") && !s.endsWith("/");
}

const OWNER = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/;
const REPO = /^[A-Za-z0-9._-]{1,100}$/;

export function validOwner(s: string): boolean {
  return OWNER.test(s);
}

export function validRepo(s: string): boolean {
  return REPO.test(s) && s !== "." && s !== "..";
}

/** Parses path segments such as ["vercel", "next.js", "pull", "123", "files"]. */
export function parseSegments(raw: string[]): Route | null {
  let segs = raw.map((s) => safeDecode(s)).filter((s) => s.length > 0);
  // Someone typed gitblast.com/ in front of a full GitHub link. Browsers fold
  // "https://" into "https:" plus an empty segment, which the filter drops.
  if (segs[0] === "https:" || segs[0] === "http:") segs = segs.slice(1);
  if (segs[0] === "github.com" || segs[0] === "www.github.com") segs = segs.slice(1);
  if (segs.length < 2) return null;

  const owner = segs[0];
  const repo = segs[1].replace(/\.git$/, "");
  if (!validOwner(owner) || !validRepo(repo)) return null;

  const [page, ...rest] = segs.slice(2);
  if ((page === "pull" || page === "pulls") && rest[0] && /^\d{1,9}$/.test(rest[0]) && Number(rest[0]) > 0) {
    return { kind: "pr", owner, repo, number: Number(rest[0]) };
  }
  if ((page === "commit" || page === "commits") && rest.length === 1 && validSha(rest[0])) {
    return { kind: "commit", owner, repo, sha: rest[0].toLowerCase() };
  }
  if (page === "compare" && rest.length > 0) {
    // base...head, or just head to compare against the default branch.
    const [a, b, ...more] = rest.join("/").split(/\.{2,3}/);
    const base = b === undefined ? "" : a;
    const head = b === undefined ? a : b;
    if (more.length === 0 && validRef(head) && (base === "" || validRef(base))) return { kind: "compare", owner, repo, base, head };
  }
  if ((page === "blob" || page === "tree") && rest.length > 1 && rest.length <= 40 && rest.every((s) => s !== ".." && s.length <= 255)) {
    return { kind: "repo", owner, repo, view: "map", focus: rest };
  }
  const view: RepoView = page === "timelapse" ? "timelapse" : page === "pulls" ? "pulls" : "map";
  return { kind: "repo", owner, repo, view };
}

/** Parses free text from the search box: a URL, owner/repo, or owner/repo#123. */
export function parseInput(text: string): Route | null {
  let t = text.trim();
  if (!t) return null;
  t = t.replace(/^(https?:\/\/)?(www\.)?(github|gitblast)\.com\//i, "");
  t = t.split(/[?]/)[0];
  const hash = t.match(/^([^#\s]+)#(\d+)$/);
  if (hash) t = `${hash[1]}/pull/${hash[2]}`;
  t = t.split("#")[0];
  return parseSegments(t.split("/"));
}

export function routePath(r: Route): string {
  const base = `/${r.owner}/${r.repo}`;
  if (r.kind === "pr") return `${base}/pull/${r.number}`;
  if (r.kind === "commit") return `${base}/commit/${r.sha}`;
  if (r.kind === "compare") return `${base}/compare/${r.base ? `${r.base}...` : ""}${r.head}`;
  if (r.focus) return `${base}/blob/${r.focus.map(encodeURIComponent).join("/")}`;
  return r.view === "map" ? base : `${base}/${r.view}`;
}

/**
 * Finds what a /blob/ or /tree/ link points at. The branch name comes first and may
 * itself contain slashes, so drop leading segments until the rest names a real file or folder.
 */
export function resolveFocus(focus: string[], files: Iterable<string>): { file?: string; folder?: string } {
  const all = new Set(files);
  for (let i = 1; i < focus.length; i++) {
    const path = focus.slice(i).join("/");
    if (all.has(path)) return { file: path };
    for (const f of all) if (f.startsWith(`${path}/`)) return { folder: path };
  }
  return {};
}

export function githubUrl(r: Route): string {
  return `https://github.com${routePath(r)}`;
}

export function safeDecode(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}
