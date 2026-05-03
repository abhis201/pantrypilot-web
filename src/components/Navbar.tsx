"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [inFeatures, setInFeatures] = useState(false);
  const [inWaitlist, setInWaitlist] = useState(false);
  const [atTop, setAtTop] = useState(true);

  const handleScroll = useCallback(() => {
    setAtTop(window.scrollY < 50);
    if (pathname !== "/") return;
    
    let currentHash = window.location.hash;

    const el = document.getElementById("features");
    let featuresActive = false;
    if (el) {
      const rect = el.getBoundingClientRect();
      featuresActive = rect.top <= 100 && rect.bottom > 100;
      setInFeatures(featuresActive);
    }
    
    const waitlistEl = document.getElementById("waitlist");
    let waitlistActive = false;
    if (waitlistEl) {
      const wRect = waitlistEl.getBoundingClientRect();
      waitlistActive = wRect.top <= window.innerHeight / 2 && wRect.bottom > 100;
      setInWaitlist(waitlistActive);
    }

    // Update URL natively on scroll so it stays perfectly synced
    if (waitlistActive && currentHash !== "#waitlist") {
      window.history.replaceState(null, "", "/#waitlist");
    } else if (featuresActive && !waitlistActive && currentHash !== "#features") {
      window.history.replaceState(null, "", "/#features");
    } else if (!featuresActive && !waitlistActive && window.scrollY < 100 && currentHash !== "") {
      window.history.replaceState(null, "", "/");
    }
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = (e?: React.MouseEvent) => {
    if (pathname === "/") {
      if (e) e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.documentElement.scrollTo({ top: 0, behavior: "smooth" }); // Fallback
      
      // Delay history state update to ensure it doesn't cancel the smooth scroll in some browsers
      if (window.location.hash) {
        setTimeout(() => {
          window.history.replaceState(null, "", "/");
        }, 800);
      }
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === "/" && href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.substring(2);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          window.history.pushState(null, "", href);
        }, 800);
      }
    }
    setMenuOpen(false);
  };

  const navItems = [
    { href: "/#features", label: "Features", activeOn: () => pathname === "/" && inFeatures },
    { href: "/#waitlist", label: "Waitlist", activeOn: () => pathname === "/" && inWaitlist },
    { href: "/terms",     label: "Terms",    activeOn: () => pathname === "/terms"   },
    { href: "/privacy",   label: "Privacy",  activeOn: () => pathname === "/privacy" },
    { href: "/contact",   label: "Contact",  activeOn: () => pathname === "/contact" },
  ];

  return (
    <nav className="nav-glass fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-8 md:px-14 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image
            src="/logoIcon2.png"
            alt="PantryPilot"
            width={30}
            height={30}
            className="object-contain"
            style={{ borderRadius: 8, border: "1px solid rgba(16,185,129,0.15)" }}
            priority
          />
          <span className="text-[15px] font-bold text-emerald-100/80 tracking-[-0.02em]">PantryPilot</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`nav-link ${item.activeOn() ? "active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
          {pathname === "/" ? (
            <button
              onClick={scrollToTop}
              className="px-5 py-2 rounded-full text-[13px] font-bold uppercase tracking-[0.05em] transition-all cursor-pointer"
              style={{
                background: atTop ? "rgba(16,185,129,0.18)" : "rgba(16,185,129,0.07)",
                color: atTop ? "#34d399" : "rgba(52,211,153,0.45)",
              }}
            >
              Download
            </button>
          ) : (
            <Link
              href="/"
              className="px-5 py-2 rounded-full bg-emerald-500/[0.07] hover:bg-emerald-500/[0.14] text-emerald-400/50 hover:text-emerald-400 text-[13px] font-bold uppercase tracking-[0.05em] transition-all"
            >
              Download
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-emerald-400/60 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-8 pb-5 flex flex-col gap-1 border-t border-emerald-500/[0.06] mt-1 pt-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link py-3 pl-4 block ${item.activeOn() ? "active" : ""}`}
              style={{ borderLeft: "3px solid rgba(16,185,129,0.12)" }}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={(e) => { scrollToTop(e); setMenuOpen(false); }}
            className="mt-2 text-left py-3 pl-4 nav-link text-emerald-400"
            style={{ borderLeft: "3px solid rgba(16,185,129,0.25)" }}
          >
            Download
          </button>
        </div>
      )}
    </nav>
  );
}
