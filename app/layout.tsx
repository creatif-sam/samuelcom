import type { Metadata } from "next";
import { Ubuntu, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/components/organisms/CookieBanner";
import { Analytics } from "@/components/Analytics";
import { Providers } from "./providers";
import { Toaster } from "sonner";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://samuelgyasi.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Samuel Gyasi | Leadership · Intellectuality · Transformation",
    template: "%s | Samuel Kobina Gyasi",
  },
  description:
    "Samuel Kobina Gyasi, a leader, facilitator, and speaker dedicated to technology, leadership, collective intelligence, and transformative change.",
  keywords: [
    "Samuel Gyasi",
    "Samuel Kobina Gyasi",
    "Samuel K Gyasi",
    "Samuel Gyasi Ghana",
    "Samuel Gyasi leadership",
    "Samuel Gyasi technology",
    "Samuel Gyasi transformation",
    "Samuel Gyasi speaker",
    "Samuel Gyasi facilitator",
    "collective intelligence",
    "group intelligence facilitator",
    "data science leadership",
    "technology leader Ghana",
    "transformation consultant",
    "leadership development",
    "organizational transformation",
    "Ghanaian leader",
    "leadership intelligence transformation",
  ],
  authors: [{ name: "Samuel Kobina Gyasi", url: siteUrl }],
  creator: "Samuel Kobina Gyasi",
  publisher: "Samuel Kobina Gyasi",
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: siteUrl,
    siteName: "Samuel Kobina Gyasi",
    title: "Samuel Kobina Gyasi | Leadership · Intellectuality · Transformation",
    description:
      "Leader, Facilitator, and speaker dedicated to technology, leadership, collective intelligence, and transformative change.",
    firstName: "Samuel",
    lastName: "Gyasi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuel Kobina Gyasi",
    description: "Leader, Facilitator, and speaker dedicated to technology, leadership, collective intelligence, and transformative change.",
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: siteUrl },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Samuel Kobina Gyasi",
  alternateName: ["Samuel Gyasi", "Samuel K. Gyasi"],
  url: siteUrl,
  image: `${siteUrl}/photo-hero.png`,
  jobTitle: "Leader & Group Intelligence Facilitator",
  description:
    "Samuel Kobina Gyasi is a leader and group intelligence facilitator dedicated to technology, leadership, collective intelligence, and transformative impact.",
  nationality: { "@type": "Country", name: "Ghana" },
  sameAs: [
    "https://www.linkedin.com/in/samuel-k-gyasi/",
    "https://web.facebook.com/samuel.kobinagyasi/",
    "https://www.instagram.com/samuel_gsi",
    "https://www.tiktok.com/@samuel_gsi",
  ],
  knowsAbout: [
    "Technology",
    "Leadership",
    "Collective Intelligence",
    "Group Intelligence",
    "Transformation",
    "Intellectuality",
    "Data Science",
    "Community Development",
    "Organizational Development",
    "Facilitation",
    "Strategic Leadership",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${ubuntu.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>
          <Analytics />
          {children}
          <CookieBanner />
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  );
}


