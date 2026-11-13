import { TTLCache } from "@/lib/cache";
import { fail, respond } from "@/lib/http";
import { analyzeCommit, analyzeCompare } from "@/lib/pr";
import { validOwner, validRef, validRepo, validSha } from "@/lib/route";
import type { PRReport } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const cache = new TTLCache<PRReport>(50);

// The blast radius of a commit (?sha=) or of one branch against another (?head=, optional ?base=).
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const owner = q.get("owner") ?? "";
  const repo = q.get("repo") ?? "";
  const sha = q.get("sha");
  const base = q.get("base") ?? "";
  const head = q.get("head") ?? "";
  if (!validOwner(owner) || !validRepo(repo)) return fail("bad_request", "That isn't a valid repository.", 400);
  const bad = () => fail("bad_request", "That isn't a valid commit or comparison.", 400);
  if (sha !== null) {
    if (!validSha(sha)) return bad();
  } else {
    if (!validRef(head)) return bad();
    if (base !== "" && !validRef(base)) return bad();
  }
  // Branch names are case-sensitive, so only the repository part is folded.
  const key = `${owner}/${repo}`.toLowerCase() + `@${sha ?? `${base}...${head}`}`;
  // A commit never changes, so it can be cached for longer than a moving branch.
  return respond(req, sha ? 3600 : 300, () =>
    cache.get(key, sha ? 3600_000 : 5 * 60_000, () => (sha ? analyzeCommit(owner, repo, sha) : analyzeCompare(owner, repo, base, head))),
  );
}
