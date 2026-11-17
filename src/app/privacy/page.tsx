import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalToc from "@/components/LegalToc";
import { LegalBody, LegalHeader, type LegalDoc } from "@/lib/legal";
import { SITE_NAME } from "@/lib/site";
import content from "@/content/legal/en/privacy.json";

/**
 * The text of this page lives in src/content/legal/en/privacy.json, not here.
 * See src/lib/legal.tsx for the block format and how a translation is added.
 * Company name, address and contact details come from src/lib/site.ts.
 */
const doc = content as LegalDoc;

const DESCRIPTION =
  "What KhanPaan collects, why, who handles it, how long it is kept, and how to see, export or delete it. Covers India (DPDP Act), the EU and UK (GDPR), US state laws and other countries.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: DESCRIPTION,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `Privacy Policy — ${SITE_NAME}`,
    description: DESCRIPTION,
    url: "/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />

      <main
        id="main"
        className="relative min-h-screen pb-20"
        style={{
          zIndex: "var(--z-content)",
          paddingTop: "calc(var(--nav-height) + 48px)",
        }}
      >
        <div className="shell max-w-5xl">
          <LegalHeader doc={doc} lang="en" path="/privacy" />

          {/* Sticky section index beside the text on desktop. It reads the
              headings out of `.legal-content`. */}
          <div className="legal-layout">
            <LegalToc />
            <LegalBody doc={doc} />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
