"use client";

import { useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import { Navbar } from "@/components/organisms/Navbar";
import { Post, CAT_META, PAGE_SIZE } from "./_blog-types";
import { FeaturedPost } from "./_FeaturedPost";
import { PostCard } from "./_PostCard";

const FILTERS = ["all", ...Object.keys(CAT_META)];

export default function BlogPageClient({ posts }: { posts: Post[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const q = query.trim().toLowerCase();
  const matches = (p: Post) =>
    !q ||
    [p.title, p.excerpt ?? "", CAT_META[p.category]?.label ?? p.category]
      .some((field) => field.toLowerCase().includes(q));

  // The newest post stays featured; while searching, it joins the results instead
  const featured = q ? undefined : posts[0];
  const rest = (q ? posts : posts.slice(1)).filter(
    (p) => (category === "all" || p.category === category) && matches(p)
  );
  const recent = rest.slice(0, visible);
  const hasMore = visible < rest.length;

  const selectCategory = (cat: string) => {
    setCategory(cat);
    setVisible(PAGE_SIZE);
  };

  const updateQuery = (value: string) => {
    setQuery(value);
    setVisible(PAGE_SIZE);
  };

  return (
    <div className="blgp">
      <Navbar />

      {featured && <FeaturedPost post={featured} />}

      <div className="blgp-main">
        <div className="blgp-main-header">
          <h2 className="blgp-section-title">
            {q ? `${rest.length} result${rest.length === 1 ? "" : "s"} for “${query.trim()}”` : "Recent blog posts"}
          </h2>
          <form className="blgp-search" role="search" onSubmit={(e) => { e.preventDefault(); searchRef.current?.blur(); }}>
            <Search size={16} className="blgp-search-icon" aria-hidden="true" />
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(e) => updateQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Escape") updateQuery(""); }}
              placeholder="Search posts…"
              aria-label="Search blog posts"
              className="blgp-search-input"
            />
            {query && (
              <button type="button" className="blgp-search-clear" onClick={() => { updateQuery(""); searchRef.current?.focus(); }} aria-label="Clear search">
                <X size={14} />
              </button>
            )}
          </form>
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
            {posts.length === 0
              ? "No posts yet. Check back soon."
              : q
                ? `No posts match “${query.trim()}”. Try another word or category.`
                : "No more posts in this category yet."}
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
