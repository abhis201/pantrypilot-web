import Reveal from "./Reveal";
import {
  Fridge,
  Clock,
  Receipt,
  Barcode,
  ChefHat,
  Sparkles,
  Calendar,
  Camera,
  Leaf,
  Cart,
  ChartBar,
  Shield,
} from "./Icons";

interface FeatureCard {
  Icon: (props: { className?: string }) => React.ReactElement;
  title: string;
  body: string;
}

/**
 * Full-viewport "everything the app does" section — the Features nav
 * link's destination. This replaced the earlier three alternating
 * screenshot blocks (see AMENDED in layout.tsx), then was replaced again:
 * a static 4x3 grid became two horizontal marquee rows that scroll left
 * forever, per the user's own annotated screenshot ("a slow train in a
 * loop"). See the .features-marquee comment in globals.css for how the
 * two rows are kept out of lockstep with each other.
 *
 * Every line traces to a real capability already documented elsewhere on
 * the site (Pricing.tsx's FREE_FEATURES/PRO_FEATURES, Faq.tsx, Founder.tsx's
 * PRINCIPLES) — nothing here is invented for the grid.
 */
const FEATURE_CARDS: FeatureCard[] = [
  {
    Icon: Fridge,
    title: "Full pantry tracking",
    body: "Quantity, storage location, and expiry date on every item.",
  },
  {
    Icon: Clock,
    title: "Freshness alerts",
    body: "Colour-coded urgency, flagged from four days out.",
  },
  {
    Icon: Receipt,
    title: "Receipt OCR",
    body: "Scan a receipt and the whole shop drops in at once.",
  },
  {
    Icon: Barcode,
    title: "Barcode scanning",
    body: "Enriched from OpenFoodFacts and USDA FoodData Central.",
  },
  {
    Icon: ChefHat,
    title: "Recipe matching",
    body: "Suggestions ranked against what's actually in your pantry.",
  },
  {
    Icon: Sparkles,
    title: "Social recipe import",
    body: "Paste a Reels, TikTok or YouTube link and it's parsed for you.",
  },
  {
    Icon: Calendar,
    title: "Weekly meal planner",
    body: "Four slots a day, or let auto-plan build the week for you.",
  },
  {
    Icon: Camera,
    title: "Log meals out",
    body: "Photograph a restaurant plate and it folds into today's totals.",
  },
  {
    Icon: Leaf,
    title: "Smart substitutions",
    body: "A swap suggested from what's genuinely on your shelves.",
  },
  {
    Icon: Cart,
    title: "Shopping list export",
    body: "Missing items go straight to Instacart, Walmart, Kroger, or Amazon Fresh.",
  },
  {
    Icon: ChartBar,
    title: "Nutrition & analytics",
    body: "Macro targets, plus dollars saved vs. wasted over time.",
  },
  {
    Icon: Shield,
    title: "No ads, no trackers",
    body: "No advertising or third-party analytics SDKs, documented in full.",
  },
];

function FeatureCardItem({ card, hidden }: { card: FeatureCard; hidden?: boolean }) {
  const { Icon } = card;
  return (
    <div className="feature-card" aria-hidden={hidden ? "true" : undefined}>
      <div className="icon-plate feature-card__icon">
        <Icon className="h-[20px] w-[20px]" />
      </div>
      <h3 className="feature-card__title">{card.title}</h3>
      <p className="feature-card__body">{card.body}</p>
    </div>
  );
}

/**
 * One looping row. The track holds the 12 cards twice back to back — CSS
 * animates it from translateX(0) to translateX(-50%), which is exactly one
 * set's width, so the moment it snaps back to 0% the on-screen content is
 * pixel-identical and the loop reads as continuous rather than restarting.
 * Every card that isn't needed for a screen reader to hear the 12 features
 * exactly once — the loop's duplicate half, and all of row two, which is
 * the same 12 cards again just out of phase — is aria-hidden.
 */
function MarqueeRow({ offset }: { offset?: boolean }) {
  return (
    <div className={`features-marquee-row ${offset ? "features-marquee-row--offset" : ""}`}>
      <div className="features-marquee-track">
        {FEATURE_CARDS.map((card) => (
          <FeatureCardItem card={card} hidden={offset} key={`a-${card.title}`} />
        ))}
        {FEATURE_CARDS.map((card) => (
          <FeatureCardItem card={card} hidden key={`b-${card.title}`} />
        ))}
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="features-section">
      <div className="features-section__head">
        <Reveal>
          <h2 className="display display--sub">
            Everything the app <em>does.</em>
          </h2>
        </Reveal>
      </div>

      <Reveal className="features-marquee" y={20}>
        <MarqueeRow />
        <MarqueeRow offset />
      </Reveal>
    </section>
  );
}
