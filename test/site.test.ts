import { describe, expect, it } from "vitest";
import { swapParts } from "@/lib/site";

describe("swapParts", () => {
  it("strikes out only the part of github.com that changes", () => {
    expect(swapParts("gitblast.com")).toEqual({ pre: "git", old: "hub", next: "blast", post: ".com" });
    expect(swapParts("gitblast.vercel.app")).toEqual({ pre: "git", old: "hub.com", next: "blast.vercel.app", post: "" });
    expect(swapParts("localhost:3000")).toEqual({ pre: "", old: "github.com", next: "localhost:3000", post: "" });
  });
});
