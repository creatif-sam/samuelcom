import type { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writings on leadership, intellectuality, and transformation by Samuel Kobina Gyasi.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Samuel Kobina Gyasi",
    description: "Writings on leadership, intellectuality, and transformation by Samuel Kobina Gyasi.",
    url: "/blog",
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
