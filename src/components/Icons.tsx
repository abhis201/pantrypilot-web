/**
 * The site's icon set, authored in one place so stroke weight, cap size, and
 * corner treatment stay consistent. Everything line-drawn shares a 1.75 stroke
 * on a 24px grid with round caps; the two store marks are solid glyphs because
 * that is how Apple and Google publish them.
 *
 * Nothing here renders an emoji or a unicode glyph in place of an icon.
 */

type IconProps = {
  className?: string;
  /** Every icon here is decorative beside a label. Pass a title only when one stands alone. */
  title?: string;
};

function stroke(className = "") {
  return {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
}

export function Check({ className = "w-[18px] h-[18px]", title }: IconProps) {
  return (
    <svg {...stroke(className)} aria-hidden={title ? undefined : true} role={title ? "img" : undefined}>
      {title && <title>{title}</title>}
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function ArrowRight({ className = "w-[18px] h-[18px]", title }: IconProps) {
  return (
    <svg {...stroke(className)} aria-hidden={title ? undefined : true} role={title ? "img" : undefined}>
      {title && <title>{title}</title>}
      <path d="M4 12h15m0 0-6-6m6 6-6 6" />
    </svg>
  );
}

export function ChevronDown({ className = "w-5 h-5", title }: IconProps) {
  return (
    <svg {...stroke(className)} aria-hidden={title ? undefined : true} role={title ? "img" : undefined}>
      {title && <title>{title}</title>}
      <path d="m6 9.5 6 6 6-6" />
    </svg>
  );
}

export function Menu({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg {...stroke(className)} aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function Close({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg {...stroke(className)} aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function Clock({ className = "w-[22px] h-[22px]" }: IconProps) {
  return (
    <svg {...stroke(className)} aria-hidden="true">
      <circle cx="12" cy="12" r="8.25" />
      <path d="M12 7.75V12l3 1.75" />
    </svg>
  );
}

export function Sparkles({ className = "w-[22px] h-[22px]" }: IconProps) {
  return (
    <svg {...stroke(className)} aria-hidden="true">
      <path d="M12 3.5l1.7 4.3 4.3 1.7-4.3 1.7L12 15.5l-1.7-4.3L6 9.5l4.3-1.7z" />
      <path d="M18 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
    </svg>
  );
}

/** Storage — a fridge, because that is where the audience's problem lives. */
export function Fridge({ className = "w-[22px] h-[22px]" }: IconProps) {
  return (
    <svg {...stroke(className)} aria-hidden="true">
      <rect x="5.5" y="2.75" width="13" height="18.5" rx="2.75" />
      <path d="M5.5 9.75h13M9 5.75v1.75M9 12.75v2.5" />
    </svg>
  );
}

export function ChefHat({ className = "w-[22px] h-[22px]" }: IconProps) {
  return (
    <svg {...stroke(className)} aria-hidden="true">
      <path d="M6.5 12.5a3.75 3.75 0 1 1 1.2-7.3 4.25 4.25 0 0 1 8.6 0 3.75 3.75 0 1 1 1.2 7.3z" />
      <path d="M6.5 12.5v6.25a1.5 1.5 0 0 0 1.5 1.5h8a1.5 1.5 0 0 0 1.5-1.5V12.5" />
      <path d="M9.75 16h4.5" />
    </svg>
  );
}

export function Leaf({ className = "w-[22px] h-[22px]" }: IconProps) {
  return (
    <svg {...stroke(className)} aria-hidden="true">
      <path d="M20 4c0 8.5-4.4 12.75-9.5 12.75A5.5 5.5 0 0 1 5 11.25C5 6.5 10.5 4 20 4z" />
      <path d="M4.5 20c1.5-4.5 4.75-8 9.5-10" />
    </svg>
  );
}

export function Barcode({ className = "w-[22px] h-[22px]" }: IconProps) {
  return (
    <svg {...stroke(className)} aria-hidden="true">
      <path d="M4 7.5V6a2 2 0 0 1 2-2h1.5M20 7.5V6a2 2 0 0 0-2-2h-1.5M4 16.5V18a2 2 0 0 0 2 2h1.5M20 16.5V18a2 2 0 0 1-2 2h-1.5" />
      <path d="M8 8.75v6.5M12 8.75v6.5M16 8.75v6.5" />
    </svg>
  );
}

export function Receipt({ className = "w-[22px] h-[22px]" }: IconProps) {
  return (
    <svg {...stroke(className)} aria-hidden="true">
      <path d="M6 3.5h12a.5.5 0 0 1 .5.5v16.3a.4.4 0 0 1-.62.33l-1.9-1.27a.4.4 0 0 0-.44 0l-1.68 1.12a.4.4 0 0 1-.44 0l-1.68-1.12a.4.4 0 0 0-.44 0l-1.68 1.12a.4.4 0 0 1-.44 0l-1.68-1.12a.4.4 0 0 0-.44 0l-1.9 1.27a.4.4 0 0 1-.62-.33V4a.5.5 0 0 1 .5-.5Z" />
      <path d="M8.5 8h7M8.5 11.5h7M8.5 15h4.5" />
    </svg>
  );
}

export function Calendar({ className = "w-[22px] h-[22px]" }: IconProps) {
  return (
    <svg {...stroke(className)} aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 9.75h17M8 3v3.5M16 3v3.5" />
      <path d="M7.75 13.25h2M11.75 13.25h2M15.75 13.25h2M7.75 16.75h2M11.75 16.75h2" />
    </svg>
  );
}

export function Camera({ className = "w-[22px] h-[22px]" }: IconProps) {
  return (
    <svg {...stroke(className)} aria-hidden="true">
      <path d="M4 8.5a1.5 1.5 0 0 1 1.5-1.5h2l1.1-1.7a1 1 0 0 1 .84-.46h5.12a1 1 0 0 1 .84.46L16.5 7h2A1.5 1.5 0 0 1 20 8.5v9A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5v-9Z" />
      <circle cx="12" cy="12.75" r="3.4" />
    </svg>
  );
}

export function Cart({ className = "w-[22px] h-[22px]" }: IconProps) {
  return (
    <svg {...stroke(className)} aria-hidden="true">
      <path d="M3.5 4.5h1.8l1.1 12.1a1.6 1.6 0 0 0 1.6 1.45h8.6a1.6 1.6 0 0 0 1.58-1.36l1.15-7.3a.9.9 0 0 0-.89-1.04H6.1" />
      <circle cx="9.5" cy="20" r="1.15" />
      <circle cx="16.5" cy="20" r="1.15" />
    </svg>
  );
}

export function ChartBar({ className = "w-[22px] h-[22px]" }: IconProps) {
  return (
    <svg {...stroke(className)} aria-hidden="true">
      <path d="M4 20V10.5M9.5 20V4M15 20v-7.5M20 20v-4" />
      <path d="M3 20.5h18" />
    </svg>
  );
}

export function Shield({ className = "w-[22px] h-[22px]" }: IconProps) {
  return (
    <svg {...stroke(className)} aria-hidden="true">
      <path d="M12 3.25 19 6v5.3c0 4.6-3 7.9-7 9.45-4-1.55-7-4.85-7-9.45V6l7-2.75Z" />
      <path d="M9 12.1l2.1 2.1L15.3 10" />
    </svg>
  );
}

/** Apple's mark. Solid by definition — it is a logo, not a line icon. */
export function AppleMark({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

/** Google Play's mark, in its four published facets. */
export function PlayMark({ className = "w-[22px] h-[22px]" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M3.18 23.79c-.38-.29-.59-.75-.59-1.3V1.51c0-.55.21-1.01.59-1.3l.12-.08L14.9 11.71v.04L3.3 23.87l-.12-.08z" opacity=".85" />
      <path fill="currentColor" d="M19.24 16.12l-4.34-4.37v-.04l4.34-4.37.1.06 5.15 2.92c1.47.83 1.47 2.2 0 3.04l-5.15 2.92-.1-.16z" opacity=".6" />
      <path fill="currentColor" d="M19.34 16.28L14.9 11.75 3.18 23.79c.49.51 1.29.54 2.21.02l13.95-7.53z" />
      <path fill="currentColor" d="M19.34 7.21L5.39.17C4.47-.35 3.67-.32 3.18.19L14.9 11.71l4.44-4.5z" opacity=".75" />
    </svg>
  );
}
