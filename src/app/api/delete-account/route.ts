import { randomInt } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { ADMIN_INBOX, fromAddress } from "@/lib/mail";
import {
  EMAIL_RE,
  PHONE_RE,
  clean,
  clientIp,
  rateLimit,
  sameOrigin,
} from "@/lib/rate-limit";
import {
  privacyRequestAcknowledgement,
  privacyRequestTicket,
} from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

const REQUEST_TYPES: Record<string, string> = {
  delete: "Delete my account and data",
  export: "Export my data",
  withdraw: "Withdraw consent",
  other: "Other privacy request",
};

const AUTH_METHODS: Record<string, string> = {
  google: "Google Sign-In",
  apple: "Apple Sign-In",
  phone: "Phone number",
};

/** Every failure leaves through here: one shape, no internals. */
function fail(status: number, error: string, extra?: HeadersInit) {
  return NextResponse.json({ ok: false, error }, { status, headers: extra });
}

/** KP-20261117-4F7K2Q: dated so support can find it, random so it can't be guessed. */
function reference(): string {
  const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let tail = "";
  for (let i = 0; i < 6; i++) tail += alphabet[randomInt(alphabet.length)];
  const d = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `KP-${d}-${tail}`;
}

export async function POST(request: NextRequest) {
  try {
    if (!sameOrigin(request)) return fail(403, "Request not allowed.");

    const wait = rateLimit("delete-account", clientIp(request));
    if (wait > 0) {
      return fail(429, "Too many requests. Please try again later.", {
        "Retry-After": String(wait),
      });
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") return fail(400, "Invalid request.");

    // Honeypot: a field no person can see. Bots fill it; they get the same
    // success shape as everyone else so they learn nothing, and no mail goes.
    if (clean((body as Record<string, unknown>).website, 200)) {
      return NextResponse.json({ ok: true, reference: reference() });
    }

    const b = body as Record<string, unknown>;
    const requestType = REQUEST_TYPES[clean(b.requestType, 20)];
    const authMethod = AUTH_METHODS[clean(b.authMethod, 20)];
    const rawIdentifier = clean(b.identifier, 254);
    const notes = clean(b.notes, 2000);

    if (!requestType || !authMethod) return fail(400, "Invalid request.");

    const phone = rawIdentifier.replace(/[\s().-]/g, "");
    const isEmail = EMAIL_RE.test(rawIdentifier);
    const isPhone = PHONE_RE.test(phone);
    if (!isEmail && !isPhone) {
      return fail(
        400,
        "Enter the email address or phone number registered on your account."
      );
    }

    const ticket = {
      reference: reference(),
      requestType,
      authMethod,
      identifier: isEmail ? rawIdentifier.toLowerCase() : phone,
      notes,
      receivedAt: new Date().toUTCString(),
    };

    const admin = privacyRequestTicket(ticket);
    const { error } = await resend.emails.send({
      from: fromAddress("KhanPaan Privacy"),
      to: ADMIN_INBOX,
      ...(isEmail ? { replyTo: ticket.identifier } : {}),
      subject: admin.subject,
      text: admin.text,
    });

    if (error) {
      console.error("[delete-account] ticket send failed:", error);
      return fail(502, "We could not record your request. Please email us instead.");
    }

    // Best-effort acknowledgement to the requester. The ticket is already
    // filed, so a bounce here must not turn a recorded request into an error.
    if (isEmail) {
      try {
        const ack = privacyRequestAcknowledgement(ticket);
        await resend.emails.send({
          from: fromAddress("KhanPaan Privacy"),
          to: ticket.identifier,
          replyTo: ADMIN_INBOX,
          subject: ack.subject,
          text: ack.text,
          html: ack.html,
        });
      } catch (err) {
        console.error("[delete-account] acknowledgement failed:", err);
      }
    }

    return NextResponse.json({
      ok: true,
      reference: ticket.reference,
      acknowledged: isEmail,
    });
  } catch (err) {
    console.error("[delete-account] unexpected error:", err);
    return fail(500, "Something went wrong. Please try again.");
  }
}
