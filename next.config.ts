import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Content-Security-Policy.
 *
 * Everything this site loads is first-party: fonts, images, the screen
 * recordings, scripts and styles all come from this origin, and nothing is
 * embedded from elsewhere. So every fetch directive is 'self'.
 *
 * script-src and style-src also carry 'unsafe-inline'. Next.js writes its
 * hydration data as inline <script> tags and the pages use inline style
 * attributes; without it the site renders but never hydrates. Removing it
 * means issuing a per-request nonce from middleware, which turns every
 * static page into a server-rendered one. Worth doing if a third-party
 * script is ever added; not worth it while there are none.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "media-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  // Don't advertise the framework version.
  poweredByHeader: false,

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  async rewrites() {
    // /data-request is an alias of the account-deletion and data-rights page.
    return [{ source: "/data-request", destination: "/delete-account" }];
  },
};

export default nextConfig;
