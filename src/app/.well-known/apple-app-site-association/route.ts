import { IOS_BUNDLE_ID } from "@/lib/site";

/**
 * iOS Universal Links. Apple fetches this exact path (no .json extension,
 * no redirect) and requires `Content-Type: application/json`.
 *
 * The app ID is `<Team ID>.<bundle ID>`. The Team ID is not in this repo, so
 * it comes from APPLE_TEAM_ID. Without it the route answers 404 instead of
 * publishing a file with a placeholder in it: Apple caches this file on its
 * CDN, and a wrong one is slower to recover from than a missing one.
 */
export const dynamic = "force-static";

export function GET() {
  const teamId = process.env.APPLE_TEAM_ID?.trim();
  if (!teamId) {
    console.warn(
      "[well-known] APPLE_TEAM_ID is not set; apple-app-site-association is not being served."
    );
    return new Response("Not found", { status: 404 });
  }

  const body = {
    applinks: {
      apps: [],
      details: [
        {
          appIDs: [`${teamId}.${IOS_BUNDLE_ID}`],
          components: [{ "/": "/recipes/*" }, { "/": "/share/*" }],
        },
      ],
    },
  };

  return new Response(JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
