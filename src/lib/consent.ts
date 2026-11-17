/**
 * Cookie and tracking consent for the website.
 *
 * Today the site loads nothing that needs consent: no analytics, no ad
 * pixels, no session replay, no third-party embeds. This module exists so
 * that stays true by construction. Any optional script added later MUST be
 * gated on `hasAnalyticsConsent()` (and re-checked on CONSENT_CHANGED), which
 * is false until someone presses Accept, and always false while their
 * browser sends the Global Privacy Control signal.
 *
 * The choice is kept in localStorage, not a cookie: it never leaves the
 * browser, so the server has nothing to read and nothing to log.
 */

export interface ConsentRecord {
  analytics: boolean;
  decidedAt: string;
}

const KEY = "kp-consent-v1";
export const OPEN_CONSENT = "kp:open-consent";
export const CONSENT_CHANGED = "kp:consent-changed";

/** True when the browser sends the Global Privacy Control opt-out signal. */
export function gpcEnabled(): boolean {
  if (typeof navigator === "undefined") return false;
  return (
    (navigator as Navigator & { globalPrivacyControl?: boolean })
      .globalPrivacyControl === true
  );
}

export function readConsent(): ConsentRecord | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    return typeof parsed.analytics === "boolean" ? parsed : null;
  } catch {
    // Private mode or blocked storage: treat as "not decided".
    return null;
  }
}

export function writeConsent(analytics: boolean): void {
  // GPC wins over a click: a browser-level opt-out is not overridden here.
  const record: ConsentRecord = {
    analytics: analytics && !gpcEnabled(),
    decidedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(record));
  } catch {
    // Nothing to do: without storage the answer simply isn't remembered,
    // and the default (no tracking) is the safe one.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED, { detail: record }));
}

/** The one question any optional script should ask before it loads. */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined" || gpcEnabled()) return false;
  return readConsent()?.analytics === true;
}

/** Reopen the preferences panel (footer links call this). */
export function openConsentPreferences(): void {
  window.dispatchEvent(new CustomEvent(OPEN_CONSENT));
}
