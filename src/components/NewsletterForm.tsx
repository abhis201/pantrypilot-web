"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const { subscribeToWaitlist } = await import("@/actions/subscribe");
      const res = await subscribeToWaitlist(email);

      if (res?.error) {
        setStatus("error");
        setMessage(res.error);
      } else if (res?.success) {
        setStatus("success");
        setMessage("You're on the list! Keep an eye on your inbox.");
        setEmail("");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address" 
          disabled={status === "loading" || status === "success"}
          className="flex-1 bg-emerald-950/40 border border-emerald-800/60 rounded-xl px-5 py-3.5 text-emerald-50 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all placeholder:text-emerald-600/50 disabled:opacity-50"
          required
        />
        <button 
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-600/50 text-emerald-950 disabled:text-emerald-950/50 font-bold px-8 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] disabled:shadow-none min-w-[140px] flex items-center justify-center"
        >
          {status === "loading" ? (
            <svg className="animate-spin h-5 w-5 text-emerald-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : status === "success" ? (
            "Joined!"
          ) : (
            "Subscribe"
          )}
        </button>
      </form>
      
      {/* Feedback Messages */}
      {message && (
        <div className={`mt-4 text-sm font-medium ${status === "success" ? "text-emerald-400" : "text-red-400"}`}>
          {message}
        </div>
      )}
    </div>
  );
}
