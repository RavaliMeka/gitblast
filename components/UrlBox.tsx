"use client";

import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { parseInput, routePath } from "@/lib/route";

type Mode = "any" | "timelapse";

const HINT: Record<Mode, string> = {
  any: "Paste a GitHub link, or type owner/repo or owner/repo#123.",
  timelapse: "Paste a repository link, or type owner/repo.",
};

/**
 * A search box that turns whatever is pasted into a gitblast page. `timelapse`
 * opens the repository's time-lapse whatever kind of link is pasted.
 */
export function UrlBox({
  mode = "any",
  compact = false,
  placeholder,
  cta,
}: {
  mode?: Mode;
  compact?: boolean;
  placeholder?: string;
  cta?: string;
}) {
  const router = useRouter();
  const id = useId();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    let route = parseInput(value);
    if (route && mode === "timelapse") route = { kind: "repo", owner: route.owner, repo: route.repo, view: "timelapse" };
    if (!route) {
      setError(HINT[mode]);
      return;
    }
    setError("");
    router.push(routePath(route));
  }

  return (
    <form onSubmit={submit} role="search">
      <div className={`urlbox${compact ? " compact" : ""}`}>
        <label htmlFor={id} className="sr-only">
          {mode === "timelapse" ? "GitHub repository" : "GitHub link"}
        </label>
        <input
          id={id}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder ?? (compact ? "owner/repo or a GitHub link" : "https://github.com/owner/repo")}
          autoComplete="off"
          spellCheck={false}
          aria-invalid={error ? true : undefined}
        />
        <button type="submit" className={`btn btn-primary${compact ? " btn-sm" : ""}`}>
          {cta ?? (compact ? "Go" : "Show me")}
        </button>
      </div>
      {error && !compact && <div className="form-error">{error}</div>}
    </form>
  );
}
