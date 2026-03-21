"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Send, Inbox, Clock, BookOpen, Eye, Pencil, Trash2, Plus, CheckCheck, Reply, Code, AlignLeft, X } from "lucide-react";
import { EmailLog, InboundEmail, EmailTemplate, MailSubTab } from "./types";
import { QuickReply } from "./MessagesComponents";

// ── MAIL TAB ──────────────────────────────────────────────────────────────
export function MailTab({ sub, setSub, logs, inbox, templates, onReload, db, onEditTpl, onNewTpl, onDeleteTpl }: {
  sub: MailSubTab; setSub: (t: MailSubTab) => void;
  logs: EmailLog[]; inbox: InboundEmail[]; templates: EmailTemplate[];
  onReload: () => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  db: any;
  onEditTpl: (t: EmailTemplate) => void;
  onNewTpl: () => void;
  onDeleteTpl: (id: string, name: string) => void;
}) {
  const unread = inbox.filter((e) => !e.read).length;
  const SUBS: { id: MailSubTab; label: string; Icon: React.ComponentType<{ size?: number }>; badge?: number }[] = [
    { id: "compose",   label: "Compose",   Icon: Send     },
    { id: "inbox",     label: "Inbox",     Icon: Inbox,    badge: unread },
    { id: "sent",      label: "Sent",      Icon: Clock    },
    { id: "templates", label: "Templates", Icon: BookOpen },
  ];

  return (
    <>
      <div className="adm-header">
        <div><div className="adm-page-title">Mail</div><p className="adm-page-sub">impact@samuelgyasi.com · via Resend</p></div>
      </div>
      <div className="adm-mail-subnav">
        {SUBS.map(({ id, label, Icon, badge }) => (
          <button key={id} className={`adm-mail-subtab${sub === id ? " active" : ""}`} onClick={() => setSub(id)}>
            <Icon size={12} />{label}
            {badge ? <span className="adm-nav-badge">{badge}</span> : null}
          </button>
        ))}
      </div>
      {sub === "compose"   && <ComposeView templates={templates} onReload={onReload} />}
      {sub === "inbox"     && <InboxView emails={inbox} db={db} onReload={onReload} templates={templates} />}
      {sub === "sent"      && <SentView logs={logs} />}
      {sub === "templates" && <TplsView templates={templates} onNew={onNewTpl} onEdit={onEditTpl} onDelete={onDeleteTpl} />}
    </>
  );
}

// ── COMPOSE ───────────────────────────────────────────────────────────────
export function ComposeView({ templates, onReload }: { templates: EmailTemplate[]; onReload: () => Promise<void> }) {
  const [to, setTo]       = useState("");
  const [sub, setSub]     = useState("");
  const [body, setBody]   = useState("");
  const [mode, setMode]   = useState<"html" | "text">("html");
  const [prev, setPrev]   = useState(false);
  const [busy, setBusy]   = useState(false);
  const [tpl, setTpl]     = useState("");

  function loadTpl(id: string) {
    const t = templates.find((t) => t.id === id);
    if (t) { setSub(t.subject); setBody(mode === "html" ? t.body_html : t.body_text); }
    setTpl(id);
  }

  async function send() {
    if (!to.trim()) { toast.error("Recipient required"); return; }
    if (!sub.trim()) { toast.error("Subject required"); return; }
    if (!body.trim()) { toast.error("Body required"); return; }
    setBusy(true);
    const r = await fetch("/api/mail/send", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, subject: sub, bodyHtml: mode === "html" ? body : undefined, bodyText: mode === "text" ? body : undefined, templateId: tpl || undefined }),
    });
    const d = await r.json();
    setBusy(false);
    if (!r.ok) { toast.error(d.error ?? "Failed"); return; }
    toast.success(`Email sent to ${to}`);
    setTo(""); setSub(""); setBody(""); setTpl("");
    await onReload();
  }

  return (
    <div className="adm-compose">
      <div className="adm-compose-toolbar">
        {templates.length > 0 && (
          <select className="adm-select" style={{ flex: 1, maxWidth: "260px", fontSize: "12px", padding: "8px 11px" }} value={tpl} onChange={(e) => loadTpl(e.target.value)}>
            <option value="">— Load template —</option>
            {templates.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        )}
        <div style={{ display: "flex", gap: "6px", marginLeft: "auto" }}>
          <button className={`adm-btn adm-btn--sm ${mode === "text" ? "adm-btn--gold" : "adm-btn--ghost"}`} onClick={() => setMode("text")}><AlignLeft size={9} style={{ marginRight: 4 }} />Plain text</button>
          <button className={`adm-btn adm-btn--sm ${mode === "html" ? "adm-btn--gold" : "adm-btn--ghost"}`} onClick={() => setMode("html")}><Code size={9} style={{ marginRight: 4 }} />HTML</button>
          {mode === "html" && <button className={`adm-btn adm-btn--sm ${prev ? "adm-btn--gold" : "adm-btn--ghost"}`} onClick={() => setPrev(!prev)}><Eye size={9} style={{ marginRight: 4 }} />Preview</button>}
        </div>
      </div>

      <div className="adm-field"><label className="adm-label">To</label><input className="adm-input" type="email" value={to} onChange={(e) => setTo(e.target.value)} placeholder="recipient@email.com" /></div>
      <div className="adm-field"><label className="adm-label">Subject</label><input className="adm-input" value={sub} onChange={(e) => setSub(e.target.value)} placeholder="Email subject" /></div>
      <div className="adm-field">
        <label className="adm-label">{mode === "html" ? "Body (HTML)" : "Body (Plain text)"} <span style={{ color: "rgba(240,236,228,.2)", marginLeft: 6 }}>{body.length} chars</span></label>
        {prev && mode === "html"
          ? <div className="adm-html-preview" dangerouslySetInnerHTML={{ __html: body }} />
          : <textarea className="adm-textarea" style={{ minHeight: "300px", fontFamily: mode === "html" ? "'Space Mono',monospace" : undefined, fontSize: mode === "html" ? "13px" : undefined }} value={body} onChange={(e) => setBody(e.target.value)} placeholder={mode === "html" ? "<h1>Hello,</h1>\n<p>Your message here.</p>" : "Hello,\n\nYour message here."} />
        }
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="adm-btn adm-btn--gold" onClick={send} disabled={busy} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Send size={11} />{busy ? "Sending…" : "Send Email"}
        </button>
      </div>
    </div>
  );
}

// ── INBOX ─────────────────────────────────────────────────────────────────
export function InboxView({ emails, db, onReload, templates }: {
  emails: InboundEmail[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  db: any;
  onReload: () => Promise<void>;
  templates: EmailTemplate[];
}) {
  const [exp, setExp]     = useState<string | null>(null);
  const [rply, setRply]   = useState<InboundEmail | null>(null);
  const [showHtml, setShowHtml] = useState<string | null>(null);

  async function markRead(id: string) {
    await db.from("inbound_emails").update({ read: true }).eq("id", id);
    await onReload();
  }

  return emails.length === 0 ? (
    <div>
      <p className="adm-empty">No inbound emails yet.</p>
      <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "9px", color: "rgba(240,236,228,.2)", textAlign: "center", letterSpacing: ".08em", lineHeight: 2.2, maxWidth: "440px", margin: "0 auto" }}>
        To receive emails here, configure Resend inbound routing<br />
        with webhook → /api/mail/inbound
      </p>
    </div>
  ) : (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      {emails.map((e) => (
        <div key={e.id} className={`adm-msg-card${e.read ? "" : " adm-msg-card--new"}`}>
          <div className="adm-msg-header">
            <div>
              <div className="adm-msg-name">{e.from_name ?? e.from_email}{!e.read && <span className="adm-badge adm-badge--new" style={{ marginLeft: 8 }}>NEW</span>}</div>
              <div className="adm-msg-meta">{e.from_email} · {new Date(e.received_at).toLocaleDateString("en-GB")}</div>
              {e.subject && <div className="adm-msg-subject">{e.subject}</div>}
            </div>
            <div className="adm-action-row" style={{ flexShrink: 0 }}>
              <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => setExp(exp === e.id ? null : e.id)}>{exp === e.id ? "Collapse" : "Read"}</button>
              {e.body_html && <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => setShowHtml(showHtml === e.id ? null : e.id)}><Code size={9} /></button>}
              {!e.read && <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => markRead(e.id)}><CheckCheck size={9} /></button>}
              <button className="adm-btn adm-btn--gold adm-btn--sm" onClick={() => setRply(rply?.id === e.id ? null : e)} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Reply size={9} />Reply
              </button>
            </div>
          </div>
          {exp === e.id && (
            <div className="adm-msg-body">
              {showHtml === e.id
                ? <div dangerouslySetInnerHTML={{ __html: e.body_html ?? "" }} />
                : (e.body_text ?? e.body_html ?? "(empty)")}
            </div>
          )}
          {rply?.id === e.id && (
            <QuickReply to={e.from_email} subject={`Re: ${e.subject ?? "Your email"}`} templates={templates} onClose={() => setRply(null)} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── SENT VIEW ─────────────────────────────────────────────────────────────
export function SentView({ logs }: { logs: EmailLog[] }) {
  const [exp, setExp] = useState<string | null>(null);

  function statusBadge(l: EmailLog) {
    if (l.opened_at)      return <span className="adm-badge adm-badge--opened"><Eye size={8} style={{ marginRight: 3 }} />Opened</span>;
    if (l.status === "failed") return <span className="adm-badge adm-badge--draft">Failed</span>;
    return <span className="adm-badge adm-badge--sent">Sent</span>;
  }

  return logs.length === 0 ? <p className="adm-empty">No emails sent yet.</p> : (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      {logs.map((l) => (
        <div key={l.id} className="adm-msg-card">
          <div className="adm-msg-header">
            <div>
              <div className="adm-msg-name" style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                {l.subject}{statusBadge(l)}
              </div>
              <div className="adm-msg-meta">
                To: {l.to_email} · {new Date(l.sent_at).toLocaleDateString("en-GB")}
                {l.opened_at && ` · Opened ${new Date(l.opened_at).toLocaleDateString("en-GB")}`}
              </div>
            </div>
            <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => setExp(exp === l.id ? null : l.id)}>{exp === l.id ? "Collapse" : "View"}</button>
          </div>
          {exp === l.id && (
            <div className="adm-msg-body">
              {l.body_html ? <div dangerouslySetInnerHTML={{ __html: l.body_html }} /> : (l.body_text ?? "(no body)")}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── TEMPLATES VIEW ────────────────────────────────────────────────────────
export function TplsView({ templates, onNew, onEdit, onDelete }: {
  templates: EmailTemplate[]; onNew: () => void;
  onEdit: (t: EmailTemplate) => void;
  onDelete: (id: string, name: string) => void;
}) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div className="adm-section-title">Email Templates</div>
        <button className="adm-btn adm-btn--gold" onClick={onNew} style={{ display: "flex", alignItems: "center", gap: "6px" }}><Plus size={10} />New Template</button>
      </div>
      {templates.length === 0 ? <p className="adm-empty">No templates. Create reusable email layouts.</p> : (
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {templates.map((t) => (
            <div key={t.id} className="adm-msg-card">
              <div className="adm-msg-header">
                <div>
                  <div className="adm-msg-name">{t.name}</div>
                  <div className="adm-msg-subject" style={{ marginTop: 3 }}>{t.subject}</div>
                  <div className="adm-msg-meta" style={{ marginTop: 3 }}>Created {new Date(t.created_at).toLocaleDateString("en-GB")} · {t.body_html.length} HTML chars</div>
                </div>
                <div className="adm-action-row" style={{ flexShrink: 0 }}>
                  <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => onEdit(t)}><Pencil size={9} /></button>
                  <button className="adm-btn adm-btn--danger adm-btn--sm" onClick={() => onDelete(t.id, t.name)}><Trash2 size={9} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
