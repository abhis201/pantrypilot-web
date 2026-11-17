"use client";

import { useEffect, useRef } from "react";

interface ScreenRecordingProps {
  /** Path without extension; `.webm` and `.mp4` are both expected to exist. */
  src: string;
  /** Screen-reader description of what the recording shows. */
  label: string;
  className?: string;
}

/**
 * A muted, looping screen recording that only plays while it is on screen.
 *
 * The home page carries nine of these. Autoplaying all of them from page load
 * meant nine decoders running at once on a phone, and a recording was already
 * halfway through its loop by the time its page was scrolled to. Here each
 * one starts loading when it is within a screen of the viewport, plays once
 * at least half of it is visible, and pauses again when it leaves.
 *
 * With reduced motion requested nothing autoplays: the recording shows its
 * native controls instead, so it can still be watched on demand.
 */
export default function ScreenRecording({
  src,
  label,
  className = "",
}: ScreenRecordingProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      video.controls = true;
      video.preload = "metadata";
      return;
    }

    // Start fetching a screen early, so the first frame is there on arrival.
    const nearby = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        video.preload = "auto";
        nearby.disconnect();
      },
      { rootMargin: "100% 0px" }
    );

    const visible = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.5) {
          // play() rejects if the browser refuses autoplay; the first frame
          // stays up in that case, which is the right fallback.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.5] }
    );

    nearby.observe(video);
    visible.observe(video);
    return () => {
      nearby.disconnect();
      visible.disconnect();
    };
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      loop
      muted
      playsInline
      preload="none"
      aria-label={label}
    >
      <source src={`${src}.webm`} type="video/webm" />
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
}
