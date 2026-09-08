import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  IOS_DOWNLOAD_LINK,
  PRO_PRICE_MONTHLY,
} from "@/lib/site";

const archivo = localFont({
  src: [
    {
      path: "../../public/fonts/Archivo/Archivo-VariableFont_wdth,wght.ttf",
      style: "normal",
    },
    {
      path: "../../public/fonts/Archivo/Archivo-Italic-VariableFont_wdth,wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-archivo",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = `${SITE_NAME} — ${SITE_TAGLINE}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Track your pantry, plan meals with AI, reduce food waste, and eat smarter. Available on iOS and Android.",
  applicationName: SITE_NAME,
  keywords: [
    "pantry management",
    "meal planner",
    "food waste",
    "AI recipes",
    "nutrition tracker",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: "/logoIcon2.png",
    apple: "/logoIcon2.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * schema.org markup so search engines can render richer results (app category,
 * price, platform) rather than a plain blue link.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logoIcon2.png`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#app`,
      name: "KhanPaan: AI Food Tracker",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "iOS 13.0 or later",
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      downloadUrl: IOS_DOWNLOAD_LINK,
      publisher: { "@id": `${SITE_URL}/#organization` },
      // Free download with an optional Pro subscription. Deliberately no
      // aggregateRating — the App Store listing has a single review, and
      // marking that up would be misleading.
      offers: [
        {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Free tier",
        },
        {
          "@type": "Offer",
          price: PRO_PRICE_MONTHLY.replace("$", ""),
          priceCurrency: "USD",
          description: "KhanPaan Pro monthly subscription",
        },
      ],
    },
  ],
};

/**
 * The design direction this site was built to, kept in the markup it produced.
 * Any change to the look should be arguable against this, or should replace it.
 */
const DIRECTION_CONTRACT = `<!--
IMPECCABLE DIRECTION CONTRACT — seed: recime-ref/orchard/pastel-3

THESIS: The pantry is the starting point, not the shopping list. This page
refuses the centred-hero-over-a-food-photo arrangement the category ships, and
puts the working inventory itself in the first viewport.

OWN-WORLD: "Orchard" — light, flat, solid colour fields. Cream-mint ground
(#f9fbee), leaf-green panels and bands (#cae7bb), solid white cards, deep forest
ink (#184514), one deepened emerald for every action (#0c7355), and an amber
tint (#fbeacc/#7a4f0a) reserved for warning and unfinished-placeholder states.
Archivo 900 display over Inter body. Every value sampled from the approved comp.
Bans: no gradients, no glassmorphism, no translucent panels, no coloured glow,
no gradient-filled text, no eyebrow labels, no scroll-snap. Depth is one soft
offset shadow; separation is a change of field. One scoped exception is on
record — see AMENDED below on the feature-screenshot panels.

STORY: A cook who throws food out learns this app starts from what they already
own, sees the real inventory doing it, and installs it.

FIRST VIEWPORT: Asymmetric split on the soft half-step green ground (see
5.4b in globals.css — the hero carries this tone on its own, flat, no
rounded top). The fixed navbar over it shares the same soft-green fill, so
the two read as one continuous field with no colour seam at the nav's lower
edge; Features right below stays cream, so the hero+nav pairing still reads
as its own zone against the rest of the page. The section itself spans the
full viewport height
rather than sizing to its content (top padding clears the fixed navbar; the
box still starts at the very top of the page). Left — "Cook what you already
own." in forest ink, standfirst, two solid store badges — "App Store" in the
site's ink, "Google Play" in its brand emerald, no separate "Download free"
button beside them — above three filled trust checks. Right — three
untilted real app screens fanned directly on the ground, unframed: splash
centred and forward (the real identity shot), dashboard and stats tucked
behind either side. Each screen
carries its own --e-phone shadow; nothing sits behind the fan as a container.
Primary action sits at left-column mid-height. Four flat spot illustrations
are pinned to the corners of the hero section itself (below the fixed navbar,
clear of both columns), not to the screenshots — ornament for the whole
viewport rather than a frame around the fan.

AMENDED, and why: the comp's tilted handset and drawn bezel are deliberately
absent — the bezel collided with the screenshots' own status bar and
misrepresents a cross-platform app. The single-screenshot version of this panel
was replaced by the three-screen fan so the first viewport shows the whole
loop — identity, inventory, and the numbers it produces — rather than one
screen at a time. Two further attempts at a backdrop behind the fan — a flat
leaf-green rounded-rectangle panel, then an animated Higgsfield-generated
blob — were both tried and both dropped: each one read as decoration
competing with the screenshots for attention rather than a frame supporting
them, so the fan now stands on the plain ground and was sized up (and the
section given full viewport height) to fill the room that freed. The ground
itself was cream at first and is soft green now — see the FIRST VIEWPORT
paragraph above. The
corner stickers moved with it, from the screenshot column's corners out to
the section's own, so they read as the page's ornament rather than the fan's.
All three screens are real captures; none is a placeholder.

FORM: Alternating two-column feature blocks (recime.app, user-pinned reference),
each device on its own dark panel (ink / ink-deep, alternating with side), sides
swapping down the page. Direction and palette both pinned by the user, so no
concept roll was run. The panels carry the one scoped exception to the
no-gradient/no-glow rule — see AMENDED.

AMENDED, second pass, and why: five fixes landed together after a screenshot
review flagged their compounded effect. (1) The leaf-green bands under Founder
and FAQ lost their rounded top corners (now flat, full-bleed) — the radius was
a holdover from a card-like treatment that never suited a full-width band.
(2) The hero's soft-green ground was extended to the fixed navbar itself (see
FIRST VIEWPORT), closing the cream sliver that showed at the nav's edge.
(3) Clicking a nav link no longer leaves a slack gap between the navbar and
the landed section — the extra clearance constant was dropped from the
scroll-to-section math so the section sits flush against the nav. (4) A
mouse click on a nav link now blurs it immediately after navigating, so the
focus ring only persists for real keyboard navigation, not a pointer click.
(5) The feature-screenshot panels (FeatureBlock's device column) moved from a
flat leaf/soft-leaf fill to a dark, coded, animated glow — no image asset.
This is the one deliberate exception to the "no gradients, no coloured glow"
rule recorded above: the user supplied a reference (a phone on a glowing
organic blob) and, after an in-progress Higgsfield generation was explicitly
called off ("dont use higgsfield"), asked for the effect built in code
instead. First pass put the glow inside a flat rounded-rectangle card
(border-radius + overflow:hidden + solid ink fill) — clipped that way, the
blurred blob's edge landed right on the card's own straight edge, so it
still read as a plain coloured rectangle rather than a glow. Second pass
dropped the rectangle: the card lost its background, radius and clip, and
the dark ink fill moved onto the glow shape itself — an un-clipped near-
circle sized to a fraction of the block's width regardless of the block's
tall aspect ratio, so the portrait screenshot's own corners run past the
blob's curve at top and bottom instead of the blob enclosing it on every
side, and the blurred rim now feathers into the section's own ground rather
than stopping at a hard edge. Reduced-motion users get the existing global
override, which freezes all animation including this one. Separately, the
value-strip section ("See everything clearly / Cook with confidence / Waste
less, save more") was removed from the page outright at the user's request;
Features now runs straight into Founder.

NEW SECTION: AddItems, mounted between Features and Founder (id="add-items",
no nav entry — it's a deeper dive off the Pantry feature block, not a
destination of its own). ONE full-viewport section, all three ways an item
gets into the pantry (Single Item, Quick Add, Receipt OCR) side by side in
a single row under one header ("Multiple ways to add items to your
pantry"), small enough that header, video and copy for all three sit
inside one viewport with no scrolling. Went through two shapes before this:
first pass was three stacked full-viewport rows (wrong — the user wanted
one row, not three screens); second pass was the one row but with the
columns' vertical position staggered up/down/up as a "zig-zag" and no
header — the user then asked for the stagger removed and a header added,
since with a header already framing the row, plain even alignment reads
cleaner than the offset did. Below 760px, three columns don't fit a phone
width, so they stack and the viewport-height lock drops, the same fallback
used elsewhere on the site. Copy is grounded in real screen recordings the
user supplied (converted to muted, looping <video>, webm + mp4 source, no
image asset, no GIF): Quick Add turned out to mean rapid manual entry (name
+ optional quantity, repeated), not repeated barcode scans as first
guessed, so that column's copy now quotes the app's own in-UI line ("Name
is all we need") rather than an invented one. The Receipt-tab video went
through three cuts. First recording: trimmed to end just before a
simulator-only camera-permission-denied error (no camera in the simulator)
that hit a few hundred ms after reaching the "Scan a receipt" prompt.
Second cut of that same recording: frame-by-frame review found the actual
tab switch happened earlier than assumed (~2.08s, not ~2.4s), so most of
that trim was still showing the Single Item tab; re-cut to start at the
real switch point and held the last frame via ffmpeg's tpad filter so the
Receipt content had time to read. Third and current: the user supplied a
brand-new recording and asked for it converted "as is, without speeding";
this one also turned out to end on the same camera-permission-denied error,
which was flagged before shipping, and the user explicitly chose to ship
the full, unedited clip — error screen included — rather than trim it out
again. That is what's live now: no trim, no speed change, no held frame,
the recording's own frames start to finish. A real capture of the working
scan, if one is ever recorded on a device with camera access, should
replace it outright.
Since shipping: the section header ("Multiple ways to add items to your
pantry") is top-aligned in the viewport rather than centred as one block
with the row below (.add-items now uses justify-content: flex-start with a
generous top pad, not center) and locked to one line via white-space:nowrap
plus its own tighter font clamp; the middle column's title ("Quick add, one
line each.") got the same one-line lock. Because a one-line title needs a
column wide enough to hold it, the row-to-stack breakpoint moved from the
site's usual 760px up to 900px, so three columns never run at a width too
narrow for their titles — it stacks to full width (where wrapping is fine)
before that width is reached.

NAVBAR: Download now always returns to the very top of the page rather than
to the store-button row inside the hero. Its href changed from "/#download"
to plain "/" — on the homepage a click intercepts and smooth-scrolls to
y = 0, and from any other page the plain href already lands there on its
own once navigation completes, the same place a fresh visit would. The
store-button row inside Hero keeps id="download" (still a valid deep link,
just no longer the nav's own target).

PAGE RESTRUCTURE — scroll-snapped, full-viewport stack, and why: the user
asked for the whole page (past the hero) rebuilt as a sequence of sections
that each occupy exactly one viewport, scroll-snapped so a scroll gesture
always lands a section flush at its own top under the fixed navbar, with
scroll animations on every section. This is a deliberate reversal of this
contract's original "no scroll-snap" ban, recorded here rather than quietly
dropped: html now carries scroll-snap-type: y mandatory (see globals.css,
directly above the pre-existing scroll-padding-top rule), and every
snapped section's id (#features #add-items #meal-plan #recipe-cook #about
#pricing #faq #waitlist) gets scroll-snap-align: start from one shared
rule. Hero and Footer are deliberately NOT snap targets — Hero because the
page should still ease into Features rather than snap instantly away from
the fold, Footer because it is normal document flow after the last snapped
section (its own content height, not a viewport). "mandatory", not
"proximity": sections were sized to one viewport specifically so a scroll
commits to one rather than resting halfway between two.

Four sections are new: FEATURES was rebuilt from three alternating
screenshot blocks (copy + a single device screenshot each, with a further
"ALSO" strip of three icon items below) into one full-viewport card grid —
the destination for the navbar's Features link — listing every real app
capability in one line each, no elaboration. Every card traces to a claim
already made elsewhere on the site (Pricing.tsx's FREE_FEATURES/
PRO_FEATURES lists, Faq.tsx, Founder.tsx's PRINCIPLES), nothing invented for
the grid. The old three-block depth didn't disappear — it moved into
dedicated sections instead: ADDITEMS (already existed) covers three ways to
get an item into the pantry; MEALPLAN (new) covers four ways to plan a
meal — manual creation, the AI/auto-plan action, the weekly planner strip,
and planning straight from a recipe card — same visual pattern as AddItems,
one row of small video columns under a header; RECIPECOOKIMPORT (new)
covers importing a recipe from a social link and the recipe detail screen
it opens onto, two wider columns since there are only two.

MealPlan shipped all four columns with the site's amber "unfinished"
placeholder-screen at first — no recording existed yet for manual meal
creation, the AI-plan action, the weekly-planner strip, or planning from a
recipe card. All four have since arrived (public/videos/meal-plan/, webm +
mp4 pairs, hasVideo now true on every PlanMethod in MealPlan.tsx) and were
reviewed frame-by-frame before any copy was written — not guessed the way
AddItems' own "bulk add" was before its first recording landed (assumed
barcode scanning, the real recording showed rapid manual entry). What the
four recordings actually show: "manual" is the Add New Meal form (name,
dietary/cuisine tags, servings, optional calories/cook time, save to My
Recipes); "ai-plan" is tapping AI Meal Plan on one slot and confirming one
of three suggested meals; "weekly" is the "Plan the whole week" toggle,
which fetches and fills every remaining day's slots at once, each still
swappable; "from-recipe" is tapping Plan on a Discover Recipes card, then
picking a date and meal type in the Schedule Meal modal. None of the four
was trimmed or sped up, per explicit instruction — full source length in
both formats, however long that made the file (the weekly recording runs
53 seconds).

RecipeCookImport's Import column still has no real capture and still
renders the placeholder-screen; its other column (recipe detail) ships
with a real screenshot from the start — public/screens/recipe-detail.png,
previously captured but unused (see public/screens/README.md's "Held, not
currently placed" table).

The pre-existing About, Pricing, and FAQ sections — previously sized to
their own content, not a viewport — were folded into the same snapped
stack, positioned after RecipeCookImport per the user's explicit order.
Each picked up a new shared .viewport-lock utility class (min-height:
100dvh, flex column, centred) rather than a hard height + clipped
overflow: real copy (Pricing's two full feature lists, FAQ's seven
answers) should be free to push a section past one viewport and on to the
next snap point rather than being truncated to force an exact fit. All
three were also compacted — smaller heading scale, tighter padding and list
spacing, a smaller founder portrait — specifically so they fit one viewport
at ordinary desktop heights without relying on that overflow allowance. The
closing Newsletter/waitlist band (ClosingCta.tsx) got the same treatment
plus more: per the user's explicit "scaled down to be visible in the
viewport" instruction, its heading dropped from display--section to
display--sub, its own sub-heading from display--sub to display--xs, and
every internal margin/padding tightened, on top of the new .viewport-lock.

Every section in the new stack already used the Reveal component for
scroll-in animation (IntersectionObserver, respects prefers-reduced-motion)
before this restructure; MealPlan and RecipeCookImport follow the same
pattern on arrival rather than introducing a new animation system, per the
user's "each section must show animations on scroll" instruction.

Below the 900px breakpoint already used by AddItems, every one of these
locked sections (.features-section, .meal-plan, .recipe-row-section, and
.viewport-lock) drops its min-height and lets content stack and flow
normally — the same fallback the site already used, applied consistently
rather than reinvented per section.

SNAP FIX, hero and footer: two problems surfaced once the scroll-snapped
stack above shipped, both fixed by adding two more elements to the shared
scroll-snap-align rule in globals.css rather than by loosening
scroll-snap-type off mandatory. First: the navbar's Download button
scrollTo(0)s the page, but with Hero excluded from the snap set,
mandatory snapping had no reason to treat y = 0 as a real resting point and
could pull that scroll toward Features (the next nearest snap-align
target) instead of landing on the hero as the button promises. Fixed by
adding #hero to the snap-align rule — Hero is no longer excluded. Second:
#waitlist (the closing Newsletter/waitlist band) was the last snap target
in the stack, and Footer — normal document flow, no snap-align — came
right after it; scrolling down past #waitlist had nowhere else to commit
to, so mandatory snapping sprang back to #waitlist's own top every time,
trapping the Newsletter band and hiding the footer (its brand/logo header
row included) underneath it. Fixed by adding the footer element itself
(untyped by id — Footer has none) to the same rule, giving mandatory
snapping a legitimate next point below #waitlist to land on.

FEATURES, second pass — marquee instead of a grid, and why: the static
4x3 card grid (12 cards, four columns, three rows) was replaced with two
horizontal marquee rows that scroll left continuously, per the user's own
annotated screenshot (two boxes drawn over the old grid) asking for
something that "looks like a slide show," "keeps advancing without
stopping like a slow train in a loop," and where the second row "starts
halfway through ahead of" the first so the two rows aren't showing the
same cards at the same time. Both rows carry the identical 12
FEATURE_CARDS; each row's own track is that array twice back to back so
translateX can animate 0% to -50% and land on pixel-identical content,
looping with no visible restart. Row two's track gets
animation-delay: calc(var(--marquee-duration) * -0.5) — a negative delay
starts an animation already partway into its cycle, which is
mathematically the same as "starting half a cycle ahead" without needing
a second, differently-ordered copy of the data. No JavaScript: this is a
CSS keyframe (see .features-marquee in globals.css) on transform only, so
it composites cheaply and is already covered by the page's one
prefers-reduced-motion override (animation-duration forced to ~0 there,
so it simply stops moving rather than needing its own reduced-motion
rule). Accessibility: each row's own duplicate half (the loop seam) and
the entirety of row two (the same 12 cards again, out of phase) are
aria-hidden, so a screen reader hears each of the 12 features exactly
once rather than four times over. The user also asked, in a follow-up to
the same request, for no visible border or frame around the rows (the red
boxes in their screenshot were an annotation, not a spec) and for cards to
fade out at each row's left/right edge instead of hard-cutting — done with
a mask-image gradient on .features-marquee-row rather than an outline or
overflow clip. The grid's old 900px/520px column-count breakpoints were
dropped; a marquee doesn't need a column count to reflow, it just shows
fewer cards at once on a narrower viewport. The section itself still drops
its min-height: 100dvh lock below 900px, same as every other full-viewport
section on the page.

FEATURES MARQUEE, rendering bug: the user reported the marquee showing as
a vertically stacked, full-width, overlapping-corner column instead of a
horizontal two-row scroll. Code review of .features-marquee,
.features-marquee-track, .feature-card, and Reveal.tsx found nothing
wrong; live inspection of the running page's computed styles confirmed
the compiled stylesheet was missing the .features-marquee rules entirely
and carried a truncated .feature-card rule (no width, no flex-basis) --
the dev server's Turbopack cache had gone stale relative to globals.css.
Fixed by killing the stray dev-server processes squatting on port 3000,
clearing .next, and restarting npm run dev; no CSS or component change
was needed. Lesson: when a rendered page contradicts a source-correct
stylesheet, check the compiled/served CSS before editing the source
again -- a stale dev cache can silently drop whole rule blocks.

FEATURES MARQUEE, jank fix: the user reported the two rows occasionally
appearing to swap which one was "ahead" -- a split-second lurch, not a
real change in the CSS-driven phase offset (animation-delay: 0s vs -21s
on a shared 42s duration is exact and never drifts). Root cause was frame
drops on the main thread: .features-marquee-track had no compositor-layer
hint, so a busy tab (this page runs several IntersectionObservers and
autoplaying videos) could occasionally paint the animation on the main
thread instead of the compositor, dropping a frame on one row and not the
other. Fixed with will-change: transform, transform: translateZ(0), and
backface-visibility: hidden on .features-marquee-track to force GPU
compositing.

Note for future edits: changes made through the device bridge to a file
the dev server already has open do not reliably trigger Turbopack's
file-watcher-based HMR on this machine -- the served chunk kept its old
content until the dev server was fully restarted (processes killed, .next
cleared, npm run dev restarted). Any CSS/component edit made this way
needs a restart to actually reach the browser; don't trust a bare save.

FEATURES MARQUEE, the real jank: the previous will-change fix helped but
didn't explain a doubled/ghosted card the user caught on video (a frame
of "Fr[ell] pantry tracking" -- two overlapping renders of the same card
edge). Frame-by-frame analysis (ffmpeg extraction + cross-correlation on
each row's pixel strip across all 169 frames of the clip) found exactly
one anomalous frame, timed to roughly 0.5s into the clip -- suspiciously
close to --dur-reveal (640ms). Cause: .features-marquee is itself a
Reveal target, and MOTION's generic [data-reveal].is-settled rule drops
will-change to auto once its one-shot slide-in transition finishes. That
demotion pulls the wrapper off its own compositor layer mid-page, forcing
the browser to recomposite the whole subtree in that frame -- which is
what produced the visible doubled card underneath, timed exactly to when
the reveal settles. Fixed with a .features-marquee.is-settled override
that keeps will-change: transform permanently on this one wrapper, since
unlike a normal reveal target it doesn't go still afterward -- the
marquee keeps animating underneath it for as long as the section is on
screen.

RECIPE-COOK-IMPORT, real recordings: both columns shipped placeholder or
a single static screenshot until now. Two recordings arrived
(import.webm/mp4, discover-cook.webm/mp4 in public/videos/recipe-cook/,
copied verbatim per the user's do-not-trim instruction, durations
ffprobe-verified against the source before and after the mp4 encode) and
were reviewed frame-by-frame before any copy changed. import shows the
Import Recipe sheet (Instagram/TikTok/YouTube/Web tabs, a Scan URL
option), a pasted YouTube link, the Importing/Extracting progress state,
a Successfully imported toast, and the result landing in Imported
Recipes with real macros and Cook This / Plan actions. discover-cook
shows a recipe's detail page -- diet/cuisine tags, full macros, a
serving-size stepper, ingredients individually checked or crossed
against the pantry ("3 in pantry") -- through its numbered instructions,
then Cook This, then Cooked & Consumed vs. Schedule for Later (logs
kcal, updates the pantry); the same clip also shows the Discover Recipes
tab (the "Prioritize expiring pantry items" toggle, a live search) the
recipe came from. The static recipe-detail.png ScreenCard column is
gone -- both columns are now video, same aspect-ratio/object-fit
treatment as MealPlan's four columns (.recipe-column__video-el mirrors
.plan-column__video-el).

SCREEN RECORDINGS, dynamic island cropped: every real screen recording on
the site (add-items' 3, meal-plan's 4, recipe-cook's 2 -- 9 videos, 18
files counting mp4 fallbacks) had the OS status bar and dynamic island
in frame. Measured the crop boundary directly rather than guessing: at
the center column, the dynamic island renders as a pure-black
(RGB 0,0,0) band, and that band's pixel range was identical across
every capture checked -- 45-150 of 2622 for the 1206x2622 videos, 25-75
of 1304 for add-items' differently-scaled 600x1304 captures -- both
6% of frame height, confirming a single fixed device-level crop
fraction rather than a per-video guess. Cropped every source with
ffmpeg's crop=iw:ih*0.94:0:ih*0.06 (top 6% removed, nothing else
touched -- ffprobe-verified every cropped file's duration against its
pre-crop original, none trimmed), re-encoded webm (libvpx-vp9,
-deadline realtime -cpu-used 8 once the default "good" deadline proved
far too slow to finish in reasonable time on this environment's 2
cores) and regenerated every mp4 fallback from the cropped webm. All
nine originals were overwritten in place at their existing paths, so no
component code changed. The three column classes that hardcoded
aspect-ratio: 1206/2622 (.add-column__video, .plan-column__screen,
.recipe-column__screen) were updated to 1206/2465 -- the same capture
ratio minus that 6% -- and their heights bumped slightly (36->40vh,
32->36vh, 42->46vh respectively) per the user's request in the same
pass.

SCROLL SNAP, scoped to the home page only: the user reported snapping on
Privacy/Terms/Contact, where it was never intended -- those pages should
scroll normally. Root cause: html's scroll-snap-type: y mandatory is a
single global declaration (there's no per-route html/body in the App
Router, layout.tsx's html/body wrap every route), but that alone is
harmless -- a snap container with no snap targets on an axis doesn't
snap on that axis at all, per spec. The actual leak was the shared
scroll-snap-align rule's footer entry being a bare element-tag
selector rather than an id like every other entry in that list, and
Footer is the one component every one of those pages also renders --
so it, alone, was a real (if accidental) snap target on pages that were
never meant to have any. Fixed at the component, not by touching the
global html rule: Footer now takes a snap prop and only renders
id equal to footer when it's passed; the home page is now the only
caller using Footer snap (every other page's plain Footer call renders
with no id). The shared CSS rule was updated from the bare footer tag
selector to an id selector to match. Net effect: the footer id, and
every other id that rule snaps to, exists only on the home page's DOM,
so scroll-snap-type has nothing to snap to anywhere else --
Privacy/Terms/Contact scroll like ordinary pages again, with no change
to the home page's snap behavior at all.

HYDRATION WARNING, Grammarly false positive: the console reported a
hydration mismatch on body -- data-new-gr-c-s-check-loaded and
data-gr-ext-installed attributes present on the client but not the
server-rendered HTML. Those are injected by the Grammarly browser
extension before React hydrates, not a real SSR/client mismatch in this
app's own code (the error message itself names browser extensions as a
cause). Fixed with suppressHydrationWarning on body, which -- per React's
own docs -- only silences attribute-level mismatches on the element it's
placed on; it would not hide a real content mismatch there or anywhere
else in the tree.

CONTACT PAGE, condensed to fit one viewport: the form's Message field and
Send button were cut off below the fold on a normal laptop screen -- the
page was never designed as one of the home page's viewport-locked
sections, just a tall block of nav-height-plus-48px top padding, a
mb-12 header, space-y-6 between four form groups, and a six-row
textarea. Tightened every gap that was purely decorative spacing rather
than load-bearing (header margin, form group spacing, grid gap) and
dropped the textarea from 6 rows to 4; left .form-input's own 54px
min-height alone since that is a shared touch-target size used
everywhere else on the site, not something to shrink on one page.
Applied the existing .viewport-lock utility (already used by
Founder/Pricing/Faq/ClosingCta) to main so the now-shorter content sits
vertically centered in the space between the navbar and the fold on
tall screens, rather than pinned to the top with a lot of empty space
below it -- this is a plain min-height: 100dvh + flex centering, not
scroll-snap, so it does not reintroduce the snapping the previous fix
deliberately removed from this page. viewport-lock's own <900px
breakpoint drops back to normal block flow, so mobile is unaffected.

HERO FAN, three screenshots animate in separately: the fanned hero
screenshots (dashboard, splash, stats) previously entered as one group,
wrapped in a single .rise div with one shared --rise-delay -- so all
three arrived on the same clock even though they sit at different
depths in the fan. Split that wrapper apart: each ScreenCard now
carries the entrance directly, via a new fan-rise class plus its own
--fan-delay custom property (center 360ms, left 450ms, right 540ms,
continuing the section's existing 90ms stagger step rather than
inventing a new cadence). fan-rise is a new class rather than reusing
.rise, on purpose -- the head's noscript rule forces opacity, transform
and animation to none for [data-reveal] and .rise so the page isn't
left blank without JS, and applying that same reset to the side cards
would strip their rotate() and leave them flat and unrotated with no
JS fallback. fan-rise never matches that selector, so with JS off the
browser simply paints each card's own static resting transform
(.hero-fan__side--left/--right's rotate translateY, already defined
above fan-rise in globals.css) and skips the animation entirely, which
looks identical to a settled fan. Two new keyframes, riseInFanLeft and
riseInFanRight, end each side exactly on that same resting rotate and
translateY so the animated and no-JS states land on identical pixels;
the center card reuses the existing riseIn keyframe since it has no
rotation to preserve. After the split read as too quick to register as
three separate arrivals, slowed the fan's entrance specifically --
a dedicated --dur-fan-reveal (900ms) on fan-rise, well past the site's
shared --dur-reveal (640ms) that every other .rise/[data-reveal]
element still uses -- rather than slowing reveals sitewide.

FINISH: unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, and DESIGN.md.
-->`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        {/* Reveal-on-scroll starts elements hidden and JavaScript brings them
            in. Without scripting that would leave the page blank, so opt out
            of the whole system when JS is unavailable. */}
        <noscript>
          <style>{`[data-reveal],.rise{opacity:1!important;transform:none!important;animation:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-screen" suppressHydrationWarning>
        {/* A JSX comment is stripped by the compiler, so the direction contract
            is injected as a real HTML comment that survives the production
            build and can be grepped out of the served markup. */}
        <div hidden dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
