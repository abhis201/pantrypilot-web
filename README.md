# PantryPilot Web

This is the public marketing website for PantryPilot, the AI-powered pantry and meal-planning app built for people who want to reduce food waste, simplify meal decisions, and stay on top of nutrition.

The site is a Next.js App Router project focused on product storytelling, conversion, waitlist capture, and the legal/support pages that the app links to.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Resend

## What this project does

- Hosts the landing page for PantryPilot
- Explains the app’s value proposition and core features
- Promotes iOS and Android download actions
- Captures waitlist signups
- Includes contact, privacy, and terms pages
- Generates sitemap, robots, and Open Graph metadata

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Useful scripts

```bash
npm run dev      # start the app in development mode
npm run build    # production build
npm start        # run the built app locally
npm run lint     # lint the project
npx tsc --noEmit # TypeScript check without building
```

## Environment variables

Create a `.env.local` file in this folder and add the required values.

### Required server variables

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Authentication for waitlist and contact email sending |
| `RESEND_SEGMENT_ID` | Resend audience used for waitlist signups |
| `ADMIN_NOTIFICATION_EMAIL` | Email address that receives inbound form submissions |

### Required public variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used in metadata, sitemap, and robots |
| `NEXT_PUBLIC_IOS_DOWNLOAD_LINK` | App Store link for the iOS CTA |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Public support address |
| `NEXT_PUBLIC_PRIVACY_EMAIL` | Privacy contact address |

### Optional public variable

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_ANDROID_DOWNLOAD_LINK` | Android download link. If empty, the Android CTA falls back to a coming-soon state. |

All environment access is centralized in `src/lib/site.ts`. Use that file as the single source of truth instead of reading `process.env` directly in components.

## Project structure

```text
.
├─ public/
│  ├─ decor/
│  ├─ fonts/
│  ├─ screens/
│  └─ videos/
├─ src/
│  ├─ actions/
│  │  └─ subscribe.ts
│  ├─ app/
│  │  ├─ api/
│  │  ├─ contact/
│  │  ├─ privacy/
│  │  ├─ terms/
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ not-found.tsx
│  │  ├─ opengraph-image.tsx
│  │  ├─ page.tsx
│  │  ├─ robots.ts
│  │  └─ sitemap.ts
│  ├─ components/
│  └─ lib/
│     ├─ mail.ts
│     └─ site.ts
├─ docs/
├─ AGENTS.md
├─ eslint.config.mjs
├─ next.config.ts
├─ package.json
├─ postcss.config.mjs
├─ tsconfig.json
├─ README.md
└─ .gitignore
```

## Key app flow

The homepage composes the full marketing experience in `src/app/page.tsx`, including:

- Navbar
- Hero
- Feature blocks
- Pantry and meal-planning screens
- Founder/about section
- Pricing
- FAQ
- Closing CTA
- Footer

## Deployment notes

This site is intended to deploy to Vercel as a standard Next.js app.

Before going live:

1. Set the root directory to `web/` in your hosting provider.
2. Add all required environment variables.
3. Ensure `NEXT_PUBLIC_SITE_URL` matches the production domain exactly.
4. Verify sitemap generation and Open Graph metadata after deployment.

## Related documentation

- `../docs/website.md` — website structure and content overview
- `../docs/app-screens.md` — app screens and product references
- `../docs/design-system.md` — design tokens and styling conventions
- `AGENTS.md` — project-specific notes and working guidance
