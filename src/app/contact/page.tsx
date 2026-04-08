"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
      <main className="min-h-screen" style={{ paddingTop: "calc(var(--nav-height) + 48px)", paddingBottom: "80px" }}>
        <div className="max-w-2xl mx-auto px-8 md:px-14">

          {/* Header */}
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-400/35 mb-3">
              Get in Touch
            </p>
            <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.0] tracking-[-0.03em] mb-4">
              Contact Us
            </h1>
            <p className="text-emerald-200/35 text-[15px] leading-[1.75] max-w-sm">
              Have a question, feedback, or just want to say hello?
              We&apos;d love to hear from you.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-400/30 mb-2.5">
                  Your Name
                </label>
                <input id="name" type="text" required value={name}
                  onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="form-input" />
              </div>
              <div>
                <label htmlFor="email" className="block text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-400/30 mb-2.5">
                  Your Email
                </label>
                <input id="email" type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className="form-input" />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-400/30 mb-2.5">
                Subject
              </label>
              <input id="subject" type="text" required value={subject}
                onChange={(e) => setSubject(e.target.value)} placeholder="How can we help?" className="form-input" />
            </div>

            <div>
              <label htmlFor="message" className="block text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-400/30 mb-2.5">
                Message
              </label>
              <textarea id="message" required rows={6} value={message}
                onChange={(e) => setMessage(e.target.value)} placeholder="Tell us more..." className="form-input resize-none" />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-[13px] uppercase tracking-[0.06em] transition-all"
              style={{
                background: "rgba(16,185,129,0.1)",
                color: status === "sending" ? "rgba(52,211,153,0.4)" : "#34d399",
                cursor: status === "sending" ? "not-allowed" : "pointer",
              }}
            >
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>

            {status === "sent" && (
              <p className="text-emerald-400 text-sm p-4 rounded-xl"
                style={{ background: "rgba(16,185,129,0.06)", borderLeft: "3px solid rgba(16,185,129,0.3)" }}>
                Message sent! We&apos;ll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-orange-400/70 text-sm p-4 rounded-xl"
                style={{ background: "rgba(251,146,60,0.05)", borderLeft: "3px solid rgba(251,146,60,0.25)" }}>
                Failed to send. Email us directly at{" "}
                <a href="mailto:admin.pantrypilot@gmail.com" className="text-emerald-400 underline">
                  admin.pantrypilot@gmail.com
                </a>
              </p>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
