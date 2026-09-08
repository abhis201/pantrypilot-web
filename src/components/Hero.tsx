import {
  ANDROID_AVAILABLE,
  ANDROID_DOWNLOAD_LINK,
  IOS_DOWNLOAD_LINK,
} from "@/lib/site";
import Spot from "./Spot";
import { AppleMark, PlayMark, Check } from "./Icons";
import ScreenCard from "./ScreenCard";
import heroSplash from "../../public/screens/hero-splash.png";
import heroDashboard from "../../public/screens/hero-dashboard.png";
import heroStats from "../../public/screens/hero-stats.png";

/** Claims that hold on the free tier, each traceable to the Privacy Policy or Terms. */
const TRUST_POINTS = ["Track expiry dates", "Get recipe ideas", "Reduce waste"];

/**
 * The first viewport is the argument, not a header.
 *
 * Left column states the mechanism in five words; the right column shows the
 * app running — three real screens fanned directly on the ground, unframed, so the very first thing a visitor sees is the product itself:
 * the splash identity up front, the dashboard and the stats it feeds tucked
 * either side. The real feature screens do the proving further down, where
 * there is room to say what each of them does.
 *
 * The section spans the full viewport height (its own box, not just the
 * content inside it — top padding is what clears the fixed navbar, the box
 * itself starts at the very top of the page) rather than sizing to its
 * content, so the fan gets the full column height to scale into instead of
 * floating small inside a tall, empty section.
 *
 * The entrance plays on mount rather than on scroll (the hero is already in
 * view), staged headline → copy → actions → trust → fan at 90ms apart, so the
 * page assembles itself in under a second and never delays a ready visitor.
 */
export default function Hero() {
  return (
    // band--soft on its own (not .band): the same soft half-step green FAQ
    // uses, but with square corners rather than the rounded top .band adds —
    // this is the page's very first section, so there is no cream above it
    // to round away from. Differentiates the hero from Features right below,
    // which stays cream because its own icon circles and per-block screen
    // panels already spend the fuller green as an accent against a cream
    // field (see the 5.4b comment in globals.css and the note in page.tsx).
    <section id="hero" className="relative band--soft">
      {/* Corner ornaments, pinned to the hero section itself rather than the
          screenshot column — they read as the section's own margin doodles,
          not as decoration hung off the screens. Below lg they're dropped
          rather than shrunk; there isn't room to keep them out of the way of
          the stacked, full-width columns on a narrow viewport. */}
      <Spot
        name="tomato"
        size={62}
        className="absolute hidden lg:block"
        style={{
          left: "clamp(20px, 4vw, 56px)",
          top: "calc(var(--nav-height) + clamp(28px, 5vh, 56px))",
          rotate: "-12deg",
        }}
      />
      <Spot
        name="milk"
        size={82}
        className="absolute hidden lg:block"
        style={{
          right: "clamp(24px, 4.5vw, 64px)",
          top: "calc(var(--nav-height) + clamp(24px, 4.5vh, 48px))",
          rotate: "12deg",
        }}
      />
      <Spot
        name="jar"
        size={64}
        className="absolute hidden lg:block"
        style={{
          right: "clamp(20px, 4vw, 56px)",
          bottom: "clamp(28px, 5vh, 56px)",
          rotate: "10deg",
        }}
      />
      <Spot
        name="sprig"
        size={86}
        className="absolute hidden lg:block"
        style={{
          left: "clamp(24px, 4.5vw, 64px)",
          bottom: "clamp(24px, 4.5vh, 48px)",
          rotate: "-8deg",
        }}
      />

      <div
        className="shell flex max-w-[1240px] flex-col justify-center"
        style={{
          minHeight: "100dvh",
          paddingTop: "calc(var(--nav-height) + clamp(1.5rem, 4vh, 3rem))",
          paddingBottom: "clamp(1.5rem, 4vh, 3rem)",
        }}
      >
        <div className="grid grid-cols-1 items-center gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          {/* ---- Copy column ------------------------------------------- */}
          <div className="min-w-0 max-w-[42rem]">
            <h1
              className="rise display display--hero"
              style={{ "--rise-delay": "0ms" } as React.CSSProperties}
            >
              Cook what you already own.
            </h1>

            <p
              className="rise standfirst mt-7"
              style={{ "--rise-delay": "90ms" } as React.CSSProperties}
            >
              KhanPaan tracks what&apos;s in your kitchen, watches what&apos;s about
              to spoil, and builds meal ideas from the ingredients already on
              your shelves.
            </p>

            {/* No separate "Download free" button — the two store badges
                are the CTAs now, each in its own solid fill (see
                .store-button--dark / --brand in globals.css) rather than the
                plain white .store-button they used when a primary emerald
                button sat beside them. */}
            <div
              id="download"
              className="rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ "--rise-delay": "180ms" } as React.CSSProperties}
            >
              <a
                href={IOS_DOWNLOAD_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="store-button store-button--dark w-full shrink-0 sm:w-auto"
              >
                <AppleMark className="h-[22px] w-[22px]" />
                App Store
              </a>

              {/* Android renders as a real link whenever a download URL is
                  configured. With the env var unset this is an inert chip:
                  a missing button converts better than one that 404s. */}
              {ANDROID_AVAILABLE ? (
                <a
                  href={ANDROID_DOWNLOAD_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="store-button store-button--brand w-full shrink-0 sm:w-auto"
                >
                  <PlayMark className="h-[20px] w-[20px]" />
                  Google Play
                </a>
              ) : (
                <span className="store-button store-button--pending w-full shrink-0 sm:w-auto">
                  <PlayMark className="h-[20px] w-[20px]" />
                  Android soon
                </span>
              )}
            </div>

            <ul
              className="rise trust-row mt-9"
              style={{ "--rise-delay": "270ms" } as React.CSSProperties}
            >
              {TRUST_POINTS.map((point) => (
                <li key={point} className="trust-item">
                  <Check className="h-[18px] w-[18px]" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* ---- Screen fan column ---------------------------------------
              Three real screens fanned directly on the ground: dashboard
              left, splash centre and forward, stats right — the identity shot
              leads, the two surfaces it connects sit just behind it. No panel
              or backdrop shape (see the 5.4b comment in globals.css for why),
              and no drawn phone bezel (see ScreenCard) — the screenshots carry
              their own chrome, and KhanPaan ships on both platforms. */}
          <div className="relative min-w-0 px-4 py-8 sm:px-8 sm:py-10">
            <div className="hero-fan">
              {/* Each screen rises on its own now (fan-rise, not the shared
                  .rise used elsewhere) rather than as one group — see the
                  .fan-rise comment in globals.css for why this needed its
                  own keyframes instead of reusing riseIn directly. Left and
                  right trail the center by 90ms each, continuing this
                  column's own 0/90/180/270/360ms stagger rather than
                  landing all three at once. */}
              <ScreenCard
                images={[heroDashboard]}
                label="The KhanPaan dashboard: today's nutrition against target, pantry and expiring-soon counts, and a suggested breakfast ready to cook"
                width={182}
                className="hero-fan__side hero-fan__side--left fan-rise"
                style={{ "--fan-delay": "450ms" } as React.CSSProperties}
              />

              <ScreenCard
                images={[heroSplash]}
                label="The KhanPaan splash screen: the app icon over the tagline 'The AI brain for your kitchen,' with pantry staples illustrated at each corner"
                width={250}
                priority
                className="hero-fan__center fan-rise"
                style={{ "--fan-delay": "360ms" } as React.CSSProperties}
              />

              <ScreenCard
                images={[heroStats]}
                label="The KhanPaan stats screen: money wasted this month on spoiled or expired food, and grocery spending charted by month"
                width={182}
                className="hero-fan__side hero-fan__side--right fan-rise"
                style={{ "--fan-delay": "540ms" } as React.CSSProperties}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
