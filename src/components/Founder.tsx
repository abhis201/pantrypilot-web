import Image from "next/image";
import Reveal from "./Reveal";
import Spot from "./Spot";

/**
 * This block sits where the reference page runs its testimonial grid and press
 * logos. KhanPaan has neither — no ratings, no install counts, no quotes, no
 * press — so inventing that shape would be inventing the proof with it.
 *
 * What it has instead is a real founder. The portrait is real and supplied by
 * them (`public/portrait.jpeg`). The note beneath it is NOT — the name, role,
 * and story are still owed, and are marked conspicuously so they cannot ship
 * unnoticed. Do not write words on a real person's behalf.
 *
 * The three-principle strip (no ads/trackers, data documented, a usable free
 * tier) and the closing "reach us" line were removed at the user's request —
 * this section is the founder's story alone now. The same claims still live
 * on the page: the free tier is covered in Pricing, and support contact is
 * in Footer.
 */

export default function Founder() {
  return (
    <section
      id="about"
      className="section band band--flat relative overflow-hidden viewport-lock"
    >
      {/* Sits in the outer margin, clear of the reading column. */}
      <Spot
        name="sprig"
        size={116}
        className="absolute hidden xl:block"
        style={{ right: "2%", top: "12%", rotate: "10deg" }}
      />
      <div className="shell relative max-w-[1100px]">
        <div className="founder">
          <Reveal y={24}>
            {/* Deliberately a runtime `src` rather than a static import: the
                file is supplied by the founder, and a missing static import
                would fail the build instead of just failing the image. */}
            <div className="founder__portrait">
              <Image
                src="/portrait.jpeg"
                alt="The founder of KhanPaan"
                fill
                sizes="220px"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="founder__content">
            <Reveal>
              <h2 className="display display--sub">
                Built by somone who cared about <em>food wastage</em>
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <p className="standfirst mt-4 max-w-[70ch]">
                KhanPaan started with an ordinary, annoying problem: a fridge
                full of food and no idea what to cook, followed a week later by
                throwing half of it away. Every tool we tried wanted us to plan
                meals in a vacuum — none of them knew what we already owned.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-3 max-w-[80ch] text-[13.5px] leading-[1.55] text-ink-muted">
                So KhanPaan works the other way round. It starts from your
                actual pantry, tracks what&apos;s about to expire, and builds
                suggestions from there. It also handles personal nutrition data,
                which is what makes it unique.
              </p>
            </Reveal>

            {/* ---- Founder attribution: awaiting real copy ---------------- */}
            <Reveal delay={200}>
              <div className="mt-5 rounded-[var(--r-lg)] bg-surface-soft p-5">
                <span className="placeholder-note">Heartfelt Note</span>
                <p className="mt-3.5 text-[15.5px] italic leading-[1.7] text-ink-muted">
                  “Since moving to the US, cooking has often felt like a daily
                  challenge. Deciding what to make was stressful, and I kept
                  falling back on the same few familiar recipes, ignoring
                  ingredients I already had at home. Over time, pantry items
                  would sit unused until they expired, which made me realize
                  there had to be a better way to turn what I already owned into
                  meals I actually wanted to cook.”
                </p>
                <p className="mt-3 text-[13px] font-semibold text-ink-muted">
                  Abhishek Singh · Founder & CEO
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
