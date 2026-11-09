// Walks an import graph. Shared by the server and the browser, so it must stay free of Node APIs.

export type Reach = Map<string, { depth: 1 | 2 | 3; via: string }>;

/** Everything that imports `start`, directly or through other files, up to three steps away. */
export function reachOf(start: string, users: Map<string, string[]>): Reach {
  const seen: Reach = new Map();
  let frontier = [start];
  for (let depth = 1 as 1 | 2 | 3; depth <= 3 && frontier.length > 0; depth++) {
    const next: string[] = [];
    for (const file of frontier) {
      for (const user of users.get(file) ?? []) {
        if (user === start || seen.has(user)) continue;
        seen.set(user, { depth, via: file });
        next.push(user);
      }
    }
    frontier = next;
  }
  return seen;
}

export interface Ranked {
  path: string;
  reach: number;
  direct: number;
}

/**
 * The files a change would travel furthest from. Working that out for every file is
 * too slow on a large repository, so only the `pool` most-imported files compete.
 */
export function rank(users: Map<string, string[]>, keep: (path: string) => boolean = () => true, pool = 300, top = 25): Ranked[] {
  return [...users.entries()]
    .filter(([path]) => keep(path))
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, pool)
    .map(([path, direct]) => ({ path, reach: reachOf(path, users).size, direct: direct.length }))
    .sort((a, b) => b.reach - a.reach || b.direct - a.direct || a.path.localeCompare(b.path))
    .slice(0, top);
}
