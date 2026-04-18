"use client";

import { Globe, ExternalLink } from "lucide-react";
import type { BlogPost, Subscriber, Message, EmailLog, AnalyticsData, Tab } from "./types";

function MiniBarChart({ data }: { data: { date: string; count: number }[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="adm-chart">
      {data.map((d) => (
        <div key={d.date} className="adm-chart-col" title={`${d.date}: ${d.count}`}>
          <div className="adm-chart-bar" style={{ height: `${Math.max((d.count / max) * 100, 2)}%` }} />
          <div className="adm-chart-lbl">
            {new Date(d.date + "T12:00:00").toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
          </div>
        </div>
      ))}
    </div>
  );
}

export function OverviewTab({ posts, subs, msgs, logs, analytics, onNav }: {
  posts: BlogPost[]; subs: Subscriber[]; msgs: Message[];
  logs: EmailLog[]; analytics: AnalyticsData | null;
  onNav: (t: Tab) => void;
}) {
  const pub      = posts.filter((p) => p.published).length;
  const unread   = msgs.filter((m) => !m.read).length;
  const opened   = logs.filter((l) => l.opened_at).length;
  const openRate = logs.length ? Math.round((opened / logs.length) * 100) : 0;

  const STATS: { num: string | number; label: string; nav: Tab }[] = [
    { num: posts.length,                  label: "Total Posts",      nav: "posts"       },
    { num: pub,                           label: "Published",        nav: "posts"       },
    { num: subs.length,                   label: "Subscribers",      nav: "subscribers" },
    { num: unread,                        label: "Unread Messages",  nav: "messages"    },
    { num: analytics?.totalViews   ?? "—", label: "Page Views (30d)", nav: "analytics"  },
    { num: analytics?.uniqueVisitors ?? "—", label: "Visitors (30d)", nav: "analytics"  },
    { num: logs.length,                   label: "Emails Sent",      nav: "mail"        },
    { num: `${openRate}%`,                label: "Open Rate",        nav: "mail"        },
  ];

  return (
    <>
      <div className="adm-header">
        <div>
          <div className="adm-page-title">Dashboard</div>
          <p className="adm-page-sub">Welcome back, Samuel.</p>
        </div>
        <a href="/" target="_blank" rel="noreferrer" className="adm-btn adm-btn--ghost" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 18px", fontSize: "8px" }}>
          <Globe size={10} /> View Site
        </a>
      </div>

      <div className="adm-stats-row">
        {STATS.map(({ num, label, nav }) => (
          <div key={label} className="adm-stat" style={{ cursor: "pointer" }} role="button" onClick={() => onNav(nav)}>
            <div className="adm-stat-num">{num}</div>
            <div className="adm-stat-label">{label}</div>
          </div>
        ))}
      </div>

      {analytics && (
        <div style={{ marginBottom: "48px" }}>
          <div className="adm-section-header">
            <div className="adm-section-title">Page Views — Last 14 Days</div>
            <button className="adm-btn adm-btn--ghost" onClick={() => onNav("analytics")}>Full Report</button>
          </div>
          <MiniBarChart data={analytics.dailyViews} />
        </div>
      )}

      <div className="adm-section-header">
        <div className="adm-section-title">Recent Posts</div>
        <button className="adm-btn adm-btn--ghost" onClick={() => onNav("posts")}>View All</button>
      </div>
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead><tr><th>Title</th><th>Category</th><th>Status</th><th>Date</th></tr></thead>
          <tbody>
            {posts.slice(0, 5).map((p) => (
              <tr key={p.id}>
                <td style={{ color: "#f0ece4" }}>{p.title}</td>
                <td style={{ textTransform: "capitalize" }}>{p.category}</td>
                <td><span className={`adm-badge ${p.published ? "adm-badge--published" : "adm-badge--draft"}`}>{p.published ? "Published" : "Draft"}</span></td>
                <td>{new Date(p.created_at).toLocaleDateString("en-GB")}</td>
              </tr>
            ))}
            {posts.length === 0 && <tr><td colSpan={4} className="adm-empty" style={{ padding: "30px", textAlign: "center" }}>No posts yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function AnalyticsTab({ analytics }: { analytics: AnalyticsData | null }) {
  if (!analytics) return <p className="adm-empty">No analytics data. Visit the site to start tracking.</p>;
  const { totalViews, uniqueVisitors, topPages, dailyViews } = analytics;

  return (
    <>
      <div className="adm-header">
        <div><div className="adm-page-title">Analytics</div><p className="adm-page-sub">Last 30 days · samuelgyasi.com</p></div>
      </div>

      <div className="adm-stats-row" style={{ marginBottom: "40px" }}>
        {[
          { num: totalViews,     label: "Total Page Views" },
          { num: uniqueVisitors, label: "Unique Visitors"  },
          { num: totalViews > 0 ? (totalViews / 30).toFixed(1) : "—", label: "Avg Views / Day" },
          { num: topPages[0]?.count ?? "—",  label: "Top Page Views"  },
        ].map(({ num, label }) => (
          <div key={label} className="adm-stat">
            <div className="adm-stat-num">{num}</div>
            <div className="adm-stat-label">{label}</div>
          </div>
        ))}
      </div>

      <div className="adm-section-header" style={{ marginBottom: "12px" }}>
        <div className="adm-section-title">Daily Views <span style={{ fontSize: "12px", fontFamily: "'Poppins',sans-serif", color: "rgba(240,236,228,.3)" }}>— 14d</span></div>
      </div>
      <MiniBarChart data={dailyViews} />

      <div style={{ marginTop: "48px" }}>
        <div className="adm-section-header" style={{ marginBottom: "16px" }}>
          <div className="adm-section-title">Top Pages</div>
        </div>
        {topPages.length === 0 ? <p className="adm-empty">No data yet.</p> : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead><tr><th>Page</th><th>Views</th><th>Share</th></tr></thead>
              <tbody>
                {topPages.map(({ path, count }) => (
                  <tr key={path}>
                    <td style={{ color: "#f0ece4", fontFamily: "'Poppins',sans-serif", fontSize: "11px" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        {path}
                        <a href={path} target="_blank" rel="noreferrer" style={{ color: "rgba(240,236,228,.25)", lineHeight: 0 }}><ExternalLink size={10} /></a>
                      </span>
                    </td>
                    <td style={{ color: "#22c55e", fontFamily: "'Poppins',sans-serif", fontSize: "22px" }}>{count}</td>
                    <td style={{ minWidth: "140px" }}>
                      <div className="adm-progress-row">
                        <div className="adm-progress" style={{ width: `${(count / totalViews) * 100}%` }} />
                        <span>{((count / totalViews) * 100).toFixed(1)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
