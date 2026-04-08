"use client";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-8 md:px-14 text-center overflow-hidden"
      style={{ paddingTop: "var(--nav-height)", paddingBottom: "80px" }}
    >
      {/* Ambient glow */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto w-full">
        {/* App icon */}
        <div className="flex justify-center mb-8">
          <img
            src="/logoIcon2.png"
            alt="PantryPilot"
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              border: "1px solid rgba(16,185,129,0.18)",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Micro-label */}
        <div className="hero-badge inline-flex items-center gap-2 px-5 py-2 rounded-full mb-9">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-400/80">
            Smart Pantry &amp; Meal Management
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[0.93] tracking-[-0.04em] mb-7">
          Your Kitchen,
          <br />
          <span className="gradient-text">Powered by AI.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-[17px] text-emerald-200/35 max-w-md mx-auto mb-12 leading-[1.75]">
          Track your pantry, plan meals with AI-powered suggestions,
          reduce food waste, and hit your nutrition goals.
        </p>

        {/* Store buttons */}
        <div
          id="download"
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="store-button"
          >
            <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="text-left">
              <div className="text-[10px] text-emerald-400/45 uppercase tracking-[0.1em] font-bold">Download on the</div>
              <div className="text-[15px] font-semibold mt-0.5">App Store</div>
            </div>
          </a>

          <a
            href="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="store-button"
          >
            <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.18 23.79c-.38-.29-.59-.75-.59-1.3V1.51c0-.55.21-1.01.59-1.3l.12-.08L14.9 11.71v.04L3.3 23.87l-.12-.08z" />
              <path d="M19.24 16.12l-4.34-4.37v-.04l4.34-4.37.1.06 5.15 2.92c1.47.83 1.47 2.2 0 3.04l-5.15 2.92-.1-.16z" />
              <path d="M19.34 16.28L14.9 11.75 3.18 23.79c.49.51 1.29.54 2.21.02l13.95-7.53z" />
              <path d="M19.34 7.21L5.39.17C4.47-.35 3.67-.32 3.18.19L14.9 11.71l4.44-4.5z" />
            </svg>
            <div className="text-left">
              <div className="text-[10px] text-emerald-400/45 uppercase tracking-[0.1em] font-bold">Get it on</div>
              <div className="text-[15px] font-semibold mt-0.5">Google Play</div>
            </div>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 scroll-indicator">
        <div className="flex flex-col items-center gap-2.5">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-400/20">
            Scroll to explore
          </span>
          <svg className="w-4 h-4 text-emerald-400/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
