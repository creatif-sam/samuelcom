import type { Metadata } from "next";
import { createAnonClient } from "@/lib/supabase/anon";
import BlogPageClient from "./BlogPageClient";
import type { Post } from "./_blog-types";

export const revalidate = 300;

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

async function getPosts(): Promise<Post[]> {
  try {
    const sb = createAnonClient();
    const { data, error } = await sb
      .from("main_blog_posts")
      .select("id, title, slug, category, excerpt, created_at, read_time_minutes, featured_image_url")
      .eq("published", true)
      .order("created_at", { ascending: false });
    if (error) console.error("Failed to fetch blog posts:", error);
    return data ?? [];
  } catch (err) {
    console.error("Failed to fetch blog posts:", err);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();
  return <BlogPageClient posts={posts} />;
}
