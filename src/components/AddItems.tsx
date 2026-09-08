import Reveal from "./Reveal";

interface AddMethod {
  id: string;
  /** Split so the second half can take the accent colour at the same weight. */
  title: string;
  accent: string;
  description: string;
  /** Screen-reader description of the recording in this slot. */
  screenLabel: string;
}

/**
 * Three ways an item gets into the pantry, side by side in one row rather
 * than three stacked full screens — the "how it actually works" answer to
 * the Pantry feature block above, kept small enough that all three fit one
 * viewport together. Copy is written against real screen recordings of the
 * app (converted to muted, looping video — see public/videos/add-items/),
 * not guessed at: Single Item (full manual entry), Quick Add (name-and-
 * optional-quantity, repeated in one pass — the app's own in-UI copy, "Name
 * is all we need," is quoted below), and Receipt OCR.
 */
const ADD_METHODS: AddMethod[] = [
  {
    id: "add",
    title: "Add it in",
    accent: "seconds.",
    description:
      "Name an item once and quantity, storage location, and expiry date follow it everywhere else in the app.",
    screenLabel:
      "The Single Item add screen: name, brand, price, quantity, expiry date, storage location and category being filled in",
  },
  {
    id: "bulk-add",
    title: "Quick add,",
    accent: "one line each.",
    description:
      "A name is all it needs. Type it, tap the plus, and the next line's already waiting — a whole shop in one pass.",
    screenLabel:
      "Quick Add: item names typed in one after another, each queuing into the batch before Save Items",
  },
  {
    id: "scan-receipt",
    title: "One receipt,",
    accent: "a full pantry.",
    description:
      "Photograph the receipt from checkout. Receipt OCR reads the whole shop at once, abbreviations and all.",
    screenLabel:
      "Receipt OCR: the Add New Item screen's Receipt tab, offering to scan a receipt and read its items off in one go",
  },
];

function AddColumn({ method, index }: { method: AddMethod; index: number }) {
  return (
    <div className="add-column">
      <Reveal className="add-column__media" delay={index * 80} y={24}>
        <div className="add-column__video">
          <video
            className="add-column__video-el"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-label={method.screenLabel}
          >
            <source src={`/videos/add-items/${method.id}.webm`} type="video/webm" />
            <source src={`/videos/add-items/${method.id}.mp4`} type="video/mp4" />
          </video>
        </div>
      </Reveal>

      <Reveal className="add-column__copy" delay={index * 80 + 100} y={16}>
        <h3 className="display display--xs add-column__title">
          {method.title} <em>{method.accent}</em>
        </h3>
        <p className="add-column__desc">{method.description}</p>
      </Reveal>
    </div>
  );
}

export default function AddItems() {
  return (
    <section id="add-items" className="add-items">
      <div className="add-items__head">
        <Reveal>
          <h2 className="display display--sub">
            Multiple ways to <em>add items</em> to your pantry.
          </h2>
        </Reveal>
      </div>

      <div className="add-items__row">
        {ADD_METHODS.map((method, i) => (
          <AddColumn key={method.id} method={method} index={i} />
        ))}
      </div>
    </section>
  );
}
