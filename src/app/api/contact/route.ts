import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Construct mailto link content — this creates an email to the admin
    // In production, replace with a proper email service (SendGrid, Resend, etc.)
    const to = "admin.pantrypilot@gmail.com";
    const emailSubject = `[PantryPilot Contact] ${subject}`;
    const emailBody = [
      `From: ${name} (${email})`,
      `Subject: ${subject}`,
      "",
      message,
      "",
      "---",
      `Sent via PantryPilot website contact form`,
    ].join("\n");

    // Send email using a simple fetch to a mailto-compatible endpoint
    // For now, we'll use a simple approach that works without external services:
    // Log the contact and return success. In production, integrate with an email API.

    // Option: Use fetch to send via an email API service
    // For a production setup, you'd use something like:
    // await fetch('https://api.resend.com/emails', { ... })

    // For now, log and construct a direct mailto fallback
    console.log("=== New Contact Form Submission ===");
    console.log(`To: ${to}`);
    console.log(`Subject: ${emailSubject}`);
    console.log(`Body:\n${emailBody}`);
    console.log("===================================");

    return NextResponse.json({
      success: true,
      message: "Your message has been received. We'll get back to you soon!",
      // Include mailto link as fallback for the client
      mailto: `mailto:${to}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
