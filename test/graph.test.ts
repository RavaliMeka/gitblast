import { describe, expect, it } from "vitest";
import { rank, reachOf } from "@/lib/graph";
import { buildMap } from "@/lib/repomap";

// core ← a ← b ← c ← d, and core ← t (a test). "users" maps a file to the files importing it.
const users = new Map([
  ["core.ts", ["a.ts", "core.test.ts"]],
  ["a.ts", ["b.ts"]],
  ["b.ts", ["c.ts", "a.ts"]],
  ["c.ts", ["d.ts"]],
]);

describe("reachOf", () => {
  it("walks three steps out and remembers how it got there", () => {
    const reach = reachOf("core.ts", users);
    expect([...reach.keys()].sort()).toEqual(["a.ts", "b.ts", "c.ts", "core.test.ts"]);
    expect(reach.get("c.ts")).toEqual({ depth: 3, via: "b.ts" });
    expect(reach.has("d.ts")).toBe(false);
  });

  it("survives import cycles and never counts the file itself", () => {
    expect([...reachOf("a.ts", users).keys()].sort()).toEqual(["b.ts", "c.ts", "d.ts"]);
    expect(reachOf("d.ts", users).size).toBe(0);
  });
});

describe("rank", () => {
  it("puts the file a change travels furthest from first", () => {
    // a and b both reach three files; b wins the tie because more files import it directly.
    expect(rank(users).map((r) => r.path)).toEqual(["core.ts", "b.ts", "a.ts", "c.ts"]);
    expect(rank(users)[0]).toEqual({ path: "core.ts", reach: 4, direct: 2 });
    expect(rank(users, (p) => p.startsWith("b")).map((r) => r.path)).toEqual(["b.ts"]);
  });
});

describe("buildMap", () => {
  it("indexes connected files and counts every file per area", () => {
    const map = buildMap(["core.ts", "a.ts", "b.ts", "c.ts", "d.ts", "core.test.ts", "docs/readme.md"], users);
    expect(map.files).toHaveLength(6);
    expect(map.files).not.toContain("docs/readme.md");
    expect(map.edges).toHaveLength(6);
    for (const [from, to] of map.edges) expect(users.get(map.files[to])).toContain(map.files[from]);
    expect(map.top[0].path).toBe("core.ts");
    expect(map.areaTotals).toEqual({ "(root)": 6, docs: 1 });
  });
});
