// Lays out the chain reaction: the picked file in the middle of a round table, the files a
// change to it reaches in rings around it, a gap, then every file it cannot reach.
// Pure geometry, so it can be tested without a browser.

import type { Reach } from "@/lib/graph";

export interface Slot {
  x: number;
  z: number;
  /** Angle around the table; a domino faces outwards along it. */
  angle: number;
  /** Distance from the middle of the table. */
  radius: number;
  /** 0 for the picked file, 1 to 3 for files it reaches, -1 for files it cannot reach. */
  depth: number;
}

export interface ChainLayout {
  slots: Map<string, Slot>;
  /** Radius of the circle drawn round the fallen dominoes. */
  edge: number;
  /** Radius of the outermost ring, which sets the size of the table. */
  outer: number;
}

/** Room each domino takes along its ring, and the distance between rings. */
export const SPACING = 4.5;
export const RING = 9.2;
const FIRST = 12;
const GAP = 9.5;

export function layoutChain(center: string, reach: Reach, others: string[]): ChainLayout {
  const slots = new Map<string, Slot>();
  let outer = 0;
  // Fills whole rings outwards from `radius` and returns the radius of the next free ring.
  const fill = (paths: string[], radius: number, depth: number, packed: boolean): number => {
    const list = [...paths].sort();
    for (let k = 0; k < list.length; radius += RING) {
      const room = Math.max(6, Math.floor((2 * Math.PI * radius) / SPACING));
      const n = Math.min(room, list.length - k);
      for (let j = 0; j < n; j++) {
        // A ring that isn't full is spread evenly when it has fallen, so the circle stays whole.
        const angle = radius * 0.37 + (j / (packed ? room : n)) * Math.PI * 2;
        slots.set(list[k + j], { x: Math.cos(angle) * radius, z: Math.sin(angle) * radius, angle, radius, depth });
      }
      k += n;
      outer = radius;
    }
    return radius;
  };

  slots.set(center, { x: 0, z: 0, angle: Math.PI / 2, radius: 0, depth: 0 });
  let next = FIRST;
  for (const depth of [1, 2, 3]) {
    next = fill([...reach.entries()].filter(([, r]) => r.depth === depth).map(([p]) => p), next, depth, false);
  }
  const edge = reach.size > 0 ? next - RING + 8.5 : 9;
  fill(others.filter((p) => p !== center && !reach.has(p)), edge + GAP, -1, true);
  return { slots, edge, outer: Math.max(outer, edge) };
}

/** How much of the codebase a change takes down, as a risk level a person can act on. */
export function riskOf(reached: number, total: number): { percent: number; level: "high" | "medium" | "low" | "none" } {
  const percent = total > 0 ? (reached / total) * 100 : 0;
  return { percent, level: reached === 0 ? "none" : percent >= 8 ? "high" : percent >= 1.5 ? "medium" : "low" };
}
