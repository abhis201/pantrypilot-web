import Image from "next/image";

import jar from "../../public/spot/jar.png";
import milk from "../../public/spot/milk.png";
import greens from "../../public/spot/greens.png";
import tomato from "../../public/spot/tomato.png";
import bread from "../../public/spot/bread.png";
import sprig from "../../public/spot/sprig.png";

const ART = { jar, milk, greens, tomato, bread, sprig } as const;

export type SpotName = keyof typeof ART;

interface SpotProps {
  name: SpotName;
  /** Rendered width in px; height follows the artwork's own ratio. */
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A flat spot illustration from the pantry set.
 *
 * These are decoration, so they are always `aria-hidden` with empty alt text —
 * a screen reader gains nothing from "tomato" beside a download button. They
 * are also `pointer-events-none` and absolutely positioned by their callers, so
 * they can never sit between a visitor and a control.
 *
 * The set was generated as one sticker sheet on a magenta key, then cut, so the
 * six share a single drawing style: flat fills, no gradient, no shadow, one
 * outline weight — the same rules the rest of this system follows.
 */
export default function Spot({ name, size = 72, className = "", style }: SpotProps) {
  return (
    <Image
      src={ART[name]}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={`pointer-events-none select-none ${className}`}
      style={{ width: size, height: "auto", ...style }}
    />
  );
}
