import type { Metadata } from "next";
import MyStoryPageClient from "./MyStoryPageClient";

export const metadata: Metadata = {
  title: "My Story",
  description:
    "The personal journey of Samuel Kobina Gyasi — from Ghana to Morocco, and the experiences that shaped a leader, scholar, and facilitator.",
  alternates: { canonical: "/my-story" },
  openGraph: {
    title: "My Story | Samuel Kobina Gyasi",
    description:
      "The personal journey of Samuel Kobina Gyasi — from Ghana to Morocco, and the experiences that shaped a leader, scholar, and facilitator.",
    url: "/my-story",
  },
};

export default function MyStoryPage() {
  return <MyStoryPageClient />;
}
