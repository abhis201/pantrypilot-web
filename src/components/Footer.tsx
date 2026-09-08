import Link from "next/link";
import Image from "next/image";
import { SUPPORT_EMAIL, ANDROID_AVAILABLE } from "@/lib/site";
import appIcon from "../../public/logoIcon2.png";
import Wordmark from "./Wordmark";

/**
 * Terms, Privacy and Contact live here rather than in the top nav — they're
 * destinations people go looking for when they need them, and spending
 * top-level nav slots on them competes with the download.
 *
 * `snap`: only the home page's own <Footer snap /> call sets id="footer",
 * which is the only thing that makes it a scroll-snap target (see the
 * #footer rule in globals.css). Contact/Privacy/Terms render this same
 * component plain -- snapping is a home-page-only feature; those pages
 * scroll normally.
 */
const PRODUCT_LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#about", label: "About" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

const LEGAL_LINKS = [
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
];

function Column({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-[13px] font-bold uppercase tracking-[0.1em] text-ink-muted">
        {heading}
      </h2>
      <div className="mt-5 flex flex-col gap-3.5">{children}</div>
    </div>
  );
}

const linkClass =
  "text-[15px] text-ink-muted transition-colors hover:text-brand";

export default function Footer({ snap = false }: { snap?: boolean }) {
  return (
    <footer
      id={snap ? "footer" : undefined}
      className="band band--flat"
      style={{ borderTop: "1px solid var(--line)" }}
    >
      <div className="shell max-w-[1240px] py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="group mb-5 inline-flex items-center gap-[6px]">
              <Image
                src={appIcon}
                alt=""
                width={34}
                height={34}
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                style={{ borderRadius: 10 }}
              />
              <Wordmark className="text-[17px]" />
            </Link>
            <p className="max-w-[300px] text-[15px] leading-[1.75] text-ink-muted">
              Smart pantry and meal management. Track your food, plan meals,
              reduce waste, and eat smarter.
            </p>
            <p className="mt-5 text-[13px] font-bold text-ink">
              {ANDROID_AVAILABLE ? "iOS & Android" : "iOS today · Android soon"}
            </p>
          </div>

          <Column heading="Product">
            {PRODUCT_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}
          </Column>

          <Column heading="Legal">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}
          </Column>

          <Column heading="Support">
            <Link href="/contact" className={linkClass}>
              Contact us
            </Link>
            <a href={`mailto:${SUPPORT_EMAIL}`} className={`${linkClass} break-all`}>
              {SUPPORT_EMAIL}
            </a>
          </Column>
        </div>

        <div
          className="mt-14 flex flex-col items-center justify-between gap-4 pt-7 sm:flex-row"
          style={{ borderTop: "1px solid var(--line)" }}
        >
          <span className="text-[13.5px] text-ink-muted">
            &copy; {new Date().getFullYear()} KhanPaan. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            {[
              { href: "/terms", label: "Terms" },
              { href: "/privacy", label: "Privacy" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[13.5px] text-ink-muted transition-colors hover:text-brand"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
