"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  CONSENT_CHANGED,
  OPEN_CONSENT,
  gpcEnabled,
  readConsent,
  writeConsent,
} from "@/lib/consent";

/**
 * The cookie banner and the preferences panel are the same component.
 *
 * - First visit, no choice made, no GPC signal: it shows as a banner.
 * - GPC signal present: it never interrupts. Tracking is already off; the
 *   panel says so when opened from the footer.
 * - "Cookie & Privacy Preferences" or "Do Not Sell or Share" in the footer:
 *   it opens again, showing the current choice, which can be changed.
 *
 * Accept and Reject are the same button: same class, same size, same
 * contrast, side by side. Neither is pre-selected and closing the panel
 * without choosing is treated as "not decided", never as consent.
 *
 * It is not a modal: it does not dim or block the page, because nothing on
 * this site is withheld until you answer.
 */
export default function ConsentManager() {
  const [open, setOpen] = useState(false);
  const [gpc, setGpc] = useState(false);
  const [analytics, setAnalytics] = useState<boolean | null>(null);
  const [fromFooter, setFromFooter] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const signal = gpcEnabled();
    const stored = readConsent();
    // Reading browser-only state (navigator, localStorage) once on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGpc(signal);
    setAnalytics(stored ? stored.analytics : null);
    if (!stored && !signal) setOpen(true);

    const onOpen = () => {
      setAnalytics(readConsent()?.analytics ?? null);
      setFromFooter(true);
      setOpen(true);
    };
    const onChanged = () => setAnalytics(readConsent()?.analytics ?? null);

    window.addEventListener(OPEN_CONSENT, onOpen);
    window.addEventListener(CONSENT_CHANGED, onChanged);
    return () => {
      window.removeEventListener(OPEN_CONSENT, onOpen);
      window.removeEventListener(CONSENT_CHANGED, onChanged);
    };
  }, []);

  // Opened on purpose from the footer: move focus in, and let Escape close.
  useEffect(() => {
    if (!open || !fromFooter) return;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, fromFooter]);

  const decide = (value: boolean) => {
    writeConsent(value);
    setOpen(false);
  };

  const status = gpc
    ? "Optional tracking is off because your browser sends a Global Privacy Control signal."
    : analytics === true
      ? "You accepted optional analytics."
      : analytics === false
        ? "You rejected optional analytics."
        : null;

  return (
    <div
      ref={panelRef}
      className="consent"
      data-open={open}
      role="dialog"
      aria-label="Cookie and privacy preferences"
      aria-hidden={!open}
      tabIndex={-1}
      inert={!open}
    >
      <div className="consent__body">
        <p className="consent__title">Your privacy choices</p>
        <p className="consent__text">
          This site uses only the storage it needs to work. Optional analytics
          stay off unless you accept. We never sell or share your personal
          information.{" "}
          <Link href="/privacy#website">Privacy Policy</Link>
        </p>

        {gpc && <p className="consent__gpc">GPC signal honored</p>}
        {status && fromFooter && (
          <p className="consent__status" role="status">
            {status}
          </p>
        )}
      </div>

      <div className="consent__actions">
        <button
          type="button"
          className="btn btn--outline consent__button"
          onClick={() => decide(false)}
        >
          Reject non-essential
        </button>
        <button
          type="button"
          className="btn btn--outline consent__button"
          onClick={() => decide(true)}
          disabled={gpc}
          title={gpc ? "Your browser's Global Privacy Control signal keeps this off" : undefined}
        >
          Accept all
        </button>
      </div>
    </div>
  );
}
