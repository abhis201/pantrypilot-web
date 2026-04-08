import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollSections from "@/components/ScrollSections";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Static background: pantry/meal image with dark overlay */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1920"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(5,15,10,0.88)" }} />
      </div>
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <ScrollSections />

        {/* CTA Section */}
        <section className="relative py-36 px-8 md:px-14 text-center overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />
          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.04em] mb-8">
              Ready to{" "}
              <span className="gradient-text">Eat Smarter</span>?
            </h2>
            <p className="text-lg text-emerald-200/30 mb-14 leading-relaxed">
              Join thousands of users who track their pantry, reduce food waste,
              and discover new meals every day.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="store-button"
              >
                <svg
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] text-emerald-400/50 uppercase tracking-[0.1em] font-bold">
                    Download on the
                  </div>
                  <div className="text-base font-semibold -mt-0.5">
                    App Store
                  </div>
                </div>
              </a>
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="store-button"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3.18 23.79c-.38-.29-.59-.75-.59-1.3V1.51c0-.55.21-1.01.59-1.3l.12-.08L14.9 11.71v.04L3.3 23.87l-.12-.08z" />
                  <path d="M19.24 16.12l-4.34-4.37v-.04l4.34-4.37.1.06 5.15 2.92c1.47.83 1.47 2.2 0 3.04l-5.15 2.92-.1-.16z" />
                  <path d="M19.34 16.28L14.9 11.75 3.18 23.79c.49.51 1.29.54 2.21.02l13.95-7.53z" />
                  <path d="M19.34 7.21L5.39.17C4.47-.35 3.67-.32 3.18.19L14.9 11.71l4.44-4.5z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] text-emerald-400/50 uppercase tracking-[0.1em] font-bold">
                    Get it on
                  </div>
                  <div className="text-base font-semibold -mt-0.5">
                    Google Play
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
