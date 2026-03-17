import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/organisms/Navbar";
import { SiteFooter } from "@/components/organisms/SiteFooter";

interface Props { params: Promise<{ slug: string }>; }

const samplePosts: Record<string, { title: string; excerpt: string; content: string; created_at: string; read_time_minutes: number }> = {
  "collective-intelligence-community": {
    title: "Collective Intelligence: When Community Thinks Together",
    excerpt: "The smartest thing an individual can do is create the conditions for a group to be smarter than any one of its members.",
    created_at: "2026-02-22",
    read_time_minutes: 9,
    content: `<p>There is a proverb from West Africa: <em>"If you want to go fast, go alone. If you want to go far, go together."</em> The field of Collective Intelligence is, in many ways, the scientific attempt to understand when, how, and why going together produces outcomes that going alone cannot.</p>
<h2>What the Research Shows</h2>
<p>Studies on group intelligence consistently show that the most collectively intelligent groups are not necessarily those with the most intelligent individuals. The key factors? Equal participation, high social sensitivity, and a diversity of perspectives. In other words: the quality of the <em>relationships</em> determines the quality of the <em>thinking</em>.</p>
<h2>African Epistemic Traditions</h2>
<p>African knowledge traditions have understood this for millennia. The concept of <em>Ubuntu</em> — "I am because we are" — is not just a philosophical statement. It is an epistemological one: my understanding is constituted through my relationships. We do not think in isolation; we think in community.</p>
<blockquote><p>"The whole is greater than the sum of its parts." — Aristotle, Metaphysics</p></blockquote>
<h2>Implications for Modern Institutions</h2>
<p>What would our schools, companies, and governments look like if they were designed for collective intelligence rather than individual performance? This is the question I am spending my academic career trying to answer. I believe the answer will transform not just how we work, but how we live together.</p>`,
  },
  "ancient-wisdom-modern-tech": {
    title: "The Bridge Between Ancient Wisdom and Modern Technology",
    excerpt: "African proverbs are not relics — they are compressed algorithms for collective decision-making.",
    created_at: "2026-02-05",
    read_time_minutes: 7,
    content: `<p>When I began studying Collective Intelligence at UM6P, I brought with me a treasury that most of my fellow students did not know they were missing: a deep formation in African oral tradition, proverbs, and communal decision-making practices. What I discovered is that these ancient tools are not pre-modern curiosities — they are <em>compression algorithms</em> for complex social knowledge.</p>
<h2>Proverbs as Algorithms</h2>
<p>Consider this Ghanaian proverb: <em>"The ruin of a nation begins in the homes of its people."</em> In a single sentence, this encodes a theory of institutional decay that would take a political scientist several papers to articulate. The proverb compresses centuries of observed patterns into a portable, memorable, sharable format.</p>
<p>This is what algorithms do. They compress complex operations into callable procedures. The difference is that proverbs are optimised for human memory and social transmission rather than computation.</p>
<h2>The Integration</h2>
<p>The future of collective intelligence is not a choice between ancient and modern. It is an integration — drawing on the pattern-recognition density of oral wisdom traditions and the computational power of modern technology to create tools for community flourishing that neither could produce alone.</p>
<p>I believe the researchers best positioned to build this bridge are those who carry both worlds. That is a calling I take seriously.</p>`,
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = samplePosts[slug];
  return {
    title: post?.title ?? "Intellectuality Blog Post",
    description: post?.excerpt ?? "Essays on intellect and scholarship by Samuel Kobina Gyasi.",
  };
}

export default async function IntellectualityBlogPostPage({ params }: Props) {
  const { slug } = await params;
  let post: { title: string; excerpt: string | null; content: string; created_at: string; read_time_minutes: number; cover_image_url: string | null; mid_image_url: string | null; infographic_url: string | null } | null = null;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("title, excerpt, content, created_at, read_time_minutes, cover_image_url, mid_image_url, infographic_url")
      .eq("slug", slug).eq("category", "intellectuality").eq("published", true).single();
    if (data) post = data;
  } catch { /* fallback */ }

  if (!post) {
    const sample = samplePosts[slug];
    if (!sample) notFound();
    post = { ...sample, cover_image_url: null, mid_image_url: null, infographic_url: null };
  }

  return (
    <>
      <style>{articleCss}</style>
      <Navbar />

      <main className="ia-page">
        <nav className="ia-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href="/intellectuality">Intellectuality</Link>
          <span>›</span>
          <Link href="/intellectuality/blog">Blog</Link>
          <span>›</span>
          <span>{post.title.length > 45 ? post.title.slice(0, 45) + "\u2026" : post.title}</span>
        </nav>

        {post.cover_image_url && (
          <div className="ia-cover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.cover_image_url} alt={post.title} />
          </div>
        )}

        <article className="ia-article">
          <header className="ia-header">
            <div className="ia-tag">Essay · Intellectuality</div>
            <h1 className="ia-title">{post.title}</h1>
            <div className="ia-meta">
              <span>{new Date(post.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span>·</span>
              <span>{post.read_time_minutes} min read</span>
            </div>
            {post.excerpt && <p className="ia-lead">{post.excerpt}</p>}
          </header>

          <div className="ia-body" dangerouslySetInnerHTML={{ __html: post.content }} />

          {post.mid_image_url && (
            <div className="ia-mid-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.mid_image_url} alt="Illustration" />
            </div>
          )}

          {post.infographic_url && (
            <div className="ia-infographic">
              <div className="ia-infographic-label">Key Insights</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.infographic_url} alt="Infographic: key insights" />
            </div>
          )}

          <footer className="ia-footer">
            <Link href="/intellectuality/blog" className="ia-back">← All Essays</Link>
          </footer>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}

const articleCss = `
/* ── Intellectuality article ─────────────────────────────── */
.ia-page {
  --ink: #0a0908; --paper: #f4f1eb; --accent: #c0392b;
  --mid: #7a746a; --line: rgba(10,9,8,.1);
  background: var(--paper); color: var(--ink);
  min-height: 100vh; padding-top: 72px;
}
.ia-breadcrumb {
  display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
  padding: 18px 56px;
  font-family: 'Space Mono', monospace;
  font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
  color: var(--mid); border-bottom: 1px solid var(--line);
}
.ia-breadcrumb a { color: var(--mid); text-decoration: none; transition: color .25s; }
.ia-breadcrumb a:hover { color: var(--accent); }
.ia-breadcrumb span:last-child { color: var(--ink); }
.ia-cover { width: 100%; max-height: 480px; overflow: hidden; }
.ia-cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
.ia-article { padding: 52px 56px 80px; max-width: 800px; }
.ia-tag { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: .3em; text-transform: uppercase; color: var(--accent); margin-bottom: 22px; }
.ia-title { font-family: 'Playfair Display', serif; font-size: clamp(32px,5vw,60px); color: var(--ink); line-height: 1.08; margin-bottom: 22px; }
.ia-meta { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: .15em; text-transform: uppercase; color: var(--mid); display: flex; gap: 12px; margin-bottom: 28px; flex-wrap: wrap; }
.ia-lead { font-family: 'Playfair Display', serif; font-size: clamp(17px,2.2vw,22px); font-style: italic; color: var(--ink); line-height: 1.55; padding: 24px 32px; border-left: 3px solid var(--accent); background: rgba(192,57,43,.04); margin: 0 0 48px; }
.ia-body { font-family: 'Cormorant Garamond', serif; font-size: clamp(17px,1.8vw,20px); line-height: 1.95; color: #4a4440; }
.ia-body h2 { font-family: 'Playfair Display', serif; font-size: clamp(22px,3vw,30px); color: var(--ink); margin: 52px 0 20px; font-weight: 700; }
.ia-body p { margin-bottom: 24px; }
.ia-body em { font-style: italic; }
.ia-body blockquote { border-left: 3px solid var(--accent); padding: 20px 32px; background: rgba(192,57,43,.04); font-style: italic; font-size: 18px; color: var(--ink); margin: 36px 0; }
.ia-mid-img { margin: 52px 0; border-radius: 10px; overflow: hidden; border: 1px solid var(--line); }
.ia-mid-img img { width: 100%; display: block; }
.ia-infographic { margin: 52px 0; padding: 16px; background: rgba(10,9,8,.03); border: 1px solid var(--line); border-radius: 10px; }
.ia-infographic-label { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: .3em; text-transform: uppercase; color: var(--accent); margin-bottom: 14px; }
.ia-infographic img { width: 100%; display: block; border-radius: 6px; }
.ia-footer { margin-top: 72px; padding-top: 36px; border-top: 2px solid var(--ink); }
.ia-back { font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: var(--accent); text-decoration: none; }
.ia-back:hover { opacity: .7; }
@media (max-width: 768px) {
  .ia-breadcrumb, .ia-article { padding-left: 20px; padding-right: 20px; }
  .ia-article { padding-top: 32px; }
  .ia-cover { max-height: 260px; }
}
`;
