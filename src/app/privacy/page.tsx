import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — PantryPilot",
  description:
    "Learn how PantryPilot collects, uses, stores, and protects your personal information. Read our full privacy policy covering data practices, your rights, and security measures.",
};

export default function PrivacyPolicyPage() {
  const privacyEmail = process.env.NEXT_PUBLIC_PRIVACY_EMAIL || "admin.pantrypilot@gmail.com";
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "admin.pantrypilot@gmail.com";

  return (
    <>
      <Navbar />

      <main className="min-h-screen pb-20" style={{ paddingTop: "calc(var(--nav-height) + 48px)" }}>
        <div className="max-w-4xl mx-auto px-8 md:px-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-400/40 mb-4">
            Legal
          </p>
          <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[0.95] tracking-[-0.04em] mb-5">
            Privacy Policy
          </h1>
          <p className="text-emerald-200/30 text-sm mb-12">
            <strong>Effective Date:</strong> April 2, 2026 &nbsp;&middot;&nbsp;
            <strong>Last Updated:</strong> April 2, 2026
          </p>

        <div className="legal-content">

        {/* Section 1 */}
        <section>
          <h2 className="">
            1. Introduction
          </h2>
          <p className="">
            PantryPilot (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
            &ldquo;our&rdquo;) is committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, store, share, and
            protect your personal information when you use the PantryPilot
            mobile application (&ldquo;App&rdquo;).
          </p>
          <p className="">
            By using PantryPilot, you consent to the data practices described in
            this policy. If you do not agree, please do not use the App.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="">
            2. Information We Collect
          </h2>

          <h3 className="">
            2.1 Information You Provide Directly
          </h3>
          <div className="overflow-x-auto mb-8">
            <table className="">
              <thead>
                <tr className="">
                  <th className="">
                    Data Category
                  </th>
                  <th className="">
                    Specific Data
                  </th>
                  <th className="">
                    Purpose
                  </th>
                </tr>
              </thead>
              <tbody className="">
                <tr>
                  <td className="px-4 py-3">Account Information</td>
                  <td className="px-4 py-3">
                    Phone number, name, email address
                  </td>
                  <td className="px-4 py-3">
                    Account creation and authentication
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Profile Information</td>
                  <td className="px-4 py-3">
                    Display name, avatar photo, dietary preferences (e.g.,
                    Vegan, Keto, Gluten-free), lifestyle goals (e.g., Weight
                    Loss, Muscle Gain)
                  </td>
                  <td className="px-4 py-3">
                    Personalization and recipe recommendations
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Pantry Data</td>
                  <td className="px-4 py-3">
                    Food item names, brands, quantities, unit types, expiry
                    dates, storage locations (Fridge, Freezer, Pantry, Other),
                    categories, purchase prices, product photos
                  </td>
                  <td className="px-4 py-3">
                    Core pantry management functionality
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Barcode Data</td>
                  <td className="px-4 py-3">Scanned UPC/EAN barcodes</td>
                  <td className="px-4 py-3">
                    Product identification via USDA and OpenFoodFacts
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Meal Plans</td>
                  <td className="px-4 py-3">
                    Planned meals with dates, meal types, titles, descriptions,
                    servings, calorie estimates, recipe associations
                  </td>
                  <td className="px-4 py-3">Meal planning functionality</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Shopping Lists</td>
                  <td className="px-4 py-3">
                    Item names, descriptions, completion status
                  </td>
                  <td className="px-4 py-3">Shopping list management</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Body Metrics (Pro only)</td>
                  <td className="px-4 py-3">
                    Weight, body fat percentage, activity level, fitness goals
                  </td>
                  <td className="px-4 py-3">Advanced macro calculation</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Support Data</td>
                  <td className="px-4 py-3">
                    Bug reports (with optional screenshots), feature requests,
                    feedback messages
                  </td>
                  <td className="px-4 py-3">
                    App improvement and customer support
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="">
            2.2 Information Collected Automatically
          </h3>
          <div className="overflow-x-auto mb-8">
            <table className="">
              <thead>
                <tr className="">
                  <th className="">
                    Data Category
                  </th>
                  <th className="">
                    Specific Data
                  </th>
                  <th className="">
                    Purpose
                  </th>
                </tr>
              </thead>
              <tbody className="">
                <tr>
                  <td className="px-4 py-3">Device Information</td>
                  <td className="px-4 py-3">
                    Device type, operating system, app version
                  </td>
                  <td className="px-4 py-3">Compatibility and debugging</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Usage Analytics</td>
                  <td className="px-4 py-3">
                    Screen views, feature usage patterns, session duration
                  </td>
                  <td className="px-4 py-3">
                    App improvement and UX optimization
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Authentication Tokens</td>
                  <td className="px-4 py-3">
                    JWT tokens (stored locally on device)
                  </td>
                  <td className="px-4 py-3">
                    Session management and API authentication
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">IP Address</td>
                  <td className="px-4 py-3">
                    Client IP address (from API requests)
                  </td>
                  <td className="px-4 py-3">
                    Rate limiting, security, and fraud prevention
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="">
            2.3 Information from Third-Party Services
          </h3>
          <div className="overflow-x-auto">
            <table className="">
              <thead>
                <tr className="">
                  <th className="">
                    Source
                  </th>
                  <th className="">
                    Data Received
                  </th>
                  <th className="">
                    Purpose
                  </th>
                </tr>
              </thead>
              <tbody className="">
                <tr>
                  <td className="px-4 py-3">Google Sign-In</td>
                  <td className="px-4 py-3">
                    Google account email, display name, profile photo URL
                  </td>
                  <td className="px-4 py-3">Account authentication</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Apple Sign-In</td>
                  <td className="px-4 py-3">
                    Apple ID email (may be relay address), display name
                  </td>
                  <td className="px-4 py-3">Account authentication</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Twilio</td>
                  <td className="px-4 py-3">SMS delivery status</td>
                  <td className="px-4 py-3">OTP verification confirmation</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">RevenueCat</td>
                  <td className="px-4 py-3">
                    Subscription status, entitlements, purchase receipts
                  </td>
                  <td className="px-4 py-3">Pro subscription management</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">USDA FoodData Central</td>
                  <td className="px-4 py-3">
                    Nutritional information for food items
                  </td>
                  <td className="px-4 py-3">Item detail auto-population</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">OpenFoodFacts</td>
                  <td className="px-4 py-3">
                    Product name, brand, nutritional data from barcode
                  </td>
                  <td className="px-4 py-3">Barcode scanning feature</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="">
            3. How We Use Your Information
          </h2>

          <h3 className="">
            3.1 Core App Functionality
          </h3>
          <ul className="list-disc list-inside mb-6 space-y-1 leading-relaxed">
            <li>Creating and managing your user account.</li>
            <li>
              Storing and organizing your pantry items, meal plans, and shopping
              lists.
            </li>
            <li>Tracking expiry dates and sending freshness alerts.</li>
            <li>
              Providing barcode lookup and image-based item recognition.
            </li>
          </ul>

          <h3 className="">
            3.2 AI-Powered Features
          </h3>
          <ul className="list-disc list-inside mb-6 space-y-2 leading-relaxed">
            <li>
              <strong className="">Recipe Suggestions:</strong> Your
              pantry items (names and master ingredient IDs) are sent to our AI
              service to generate personalized recipe recommendations. Your
              dietary preferences and lifestyle goals are used as search filters.
            </li>
            <li>
              <strong className="">Semantic Search:</strong> Pantry
              item names are converted into vector embeddings (numerical
              representations) using Google Gemini AI to enable intelligent
              ingredient matching against our recipe database.
            </li>
            <li>
              <strong className="">Health Insights:</strong> Aggregated
              pantry composition data (categories and nutritional profiles) is
              analyzed by Google Gemini AI to generate personalized health
              recommendations.
            </li>
            <li>
              <strong className="">Image Recognition:</strong> Photos
              you take of food items are processed by Google Gemini AI to extract
              ingredient details. The image is uploaded to Supabase storage and
              the URL is stored with your pantry item.
            </li>
            <li>
              <strong className="">Macro Calculation:</strong> If you
              use the Advanced Macros feature, your weight, body fat percentage,
              and activity level are processed locally on our servers using the
              Katch-McArdle formula. This data is used solely for calculating
              your personalized macronutrient targets.
            </li>
          </ul>

          <h3 className="">
            3.3 Security and Fraud Prevention
          </h3>
          <ul className="list-disc list-inside mb-6 space-y-1 leading-relaxed">
            <li>SMS OTP verification to protect your account.</li>
            <li>
              Rate limiting API requests (per IP and per authenticated user) to
              prevent abuse.
            </li>
            <li>
              Cloud Armor WAF protection to block malicious traffic.
            </li>
            <li>JWT token-based authentication for all API calls.</li>
          </ul>

          <h3 className="">
            3.4 App Improvement
          </h3>
          <ul className="list-disc list-inside mb-6 space-y-1 leading-relaxed">
            <li>
              Analyzing usage patterns to improve features and UX.
            </li>
            <li>Reviewing bug reports and feedback to fix issues.</li>
            <li>Monitoring error logs for system stability.</li>
          </ul>

          <h3 className="">
            3.5 Communications
          </h3>
          <ul className="list-disc list-inside mb-6 space-y-1 leading-relaxed">
            <li>
              Sending OTP codes via SMS for account verification (via Twilio).
            </li>
            <li>
              In-app notifications about expiring items (if enabled by you).
            </li>
            <li>
              We do not send marketing emails or promotional SMS messages.
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="">
            4. Data Storage and Security
          </h2>

          <h3 className="">
            4.1 Where Your Data Is Stored
          </h3>
          <div className="overflow-x-auto mb-8">
            <table className="">
              <thead>
                <tr className="">
                  <th className="">
                    Data Type
                  </th>
                  <th className="">
                    Storage Location
                  </th>
                  <th className="">
                    Provider
                  </th>
                </tr>
              </thead>
              <tbody className="">
                <tr>
                  <td className="px-4 py-3">
                    User accounts, pantry items, meal plans, shopping lists,
                    recipes
                  </td>
                  <td className="px-4 py-3">PostgreSQL database</td>
                  <td className="px-4 py-3">Supabase (AWS us-east-1)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    Item photos and avatar images
                  </td>
                  <td className="px-4 py-3">
                    Object storage (S3-compatible)
                  </td>
                  <td className="px-4 py-3">Supabase Storage</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    Vector embeddings (for AI search)
                  </td>
                  <td className="px-4 py-3">
                    PostgreSQL with pgvector extension
                  </td>
                  <td className="px-4 py-3">Supabase</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Application backend</td>
                  <td className="px-4 py-3">
                    Google Cloud Platform (us-central1, Iowa)
                  </td>
                  <td className="px-4 py-3">Google Cloud GKE</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="">
            4.2 Security Measures
          </h3>
          <p className="">
            We implement the following security measures to protect your data:
          </p>
          <ul className="list-disc list-inside mb-8 space-y-2 leading-relaxed">
            <li>
              <strong className="">Encryption in Transit:</strong> All
              API communication uses TLS 1.2+ encryption (enforced via Google
              Cloud SSL policy).
            </li>
            <li>
              <strong className="">Encryption at Rest:</strong>{" "}
              Database storage is encrypted at rest by Supabase (AES-256).
            </li>
            <li>
              <strong className="">Authentication:</strong> JWT
              (HS512) token-based authentication for all API endpoints.
            </li>
            <li>
              <strong className="">Rate Limiting:</strong> Three-layer
              rate limiting architecture: Cloud Armor WAF: 100 requests/minute
              per IP (global), 5 requests/minute for OTP endpoints.
              Application-level: 120 requests/minute per authenticated user, 30
              requests/minute per anonymous IP.
            </li>
            <li>
              <strong className="">Non-Root Containers:</strong> All
              backend services run as non-root users in Docker containers.
            </li>
            <li>
              <strong className="">Password Hashing:</strong> Account
              passwords (where applicable) are hashed using BCrypt.
            </li>
            <li>
              <strong className="">
                Database Role Separation:
              </strong>{" "}
              The application connects to the database using a restricted role
              (pantrypilot_app) with only the permissions necessary for
              operation.
            </li>
            <li>
              <strong className="">Secret Management:</strong> All
              sensitive credentials (API keys, database passwords, JWT secrets)
              are stored as Kubernetes secrets and injected as environment
              variables — never hardcoded in source code or Docker images.
            </li>
            <li>
              <strong className="">HSTS:</strong> HTTP Strict
              Transport Security headers are enforced with a 1-year max-age.
            </li>
          </ul>

          <h3 className="">
            4.3 Data Retention
          </h3>
          <div className="overflow-x-auto">
            <table className="">
              <thead>
                <tr className="">
                  <th className="">
                    Data Type
                  </th>
                  <th className="">
                    Retention Period
                  </th>
                </tr>
              </thead>
              <tbody className="">
                <tr>
                  <td className="px-4 py-3">Active account data</td>
                  <td className="px-4 py-3">
                    Retained while your account is active
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Deleted account data</td>
                  <td className="px-4 py-3">
                    Permanently deleted within 30 days of account deletion
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Activity history</td>
                  <td className="px-4 py-3">
                    Retained for the lifetime of the account
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    Shopping list (completed items)
                  </td>
                  <td className="px-4 py-3">
                    Visible for 24 hours after completion, then hidden from view
                    (data retained in database)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    Server logs and error logs
                  </td>
                  <td className="px-4 py-3">
                    Retained for 90 days, then automatically deleted
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">OTP codes</td>
                  <td className="px-4 py-3">
                    Expire after 10 minutes, deleted after verification
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="">
            5. Data Sharing and Disclosure
          </h2>

          <h3 className="">
            5.1 We Do NOT Sell Your Data
          </h3>
          <p className="mb-6 leading-relaxed">
            PantryPilot does not sell, rent, or trade your personal information
            to third parties for marketing or advertising purposes.
          </p>

          <h3 className="">
            5.2 Third-Party Service Providers
          </h3>
          <p className="">
            We share limited data with the following service providers, solely
            for the purpose of delivering the App&apos;s functionality:
          </p>
          <div className="overflow-x-auto mb-8">
            <table className="">
              <thead>
                <tr className="">
                  <th className="">
                    Provider
                  </th>
                  <th className="">
                    Data Shared
                  </th>
                  <th className="">
                    Purpose
                  </th>
                </tr>
              </thead>
              <tbody className="">
                <tr>
                  <td className="px-4 py-3">Supabase</td>
                  <td className="px-4 py-3">
                    All user data (stored in their infrastructure)
                  </td>
                  <td className="px-4 py-3">
                    Database hosting, storage, and auth
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Google Cloud</td>
                  <td className="px-4 py-3">API traffic and server logs</td>
                  <td className="px-4 py-3">
                    Backend hosting and infrastructure
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Google Gemini AI</td>
                  <td className="px-4 py-3">
                    Pantry item names, recipe queries, food images (for AI
                    features only)
                  </td>
                  <td className="px-4 py-3">
                    AI processing for suggestions, search, and insights
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Twilio</td>
                  <td className="px-4 py-3">
                    Phone number (for OTP delivery only)
                  </td>
                  <td className="px-4 py-3">SMS OTP verification</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">RevenueCat</td>
                  <td className="px-4 py-3">User ID, subscription status</td>
                  <td className="px-4 py-3">Subscription management</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Apple</td>
                  <td className="px-4 py-3">
                    Apple ID credentials (during sign-in)
                  </td>
                  <td className="px-4 py-3">Authentication</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Google</td>
                  <td className="px-4 py-3">
                    Google account credentials (during sign-in)
                  </td>
                  <td className="px-4 py-3">Authentication</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="">
            5.3 Legal Requirements
          </h3>
          <p className="mb-6 leading-relaxed">
            We may disclose your information if required by law, regulation,
            legal process, or governmental request, or to protect the rights,
            property, or safety of PantryPilot, our users, or the public.
          </p>

          <h3 className="">
            5.4 Business Transfers
          </h3>
          <p className="">
            In the event of a merger, acquisition, or sale of assets, your data
            may be transferred as part of the transaction. We will notify you
            before your data becomes subject to a different privacy policy.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="">
            6. Your Rights and Choices
          </h2>

          <h3 className="">
            6.1 Access and Portability
          </h3>
          <p className="mb-2 leading-relaxed">You have the right to:</p>
          <ul className="list-disc list-inside mb-6 space-y-1 leading-relaxed">
            <li>
              View all your personal data within the App (profile, pantry items,
              meal plans, etc.).
            </li>
            <li>
              Request a copy of your data by contacting us at{" "}
              <a
                href={`mailto:${privacyEmail}`}
                className="text-emerald-400 hover:text-emerald-300"
              >
                {privacyEmail}
              </a>
              .
            </li>
          </ul>

          <h3 className="">
            6.2 Correction
          </h3>
          <p className="mb-2 leading-relaxed">
            You can update your personal information at any time through:
          </p>
          <ul className="list-disc list-inside mb-6 space-y-1 leading-relaxed">
            <li>Profile editing in Settings &rarr; Edit Profile.</li>
            <li>Pantry item editing by tapping on any item.</li>
            <li>Dietary preferences in Settings &rarr; Dietary Preferences.</li>
          </ul>

          <h3 className="">
            6.3 Deletion
          </h3>
          <p className="mb-2 leading-relaxed">
            You can request deletion of your account and all associated data by:
          </p>
          <ul className="list-disc list-inside mb-6 space-y-1 leading-relaxed">
            <li>
              Contacting us at{" "}
              <a
                href={`mailto:${privacyEmail}`}
                className="text-emerald-400 hover:text-emerald-300"
              >
                {privacyEmail}
              </a>
              .
            </li>
            <li>
              We will process deletion requests within 30 days.
            </li>
          </ul>

          <h3 className="">
            6.4 Opt-Out Choices
          </h3>
          <div className="overflow-x-auto mb-8">
            <table className="">
              <thead>
                <tr className="">
                  <th className="">
                    Feature
                  </th>
                  <th className="">
                    How to Opt Out
                  </th>
                </tr>
              </thead>
              <tbody className="">
                <tr>
                  <td className="px-4 py-3">Push notifications</td>
                  <td className="px-4 py-3">
                    Device Settings &rarr; PantryPilot &rarr; Notifications
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">AI-powered features</td>
                  <td className="px-4 py-3">
                    Do not subscribe to Pro (AI features are Pro-only)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Image uploads</td>
                  <td className="px-4 py-3">
                    Do not use the camera/photo feature when adding items
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Barcode scanning</td>
                  <td className="px-4 py-3">
                    Do not use the barcode scanner; add items manually
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Phone number auth</td>
                  <td className="px-4 py-3">
                    Use Google Sign-In or Apple Sign-In instead
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="">
            6.5 California Privacy Rights (CCPA)
          </h3>
          <p className="mb-2 leading-relaxed">
            If you are a California resident, you have additional rights under
            the California Consumer Privacy Act:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1 leading-relaxed">
            <li>
              <strong className="">Right to Know:</strong> You may
              request what personal information we collect, use, and disclose.
            </li>
            <li>
              <strong className="">Right to Delete:</strong> You may
              request deletion of your personal information.
            </li>
            <li>
              <strong className="">
                Right to Non-Discrimination:
              </strong>{" "}
              We will not discriminate against you for exercising your CCPA
              rights.
            </li>
            <li>
              <strong className="">
                No Sale of Personal Information:
              </strong>{" "}
              We do not sell personal information.
            </li>
          </ul>
          <p className="mb-8 leading-relaxed">
            To exercise CCPA rights, contact us at{" "}
            <a
              href={`mailto:${privacyEmail}`}
              className="text-emerald-400 hover:text-emerald-300"
            >
              {privacyEmail}
            </a>
            .
          </p>

          <h3 className="">
            6.6 EU/EEA Privacy Rights (GDPR)
          </h3>
          <p className="mb-2 leading-relaxed">
            If you are in the European Economic Area, you have additional
            rights:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1 leading-relaxed">
            <li>
              <strong className="">Right of Access:</strong> Request a
              copy of your data.
            </li>
            <li>
              <strong className="">Right to Rectification:</strong>{" "}
              Correct inaccurate data.
            </li>
            <li>
              <strong className="">Right to Erasure:</strong> Request
              deletion of your data.
            </li>
            <li>
              <strong className="">
                Right to Restrict Processing:
              </strong>{" "}
              Limit how we use your data.
            </li>
            <li>
              <strong className="">
                Right to Data Portability:
              </strong>{" "}
              Receive your data in a machine-readable format.
            </li>
            <li>
              <strong className="">Right to Object:</strong> Object to
              processing based on legitimate interests.
            </li>
            <li>
              <strong className="">
                Right to Withdraw Consent:
              </strong>{" "}
              Withdraw consent at any time.
            </li>
          </ul>
          <p className="">
            To exercise GDPR rights, contact us at{" "}
            <a
              href={`mailto:${privacyEmail}`}
              className="text-emerald-400 hover:text-emerald-300"
            >
              {privacyEmail}
            </a>
            .
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="">
            7. Children&apos;s Privacy
          </h2>
          <p className="">
            PantryPilot is not intended for children under the age of 13. We do
            not knowingly collect personal information from children under 13. If
            we discover that we have collected data from a child under 13, we
            will delete that data promptly. If you believe a child under 13 has
            provided us with personal information, please contact us at{" "}
            <a
              href={`mailto:${privacyEmail}`}
              className="text-emerald-400 hover:text-emerald-300"
            >
              {privacyEmail}
            </a>
            .
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="">
            8. Cookies and Tracking
          </h2>
          <p className="">
            PantryPilot is a native mobile application and does not use browser
            cookies. We do not use any third-party advertising trackers,
            analytics SDKs (such as Google Analytics or Firebase Analytics), or
            behavioral tracking tools.
          </p>
        </section>

        {/* Section 9 */}
        <section>
          <h2 className="">
            9. International Data Transfers
          </h2>
          <p className="">
            Your data may be processed in the United States (where our servers
            are hosted). If you are located outside the United States, your data
            will be transferred to and processed in the U.S. By using the App,
            you consent to this transfer. We ensure that appropriate safeguards
            are in place to protect your data in compliance with applicable data
            protection laws.
          </p>
        </section>

        {/* Section 10 */}
        <section>
          <h2 className="">
            10. Changes to This Privacy Policy
          </h2>
          <p className="">
            We may update this Privacy Policy from time to time. When we make
            material changes:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1 leading-relaxed">
            <li>
              We will update the &ldquo;Last Updated&rdquo; date at the top.
            </li>
            <li>We may notify you via in-app notification.</li>
            <li>
              Your continued use of the App after changes constitutes acceptance
              of the revised policy.
            </li>
          </ul>
          <p className="">
            We encourage you to review this Privacy Policy periodically.
          </p>
        </section>

        {/* Section 11 */}
        <section>
          <h2 className="">
            11. Contact Us
          </h2>
          <p className="">
            For any privacy-related questions, concerns, or requests, please
            contact us:
          </p>
          <ul className="list-disc list-inside mb-8 space-y-1 leading-relaxed">
            <li>
              Privacy Email:{" "}
              <a
                href={`mailto:${privacyEmail}`}
                className="text-emerald-400 hover:text-emerald-300"
              >
                {privacyEmail}
              </a>
            </li>
            <li>
              General Support:{" "}
              <a
                href={`mailto:${supportEmail}`}
                className="text-emerald-400 hover:text-emerald-300"
              >
                {supportEmail}
              </a>
            </li>
            <li>In-App: Settings &rarr; Support &rarr; Send Feedback</li>
          </ul>
        </section>

        </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
