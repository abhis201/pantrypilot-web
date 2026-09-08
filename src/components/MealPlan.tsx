import Reveal from "./Reveal";

interface PlanMethod {
  id: string;
  title: string;
  accent: string;
  description: string;
  screenLabel: string;
  /** True once a real screen recording exists at
   *  public/videos/meal-plan/<id>.webm/.mp4 — false renders the amber
   *  placeholder-screen instead. Flip per-column as recordings arrive. */
  hasVideo: boolean;
}

/**
 * Four ways a meal gets onto the plan, same full-viewport row pattern as
 * AddItems. All four recordings were reviewed frame-by-frame before any
 * copy was written, so every column's copy is grounded in what actually
 * happens on screen — not guessed the way AddItems' "bulk add" was before
 * its first recording arrived. All four real .webm/.mp4 pairs are in
 * public/videos/meal-plan/ and every column's hasVideo is true; the
 * placeholder-screen branch stays in PlanColumn in case a future column
 * ever ships ahead of its recording again.
 */
const PLAN_METHODS: PlanMethod[] = [
  {
    id: "manual",
    title: "Add it,",
    accent: "your way.",
    description:
      "Name it, tag the diet and cuisine, set who it's cooking for — save it to My Recipes while you're at it.",
    screenLabel:
      "Manually creating a meal: naming it, tagging diet type and cuisine, setting servings, then Save Meal",
    hasVideo: true,
  },
  {
    id: "ai-plan",
    title: "One slot,",
    accent: "three picks.",
    description:
      "Tap AI Meal Plan on any slot and confirm from three suggestions in a tap.",
    screenLabel:
      "Tapping AI Meal Plan on a single slot, then confirming one of three suggested meals",
    hasVideo: true,
  },
  {
    id: "weekly",
    title: "The week,",
    accent: "filled at once.",
    description:
      "Toggle Plan the whole week and every remaining day fills in, breakfast to dinner — still swappable slot by slot.",
    screenLabel:
      "Toggling Plan the whole week, which fills every remaining day's meal slots at once",
    hasVideo: true,
  },
  {
    id: "from-recipe",
    title: "Straight from",
    accent: "a recipe card.",
    description:
      "Tap Plan on any recipe card, pick a date and meal slot, and it's on the calendar.",
    screenLabel:
      "Tapping Plan on a recipe card, picking a date and meal type, and confirming",
    hasVideo: true,
  },
];

function PlanColumn({ method, index }: { method: PlanMethod; index: number }) {
  return (
    <div className="plan-column">
      <Reveal className="plan-column__media" delay={index * 80} y={24}>
        <div className="plan-column__screen">
          {method.hasVideo ? (
            <video
              className="plan-column__video-el"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              aria-label={method.screenLabel}
            >
              <source src={`/videos/meal-plan/${method.id}.webm`} type="video/webm" />
              <source src={`/videos/meal-plan/${method.id}.mp4`} type="video/mp4" />
            </video>
          ) : (
            <div className="placeholder-screen">
              <span>Screen pending</span>
            </div>
          )}
        </div>
      </Reveal>

      <Reveal className="plan-column__copy" delay={index * 80 + 100} y={16}>
        <h3 className="display display--xs plan-column__title">
          {method.title} <em>{method.accent}</em>
        </h3>
        <p className="plan-column__desc">{method.description}</p>
      </Reveal>
    </div>
  );
}

export default function MealPlan() {
  return (
    <section id="meal-plan" className="meal-plan">
      <div className="meal-plan__head">
        <Reveal>
          <h2 className="display display--sub">
            Four ways to <em>plan a meal.</em>
          </h2>
        </Reveal>
      </div>

      <div className="meal-plan__row">
        {PLAN_METHODS.map((method, i) => (
          <PlanColumn key={method.id} method={method} index={i} />
        ))}
      </div>
    </section>
  );
}
