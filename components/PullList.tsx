"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { PullSummary } from "@/lib/types";
import { useApi } from "@/lib/useApi";

/** A repository's open pull requests, each one click from its blast radius. */
export function PullList({ owner, repo }: { owner: string; repo: string }) {
  const router = useRouter();
  const state = useApi<PullSummary[]>(`/api/pulls?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`);
  const [n, setN] = useState("");

  function jump(e: FormEvent) {
    e.preventDefault();
    const v = Number(n.replace(/^#/, ""));
    if (Number.isInteger(v) && v > 0) router.push(`/${owner}/${repo}/pull/${v}`);
  }

  return (
    <section className="section">
      <div className="card card-pad">
        <h2>Open pull requests</h2>
        {state.status === "loading" && <p className="faint" style={{ margin: 0 }}>Loading open pull requests…</p>}
        {state.status === "error" && <p className="faint" style={{ margin: 0 }}>Couldn&apos;t load open pull requests.</p>}
        {state.status === "ready" && state.data.length === 0 && <p className="faint" style={{ margin: 0 }}>No open pull requests right now.</p>}
        {state.status === "ready" && state.data.length > 0 && (
          <ul className="pulls">
            {state.data.map((p) => (
              <li key={p.number}>
                <Link href={`/${owner}/${repo}/pull/${p.number}`}>
                  <span className="t">
                    <span className="faint mono">#{p.number}</span> {p.title}
                    {p.draft && <span className="pill" style={{ marginLeft: 8 }}>Draft</span>}
                  </span>
                  <span className="go chev">Show blast radius</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <form className="pr-jump" onSubmit={jump}>
          <div className="urlbox compact" style={{ flex: 1, maxWidth: 320 }}>
            <label htmlFor="pr-number" className="sr-only">Pull request number</label>
            <input id="pr-number" value={n} onChange={(e) => setN(e.target.value)} placeholder="Any PR number, e.g. 1234" inputMode="numeric" />
            <button type="submit" className="btn btn-primary btn-sm">Go</button>
          </div>
        </form>
      </div>
    </section>
  );
}
