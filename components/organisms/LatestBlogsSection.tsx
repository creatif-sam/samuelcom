"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createAnonClient } from "@/lib/supabase/anon";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string | null;
  created_at: string;
  read_time_minutes: number;
  featured_image_url: string | null;
}

const SAMPLE_POSTS: BlogPost[] = [
  {
    id: "s2",
    title: "Fifteen Years of Leading: What No One Taught Me",
    slug: "fifteen-years-of-leading",
    category: "leadership",
    excerpt: "A personal inventory of hard-won lessons — from Class Prefect to Consortium President — about what leadership actually costs and what it gives back.",
    created_at: "2026-02-10",
    read_time_minutes: 6,
    featured_image_url: null,
  },
  {
    id: "s3",
    title: "SARIMAX and Systems: Forecasting & Uncertainty",
    slug: "sarimax-and-systems",
    category: "intellectuality",
    excerpt: "While modelling irradiation data in Benguerrir, Samuel found unexpected parallels between statistical confidence intervals and the nature of strategic planning.",
    created_at: "2026-01-22",
    read_time_minutes: 5,
    featured_image_url: null,
  },
];

const CAT_MAP: Record<string, { label: string; color: string }> = {
  leadership: { label: "Leadership", color: "#d4a843" },
  intellectuality: { label: "Intellectuality", color: "#5b9ef9" },
  transformation: { label: "Transformation", color: "#e05757" },
};

export function LatestBlogsSection() {
  const [posts, setPosts] = useState<BlogPost[]>(SAMPLE_POSTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const db = createAnonClient();
        const { data, error } = await db
          .from("blog_posts")
          .select("*")
          .eq("published", true)
          .order("created_at", { ascending: false })
          .limit(2);

        if (!error && data && data.length > 0) {
          setPosts(data);
        }
      } catch (err) {
        console.error("Failed to fetch blog posts:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className="latest-blogs-section">
      <div className="lbs-container">
        <div className="lbs-header">
          <h2 className="lbs-title">Latest from the Blog</h2>
          <Link href="/blog" className="lbs-view-all">
            View All Posts →
          </Link>
        </div>

        <div className="lbs-grid">
          {posts.map((post) => {
            const cat = CAT_MAP[post.category] || { label: post.category, color: "#888" };
            return (
              <Link
                key={post.id}
                href={`/${post.category}/blog/${post.slug}`}
                className="lbs-card"
              >
                <div className="lbs-card-header">
                  <span className="lbs-category" style={{ color: cat.color }}>
                    {cat.label}
                  </span>
                  <span className="lbs-date">{formatDate(post.created_at)}</span>
                </div>
                <h3 className="lbs-card-title">{post.title}</h3>
                <p className="lbs-card-excerpt">{post.excerpt}</p>
                <div className="lbs-card-footer">
                  <span className="lbs-read-time">{post.read_time_minutes} min read</span>
                  <span className="lbs-read-more">Read More →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
