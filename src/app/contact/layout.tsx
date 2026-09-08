import type { Metadata } from "next";

const DESCRIPTION =
  "Questions, feedback, or a bug to report? Get in touch with the KhanPaan team — we read every message.";

// contact/page.tsx is a Client Component and can't export metadata itself,
// so the route's metadata lives here.
export const metadata: Metadata = {
  title: "Contact",
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — KhanPaan",
    description: DESCRIPTION,
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
