import { describe, expect, it } from "vitest";
import { apiUrl } from "@/lib/github";

describe("apiUrl", () => {
  it("builds GitHub API URLs, query strings included", () => {
    expect(apiUrl("/repos/a/b/commits/release/1.0").href).toBe("https://api.github.com/repos/a/b/commits/release/1.0");
    expect(apiUrl("/repos/a/b/compare/main...feat?page=2").href).toBe("https://api.github.com/repos/a/b/compare/main...feat?page=2");
    expect(apiUrl("/repos/a/b/commits?sha=release%2F1.0&per_page=1").search).toBe("?sha=release%2F1.0&per_page=1");
  });

  it("refuses paths that could reach another endpoint or host", () => {
    for (const bad of [
      "repos/a/b",
      "/repos/a/b/../../user",
      "/repos/a/b/./x",
      "/repos/a/b/%2e%2e/user",
      "/repos/a/b/x%2F..%2Fy",
      "/repos/a/b\\x",
      "//evil.example/x",
      "/repos/a//b",
    ]) {
      expect(() => apiUrl(bad), bad).toThrow();
    }
  });
});
