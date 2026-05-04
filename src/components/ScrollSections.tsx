"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import ScreenShowcase from "./PhoneFrame";

interface SectionData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  badgeColor: string;
  accentColor: string;
  images: string[];
  features: string[];
}

const sections: SectionData[] = [
  {
    id: "home-dashboard",
    title: "Your Smart Kitchen Dashboard",
    subtitle: "Everything at a glance",
    description:
      "A personalized overview of your pantry and nutrition. See today\u2019s consumed calories, macro targets, quick action tiles, and recent activity \u2014 all in one place.",
    badge: "Dashboard",
    badgeColor: "bg-emerald-500/10 text-emerald-400",
    accentColor: "#10b981",
    images: [
      "/screens/section1/home1.png",
      "/screens/section1/home2.png",
    ],
    features: [
      "Daily calorie & macro tracking",
      "Quick actions: Add Item, Shopping, AI Suggestions",
      "Recent pantry activity feed",
      "Pull-to-refresh data sync",
    ],
  },
  {
    id: "pantry-management",
    title: "Complete Pantry Control",
    subtitle: "Track every item with precision",
    description:
      "Your core inventory management hub. Search, filter by storage location, track expiry dates with color-coded urgency indicators, and manage items with intuitive swipe actions.",
    badge: "Pantry",
    badgeColor: "bg-teal-500/10 text-teal-400",
    accentColor: "#14b8a6",
    images: [
      "/screens/section2/pantry1.png",
      "/screens/section2/pantry2.png",
      "/screens/section2/additem.png",
    ],
    features: [
      "Barcode scanning with USDA & OpenFoodFacts lookup",
      "AI-powered image recognition for ingredients",
      "Expiry tracking with 4-day alerts",
      "Filter by Fridge, Freezer, Pantry, or Expiring",
    ],
  },
  {
    id: "ai-suggestions",
    title: "AI-Powered Meal Ideas",
    subtitle: "Recipes from what you already have",
    description:
      "Get personalized recipe recommendations powered by Google Gemini AI, based on your real pantry contents, dietary preferences, and cuisine choices.",
    badge: "AI \u00b7 Pro",
    badgeColor: "bg-emerald-500/10 text-emerald-300",
    accentColor: "#34d399",
    images: [
      "/screens/section3/aisuggestions.png",
      "/screens/section3/schedulemodal.png",
    ],
    features: [
      "Smart matching against your pantry items",
      "23 cuisine filters + lifestyle preferences",
      "Expiring-items-first mode to reduce waste",
      "Time-aware suggestions (breakfast, lunch, dinner)",
    ],
  },
  {
    id: "meal-planner",
    title: "Weekly Meal Planner",
    subtitle: "Plan your week, eat with intention",
    description:
      "Schedule meals across Breakfast, Lunch, Snacks, and Dinner for any day. Link recipes, track servings, estimate calories, and let AI auto-plan meals for you.",
    badge: "Planner",
    badgeColor: "bg-teal-500/10 text-teal-300",
    accentColor: "#5eead4",
    images: [
      "/screens/section4/mealplanner.png",
      "/screens/section4/mealdetails.png",
    ],
    features: [
      "4 meal slots per day with week navigation",
      "AI Chef auto-plan button (Pro)",
      "Recipe linking with ingredient tracking",
      "Full nutritional breakdown per meal",
    ],
  },
  {
    id: "nutrition-settings",
    title: "Precision Nutrition & Settings",
    subtitle: "Personalized to your body and goals",
    description:
      "Advanced macro calculator using the Katch-McArdle formula with your body metrics. Set daily targets, choose between Metric and Imperial, and manage your entire profile.",
    badge: "Nutrition",
    badgeColor: "bg-emerald-500/10 text-emerald-400",
    accentColor: "#10b981",
    images: [
      "/screens/section5/nutrition1.png",
      "/screens/section5/nutrition2.png",
      "/screens/section5/settings.png",
    ],
    features: [
      "Katch-McArdle formula-based macro calculation",
      "Custom donut chart visualization",
      "Dietary preference tags for AI filtering",
      "Bug reports, feature requests & feedback",
    ],
  },
  {
    id: "analytics",
    title: "Detailed Consumption Analytics",
    subtitle: "Data-driven insights for smarter eating",
    description:
      "A comprehensive analytics dashboard with live data about pantry health, spending trends, freshness scores, and AI-powered health insights from Google Gemini.",
    badge: "Analytics \u00b7 Pro",
    badgeColor: "bg-teal-500/10 text-teal-400",
    accentColor: "#14b8a6",
    images: [
      "/screens/section6/stats1.png",
    ],
    features: [
      "Freshness score & spoilage tracking",
      "Grocery spending trends (weekly & monthly)",
      "Stock distribution by storage location",
      "AI health insights & consumption trends",
    ],
  },
];

export default function ScrollSections() {
  const [activeSection, setActiveSection] = useState(0);
  const [activeSubImage, setActiveSubImage] = useState(0);
  const [showcaseVisible, setShowcaseVisible] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    let bestSection = 0;
    let bestVisibility = 0;

    sectionRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const rect = ref.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distance = Math.abs(sectionCenter - viewportCenter);
      const visibility = Math.max(0, 1 - distance / windowHeight);
      if (visibility > bestVisibility) {
        bestVisibility = visibility;
        bestSection = index;
      }
    });

    // Hide showcase when the sections container bottom approaches the viewport bottom
    let pastEnd = false;
    if (containerRef.current) {
      const containerBottom = containerRef.current.getBoundingClientRect().bottom;
      pastEnd = containerBottom < windowHeight * 0.75;
    }

    // Only show showcase when: hero fully scrolled past AND a feature section is visible AND not past all sections
    const heroScrolled = scrollY > windowHeight * 0.95;
    setShowcaseVisible(heroScrolled && bestVisibility > 0.05 && !pastEnd);

    if (bestVisibility > 0.05) {
      setActiveSection(bestSection);

      const ref = sectionRefs.current[bestSection];
      if (ref) {
        const rect = ref.getBoundingClientRect();
        const imageCount = sections[bestSection].images.length;
        if (imageCount > 1) {
          const sectionScrolled = Math.max(0, -rect.top);
          const scrollable = Math.max(1, rect.height - windowHeight);
          const progress = Math.min(1, sectionScrolled / scrollable);
          const subIndex = Math.min(imageCount - 1, Math.floor(progress * imageCount));
          setActiveSubImage(subIndex);
        } else {
          setActiveSubImage(0);
        }
      }
    }

    // Subtle vertical parallax
    if (showcaseRef.current) {
      const scrollProgress =
        scrollY / (document.documentElement.scrollHeight - windowHeight);
      const ty = Math.sin(scrollProgress * Math.PI) * 10;
      showcaseRef.current.style.transform = `translateY(${ty}px)`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const currentSection = sections[activeSection];

  return (
    <div id="features">
      <div ref={containerRef} className="relative">
        {/* Fixed Desktop Layout (Both Text and Showcase) */}
        <div
          className="hidden lg:flex fixed inset-0 items-center justify-between max-w-7xl mx-auto px-8 md:px-16 z-20 pointer-events-none"
          style={{
            opacity: showcaseVisible ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          {/* Left: Text */}
          <div className="w-[46%] pr-8 pointer-events-auto">
            {/* The key ensures React instantly swaps the content when the active section changes */}
            <div key={currentSection.id} className="fade-in-section">
              <span className={`feature-badge ${currentSection.badgeColor} mb-5`}>
                {currentSection.badge}
              </span>
              <h2 className="text-[clamp(1.85rem,4vw,3rem)] font-bold mt-4 mb-3 leading-[1.08] tracking-[-0.03em]">
                {currentSection.title}
              </h2>
              <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-400/45 mb-5">
                {currentSection.subtitle}
              </p>
              <p className="text-emerald-200/40 text-[15px] leading-[1.85] mb-10 max-w-[420px]">
                {currentSection.description}
              </p>
              <ul className="space-y-3">
                {currentSection.features.map((feature, fi) => (
                  <li
                    key={fi}
                    className="pl-4 py-0.5"
                    style={{ borderLeft: `3px solid ${currentSection.accentColor}28` }}
                  >
                    <span className="text-[13px] font-semibold text-emerald-100/55 leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Showcase */}
          <div className="w-[46%] flex flex-row items-center justify-center flex-shrink-0 pointer-events-auto gap-8">
            {/* Vertical Image Indicator */}
            <div className="flex flex-col gap-2.5 items-center justify-center">
              {currentSection.images.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full transition-all duration-400 ${
                    i === activeSubImage 
                      ? "h-8 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" 
                      : "h-1.5 bg-emerald-800/50"
                  }`}
                />
              ))}
            </div>

            <div ref={showcaseRef} style={{ willChange: "transform" }}>
              <ScreenShowcase
                images={currentSection.images}
                activeIndex={activeSubImage}
              />
            </div>
          </div>
        </div>

        {/* Scrollable Spacer Sections */}
        {sections.map((section, index) => (
          <div
            key={section.id}
            ref={(el) => { sectionRefs.current[index] = el; }}
            className="page-section"
            style={{
              minHeight: `${Math.max(100, section.images.length * 75)}vh`,
            }}
          >
            {/* Mobile Layout (Visible only on small screens) */}
            <div className="lg:hidden flex flex-col items-center max-w-7xl mx-auto px-8 md:px-16 w-full py-24">
              <div className="flex flex-row items-center justify-center gap-6 mb-12">
                {/* Vertical Image Indicator */}
                <div className="flex flex-col gap-2.5 items-center justify-center">
                  {section.images.map((_, i) => {
                    const isActive = activeSection === index ? i === activeSubImage : i === 0;
                    return (
                      <div
                        key={i}
                        className={`w-1.5 rounded-full transition-all duration-400 ${
                          isActive 
                            ? "h-8 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" 
                            : "h-1.5 bg-emerald-800/50"
                        }`}
                      />
                    );
                  })}
                </div>

                <ScreenShowcase
                  images={section.images}
                  activeIndex={activeSection === index ? activeSubImage : 0}
                />
              </div>

              <div className="w-full">
                <span className={`feature-badge ${section.badgeColor} mb-5`}>
                  {section.badge}
                </span>
                <h2 className="text-[clamp(1.85rem,4vw,3rem)] font-bold mt-4 mb-3 leading-[1.08] tracking-[-0.03em]">
                  {section.title}
                </h2>
                <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-400/45 mb-5">
                  {section.subtitle}
                </p>
                <p className="text-emerald-200/40 text-[15px] leading-[1.85] mb-10 max-w-[420px]">
                  {section.description}
                </p>
                <ul className="space-y-3">
                  {section.features.map((feature, fi) => (
                    <li
                      key={fi}
                      className="pl-4 py-0.5"
                      style={{ borderLeft: `3px solid ${section.accentColor}28` }}
                    >
                      <span className="text-[13px] font-semibold text-emerald-100/55 leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
        
        {/* CSS for simple fade in */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes sectionFadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .fade-in-section {
            animation: sectionFadeIn 0.4s ease-out forwards;
          }
        `}} />
      </div>
    </div>
  );
}
