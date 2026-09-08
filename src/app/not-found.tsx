import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Spot from "@/components/Spot";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        id="main"
        className="relative min-h-screen flex items-center justify-center shell"
        style={{
          zIndex: "var(--z-content)",
          paddingTop: "calc(var(--nav-height) + 48px)",
          paddingBottom: "96px",
        }}
      >
        <div className="max-w-lg w-full text-center">
          <div
            className="rise mb-8 flex justify-center"
            style={{ "--rise-delay": "0ms" } as React.CSSProperties}
          >
            {/* An empty jar, for an empty page. */}
            <Spot name="jar" size={104} />
          </div>

          <h1 className="rise display display--hero">
            Nothing in <em>this cupboard.</em>
          </h1>

          <p
            className="rise standfirst mx-auto mb-11 mt-6 text-center"
            style={{ "--rise-delay": "180ms" } as React.CSSProperties}
          >
            We couldn&apos;t find the page you were looking for. It may have been
            moved, renamed, or never existed in the first place.
          </p>

          <div
            className="rise flex flex-col sm:flex-row items-center justify-center gap-3"
            style={{ "--rise-delay": "270ms" } as React.CSSProperties}
          >
            <Link href="/" className="btn btn--primary w-full sm:w-auto">
              Back to Home
            </Link>
            <Link href="/contact" className="btn btn--white w-full sm:w-auto">
              Contact Support
            </Link>
          </div>

          <div
            className="mt-14 pt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
            style={{ borderTop: "1px solid var(--line)" }}
          >
            {[
              { href: "/#features", label: "Features" },
              { href: "/#pricing", label: "Pricing" },
              { href: "/#faq", label: "FAQ" },
              { href: "/terms", label: "Terms" },
              { href: "/privacy", label: "Privacy" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[14px] text-ink-muted transition-colors hover:text-brand"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
