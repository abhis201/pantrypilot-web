# App screens

Real screenshots from the PantryPilot iOS app, captured on an iPhone 17 Pro
simulator against a live account. Not mockups, not renders.

**Naming.** One flat folder, each file named for the screen it shows. The
previous `section1/`…`section6/` layout encoded nothing but the order the
screens happened to appear in on an older version of the marketing page, and it
actively misled: `section2/pantry1.png` was an *Edit Item* modal, not the pantry.
If a screen's role on the site changes, the filename should not have to.

**Processing.** Each capture is trimmed at a natural gutter between UI cards —
never through a photograph, a chart, or a list row — then downscaled 2× since
nothing renders wider than ~300 CSS px. The status bar is kept (it reads as a
real device); the home indicator strip is cropped off. `ScreenCard` takes each
image's own aspect ratio, so nothing is cropped a second time in the browser.

**Re-capturing.** `scripts/capture-app-screens.sh` automates this, but it needs
`cliclick` plus Accessibility permission for the terminal app. Without that,
capture manually in the simulator (⌘S) and re-run the trim step.

---

## On the site

| File | Screen | Where it's used | What it proves |
|---|---|---|---|
| `pantry-grid.png` | Pantry inventory | Feature block 1 | The inventory is real and per-item: photo, quantity, storage location, and a freshness border whose colour is the expiry urgency. |
| `recipes-discover.png` | Discover Recipes | Feature block 2 | Suggestions are ranked against live pantry stock — the "Use Expiring Items First" toggle and the "Missing 2 items" badges are the mechanism, visible. |
| `meal-planner.png` | Meal Planner | Feature block 3 | A real week (week 34) with populated slots and per-day calories, plus the auto-plan action. |

Three screens carry the argument. Showing all ten would turn the page into a
gallery a visitor scrolls past without reading; the rest are held here for when
a section genuinely needs them.

## Held, not currently placed

| File | Screen | Notes |
|---|---|---|
| `home-dashboard.png` | Home dashboard | Pantry totals by location, expiring-soon alert, calorie ring at 64%, quick actions, recent activity. The best single summary of the app — a candidate if the page ever needs one overview shot. |
| `nutrition-today-macros.png` | Today's Macros (Pro) | Consumed split into pantry vs outside meals against a daily goal, with protein/carbs/fat/fibre/sugar bars. The clearest proof that outside meals fold into the same totals. |
| `recipe-detail.png` | Recipe detail | Hero photo, cook time, calories, cuisine and dietary tags. |
| `recipe-ingredients.png` | Recipe ingredients | Serving-size stepper, "5 in pantry", and missing ingredients struck through — a strong second screen for feature block 2 if it ever runs two. |
| `shopping-list.png` | Shopping list | Completion progress, manual vs restock items, recently-completed accordion. |
| `shopping-export-cart.png` | Export & Buy Cart | Instacart / Walmart / Kroger export with per-item selection. Backs the "list that leaves" claim in the third band. |
| `recipes-saved.png` | Saved recipes | Bookmarked and imported recipes. |

## Rules

- **Never fabricate a screen.** If a capability isn't in the app, it doesn't get
  a screenshot, a mock, or a described feature on the site.
- **Never rasterise UI text the site could set itself.** These are evidence of
  the product; headings and body copy stay as real HTML.
- Each screen on the site carries a specific `aria-label` describing what is on
  it — see the `screenLabel` fields in `src/components/Features.tsx`.
