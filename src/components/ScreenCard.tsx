"use client";

import Image, { type StaticImageData } from "next/image";

interface ScreenCardProps {
  images: StaticImageData[];
  /** Which screenshot is showing. Crossfade is driven purely by CSS opacity. */
  activeIndex?: number;
  /** Screen-reader description of the screen currently on show. */
  label: string;
  /** The first card above the fold shouldn't lazy-load. */
  priority?: boolean;
  /** Rendered width cap. */
  width?: number;
  /** Corner radius in px. Small cards need a smaller one or it clips content. */
  radius?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A real app screenshot in a plain rounded card.
 *
 * There is no drawn phone bezel here on purpose. The screenshots already carry
 * their own status bar and app chrome, so a bezel and camera cutout sat on top
 * of what they were meant to show. It is also the honest choice: KhanPaan
 * ships on iOS and Android, and one vendor's hardware silhouette around every
 * screenshot quietly tells half the audience the app isn't for them.
 *
 * The card takes each screenshot's own aspect ratio, so `object-fit: cover`
 * never re-crops it. The assets themselves were trimmed at a natural gutter
 * between UI cards, which is what keeps a bottom edge from slicing through a
 * photograph or a chart row — the screens end where the app's own layout ends.
 */
export default function ScreenCard({
  images,
  activeIndex = 0,
  label,
  priority = false,
  width = 300,
  radius = 14,
  className = "",
  style,
}: ScreenCardProps) {
  const shown = images[activeIndex] ?? images[0];

  return (
    <div
      className={`screen-card ${className}`}
      role="img"
      aria-label={label}
      style={
        {
          "--screen-w": `${width}px`,
          "--screen-r": `${radius}px`,
          "--screen-ar": `${shown.width} / ${shown.height}`,
          ...style,
        } as React.CSSProperties
      }
    >
      {images.map((img, i) => (
        <div
          key={img.src}
          className={`screen-card__layer ${i === activeIndex ? "is-active" : ""}`}
          aria-hidden="true"
        >
          <Image
            src={img}
            alt=""
            fill
            className="screen-card__img"
            sizes={`${width}px`}
            priority={priority && i === 0}
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}
