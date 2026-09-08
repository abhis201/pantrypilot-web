"use client";

import {
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";

interface RevealProps {
  children: ReactNode;
  /** Rendered element. Use a semantic tag so reveals don't add wrapper divs. */
  as?: ElementType;
  /** Stagger offset in ms. Keep siblings 60–90ms apart; more reads as sluggish. */
  delay?: number;
  /** Vertical travel in px. Small for text, larger for cards. */
  y?: number;
  /** Start slightly scaled-down — used sparingly, on hero-weight elements. */
  scale?: number;
  className?: string;
  id?: string;
}

/**
 * Reveal-on-scroll wrapper.
 *
 * The element ships with `data-reveal` (hidden, translated) and gets `.is-in`
 * the first time it crosses the viewport threshold, then `.is-settled` once the
 * transition finishes so the browser can drop the compositor layer. All of the
 * actual animation lives in globals.css, including the reduced-motion override
 * that makes this a no-op.
 *
 * IntersectionObserver rather than scroll math: it costs nothing per frame, and
 * this page already runs two scroll listeners.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  y = 20,
  scale,
  className = "",
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Honour the OS setting up front: reveal immediately, never observe.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.classList.add("is-in", "is-settled");
      return;
    }

    const settle = () => el.classList.add("is-settled");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("is-in");
        el.addEventListener("transitionend", settle, { once: true });
        observer.disconnect();
      },
      {
        // Fire a little before the element is fully in view, so the motion is
        // finishing as the reader's eye arrives rather than starting then.
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.1,
      }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      el.removeEventListener("transitionend", settle);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      data-reveal=""
      style={
        {
          "--reveal-delay": `${delay}ms`,
          "--reveal-y": `${y}px`,
          ...(scale ? { "--reveal-s": scale } : {}),
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
