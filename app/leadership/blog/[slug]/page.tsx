import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/organisms/Navbar";
import { SiteFooter } from "@/components/organisms/SiteFooter";

interface Props { params: Promise<{ slug: string }>; }

const samplePosts: Record<string, { title: string; excerpt: string; content: string; created_at: string; read_time_minutes: number }> = {
  "president-who-listens": {
    title: "The President Who Learns to Listen: Leading the Collective Intelligence Consortium",
    excerpt: "True leadership is less about speaking and more about creating conditions in which others can think and contribute.",
    created_at: "2026-02-18",
    read_time_minutes: 8,
    content: `<p>When I became President of the Collective Intelligence Consortium, I was tempted to arrive with answers. I had ideas, energy, and, frankly, an agenda. But the first week taught me something I have been unlearning and relearning ever since: leadership is not about having the best ideas. It is about creating the space where the best ideas can emerge.</p>
<h2>The Paradox of the President's Voice</h2>
<p>In any room where you hold the title, your voice carries disproportionate weight. A sentence you throw out casually becomes a policy direction. An observation you make in passing becomes the framework around which others organise their thinking. This is influence — but unmanaged, it is also constraint.</p>
<p>I learned to speak last in open discussions. Not always — but often enough that the room stopped waiting for my lead and started generating its own. The quality of conversation improved dramatic ally. People stopped performing for me and started thinking with me.</p>
<h2>What Collective Intelligence Actually Means</h2>
<p>The field of Collective Intelligence is about how groups can think and decide better than individuals. But the deeper lesson is this: the leader's job is not to be the most intelligent person in the room. It is to make the room collectively intelligent.</p>
<blockquote><p>"The servant-leader is servant first... It begins with the natural feeling that one wants to serve, to serve first." — Robert Greenleaf</p></blockquote>
<p>Leadership is an act of facilitation as much as direction. The meetings I am most proud of as president are the ones where I barely said a word — and yet the outcome was extraordinary.</p>`,
  },
  "servant-leadership-model": {
    title: "On Servant Leadership: The Model of Jesus in Modern Organisations",
    excerpt: "The paradox of leadership: the higher you ascend, the more you are called to stoop.",
    created_at: "2026-01-10",
    read_time_minutes: 9,
    content: `<p>In John 13, Jesus — knowing that he had all authority, that all things had been placed in his hands — took a towel and washed his disciples' feet. This is the most compressed leadership lesson in history.</p>
<h2>Authority and Humility as Partners</h2>
<p>Servant leadership is often misunderstood as a kind of weakness — the leader who defers to everyone, who has no spine, who cannot make hard decisions. This is not what Jesus modelled. He washed feet <em>and</em> overturned tables in the temple. He served <em>and</em> confronted. Servant leadership is not about the absence of authority — it is about the right use of it.</p>
<h2>Application in Modern Contexts</h2>
<p>In every leadership role I have held — from class prefect to consortium president — I have tried to ask one guiding question: what does this group need from me right now? Sometimes that is direction. Sometimes that is space. Sometimes it is the hard conversation nobody else is willing to have. The servant leader reads the room and responds to the need, not to the title.</p>
<blockquote><p>"Not so with you. Instead, whoever wants to become great among you must be your servant." — Matthew 20:26</p></blockquote>
<p>Greatness, in the economy of God, is measured not by how many serve you but by how many you serve. This has become the compass point of my leadership philosophy.</p>`,
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = samplePosts[slug];
  return {
    title: post?.title ?? "Leadership Blog Post",
    description: post?.excerpt ?? "Leadership reflections by Samuel Kobina Gyasi.",
  };
}

export default async function LeadershipBlogPostPage({ params }: Props) {
  const { slug } = await params;
  let post: { title: string; excerpt: string | null; content: string; created_at: string; read_time_minutes: number; cover_image_url: string | null; mid_image_url: string | null; infographic_url: string | null } | null = null;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("title, excerpt, content, created_at, read_time_minutes, cover_image_url, mid_image_url, infographic_url")
      .eq("slug", slug).eq("category", "leadership").eq("published", true).single();
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

      <main className="la-page">
        <nav className="la-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href="/leadership">Leadership</Link>
          <span>›</span>
          <Link href="/leadership/blog">Blog</Link>
          <span>›</span>
          <span>{post.title.length > 45 ? post.title.slice(0, 45) + "\u2026" : post.title}</span>
        </nav>

        {post.cover_image_url && (
          <div className="la-cover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.cover_image_url} alt={post.title} />
          </div>
        )}

        <article className="la-article">
          <header className="la-header">
            <div className="la-tag">Leadership</div>
            <h1 className="la-title">{post.title}</h1>
            <div className="la-meta">
              <span>{new Date(post.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span>·</span>
              <span>{post.read_time_minutes} min read</span>
            </div>
            {post.excerpt && <p className="la-lead">{post.excerpt}</p>}
          </header>

          <div className="la-body" dangerouslySetInnerHTML={{ __html: post.content }} />

          {post.mid_image_url && (
            <div className="la-mid-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.mid_image_url} alt="Illustration" />
            </div>
          )}

          {post.infographic_url && (
            <div className="la-infographic">
              <div className="la-infographic-label">Key Insights</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.infographic_url} alt="Infographic: key insights" />
            </div>
          )}

          <footer className="la-footer">
            <Link href="/leadership/blog" className="la-back">← All Leadership Writings</Link>
          </footer>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}

const articleCss = `
/* ── Leadership article ──────────────────────────────────── */
.la-page {
  --bg: #0c0b09; --white: #f0ede8; --gold: #22c55e;
  --gray: #6b6560; --line: rgba(240,237,232,.07);
  background: var(--bg); color: var(--white);
  min-height: 100vh; padding-top: 72px;
}
.la-breadcrumb {
  display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
  padding: 18px 56px;
  font-family: 'Space Mono', monospace;
  font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
  color: var(--gray); border-bottom: 1px solid var(--line);
}
.la-breadcrumb a { color: var(--gray); text-decoration: none; transition: color .25s; }
.la-breadcrumb a:hover { color: var(--gold); }
.la-breadcrumb span:last-child { color: rgba(240,237,232,.65); }
.la-cover { width: 100%; max-height: 480px; overflow: hidden; }
.la-cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
.la-article { padding: 52px 56px 80px; max-width: 800px; }
.la-tag { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: .3em; text-transform: uppercase; color: var(--gold); margin-bottom: 22px; }
.la-title { font-family: 'Playfair Display', serif; font-size: clamp(32px,5vw,60px); color: var(--white); line-height: 1.08; margin-bottom: 22px; }
.la-meta { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: .15em; text-transform: uppercase; color: var(--gray); display: flex; gap: 12px; margin-bottom: 28px; flex-wrap: wrap; }
.la-lead { font-family: 'Playfair Display', serif; font-size: clamp(17px,2.2vw,23px); font-style: italic; color: rgba(240,237,232,.85); line-height: 1.55; padding: 28px 36px; border-left: 2px solid var(--gold); background: rgba(34,197,94,.04); margin: 0 0 48px; }
.la-body { font-family: 'Cormorant Garamond', serif; font-size: clamp(17px,1.8vw,20px); line-height: 1.95; color: var(--gray); font-weight: 300; }
.la-body h2 { font-family: 'Playfair Display', serif; font-size: clamp(22px,3vw,30px); color: var(--white); margin: 52px 0 20px; font-weight: 700; }
.la-body p { margin-bottom: 24px; }
.la-body em { color: rgba(240,237,232,.85); }
.la-body strong { color: var(--white); }
.la-body blockquote { border-left: 2px solid var(--gold); padding: 20px 32px; background: rgba(34,197,94,.04); font-style: italic; font-size: 18px; color: rgba(240,237,232,.8); margin: 36px 0; }
.la-mid-img { margin: 52px 0; border-radius: 10px; overflow: hidden; border: 1px solid var(--line); }
.la-mid-img img { width: 100%; display: block; }
.la-infographic { margin: 52px 0; padding: 16px; background: rgba(255,255,255,.03); border: 1px solid var(--line); border-radius: 10px; }
.la-infographic-label { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: .3em; text-transform: uppercase; color: var(--gold); margin-bottom: 14px; }
.la-infographic img { width: 100%; display: block; border-radius: 6px; }
.la-footer { margin-top: 72px; padding-top: 36px; border-top: 1px solid var(--line); }
.la-back { font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: var(--gold); text-decoration: none; }
.la-back:hover { opacity: .7; }
@media (max-width: 768px) {
  .la-breadcrumb, .la-article { padding-left: 20px; padding-right: 20px; }
  .la-article { padding-top: 32px; }
  .la-cover { max-height: 260px; }
}
`;
