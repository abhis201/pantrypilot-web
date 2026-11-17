"use client";

import { openConsentPreferences } from "@/lib/consent";

/**
 * Footer controls that reopen the privacy panel. Buttons, not links: they
 * change something on this page rather than going anywhere.
 */
export default function ConsentLinks({ className }: { className: string }) {
  return (
    <>
      <button
        type="button"
        className={`${className} text-left`}
        onClick={openConsentPreferences}
      >
        Cookie &amp; Privacy Preferences
      </button>
      <button
        type="button"
        className={`${className} text-left`}
        onClick={openConsentPreferences}
      >
        Do Not Sell or Share My Personal Information
      </button>
    </>
  );
}
