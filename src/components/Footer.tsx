import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ background: "#020c06", borderTop: "1px solid rgba(16,185,129,0.07)" }}>
      <div className="max-w-7xl mx-auto px-8 md:px-14 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand — spans 2 cols on md */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-5">
              <Image
                src="/logoIcon2.png"
                alt="PantryPilot"
                width={26}
                height={26}
                className="object-contain"
                style={{ borderRadius: 7, border: "1px solid rgba(16,185,129,0.12)" }}
              />
              <span className="text-[14px] font-bold text-emerald-100/60 tracking-[-0.02em]">PantryPilot</span>
            </Link>
            <p className="text-emerald-200/30 text-sm leading-[1.8] max-w-[280px]">
              Smart pantry &amp; meal management powered by AI. Track your food, plan meals, reduce waste, and eat smarter.
            </p>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[11px] font-bold text-emerald-400/40 mb-5 uppercase tracking-[0.12em]">
              Legal
            </h4>
            <div className="flex flex-col gap-3.5">
              <Link href="/terms"   className="text-emerald-200/40 hover:text-emerald-300 text-sm transition-colors">Terms &amp; Conditions</Link>
              <Link href="/privacy" className="text-emerald-200/40 hover:text-emerald-300 text-sm transition-colors">Privacy Policy</Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[11px] font-bold text-emerald-400/40 mb-5 uppercase tracking-[0.12em]">
              Support
            </h4>
            <div className="flex flex-col gap-3.5">
              <Link href="/contact" className="text-emerald-200/40 hover:text-emerald-300 text-sm transition-colors">Contact Us</Link>
              <a href="mailto:admin.pantrypilot@gmail.com" className="text-emerald-200/40 hover:text-emerald-300 text-sm transition-colors break-all">
                admin.pantrypilot@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(16,185,129,0.06)" }}
        >
          <span className="text-emerald-200/18 text-[11px] uppercase tracking-[0.1em] font-semibold">
            &copy; {new Date().getFullYear()} PantryPilot. All rights reserved.
          </span>
          <div className="flex items-center gap-5">
            {[
              { href: "/terms",    label: "Terms"   },
              { href: "/privacy",  label: "Privacy" },
              { href: "/contact",  label: "Contact" },
            ].map((l) => (
              <Link key={l.href} href={l.href}
                className="text-emerald-200/18 hover:text-emerald-200/40 text-[11px] uppercase tracking-[0.08em] transition-colors"
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
