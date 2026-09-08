import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** Terms and Privacy carry their own effective date; keep the sitemap honest. */
const LEGAL_LAST_UPDATED = new Date("2026-04-02");

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: buildDate,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: LEGAL_LAST_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: LEGAL_LAST_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
