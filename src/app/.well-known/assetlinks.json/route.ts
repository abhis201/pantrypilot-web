import { ANDROID_PACKAGE_NAME } from "@/lib/site";

/**
 * Android App Links (Digital Asset Links).
 *
 * ANDROID_RELEASE_SHA256_FINGERPRINTS is a comma-separated list, because a
 * Play-signed app usually needs two: the Play App Signing key (Play Console
 * > Setup > App signing) and the upload key. Without it the route answers
 * 404 instead of publishing a placeholder fingerprint.
 */
export const dynamic = "force-static";

export function GET() {
  const fingerprints = (process.env.ANDROID_RELEASE_SHA256_FINGERPRINTS || "")
    .split(",")
    .map((f) => f.trim().toUpperCase())
    .filter((f) => /^([0-9A-F]{2}:){31}[0-9A-F]{2}$/.test(f));

  if (fingerprints.length === 0) {
    console.warn(
      "[well-known] ANDROID_RELEASE_SHA256_FINGERPRINTS is not set or malformed; assetlinks.json is not being served."
    );
    return new Response("Not found", { status: 404 });
  }

  const body = [
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: ANDROID_PACKAGE_NAME,
        sha256_cert_fingerprints: fingerprints,
      },
    },
  ];

  return new Response(JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
