import type { Metadata } from "next";
import IntellectualityPageClient from "./IntellectualityPageClient";

export const metadata: Metadata = {
  title: "Intellectuality",
  description:
    "Essays on collective intelligence, scholarship, and the bridge between ancient wisdom and modern thought. By Samuel Kobina Gyasi.",
  alternates: { canonical: "/intellectuality" },
  openGraph: {
    title: "Intellectuality | Samuel Kobina Gyasi",
    description:
      "Essays on collective intelligence, scholarship, and the bridge between ancient wisdom and modern thought.",
    url: "/intellectuality",
  },
};

export default function IntellectualityPage() {
  return <IntellectualityPageClient />;
}
