import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PantryPilot — Smart Pantry & Meal Management",
  description:
    "Track your pantry, plan meals with AI, reduce food waste, and eat smarter. Available on iOS and Android.",
  keywords: [
    "pantry management",
    "meal planner",
    "food waste",
    "AI recipes",
    "nutrition tracker",
  ],
  icons: {
    icon: "/logoIcon2.png",
    apple: "/logoIcon2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
