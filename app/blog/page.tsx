"use client";

import { useEffect, useState, useCallback } from "react";
import { createAnonClient } from "@/lib/supabase/anon";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import { Navbar } from "@/components/organisms/Navbar";
import { Post, SAMPLE_POSTS, PAGE_SIZE } from "./_blog-types";
import { blogCss } from "./_blog-styles";
import { FeaturedPost } from "./_FeaturedPost";
import { PostCard } from "./_PostCard";

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>(SAMPLE_POSTS);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const load = useCallback(async () => {
    try {
      const sb = createAnonClient();
      const { data } = await sb
        .from("main_blog_posts")
        .select("id, title, slug, category, excerpt, created_at, read_time_minutes, featured_image_url")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (data && data.length > 0) setPosts(data);
    } catch { /* fallback to sample */ }
  }, []);

  useEffect(() => { load(); }, [load]);

  const featured = posts[0];
  const recent = posts.slice(1, 1 + visible);
  const hasMore = 1 + visible < posts.length;

  return (
    <div className="blgp">
      <style>{blogCss}</style>
      <Navbar />

      {featured && <FeaturedPost post={featured} />}

      <div className="blgp-main">
        <h2 className="blgp-section-title">Recent blog posts</h2>

        {recent.length > 0 ? (
          <div className="blgp-grid">
            {recent.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="blgp-empty">No posts found.</div>
        )}

        <div className="blgp-load-row">
          <button
            className="blgp-load-btn"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            disabled={!hasMore}
          >
            {hasMore ? "Load more posts" : "All posts loaded"}
          </button>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
