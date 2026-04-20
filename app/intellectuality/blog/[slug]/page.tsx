import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createAnonClient } from "@/lib/supabase/anon";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import { Navbar } from "@/components/organisms/Navbar";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createAnonClient();
  const { data } = await supabase
    .from("main_blog_posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("category", "intellectuality")
    .single();
  return {
    title: data ? `${data.title} — Intellectuality` : "Intellectuality — Blog",
    description: data?.excerpt ?? "Essays by Samuel Kobina Gyasi.",
  };
}

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  created_at: string;
  read_time_minutes: number;
  featured_image_url: string | null;
  cover_image_url: string | null;
  mid_image_url: string | null;
  infographic_url: string | null;
  spotify_url: string | null;
  photo_attachments: { url: string; caption?: string; alt?: string }[] | null;
}

function toSpotifyEmbed(url: string): string {
  return url.replace("open.spotify.com/", "open.spotify.com/embed/");
}

export default async function IntellectualityPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = createAnonClient();
  const { data } = await supabase
    .from("main_blog_posts")
    .select("id, title, slug, excerpt, content, created_at, read_time_minutes, featured_image_url, cover_image_url, mid_image_url, infographic_url, spotify_url, photo_attachments")
    .eq("slug", slug)
    .eq("category", "intellectuality")
    .eq("published", true)
    .single();

  if (!data) notFound();
  const post = data as Post;

  return (
    <>
      <style>{postCss}</style>
      <Navbar />

      <main className="ib-post">
        {/* Breadcrumb */}
        <nav className="ib-bc">
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href="/intellectuality">Intellectuality</Link>
          <span>›</span>
          <Link href="/intellectuality/blog">Blog</Link>
          <span>›</span>
          <span>{post.title}</span>
        </nav>

        {/* Cover image */}
        {post.cover_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <div className="ib-cover">
            <img src={post.cover_image_url} alt={post.title} />
          </div>
        )}

        <article className="ib-article">
          {/* Header */}
          <header className="ib-art-head">
            <div className="ib-art-label">Intellectuality · Essays &amp; Thinking</div>
            <h1 className="ib-art-title">{post.title}</h1>
            {post.excerpt && <p className="ib-art-excerpt">{post.excerpt}</p>}
            <div className="ib-art-meta">
              <span>{new Date(post.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span>·</span>
              <span>{post.read_time_minutes} min read</span>
            </div>
          </header>

          {/* Spotify embed */}
          {post.spotify_url && (
            <div className="ib-spotify">
              <iframe
                src={toSpotifyEmbed(post.spotify_url)}
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ borderRadius: "12px", border: "none" }}
                title="Listen on Spotify"
              />
            </div>
          )}

          {/* Body content */}
          {post.content && (
            <div
              className="ib-art-body"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}

          {/* Mid-article image */}
          {post.mid_image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="ib-art-mid-img" src={post.mid_image_url} alt="" />
          )}

          {/* Photo attachments */}
          {post.photo_attachments && post.photo_attachments.length > 0 && (
            <div className="ib-photos">
              {post.photo_attachments.map((p, i) => (
                <figure key={i} className="ib-photo-fig">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.url} alt={p.alt ?? p.caption ?? ""} />
                  {p.caption && <figcaption>{p.caption}</figcaption>}
                </figure>
              ))}
            </div>
          )}

          {/* Infographic */}
          {post.infographic_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="ib-art-infographic" src={post.infographic_url} alt="Infographic" />
          )}

          {/* Back link */}
          <div className="ib-back">
            <Link href="/intellectuality/blog">← Back to Intellectuality Blog</Link>
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}

const postCss = `
/* ── Intellectuality single post ───────────────────────────── */
.ib-post {
  --ink: #0a0908;
  --paper: #f4f1eb;
  --accent: #c0392b;
  --mid: #7a746a;
  --line: rgba(10,9,8,.1);
  background: var(--paper);
  color: var(--ink);
  min-height: 100vh;
  padding-top: 72px;
}

/* Breadcrumb */
.ib-bc {
  display: flex; align-items: center; gap: 8px;
  padding: 18px 56px;
  font-family: 'Poppins', sans-serif;
  font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
  color: var(--mid);
  border-bottom: 1px solid var(--line);
  flex-wrap: wrap;
}
.ib-bc a { color: var(--mid); text-decoration: none; transition: color .2s; }
.ib-bc a:hover { color: var(--accent); }
.ib-bc span:last-child { color: var(--ink); max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* Cover image */
.ib-cover { width: 100%; max-height: 480px; overflow: hidden; }
.ib-cover img { width: 100%; height: 100%; object-fit: cover; display: block; }

/* Article container */
.ib-article { max-width: 760px; margin: 0 auto; padding: 56px 32px 80px; }

/* Header */
.ib-art-head { margin-bottom: 40px; }
.ib-art-label {
  font-family: 'Poppins', sans-serif;
  font-size: 9px; letter-spacing: .35em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 16px;
}
.ib-art-title {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(28px, 5vw, 52px); line-height: 1.1;
  color: var(--ink); margin: 0 0 16px; font-weight: 700;
}
.ib-art-excerpt {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(16px, 1.6vw, 20px); font-style: italic;
  color: var(--mid); line-height: 1.65; font-weight: 300; margin: 0 0 16px;
}
.ib-art-meta {
  font-family: 'Poppins', sans-serif;
  font-size: 10px; letter-spacing: .15em; text-transform: uppercase;
  color: var(--mid); display: flex; gap: 8px; flex-wrap: wrap;
}

/* Spotify embed */
.ib-spotify { margin: 32px 0; }

/* Article body */
.ib-art-body {
  font-family: 'Poppins', sans-serif;
  font-size: 17px; line-height: 1.85;
  color: var(--ink); margin: 32px 0;
}
.ib-art-body p { margin: 0 0 1.4em; }
.ib-art-body h2 { font-size: 1.5em; font-weight: 700; margin: 2em 0 .7em; color: var(--ink); }
.ib-art-body h3 { font-size: 1.2em; font-weight: 600; margin: 1.8em 0 .6em; color: var(--ink); }
.ib-art-body blockquote { border-left: 3px solid var(--accent); margin: 2em 0; padding: 12px 24px; font-style: italic; color: var(--mid); }
.ib-art-body a { color: var(--accent); text-decoration: underline; }
.ib-art-body ul, .ib-art-body ol { padding-left: 1.6em; margin: 1em 0; }
.ib-art-body li { margin-bottom: .4em; }

/* Mid image */
.ib-art-mid-img { width: 100%; border-radius: 10px; margin: 32px 0; display: block; }

/* Photo attachments */
.ib-photos { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 32px 0; }
.ib-photo-fig { margin: 0; }
.ib-photo-fig img { width: 100%; border-radius: 8px; display: block; }
.ib-photo-fig figcaption { font-family: 'Poppins', sans-serif; font-size: 11px; color: var(--mid); margin-top: 6px; font-style: italic; }

/* Infographic */
.ib-art-infographic { width: 100%; border-radius: 10px; margin: 32px 0; display: block; }

/* Back link */
.ib-back { margin-top: 56px; padding-top: 24px; border-top: 1px solid var(--line); }
.ib-back a { font-family: 'Poppins', sans-serif; font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: var(--accent); text-decoration: none; }
.ib-back a:hover { text-decoration: underline; }

/* Responsive */
@media (max-width: 640px) {
  .ib-bc { padding-left: 20px; padding-right: 20px; }
  .ib-article { padding: 36px 20px 60px; }
  .ib-photos { grid-template-columns: 1fr; }
}
`;
