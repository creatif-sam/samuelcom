"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import {
  LayoutDashboard, BarChart3, FileText, Users, MessageSquare,
  Mail, Phone, Star, LogOut, Globe, Menu,
} from "lucide-react";

// Import types
import type {
  BlogPost, Subscriber, Message, EmailLog, EmailTemplate, InboundEmail,
  PageViewRow, AnalyticsData, Testimonial, Tab, MailSubTab
} from "./components/types";

// Import components
import { OverviewTab, AnalyticsTab } from "./components/OverviewAnalytics";
import { PostsTab, PostModal } from "./components/PostsComponents";
import { SubscribersTab } from "./components/SubscribersTab";
import { MsgsTab } from "./components/MessagesComponents";
import { MailTab } from "./components/MailComponents";
import { TplModal } from "./components/MailModals";
import { WhatsApp } from "./components/WhatsAppTab";
import { TestimonialsTab, TestimonialModal } from "./components/TestimonialsComponents";

const NAV: { id: Tab; label: string; Icon: React.ComponentType<{ size?: number }> }[] = [
  { id: "overview",     label: "Overview",      Icon: LayoutDashboard },
  { id: "analytics",    label: "Analytics",     Icon: BarChart3       },
  { id: "posts",        label: "Blog Posts",    Icon: FileText        },
  { id: "subscribers",  label: "Subscribers",   Icon: Users           },
  { id: "messages",     label: "Messages",      Icon: MessageSquare   },
  { id: "mail",         label: "Mail",          Icon: Mail            },
  { id: "whatsapp",     label: "WhatsApp",      Icon: Phone           },
  { id: "testimonials", label: "Testimonials",  Icon: Star            },
];

export default function AdminPage() {
  const [tab, setTab]             = useState<Tab>("overview");
  const [mailSub, setMailSub]     = useState<MailSubTab>("compose");
  const [posts, setPosts]         = useState<BlogPost[]>([]);
  const [subs, setSubs]           = useState<Subscriber[]>([]);
  const [msgs, setMsgs]           = useState<Message[]>([]);
  const [logs, setLogs]           = useState<EmailLog[]>([]);
  const [inbox, setInbox]         = useState<InboundEmail[]>([]);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading]     = useState(true);
  const [showPost, setShowPost]   = useState(false);
  const [editPost, setEditPost]   = useState<BlogPost | null>(null);
  const [showTpl, setShowTpl]     = useState(false);
  const [editTpl, setEditTpl]     = useState<EmailTemplate | null>(null);
  const [showTestimonial, setShowTestimonial] = useState(false);
  const [editTestimonial, setEditTestimonial] = useState<Testimonial | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [confirm, setConfirm]     = useState<{ msg: string; fn: () => Promise<void> } | null>(null);
  const [navOpen, setNavOpen]     = useState(false);
  const router = useRouter();

  const db = createClient();

  const handleLogout = async () => {
    await db.auth.signOut();
    router.push("/auth/login");
  };

  const load = useCallback(async () => {
    setLoading(true);
    const [pR, sR, mR, lR, iR, tR, aR, tsR] = await Promise.all([
      db.from("blog_posts").select("*").order("created_at", { ascending: false }),
      db.from("newsletter_subscribers").select("*").order("created_at", { ascending: false }),
      db.from("contact_messages").select("*").order("created_at", { ascending: false }),
      db.from("email_logs").select("*").order("sent_at", { ascending: false }),
      db.from("inbound_emails").select("*").order("received_at", { ascending: false }),
      db.from("email_templates").select("*").order("created_at", { ascending: false }),
      db.from("page_views").select("page_path,visitor_id,created_at")
        .gte("created_at", new Date(Date.now() - 30 * 86400000).toISOString()),
      db.from("testimonials").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false }),
    ]);
    setPosts(pR.data ?? []);
    setSubs(sR.data ?? []);
    setMsgs(mR.data ?? []);
    setLogs(lR.data ?? []);
    setInbox(iR.data ?? []);
    setTemplates(tR.data ?? []);
    setTestimonials(tsR.data ?? []);

    const views: PageViewRow[] = aR.data ?? [];
    const totalViews     = views.length;
    const uniqueVisitors = new Set(views.map((v) => v.visitor_id)).size;
    const pc = views.reduce((a, v) => { a[v.page_path] = (a[v.page_path] ?? 0) + 1; return a; }, {} as Record<string, number>);
    const topPages = Object.entries(pc).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([path, count]) => ({ path, count }));
    const dailyViews: { date: string; count: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d   = new Date(Date.now() - i * 86400000);
      const str = d.toISOString().slice(0, 10);
      dailyViews.push({ date: str, count: views.filter((v) => v.created_at.slice(0, 10) === str).length });
    }
    setAnalytics({ totalViews, uniqueVisitors, topPages, dailyViews });
    setLoading(false);
  }, [db]);

  useEffect(() => { load(); }, [load]);

  const unreadMsgs   = msgs.filter((m) => !m.read).length;
  const unreadInbox  = inbox.filter((e) => !e.read).length;

  function ask(msg: string, fn: () => Promise<void>) { setConfirm({ msg, fn }); }
  function go(t: Tab) { setTab(t); setNavOpen(false); }

  return (
    <div className="adm-layout">
      {/* Mobile header */}
      <div className="adm-mobile-header">
        <button className="adm-hamburger" onClick={() => setNavOpen(!navOpen)} aria-label="Menu">
          <Menu size={18} />
        </button>
        <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "13px", fontWeight: 700, color: "#ffffff" }}>Admin</span>
        <Link href="/" style={{ color: "rgba(255,255,255,.4)", lineHeight: 0 }}><Globe size={16} /></Link>
      </div>

      {/* Sidebar */}
      <aside className={`adm-sidebar${navOpen ? " adm-sidebar--open" : ""}`}>
        <div className="adm-logo">
          <span>Admin</span>
          Samuel Gyasi
        </div>
        <nav className="adm-nav">
          {NAV.map(({ id, label, Icon }) => {
            const badge = id === "messages" && unreadMsgs > 0 ? unreadMsgs
                        : id === "mail"     && unreadInbox > 0 ? unreadInbox
                        : null;
            return (
              <button key={id} className={`adm-nav-item${tab === id ? " active" : ""}`} onClick={() => go(id)}>
                <Icon size={13} />
                <span style={{ flex: 1 }}>{label}</span>
                {badge !== null && <span className="adm-nav-badge">{badge}</span>}
              </button>
            );
          })}
        </nav>
        <div style={{ padding: "0 16px 24px", marginTop: "auto", display: "flex", flexDirection: "column", gap: "8px" }}>
          <Link href="/" style={{ fontFamily: "'Poppins',sans-serif", fontSize: "9px", letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(255,255,255,.25)", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px", padding: "8px 12px" }}>
            <Globe size={10} /> Back to Site
          </Link>
          <button
            onClick={handleLogout}
            className="adm-btn adm-btn--ghost"
            style={{ width: "100%", justifyContent: "center", fontSize: "11px", letterSpacing: ".08em", textTransform: "uppercase" }}
          >
            <LogOut size={12} /> Log Out
          </button>
        </div>
      </aside>

      {navOpen && <div className="adm-overlay-backdrop" onClick={() => setNavOpen(false)} />}

      {/* Main */}
      <main className="adm-main">
        {loading ? (
          <div className="adm-loading"><div className="adm-loading-dot"/><div className="adm-loading-dot"/><div className="adm-loading-dot"/></div>
        ) : (
          <>
            {tab === "overview"     && <OverviewTab posts={posts} subs={subs} msgs={msgs} logs={logs} analytics={analytics} onNav={go} />}
            {tab === "analytics"    && <AnalyticsTab analytics={analytics} />}
            {tab === "posts"        && (
              <PostsTab
                posts={posts}
                onNew={() => { setEditPost(null); setShowPost(true); }}
                onEdit={(p) => { setEditPost(p); setShowPost(true); }}
                onDelete={(id, title) => ask(`Delete "${title}"?`, async () => {
                  const { error } = await db.from("blog_posts").delete().eq("id", id);
                  if (error) { toast.error("Delete failed"); return; }
                  toast.success("Post deleted"); await load();
                })}
                onToggle={async (id, val) => {
                  const { error } = await db.from("blog_posts").update({ published: val }).eq("id", id);
                  if (error) { toast.error("Update failed"); return; }
                  toast.success(val ? "Published" : "Unpublished"); await load();
                }}
              />
            )}
            {tab === "subscribers"  && (
              <SubscribersTab
                subs={subs}
                onDelete={(id: string, email: string) => ask(`Remove ${email}?`, async () => {
                  const { error } = await db.from("newsletter_subscribers").delete().eq("id", id);
                  if (error) { toast.error("Remove failed"); return; }
                  toast.success("Removed"); await load();
                })}
              />
            )}
            {tab === "messages"     && (
              <MsgsTab
                msgs={msgs}
                templates={templates}
                onRead={async (id) => { await db.from("contact_messages").update({ read: true }).eq("id", id); await load(); }}
              />
            )}
            {tab === "mail"         && (
              <MailTab
                sub={mailSub} setSub={setMailSub}
                logs={logs} inbox={inbox} templates={templates}
                onReload={load} db={db}
                onEditTpl={(t) => { setEditTpl(t); setShowTpl(true); }}
                onNewTpl={() => { setEditTpl(null); setShowTpl(true); }}
                onDeleteTpl={(id, name) => ask(`Delete template "${name}"?`, async () => {
                  const r = await fetch(`/api/mail/templates?id=${id}`, { method: "DELETE" });
                  if (!r.ok) { toast.error("Delete failed"); return; }
                  toast.success("Template deleted"); await load();
                })}
              />
            )}
            {tab === "whatsapp"     && <WhatsApp />}
            {tab === "testimonials" && (
              <TestimonialsTab
                testimonials={testimonials}
                onNew={() => { setEditTestimonial(null); setShowTestimonial(true); }}
                onEdit={(t) => { setEditTestimonial(t); setShowTestimonial(true); }}
                onDelete={(id, name) => ask(`Delete testimonial from "${name}"?`, async () => {
                  const { error } = await db.from("testimonials").delete().eq("id", id);
                  if (error) { toast.error("Delete failed"); return; }
                  toast.success("Deleted"); await load();
                })}
                onToggle={async (id, val) => {
                  const { error } = await db.from("testimonials").update({ published: val }).eq("id", id);
                  if (error) { toast.error("Update failed"); return; }
                  toast.success(val ? "Published" : "Unpublished"); await load();
                }}
              />
            )}
          </>
        )}
      </main>

      {showTestimonial && (
        <TestimonialModal
          testimonial={editTestimonial}
          onClose={() => setShowTestimonial(false)}
          onSave={async () => { setShowTestimonial(false); await load(); }}
          db={db}
        />
      )}
      {showPost && (
        <PostModal post={editPost} onClose={() => setShowPost(false)} onSave={async () => { setShowPost(false); await load(); }} db={db} />
      )}
      {showTpl && (
        <TplModal tpl={editTpl} onClose={() => setShowTpl(false)} onSave={async () => { setShowTpl(false); await load(); }} />
      )}
      {confirm && (
        <div className="adm-form-overlay" onClick={() => setConfirm(null)}>
          <div className="adm-confirm-box" onClick={(e) => e.stopPropagation()}>
            <p className="adm-confirm-msg">{confirm.msg}</p>
            <div className="adm-form-actions" style={{ marginTop: 0, paddingTop: 0, border: "none" }}>
              <button className="adm-btn adm-btn--ghost" onClick={() => setConfirm(null)}>Cancel</button>
              <button className="adm-btn adm-btn--danger" onClick={async () => { await confirm.fn(); setConfirm(null); }}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

