import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { fromAddress, ADMIN_INBOX } from "@/lib/mail";
import {
  EMAIL_RE,
  clean,
  clientIp,
  rateLimit,
  sameOrigin,
} from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

/** Every failure leaves through here: one shape, no internals. */
function fail(status: number, error: string, extra?: HeadersInit) {
  return NextResponse.json({ ok: false, error }, { status, headers: extra });
}

export async function POST(request: NextRequest) {
  try {
    if (!sameOrigin(request)) return fail(403, "Request not allowed.");

    const wait = rateLimit("contact", clientIp(request));
    if (wait > 0) {
      return fail(429, "Too many requests. Please try again later.", {
        "Retry-After": String(wait),
      });
    }

    const body = (await request.json().catch(() => null)) as Record<
      string,
      unknown
    > | null;
    if (!body || typeof body !== "object") return fail(400, "Invalid request.");

    // Lengths are capped and control characters stripped, so a crafted
    // subject can't smuggle extra mail headers or a megabyte of text.
    const name = clean(body.name, 120);
    const email = clean(body.email, 254).toLowerCase();
    const subject = clean(body.subject, 160).replace(/[\r\n]+/g, " ");
    const message = clean(body.message, 5000);

    if (!name || !email || !subject || !message) {
      return fail(400, "All fields are required.");
    }
    if (!EMAIL_RE.test(email)) return fail(400, "Invalid email address.");

    const { error } = await resend.emails.send({
      from: fromAddress("KhanPaan Contact"),
      to: ADMIN_INBOX,
      replyTo: email,
      subject: `[KhanPaan Contact] ${subject}`,
      text: [
        `From: ${name} (${email})`,
        `Subject: ${subject}`,
        "",
        message,
        "",
        "---",
        "Sent via KhanPaan website contact form",
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return fail(502, "Failed to send. Please try again later.");
    }

    return NextResponse.json({
      ok: true,
      success: true,
      message: "Your message has been received. We'll get back to you soon!",
    });
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return fail(500, "Something went wrong. Please try again.");
  }
}
