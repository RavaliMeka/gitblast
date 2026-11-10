"use client";

import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { parseInput, routePath } from "@/lib/route";

const HINT = "Paste a GitHub link, or type owner/repo or owner/repo#123.";

/** A search box that turns whatever is pasted into a gitblast page. */
export function UrlBox({
  compact = false,
  placeholder,
  cta,
}: {
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
    const route = parseInput(value);
    if (!route) {
      setError(HINT);
      return;
    }
    setError("");
    router.push(routePath(route));
  }

  return (
    <form onSubmit={submit} role="search">
      <div className={`urlbox${compact ? " compact" : ""}`}>
        <label htmlFor={id} className="sr-only">
          GitHub link
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
