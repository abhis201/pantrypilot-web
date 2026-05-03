import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions — PantryPilot",
  description:
    "Read the Terms and Conditions for PantryPilot, the smart pantry and meal management app. Learn about our services, subscriptions, user responsibilities, and more.",
};

export default function TermsPage() {
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "admin.pantrypilot@gmail.com";

  return (
    <>
      <Navbar />

      <main className="min-h-screen pb-20" style={{ paddingTop: "calc(var(--nav-height) + 48px)" }}>
        <div className="max-w-3xl mx-auto px-8 md:px-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-400/40 mb-4">
            Legal
          </p>
          <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[0.95] tracking-[-0.04em] mb-5">
            Terms and Conditions
          </h1>
          <p className="text-emerald-200/30 text-sm mb-12">
            <strong>Effective Date:</strong> April 2, 2026 &nbsp;&middot;&nbsp;
            <strong>Last Updated:</strong> April 2, 2026
          </p>

        <div className="legal-content">

          <p>
            <strong>PantryPilot — Smart Pantry &amp; Meal Management</strong>
          </p>

          {/* Section 1 */}
          <h2>1. Acceptance of Terms</h2>
          <p>
            By downloading, installing, accessing, or using the PantryPilot
            mobile application (&ldquo;App&rdquo;), you agree to be bound by
            these Terms and Conditions (&ldquo;Terms&rdquo;). If you do not
            agree to all of these Terms, you must not use the App.
          </p>
          <p>
            PantryPilot is operated by PantryPilot (&ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;). These Terms constitute a
            legally binding agreement between you (&ldquo;User,&rdquo;
            &ldquo;you,&rdquo; or &ldquo;your&rdquo;) and PantryPilot.
          </p>

          {/* Section 2 */}
          <h2>2. Eligibility</h2>
          <p>To use PantryPilot, you must:</p>
          <ul>
            <li>
              Be at least 13 years of age (or the minimum age required in your
              jurisdiction).
            </li>
            <li>
              If you are between 13 and 18 years of age, you must have the
              consent of a parent or legal guardian.
            </li>
            <li>
              Provide accurate and truthful information during registration.
            </li>
            <li>
              Not be prohibited from receiving services under the laws of your
              jurisdiction.
            </li>
          </ul>

          {/* Section 3 */}
          <h2>3. Account Registration and Security</h2>

          <h3>3.1 Account Creation</h3>
          <p>You may create an account using:</p>
          <ul>
            <li>
              Phone number with OTP (One-Time Password) verification via SMS.
            </li>
            <li>Google Sign-In using your Google account.</li>
            <li>Apple Sign-In using your Apple ID.</li>
          </ul>

          <h3>3.2 Account Security</h3>
          <p>You are responsible for:</p>
          <ul>
            <li>
              Maintaining the confidentiality of your account credentials.
            </li>
            <li>All activities that occur under your account.</li>
            <li>
              Notifying us immediately of any unauthorized access to your
              account.
            </li>
          </ul>

          <h3>3.3 One Account Per User</h3>
          <p>
            Each user may maintain only one active account. We reserve the right
            to terminate duplicate accounts.
          </p>

          {/* Section 4 */}
          <h2>4. Description of Services</h2>
          <p>PantryPilot provides the following services:</p>

          <h3>4.1 Free Tier Services</h3>
          <ul>
            <li>
              <strong>Pantry Management:</strong> Add, edit, track, and organize
              food items with expiry dates, storage locations, quantities, and
              categories.
            </li>
            <li>
              <strong>Barcode Scanning:</strong> Scan product barcodes to
              automatically populate item details using the USDA FoodData
              Central database and OpenFoodFacts.
            </li>
            <li>
              <strong>Image-Based Item Addition:</strong> Take a photo of a food
              item and let AI extract ingredient details.
            </li>
            <li>
              <strong>Shopping List:</strong> Create and manage a shopping list
              with item completion tracking.
            </li>
            <li>
              <strong>Meal Planner:</strong> Plan meals across Breakfast, Lunch,
              Snacks, and Dinner for any day of the week.
            </li>
            <li>
              <strong>Activity History:</strong> View a log of all pantry actions
              (items added, consumed, expired, etc.).
            </li>
            <li>
              <strong>Basic Nutrition Tracking:</strong> View today&rsquo;s
              macros summary on the home screen.
            </li>
            <li>
              <strong>Expiring Items Alerts:</strong> Visual indicators for items
              expiring within 4 days.
            </li>
            <li>
              <strong>Profile Management:</strong> Edit your profile, set
              dietary preferences, choose unit systems (Metric/Imperial), and
              manage notification settings.
            </li>
          </ul>

          <h3>4.2 Pro Tier Services (Paid Subscription)</h3>
          <ul>
            <li>
              <strong>AI-Powered Meal Suggestions:</strong> Personalized recipe
              recommendations based on your current pantry items, dietary
              preferences, cuisine choices, and lifestyle goals — powered by
              Google Gemini AI.
            </li>
            <li>
              <strong>Advanced Macro Calculator:</strong> Calculate personalized
              daily macronutrient targets (protein, carbs, fat, fiber, sugar)
              using the Katch-McArdle formula with your body metrics.
            </li>
            <li>
              <strong>Full Analytics Dashboard:</strong> Detailed stats including
              grocery spending trends, pantry freshness score, stock
              distribution by storage location, consumption trend charts, and
              money-wasted tracking.
            </li>
            <li>
              <strong>AI Health Insights:</strong> Gemini-powered nutritional
              analysis of your pantry composition with personalized health
              recommendations.
            </li>
            <li>
              <strong>Expiring Items First Mode:</strong> AI-enhanced recipe
              ranking that prioritizes ingredients expiring within 4 days to
              reduce food waste.
            </li>
            <li>
              <strong>Auto Plan Meal (AI Chef):</strong> Access the AI recipe
              suggestion engine directly from the meal planner.
            </li>
          </ul>

          {/* Section 5 */}
          <h2>5. Subscription and Payments</h2>

          <h3>5.1 Subscription Plans</h3>
          <p>
            PantryPilot Pro is available as a subscription managed through
            RevenueCat and processed via the Apple App Store (iOS) or Google
            Play Store (Android).
          </p>

          <h3>5.2 Pricing</h3>
          <p>
            Subscription pricing is displayed in the App at the time of purchase
            and may vary by region. All prices are in the local currency of your
            App Store account.
          </p>

          <h3>5.3 Billing</h3>
          <ul>
            <li>
              Subscriptions are billed on a recurring basis (monthly or
              annually, as selected).
            </li>
            <li>
              Payment is charged to your Apple ID or Google Play account at
              confirmation of purchase.
            </li>
            <li>
              Your subscription automatically renews unless canceled at least 24
              hours before the end of the current billing period.
            </li>
            <li>
              Your account will be charged for renewal within 24 hours prior to
              the end of the current period.
            </li>
          </ul>

          <h3>5.4 Free Trial</h3>
          <p>
            If offered, a free trial period may be available for new
            subscribers. If you do not cancel before the trial ends, you will be
            automatically charged the subscription price.
          </p>

          <h3>5.5 Cancellation</h3>
          <ul>
            <li>
              You may cancel your subscription at any time through your
              device&rsquo;s App Store subscription settings.
            </li>
            <li>
              Cancellation takes effect at the end of the current billing
              period. You will retain access to Pro features until the period
              expires.
            </li>
            <li>We do not provide refunds for partial billing periods.</li>
          </ul>

          <h3>5.6 Refunds</h3>
          <p>
            Refund requests are handled by Apple (for iOS) or Google (for
            Android) in accordance with their respective refund policies.
          </p>

          {/* Section 6 */}
          <h2>6. User Content and Data</h2>

          <h3>6.1 Your Content</h3>
          <p>
            You retain ownership of all content you submit to PantryPilot,
            including:
          </p>
          <ul>
            <li>
              Pantry item details (names, quantities, expiry dates, photos).
            </li>
            <li>Shopping list items.</li>
            <li>Meal plans and recipes saved.</li>
            <li>Profile information and dietary preferences.</li>
            <li>Bug reports, feature requests, and feedback.</li>
          </ul>

          <h3>6.2 License Grant</h3>
          <p>
            By submitting content, you grant PantryPilot a non-exclusive,
            worldwide, royalty-free license to use, process, and store your
            content solely for the purpose of providing and improving the
            App&rsquo;s services.
          </p>

          <h3>6.3 Data Accuracy</h3>
          <ul>
            <li>
              Nutritional data, including USDA FoodData Central and barcode
              lookup results, is provided for informational purposes only and
              may not be 100% accurate.
            </li>
            <li>
              AI-generated meal suggestions, macro calculations, and health
              insights are generated by Google Gemini AI and should not be
              considered medical or professional dietary advice.
            </li>
            <li>
              Expiry date tracking is based on user-entered data. PantryPilot
              does not guarantee the accuracy of expiry information.
            </li>
          </ul>

          {/* Section 7 */}
          <h2>7. AI-Powered Features Disclaimer</h2>

          <h3>7.1 Nature of AI Services</h3>
          <p>PantryPilot uses Google Gemini AI for:</p>
          <ul>
            <li>Recipe suggestions based on pantry items.</li>
            <li>Semantic search and ingredient matching.</li>
            <li>Health insights based on pantry composition.</li>
            <li>Ingredient extraction from food images.</li>
          </ul>

          <h3>7.2 Limitations</h3>
          <ul>
            <li>
              AI-generated content may contain inaccuracies, errors, or
              inappropriate suggestions.
            </li>
            <li>
              Recipe suggestions may not account for all allergies,
              intolerances, or medical dietary restrictions.
            </li>
            <li>
              AI health insights are general in nature and do not constitute
              medical advice.
            </li>
            <li>
              Users should always verify recipe ingredients for allergens and
              safety before consumption.
            </li>
          </ul>

          <h3>7.3 No Medical Advice</h3>
          <p>
            PantryPilot is not a medical application. The macro calculator,
            nutritional tracking, and health insights features are for
            informational and lifestyle purposes only. Always consult a
            qualified healthcare provider or registered dietitian before making
            significant dietary changes.
          </p>

          {/* Section 8 */}
          <h2>8. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the App for any unlawful purpose.</li>
            <li>
              Attempt to reverse-engineer, decompile, or disassemble the App.
            </li>
            <li>
              Interfere with the App&rsquo;s servers, networks, or
              infrastructure.
            </li>
            <li>Upload malicious content, viruses, or harmful code.</li>
            <li>Create multiple accounts for fraudulent purposes.</li>
            <li>
              Scrape, harvest, or collect data from the App through automated
              means.
            </li>
            <li>
              Abuse the OTP verification system (rate-limited to 5 requests per
              minute per IP).
            </li>
            <li>
              Circumvent or disable any security features, including rate
              limiting.
            </li>
            <li>
              Share your subscription or account credentials with others.
            </li>
            <li>Resell or redistribute the App or its content.</li>
          </ul>

          {/* Section 9 */}
          <h2>9. Intellectual Property</h2>

          <h3>9.1 App Ownership</h3>
          <p>
            PantryPilot, including its design, code, graphics, logos, user
            interface, and all other proprietary content, is owned by
            PantryPilot and protected by copyright, trademark, and other
            intellectual property laws.
          </p>

          <h3>9.2 Recipe Database</h3>
          <p>
            The recipe database used by PantryPilot is curated and maintained by
            PantryPilot. Individual recipes may contain information sourced from
            various databases and AI-generated content.
          </p>

          <h3>9.3 Trademarks</h3>
          <p>
            &ldquo;PantryPilot,&rdquo; the PantryPilot logo, and related marks
            are trademarks of PantryPilot. You may not use these marks without
            our prior written permission.
          </p>

          {/* Section 10 */}
          <h2>10. Third-Party Services</h2>
          <p>
            PantryPilot integrates with the following third-party services:
          </p>

          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Supabase</td>
                <td>
                  Database hosting, file storage, and authentication
                  infrastructure
                </td>
              </tr>
              <tr>
                <td>Google Gemini AI</td>
                <td>
                  AI-powered recipe suggestions, ingredient matching, and health
                  insights
                </td>
              </tr>
              <tr>
                <td>Twilio</td>
                <td>SMS OTP delivery for phone number verification</td>
              </tr>
              <tr>
                <td>RevenueCat</td>
                <td>Subscription management and billing</td>
              </tr>
              <tr>
                <td>USDA FoodData Central</td>
                <td>Nutritional data for food items</td>
              </tr>
              <tr>
                <td>OpenFoodFacts</td>
                <td>Barcode product information</td>
              </tr>
              <tr>
                <td>Google Sign-In</td>
                <td>OAuth authentication</td>
              </tr>
              <tr>
                <td>Apple Sign-In</td>
                <td>OAuth authentication</td>
              </tr>
            </tbody>
          </table>

          <p>
            Your use of these third-party services is subject to their
            respective terms of service and privacy policies. PantryPilot is not
            responsible for the practices of these third-party services.
          </p>

          {/* Section 11 */}
          <h2>11. Limitation of Liability</h2>

          <h3>11.1 Disclaimer of Warranties</h3>
          <p>
            THE APP IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS
            AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
            NON-INFRINGEMENT.
          </p>

          <h3>11.2 Limitation</h3>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, PANTRYPILOT
            SHALL NOT BE LIABLE FOR:
          </p>
          <ul>
            <li>
              Any indirect, incidental, special, consequential, or punitive
              damages.
            </li>
            <li>Loss of profits, data, or goodwill.</li>
            <li>
              Any health issues arising from following AI-generated dietary
              recommendations.
            </li>
            <li>
              Food spoilage or waste resulting from inaccurate expiry tracking.
            </li>
            <li>
              Inaccurate nutritional information from third-party databases.
            </li>
            <li>Service interruptions or downtime.</li>
          </ul>

          <h3>11.3 Maximum Liability</h3>
          <p>
            Our total liability to you for any claim arising from the use of the
            App shall not exceed the amount you paid for the Pro subscription in
            the twelve (12) months preceding the claim.
          </p>

          {/* Section 12 */}
          <h2>12. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless PantryPilot, its officers,
            directors, employees, and affiliates from any claims, damages,
            losses, or expenses (including reasonable attorney&rsquo;s fees)
            arising from:
          </p>
          <ul>
            <li>Your use of the App.</li>
            <li>Your violation of these Terms.</li>
            <li>Your violation of any third-party rights.</li>
            <li>Any content you submit through the App.</li>
          </ul>

          {/* Section 13 */}
          <h2>13. Termination</h2>

          <h3>13.1 By You</h3>
          <p>
            You may terminate your account at any time by deleting your account
            through the App&rsquo;s settings or by contacting us at{" "}
            <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
            .
          </p>

          <h3>13.2 By Us</h3>
          <p>
            We reserve the right to suspend or terminate your account at any
            time, with or without cause, including but not limited to:
          </p>
          <ul>
            <li>Violation of these Terms.</li>
            <li>Fraudulent or suspicious activity.</li>
            <li>Extended periods of inactivity (12+ months).</li>
          </ul>

          <h3>13.3 Effect of Termination</h3>
          <p>Upon termination:</p>
          <ul>
            <li>Your right to use the App ceases immediately.</li>
            <li>
              Your data may be retained for up to 30 days for backup purposes
              before permanent deletion.
            </li>
            <li>
              Any active subscription will continue until the end of the current
              billing period, after which it will not renew.
            </li>
          </ul>

          {/* Section 14 */}
          <h2>14. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. When we make material
            changes:
          </p>
          <ul>
            <li>
              We will update the &ldquo;Last Updated&rdquo; date at the top.
            </li>
            <li>We may notify you via in-app notification or email.</li>
            <li>
              Your continued use of the App after such changes constitutes
              acceptance of the revised Terms.
            </li>
          </ul>

          {/* Section 15 */}
          <h2>15. Governing Law and Dispute Resolution</h2>

          <h3>15.1 Governing Law</h3>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of the United States of America and the State of Delaware,
            without regard to its conflict of law principles.
          </p>

          <h3>15.2 Dispute Resolution</h3>
          <p>
            Any disputes arising out of or relating to these Terms shall be
            resolved through binding arbitration in accordance with the rules of
            the American Arbitration Association (AAA). The arbitration shall
            take place in Delaware, USA.
          </p>

          <h3>15.3 Class Action Waiver</h3>
          <p>
            YOU AGREE THAT ANY CLAIMS ARISING FROM THESE TERMS OR YOUR USE OF
            THE APP MUST BE BROUGHT IN YOUR INDIVIDUAL CAPACITY AND NOT AS A
            PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE
            PROCEEDING.
          </p>

          {/* Section 16 */}
          <h2>16. Miscellaneous</h2>

          <h3>16.1 Entire Agreement</h3>
          <p>
            These Terms, together with the Privacy Policy, constitute the entire
            agreement between you and PantryPilot regarding your use of the App.
          </p>

          <h3>16.2 Severability</h3>
          <p>
            If any provision of these Terms is found to be unenforceable, the
            remaining provisions shall continue in full force and effect.
          </p>

          <h3>16.3 Waiver</h3>
          <p>
            The failure of PantryPilot to enforce any right or provision of
            these Terms shall not constitute a waiver of such right or
            provision.
          </p>

          <h3>16.4 Assignment</h3>
          <p>
            You may not assign or transfer your rights under these Terms without
            our prior written consent. We may assign our rights and obligations
            without restriction.
          </p>

          {/* Section 17 */}
          <h2>17. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${supportEmail}`}>
                {supportEmail}
              </a>
            </li>
            <li>
              <strong>In-App:</strong> Settings &rarr; Support &rarr; Send
              Feedback
            </li>
            <li>
              <strong>Website:</strong>{" "}
              <a
                href="https://pantrypilot.net"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://pantrypilot.net
              </a>
            </li>
          </ul>
        </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
