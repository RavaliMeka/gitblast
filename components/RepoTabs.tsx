import Link from "next/link";
import type { RepoView } from "@/lib/route";

const TABS: [RepoView, string, string][] = [
  ["map", "Blast map", ""],
  ["timelapse", "Time-lapse", "/timelapse"],
  ["pulls", "Pull requests", "/pulls"],
];

export function RepoTabs({ owner, repo, view }: { owner: string; repo: string; view: RepoView }) {
  return (
    <nav className="tabs" aria-label="Views of this repository">
      {TABS.map(([id, label, path]) => (
        <Link key={id} href={`/${owner}/${repo}${path}`} aria-current={id === view ? "page" : undefined}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
