"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { createAnonClient } from "@/lib/supabase/anon";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import { Navbar } from "@/components/organisms/Navbar";

interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string | null;
  created_at: string;
  read_time_minutes: number;
  featured_image_url: string | null;
}

const SAMPLE_POSTS: Post[] = [
  { id: "s2", title: "Fifteen Years of Leading: What No One Taught Me", slug: "fifteen-years-of-leading", category: "leadership", excerpt: "A personal inventory of hard-won lessons — from Class Prefect to Consortium President — about what leadership actually costs and what it gives back.", created_at: "2026-02-10", read_time_minutes: 6, featured_image_url: null },
  { id: "s3", title: "SARIMAX and Systems: Forecasting & Uncertainty", slug: "sarimax-and-systems", category: "intellectuality", excerpt: "While modelling irradiation data in Benguerrir, Samuel found unexpected parallels between statistical confidence intervals and the nature of strategic planning.", created_at: "2026-01-22", read_time_minutes: 5, featured_image_url: null },
  { id: "s4", title: "Why Africa's Next Revolution Will Be Intellectual", slug: "africa-next-revolution", category: "transformation", excerpt: "Resources are not what Africa lacks. The missing ingredient is epistemic infrastructure — ways of knowing and deciding that belong to Africa itself.", created_at: "2025-12-15", read_time_minutes: 8, featured_image_url: null },
  { id: "s6", title: "The Servant at the Centre: Rethinking Authority", slug: "servant-at-the-centre", category: "leadership", excerpt: "True authority is not claimed from above — it is granted from below, by the people you serve.", created_at: "2025-10-05", read_time_minutes: 5, featured_image_url: null },
  { id: "s7", title: "Collective Intelligence: A Primer for the Genuinely Curious", slug: "collective-intelligence-primer", category: "intellectuality", excerpt: "How do groups think? What happens when diverse minds work on the same problem? A beginner's guide to the science Samuel studies every day.", created_at: "2025-09-18", read_time_minutes: 6, featured_image_url: null },
  { id: "s8", title: "The Scholarship That Changed Everything", slug: "scholarship-that-changed-everything", category: "transformation", excerpt: "The moment a Government of Ghana award letter arrived — and the quiet understanding that it was not a reward for past effort but a commission for future work.", created_at: "2025-08-22", read_time_minutes: 4, featured_image_url: null },
  { id: "s10", title: "Managing Director at 17: What Running a Business Early Taught Me", slug: "managing-director-at-17", category: "leadership", excerpt: "Cash Washing Bay, Mpohor, 2017. Samuel's first experience of P&L, staff decisions, and the sharp education of early entrepreneurship.", created_at: "2025-06-08", read_time_minutes: 5, featured_image_url: null },
  { id: "s11", title: "Reading Non-Fiction as a Discipline", slug: "nonfiction-as-discipline", category: "intellectuality", excerpt: "Every book is a conversation with a mind sharper than the moment. Samuel reflects on how reading non-fiction has been as formative as any formal education.", created_at: "2025-05-20", read_time_minutes: 5, featured_image_url: null },
  { id: "s12", title: "Ghana to Morocco: The Interior Journey", slug: "ghana-to-morocco", category: "transformation", excerpt: "Geography changes everything — the food, the language, the weather — but the deepest transformation happens in the interior landscape of assumptions and certainties.", created_at: "2025-04-11", read_time_minutes: 7, featured_image_url: null },
];

const CAT_MAP: Record<string, { label: string; color: string; bg: string; href: string }> = {
  leadership:     { label: "Leadership",     color: "#d4a843", bg: "rgba(212,168,67,0.12)",  href: "/leadership"     },
  intellectuality:{ label: "Intellectuality", color: "#5b9ef9", bg: "rgba(91,158,249,0.12)", href: "/intellectuality" },
  transformation: { label: "Transformation", color: "#e05757", bg: "rgba(224,87,87,0.12)",   href: "/transformation" },
};

const TAGS = ["Leadership Philosophy", "Collective Intelligence", "Data Science", "Africa", "Student Life", "Scholarships", "Morocco", "Ghana", "Research", "Gratitude", "Identity", "Purpose", "Technology", "Personal Growth"];

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function fmtShort(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

const CATS = [
  { key: "all",            label: "All Posts",      count: 9 },
  { key: "leadership",     label: "Leadership",     count: 3 },
  { key: "intellectuality",label: "Intellectuality",count: 3 },
  { key: "transformation", label: "Transformation", count: 3 },
];

const blogCss = `
  /* ── BLOG PAGE ── */
  .wpb {
    --bg:        #0f0f0f;
    --surface:   #181818;
    --surface2:  #202020;
    --border:    rgba(255,255,255,0.08);
    --border2:   rgba(255,255,255,0.12);
    --text:      #edebe6;
    --muted:     #787068;
    --muted2:    #a09890;
    --green:     #22c55e;
    --green-dim: rgba(34,197,94,0.15);
    --lead:      #d4a843;
    --intel:     #5b9ef9;
    --trans:     #e05757;
    --radius:    14px;
    --radius-lg: 20px;
    background: var(--bg);
    color: var(--text);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    min-height: 100vh;
  }

  /* ── BLOG HEADER ── */
  .wpb-header {
    background: linear-gradient(160deg, #141414 0%, #0f0f0f 60%);
    border-bottom: 1px solid var(--border);
    padding: 100px 0 56px;
    position: relative;
    overflow: hidden;
  }
  .wpb-header::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 60% 80% at 70% 50%, rgba(34,197,94,0.04) 0%, transparent 70%);
    pointer-events: none;
  }
  .wpb-header-inner {
    max-width: 1200px; margin: 0 auto;
    padding: 0 32px;
    position: relative; z-index: 1;
  }
  .wpb-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--green); margin-bottom: 20px;
  }
  .wpb-eyebrow::before {
    content: ''; display: block;
    width: 24px; height: 1px; background: var(--green);
  }
  .wpb-title {
    font-size: clamp(38px, 6vw, 72px);
    font-weight: 900; letter-spacing: -0.03em; line-height: 1.0;
    margin-bottom: 18px;
  }
  .wpb-title span { color: var(--green); }
  .wpb-desc {
    font-size: clamp(15px, 1.5vw, 18px);
    color: var(--muted2); line-height: 1.7;
    max-width: 560px;
  }
  .wpb-header-stats {
    display: flex; gap: 32px; margin-top: 36px; flex-wrap: wrap;
  }
  .wpb-stat {
    display: flex; flex-direction: column; gap: 3px;
  }
  .wpb-stat-val {
    font-size: 24px; font-weight: 800; letter-spacing: -0.02em;
    color: var(--text);
  }
  .wpb-stat-val span { color: var(--green); }
  .wpb-stat-label { font-size: 11px; color: var(--muted); letter-spacing: 0.06em; }

  /* ── CATEGORY BAR ── */
  .wpb-cats-bar {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    position: sticky; top: 0; z-index: 90;
  }
  .wpb-cats-inner {
    max-width: 1200px; margin: 0 auto;
    padding: 0 32px;
    display: flex; align-items: center; gap: 4px;
    overflow-x: auto; scrollbar-width: none;
    padding-top: 1px;
  }
  .wpb-cats-inner::-webkit-scrollbar { display: none; }
  .wpb-cat-btn {
    display: flex; align-items: center; gap: 7px;
    padding: 14px 18px;
    font-size: 13px; font-weight: 600;
    color: var(--muted); background: none; border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer; white-space: nowrap;
    transition: color 0.18s, border-color 0.18s;
    flex-shrink: 0;
  }
  .wpb-cat-btn .cnt {
    font-size: 10px; padding: 2px 6px; border-radius: 10px;
    background: var(--surface2); color: var(--muted);
    font-weight: 700; transition: background 0.18s, color 0.18s;
  }
  .wpb-cat-btn:hover { color: var(--text); }
  .wpb-cat-btn.active { color: var(--text); border-bottom-color: var(--green); }
  .wpb-cat-btn.active .cnt { background: var(--green-dim); color: var(--green); }

  /* ── MAIN LAYOUT ── */
  .wpb-layout {
    max-width: 1200px; margin: 0 auto;
    padding: 52px 32px 80px;
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 52px;
    align-items: start;
  }

  /* ── FEATURED POST ── */
  .wpb-featured {
    display: block; text-decoration: none; color: inherit;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    margin-bottom: 36px;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .wpb-featured:hover {
    border-color: rgba(34,197,94,0.3);
    box-shadow: 0 8px 40px rgba(0,0,0,0.5);
  }
  .wpb-feat-image {
    height: 220px;
    background: linear-gradient(135deg, #1a1a1a 0%, #222 50%, #1a1a1a 100%);
    position: relative; overflow: hidden;
  }
  .wpb-feat-image-pattern {
    position: absolute; inset: 0;
    background-image: radial-gradient(rgba(34,197,94,0.06) 1px, transparent 1px);
    background-size: 24px 24px;
  }
  .wpb-feat-image-accent {
    position: absolute; bottom: 0; left: 0; right: 0; height: 4px;
  }
  .wpb-feat-image-accent.lead  { background: linear-gradient(90deg, #d4a843, #f0c060); }
  .wpb-feat-image-accent.intel { background: linear-gradient(90deg, #3b82f6, #60a5fa); }
  .wpb-feat-image-accent.trans { background: linear-gradient(90deg, #e05757, #f07070); }
  .wpb-feat-badge {
    position: absolute; top: 20px; left: 20px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 5px 12px; border-radius: 20px;
    backdrop-filter: blur(8px);
  }
  .wpb-feat-badge.lead  { background: rgba(212,168,67,0.2);  color: #d4a843; border: 1px solid rgba(212,168,67,0.3); }
  .wpb-feat-badge.intel { background: rgba(91,158,249,0.2);  color: #5b9ef9; border: 1px solid rgba(91,158,249,0.3); }
  .wpb-feat-badge.trans { background: rgba(224,87,87,0.2);   color: #e05757; border: 1px solid rgba(224,87,87,0.3); }
  .wpb-feat-body {
    padding: 28px 32px 32px;
  }
  .wpb-feat-featured-pill {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--green); margin-bottom: 14px;
  }
  .wpb-feat-featured-pill::before {
    content: ''; display: block; width: 6px; height: 6px;
    border-radius: 50%; background: var(--green);
    animation: wpb-pulse 1.8s ease-in-out infinite;
  }
  @keyframes wpb-pulse {
    0%,100%{opacity:1;transform:scale(1);}
    50%{opacity:0.4;transform:scale(1.4);}
  }
  .wpb-feat-title {
    font-size: clamp(20px, 2.5vw, 28px);
    font-weight: 800; letter-spacing: -0.025em; line-height: 1.2;
    margin-bottom: 12px;
    transition: color 0.2s;
  }
  .wpb-featured:hover .wpb-feat-title { color: var(--green); }
  .wpb-feat-excerpt {
    font-size: 15px; line-height: 1.75;
    color: var(--muted2); margin-bottom: 22px;
  }
  .wpb-feat-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding-top: 18px; border-top: 1px solid var(--border);
    flex-wrap: wrap; gap: 12px;
  }
  .wpb-feat-meta {
    display: flex; align-items: center; gap: 12px;
    font-size: 12px; color: var(--muted);
  }
  .wpb-feat-meta-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--muted); }
  .wpb-read-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 20px;
    background: var(--green-dim); color: var(--green);
    border: 1px solid rgba(34,197,94,0.2);
    border-radius: 10px;
    font-size: 12px; font-weight: 700; letter-spacing: 0.04em;
    text-decoration: none;
    transition: background 0.2s, border-color 0.2s;
  }
  .wpb-featured:hover .wpb-read-btn { background: rgba(34,197,94,0.25); border-color: rgba(34,197,94,0.4); }

  /* ── SECTION HEADING ── */
  .wpb-section-heading {
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 24px;
  }
  .wpb-section-label {
    font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--muted); white-space: nowrap;
  }
  .wpb-section-rule { flex: 1; height: 1px; background: var(--border); }

  /* ── POST CARDS GRID ── */
  .wpb-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
    margin-bottom: 32px;
  }
  .wpb-card {
    display: flex; flex-direction: column;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    text-decoration: none; color: inherit;
    transition: border-color 0.2s, transform 0.2s;
  }
  .wpb-card:hover { border-color: var(--border2); transform: translateY(-2px); }
  .wpb-card-accent {
    height: 3px; flex-shrink: 0;
  }
  .wpb-card-accent.lead  { background: linear-gradient(90deg, #d4a843, #f0c060); }
  .wpb-card-accent.intel { background: linear-gradient(90deg, #3b82f6, #5b9ef9); }
  .wpb-card-accent.trans { background: linear-gradient(90deg, #e05757, #f07070); }
  .wpb-card-body { padding: 22px 22px 20px; flex: 1; display: flex; flex-direction: column; }
  .wpb-card-cat {
    font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    margin-bottom: 10px;
  }
  .wpb-card-cat.lead  { color: var(--lead); }
  .wpb-card-cat.intel { color: var(--intel); }
  .wpb-card-cat.trans { color: var(--trans); }
  .wpb-card-title {
    font-size: 15px; font-weight: 700; line-height: 1.4;
    letter-spacing: -0.01em; margin-bottom: 10px;
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
    transition: color 0.2s;
  }
  .wpb-card:hover .wpb-card-title { color: var(--green); }
  .wpb-card-excerpt {
    font-size: 13px; line-height: 1.7; color: var(--muted2);
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
    flex: 1; margin-bottom: 16px;
  }
  .wpb-card-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding-top: 14px; border-top: 1px solid var(--border);
    font-size: 11px; color: var(--muted);
  }
  .wpb-card-arrow {
    font-size: 14px; color: var(--green);
    transition: transform 0.2s;
  }
  .wpb-card:hover .wpb-card-arrow { transform: translateX(4px); }

  /* ── SIDEBAR ── */
  .wpb-sidebar { display: flex; flex-direction: column; gap: 28px; }
  .wpb-widget {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
  }
  .wpb-widget-header {
    padding: 16px 20px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 10px;
  }
  .wpb-widget-icon {
    width: 6px; height: 6px; border-radius: 50%; background: var(--green); flex-shrink: 0;
  }
  .wpb-widget-title {
    font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--muted);
  }

  /* About widget */
  .wpb-about-body { padding: 20px; }
  .wpb-about-name {
    font-size: 16px; font-weight: 800; letter-spacing: -0.01em; margin-bottom: 8px;
  }
  .wpb-about-name span { color: var(--green); }
  .wpb-about-desc {
    font-size: 13px; line-height: 1.7; color: var(--muted2); margin-bottom: 14px;
  }
  .wpb-about-link {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 12px; font-weight: 600; color: var(--green);
    text-decoration: none;
    transition: gap 0.2s;
  }
  .wpb-about-link:hover { gap: 10px; }

  /* Categories widget */
  .wpb-cat-list { padding: 8px 0; }
  .wpb-cat-item {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 20px;
    text-decoration: none; color: var(--text);
    border-bottom: 1px solid var(--border);
    font-size: 13px; font-weight: 500;
    transition: background 0.15s, color 0.15s;
  }
  .wpb-cat-item:last-child { border-bottom: none; }
  .wpb-cat-item:hover { background: var(--surface2); }
  .wpb-cat-item:hover .wpb-cat-item-label { color: var(--green); }
  .wpb-cat-item-row { display: flex; align-items: center; gap: 8px; }
  .wpb-cat-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .wpb-cat-count {
    font-size: 10px; font-weight: 700;
    padding: 2px 7px; border-radius: 10px;
    background: var(--surface2); color: var(--muted);
  }

  /* Newsletter widget */
  .wpb-nl-body { padding: 20px; }
  .wpb-nl-heading {
    font-size: 15px; font-weight: 800; letter-spacing: -0.01em;
    margin-bottom: 8px; line-height: 1.3;
  }
  .wpb-nl-heading span { color: var(--green); }
  .wpb-nl-desc { font-size: 12px; line-height: 1.65; color: var(--muted2); margin-bottom: 16px; }
  .wpb-nl-input {
    width: 100%; padding: 10px 14px; border-radius: 10px;
    background: var(--surface2); border: 1px solid var(--border);
    color: var(--text); font-size: 13px; font-family: inherit;
    outline: none; margin-bottom: 8px;
    transition: border-color 0.2s;
  }
  .wpb-nl-input:focus { border-color: rgba(34,197,94,0.4); }
  .wpb-nl-input::placeholder { color: var(--muted); }
  .wpb-nl-btn {
    width: 100%; padding: 11px;
    background: var(--green); color: #0a0a0a;
    border: none; border-radius: 10px;
    font-size: 13px; font-weight: 700; font-family: inherit;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  .wpb-nl-btn:hover { opacity: 0.85; }
  .wpb-nl-msg { font-size: 11px; color: var(--green); margin-top: 6px; }

  /* Tags widget */
  .wpb-tags-body { padding: 16px 20px; }
  .wpb-tags-wrap { display: flex; flex-wrap: wrap; gap: 6px; }
  .wpb-tag {
    padding: 5px 12px; border-radius: 20px;
    background: var(--surface2); border: 1px solid var(--border);
    font-size: 11px; font-weight: 500; color: var(--muted2);
    transition: color 0.15s, border-color 0.15s;
    cursor: default;
  }
  .wpb-tag:hover { color: var(--text); border-color: var(--border2); }

  /* Recent posts widget */
  .wpb-recent-list { padding: 4px 0; }
  .wpb-recent-item {
    display: flex; gap: 12px; align-items: flex-start;
    padding: 12px 20px;
    border-bottom: 1px solid var(--border);
    text-decoration: none; color: inherit;
    transition: background 0.15s;
  }
  .wpb-recent-item:last-child { border-bottom: none; }
  .wpb-recent-item:hover { background: var(--surface2); }
  .wpb-recent-num {
    font-size: 16px; font-weight: 900;
    color: rgba(255,255,255,0.06);
    flex-shrink: 0; width: 26px; text-align: right; line-height: 1;
    padding-top: 2px;
  }
  .wpb-recent-title {
    font-size: 13px; font-weight: 600; line-height: 1.45;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    margin-bottom: 4px;
    transition: color 0.15s;
  }
  .wpb-recent-item:hover .wpb-recent-title { color: var(--green); }
  .wpb-recent-date { font-size: 11px; color: var(--muted); }

  /* ── EMPTY STATE ── */
  .wpb-empty {
    grid-column: 1 / -1;
    text-align: center; padding: 80px 20px;
    color: var(--muted); font-size: 15px; font-style: italic;
  }

  /* ── BLOG QUOTE BANNER ── */
  .wpb-quote-banner {
    background: linear-gradient(135deg, var(--surface) 0%, #1a1a1a 100%);
    border: 1px solid var(--border);
    border-left: 3px solid var(--green);
    border-radius: var(--radius);
    padding: 28px 32px;
    margin-bottom: 36px;
  }
  .wpb-quote-text {
    font-size: clamp(16px, 1.8vw, 20px);
    font-style: italic; line-height: 1.65;
    color: var(--text); margin-bottom: 10px;
  }
  .wpb-quote-attr {
    font-size: 12px; font-weight: 600; letter-spacing: 0.08em;
    color: var(--green); text-transform: uppercase;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .wpb-layout { grid-template-columns: 1fr; gap: 40px; }
    .wpb-sidebar { order: -1; }
    .wpb-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 640px) {
    .wpb-header { padding: 80px 0 40px; }
    .wpb-header-inner { padding: 0 20px; }
    .wpb-cats-inner { padding: 0 20px; }
    .wpb-layout { padding: 32px 20px 60px; }
    .wpb-feat-body { padding: 20px 22px 22px; }
  }
`;

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>(SAMPLE_POSTS);
  const [filter, setFilter] = useState<string>("all");
  const [nlEmail, setNlEmail] = useState("");
  const [nlMsg, setNlMsg] = useState("");

  const load = useCallback(async () => {
    try {
      const sb = createAnonClient();
      const { data } = await sb
        .from("blog_posts")
        .select("id, title, slug, category, excerpt, created_at, read_time_minutes, featured_image_url")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (data && data.length > 0) setPosts(data);
    } catch { /* fallback to sample */ }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleNl(e: React.FormEvent) {
    e.preventDefault();
    if (!nlEmail.trim()) return;
    try {
      const sb = createAnonClient();
      const { error } = await sb.from("newsletter_subscribers").insert({ email: nlEmail.trim() });
      if (error) throw error;
      setNlMsg("Subscribed — thank you.");
      setNlEmail("");
    } catch {
      setNlMsg("Already subscribed or something went wrong.");
    }
  }

  const displayed = filter === "all" ? posts : posts.filter((p) => p.category === filter);
  const featured = displayed[0];
  const rest = displayed.slice(1);

  function getCls(cat: string) {
    const map: Record<string, string> = { leadership: "lead", intellectuality: "intel", transformation: "trans" };
    return map[cat] ?? "";
  }

  const catCounts = posts.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="wpb">
      <style>{blogCss}</style>
      <Navbar />

      {/* ── HEADER ── */}
      <header className="wpb-header">
        <div className="wpb-header-inner">
          <div className="wpb-eyebrow">The Journal</div>
          <h1 className="wpb-title">Essays &<br /><span>Reflections</span></h1>
          <p className="wpb-desc">
            Writing on leadership, collective intelligence, and transformation — from fieldwork, scholarship, and lived experience.
          </p>
          <div className="wpb-header-stats">
            <div className="wpb-stat">
              <div className="wpb-stat-val">{posts.length}<span>+</span></div>
              <div className="wpb-stat-label">Published Essays</div>
            </div>
            <div className="wpb-stat">
              <div className="wpb-stat-val">3</div>
              <div className="wpb-stat-label">Topics</div>
            </div>
            <div className="wpb-stat">
              <div className="wpb-stat-val">Samuel <span>K.</span></div>
              <div className="wpb-stat-label">Gyasi · Author</div>
            </div>
          </div>
        </div>
      </header>

      {/* ── CATEGORY BAR ── */}
      <nav className="wpb-cats-bar" aria-label="Blog categories">
        <div className="wpb-cats-inner">
          {CATS.map((c) => (
            <button
              key={c.key}
              className={`wpb-cat-btn ${filter === c.key ? "active" : ""}`}
              onClick={() => setFilter(c.key)}
            >
              {c.label}
              <span className="cnt">
                {c.key === "all" ? posts.length : (catCounts[c.key] ?? 0)}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* ── MAIN LAYOUT ── */}
      <div className="wpb-layout">

        {/* ── MAIN CONTENT ── */}
        <main>
          {/* FEATURED */}
          {featured ? (
            <Link href={`/${featured.category}/blog/${featured.slug}`} className="wpb-featured">
              <div className="wpb-feat-image">
                <div className="wpb-feat-image-pattern" />
                <div className={`wpb-feat-image-accent ${getCls(featured.category)}`} />
                <div className={`wpb-feat-badge ${getCls(featured.category)}`}>
                  {CAT_MAP[featured.category]?.label ?? featured.category}
                </div>
              </div>
              <div className="wpb-feat-body">
                <div className="wpb-feat-featured-pill">Featured Post</div>
                <h2 className="wpb-feat-title">{featured.title}</h2>
                {featured.excerpt && <p className="wpb-feat-excerpt">{featured.excerpt}</p>}
                <div className="wpb-feat-footer">
                  <div className="wpb-feat-meta">
                    <span>Samuel K. Gyasi</span>
                    <span className="wpb-feat-meta-dot" />
                    <span>{fmt(featured.created_at)}</span>
                    <span className="wpb-feat-meta-dot" />
                    <span>{featured.read_time_minutes} min read</span>
                  </div>
                  <div className="wpb-read-btn">Read Essay →</div>
                </div>
              </div>
            </Link>
          ) : (
            <p className="wpb-empty">No posts in this category yet.</p>
          )}

          {/* QUOTE BANNER */}
          <div className="wpb-quote-banner">
            <div className="wpb-quote-text">
              &ldquo;The purpose of knowledge is not merely to know — it is to serve.&rdquo;
            </div>
            <div className="wpb-quote-attr">— Samuel K. Gyasi</div>
          </div>

          {/* GRID */}
          {rest.length > 0 && (
            <>
              <div className="wpb-section-heading">
                <span className="wpb-section-label">More Essays</span>
                <span className="wpb-section-rule" />
                <span style={{ fontSize: "11px", color: "var(--muted)", whiteSpace: "nowrap" }}>{rest.length} posts</span>
              </div>
              <div className="wpb-grid">
                {rest.map((p) => (
                  <Link key={p.id} href={`/${p.category}/blog/${p.slug}`} className="wpb-card">
                    <div className={`wpb-card-accent ${getCls(p.category)}`} />
                    <div className="wpb-card-body">
                      <div className={`wpb-card-cat ${getCls(p.category)}`}>
                        {CAT_MAP[p.category]?.label ?? p.category}
                      </div>
                      <div className="wpb-card-title">{p.title}</div>
                      {p.excerpt && <div className="wpb-card-excerpt">{p.excerpt}</div>}
                      <div className="wpb-card-footer">
                        <span>{fmtShort(p.created_at)} · {p.read_time_minutes} min</span>
                        <span className="wpb-card-arrow">→</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </main>

        {/* ── SIDEBAR ── */}
        <aside className="wpb-sidebar">

          {/* About */}
          <div className="wpb-widget">
            <div className="wpb-widget-header">
              <span className="wpb-widget-icon" />
              <span className="wpb-widget-title">About the Author</span>
            </div>
            <div className="wpb-about-body">
              <div className="wpb-about-name">Samuel <span>K. Gyasi</span></div>
              <p className="wpb-about-desc">
                Junior Program Officer at the School of Collective Intelligence · UM6P, Morocco. Writing on leadership, intelligence, and transformation.
              </p>
              <Link href="/" className="wpb-about-link">Visit Portfolio →</Link>
            </div>
          </div>

          {/* Categories */}
          <div className="wpb-widget">
            <div className="wpb-widget-header">
              <span className="wpb-widget-icon" />
              <span className="wpb-widget-title">Browse by Category</span>
            </div>
            <div className="wpb-cat-list">
              {[
                { href: "/leadership",      label: "Leadership",     color: "#d4a843" },
                { href: "/intellectuality", label: "Intellectuality", color: "#5b9ef9" },
                { href: "/transformation",  label: "Transformation",  color: "#e05757" },
              ].map((c) => (
                <Link key={c.href} href={`${c.href}/blog`} className="wpb-cat-item">
                  <div className="wpb-cat-item-row">
                    <span className="wpb-cat-dot" style={{ background: c.color }} />
                    <span className="wpb-cat-item-label">{c.label}</span>
                  </div>
                  <span className="wpb-cat-count">{catCounts[c.href.slice(1)] ?? 0}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent */}
          <div className="wpb-widget">
            <div className="wpb-widget-header">
              <span className="wpb-widget-icon" />
              <span className="wpb-widget-title">Recent Posts</span>
            </div>
            <div className="wpb-recent-list">
              {posts.slice(0, 4).map((p, i) => (
                <Link key={p.id} href={`/${p.category}/blog/${p.slug}`} className="wpb-recent-item">
                  <div className="wpb-recent-num">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <div className="wpb-recent-title">{p.title}</div>
                    <div className="wpb-recent-date">{fmtShort(p.created_at)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="wpb-widget">
            <div className="wpb-widget-header">
              <span className="wpb-widget-icon" />
              <span className="wpb-widget-title">Newsletter</span>
            </div>
            <div className="wpb-nl-body">
              <div className="wpb-nl-heading">Stay in the <span>Loop</span></div>
              <p className="wpb-nl-desc">New essays delivered when the thinking is ready.</p>
              <form onSubmit={handleNl}>
                <input
                  type="email"
                  className="wpb-nl-input"
                  placeholder="your@email.com"
                  value={nlEmail}
                  onChange={(e) => setNlEmail(e.target.value)}
                  required
                />
                <button type="submit" className="wpb-nl-btn">Subscribe</button>
                {nlMsg && <p className="wpb-nl-msg">{nlMsg}</p>}
              </form>
            </div>
          </div>

          {/* Tags */}
          <div className="wpb-widget">
            <div className="wpb-widget-header">
              <span className="wpb-widget-icon" />
              <span className="wpb-widget-title">Tags</span>
            </div>
            <div className="wpb-tags-body">
              <div className="wpb-tags-wrap">
                {TAGS.map((t) => <span key={t} className="wpb-tag">{t}</span>)}
              </div>
            </div>
          </div>

        </aside>
      </div>

      <SiteFooter />
    </div>
  );
}
