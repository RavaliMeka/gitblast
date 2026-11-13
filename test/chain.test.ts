import { describe, expect, it } from "vitest";
import { layoutChain, RING, riskOf, SPACING } from "@/components/chain";
import type { Reach } from "@/lib/graph";

const reach: Reach = new Map([
  ["a.ts", { depth: 1, via: "core.ts" }],
  ["b.ts", { depth: 1, via: "core.ts" }],
  ["c.ts", { depth: 2, via: "a.ts" }],
  ["d.ts", { depth: 3, via: "c.ts" }],
]);
const others = Array.from({ length: 300 }, (_, i) => `other/${String(i).padStart(3, "0")}.ts`);

describe("layoutChain", () => {
  const layout = layoutChain("core.ts", reach, [...others, "core.ts", "a.ts"]);

  it("puts the picked file in the middle and every file on the table exactly once", () => {
    expect(layout.slots.get("core.ts")).toMatchObject({ x: 0, z: 0, radius: 0, depth: 0 });
    expect(layout.slots.size).toBe(1 + reach.size + others.length);
  });

  it("orders the rings by distance from the change, with the unreached files outside the edge", () => {
    const r = (p: string) => layout.slots.get(p)!.radius;
    expect(r("a.ts")).toBe(r("b.ts"));
    expect(r("c.ts")).toBe(r("a.ts") + RING);
    expect(r("d.ts")).toBe(r("c.ts") + RING);
    expect(layout.edge).toBeGreaterThan(r("d.ts"));
    for (const p of others) {
      expect(layout.slots.get(p)!.depth).toBe(-1);
      expect(r(p)).toBeGreaterThan(layout.edge);
    }
    expect(layout.outer).toBe(Math.max(...others.map(r)));
  });

  it("never puts two dominoes closer along a ring than a domino is wide", () => {
    const byRing = new Map<number, number[]>();
    for (const s of layout.slots.values()) if (s.radius > 0) byRing.set(s.radius, [...(byRing.get(s.radius) ?? []), s.angle]);
    for (const [radius, angles] of byRing) {
      angles.sort((a, b) => a - b);
      for (let i = 1; i < angles.length; i++) expect((angles[i] - angles[i - 1]) * radius).toBeGreaterThanOrEqual(SPACING - 0.2);
    }
  });

  it("copes with a file nothing imports", () => {
    const lone = layoutChain("x.ts", new Map(), ["y.ts"]);
    expect(lone.slots.size).toBe(2);
    expect(lone.slots.get("y.ts")!.radius).toBeGreaterThan(lone.edge);
  });
});

describe("riskOf", () => {
  it("turns a share of the codebase into a level", () => {
    expect(riskOf(0, 100)).toEqual({ percent: 0, level: "none" });
    expect(riskOf(1, 100).level).toBe("low");
    expect(riskOf(2, 100).level).toBe("medium");
    expect(riskOf(8, 100).level).toBe("high");
    expect(riskOf(5, 0)).toEqual({ percent: 0, level: "low" });
  });
});
