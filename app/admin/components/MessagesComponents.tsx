"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CheckCheck, Reply, X, Send, AlignLeft, Code } from "lucide-react";
import { Message, EmailTemplate } from "./types";

// ── MESSAGES TAB ──────────────────────────────────────────────────────────
export function MsgsTab({ msgs, templates, onRead }: {
  msgs: Message[]; templates: EmailTemplate[];
  onRead: (id: string) => Promise<void>;
}) {
  const [exp, setExp]   = useState<string | null>(null);
  const [rply, setRply] = useState<Message | null>(null);

  return (
    <>
      <div className="adm-header">
        <div><div className="adm-page-title">Messages</div><p className="adm-page-sub">{msgs.filter((m) => !m.read).length} unread</p></div>
      </div>
      {msgs.length === 0 ? <p className="adm-empty">No messages yet.</p> : (
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {msgs.map((m) => (
            <div key={m.id} className={`adm-msg-card${m.read ? "" : " adm-msg-card--new"}`}>
              <div className="adm-msg-header">
                <div>
                  <div className="adm-msg-name">{m.name}{!m.read && <span className="adm-badge adm-badge--new" style={{ marginLeft: 8 }}>NEW</span>}</div>
                  <div className="adm-msg-meta">{m.email} · {new Date(m.created_at).toLocaleDateString("en-GB")}</div>
                  {m.subject && <div className="adm-msg-subject">Re: {m.subject}</div>}
                </div>
                <div className="adm-action-row" style={{ flexShrink: 0 }}>
                  <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => setExp(exp === m.id ? null : m.id)}>{exp === m.id ? "Collapse" : "Read"}</button>
                  {!m.read && <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => onRead(m.id)}><CheckCheck size={9} /></button>}
                  <button className="adm-btn adm-btn--gold adm-btn--sm" onClick={() => setRply(rply?.id === m.id ? null : m)} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <Reply size={9} />Reply
                  </button>
                </div>
              </div>
              {exp === m.id && <div className="adm-msg-body">{m.message}</div>}
              {rply?.id === m.id && (
                <QuickReply to={m.email} subject={`Re: ${m.subject ?? "Your message"}`} templates={templates} onClose={() => setRply(null)} />
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// ── QUICK REPLY ────────────────────────────────────────────────────────────
export function QuickReply({ to, subject, templates, onClose }: {
  to: string; subject: string; templates: EmailTemplate[]; onClose: () => void;
}) {
  const [body, setBody]   = useState("");
  const [mode, setMode]   = useState<"text" | "html">("text");
  const [busy, setBusy]   = useState(false);
  const [tpl, setTpl]     = useState("");

  function applyTpl(id: string) {
    const t = templates.find((t) => t.id === id);
    if (t) setBody(mode === "html" ? t.body_html : t.body_text);
    setTpl(id);
  }

  async function send() {
    if (!body.trim()) { toast.error("Body required"); return; }
    setBusy(true);
    const r = await fetch("/api/mail/send", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, subject, bodyHtml: mode === "html" ? body : undefined, bodyText: mode === "text" ? body : undefined }),
    });
    setBusy(false);
    if (!r.ok) { const d = await r.json(); toast.error(d.error ?? "Failed"); return; }
    toast.success(`Reply sent to ${to}`);
    onClose();
  }

  return (
    <div className="adm-quick-reply">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "9px", color: "rgba(240,236,228,.45)", letterSpacing: ".1em", textTransform: "uppercase" }}>Reply to {to}</span>
        <button style={{ background: "none", border: "none", color: "rgba(240,236,228,.35)", cursor: "pointer" }} onClick={onClose}><X size={13} /></button>
      </div>
      {templates.length > 0 && (
        <select className="adm-select" value={tpl} onChange={(e) => applyTpl(e.target.value)} style={{ fontSize: "12px", padding: "7px 10px", marginBottom: "8px" }}>
          <option value="">— Load template —</option>
          {templates.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      )}
      <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
        <button className={`adm-btn adm-btn--sm ${mode === "text" ? "adm-btn--gold" : "adm-btn--ghost"}`} onClick={() => setMode("text")}><AlignLeft size={9} style={{ marginRight: 4 }} />Text</button>
        <button className={`adm-btn adm-btn--sm ${mode === "html" ? "adm-btn--gold" : "adm-btn--ghost"}`} onClick={() => setMode("html")}><Code size={9} style={{ marginRight: 4 }} />HTML</button>
      </div>
      <textarea className="adm-textarea" style={{ minHeight: "110px" }} value={body} onChange={(e) => setBody(e.target.value)} placeholder={mode === "html" ? "<p>Your reply…</p>" : "Your reply…"} />
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
        <button className="adm-btn adm-btn--gold" onClick={send} disabled={busy} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Send size={10} />{busy ? "Sending…" : "Send Reply"}
        </button>
      </div>
    </div>
  );
}
