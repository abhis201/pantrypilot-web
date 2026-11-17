"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Everything that can be a page. Which of these actually are depends on the
 * width (a phone splits five sections into pages of their own, see 5.13 in
 * globals.css), so the list is filtered by the computed `scroll-snap-align`
 * rather than repeated here as a second source of truth.
 */
const CANDIDATES =
  "main > section, #footer, .add-column, .plan-column, .recipe-column, .founder__content, .founder__closing, .pricing__page";

/* --- Storyboard -----------------------------------------------------------
   wheel / trackpad gesture
     0ms        page starts moving (browser smooth scroll to the next snap)
     0ms        dots fade in (DOTS_IN, CSS)
     ~500ms     page lands; further wheel input is ignored until then
     +180ms     a pause this long in the wheel stream ends the gesture
   idle
     +700ms     dots fade out (DOTS_OUT, CSS)
   ------------------------------------------------------------------------ */
const TIMING = {
  /** A gap this long between wheel events means the gesture is over. A
   *  trackpad's momentum tail thins out to one event every 100ms or so
   *  before it stops, so anything shorter splits one flick into two. */
  gestureGap: 180,
  /** Give up waiting for the scroll to land after this long. */
  landTimeout: 1100,
  /** Dots stay this long after the last scroll movement. */
  dotsLinger: 700,
};

/** A momentum tail only decays, so once the page has landed a delta this
 *  many times the previous one (and at least this big) is a new push from
 *  the hand, not more of the old one. */
const REACCELERATION = 3;
const REACCELERATION_MIN = 24;

/** Where a page's top edge rests: under the navbar on desktop, at the very
 *  top on a phone, where the bar hides. html's scroll-padding-top is that
 *  number, already resolved to px. */
function navHeight() {
  const padding = parseFloat(
    getComputedStyle(document.documentElement).scrollPaddingTop
  );
  return Number.isFinite(padding) ? padding : 76;
}

/**
 * Makes the home page scroll like pages.
 *
 * Touch needs no help: CSS scroll snap with `scroll-snap-stop: always`
 * already stops a swipe at the very next page. A mouse wheel or trackpad is
 * different. It sends a stream of small scrolls, and a hard spin or a flick
 * with momentum keeps sending them after the first page has landed, so the
 * browser carries on to the next page and the one after. Here a whole wheel
 * gesture, momentum tail included, is worth exactly one page.
 *
 * It also draws the dot rail on the right edge: one dot per page, the current
 * one marked, visible only while the page is moving.
 */
export default function PageScroll() {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let pages: HTMLElement[] = [];
    let nav = navHeight();

    const collect = () => {
      nav = navHeight();
      pages = Array.from(
        document.querySelectorAll<HTMLElement>(CANDIDATES)
      ).filter((el) => getComputedStyle(el).scrollSnapAlign !== "none");
      setCount(pages.length);
    };

    /** Where the window has to be scrolled for page i to sit under the nav. */
    const offsetOf = (el: HTMLElement) => (el.id === "hero" ? 0 : nav);
    const topOf = (i: number) => {
      const el = pages[i];
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      return Math.min(
        max,
        Math.max(0, el.getBoundingClientRect().top + window.scrollY - offsetOf(el))
      );
    };

    const nearest = () => {
      let best = 0;
      let bestDistance = Infinity;
      for (let i = 0; i < pages.length; i++) {
        const el = pages[i];
        const distance = Math.abs(el.getBoundingClientRect().top - offsetOf(el));
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      }
      return best;
    };

    // --- Dot rail: follow the scroll, hide when it stops -------------------
    let hideTimer = 0;
    let frame = 0;
    let target = -1; // scroll offset a wheel page-turn is heading for

    const onScroll = () => {
      railRef.current?.setAttribute("data-visible", "true");
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => {
        railRef.current?.setAttribute("data-visible", "false");
      }, TIMING.dotsLinger);

      // Browsers without `scrollend` learn that the page has landed here.
      if (target >= 0 && Math.abs(window.scrollY - target) < 1) land();

      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (pages.length) setActive(nearest());
      });
    };

    // --- Wheel: one gesture, one page --------------------------------------
    let moving = false; // a page change is in flight
    let direction = 0; // its direction
    let from = 0; // the page it left
    let lastTime = 0; // when the previous wheel event arrived
    let lastDelta = 0; // and how large it was
    let consumed = false; // this gesture has already moved a page
    let landTimer = 0;

    function land() {
      moving = false;
      target = -1;
      window.clearTimeout(landTimer);
    }

    const go = (index: number, dir: number, origin: number) => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      moving = true;
      direction = dir;
      from = origin;
      target = topOf(index);
      window.scrollTo({ top: target, behavior: reduced ? "auto" : "smooth" });
      window.clearTimeout(landTimer);
      landTimer = window.setTimeout(land, TIMING.landTimeout);
    };

    const onWheel = (e: WheelEvent) => {
      // Pinch-zoom, sideways scrolling (the Features carousel), and anything
      // inside the open mobile menu are not page turns.
      if (e.ctrlKey || e.metaKey) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (!pages.length) return;

      const dir = Math.sign(e.deltaY);
      if (!dir) return;

      const now = performance.now();
      const size = Math.abs(e.deltaY);
      const paused = now - lastTime > TIMING.gestureGap;
      // Only judged at rest. While the page is moving the hand is still
      // speeding up, and reading that as a second gesture is what used to
      // queue up another page turn for the moment this one landed.
      const pushed =
        !moving &&
        size >= REACCELERATION_MIN &&
        size > lastDelta * REACCELERATION;
      const turnedBack = moving && dir !== direction && size >= REACCELERATION_MIN;
      const fresh = paused || pushed || turnedBack;
      lastTime = now;
      lastDelta = size;
      if (fresh && !moving) consumed = false;

      if (moving) {
        e.preventDefault();
        // Changed their mind halfway: a new push the other way turns the
        // page back to where it came from.
        if (fresh && dir !== direction) {
          consumed = true;
          go(from, dir, from + direction);
        }
        return;
      }

      const current = nearest();
      const el = pages[current];
      const rect = el.getBoundingClientRect();

      // A page taller than the screen (an opened FAQ answer, the footer on a
      // phone-sized window) scrolls normally until its edge is reached.
      if (dir > 0 && rect.bottom > window.innerHeight + 1) return;
      if (dir < 0 && rect.top < offsetOf(el) - 1) return;

      e.preventDefault();
      if (consumed) return; // the tail of a gesture that already moved a page

      const next = current + dir;
      if (next < 0 || next >= pages.length) return;
      if (Math.abs(topOf(next) - window.scrollY) < 1) return; // nowhere to go

      consumed = true;
      go(next, dir, current);
    };

    collect();
    onScroll();
    railRef.current?.setAttribute("data-visible", "false");
    window.clearTimeout(hideTimer);

    const narrow = window.matchMedia("(max-width: 900px)");
    narrow.addEventListener("change", collect);
    window.addEventListener("resize", collect);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", land);
    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      narrow.removeEventListener("change", collect);
      window.removeEventListener("resize", collect);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", land);
      window.removeEventListener("wheel", onWheel);
      window.clearTimeout(hideTimer);
      window.clearTimeout(landTimer);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (count < 2) return null;

  // Decoration for sighted scrolling only: the page's landmarks and headings
  // already tell assistive tech where it is.
  return (
    <div ref={railRef} className="page-dots" data-visible="false" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="page-dots__dot"
          data-active={i === active ? "true" : "false"}
        />
      ))}
    </div>
  );
}
