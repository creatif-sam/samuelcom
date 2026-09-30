"use client";

import { useState } from "react";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import { Navbar } from "@/components/organisms/Navbar";
import { Post, CAT_META, PAGE_SIZE } from "./_blog-types";
import { FeaturedPost } from "./_FeaturedPost";
import { PostCard } from "./_PostCard";

const FILTERS = ["all", ...Object.keys(CAT_META)];

export default function BlogPageClient({ posts }: { posts: Post[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [category, setCategory] = useState("all");

  // The newest post stays featured; the filter applies to the grid below it
  const featured = posts[0];
  const rest = posts.slice(1).filter((p) => category === "all" || p.category === category);
  const recent = rest.slice(0, visible);
  const hasMore = visible < rest.length;

  const selectCategory = (cat: string) => {
    setCategory(cat);
    setVisible(PAGE_SIZE);
  };

  return (
    <div className="blgp">
      <Navbar />

      {featured && <FeaturedPost post={featured} />}

      <div className="blgp-main">
        <div className="blgp-main-header">
          <h2 className="blgp-section-title">Recent blog posts</h2>
          <div className="blgp-filters" role="group" aria-label="Filter posts by category">
            {FILTERS.map((cat) => (
              <button
                key={cat}
                className={`blgp-filter ${category === cat ? "blgp-filter--active" : ""}`}
                aria-pressed={category === cat}
                onClick={() => selectCategory(cat)}
              >
                {cat === "all" ? "All" : CAT_META[cat].label}
              </button>
            ))}
          </div>
        </div>

        {recent.length > 0 ? (
          <div className="blgp-grid">
            {recent.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="blgp-empty">
            {posts.length === 0 ? "No posts yet — check back soon." : "No more posts in this category yet."}
          </div>
        )}

        {hasMore && (
          <div className="blgp-load-row">
            <button className="blgp-load-btn" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
              Load more posts
            </button>
          </div>
        )}
      </div>

      <SiteFooter />
    </div>
  );
}
