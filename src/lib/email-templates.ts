import { createHmac, timingSafeEqual } from "node:crypto";
import {
  GRIEVANCE_EMAIL,
  LEGAL_ENTITY_NAME,
  REGISTERED_POSTAL_ADDRESS,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
import { escapeHtml } from "@/lib/rate-limit";

/**
 * Two streams, kept apart on purpose.
 *
 * TRANSACTIONAL mail answers something the person just did (a deletion or
 * data request, a support message). It needs no marketing consent and
 * carries no unsubscribe link, because it is not a subscription.
 *
 * MARKETING mail (the newsletter) goes only to addresses that ticked the
 * opt-in box, and every message carries: a visible one-click unsubscribe
 * link, the RFC 8058 List-Unsubscribe headers that give Gmail and Apple Mail
 * their own unsubscribe button, and the sender's physical postal address
 * (US CAN-SPAM). Build marketing mail ONLY through `marketingEmail()` so
 * none of the three can be forgotten.
 */

const shell = (inner: string) => `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:560px;margin:0 auto;color:#184514;line-height:1.6;font-size:15px">
${inner}
</div>`;

/* --- Transactional -------------------------------------------------------- */

export interface PrivacyRequest {
  reference: string;
  requestType: string;
  authMethod: string;
  identifier: string;
  notes: string;
  receivedAt: string;
}

/** Acknowledgement to the person who filed a deletion / data request. */
export function privacyRequestAcknowledgement(r: PrivacyRequest) {
  return {
    subject: `We received your request (${r.reference})`,
    text: [
      `Hello,`,
      ``,
      `We received your ${SITE_NAME} privacy request.`,
      ``,
      `Reference: ${r.reference}`,
      `Request: ${r.requestType}`,
      `Received: ${r.receivedAt}`,
      ``,
      `What happens next: we will confirm that the request came from the account holder, usually by replying to this address, and then act on it. You will hear from us within 24 hours.`,
      ``,
      `If you did not make this request, reply to this email and we will cancel it. Nothing is deleted until the request is verified.`,
      ``,
      `${SITE_NAME} privacy team`,
      GRIEVANCE_EMAIL,
    ].join("\n"),
    html: shell(`
<h2 style="font-size:19px;margin:0 0 12px">We received your request</h2>
<p>We received your ${SITE_NAME} privacy request.</p>
<table style="border-collapse:collapse;margin:14px 0">
<tr><td style="padding:4px 14px 4px 0;color:#4b7344">Reference</td><td><strong>${escapeHtml(r.reference)}</strong></td></tr>
<tr><td style="padding:4px 14px 4px 0;color:#4b7344">Request</td><td>${escapeHtml(r.requestType)}</td></tr>
<tr><td style="padding:4px 14px 4px 0;color:#4b7344">Received</td><td>${escapeHtml(r.receivedAt)}</td></tr>
</table>
<p><strong>What happens next:</strong> we will confirm that the request came from the account holder, usually by replying to this address, and then act on it. You will hear from us within 24 hours.</p>
<p>If you did not make this request, reply to this email and we will cancel it. Nothing is deleted until the request is verified.</p>
<p style="color:#4b7344;font-size:13px;margin-top:24px">${SITE_NAME} privacy team &middot; ${escapeHtml(GRIEVANCE_EMAIL)}</p>`),
  };
}

/** The internal ticket that lands in the grievance inbox. */
export function privacyRequestTicket(r: PrivacyRequest) {
  return {
    subject: `[Privacy request ${r.reference}] ${r.requestType}`,
    text: [
      `Reference: ${r.reference}`,
      `Received: ${r.receivedAt}`,
      `Request type: ${r.requestType}`,
      `Sign-in method: ${r.authMethod}`,
      `Registered email / phone: ${r.identifier}`,
      ``,
      `Notes:`,
      r.notes || "(none)",
      ``,
      `---`,
      `SLA: acknowledge within 24 hours. Verify the requester controls the account before acting.`,
      `Submitted via ${SITE_URL}/delete-account`,
    ].join("\n"),
  };
}

/* --- Marketing ------------------------------------------------------------ */

function unsubscribeSecret(): string {
  // A dedicated secret is best; the Resend key is a stable server-only
  // fallback so links keep working without extra setup.
  return (
    process.env.UNSUBSCRIBE_SECRET ||
    process.env.RESEND_API_KEY ||
    "khanpaan-dev-only"
  );
}

export function unsubscribeToken(email: string): string {
  return createHmac("sha256", unsubscribeSecret())
    .update(email.trim().toLowerCase())
    .digest("base64url");
}

export function verifyUnsubscribeToken(email: string, token: string): boolean {
  const expected = Buffer.from(unsubscribeToken(email));
  const given = Buffer.from(token || "");
  return expected.length === given.length && timingSafeEqual(expected, given);
}

export function unsubscribeUrl(email: string): string {
  const params = new URLSearchParams({
    e: email.trim().toLowerCase(),
    t: unsubscribeToken(email),
  });
  return `${SITE_URL}/api/unsubscribe?${params.toString()}`;
}

/**
 * Wrap a newsletter body with the legally required footer and headers.
 * Spread the result into `resend.emails.send({ from, to, ...marketingEmail() })`.
 */
export function marketingEmail(opts: {
  to: string;
  subject: string;
  /** Trusted HTML written by us, not user input. */
  bodyHtml: string;
  bodyText: string;
}) {
  const url = unsubscribeUrl(opts.to);
  const address = `${LEGAL_ENTITY_NAME}, ${REGISTERED_POSTAL_ADDRESS}`;

  return {
    subject: opts.subject,
    headers: {
      "List-Unsubscribe": `<${url}>, <mailto:${GRIEVANCE_EMAIL}?subject=unsubscribe>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
    text: [
      opts.bodyText,
      ``,
      `---`,
      `You are receiving this because you subscribed to ${SITE_NAME} updates.`,
      `Unsubscribe in one click: ${url}`,
      address,
    ].join("\n"),
    html: shell(`
${opts.bodyHtml}
<hr style="border:0;border-top:1px solid #cfe6c3;margin:28px 0 14px">
<p style="color:#4b7344;font-size:12.5px;line-height:1.6">
You are receiving this because you subscribed to ${SITE_NAME} updates.<br>
<a href="${url}" style="color:#0c7355">Unsubscribe in one click</a><br>
${escapeHtml(address)}
</p>`),
  };
}
