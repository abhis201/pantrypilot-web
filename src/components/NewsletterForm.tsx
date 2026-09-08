"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { subscribeToWaitlist, type SubscribeState } from "@/actions/subscribe";

const initialState: SubscribeState = { status: "idle", message: "" };

function SubmitButton({ joined }: { joined: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || joined}
      className="btn btn--primary min-w-[150px]"
    >
      {pending ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Joining…
        </>
      ) : joined ? (
        <>
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0l-3.5-3.5a1 1 0 111.4-1.4l2.8 2.8 6.8-6.8a1 1 0 011.4 0z" clipRule="evenodd" />
          </svg>
          Joined
        </>
      ) : (
        "Join waitlist"
      )}
    </button>
  );
}

export default function NewsletterForm() {
  const [state, formAction] = useActionState(subscribeToWaitlist, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const joined = state.status === "success";

  useEffect(() => {
    if (joined) formRef.current?.reset();
  }, [joined]);

  return (
    <div className="w-full">
      <form ref={formRef} className="flex flex-col sm:flex-row gap-3" action={formAction}>
        <label htmlFor="waitlist-email" className="sr-only">
          Email address
        </label>
        <input
          id="waitlist-email"
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          disabled={joined}
          className="form-input flex-1"
          required
        />
        <SubmitButton joined={joined} />
      </form>

      {/* aria-live so the result is announced without stealing focus. */}
      <div aria-live="polite" className="min-h-[24px]">
        {state.message && (
          <p
            className={`mt-4 text-sm font-medium ${
              state.status === "success" ? "text-brand" : "text-red-700"
            }`}
          >
            {state.message}
          </p>
        )}
      </div>
    </div>
  );
}
