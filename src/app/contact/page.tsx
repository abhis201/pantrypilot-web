"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SUPPORT_EMAIL } from "@/lib/site";
import { useState, type SubmitEvent } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      if (res.ok) {
        setStatus("sent");
        setName(""); setEmail(""); setSubject(""); setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <Navbar />
      <main
        id="main"
        className="relative viewport-lock"
        style={{
          zIndex: "var(--z-content)",
          paddingTop: "calc(var(--nav-height) + 20px)",
          paddingBottom: "28px",
        }}
      >
        <div className="shell max-w-2xl">

          {/* Header */}
          <div className="mb-7">
                        <h1
              className="rise display display--section"
              style={{ "--rise-delay": "90ms" } as React.CSSProperties}
            >
              Contact Us
            </h1>
            <p
              className="rise standfirst mt-3"
              style={{ "--rise-delay": "180ms" } as React.CSSProperties}
            >
              Have a question, feedback, or just want to say hello?
              We&apos;d love to hear from you.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rise space-y-4"
            style={{ "--rise-delay": "270ms" } as React.CSSProperties}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="form-label">Your Name</label>
                <input id="name" type="text" required autoComplete="name" value={name}
                  onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="form-input" />
              </div>
              <div>
                <label htmlFor="email" className="form-label">Your Email</label>
                <input id="email" type="email" required autoComplete="email" inputMode="email" value={email}
                  onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className="form-input" />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="form-label">Subject</label>
              <input id="subject" type="text" required value={subject}
                onChange={(e) => setSubject(e.target.value)} placeholder="How can we help?" className="form-input" />
            </div>

            <div>
              <label htmlFor="message" className="form-label">Message</label>
              <textarea id="message" required rows={4} value={message}
                onChange={(e) => setMessage(e.target.value)} placeholder="Tell us more..." className="form-input resize-none" />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn btn--primary btn--lg w-full"
            >
              {status === "sending" ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending…
                </>
              ) : (
                "Send Message"
              )}
            </button>

            {/* Announced to screen readers without pulling focus off the form. */}
            <div aria-live="polite">
              {/* Status reads as a change of field, like every other surface
                  here — not as a coloured tab down one edge. */}
              {status === "sent" && (
                <p
                  className="rounded-[var(--r-lg)] p-4 text-[14.5px] font-medium text-ink"
                  style={{ background: "var(--surface)" }}
                >
                  Message sent. We&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p
                  className="rounded-[var(--r-lg)] p-4 text-[14.5px]"
                  style={{ background: "var(--amber-soft)", color: "var(--amber-ink)" }}
                >
                  Failed to send. Email us directly at{" "}
                  <a
                    href={`mailto:${SUPPORT_EMAIL}`}
                    className="font-semibold underline underline-offset-4"
                    style={{ color: "var(--amber-ink)" }}
                  >
                    {SUPPORT_EMAIL}
                  </a>
                </p>
              )}
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
