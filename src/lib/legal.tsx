import { Fragment, type ReactNode } from "react";
import {
  ANDROID_PACKAGE_NAME,
  GOVERNING_LAW_JURISDICTION,
  GRIEVANCE_EMAIL,
  GRIEVANCE_OFFICER_DESIGNATION,
  GRIEVANCE_OFFICER_NAME,
  IOS_BUNDLE_ID,
  LEGAL_EFFECTIVE_DATE,
  LEGAL_ENTITY_NAME,
  LEGAL_LAST_UPDATED,
  REGISTERED_POSTAL_ADDRESS,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

/**
 * The legal pages are data, not JSX.
 *
 * Each document is a JSON file under src/content/legal/<lang>/, made of
 * sections that hold a few kinds of block. A translation is therefore a
 * copy of the JSON with the strings changed: no component is touched, and
 * the table and section structure cannot drift between languages.
 *
 * Inside any string:
 *   **bold**            strong
 *   `code`              code
 *   [label](href)       link (http, mailto, or a site path)
 *   {{TOKEN}}           a value from src/lib/site.ts (see TOKENS)
 * so the company name, address and contact email live in one place.
 */

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "callout"; title: string; items: string[] }
  | { type: "contact" };

export interface LegalSection {
  id: string;
  title: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  title: string;
  intro: string;
  changelog: { date: string; summary: string }[];
  sections: LegalSection[];
}

/** Languages a document can be requested in. Add a code here once its JSON exists. */
export const LEGAL_LANGUAGES: {
  code: string;
  label: string;
  available: boolean;
}[] = [
  { code: "en", label: "English", available: true },
  { code: "hi", label: "हिन्दी", available: false },
];

const TOKENS: Record<string, string> = {
  SITE_NAME,
  SITE_URL,
  LEGAL_ENTITY_NAME,
  GRIEVANCE_OFFICER_NAME,
  GRIEVANCE_OFFICER_DESIGNATION,
  GRIEVANCE_EMAIL,
  REGISTERED_POSTAL_ADDRESS,
  GOVERNING_LAW_JURISDICTION,
  IOS_BUNDLE_ID,
  ANDROID_PACKAGE_NAME,
};

export function formatLegalDate(iso: string, lang = "en"): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(
    lang === "hi" ? "hi-IN" : "en-GB",
    { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }
  );
}

const fill = (text: string) =>
  text.replace(/\{\{(\w+)\}\}/g, (whole, key: string) => TOKENS[key] ?? whole);

/** **bold**, `code` and [label](href), nothing else. */
function inline(raw: string): ReactNode {
  const text = fill(raw);
  const pattern = /\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)/g;
  const out: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text))) {
    if (match.index > last) out.push(text.slice(last, match.index));
    if (match[1] !== undefined) {
      out.push(<strong key={key++}>{match[1]}</strong>);
    } else if (match[2] !== undefined) {
      out.push(<code key={key++}>{match[2]}</code>);
    } else {
      const href = match[4];
      const external = /^https?:/.test(href);
      out.push(
        <a
          key={key++}
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {match[3]}
        </a>
      );
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** The statutory contact block: one definition, printed wherever a doc asks. */
function ContactBlock() {
  return (
    <div className="legal-contact">
      <dl>
        <div>
          <dt>Company</dt>
          <dd>{LEGAL_ENTITY_NAME}</dd>
        </div>
        <div>
          <dt>Name</dt>
          <dd>{GRIEVANCE_OFFICER_NAME}</dd>
        </div>
        <div>
          <dt>Designation</dt>
          <dd>{GRIEVANCE_OFFICER_DESIGNATION}</dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${GRIEVANCE_EMAIL}`}>{GRIEVANCE_EMAIL}</a>
          </dd>
        </div>
        <div>
          <dt>Postal address</dt>
          <dd>{REGISTERED_POSTAL_ADDRESS}</dd>
        </div>
      </dl>
      <table>
        <thead>
          <tr>
            <th>What we commit to</th>
            <th>Within</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Acknowledge your complaint or request</td>
            <td>24 to 48 hours</td>
          </tr>
          <tr>
            <td>Resolve a grievance (India IT Rules, 2021)</td>
            <td>15 days</td>
          </tr>
          <tr>
            <td>Resolve a consumer complaint (India E-Commerce Rules, 2020)</td>
            <td>30 days</td>
          </tr>
          <tr>
            <td>Respond to a privacy rights request (GDPR, UK GDPR)</td>
            <td>1 month</td>
          </tr>
          <tr>
            <td>Respond to a privacy rights request (US state laws)</td>
            <td>45 days</td>
          </tr>
          <tr>
            <td>Longest period for any data-protection grievance (India DPDP Act)</td>
            <td>90 days</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "p":
      return <p>{inline(block.text)}</p>;
    case "h3":
      return <h3>{inline(block.text)}</h3>;
    case "ul":
    case "ol": {
      const Tag = block.type;
      return (
        <Tag>
          {block.items.map((item, i) => (
            <li key={i}>{inline(item)}</li>
          ))}
        </Tag>
      );
    }
    case "table":
      return (
        <table>
          <thead>
            <tr>
              {block.head.map((cell, i) => (
                <th key={i}>{inline(cell)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c}>{inline(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    case "callout":
      return (
        <aside className="legal-summary">
          <p className="legal-summary__title">{inline(block.title)}</p>
          <ul>
            {block.items.map((item, i) => (
              <li key={i}>{inline(item)}</li>
            ))}
          </ul>
        </aside>
      );
    case "contact":
      return <ContactBlock />;
  }
}

/** Title, dates, language switch and change history: the top of every legal page. */
export function LegalHeader({
  doc,
  lang,
  path,
}: {
  doc: LegalDoc;
  lang: string;
  path: string;
}) {
  return (
    <header className="mb-10">
      <h1 className="display display--section mb-5">{doc.title}</h1>
      <p className="standfirst mb-6" style={{ maxWidth: "64ch" }}>
        {inline(doc.intro)}
      </p>

      <div className="legal-meta">
        <span className="legal-badge">
          Effective date{" "}
          <strong>{formatLegalDate(LEGAL_EFFECTIVE_DATE, lang)}</strong>
        </span>
        <span className="legal-badge">
          Last updated{" "}
          <strong>{formatLegalDate(LEGAL_LAST_UPDATED, lang)}</strong>
        </span>

        <nav className="legal-lang" aria-label="Language">
          {LEGAL_LANGUAGES.map((l) =>
            l.available ? (
              <a
                key={l.code}
                href={l.code === "en" ? path : `${path}?lang=${l.code}`}
                hrefLang={l.code}
                aria-current={l.code === lang ? "true" : undefined}
              >
                {l.label}
              </a>
            ) : (
              <span key={l.code} title="Translation in progress">
                {l.label}
                <small> soon</small>
              </span>
            )
          )}
        </nav>
      </div>

      <details className="legal-changelog">
        <summary>Version history</summary>
        <ul>
          {doc.changelog.map((entry) => (
            <li key={entry.date}>
              <strong>{formatLegalDate(entry.date, lang)}</strong>
              <span>{inline(entry.summary)}</span>
            </li>
          ))}
        </ul>
      </details>
    </header>
  );
}

export function LegalBody({ doc }: { doc: LegalDoc }) {
  return (
    <div className="legal-content">
      {doc.sections.map((section, i) => (
        <section key={section.id}>
          <h2 id={section.id}>
            {i + 1}. {inline(section.title)}
          </h2>
          {section.blocks.map((block, b) => (
            <Fragment key={b}>
              <Block block={block} />
            </Fragment>
          ))}
        </section>
      ))}
    </div>
  );
}
