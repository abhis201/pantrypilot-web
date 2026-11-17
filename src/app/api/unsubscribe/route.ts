import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { verifyUnsubscribeToken } from "@/lib/email-templates";
import { EMAIL_RE, clean, escapeHtml } from "@/lib/rate-limit";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * One-click newsletter unsubscribe.
 *
 * POST is what mail clients call when someone presses their built-in
 * "Unsubscribe" button (RFC 8058, via the List-Unsubscribe-Post header).
 * GET is the visible link in the email footer. Both take the same signed
 * `e` (email) and `t` (HMAC) pair, so nobody can unsubscribe an address
 * they were not sent a link for, and neither asks for a login, a reason or
 * a second click.
 */
async function unsubscribe(request: NextRequest): Promise<boolean> {
  const params = request.nextUrl.searchParams;
  const email = clean(params.get("e"), 254).toLowerCase();
  const token = clean(params.get("t"), 200);

  if (!EMAIL_RE.test(email) || !verifyUnsubscribeToken(email, token)) {
    return false;
  }

  const { error } = await resend.contacts.update({ email, unsubscribed: true });
  if (error) {
    console.error("[unsubscribe] Resend contacts.update failed:", error);
    return false;
  }
  return true;
}

export async function POST(request: NextRequest) {
  const ok = await unsubscribe(request).catch(() => false);
  return NextResponse.json({ ok }, { status: ok ? 200 : 400 });
}

export async function GET(request: NextRequest) {
  const ok = await unsubscribe(request).catch(() => false);

  const title = ok ? "You're unsubscribed" : "That link didn't work";
  const message = ok
    ? `You will not receive any more ${SITE_NAME} newsletters. Account and support emails are not affected.`
    : `This unsubscribe link is invalid or has expired. Reply to any ${SITE_NAME} email with "unsubscribe" and we will remove you by hand.`;

  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>${escapeHtml(title)} · ${SITE_NAME}</title></head>
<body style="margin:0;min-height:100vh;display:grid;place-items:center;background:#f6faef;color:#184514;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<main style="max-width:440px;padding:32px;text-align:center">
<h1 style="font-size:26px;margin:0 0 12px">${escapeHtml(title)}</h1>
<p style="line-height:1.6;color:#4b7344;margin:0 0 24px">${escapeHtml(message)}</p>
<a href="${SITE_URL}" style="color:#0c7355;font-weight:700">Back to ${SITE_NAME}</a>
</main></body></html>`;

  return new NextResponse(html, {
    status: ok ? 200 : 400,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
