// app/metadata.ts   ← NEW FILE (Server Component)
import type { Metadata } from "next";

const SITE_NAME = "PlovRean Academy";
const DESCRIPTION =
  "Learn programming, web development, and design with professional. Start your journey today!";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://plovrean.vercel.app";
const OG_IMAGE = `${SITE_URL}/linkshow.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: "derlearn, khmer courses, programming, react, nextjs, supabase, elearning cambodia",
  authors: [{ name: "TEAM ISTAD" }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: { index: true, follow: true },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#6366f1",

  // Open Graph / Facebook
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};