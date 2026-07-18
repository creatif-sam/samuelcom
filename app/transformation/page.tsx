import type { Metadata } from "next";
import TransformationPageClient from "./TransformationPageClient";

export const metadata: Metadata = {
  title: "Transformation",
  description:
    "Stories and reflections on personal and societal transformation — breaking cycles, becoming, and building what lasts. By Samuel Kobina Gyasi.",
  alternates: { canonical: "/transformation" },
  openGraph: {
    title: "Transformation | Samuel Kobina Gyasi",
    description:
      "Stories and reflections on personal and societal transformation — breaking cycles, becoming, and building what lasts.",
    url: "/transformation",
  },
};

export default function TransformationPage() {
  return <TransformationPageClient />;
}
