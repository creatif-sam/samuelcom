import type { Metadata } from "next";
import Link from "next/link";
import { createAnonClient } from "@/lib/supabase/anon";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import { Navbar } from "@/components/organisms/Navbar";

export const metadata: Metadata = {
  title: "Intellectuality — Blog",
  description:
    "Essays on collective intelligence, scholarship, and the bridge between ancient wisdom and modern thought. By Samuel Kobina Gyasi.",
};

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  created_at: string;
  read_time_minutes: number;
  featured_image_url: string | null;
}

const samplePosts: Post[] = [
  {
    id: "i1",
    title: "Collective Intelligence: When Community Thinks Together",
    slug: "collective-intelligence-community",
    excerpt:
      "The smartest thing an individual can do is create the conditions for a group to be smarter than any one of its members. This is the science — and the art — of collective intelligence.",
    created_at: "2026-02-22",
    read_time_minutes: 9,
    featured_image_url: null,
  },
  {
    id: "i2",
    title: "The Bridge Between Ancient Wisdom and Modern Technology",
    slug: "ancient-wisdom-modern-tech",
    excerpt:
      "African proverbs are not relics — they are compressed algorithms for collective decision-making. The question is whether we are listening closely enough.",
    created_at: "2026-02-05",
    read_time_minutes: 7,
    featured_image_url: null,
  },
  {
    id: "i3",
    title: "How Scholarship Shapes Character, Not Just Knowledge",
    slug: "scholarship-shapes-character",
    excerpt:
      "A university education is not primarily about information transfer. At its best, it is a formation process — a making of the person, not just the professional.",
    created_at: "2026-01-20",
    read_time_minutes: 6,
    featured_image_url: null,
  },
  {
    id: "i4",
    title: "Reading as a Spiritual Discipline",
    slug: "reading-spiritual-discipline",
    excerpt:
      "There are books that inform and books that transform. The discipline of deep reading — unhurried, annotating, returning — is one of the most undervalued practices of serious thinkers.",
    created_at: "2025-12-28",
    read_time_minutes: 5,
    featured_image_url: null,
  },
];

export default async function IntellectualityBlogPage() {
  let posts: Post[] = samplePosts;
  try {
    const supabase = createAnonClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, created_at, read_time_minutes, featured_image_url")
      .eq("category", "intellectuality")
      .eq("published", true)
      .order("created_at", { ascending: false });
    if (data && data.length > 0) posts = data;
  } catch { /* fallback */ }

  const [featured, ...rest] = posts;

  return (
    <>
      <style>{blogCss}</style>
      <Navbar />

      <main className="ib-page">
        {/* Breadcrumb */}
        <nav className="ib-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href="/intellectuality">Intellectuality</Link>
          <span>›</span>
          <span>Blog</span>
        </nav>

        {/* Page header */}
        <header className="ib-header">
          <div className="ib-eyebrow">Essays &amp; Thinking</div>
          <h1 className="ib-title">
            Ideas That <em>Matter</em>
          </h1>
          <p className="ib-subtitle">
            On collective intelligence, scholarship, and the relentless pursuit of understanding.
          </p>
        </header>

        {/* Posts */}
        <section className="ib-content">
          {posts.length === 0 ? (
            <p className="ib-empty">Essays coming soon — stay curious.</p>
          ) : (
            <>
              {/* Featured post */}
              {featured && (
                <Link href={`/intellectuality/blog/${featured.slug}`} className="ib-featured">
                  {featured.featured_image_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <div className="ib-featured-img">
                      <img src={featured.featured_image_url} alt={featured.title} />
                    </div>
                  )}
                  <div className="ib-featured-body">
                    <div className="ib-card-label">Intellectuality</div>
                    <h2 className="ib-featured-title">{featured.title}</h2>
                    {featured.excerpt && <p className="ib-featured-excerpt">{featured.excerpt}</p>}
                    <div className="ib-card-meta">
                      <span>{new Date(featured.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                      <span>·</span>
                      <span>{featured.read_time_minutes} min read</span>
                    </div>
                    <div className="ib-read-link">Read essay →</div>
                  </div>
                </Link>
              )}

              {/* Rest of posts grid */}
              {rest.length > 0 && (
                <div className="ib-grid">
                  {rest.map((post) => (
                    <Link key={post.id} href={`/intellectuality/blog/${post.slug}`} className="ib-card">
                      {post.featured_image_url && (
                        <div className="ib-card-img">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={post.featured_image_url} alt={post.title} />
                        </div>
                      )}
                      <div className="ib-card-body">
                        <div className="ib-card-label">Intellectuality</div>
                        <h2 className="ib-card-title">{post.title}</h2>
                        {post.excerpt && <p className="ib-card-excerpt">{post.excerpt}</p>}
                        <div className="ib-card-meta">
                          <span>{new Date(post.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                          <span>·</span>
                          <span>{post.read_time_minutes} min read</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

const blogCss = `
/* ── Intellectuality blog listing ──────────────────────────── */
.ib-page {
  --ink: #0a0908;
  --paper: #f4f1eb;
  --card-bg: #ffffff;
  --accent: #c0392b;
  --mid: #7a746a;
  --line: rgba(10,9,8,.1);
  background: var(--paper);
  color: var(--ink);
  min-height: 100vh;
  padding-top: 72px;
}

/* Breadcrumb */
.ib-breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 56px;
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--mid);
  border-bottom: 1px solid var(--line);
}
.ib-breadcrumb a { color: var(--mid); text-decoration: none; transition: color .25s; }
.ib-breadcrumb a:hover { color: var(--accent); }
.ib-breadcrumb span:last-child { color: var(--ink); }

/* Header */
.ib-header { padding: 64px 56px 48px; }
.ib-eyebrow {
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: .4em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 18px;
}
.ib-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(48px, 7vw, 96px);
  line-height: .95; color: var(--ink); margin: 0 0 22px;
  font-weight: 700;
}
.ib-title em { font-style: italic; color: var(--accent); display: inline; }
.ib-subtitle {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(16px, 1.8vw, 20px);
  font-style: italic; color: var(--mid);
  max-width: 520px; line-height: 1.65; font-weight: 300;
}

/* Content area */
.ib-content { padding: 0 56px 80px; display: flex; flex-direction: column; gap: 32px; }
.ib-empty { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-style: italic; color: var(--mid); padding: 60px 0; text-align: center; }

/* Featured card */
.ib-featured {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 360px;
  background: var(--card-bg);
  border: 1px solid var(--line);
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  color: var(--ink);
  box-shadow: 0 2px 20px rgba(10,9,8,.06);
  transition: box-shadow .3s, transform .3s;
}
.ib-featured:hover { box-shadow: 0 8px 40px rgba(10,9,8,.12); transform: translateY(-2px); }
.ib-featured-img { width: 100%; height: 100%; overflow: hidden; background: var(--line); }
.ib-featured-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s; }
.ib-featured:hover .ib-featured-img img { transform: scale(1.04); }
.ib-featured-body {
  padding: 44px 40px;
  display: flex; flex-direction: column; justify-content: center; gap: 14px;
}
.ib-featured-title { font-family: 'Playfair Display', serif; font-size: clamp(22px, 2.5vw, 32px); line-height: 1.15; color: var(--ink); }
.ib-featured-excerpt { font-family: 'Cormorant Garamond', serif; font-size: 16px; font-style: italic; color: var(--mid); line-height: 1.65; font-weight: 300; flex: 1; }
.ib-read-link { font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: var(--accent); margin-top: 4px; }

/* Card label & meta */
.ib-card-label { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: .3em; text-transform: uppercase; color: var(--accent); }
.ib-card-meta { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: .15em; text-transform: uppercase; color: var(--mid); display: flex; gap: 10px; flex-wrap: wrap; }

/* Grid cards */
.ib-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.ib-card {
  background: var(--card-bg);
  border: 1px solid var(--line);
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none;
  color: var(--ink);
  display: flex; flex-direction: column;
  box-shadow: 0 1px 12px rgba(10,9,8,.05);
  transition: box-shadow .3s, transform .3s;
}
.ib-card:hover { box-shadow: 0 6px 28px rgba(10,9,8,.1); transform: translateY(-3px); }
.ib-card-img { width: 100%; aspect-ratio: 16/9; overflow: hidden; background: var(--line); }
.ib-card-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s; }
.ib-card:hover .ib-card-img img { transform: scale(1.05); }
.ib-card-body { padding: 24px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
.ib-card-title { font-family: 'Playfair Display', serif; font-size: clamp(17px, 1.6vw, 21px); line-height: 1.2; color: var(--ink); }
.ib-card-excerpt { font-family: 'Cormorant Garamond', serif; font-size: 15px; font-style: italic; color: var(--mid); line-height: 1.6; font-weight: 300; flex: 1; }

/* Responsive */
@media (max-width: 900px) { .ib-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 640px) {
  .ib-breadcrumb, .ib-header, .ib-content { padding-left: 20px; padding-right: 20px; }
  .ib-featured { grid-template-columns: 1fr; }
  .ib-featured-img { aspect-ratio: 16/7; height: auto; }
  .ib-featured-body { padding: 28px 24px; }
  .ib-grid { grid-template-columns: 1fr; }
}
`;

