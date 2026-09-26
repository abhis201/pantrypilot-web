import Image from "next/image";
import Reveal from "./Reveal";

export default function Founder() {
  return (
    <section
      id="about"
      className="section band band--flat relative overflow-hidden viewport-lock"
    >
      <div className="shell relative max-w-[1240px]">
        <div className="founder">
          <Reveal y={24} as="figure" className="founder__figure">
            {/* Deliberately a runtime `src` rather than a static import: the
                file is supplied by the founder, and a missing static import
                would fail the build instead of just failing the image. */}
            <div className="founder__portrait">
              <Image
                src="/portrait.jpeg"
                alt="Abhishek Singh, founder of KhanPaan"
                fill
                sizes="(min-width: 820px) 360px, 300px"
                className="object-cover"
              />
            </div>
            <figcaption className="founder__caption">
              <strong>Abhishek Singh</strong>
              <span>Founder &amp; CEO, KhanPaan</span>
            </figcaption>
          </Reveal>

          <div className="founder__content">
            <Reveal>
              <p className="founder__eyebrow">The story behind KhanPaan</p>
              <h2 className="display display--sub">
                A little less waste.<br />A lot more <em>possibility.</em>
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <p className="founder__intro">
                KhanPaan started with an ordinary, annoying problem: a fridge
                full of food and no idea what to cook, followed a week later by
                throwing half of it away. Every tool we tried wanted us to plan
                meals in a vacuum — none of them knew what we already owned.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <p className="founder__detail">
                So KhanPaan works the other way round. It starts from your
                actual pantry, tracks what&apos;s about to expire, and builds
                suggestions from there. It also handles personal nutrition data,
                which is what makes it unique.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <blockquote className="founder__note">
                <span className="founder__note-label">A personal note</span>
                <p className="founder__quote">
                  “After moving to the US, I found myself asking the same
                  question every day: what should I cook? I kept making the
                  same few meals while ingredients I already had went unused
                  and eventually expired. I built KhanPaan to change that —
                  to help turn the food in my kitchen into meals I look forward
                  to making. It started with my own kitchen, and I hope it
                  makes life a little easier in yours.”
                </p>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
