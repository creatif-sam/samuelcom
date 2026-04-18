import type { Metadata } from "next";
import Link from "next/link";
import { createAnonClient } from "@/lib/supabase/anon";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import { Navbar } from "@/components/organisms/Navbar";

export const metadata: Metadata = {
  title: "Transformation — Blog",
  description:
    "Stories and reflections on personal and societal transformation — breaking cycles, becoming, and building what lasts. By Samuel Kobina Gyasi.",
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
    id: "t1",
    title: "The Anatomy of Transformation: From Identity to Impact",
    slug: "anatomy-of-transformation",
    excerpt:
      "True transformation is not a change of clothes — it is a change of self. It begins with an honest reckoning with who you are before it can move toward who you are becoming.",
    created_at: "2026-02-25",
    read_time_minutes: 10,
    featured_image_url: null,
  },
  {
    id: "t2",
    title: "Breaking Cycles: How One Generation Can Change Everything",
    slug: "breaking-cycles",
    excerpt:
      "Every generation inherits the unfinished work of the one before it. The question is not whether you received a broken inheritance — almost everyone did. The question is what you do with it.",
    created_at: "2026-02-08",
    read_time_minutes: 8,
    featured_image_url: null,
  },
  {
    id: "t3",
    title: "On Becoming: A Reflection on Growth, Purpose, and Responsibility",
    slug: "on-becoming",
    excerpt:
      "Becoming is uncomfortable. Becoming requires that you hold the past and the future in tension, honouring what was while refusing to be defined by it.",
    created_at: "2026-01-22",
    read_time_minutes: 7,
    featured_image_url: null,
  },
  {
    id: "t4",
    title: "Ghana to the World: A Vision for the Next Generation of African Leaders",
    slug: "ghana-to-the-world",
    excerpt:
      "Africa does not need saving. It needs activating. There is a generation rising — equipped, rooted, and globally connected — ready to show what transformation looks like from the inside out.",
    created_at: "2025-12-30",
    read_time_minutes: 9,
    featured_image_url: null,
  },
];

export default async function TransformationBlogPage() {
  let posts: Post[] = samplePosts;
  try {
    const supabase = createAnonClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, created_at, read_time_minutes, featured_image_url")
      .eq("category", "transformation")
      .eq("published", true)
      .order("created_at", { ascending: false });
    if (data && data.length > 0) posts = data;
  } catch { /* fallback */ }

  const [featured, ...rest] = posts;

  return (
    <>
      <style>{blogCss}</style>
      <Navbar />

      <main className="tb-page">
        {/* Breadcrumb */}
        <nav className="tb-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href="/transformation">Transformation</Link>
          <span>›</span>
          <span>Blog</span>
        </nav>

        {/* Page header */}
        <header className="tb-header">
          <div className="tb-eyebrow">Writings on Change</div>
          <h1 className="tb-title">
            Stories of <em>Becoming</em>
          </h1>
          <p className="tb-subtitle">
            On breaking cycles, building new realities, and the relentless work of becoming who you were created to be.
          </p>
        </header>

        {/* Posts */}
        <section className="tb-content">
          {posts.length === 0 ? (
            <p className="tb-empty">Transformation stories coming soon.</p>
          ) : (
            <>
              {/* Featured post */}
              {featured && (
                <Link href={`/transformation/blog/${featured.slug}`} className="tb-featured">
                  {featured.featured_image_url && (
                    <div className="tb-featured-img">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={featured.featured_image_url} alt={featured.title} />
                    </div>
                  )}
                  <div className="tb-featured-body">
                    <div className="tb-card-label">Transformation</div>
                    <h2 className="tb-featured-title">{featured.title}</h2>
                    {featured.excerpt && <p className="tb-featured-excerpt">{featured.excerpt}</p>}
                    <div className="tb-card-meta">
                      <span>{new Date(featured.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                      <span>·</span>
                      <span>{featured.read_time_minutes} min read</span>
                    </div>
                    <div className="tb-read-link">Read story →</div>
                  </div>
                </Link>
              )}

              {/* Rest of posts grid */}
              {rest.length > 0 && (
                <div className="tb-grid">
                  {rest.map((post) => (
                    <Link key={post.id} href={`/transformation/blog/${post.slug}`} className="tb-card">
                      {post.featured_image_url && (
                        <div className="tb-card-img">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={post.featured_image_url} alt={post.title} />
                        </div>
                      )}
                      <div className="tb-card-body">
                        <div className="tb-card-label">Transformation</div>
                        <h2 className="tb-card-title">{post.title}</h2>
                        {post.excerpt && <p className="tb-card-excerpt">{post.excerpt}</p>}
                        <div className="tb-card-meta">
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
/* ── Transformation blog listing ─────────────────────────── */
.tb-page {
  --void: #07080a;
  --white: #f2f0ec;
  --ember: #e8692a;
  --mist: #8a8880;
  --line: rgba(242,240,236,.06);
  --card: #131619;
  background: var(--void);
  color: var(--white);
  min-height: 100vh;
  padding-top: 72px;
}

/* Breadcrumb */
.tb-breadcrumb {
  display: flex; align-items: center; gap: 10px;
  padding: 18px 56px;
  font-family: 'Poppins', sans-serif;
  font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
  color: var(--mist);
  border-bottom: 1px solid var(--line);
}
.tb-breadcrumb a { color: var(--mist); text-decoration: none; transition: color .25s; }
.tb-breadcrumb a:hover { color: var(--ember); }
.tb-breadcrumb span:last-child { color: rgba(242,240,236,.6); }

/* Header */
.tb-header { padding: 60px 56px 44px; }
.tb-eyebrow {
  font-family: 'Poppins', sans-serif;
  font-size: 9px; letter-spacing: .4em; text-transform: uppercase;
  color: var(--ember); margin-bottom: 18px;
}
.tb-title {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(48px, 7vw, 96px); line-height: .95;
  color: var(--white); margin: 0 0 22px; font-weight: 700;
}
.tb-title em { font-style: italic; color: var(--ember); display: inline; }
.tb-subtitle {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(16px, 1.8vw, 20px); font-style: italic;
  color: var(--mist); max-width: 540px; line-height: 1.65; font-weight: 300;
}

/* Content */
.tb-content { padding: 0 56px 80px; display: flex; flex-direction: column; gap: 28px; }
.tb-empty { font-family: 'Poppins', sans-serif; font-size: 20px; font-style: italic; color: var(--mist); padding: 60px 0; text-align: center; }

/* Featured card */
.tb-featured {
  display: grid; grid-template-columns: 1fr 1fr;
  min-height: 340px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 12px; overflow: hidden;
  text-decoration: none; color: var(--white);
  transition: border-color .3s, box-shadow .3s;
}
.tb-featured:hover { border-color: rgba(232,105,42,.35); box-shadow: 0 8px 40px rgba(0,0,0,.5); }
.tb-featured-img { width: 100%; height: 100%; overflow: hidden; background: rgba(255,255,255,.03); }
.tb-featured-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s; }
.tb-featured:hover .tb-featured-img img { transform: scale(1.04); }
.tb-featured-body { padding: 44px 40px; display: flex; flex-direction: column; justify-content: center; gap: 14px; }
.tb-featured-title { font-family: 'Poppins', sans-serif; font-size: clamp(22px, 2.5vw, 32px); line-height: 1.15; color: var(--white); }
.tb-featured-excerpt { font-family: 'Poppins', sans-serif; font-size: 16px; font-style: italic; color: var(--mist); line-height: 1.65; font-weight: 300; flex: 1; }
.tb-read-link { font-family: 'Poppins', sans-serif; font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: var(--ember); margin-top: 4px; }

/* Labels & meta */
.tb-card-label { font-family: 'Poppins', sans-serif; font-size: 9px; letter-spacing: .3em; text-transform: uppercase; color: var(--ember); }
.tb-card-meta { font-family: 'Poppins', sans-serif; font-size: 9px; letter-spacing: .15em; text-transform: uppercase; color: var(--mist); display: flex; gap: 10px; flex-wrap: wrap; }

/* Grid cards */
.tb-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.tb-card {
  background: var(--card); border: 1px solid var(--line);
  border-radius: 10px; overflow: hidden;
  text-decoration: none; color: var(--white);
  display: flex; flex-direction: column;
  transition: border-color .3s, transform .3s;
}
.tb-card:hover { border-color: rgba(232,105,42,.28); transform: translateY(-3px); }
.tb-card-img { width: 100%; aspect-ratio: 16/9; overflow: hidden; background: rgba(255,255,255,.03); }
.tb-card-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s; }
.tb-card:hover .tb-card-img img { transform: scale(1.05); }
.tb-card-body { padding: 22px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
.tb-card-title { font-family: 'Poppins', sans-serif; font-size: clamp(16px, 1.5vw, 20px); line-height: 1.2; color: var(--white); }
.tb-card-excerpt { font-family: 'Poppins', sans-serif; font-size: 15px; font-style: italic; color: var(--mist); line-height: 1.6; font-weight: 300; flex: 1; }

/* Responsive */
@media (max-width: 900px) { .tb-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 640px) {
  .tb-breadcrumb, .tb-header, .tb-content { padding-left: 20px; padding-right: 20px; }
  .tb-featured { grid-template-columns: 1fr; }
  .tb-featured-img { aspect-ratio: 16/7; height: auto; }
  .tb-featured-body { padding: 28px 24px; }
  .tb-grid { grid-template-columns: 1fr; }
}
`;

