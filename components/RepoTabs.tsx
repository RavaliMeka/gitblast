import Link from "next/link";
import type { RepoView } from "@/lib/route";

// The blast map and the time-lapse share one page; /timelapse only puts the time-lapse first.
const TABS: [string, string, (view: RepoView) => boolean][] = [
  ["", "Maps", (v) => v !== "pulls"],
  ["/pulls", "Pull requests", (v) => v === "pulls"],
];

export function RepoTabs({ owner, repo, view }: { owner: string; repo: string; view: RepoView }) {
  return (
    <nav className="tabs" aria-label="Views of this repository">
      {TABS.map(([path, label, on]) => (
        <Link key={label} href={`/${owner}/${repo}${path}`} aria-current={on(view) ? "page" : undefined}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
