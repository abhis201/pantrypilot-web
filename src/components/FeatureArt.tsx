/**
 * The twelve vector illustrations that head the Features tiles.
 *
 * These are illustrations, not icons: each one is a small scene on a 96x48
 * canvas — the object the copy is about, plus the context that makes it read
 * as a picture of the feature rather than a glyph for it (the fridge has a
 * shelf beside it, the receipt is under a scanner's corner marks, the camera
 * is pointed at an actual plate). Twice as wide as it is tall on purpose:
 * that ratio is what leaves room for a scene at a height a viewport-locked
 * tile can afford.
 *
 * Drawn here rather than added to Spot.tsx: that set is six raster PNGs of
 * pantry objects on fixed colours, and these have to (a) cover things no
 * photograph of a jar can say — OCR, analytics, "no trackers" — and (b) wear
 * their own tile's colour, which only vector art can do. Everything else
 * follows the Spot set's rules: flat fills, no outline weight beyond the
 * drawing itself, no shadow, no gradient inside the artwork.
 *
 * Three tones, and only three, so twelve drawings stay one family:
 *   BASE  the tile's accent — the subject, and anything that must read first
 *   SOFT  its light tint — bodies, backdrops, the shapes BASE sits on
 *   PAPER white — cut-outs and highlights, which is what gives the flat
 *         shapes their depth without a shadow or a second light source
 * BASE and SOFT arrive from the tile as custom properties (globals.css sets
 * them per tone), so one drawing serves any colour in the palette.
 *
 * All decorative: each is aria-hidden and labelled by the tile's own heading.
 */

const BASE = "var(--art-base, currentColor)";
const SOFT = "var(--art-soft, currentColor)";
const PAPER = "#ffffff";

function Art({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 96 48" className="feature-tile__art" aria-hidden="true">
      {children}
    </svg>
  );
}

/** Full pantry tracking — the fridge, and the shelf it keeps track of. */
export function ArtFridge() {
  return (
    <Art>
      <rect x="6" y="4" width="30" height="40" rx="6" fill={SOFT} />
      <rect x="6" y="19" width="30" height="2.6" fill={BASE} />
      <rect x="11.5" y="9" width="2.6" height="6" rx="1.3" fill={BASE} />
      <rect x="11.5" y="26" width="2.6" height="7" rx="1.3" fill={BASE} />
      {/* jar */}
      <rect x="45" y="21" width="15" height="23" rx="3.5" fill={SOFT} />
      <rect x="46.5" y="16.5" width="12" height="5" rx="2.2" fill={BASE} />
      <rect x="48" y="27" width="9" height="6" rx="1.8" fill={PAPER} />
      {/* bottle */}
      <rect x="66" y="16" width="11" height="28" rx="3.5" fill={BASE} />
      <rect x="69.5" y="9" width="4" height="8" rx="1.6" fill={BASE} />
      <rect x="68.5" y="5.5" width="6" height="4" rx="1.8" fill={SOFT} />
      {/* apple */}
      <circle cx="87" cy="36" r="8" fill={SOFT} />
      <rect x="86.1" y="25" width="1.9" height="5" rx="0.95" fill={BASE} />
    </Art>
  );
}

/** Freshness alerts — the clock running down on something in the fridge. */
export function ArtClock() {
  return (
    <Art>
      <circle cx="22" cy="24" r="18" fill={SOFT} />
      <circle cx="22" cy="24" r="12.5" fill={PAPER} />
      <path
        d="M22 15.5V24l6 3.6"
        fill="none"
        stroke={BASE}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* carton */}
      <path d="M52 19h18v25H52z" fill={SOFT} />
      <path d="M52 19l9-8 9 8z" fill={BASE} />
      <rect x="56" y="26" width="10" height="9" rx="2" fill={PAPER} />
      {/* the alert itself */}
      <circle cx="85" cy="15" r="9" fill={BASE} />
      <rect x="84" y="9.5" width="2" height="6.5" rx="1" fill={PAPER} />
      <circle cx="85" cy="19.5" r="1.4" fill={PAPER} />
    </Art>
  );
}

/** Receipt OCR — the till slip, read under the scanner's corner marks. */
export function ArtReceipt() {
  return (
    <Art>
      <path
        d="M22 6h32v36l-5.3-3.2-5.4 3.2-5.3-3.2-5.4 3.2-5.3-3.2-5.3 3.2z"
        fill={SOFT}
      />
      <rect x="27" y="13" width="22" height="3.2" rx="1.6" fill={BASE} />
      <rect x="27" y="20" width="14" height="3.2" rx="1.6" fill={BASE} />
      <rect x="27" y="27" width="18" height="3.2" rx="1.6" fill={PAPER} />
      {/* corner marks: the scan itself */}
      <g fill="none" stroke={BASE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 13V8h5" />
        <path d="M62 13V8h-5" />
        <path d="M14 36v5h5" />
        <path d="M62 36v5h-5" />
      </g>
      {/* parsed, and pleased about it */}
      <path d="M79 8l2.4 6.6L88 17l-6.6 2.4L79 26l-2.4-6.6L70 17l6.6-2.4z" fill={BASE} />
      <path d="M88 29l1.4 3.6 3.6 1.4-3.6 1.4L88 39l-1.4-3.6L83 34l3.6-1.4z" fill={SOFT} />
    </Art>
  );
}

/** Barcode scanning — the packet, and the phone reading its label. */
export function ArtBarcode() {
  return (
    <Art>
      <rect x="6" y="11" width="42" height="32" rx="5" fill={SOFT} />
      <rect x="12" y="18" width="30" height="18" rx="2.5" fill={PAPER} />
      <g fill={BASE}>
        <rect x="16" y="21" width="2.6" height="12" rx="1.3" />
        <rect x="21" y="21" width="1.6" height="12" rx="0.8" />
        <rect x="25" y="21" width="3" height="12" rx="1.5" />
        <rect x="31" y="21" width="1.6" height="12" rx="0.8" />
        <rect x="35" y="21" width="2.6" height="12" rx="1.3" />
      </g>
      {/* phone */}
      <rect x="62" y="4" width="28" height="40" rx="6" fill={BASE} />
      <rect x="66.5" y="12" width="19" height="19" rx="3" fill={PAPER} />
      <g fill={SOFT}>
        <rect x="70" y="16" width="2.4" height="11" rx="1.2" />
        <rect x="74.5" y="16" width="1.6" height="11" rx="0.8" />
        <rect x="78.5" y="16" width="2.8" height="11" rx="1.4" />
      </g>
      <rect x="71" y="36" width="10" height="2.6" rx="1.3" fill={SOFT} />
    </Art>
  );
}

/** Recipe matching — what the pantry already holds, ranked into a dish. */
export function ArtChefHat() {
  return (
    <Art>
      <path
        d="M12 26a9.5 9.5 0 1 1 3.2-18.4 10.5 10.5 0 0 1 13.6 0A9.5 9.5 0 1 1 32 26z"
        fill={SOFT}
      />
      <rect x="12" y="27" width="20" height="11" rx="3.5" fill={BASE} />
      <rect x="15.5" y="30.5" width="13" height="2.4" rx="1.2" fill={PAPER} />
      {/* the bowl it ends up in */}
      <circle cx="58" cy="24" r="5.5" fill={SOFT} />
      <circle cx="70" cy="21" r="6.5" fill={SOFT} />
      <circle cx="81" cy="24" r="5" fill={SOFT} />
      <path d="M50 28h42a21 21 0 0 1-42 0z" fill={BASE} />
      <rect x="47" y="26" width="48" height="3.4" rx="1.7" fill={SOFT} />
    </Art>
  );
}

/** Social recipe import — a link pasted in, and a recipe card back out. */
export function ArtPlay() {
  return (
    <Art>
      <rect x="6" y="4" width="28" height="40" rx="6" fill={SOFT} />
      <rect x="10" y="9" width="20" height="30" rx="3" fill={PAPER} />
      <path d="M17 17.5l9.5 6-9.5 6z" fill={BASE} />
      {/* the hand-off */}
      <path
        d="M41 24h12"
        fill="none"
        stroke={BASE}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path d="M52 18.5l6.5 5.5-6.5 5.5z" fill={BASE} />
      {/* recipe card */}
      <rect x="64" y="7" width="26" height="34" rx="5" fill={BASE} />
      <rect x="68.5" y="13" width="17" height="3" rx="1.5" fill={PAPER} />
      <rect x="68.5" y="20" width="12" height="3" rx="1.5" fill={SOFT} />
      <rect x="68.5" y="27" width="15" height="3" rx="1.5" fill={SOFT} />
      <rect x="68.5" y="34" width="9" height="3" rx="1.5" fill={SOFT} />
    </Art>
  );
}

/** Weekly meal planner — the week, with dinner already on it. */
export function ArtCalendar() {
  return (
    <Art>
      <rect x="5" y="10" width="44" height="34" rx="5.5" fill={SOFT} />
      <path d="M5 15.5A5.5 5.5 0 0 1 10.5 10h33a5.5 5.5 0 0 1 5.5 5.5V19H5z" fill={BASE} />
      <rect x="13" y="5" width="3.2" height="9" rx="1.6" fill={BASE} />
      <rect x="37.5" y="5" width="3.2" height="9" rx="1.6" fill={BASE} />
      <g fill={PAPER}>
        <rect x="11" y="24" width="9" height="6" rx="2" />
        <rect x="23" y="24" width="9" height="6" rx="2" />
        <rect x="35" y="24" width="9" height="6" rx="2" />
        <rect x="11" y="34" width="9" height="6" rx="2" />
      </g>
      <g fill={BASE}>
        <rect x="23" y="34" width="9" height="6" rx="2" />
        <rect x="35" y="34" width="9" height="6" rx="2" />
      </g>
      {/* the meal in the slot: a laid place setting. Cutlery beside the
          plate rather than crossed behind it — at this size anything behind
          a 26px disc is a sliver at each end and reads as a ring. */}
      <g fill={BASE}>
        <rect x="49.8" y="8" width="2" height="9.5" rx="1" />
        <rect x="53" y="8" width="2" height="9.5" rx="1" />
        <rect x="56.2" y="8" width="2" height="9.5" rx="1" />
        <path d="M49.8 16.5h8.4v2.5a4.2 4.2 0 0 1-8.4 0z" />
        <rect x="52.4" y="21.5" width="3.2" height="20" rx="1.6" />
        <path d="M88.5 8c2.8 0 4.2 4 4.2 9s-1.4 8-4.2 8z" />
        <rect x="87" y="23.5" width="3" height="18" rx="1.5" />
      </g>
      <circle cx="72" cy="26" r="13" fill={SOFT} />
      <circle cx="72" cy="26" r="7.5" fill={PAPER} />
    </Art>
  );
}

/** Log meals out — the restaurant plate, photographed into today's totals. */
export function ArtCamera() {
  return (
    <Art>
      <path d="M14 8h13l2.6 6H11.4z" fill={SOFT} />
      <rect x="4" y="13.5" width="40" height="28" rx="6.5" fill={SOFT} />
      <circle cx="24" cy="27.5" r="10" fill={BASE} />
      <circle cx="24" cy="27.5" r="4.5" fill={PAPER} />
      <rect x="35" y="18" width="5" height="3.4" rx="1.7" fill={PAPER} />
      {/* what it's pointed at */}
      <circle cx="72" cy="27" r="16" fill={SOFT} />
      <circle cx="72" cy="27" r="10" fill={PAPER} />
      {/* Deliberately off-centre. Anything symmetrical on a disc this size
          — two dots and a bar — resolves into a face and stops being food. */}
      <path d="M72 27v-9.5a9.5 9.5 0 0 1 8.2 4.8z" fill={BASE} />
      <circle cx="67" cy="30.5" r="2.6" fill={BASE} />
      <circle cx="72.5" cy="33" r="2" fill={BASE} />
      <path d="M90 9l1.6 4.4L96 15l-4.4 1.6L90 21l-1.6-4.4L84 15l4.4-1.6z" fill={BASE} />
    </Art>
  );
}

/** Smart substitutions — one thing on the shelf standing in for another. */
export function ArtLeaf() {
  return (
    <Art>
      <path d="M10 20h19v24H10z" fill={SOFT} />
      <path d="M10 20l9.5-8 9.5 8z" fill={BASE} />
      <rect x="14.5" y="27" width="10" height="9" rx="2" fill={PAPER} />
      {/* the swap */}
      <g fill="none" stroke={BASE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M40 19h14" />
        <path d="M56 32H42" />
      </g>
      <path d="M52 14.5l6 4.5-6 4.5z" fill={BASE} />
      <path d="M44 27.5L38 32l6 4.5z" fill={BASE} />
      {/* what it swaps to */}
      <circle cx="79" cy="30" r="13" fill={SOFT} />
      <path d="M79 17c0-6 5-11 11-11 0 6-5 11-11 11z" fill={BASE} />
      <path d="M79 30c0-5 3-9 7-11" fill="none" stroke={PAPER} strokeWidth="2.6" strokeLinecap="round" />
    </Art>
  );
}

/** Shopping list export — what's missing, on its way out to a store. */
export function ArtCart() {
  return (
    <Art>
      <rect x="4" y="5" width="31" height="38" rx="5" fill={SOFT} />
      <g fill="none" stroke={BASE} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 15l2.6 2.6 5-5.2" />
        <path d="M9.5 25l2.6 2.6 5-5.2" />
      </g>
      <g fill={BASE}>
        <rect x="21" y="14" width="10" height="3" rx="1.5" />
        <rect x="21" y="24" width="10" height="3" rx="1.5" />
      </g>
      <g fill={PAPER}>
        <rect x="9" y="34" width="8" height="3" rx="1.5" />
        <rect x="21" y="34" width="10" height="3" rx="1.5" />
      </g>
      {/* the cart it lands in */}
      <path
        d="M44 11h5.5l3 7"
        fill="none"
        stroke={BASE}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M52 18h40l-5 17H57z" fill={SOFT} />
      <rect x="57" y="22" width="30" height="3" rx="1.5" fill={PAPER} />
      <circle cx="61" cy="41" r="4" fill={BASE} />
      <circle cx="82" cy="41" r="4" fill={BASE} />
    </Art>
  );
}

/** Nutrition & analytics — macros, and the money they saved. */
export function ArtChart() {
  return (
    <Art>
      <rect x="6" y="26" width="10" height="17" rx="3.5" fill={SOFT} />
      <rect x="20" y="15" width="10" height="28" rx="3.5" fill={BASE} />
      <rect x="34" y="21" width="10" height="22" rx="3.5" fill={SOFT} />
      <path
        d="M51 26l7-7.5 5.5 4.5 9-12"
        fill="none"
        stroke={BASE}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="72.5" cy="11.5" r="3.4" fill={BASE} />
      {/* dollars saved */}
      <circle cx="80" cy="34" r="10" fill={SOFT} />
      <circle cx="80" cy="34" r="6" fill={PAPER} />
      <rect x="79" y="28.5" width="2" height="11" rx="1" fill={BASE} />
    </Art>
  );
}

/** No ads, no trackers — the promise, and the eye it shuts. */
export function ArtShield() {
  return (
    <Art>
      <path
        d="M25 4l17 6.8v13.4c0 9.8-7.2 18-17 21.6-9.8-3.6-17-11.8-17-21.6V10.8z"
        fill={SOFT}
      />
      <path
        d="M17 24.5l5.2 5.2L33 18.5"
        fill="none"
        stroke={BASE}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* the tracker that isn't there */}
      <path d="M55 26c6.5-9.5 19.5-9.5 26 0-6.5 9.5-19.5 9.5-26 0z" fill={SOFT} />
      <circle cx="68" cy="26" r="5.5" fill={BASE} />
      <circle cx="68" cy="26" r="2" fill={PAPER} />
      <path
        d="M56 38L80 14"
        fill="none"
        stroke={BASE}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </Art>
  );
}
