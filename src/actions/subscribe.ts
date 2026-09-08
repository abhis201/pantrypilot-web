"use server";

import { Resend } from "resend";
import { fromAddress, ADMIN_INBOX } from "@/lib/mail";

const resend = new Resend(process.env.RESEND_API_KEY);

export type SubscribeState = {
  status: "idle" | "success" | "error";
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribeToNewsletter(
  _prevState: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  const email = formData.get("email");

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const segmentId = process.env.RESEND_SEGMENT_ID;

  try {
    const { error } = await resend.contacts.create({
      email,
      unsubscribed: false,
      segments: segmentId ? [{ id: segmentId }] : undefined,
    });

    if (error) {
      if (/already exists|already subscribed/i.test(error.message)) {
        return { status: "success", message: "You're already subscribed!" };
      }
      console.error("Resend contacts.create error:", error);
      return { status: "error", message: "Failed to subscribe. Please try again." };
    }

    // Best-effort admin notification. Awaited (not fire-and-forget) since
    // serverless functions can be frozen right after the action returns.
    try {
      await resend.emails.send({
        from: fromAddress("KhanPaan Newsletter"),
        to: ADMIN_INBOX,
        subject: "🎉 New Newsletter Subscriber!",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>New Newsletter Signup!</h2>
            <p>A new user has subscribed to the KhanPaan newsletter.</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>
        `,
      });
    } catch (err) {
      console.error("Admin notification email failed:", err);
    }

    return { status: "success", message: "You're subscribed! Keep an eye on your inbox." };
  } catch (error) {
    console.error("subscribeToNewsletter error:", error);
    return { status: "error", message: "Something went wrong. Please try again." };
  }
}
