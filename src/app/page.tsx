import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AddItems from "@/components/AddItems";
import MealPlan from "@/components/MealPlan";
import RecipeCookImport from "@/components/RecipeCookImport";
import Founder from "@/components/Founder";
import Pricing from "@/components/Pricing";
import ClosingCta from "@/components/ClosingCta";
import Footer from "@/components/Footer";
import Faq, { faqStructuredData } from "@/components/Faq";

/**
 * Page order, restructured into a scroll-snapped, full-viewport stack (see
 * the AMENDED note in layout.tsx for the full history): Hero (not snapped —
 * it should still ease into Features rather than snap away from the fold),
 * then Features, AddItems, MealPlan, RecipeCookImport, Founder(About),
 * Pricing, Faq, and ClosingCta(Newsletter) each locked to one viewport and
 * scroll-snap-align: start, so a scroll gesture always lands a section
 * flush under the fixed navbar. Footer is normal document flow after the
 * last snapped section — its own content height, not a viewport.
 *
 * Colour fields alternate down the stack so each section still reads as
 * separated by a change of ground rather than by a rule.
 */
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <Navbar />

      <main id="main">
        <Hero />
        <Features />
        <AddItems />
        <MealPlan />
        <RecipeCookImport />
        <Founder />
        <Pricing />
        <Faq />
        <ClosingCta />
      </main>

      <Footer snap />
    </>
  );
}
