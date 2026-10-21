import type { Metadata } from "next";
import LeadershipPageClient from "./LeadershipPageClient";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Insights on servant leadership, authority, and building institutions that outlast their founders. By Samuel Kobina Gyasi.",
  alternates: { canonical: "/leadership" },
  openGraph: {
    title: "Leadership | Samuel Kobina Gyasi",
    description:
      "Insights on servant leadership, authority, and building institutions that outlast their founders.",
    url: "/leadership",
  },
};

export default function LeadershipPage() {
  return <LeadershipPageClient />;
}
