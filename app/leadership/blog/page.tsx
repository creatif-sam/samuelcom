import type { Metadata } from "next";
import Link from "next/link";
import { createAnonClient } from "@/lib/supabase/anon";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import { Navbar } from "@/components/organisms/Navbar";

export const metadata: Metadata = {
  title: "Leadership — Blog",
  description:
    "Insights on servant leadership, authority, and building institutions that outlast their founders. By Samuel Kobina Gyasi.",
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
    id: "l1",
    title: "The President Who Learns to Listen: Leading the Collective Intelligence Consortium",
    slug: "president-who-listens",
    excerpt:
      "True leadership is less about speaking and more about creating the conditions in which others can speak, think, and contribute at full capacity.",
    created_at: "2026-02-18",
    read_time_minutes: 8,
    featured_image_url: null,
  },
  {
    id: "l2",
    title: "What Class Prefect at Saint John's Taught Me About Authority",
    slug: "class-prefect-authority",
    excerpt:
      "Authority without relationship is just power. Power without character is just threat. The seeds of servant leadership were planted long before I understood the concept.",
    created_at: "2026-01-30",
    read_time_minutes: 6,
    featured_image_url: null,
  },
  {
    id: "l3",
    title: "The Art of Servant Leadership: Putting People First",
    slug: "servant-leadership-model",
    excerpt:
      "The paradox of leadership: the higher you ascend, the more you are called to serve. True servant leadership transforms people, cultures, and entire organisations.",
    created_at: "2026-01-10",
    read_time_minutes: 9,
    featured_image_url: null,
  },
  {
    id: "l4",
    title: "Cultural Intelligence: Leading Across the Ghana-Morocco Divide",
    slug: "cultural-intelligence",
    excerpt:
      "Moving between two cultures taught me that leadership is contextual. What works in one room can alienate in another. Cultural intelligence isn't optional — it is foundational.",
    created_at: "2025-12-15",
    read_time_minutes: 7,
    featured_image_url: null,
  },
];

export default async function LeadershipBlogPage() {
  let posts: Post[] = samplePosts;
  try {
    const supabase = createAnonClient();
    const { data } = await supabase
      .from("main_blog_posts")
      .select("id, title, slug, excerpt, created_at, read_time_minutes, featured_image_url")
      .eq("category", "leadership")
      .eq("published", true)
      .order("created_at", { ascending: false });
    if (data && data.length > 0) posts = data;
  } catch { /* fallback */ }

  const [featured, ...rest] = posts;

  return (
    <>
      <style>{blogCss}</style>
      <Navbar />

      <main className="lb-page">
        {/* Breadcrumb */}
        <nav className="lb-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href="/leadership">Leadership</Link>
          <span>›</span>
          <span>Blog</span>
        </nav>

        {/* Page header */}
        <header className="lb-header">
          <div className="lb-eyebrow">Writings on Leadership</div>
          <h1 className="lb-title">
            Lead with <em>Purpose</em>
          </h1>
          <p className="lb-subtitle">
            Insights on authority, service, and building organisations that outlast their founders.
          </p>
        </header>

        {/* Posts */}
        <section className="lb-content">
          {posts.length === 0 ? (
            <p className="lb-empty">Leadership reflections coming soon.</p>
          ) : (
            <>
              {/* Featured post */}
              {featured && (
                <Link href={`/leadership/blog/${featured.slug}`} className="lb-featured">
                  {featured.featured_image_url && (
                    <div className="lb-featured-img">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={featured.featured_image_url} alt={featured.title} />
                    </div>
                  )}
                  <div className="lb-featured-body">
                    <div className="lb-card-label">Leadership</div>
                    <h2 className="lb-featured-title">{featured.title}</h2>
                    {featured.excerpt && <p className="lb-featured-excerpt">{featured.excerpt}</p>}
                    <div className="lb-card-meta">
                      <span>{new Date(featured.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                      <span>·</span>
                      <span>{featured.read_time_minutes} min read</span>
                    </div>
                    <div className="lb-read-link">Read essay →</div>
                  </div>
                </Link>
              )}

              {/* Rest of posts grid */}
              {rest.length > 0 && (
                <div className="lb-grid">
                  {rest.map((post) => (
                    <Link key={post.id} href={`/leadership/blog/${post.slug}`} className="lb-card">
                      {post.featured_image_url && (
                        <div className="lb-card-img">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={post.featured_image_url} alt={post.title} />
                        </div>
                      )}
                      <div className="lb-card-body">
                        <div className="lb-card-label">Leadership</div>
                        <h2 className="lb-card-title">{post.title}</h2>
                        {post.excerpt && <p className="lb-card-excerpt">{post.excerpt}</p>}
                        <div className="lb-card-meta">
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
/* ── Leadership blog listing ──────────────────────────────── */
.lb-page {
  --bg: #0c0b09;
  --white: #f0ede8;
  --gold: #22c55e;
  --gray: #6b6560;
  --line: rgba(240,237,232,.07);
  --card: #141210;
  background: var(--bg);
  color: var(--white);
  min-height: 100vh;
  padding-top: 72px;
}

/* Breadcrumb */
.lb-breadcrumb {
  display: flex; align-items: center; gap: 10px;
  padding: 18px 56px;
  font-family: 'Poppins', sans-serif;
  font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
  color: var(--gray);
  border-bottom: 1px solid var(--line);
}
.lb-breadcrumb a { color: var(--gray); text-decoration: none; transition: color .25s; }
.lb-breadcrumb a:hover { color: var(--gold); }
.lb-breadcrumb span:last-child { color: rgba(240,237,232,.6); }

/* Header */
.lb-header { padding: 60px 56px 44px; }
.lb-eyebrow {
  font-family: 'Poppins', sans-serif;
  font-size: 9px; letter-spacing: .4em; text-transform: uppercase;
  color: var(--gold); margin-bottom: 18px;
}
.lb-title {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(48px, 7vw, 96px); line-height: .95;
  color: var(--white); margin: 0 0 22px; font-weight: 700;
}
.lb-title em { font-style: italic; color: var(--gold); display: inline; }
.lb-subtitle {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(16px, 1.8vw, 20px); font-style: italic;
  color: var(--gray); max-width: 540px; line-height: 1.65; font-weight: 300;
}

/* Content */
.lb-content { padding: 0 56px 80px; display: flex; flex-direction: column; gap: 28px; }
.lb-empty { font-family: 'Poppins', sans-serif; font-size: 20px; font-style: italic; color: var(--gray); padding: 60px 0; text-align: center; }

/* Featured card */
.lb-featured {
  display: grid; grid-template-columns: 1fr 1fr;
  min-height: 340px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 12px; overflow: hidden;
  text-decoration: none; color: var(--white);
  transition: border-color .3s, box-shadow .3s;
}
.lb-featured:hover { border-color: rgba(34,197,94,.3); box-shadow: 0 8px 40px rgba(0,0,0,.4); }
.lb-featured-img { width: 100%; height: 100%; overflow: hidden; background: rgba(255,255,255,.04); }
.lb-featured-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s; }
.lb-featured:hover .lb-featured-img img { transform: scale(1.04); }
.lb-featured-body { padding: 44px 40px; display: flex; flex-direction: column; justify-content: center; gap: 14px; }
.lb-featured-title { font-family: 'Poppins', sans-serif; font-size: clamp(22px, 2.5vw, 32px); line-height: 1.15; color: var(--white); }
.lb-featured-excerpt { font-family: 'Poppins', sans-serif; font-size: 16px; font-style: italic; color: var(--gray); line-height: 1.65; font-weight: 300; flex: 1; }
.lb-read-link { font-family: 'Poppins', sans-serif; font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: var(--gold); margin-top: 4px; }

/* Labels & meta */
.lb-card-label { font-family: 'Poppins', sans-serif; font-size: 9px; letter-spacing: .3em; text-transform: uppercase; color: var(--gold); }
.lb-card-meta { font-family: 'Poppins', sans-serif; font-size: 9px; letter-spacing: .15em; text-transform: uppercase; color: var(--gray); display: flex; gap: 10px; flex-wrap: wrap; }

/* Grid cards */
.lb-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.lb-card {
  background: var(--card); border: 1px solid var(--line);
  border-radius: 10px; overflow: hidden;
  text-decoration: none; color: var(--white);
  display: flex; flex-direction: column;
  transition: border-color .3s, transform .3s;
}
.lb-card:hover { border-color: rgba(34,197,94,.25); transform: translateY(-3px); }
.lb-card-img { width: 100%; aspect-ratio: 16/9; overflow: hidden; background: rgba(255,255,255,.04); }
.lb-card-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s; }
.lb-card:hover .lb-card-img img { transform: scale(1.05); }
.lb-card-body { padding: 22px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
.lb-card-title { font-family: 'Poppins', sans-serif; font-size: clamp(16px, 1.5vw, 20px); line-height: 1.2; color: var(--white); }
.lb-card-excerpt { font-family: 'Poppins', sans-serif; font-size: 15px; font-style: italic; color: var(--gray); line-height: 1.6; font-weight: 300; flex: 1; }

/* Responsive */
@media (max-width: 900px) { .lb-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 640px) {
  .lb-breadcrumb, .lb-header, .lb-content { padding-left: 20px; padding-right: 20px; }
  .lb-featured { grid-template-columns: 1fr; }
  .lb-featured-img { aspect-ratio: 16/7; height: auto; }
  .lb-featured-body { padding: 28px 24px; }
  .lb-grid { grid-template-columns: 1fr; }
}
`;

