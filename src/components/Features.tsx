import type { CSSProperties, ReactElement } from "react";
import Reveal from "./Reveal";
import {
  Barcode,
  Calendar,
  Camera,
  Cart,
  ChartBar,
  ChefHat,
  Clock,
  Fridge,
  Receipt,
  Shield,
  Swap,
  VideoPlay,
} from "./Icons";

type Icon = (props: { className?: string }) => ReactElement;

interface Feature {
  Icon: Icon;
  title: string;
  body: string;
}

interface Chapter {
  /** Suffix of a .loop-chapter--<tone> class in globals.css (5.10c). */
  tone: "stock" | "cook" | "shop";
  title: string;
  lede: string;
  /** Three icons for the chapter's floating cluster; the middle one is the hero. */
  cluster: [Icon, Icon, Icon];
  features: [Feature, Feature, Feature, Feature];
}

/**
 * Full-viewport "everything the app does" section, the Features nav link's
 * destination. Fourth shape: "The Loop". The twelve features are grouped
 * into the three chapters of how the app is actually used, Stock it → Cook
 * it → Track & shop, and the coda closes the loop back to the pantry.
 *
 * Every line still traces to a real capability documented elsewhere on the
 * site (Pricing.tsx, Faq.tsx, Founder.tsx). The copy is unchanged from the
 * bento version; only the grouping and the chapter ledes are new.
 *
 * HEIGHT is a hard rule (web/CLAUDE.md §1): the section is exactly one
 * --section-h tall and all of it is visible at once. The CSS in 5.10c sizes
 * everything against vh and lets the three columns take whatever the head
 * leaves, so it fits on short screens without scrolling.
 */
const CHAPTERS: Chapter[] = [
  {
    tone: "stock",
    title: "Stock it",
    lede: "Everything in the kitchen, logged without the typing.",
    cluster: [Receipt, Fridge, Barcode],
    features: [
      { Icon: Fridge, title: "Full pantry tracking", body: "Quantity, storage location, and expiry date on every item." },
      { Icon: Clock, title: "Freshness alerts", body: "Colour-coded urgency, flagged from four days out." },
      { Icon: Receipt, title: "Receipt OCR", body: "Scan a receipt and the whole shop drops in at once." },
      { Icon: Barcode, title: "Barcode scanning", body: "Enriched from OpenFoodFacts and USDA FoodData Central." },
    ],
  },
  {
    tone: "cook",
    title: "Cook it",
    lede: "Dinner decided by what's already on the shelf.",
    cluster: [VideoPlay, ChefHat, Swap],
    features: [
      { Icon: ChefHat, title: "Recipe matching", body: "Suggestions ranked against what's actually in your pantry." },
      { Icon: VideoPlay, title: "Social recipe import", body: "Paste a Reels, TikTok or YouTube link and it's parsed for you." },
      { Icon: Calendar, title: "Weekly meal planner", body: "Four slots a day, or let auto-plan build the week for you." },
      { Icon: Swap, title: "Smart substitutions", body: "A swap suggested from what's genuinely on your shelves." },
    ],
  },
  {
    tone: "shop",
    title: "Track & shop",
    lede: "What you ate, what you need, what you saved.",
    cluster: [Camera, Cart, ChartBar],
    features: [
      { Icon: Camera, title: "Log meals out", body: "Photograph a restaurant plate and it folds into today's totals." },
      { Icon: Cart, title: "Shopping list export", body: "Missing items go straight to Instacart, Walmart, Kroger, or Amazon Fresh." },
      { Icon: ChartBar, title: "Nutrition & analytics", body: "Macro targets, plus dollars saved vs. wasted over time." },
      { Icon: Shield, title: "No ads, no trackers", body: "No advertising or third-party analytics SDKs, documented in full." },
    ],
  },
];

/** Index custom properties the CSS staggers from. Nothing else is set here. */
const vars = (v: Record<string, number>) =>
  Object.fromEntries(Object.entries(v).map(([k, n]) => [`--${k}`, n])) as CSSProperties;

function ChapterCard({ chapter, index }: { chapter: Chapter; index: number }) {
  return (
    <article
      className={`loop-chapter loop-chapter--${chapter.tone}`}
      style={vars({ c: index })}
      aria-labelledby={`loop-${chapter.tone}`}
    >
      <header className="loop-chapter__head">
        <div className="loop-chapter__titles">
          <h3 id={`loop-${chapter.tone}`} className="loop-chapter__title">
            {chapter.title}
          </h3>
          <p className="loop-chapter__lede">{chapter.lede}</p>
        </div>
        <div className="loop-cluster" aria-hidden="true">
          {chapter.cluster.map((Icon, j) => (
            <span key={j} className="loop-cluster__pop" style={vars({ j })}>
              <span className={`loop-cluster__plate${j === 1 ? " loop-cluster__plate--hero" : ""}`}>
                <Icon className="loop-cluster__icon" />
              </span>
            </span>
          ))}
        </div>
      </header>

      <ul className="loop-list">
        {chapter.features.map(({ Icon, title, body }, r) => (
          <li key={title} className="loop-item" style={vars({ r })}>
            <span className="loop-item__icon">
              <Icon className="w-5 h-5" />
            </span>
            <div className="loop-item__text">
              <h4 className="loop-item__title">{title}</h4>
              <p className="loop-item__body">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Features() {
  return (
    <section id="features" className="features-section" aria-labelledby="features-title">
      <div className="shell max-w-[1240px] features-shell">
        <div className="features-head">
          <div className="features-head__titles">
            <Reveal as="p" className="features-eyebrow" y={12}>
              Features
            </Reveal>
            <Reveal as="h2" id="features-title" className="display features-title" delay={60} y={16}>
              Everything the app <em>does.</em>
            </Reveal>
          </div>
          <Reveal as="p" className="features-head__note" delay={140} y={16}>
            Twelve features, one loop: stock the pantry, cook what&apos;s in it, and shop only for
            what&apos;s missing.
          </Reveal>
        </div>

        {/* A Reveal purely for its observer: .is-in starts every staggered
            entrance below. Its own fade is neutralised in CSS
            (.features-loop[data-reveal]). */}
        <Reveal className="features-loop">
          <ol className="loop-track" aria-hidden="true">
            {CHAPTERS.map((chapter, i) => (
              <li key={chapter.tone} className={`loop-track__step loop-chapter--${chapter.tone}`} style={vars({ c: i })}>
                <span className="loop-track__badge">{String(i + 1).padStart(2, "0")}</span>
                {i < CHAPTERS.length - 1 && <span className="loop-track__line" />}
              </li>
            ))}
          </ol>

          <div className="loop-cols">
            {CHAPTERS.map((chapter, i) => (
              <ChapterCard chapter={chapter} index={i} key={chapter.tone} />
            ))}
          </div>

          <p className="loop-coda">
            <svg className="loop-coda__arrow" viewBox="0 0 120 40" fill="none" aria-hidden="true">
              <path d="M114 6c0 18-20 28-54 28S6 26 6 10M2 15l4-6 5 5" />
            </svg>
            <span>…and the shopping list restocks the pantry. The loop starts again.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
