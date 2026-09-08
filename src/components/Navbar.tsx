"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Menu, Close } from "./Icons";
import appIcon from "../../public/logoIcon2.png";
import Wordmark from "./Wordmark";

/** Homepage landmarks, in document order. Drives both the active nav link and
 *  the hash the URL is kept in sync with. */
const SECTION_IDS = ["hero", "features", "about", "pricing", "faq", "newsletter"];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 16);

    if (pathname !== "/") return;

    // Whichever section straddles this line is the one being read. One shared
    // rule for every landmark — special-casing thresholds per section is what
    // previously kept Pricing, FAQ and About from ever lighting up.
    const marker = window.innerHeight * 0.3;

    let current = "";
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= marker && rect.bottom > marker) current = id;
    }

    setActiveId(current);

    // Keep the URL in sync with what's on screen. The hero is the bare page,
    // not "/#hero".
    const desired = current && current !== "hero" ? `#${current}` : "";
    if (window.location.hash !== desired) {
      window.history.replaceState(null, "", desired || window.location.pathname);
    }
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Seed state from the window's current scroll position on mount. This reads
    // from an external system (the scroll offset), not derived state, so the
    // cascading-render warning doesn't apply.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Escape closes the mobile drawer — a drawer you can't dismiss by keyboard is
  // a trap for anyone not using a pointer.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  /**
   * Scrolls a full landmark section into view so it reads as properly
   * framed rather than just "not hidden under the navbar": a section short
   * enough to fit below the navbar gets centred in the room that's left,
   * splitting the slack evenly above and below it, so the whole section is
   * visible with breathing room on both sides instead of pinned to the top
   * with a slab of empty ground underneath. A section taller than the
   * viewport (Features, most screens) can't be shown whole either way, so
   * it falls back to just clearing the navbar — the same place a plain
   * scrollIntoView would have put it.
   *
   * The section's own top lands flush against the navbar's bottom edge —
   * no extra gap — so its own background fills right up to the navbar
   * instead of leaving a sliver of whatever colour sits behind it exposed.
   */
  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    const navHeight =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--nav-height"
        )
      ) || 76;
    const available = window.innerHeight - navHeight;
    const slack = Math.max(0, available - target.getBoundingClientRect().height);

    const top =
      window.scrollY +
      target.getBoundingClientRect().top -
      navHeight -
      slack / 2;

    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === "/" && href === "/") {
      // Download always lands back at the very top of the page — the hero,
      // exactly like the site's own first load — rather than jumping to the
      // store-button row inside it. From any other page the plain href="/"
      // already does this on its own once navigation lands there, so this
      // branch only needs to handle the same-page case.
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (pathname === "/" && href.startsWith("/#")) {
      e.preventDefault();
      const id = href.substring(2);
      // No pushState here: the scroll spy rewrites the hash once the
      // section arrives, and doing both at once races.
      scrollToSection(id);
    }
    // A mouse click leaves the link visibly focused in some browsers, which
    // reads as a stray box around plain nav text rather than a deliberate
    // ring. detail === 0 is a keyboard-triggered activation (Enter/Space),
    // so that case is left alone — tabbing through the nav still shows
    // where you are.
    if (e.detail !== 0) {
      e.currentTarget.blur();
    }
    setMenuOpen(false);
  };

  const onHome = pathname === "/";

  /**
   * Product navigation only. Terms, Privacy and Contact live in the footer —
   * they're destinations people look for when they need them, and spending
   * top-level nav slots on them competes with the one action that matters.
   *
   * Newsletter is the exception, and earns its slot by being an action rather
   * than a document: it's the one thing on the page for a visitor who isn't
   * going to install anything today, and it sits at the very bottom where
   * nobody scrolls to find it. Listed last so nav order still reads down the
   * page in document order, and left as a plain link rather than a second
   * button — Download is the one thing styled to be clicked here.
   */
  const navItems = [
    { href: "/#features",   label: "Features",   active: onHome && activeId === "features"   },
    { href: "/#about",      label: "About",      active: onHome && activeId === "about"      },
    { href: "/#pricing",    label: "Pricing",    active: onHome && activeId === "pricing"    },
    { href: "/#faq",        label: "FAQ",        active: onHome && activeId === "faq"        },
    { href: "/#newsletter", label: "Newsletter", active: onHome && activeId === "newsletter" },
  ];

  return (
    <nav className="nav-shell" data-scrolled={scrolled}>
      <div className="shell flex max-w-[1240px] items-center justify-between py-4">
        <Link href="/" className="group flex flex-shrink-0 items-center gap-[6px]">
          <Image
            src={appIcon}
            alt=""
            width={38}
            height={38}
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            style={{ borderRadius: 11 }}
            priority
          />
          <Wordmark className="text-[19px]" />
        </Link>

        {/* Desktop links. gap-6 until lg, gap-8 above it: a fifth link
            (Newsletter, the longest label of the set) pushed the row past the
            available width at the md breakpoint itself, where the bar is
            narrowest but still showing every link. The wider rhythm returns
            as soon as there's room for it. */}
        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`nav-link ${item.active ? "active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="btn btn--primary !min-h-[46px] !px-7 !text-[15px]"
          >
            Download
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="-mr-2.5 rounded-lg p-2.5 text-ink md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <Close className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer — height animates via grid-template-rows, so it slides
          open smoothly without a hard-coded max-height. */}
      <div id="mobile-menu" className="nav-drawer md:hidden" data-open={menuOpen}>
        <div>
          <div
            className="shell flex flex-col border-t pb-7 pt-2"
            style={{ borderColor: "var(--line)" }}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link nav-drawer-link ${item.active ? "active" : ""}`}
                onClick={(e) => handleNavClick(e, item.href)}
                tabIndex={menuOpen ? 0 : -1}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/"
              onClick={(e) => handleNavClick(e, "/")}
              className="btn btn--primary mt-6 w-full"
              tabIndex={menuOpen ? 0 : -1}
            >
              Download
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
