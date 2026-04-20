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
    .from("blog_posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("category", "transformation")
    .single();
  return {
    title: data ? `${data.title} — Transformation` : "Transformation — Blog",
    description: data?.excerpt ?? "Transformation stories by Samuel Kobina Gyasi.",
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

export default async function TransformationPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = createAnonClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, content, created_at, read_time_minutes, featured_image_url, cover_image_url, mid_image_url, infographic_url, spotify_url, photo_attachments")
    .eq("slug", slug)
    .eq("category", "transformation")
    .eq("published", true)
    .single();

  if (!data) notFound();
  const post = data as Post;

  return (
    <>
      <style>{postCss}</style>
      <Navbar />

      <main className="tb-post">
        <nav className="tb-bc">
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href="/transformation">Transformation</Link>
          <span>›</span>
          <Link href="/transformation/blog">Blog</Link>
          <span>›</span>
          <span>{post.title}</span>
        </nav>

        {post.cover_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <div className="tb-cover">
            <img src={post.cover_image_url} alt={post.title} />
          </div>
        )}

        <article className="tb-article">
          <header className="tb-art-head">
            <div className="tb-art-label">Transformation · Story &amp; Becoming</div>
            <h1 className="tb-art-title">{post.title}</h1>
            {post.excerpt && <p className="tb-art-excerpt">{post.excerpt}</p>}
            <div className="tb-art-meta">
              <span>{new Date(post.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span>·</span>
              <span>{post.read_time_minutes} min read</span>
            </div>
          </header>

          {post.spotify_url && (
            <div className="tb-spotify">
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

          {post.content && (
            <div
              className="tb-art-body"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}

          {post.mid_image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="tb-art-mid-img" src={post.mid_image_url} alt="" />
          )}

          {post.photo_attachments && post.photo_attachments.length > 0 && (
            <div className="tb-photos">
              {post.photo_attachments.map((p, i) => (
                <figure key={i} className="tb-photo-fig">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.url} alt={p.alt ?? p.caption ?? ""} />
                  {p.caption && <figcaption>{p.caption}</figcaption>}
                </figure>
              ))}
            </div>
          )}

          {post.infographic_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="tb-art-infographic" src={post.infographic_url} alt="Infographic" />
          )}

          <div className="tb-back">
            <Link href="/transformation/blog">← Back to Transformation Blog</Link>
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}

const postCss = `
/* ── Transformation single post ──────────────────────────── */
.tb-post {
  --void: #07080a;
  --white: #f2f0ec;
  --ember: #e8692a;
  --mist: #8a8880;
  --line: rgba(242,240,236,.06);
  background: var(--void);
  color: var(--white);
  min-height: 100vh;
  padding-top: 72px;
}
.tb-bc {
  display: flex; align-items: center; gap: 8px;
  padding: 18px 56px;
  font-family: 'Poppins', sans-serif;
  font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
  color: var(--mist);
  border-bottom: 1px solid var(--line);
  flex-wrap: wrap;
}
.tb-bc a { color: var(--mist); text-decoration: none; transition: color .2s; }
.tb-bc a:hover { color: var(--ember); }
.tb-bc span:last-child { color: rgba(242,240,236,.6); max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.tb-cover { width: 100%; max-height: 480px; overflow: hidden; }
.tb-cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
.tb-article { max-width: 760px; margin: 0 auto; padding: 56px 32px 80px; }
.tb-art-head { margin-bottom: 40px; }
.tb-art-label { font-family: 'Poppins', sans-serif; font-size: 9px; letter-spacing: .35em; text-transform: uppercase; color: var(--ember); margin-bottom: 16px; }
.tb-art-title { font-family: 'Poppins', sans-serif; font-size: clamp(28px, 5vw, 52px); line-height: 1.1; color: var(--white); margin: 0 0 16px; font-weight: 700; }
.tb-art-excerpt { font-family: 'Poppins', sans-serif; font-size: clamp(16px, 1.6vw, 20px); font-style: italic; color: var(--mist); line-height: 1.65; font-weight: 300; margin: 0 0 16px; }
.tb-art-meta { font-family: 'Poppins', sans-serif; font-size: 10px; letter-spacing: .15em; text-transform: uppercase; color: var(--mist); display: flex; gap: 8px; flex-wrap: wrap; }
.tb-spotify { margin: 32px 0; }
.tb-art-body { font-family: 'Poppins', sans-serif; font-size: 17px; line-height: 1.85; color: var(--white); margin: 32px 0; }
.tb-art-body p { margin: 0 0 1.4em; }
.tb-art-body h2 { font-size: 1.5em; font-weight: 700; margin: 2em 0 .7em; color: var(--white); }
.tb-art-body h3 { font-size: 1.2em; font-weight: 600; margin: 1.8em 0 .6em; color: var(--white); }
.tb-art-body blockquote { border-left: 3px solid var(--ember); margin: 2em 0; padding: 12px 24px; font-style: italic; color: var(--mist); }
.tb-art-body a { color: var(--ember); text-decoration: underline; }
.tb-art-body ul, .tb-art-body ol { padding-left: 1.6em; margin: 1em 0; }
.tb-art-body li { margin-bottom: .4em; }
.tb-art-mid-img { width: 100%; border-radius: 10px; margin: 32px 0; display: block; }
.tb-photos { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 32px 0; }
.tb-photo-fig { margin: 0; }
.tb-photo-fig img { width: 100%; border-radius: 8px; display: block; }
.tb-photo-fig figcaption { font-family: 'Poppins', sans-serif; font-size: 11px; color: var(--mist); margin-top: 6px; font-style: italic; }
.tb-art-infographic { width: 100%; border-radius: 10px; margin: 32px 0; display: block; }
.tb-back { margin-top: 56px; padding-top: 24px; border-top: 1px solid var(--line); }
.tb-back a { font-family: 'Poppins', sans-serif; font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: var(--ember); text-decoration: none; }
.tb-back a:hover { text-decoration: underline; }
@media (max-width: 640px) {
  .tb-bc { padding-left: 20px; padding-right: 20px; }
  .tb-article { padding: 36px 20px 60px; }
  .tb-photos { grid-template-columns: 1fr; }
}
`;