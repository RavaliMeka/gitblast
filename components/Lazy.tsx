"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renders its children once the visitor scrolls them into view (or asks for them), so the
 * second map on a page doesn't spend GitHub requests for visitors who never reach it.
 */
export function Lazy({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    // While the first map is still loading the page is short, so being in view isn't enough: wait for a scroll.
    const check = () => el.getBoundingClientRect().top < window.innerHeight + 300 && setShown(true);
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [shown]);
  if (shown) return <>{children}</>;
  return (
    <div ref={ref} className="lazy">
      <button type="button" className="btn btn-ghost" onClick={() => setShown(true)}>
        {label}
      </button>
    </div>
  );
}
