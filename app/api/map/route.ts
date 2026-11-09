import { TTLCache } from "@/lib/cache";
import { fail, respond } from "@/lib/http";
import { analyzeRepoMap } from "@/lib/repomap";
import { validOwner, validRepo } from "@/lib/route";
import type { RepoMap } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const cache = new TTLCache<RepoMap>(30);

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const owner = q.get("owner") ?? "";
  const repo = q.get("repo") ?? "";
  if (!validOwner(owner) || !validRepo(repo)) return fail("bad_request", "That isn't a valid repository.", 400);
  const key = `${owner}/${repo}`.toLowerCase();
  return respond(req, 3600, () => cache.get(key, 3600_000, () => analyzeRepoMap(owner, repo)));
}
