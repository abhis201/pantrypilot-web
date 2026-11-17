/**
 * Single source of truth for site-wide constants.
 *
 * Everything here is read from env vars with a sane production default, so a
 * misconfigured deploy degrades gracefully instead of shipping a dead link or
 * a placeholder address to real visitors.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://khanpaan.app";

export const SITE_NAME = "KhanPaan";

export const SITE_TAGLINE = "Smart Pantry & Meal Management";

export const SITE_DESCRIPTION =
  "Track your pantry, plan meals with AI-powered suggestions, reduce food waste, and hit your nutrition goals.";

export const SUPPORT_EMAIL =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "admin.pantrypilot@gmail.com";

export const PRIVACY_EMAIL =
  process.env.NEXT_PUBLIC_PRIVACY_EMAIL || "admin.pantrypilot@gmail.com";

export const IOS_DOWNLOAD_LINK =
  process.env.NEXT_PUBLIC_IOS_DOWNLOAD_LINK ||
  "https://apps.apple.com/us/app/pantrypilot-ai-food-tracker/id6761744538";

export const ANDROID_DOWNLOAD_LINK = (
  process.env.NEXT_PUBLIC_ANDROID_DOWNLOAD_LINK || ""
).trim();

/**
 * The Android CTA is driven purely by whether the env var is set — locally from
 * `.env.local`, in production from the deploy's env. Testing-track URLs
 * (play.google.com/apps/test/...) are live, shareable links, so they count.
 * Clear the var to fall back to the Coming Soon state.
 */
export const ANDROID_AVAILABLE = ANDROID_DOWNLOAD_LINK.length > 0;

/** iOS is live on the App Store; the same guard keeps the CTA honest if the URL is ever cleared. */
export const IOS_AVAILABLE = /^https:\/\/apps\.apple\.com\/.+\/id\d+/.test(
  IOS_DOWNLOAD_LINK
);

export const PRO_PRICE_MONTHLY = "$9.99";
export const PRO_PRICE_YEARLY = "$89.99";

/* --- Legal identity ---------------------------------------------------------
   Everything the legal pages, the footer imprint and the marketing-email
   footer print about who runs KhanPaan. One place, env-driven, so a change
   of registered address or grievance officer is one edit and a redeploy.

   Company, officer and address were supplied by the founder on 2026-11-17
   (governing-law city: Pune) and are the defaults; an env var overrides
   each. If a new field is added before its real value is known, default it
   to a visible "[… — to be confirmed]" string rather than a guess: a
   made-up detail on a legal page is worse than an obvious gap, and
   LEGAL_DETAILS_COMPLETE below turns false for any value starting "[". */

export const LEGAL_ENTITY_NAME =
  process.env.NEXT_PUBLIC_LEGAL_ENTITY_NAME?.trim() || "Kalvain LLP";

export const GRIEVANCE_OFFICER_NAME =
  process.env.NEXT_PUBLIC_GRIEVANCE_OFFICER_NAME?.trim() || "Abhishek Singh";

export const REGISTERED_POSTAL_ADDRESS =
  process.env.NEXT_PUBLIC_REGISTERED_POSTAL_ADDRESS?.trim() ||
  "M2 Empire Estate, Chinchwad, Pune 411019, India";

/** Printed beside the officer's name wherever the contact block appears. */
export const GRIEVANCE_OFFICER_DESIGNATION =
  "Grievance Officer & Data Protection Contact";

/** Support, privacy and grievance mail all land in one monitored inbox. */
export const GRIEVANCE_EMAIL =
  process.env.NEXT_PUBLIC_GRIEVANCE_EMAIL?.trim() ||
  "admin.pantrypilot@gmail.com";

/** Courts / seat of arbitration named in the Terms' governing-law clause. */
export const GOVERNING_LAW_JURISDICTION =
  process.env.NEXT_PUBLIC_GOVERNING_LAW_JURISDICTION?.trim() ||
  "Pune, Maharashtra, India";

export const LEGAL_DETAILS_COMPLETE = ![
  LEGAL_ENTITY_NAME,
  GRIEVANCE_OFFICER_NAME,
  REGISTERED_POSTAL_ADDRESS,
  GOVERNING_LAW_JURISDICTION,
].some((v) => v.startsWith("["));

/** Shown on /privacy, /terms and /delete-account, and used by the sitemap. */
export const LEGAL_EFFECTIVE_DATE = "2026-11-17";
export const LEGAL_LAST_UPDATED = "2026-11-17";

/* --- App identifiers (must match the shipped mobile apps exactly) --------- */
export const IOS_BUNDLE_ID = "app.pantrypilot.ios";
export const ANDROID_PACKAGE_NAME = "app.pantrypilot.android";
