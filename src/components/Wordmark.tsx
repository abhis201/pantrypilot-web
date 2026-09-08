/**
 * The "KhanPaan" lockup text, coloured to match the brand logo exactly:
 * "Khan" in near-black, "Paan" in the wordmark's own green
 * (`--wordmark-khan` / `--wordmark-paan` — a brand-fixed exception, see the
 * token comment in globals.css). Kept as real text rather than baked into
 * the logo image, so the name stays selectable, translatable, and readable
 * by a screen reader — the same reasoning the hero illustration used to
 * carry no lettering at all.
 */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-bold tracking-[-0.03em] ${className}`}>
      <span style={{ color: "var(--wordmark-khan)" }}>Khan</span>
      <span style={{ color: "var(--wordmark-paan)" }}>Paan</span>
    </span>
  );
}
