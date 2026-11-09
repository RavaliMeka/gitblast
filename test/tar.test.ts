import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { Readable } from "node:stream";
import { gzipSync } from "node:zlib";
import { describe, expect, it } from "vitest";
import { readTarGz, type TarFile } from "@/lib/tar";

function archive(files: Record<string, string>, format: "pax" | "gnu"): Buffer {
  const dir = mkdtempSync(path.join(tmpdir(), "gitblast-tar-"));
  const root = path.join(dir, "owner-repo-abc123");
  for (const [p, body] of Object.entries(files)) {
    mkdirSync(path.dirname(path.join(root, p)), { recursive: true });
    writeFileSync(path.join(root, p), body);
  }
  const out = path.join(dir, "a.tar.gz");
  execFileSync("tar", [`--format=${format}`, "-czf", out, "-C", dir, "owner-repo-abc123"]);
  return readFileSync(out);
}

function stream(buf: Buffer, chunk = 7): ReadableStream<Uint8Array> {
  const parts: Buffer[] = [];
  for (let i = 0; i < buf.length; i += chunk) parts.push(buf.subarray(i, i + chunk));
  return Readable.toWeb(Readable.from(parts)) as ReadableStream<Uint8Array>;
}

const LIMITS = { maxCompressed: 1e8, maxUnpacked: 1e9, maxEntries: 1e5 };
const longPath = `${"deep/".repeat(30)}file.ts`;

describe("readTarGz", () => {
  for (const format of ["pax", "gnu"] as const) {
    it(`reads ${format} archives, including long paths, in small chunks`, async () => {
      const buf = archive({ "a.ts": "import './b'", "src/b.ts": "x".repeat(1500), [longPath]: "long", "img.png": "bin" }, format);
      const seen: TarFile[] = [];
      const { truncated } = await readTarGz(stream(buf), LIMITS, (p) => p.endsWith(".ts"), (f) => seen.push(f));
      expect(truncated).toBe(false);
      const byPath = Object.fromEntries(seen.map((f) => [f.path, f]));
      expect(Object.keys(byPath).sort()).toEqual(["a.ts", longPath, "img.png", "src/b.ts"].sort());
      expect(byPath["a.ts"].content?.toString()).toBe("import './b'");
      expect(byPath["src/b.ts"].content?.length).toBe(1500);
      expect(byPath[longPath].content?.toString()).toBe("long");
      expect(byPath["img.png"].content).toBeUndefined();
    });
  }

  it("stops at the unpacked size limit", async () => {
    const files: Record<string, string> = {};
    for (let i = 0; i < 50; i++) files[`f${i}.ts`] = "y".repeat(10_000);
    const seen: TarFile[] = [];
    const { truncated } = await readTarGz(stream(archive(files, "pax"), 4096), { ...LIMITS, maxUnpacked: 100_000 }, () => false, (f) => seen.push(f));
    expect(truncated).toBe(true);
    expect(seen.length).toBeLessThan(50);
  });

  it("keeps what it read from a cut-off download", async () => {
    const buf = archive({ "a.ts": "1", "b.ts": "2".repeat(5000) }, "pax");
    const { truncated } = await readTarGz(stream(buf.subarray(0, Math.floor(buf.length * 0.6))), LIMITS, () => true, () => undefined);
    expect(truncated).toBe(true);
  });

  it("does not buffer an oversized long-name header", async () => {
    const header = (name: string, size: number, type: string) => {
      const h = Buffer.alloc(512);
      h.write(name, 0);
      h.write(size.toString(8).padStart(11, "0"), 124);
      h.write(type, 156);
      h.write("ustar", 257);
      return h;
    };
    const huge = 200 * 1024;
    const tar = Buffer.concat([header("r/x", huge, "L"), Buffer.alloc(huge, 0x61), header("r/a.ts", 2, "0"), Buffer.from("ok"), Buffer.alloc(510), Buffer.alloc(1024)]);
    const seen: TarFile[] = [];
    const { truncated } = await readTarGz(stream(gzipSync(tar), 4096), LIMITS, () => true, (f) => seen.push(f));
    expect(truncated).toBe(false);
    expect(seen.map((f) => [f.path, f.content?.toString()])).toEqual([["a.ts", "ok"]]);
  });
});
