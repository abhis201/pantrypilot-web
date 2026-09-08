import Reveal from "./Reveal";

/**
 * Two columns: importing a recipe from a social link, and what happens
 * after -- a recipe matched against the pantry, cooked, and logged. Both
 * columns ship with real screen recordings (reviewed frame-by-frame
 * before any copy was written, same discipline as MealPlan):
 *
 * - import.webm/mp4: opening the Import Recipe sheet, pasting a YouTube
 *   Shorts URL (Instagram, TikTok, YouTube and a plain web URL are all
 *   offered, plus a Scan URL option), the "Importing... Extracting
 *   ingredients, steps & macros" progress state, a Successfully imported
 *   toast, and the new recipe landing in Imported Recipes with its photo,
 *   macros, and Cook This / Plan actions.
 * - discover-cook.webm/mp4: a recipe's detail page -- diet/cuisine tags,
 *   full macro breakdown, a serving-size stepper, and every ingredient
 *   checked or crossed against what's already in the pantry ("3 in
 *   pantry") -- scrolling through numbered step-by-step instructions,
 *   then Cook This, then Cooked & Consumed vs. Schedule for Later, which
 *   logs the calories and updates the pantry. The same clip also shows
 *   the Discover Recipes tab (the "Prioritize expiring pantry items"
 *   toggle, searching "biryani") that the recipe came from.
 */
export default function RecipeCookImport() {
  return (
    <section id="recipe-cook" className="recipe-row-section">
      <div className="recipe-row-section__head">
        <Reveal>
          <h2 className="display display--sub">
            From an idea or a link to <em>a cooked meal.</em>
          </h2>
        </Reveal>
      </div>

      <div className="recipe-row-section__row">
        <div className="recipe-column">
          <Reveal className="recipe-column__media" y={24}>
            <div className="recipe-column__screen">
              <video
                className="recipe-column__video-el"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-label="Pasting a YouTube link into Import Recipe, extracting ingredients, steps and macros, then the recipe landing in Imported Recipes"
              >
                <source
                  src="/videos/recipe-cook/import.webm"
                  type="video/webm"
                />
                <source src="/videos/recipe-cook/import.mp4" type="video/mp4" />
              </video>
            </div>
          </Reveal>
          <Reveal className="recipe-column__copy" delay={100} y={16}>
            <h3 className="display display--xs recipe-column__title">
              Import <em>from a link.</em>
            </h3>
            <p className="recipe-column__desc">
              Paste an Instagram Reel, TikTok, YouTube link or plain URL and
              it&apos;s parsed into ingredients, macros and steps — ready to
              cook or plan.
            </p>
          </Reveal>
        </div>

        <div className="recipe-column">
          <Reveal className="recipe-column__media" delay={80} y={24}>
            <div className="recipe-column__screen">
              <video
                className="recipe-column__video-el"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-label="A recipe's detail page with ingredients checked against the pantry and step-by-step instructions, then Cook This logging the calories and updating the pantry"
              >
                <source
                  src="/videos/recipe-cook/discover-cook.webm"
                  type="video/webm"
                />
                <source
                  src="/videos/recipe-cook/discover-cook.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </Reveal>
          <Reveal className="recipe-column__copy" delay={180} y={16}>
            <h3 className="display display--xs recipe-column__title">
              Discover our curated selection for <em>your taste</em>
            </h3>
            <p className="recipe-column__desc">
              Discover recipes that match your pantry, dietary preferences and
              expiring items, then cook and log them with a single tap.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
