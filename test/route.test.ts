import { describe, expect, it } from "vitest";
import { parseInput, parseSegments, resolveFocus, routePath, validRef } from "@/lib/route";

describe("parseSegments", () => {
  it("reads repositories and pull requests", () => {
    expect(parseSegments(["vercel", "next.js"])).toEqual({ kind: "repo", owner: "vercel", repo: "next.js", view: "map" });
    expect(parseSegments(["a", "b", "pull", "42", "files"])).toEqual({ kind: "pr", owner: "a", repo: "b", number: 42 });
  });

  it("reads commits and comparisons", () => {
    expect(parseSegments(["a", "b", "commit", "7F3E9A1"])).toEqual({ kind: "commit", owner: "a", repo: "b", sha: "7f3e9a1" });
    expect(parseSegments(["a", "b", "compare", "main...feat", "x"])).toEqual({ kind: "compare", owner: "a", repo: "b", base: "main", head: "feat/x" });
    expect(parseSegments(["a", "b", "compare", "feat"])).toEqual({ kind: "compare", owner: "a", repo: "b", base: "", head: "feat" });
    expect(parseSegments(["a", "b", "pull", "3", "commits", "abc1234"])).toEqual({ kind: "pr", owner: "a", repo: "b", number: 3 });
  });

  it("keeps the file or folder of a blob or tree link, and the repository views", () => {
    expect(parseSegments(["a", "b", "tree", "main", "src"])).toEqual({ kind: "repo", owner: "a", repo: "b", view: "map", focus: ["main", "src"] });
    expect(parseSegments(["a", "b", "timelapse"])).toEqual({ kind: "repo", owner: "a", repo: "b", view: "timelapse" });
    expect(parseSegments(["a", "b", "pulls"])).toEqual({ kind: "repo", owner: "a", repo: "b", view: "pulls" });
    expect(parseSegments(["a", "b.git"])).toEqual({ kind: "repo", owner: "a", repo: "b", view: "map" });
    expect(parseSegments(["a", "b", "issues", "4"])).toEqual({ kind: "repo", owner: "a", repo: "b", view: "map" });
  });

  it("falls back to the repository for commits and refs it can't trust", () => {
    const repo = { kind: "repo", owner: "a", repo: "b", view: "map" };
    expect(parseSegments(["a", "b", "commit", "not-a-sha"])).toEqual(repo);
    expect(parseSegments(["a", "b", "compare", "main...feat?x=1"])).toEqual(repo);
    expect(parseSegments(["a", "b", "compare", "a...b...c"])).toEqual(repo);
    expect(parseSegments(["a", "b", "blob", "main", "..", "etc"])).toEqual(repo);
    expect(validRef("feat/x-1.2")).toBe(true);
    for (const bad of ["", "-x", "a..b", "a//b", "a/", "a b", "a:b", "a%2e"]) expect(validRef(bad)).toBe(false);
  });

  it("accepts a full GitHub link pasted after the domain", () => {
    expect(parseSegments(["https:", "", "github.com", "a", "b", "pull", "7"])).toEqual({ kind: "pr", owner: "a", repo: "b", number: 7 });
    expect(parseSegments(["github.com", "a", "b"])).toEqual({ kind: "repo", owner: "a", repo: "b", view: "map" });
  });

  it("rejects names GitHub would not allow", () => {
    expect(parseSegments(["a"])).toBeNull();
    expect(parseSegments(["-a", "b"])).toBeNull();
    expect(parseSegments(["a", ".."])).toBeNull();
    expect(parseSegments(["a", "b c"])).toBeNull();
    expect(parseSegments(["a", "b", "pull", "0"])).toEqual({ kind: "repo", owner: "a", repo: "b", view: "map" });
  });
});

describe("parseInput", () => {
  it("understands what people paste", () => {
    expect(parseInput("https://github.com/a/b/pull/12?diff=split")).toEqual({ kind: "pr", owner: "a", repo: "b", number: 12 });
    expect(parseInput("  a/b#9 ")).toEqual({ kind: "pr", owner: "a", repo: "b", number: 9 });
    expect(parseInput("gitblast.com/a/b")).toEqual({ kind: "repo", owner: "a", repo: "b", view: "map" });
    expect(parseInput("a/b/issues#readme")).toEqual({ kind: "repo", owner: "a", repo: "b", view: "map" });
    expect(parseInput("https://github.com/a/b/commit/abc1234")).toEqual({ kind: "commit", owner: "a", repo: "b", sha: "abc1234" });
    expect(parseInput("hello")).toBeNull();
  });

  it("round-trips through routePath", () => {
    expect(routePath({ kind: "pr", owner: "a", repo: "b", number: 3 })).toBe("/a/b/pull/3");
    for (const path of ["/a/b", "/a/b/timelapse", "/a/b/pulls", "/a/b/commit/abc1234", "/a/b/compare/main...feat/x", "/a/b/compare/feat", "/a/b/blob/main/src/x.ts"]) {
      const route = parseSegments(path.slice(1).split("/"));
      expect(route && routePath(route)).toBe(path);
    }
  });
});

describe("resolveFocus", () => {
  const files = ["src/a.ts", "src/deep/b.ts", "x/src/a.ts"];
  it("finds the file or folder after a branch name, even one with slashes", () => {
    expect(resolveFocus(["main", "src", "a.ts"], files)).toEqual({ file: "src/a.ts" });
    expect(resolveFocus(["feat", "x", "src", "a.ts"], files)).toEqual({ file: "x/src/a.ts" });
    expect(resolveFocus(["release", "1.0", "src", "deep"], files)).toEqual({ folder: "src/deep" });
    expect(resolveFocus(["main", "nope.ts"], files)).toEqual({});
  });
});
