import type { Metadata } from "next";
import GroupIntelligenceFacilitatorPageClient from "./GroupIntelligenceFacilitatorPageClient";

export const metadata: Metadata = {
  title: "Group Intelligence Facilitator",
  description:
    "Samuel Kobina Gyasi facilitates collective intelligence — helping groups think, decide, and act with more clarity and shared ownership.",
  alternates: { canonical: "/group-intelligence-facilitator" },
  openGraph: {
    title: "Group Intelligence Facilitator | Samuel Kobina Gyasi",
    description:
      "Samuel Kobina Gyasi facilitates collective intelligence — helping groups think, decide, and act with more clarity and shared ownership.",
    url: "/group-intelligence-facilitator",
  },
};

export default function GroupIntelligenceFacilitatorPage() {
  return <GroupIntelligenceFacilitatorPageClient />;
}
