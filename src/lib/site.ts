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
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@khanpaan.app";

export const PRIVACY_EMAIL =
  process.env.NEXT_PUBLIC_PRIVACY_EMAIL || "privacy@khanpaan.app";

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
