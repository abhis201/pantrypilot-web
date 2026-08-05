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
      className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-600/50 text-emerald-950 disabled:text-emerald-950/50 font-bold px-8 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] disabled:shadow-none min-w-[140px] flex items-center justify-center"
    >
      {pending ? (
        <svg className="animate-spin h-5 w-5 text-emerald-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : joined ? (
        "Joined!"
      ) : (
        "Subscribe"
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
        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
          disabled={joined}
          className="flex-1 bg-emerald-950/40 border border-emerald-800/60 rounded-xl px-5 py-3.5 text-emerald-50 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all placeholder:text-emerald-600/50 disabled:opacity-50"
          required
        />
        <SubmitButton joined={joined} />
      </form>

      {state.message && (
        <div
          className={`mt-4 text-sm font-medium ${
            state.status === "success" ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {state.message}
        </div>
      )}
    </div>
  );
}
