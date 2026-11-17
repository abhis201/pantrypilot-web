"use client";

import { useState } from "react";
import { GRIEVANCE_EMAIL } from "@/lib/site";

type Status = "idle" | "sending" | "done" | "error";

const REQUEST_TYPES = [
  { value: "delete", label: "Delete my account and data" },
  { value: "export", label: "Export my data" },
  { value: "withdraw", label: "Withdraw consent" },
  { value: "other", label: "Other privacy request" },
];

const AUTH_METHODS = [
  { value: "google", label: "Google Sign-In" },
  { value: "apple", label: "Apple Sign-In" },
  { value: "phone", label: "Phone number" },
];

/**
 * The web deletion / data-rights request form.
 *
 * It files a ticket, it does not delete anything by itself: a public form
 * that erased an account on the strength of a typed email address would let
 * anyone delete anyone. The team verifies the requester first, and the page
 * says so before the button is pressed.
 */
export default function DeleteAccountForm() {
  const [requestType, setRequestType] = useState("delete");
  const [authMethod, setAuthMethod] = useState("google");
  const [identifier, setIdentifier] = useState("");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);

  const byPhone = authMethod === "phone";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/delete-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType,
          authMethod,
          identifier,
          notes,
          website,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setReference(data.reference);
        setAcknowledged(Boolean(data.acknowledged));
        setStatus("done");
      } else {
        // Everything typed stays in the form; only the message changes.
        setError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setError("We couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        className="rounded-[var(--r-lg)] p-6"
        style={{ background: "var(--surface)" }}
        role="status"
        aria-live="polite"
      >
        <h3 className="display display--xs">Request received</h3>
        <p className="mt-3 text-[15px] leading-[1.7] text-ink">
          Your reference is{" "}
          <strong className="nums select-all text-[17px]">{reference}</strong>.
          Keep it: quote it if you write to us about this request.
        </p>
        <p className="mt-3 text-[14.5px] leading-[1.7] text-ink-muted">
          {acknowledged
            ? "We've emailed a confirmation to the address you gave. "
            : "You gave a phone number, so there is no confirmation email. "}
          We will acknowledge your request within 24 hours and verify that it
          came from the account holder before anything is changed.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="dr-type" className="form-label">
            What do you want to do?
          </label>
          <select
            id="dr-type"
            className="form-input"
            value={requestType}
            onChange={(e) => setRequestType(e.target.value)}
          >
            {REQUEST_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="dr-auth" className="form-label">
            How did you sign in?
          </label>
          <select
            id="dr-auth"
            className="form-input"
            value={authMethod}
            onChange={(e) => setAuthMethod(e.target.value)}
          >
            {AUTH_METHODS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="dr-id" className="form-label">
          {byPhone
            ? "Phone number on your account"
            : "Email address on your account"}
        </label>
        <input
          id="dr-id"
          className="form-input"
          required
          type={byPhone ? "tel" : "email"}
          inputMode={byPhone ? "tel" : "email"}
          autoComplete={byPhone ? "tel" : "email"}
          placeholder={byPhone ? "+91 98765 43210" : "you@example.com"}
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          aria-describedby="dr-id-hint"
        />
        <p id="dr-id-hint" className="mt-2 text-[13px] text-ink-muted">
          {byPhone
            ? "Include the country code. Spaces and dashes are fine."
            : "The address you used with Google or Apple Sign-In."}
        </p>
      </div>

      <div>
        <label htmlFor="dr-notes" className="form-label">
          Anything else we should know?{" "}
          <span className="font-normal text-ink-muted">(optional)</span>
        </label>
        <textarea
          id="dr-notes"
          className="form-input resize-none"
          rows={3}
          maxLength={2000}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {/* Honeypot. Off-screen rather than display:none (some bots skip
          hidden fields), out of the tab order and hidden from assistive
          tech, so no person ever fills it. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <label htmlFor="dr-website">Leave this field empty</label>
        <input
          id="dr-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn--primary btn--lg w-full"
      >
        {status === "sending" ? "Sending request…" : "Send request"}
      </button>

      <div aria-live="polite">
        {status === "error" && (
          <p
            className="rounded-[var(--r-lg)] p-4 text-[14.5px]"
            style={{ background: "var(--amber-soft)", color: "var(--amber-ink)" }}
          >
            {error} You can also email{" "}
            <a
              href={`mailto:${GRIEVANCE_EMAIL}`}
              className="font-semibold underline underline-offset-4"
              style={{ color: "var(--amber-ink)" }}
            >
              {GRIEVANCE_EMAIL}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
