// Reads the import graph of a whole repository at its default branch, so the
// page can answer "what would a change to this file reach?" for any file.

import { areaOf } from "./area";
import { api, getRepo } from "./github";
import { rank } from "./graph";
import { importGraph, scanSource } from "./pr";
import type { RepoMap } from "./types";

const MAX_FILES = 6000;
const MAX_EDGES = 30_000;

export async function analyzeRepoMap(owner: string, repo: string): Promise<RepoMap> {
  const meta = await getRepo(owner, repo);
  // Pin the branch to a commit so file links keep pointing at what was read.
  const { data: branch } = await api<{ sha: string }>(`/repos/${meta.owner}/${meta.repo}/commits/${meta.defaultBranch.split("/").map(encodeURIComponent).join("/")}`);
  const scan = await scanSource(meta, [branch.sha]);
  return {
    repo: { owner: meta.owner, repo: meta.repo, description: meta.description, stars: meta.stars, defaultBranch: meta.defaultBranch },
    sha: branch.sha,
    ...buildMap(scan.paths, importGraph(scan).users),
    filesScanned: scan.imports.size,
    partial: !scan.complete || scan.failed,
    generatedAt: new Date().toISOString(),
  };
}

export function buildMap(paths: string[], users: Map<string, string[]>): Pick<RepoMap, "files" | "edges" | "top" | "areaTotals"> {
  const top = rank(users);

  // Keep the most-imported files first when the graph has to be cut down.
  const index = new Map<string, number>();
  const edges: [number, number][] = [];
  const id = (path: string) => {
    let i = index.get(path);
    if (i === undefined && index.size < MAX_FILES) index.set(path, (i = index.size));
    return i;
  };
  for (const [imported, importers] of [...users.entries()].sort((a, b) => b[1].length - a[1].length)) {
    for (const importer of importers) {
      if (edges.length >= MAX_EDGES) break;
      const to = id(imported);
      const from = id(importer);
      if (from !== undefined && to !== undefined) edges.push([from, to]);
    }
  }

  const areaTotals: Record<string, number> = {};
  for (const p of paths) areaTotals[areaOf(p)] = (areaTotals[areaOf(p)] ?? 0) + 1;
  return { files: [...index.keys()], edges, top, areaTotals };
}
