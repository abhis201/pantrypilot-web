import type { NextRequest } from "next/server";

/**
 * Fixed-window rate limiter for the public form endpoints.
 *
 * In-memory on purpose: no new infrastructure, and it stops the realistic
 * abuse (one client hammering a form). Its limit is honest: on a serverless
 * host each warm instance keeps its own counters, so a determined attacker
 * spread across instances gets more than the stated budget. If that ever
 * matters, swap `hits` for a shared store (Upstash, Vercel KV); the call
 * sites don't change.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_TRACKED = 5000;

export function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

/** Returns seconds to wait when the caller is over budget, otherwise 0. */
export function rateLimit(bucket: string, ip: string): number {
  const now = Date.now();
  const key = `${bucket}:${ip}`;
  const entry = hits.get(key);

  if (!entry || entry.resetAt <= now) {
    if (hits.size >= MAX_TRACKED) {
      for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
      if (hits.size >= MAX_TRACKED) hits.clear();
    }
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return 0;
  }

  entry.count += 1;
  if (entry.count <= MAX_REQUESTS) return 0;
  return Math.ceil((entry.resetAt - now) / 1000);
}

/**
 * CSRF guard for JSON form endpoints. A cross-site page cannot send
 * `Content-Type: application/json` without a CORS preflight (which these
 * routes never approve), and a browser always sends `Origin` on a POST, so
 * requiring both to line up with our own host rejects forged submissions
 * without a token round-trip.
 */
export function sameOrigin(request: NextRequest): boolean {
  const type = request.headers.get("content-type") || "";
  if (!type.toLowerCase().startsWith("application/json")) return false;

  const origin = request.headers.get("origin");
  if (!origin) return false;
  const host =
    request.headers.get("x-forwarded-host") || request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** Trim, collapse control characters, and cap length. */
export function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** E.164-ish: optional +, 7 to 15 digits once separators are stripped. */
export const PHONE_RE = /^\+?\d{7,15}$/;
