"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  label: string;
}

/** "4. Data Storage and Security" → "4-data-storage-and-security" */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 64);
}

/**
 * Sticky section index for the long legal pages, with the current section
 * highlighted as you scroll.
 *
 * It reads the headings out of the rendered DOM rather than taking a prop,
 * so the Terms and Privacy pages stay plain static JSX — add, remove, or
 * rename an `<h2>` and the index follows automatically. It also assigns each
 * heading an id, which makes every section directly linkable (useful when
 * support needs to point someone at a specific clause).
 */
export default function LegalToc() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLHeadingElement>(".legal-content h2")
    );
    if (headings.length === 0) return;

    const next = headings.map((h) => {
      const label = (h.textContent ?? "").trim();
      if (!h.id) h.id = slugify(label);
      return { id: h.id, label };
    });

    // Reading the rendered document is an external system, not derived state,
    // so the cascading-render warning doesn't apply.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(next);

    let frame: number | null = null;

    const update = () => {
      frame = null;
      // The active section is the last heading whose top has passed under the
      // navbar. Cheaper and steadier than an IntersectionObserver here, where
      // sections vary wildly in length.
      const offset = 140;
      let current = next[0]?.id ?? "";
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= offset) current = h.id;
        else break;
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <nav className="legal-toc hidden lg:block" aria-label="Sections on this page">
      <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.1em] text-ink-muted">Contents</p>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="legal-toc__link"
          aria-current={activeId === item.id ? "true" : undefined}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
