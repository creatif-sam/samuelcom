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
    .eq("category", "leadership")
    .single();
  return {
    title: data ? `${data.title} — Leadership` : "Leadership — Blog",
    description: data?.excerpt ?? "Leadership reflections by Samuel Kobina Gyasi.",
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

export default async function LeadershipPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = createAnonClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, content, created_at, read_time_minutes, featured_image_url, cover_image_url, mid_image_url, infographic_url, spotify_url, photo_attachments")
    .eq("slug", slug)
    .eq("category", "leadership")
    .eq("published", true)
    .single();

  if (!data) notFound();
  const post = data as Post;

  return (
    <>
      <style>{postCss}</style>
      <Navbar />

      <main className="lb-post">
        <nav className="lb-bc">
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href="/leadership">Leadership</Link>
          <span>›</span>
          <Link href="/leadership/blog">Blog</Link>
          <span>›</span>
          <span>{post.title}</span>
        </nav>

        {post.cover_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <div className="lb-cover">
            <img src={post.cover_image_url} alt={post.title} />
          </div>
        )}

        <article className="lb-article">
          <header className="lb-art-head">
            <div className="lb-art-label">Leadership · Reflection &amp; Practice</div>
            <h1 className="lb-art-title">{post.title}</h1>
            {post.excerpt && <p className="lb-art-excerpt">{post.excerpt}</p>}
            <div className="lb-art-meta">
              <span>{new Date(post.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span>·</span>
              <span>{post.read_time_minutes} min read</span>
            </div>
          </header>

          {post.spotify_url && (
            <div className="lb-spotify">
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
              className="lb-art-body"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}

          {post.mid_image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="lb-art-mid-img" src={post.mid_image_url} alt="" />
          )}

          {post.photo_attachments && post.photo_attachments.length > 0 && (
            <div className="lb-photos">
              {post.photo_attachments.map((p, i) => (
                <figure key={i} className="lb-photo-fig">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.url} alt={p.alt ?? p.caption ?? ""} />
                  {p.caption && <figcaption>{p.caption}</figcaption>}
                </figure>
              ))}
            </div>
          )}

          {post.infographic_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="lb-art-infographic" src={post.infographic_url} alt="Infographic" />
          )}

          <div className="lb-back">
            <Link href="/leadership/blog">← Back to Leadership Blog</Link>
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}

const postCss = `
/* ── Leadership single post ───────────────────────────────── */
.lb-post {
  --bg: #0c0b09;
  --white: #f0ede8;
  --gold: #22c55e;
  --gray: #6b6560;
  --line: rgba(240,237,232,.07);
  background: var(--bg);
  color: var(--white);
  min-height: 100vh;
  padding-top: 72px;
}
.lb-bc {
  display: flex; align-items: center; gap: 8px;
  padding: 18px 56px;
  font-family: 'Poppins', sans-serif;
  font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
  color: var(--gray);
  border-bottom: 1px solid var(--line);
  flex-wrap: wrap;
}
.lb-bc a { color: var(--gray); text-decoration: none; transition: color .2s; }
.lb-bc a:hover { color: var(--gold); }
.lb-bc span:last-child { color: rgba(240,237,232,.6); max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.lb-cover { width: 100%; max-height: 480px; overflow: hidden; }
.lb-cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
.lb-article { max-width: 760px; margin: 0 auto; padding: 56px 32px 80px; }
.lb-art-head { margin-bottom: 40px; }
.lb-art-label { font-family: 'Poppins', sans-serif; font-size: 9px; letter-spacing: .35em; text-transform: uppercase; color: var(--gold); margin-bottom: 16px; }
.lb-art-title { font-family: 'Poppins', sans-serif; font-size: clamp(28px, 5vw, 52px); line-height: 1.1; color: var(--white); margin: 0 0 16px; font-weight: 700; }
.lb-art-excerpt { font-family: 'Poppins', sans-serif; font-size: clamp(16px, 1.6vw, 20px); font-style: italic; color: var(--gray); line-height: 1.65; font-weight: 300; margin: 0 0 16px; }
.lb-art-meta { font-family: 'Poppins', sans-serif; font-size: 10px; letter-spacing: .15em; text-transform: uppercase; color: var(--gray); display: flex; gap: 8px; flex-wrap: wrap; }
.lb-spotify { margin: 32px 0; }
.lb-art-body { font-family: 'Poppins', sans-serif; font-size: 17px; line-height: 1.85; color: var(--white); margin: 32px 0; }
.lb-art-body p { margin: 0 0 1.4em; }
.lb-art-body h2 { font-size: 1.5em; font-weight: 700; margin: 2em 0 .7em; color: var(--white); }
.lb-art-body h3 { font-size: 1.2em; font-weight: 600; margin: 1.8em 0 .6em; color: var(--white); }
.lb-art-body blockquote { border-left: 3px solid var(--gold); margin: 2em 0; padding: 12px 24px; font-style: italic; color: var(--gray); }
.lb-art-body a { color: var(--gold); text-decoration: underline; }
.lb-art-body ul, .lb-art-body ol { padding-left: 1.6em; margin: 1em 0; }
.lb-art-body li { margin-bottom: .4em; }
.lb-art-mid-img { width: 100%; border-radius: 10px; margin: 32px 0; display: block; }
.lb-photos { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 32px 0; }
.lb-photo-fig { margin: 0; }
.lb-photo-fig img { width: 100%; border-radius: 8px; display: block; }
.lb-photo-fig figcaption { font-family: 'Poppins', sans-serif; font-size: 11px; color: var(--gray); margin-top: 6px; font-style: italic; }
.lb-art-infographic { width: 100%; border-radius: 10px; margin: 32px 0; display: block; }
.lb-back { margin-top: 56px; padding-top: 24px; border-top: 1px solid var(--line); }
.lb-back a { font-family: 'Poppins', sans-serif; font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: var(--gold); text-decoration: none; }
.lb-back a:hover { text-decoration: underline; }
@media (max-width: 640px) {
  .lb-bc { padding-left: 20px; padding-right: 20px; }
  .lb-article { padding: 36px 20px 60px; }
  .lb-photos { grid-template-columns: 1fr; }
}
`;