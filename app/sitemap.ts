import type { MetadataRoute } from "next";
import { createAnonClient } from "@/lib/supabase/anon";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://samuelgyasi.com";

const staticRoutes = [
  "",
  "/leadership",
  "/intellectuality",
  "/transformation",
  "/my-story",
  "/group-intelligence-facilitator",
  "/blog",
  "/leadership/blog",
  "/intellectuality/blog",
  "/transformation/blog",
  "/privacy-policy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  try {
    const supabase = createAnonClient();
    const { data } = await supabase
      .from("main_blog_posts")
      .select("slug, category, created_at")
      .eq("published", true);

    const postEntries: MetadataRoute.Sitemap = (data ?? []).map((post) => ({
      url: `${siteUrl}/${post.category}/blog/${post.slug}`,
      lastModified: new Date(post.created_at),
    }));

    return [...staticEntries, ...postEntries];
  } catch {
    return staticEntries;
  }
}
