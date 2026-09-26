import Reveal from "./Reveal";
import {
  ArtFridge,
  ArtClock,
  ArtReceipt,
  ArtBarcode,
  ArtChefHat,
  ArtPlay,
  ArtCalendar,
  ArtCamera,
  ArtLeaf,
  ArtCart,
  ArtChart,
  ArtShield,
} from "./FeatureArt";

interface FeatureCard {
  Art: () => React.ReactElement;
  title: string;
  body: string;
  /**
   * The tile's own colour, as the suffix of a .feature-tile--<tone> class in
   * globals.css. Every tone is declared there and nowhere else — this names
   * one, it doesn't define it. Each is used exactly once; two tiles wearing
   * the same tone is the one thing that breaks the set.
   */
  tone: string;
  /**
   * Renders double-width, which is what turns an even grid into a bento.
   * Exactly three are flagged, and their positions in the array are load-
   * bearing: one has to land in each row of five columns or the last row
   * ends with a hole. See .features-grid in globals.css.
   */
  featured?: boolean;
}

/**
 * Full-viewport "everything the app does" section — the Features nav link's
 * destination. Third shape this section has taken: three alternating
 * screenshot blocks, then two infinite horizontal marquee rows, now a bento
 * grid of twelve illustrated tiles, each one lit by its own colour (see
 * AMENDED/FEATURES in layout.tsx for the full history, and 5.10c in
 * globals.css for the palette and the motion).
 *
 * Every line traces to a real capability already documented elsewhere on
 * the site (Pricing.tsx's FREE_FEATURES/PRO_FEATURES, Faq.tsx, Founder.tsx's
 * PRINCIPLES) — nothing here is invented for the grid.
 */
const FEATURE_CARDS: FeatureCard[] = [
  {
    Art: ArtFridge,
    tone: "mint",
    title: "Full pantry tracking",
    body: "Quantity, storage location, and expiry date on every item.",
    featured: true,
  },
  {
    Art: ArtClock,
    tone: "amber",
    title: "Freshness alerts",
    body: "Colour-coded urgency, flagged from four days out.",
  },
  {
    Art: ArtReceipt,
    tone: "sky",
    title: "Receipt OCR",
    body: "Scan a receipt and the whole shop drops in at once.",
  },
  {
    Art: ArtBarcode,
    tone: "violet",
    title: "Barcode scanning",
    body: "Enriched from OpenFoodFacts and USDA FoodData Central.",
  },
  {
    Art: ArtChefHat,
    tone: "coral",
    title: "Recipe matching",
    body: "Suggestions ranked against what's actually in your pantry.",
  },
  {
    Art: ArtPlay,
    tone: "pink",
    title: "Social recipe import",
    body: "Paste a Reels, TikTok or YouTube link and it's parsed for you.",
  },
  {
    Art: ArtCalendar,
    tone: "teal",
    title: "Weekly meal planner",
    body: "Four slots a day, or let auto-plan build the week for you.",
    featured: true,
  },
  {
    Art: ArtCamera,
    tone: "indigo",
    title: "Log meals out",
    body: "Photograph a restaurant plate and it folds into today's totals.",
  },
  {
    Art: ArtLeaf,
    tone: "lime",
    title: "Smart substitutions",
    body: "A swap suggested from what's genuinely on your shelves.",
  },
  {
    Art: ArtCart,
    tone: "orange",
    title: "Shopping list export",
    body: "Missing items go straight to Instacart, Walmart, Kroger, or Amazon Fresh.",
    featured: true,
  },
  {
    Art: ArtChart,
    tone: "plum",
    title: "Nutrition & analytics",
    body: "Macro targets, plus dollars saved vs. wasted over time.",
  },
  {
    Art: ArtShield,
    tone: "slate",
    title: "No ads, no trackers",
    body: "No advertising or third-party analytics SDKs, documented in full.",
  },
];

/**
 * One tile. --i is its position in the grid and the only thing JavaScript
 * hands the CSS here: it staggers the entrance, so the grid assembles tile by
 * tile instead of arriving as a slab. Everything else — the colour, the
 * shine, the hover — is CSS from here.
 */
function FeatureTile({ card, index }: { card: FeatureCard; index: number }) {
  const { Art } = card;
  return (
    <article
      className={`feature-tile feature-tile--${card.tone}${
        card.featured ? " feature-tile--wide" : ""
      }`}
      style={{ "--i": index } as React.CSSProperties}
    >
      <div className="feature-tile__text">
        <h3 className="feature-tile__title">{card.title}</h3>
        <p className="feature-tile__body">{card.body}</p>
      </div>
      <Art />
    </article>
  );
}

export default function Features() {
  return (
    <section id="features" className="features-section">
      <div className="shell max-w-[1240px]">
        <div className="features-head">
          <Reveal as="h2" className="display display--sub" y={16}>
            Everything the app <em>does.</em>
          </Reveal>
          <Reveal as="p" className="features-head__note" delay={80} y={16}>
            Thoughtfully considered, meticulously built, and designed for real life.
          </Reveal>
        </div>

        {/* A Reveal purely for its observer: .is-in is what releases the
            tiles' staggered entrance. The wrapper's own reveal styling is
            neutralised in CSS — see .features-grid[data-reveal]. */}
        <Reveal className="features-grid">
          {FEATURE_CARDS.map((card, index) => (
            <FeatureTile card={card} index={index} key={card.title} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
