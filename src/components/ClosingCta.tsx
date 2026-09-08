import {
  ANDROID_AVAILABLE,
  ANDROID_DOWNLOAD_LINK,
  IOS_DOWNLOAD_LINK,
} from "@/lib/site";
import NewsletterForm from "./NewsletterForm";
import Reveal from "./Reveal";
import Spot from "./Spot";
import { AppleMark, PlayMark } from "./Icons";

/**
 * The page's close: the download one more time, and the waitlist for anyone who
 * can't take it. Both paths matter — while Android is on a testing track the
 * waitlist is the only route for half the visitors, so it gets equal billing
 * here rather than being buried under the stores.
 *
 * This is the last thing on the page, so it's the loudest field on it.
 */
export default function ClosingCta() {
  return (
    <section id="waitlist" className="section viewport-lock">
      <div className="shell max-w-[1100px]">
        <div className="panel relative overflow-hidden px-6 py-10 text-center sm:px-12 md:py-12">
          {/* Decoration, and kept honest about it: pointer-events-none,
              aria-hidden, positioned in the panel's margins well clear of the
              reading column, and only from lg up where that margin exists. */}
          <Spot
            name="jar"
            size={96}
            className="absolute hidden lg:block"
            style={{ left: "3%", top: "16%", rotate: "-8deg" }}
          />
          <Spot
            name="greens"
            size={104}
            className="absolute hidden lg:block"
            style={{ right: "3%", top: "12%", rotate: "7deg" }}
          />
          <Spot
            name="bread"
            size={112}
            className="absolute hidden lg:block"
            style={{ right: "6%", bottom: "9%", rotate: "-5deg" }}
          />
          <Spot
            name="tomato"
            size={78}
            className="absolute hidden lg:block"
            style={{ left: "6%", bottom: "12%", rotate: "6deg" }}
          />
          <Reveal>
            <h2 className="display display--sub mx-auto max-w-[24ch]">
              Stop wondering what&apos;s in the fridge.
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <p className="standfirst mx-auto mt-4 text-center">
              Free to download, free to keep using. Pro is there if you want the
              AI doing the thinking.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-7 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <a
                href={IOS_DOWNLOAD_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="store-button w-full sm:w-auto"
              >
                <AppleMark className="h-[22px] w-[22px]" />
                App Store
              </a>

              {ANDROID_AVAILABLE ? (
                <a
                  href={ANDROID_DOWNLOAD_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="store-button w-full sm:w-auto"
                >
                  <PlayMark className="h-[20px] w-[20px]" />
                  Google Play
                </a>
              ) : (
                <span className="store-button store-button--pending w-full sm:w-auto">
                  <PlayMark className="h-[20px] w-[20px]" />
                  Android soon
                </span>
              )}
            </div>
          </Reveal>

          {/* ---- Waitlist ------------------------------------------------ */}
          <Reveal delay={240}>
            <div
              className="mx-auto mt-8 max-w-lg pt-6"
              style={{ borderTop: "1px solid var(--line-strong)" }}
            >
              <h3 className="display display--xs">
                {ANDROID_AVAILABLE
                  ? "Or hear it first."
                  : "On Android? Get in line."}
              </h3>
              <p className="mx-auto mt-3 max-w-md text-[14px] leading-[1.55] text-ink-muted">
                {ANDROID_AVAILABLE
                  ? "One email when there's a release worth reading about. Nothing else."
                  : "We'll email you the moment the Play Store listing goes live. Nothing else."}
              </p>
              <div className="mt-5">
                <NewsletterForm />
              </div>
              <p className="mt-3 text-[12px] text-ink-muted">
                Unsubscribe any time. We don&apos;t share your address.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
