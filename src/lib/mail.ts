/**
 * Server-only mail configuration.
 *
 * These are intentionally NOT `NEXT_PUBLIC_` — they must never be inlined into
 * the client bundle.
 */

/**
 * Resend's shared sandbox domain. It only delivers to the Resend account
 * owner's own verified address and is heavily spam-filtered elsewhere, so it is
 * a last-resort fallback: verify a real sending domain (e.g. mail.khanpaan.app)
 * in Resend and set RESEND_FROM_EMAIL.
 */
const SANDBOX_FROM = "onboarding@resend.dev";

const CONFIGURED_FROM = (process.env.RESEND_FROM_EMAIL || SANDBOX_FROM).trim();

/** True while still on the sandbox domain — used to warn once in server logs. */
export const USING_SANDBOX_SENDER = CONFIGURED_FROM.includes(SANDBOX_FROM);

/** Internal inbox that newsletter signups and contact-form messages land in. */
export const ADMIN_INBOX =
  process.env.ADMIN_NOTIFICATION_EMAIL || "admin.pantrypilot@gmail.com";

/**
 * Build a `From:` header with a per-message display name.
 *
 * RESEND_FROM_EMAIL may be either a bare address (`noreply@example.com`) or a
 * full mailbox (`KhanPaan <noreply@example.com>`). Naively wrapping the
 * latter in another display name yields an invalid header, so pull the address
 * out first and always emit exactly one `Name <addr>` pair.
 */
export function fromAddress(label: string): string {
  const angled = CONFIGURED_FROM.match(/<([^>]+)>/);
  const email = (angled ? angled[1] : CONFIGURED_FROM).trim();
  return `${label} <${email}>`;
}

if (USING_SANDBOX_SENDER && process.env.NODE_ENV === "production") {
  console.warn(
    "[mail] Sending from Resend's sandbox domain. Verify a custom domain and set RESEND_FROM_EMAIL — delivery is unreliable until then."
  );
}
