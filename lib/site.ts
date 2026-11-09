const url = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const SITE = {
  name: "gitblast",
  url,
  /** The bare host people type, e.g. "gitblast.vercel.app". */
  host: new URL(url).host,
  source: "https://github.com/RavaliMeka/gitblast",
  contact: "https://github.com/RavaliMeka/gitblast/issues",
};

/** Splits github.com against our host so the hero can strike out only the part that changes. */
export function swapParts(host = SITE.host) {
  const from = "github.com";
  let i = 0;
  while (i < from.length && i < host.length && from[i] === host[i]) i++;
  let j = 0;
  while (j < from.length - i && j < host.length - i && from[from.length - 1 - j] === host[host.length - 1 - j]) j++;
  return { pre: from.slice(0, i), old: from.slice(i, from.length - j), next: host.slice(i, host.length - j), post: from.slice(from.length - j) };
}
