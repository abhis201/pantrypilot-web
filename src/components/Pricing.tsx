import { IOS_DOWNLOAD_LINK } from "@/lib/site";
import Reveal from "./Reveal";
import { Check } from "./Icons";

/**
 * Free vs Pro at a glance. Sourced from Terms §4 (service tiers) and the live
 * App Store listing, so this stays the single marketing-side summary of what
 * actually costs money.
 *
 * The paid tier is distinguished by taking the colour field rather than by a
 * border, a glow, or a scale-up. Colour is how this system separates things.
 */

const FREE_FEATURES = [
  "Auto pantry management with expiry alerts",
  "Item Barcode scanning",
  "Shopping list with completion tracking",
  "Weekly meal planner, for breakfast, lunch, snacks, dinner and desserts",
  "Calorie target progress tracking",
  "Expiring-item alerts, four days ahead",
  "Activity history and preferences",
  "Smart Shopping list with auto-suggested items",
];

const PRO_FEATURES = [
  "AI outside meal logger with photo & vision analysis",
  "Social video recipe importer (Reels, TikTok & YouTube)",
  "Smart pantry recipe matching & expiring-first mode",
  "Smart pantry ingredient substitution engine",
  "Waste & financial analytics: dollars saved vs lost",
  "Advanced calorie and macro target ratios & micronutrient tracking",
  "Proactive AI kitchen insights & action plans",
  "AI Meal Planner: for day or week, with auto-suggested recipes",
];

export default function Pricing() {
  return (
    <section id="pricing" className="section section--tight viewport-lock">
      <div className="shell max-w-[1240px]">
        <div className="mx-auto mb-6 max-w-2xl text-center">
          <Reveal>
            <h2 className="display display--sub">
              Start free. <em>Upgrade if you want AI.</em>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="standfirst mx-auto mt-3 text-center">
              Everything you need to run a pantry is free, forever. Pro adds the
              AI layer — meal suggestions, auto-planning, and analytics.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
          {/* ---- Free ---------------------------------------------------- */}
          <Reveal delay={140} y={26} className="h-full">
            <div className="price-card">
              <p className="text-[22px] font-bold tracking-[-0.01em] text-ink-muted">
                Free
              </p>

              <ul className="my-4 space-y-1.5">
                {FREE_FEATURES.map((feature) => (
                  <li key={feature} className="feature-row">
                    <Check className="h-[18px] w-[18px]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={IOS_DOWNLOAD_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline mt-auto w-full"
              >
                Download free
              </a>
            </div>
          </Reveal>

          {/* ---- Pro ----------------------------------------------------- */}
          <Reveal delay={220} y={26} className="h-full">
            <div className="price-card price-card--featured">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[22px] tracking-[-0.01em] text-ink">
                  Pro
                </p>
                <span className="tier-tag">AI embedded</span>
              </div>
              
              

              <ul className="my-4 space-y-1.5">
                {PRO_FEATURES.map((feature) => (
                  <li key={feature} className="feature-row">
                    <Check className="h-[18px] w-[18px]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={IOS_DOWNLOAD_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary mt-auto w-full"
              >
                Get KhanPaan Pro
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={300}>
          <p className="mt-4 text-center text-[12.5px] text-ink-muted">
            Prices may vary by region. Subscriptions are billed through the App
            Store and can be cancelled at any time.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
