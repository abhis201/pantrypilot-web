import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DeleteAccountForm from "@/components/DeleteAccountForm";
import { GRIEVANCE_EMAIL, LEGAL_LAST_UPDATED, SITE_NAME } from "@/lib/site";
import { formatLegalDate } from "@/lib/legal";

const DESCRIPTION =
  "Delete your KhanPaan account and data, export your data, or withdraw consent. Works without the app installed.";

export const metadata: Metadata = {
  title: "Delete your account or request your data",
  description: DESCRIPTION,
  alternates: { canonical: "/delete-account" },
  openGraph: {
    title: `Delete your account — ${SITE_NAME}`,
    description: DESCRIPTION,
    url: "/delete-account",
  },
};

/** What `DELETE /api/user` removes, and the little that outlives it. */
const DELETED = [
  "Your account record: email, phone number, display name, avatar, Google / Apple sign-in identifiers, region",
  "Pantry items, shopping lists and receipt scan sessions",
  "Meal plans, logged meals, nutrition goals and body metrics",
  "Dietary preferences, allergies and restrictions",
  "Saved recipes and private recipes you created or imported",
  "Photos and files stored for your account",
  "Push notification tokens for your devices",
  "Redeemed codes and AI usage records",
];

const RETAINED = [
  {
    what: "A one-way hash in our trial ledger",
    why: "When a free trial is claimed we store an HMAC-SHA256 hash of the sign-in identifier, made with a secret key held only on our server. It contains no user ID, email or phone number, cannot be reversed into one, and is not linked to any profile. It exists only so the same sign-in cannot claim the free trial again after re-registering.",
  },
  {
    what: "Public recipes you contributed",
    why: "Recipes you published to the shared catalogue stay available to other people, with your identity detached from them. They no longer point to you.",
  },
  {
    what: "Purchase and tax records held by Apple or Google",
    why: "Subscriptions are billed by the App Store or Google Play. They keep their own invoice and tax records as the law requires; we do not hold your card or UPI details and cannot delete records in their systems.",
  },
];

export default function DeleteAccountPage() {
  return (
    <>
      <Navbar />

      <main
        id="main"
        className="relative min-h-screen pb-20"
        style={{
          zIndex: "var(--z-content)",
          paddingTop: "calc(var(--nav-height) + 48px)",
        }}
      >
        <div className="shell max-w-3xl">
          <h1 className="display display--section mb-5">
            Delete your account or request your data
          </h1>
          <p className="standfirst mb-3" style={{ maxWidth: "62ch" }}>
            You can delete your {SITE_NAME} account and everything in it at any
            time. You do not need the app installed, and you do not need to
            sign in to use this page.
          </p>
          <p className="mb-12 text-[14.5px] text-ink-muted">
            <strong>Last updated:</strong> {formatLegalDate(LEGAL_LAST_UPDATED)}
          </p>

          <div className="legal-content">
            <section>
              <h2>Option 1: Delete in the app (instant)</h2>
              <p>
                This is the fastest way. It takes effect immediately and needs
                no confirmation from us.
              </p>
              <ol>
                <li>Open {SITE_NAME} on your phone.</li>
                <li>
                  Go to <strong>Settings</strong>, then <strong>Account</strong>.
                </li>
                <li>
                  Tap <strong>Delete Account</strong> and confirm.
                </li>
              </ol>
              <p>
                Your account and data are permanently deleted from our servers
                straight away. Deleting your account does not cancel a
                subscription billed by Apple or Google: cancel that in your
                App Store or Google Play subscription settings.
              </p>
            </section>

            <section>
              <h2>Option 2: Request it here (no app needed)</h2>
              <p>
                Use this if you have uninstalled the app or cannot sign in. You
                can also use it to ask for a copy of your data or to withdraw
                consent. Nothing is deleted until we have confirmed the request
                came from the account holder, so that nobody else can delete
                your account by typing your email address.
              </p>
              <ul>
                <li>You get a reference number on screen as soon as you send it.</li>
                <li>We acknowledge every request within 24 hours.</li>
                <li>
                  Verified requests are resolved within 15 days, and
                  usually much sooner.
                </li>
              </ul>
            </section>
          </div>

          <div
            className="mt-6 rounded-[var(--r-xl)] p-6 sm:p-8"
            style={{ background: "var(--card)", boxShadow: "var(--e-2)" }}
          >
            <DeleteAccountForm />
          </div>

          <div className="legal-content">
            <section>
              <h2>What is deleted and what is kept</h2>
              <h3>Permanently deleted</h3>
              <ul>
                {DELETED.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h3>Kept, and why</h3>
              <table>
                <thead>
                  <tr>
                    <th>What is kept</th>
                    <th>Why</th>
                  </tr>
                </thead>
                <tbody>
                  {RETAINED.map((row) => (
                    <tr key={row.what}>
                      <td>
                        <strong>{row.what}</strong>
                      </td>
                      <td>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section>
              <h2>Questions</h2>
              <p>
                Email{" "}
                <a href={`mailto:${GRIEVANCE_EMAIL}`}>{GRIEVANCE_EMAIL}</a>. The
                full detail of what we collect and your rights is in the{" "}
                <Link href="/privacy">Privacy Policy</Link>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
