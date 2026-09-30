import Image from "next/image";
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

const CAT_MAP: Record<string, { label: string; color: string }> = {
  leadership: { label: "Leadership", color: "#d4a843" },
  intellectuality: { label: "Intellectuality", color: "#5b9ef9" },
  transformation: { label: "Transformation", color: "#e05757" },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

async function getLatestPosts(): Promise<BlogPost[]> {
  try {
    const db = createAnonClient();
    const { data, error } = await db
      .from("main_blog_posts")
      .select("id, title, slug, category, excerpt, created_at, read_time_minutes, featured_image_url")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(2);

    if (error) console.error("Failed to fetch blog posts:", error);
    return data ?? [];
  } catch (err) {
    console.error("Failed to fetch blog posts:", err);
    return [];
  }
}

export async function LatestBlogsSection() {
  const posts = await getLatestPosts();

  // Hide the section rather than show placeholder posts that link nowhere
  if (posts.length === 0) return null;

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
                {post.featured_image_url && (
                  <div className="lbs-card-img">
                    <Image
                      src={post.featured_image_url}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
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
