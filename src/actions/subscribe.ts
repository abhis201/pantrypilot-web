"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function subscribeToWaitlist(email: string) {
  if (!email || typeof email !== "string") {
    return { error: "A valid email is required." };
  }

  try {
    // Ideally, you can add contacts to an audience using resend.contacts.create
    // For now, we will send an automated welcome email to confirm their subscription
    // Since you are using a testing domain in Resend, you can only send emails to your verified email address.
    // We will send a notification to you (the admin) when someone joins the waitlist.
    const { error } = await resend.emails.send({
      from: "PantryPilot Waitlist <onboarding@resend.dev>", // Testing domain
      to: "admin.pantrypilot@gmail.com", // Your verified email address
      subject: "🎉 New Waitlist Subscriber!",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Waitlist Signup!</h2>
          <p>A new user has joined the PantryPilot waitlist.</p>
          <p><strong>Email:</strong> ${email}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { error: "Failed to send email. Please try again." };
    }

    return { success: true };
  } catch (error) {
    console.error("Action error:", error);
    return { error: "Failed to subscribe. Please try again later." };
  }
}
