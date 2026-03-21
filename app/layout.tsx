import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Space_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/organisms/CustomCursor";
import { CookieBanner } from "@/components/organisms/CookieBanner";
import { Analytics } from "@/components/Analytics";
import { Providers } from "./providers";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://samuelgyasi.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Samuel Gyasi — Technology · Leadership · Intelligence · Transformation",
    template: "%s | Samuel Kobina Gyasi",
  },
  description:
    "Samuel Kobina Gyasi — Leader, Facilitator, and speaker dedicated to technology, leadership, collective intelligence, and transformative change.",
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
    title: "Samuel Kobina Gyasi — Technology · Leadership · Intelligence · Transformation",
    description:
      "Leader, Facilitator, and speaker dedicated to technology, leadership, collective intelligence, and transformative change.",
    images: [
      {
        url: "/photo-hero.png",
        width: 1200,
        height: 630,
        alt: "Samuel Kobina Gyasi",
      },
    ],
    firstName: "Samuel",
    lastName: "Gyasi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuel Kobina Gyasi",
    description: "Leader, Facilitator, and speaker dedicated to technology, leadership, collective intelligence, and transformative change.",
    images: ["/photo-hero.png"],
    creator: "@samuel_gsi",
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
  jobTitle: "Scholar · Leader · Speaker",
  description:
    "Samuel Kobina Gyasi is a scholar, leader, and speaker dedicated to technology, leadership, collective intelligence, and transformative impact.",
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
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${playfair.variable} ${cormorant.variable} ${spaceMono.variable} ${poppins.variable}`}
      >
        <Providers>
          <CustomCursor />
          <Analytics />
          {children}
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}


