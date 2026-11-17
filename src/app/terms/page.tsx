import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalToc from "@/components/LegalToc";
import { LegalBody, LegalHeader, type LegalDoc } from "@/lib/legal";
import { SITE_NAME } from "@/lib/site";
import content from "@/content/legal/en/terms.json";

/**
 * The text of this page lives in src/content/legal/en/terms.json, not here.
 * See src/lib/legal.tsx for the block format and how a translation is added.
 * Company name, address and contact details come from src/lib/site.ts.
 */
const doc = content as LegalDoc;

const DESCRIPTION =
  "The agreement for using KhanPaan: subscriptions, free trials and auto-renewal, the medical and allergen disclaimer, AI output, acceptable use, and your consumer rights by country.";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: DESCRIPTION,
  alternates: { canonical: "/terms" },
  openGraph: {
    title: `Terms of Service — ${SITE_NAME}`,
    description: DESCRIPTION,
    url: "/terms",
  },
};

export default function TermsPage() {
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
          <LegalHeader doc={doc} lang="en" path="/terms" />

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
