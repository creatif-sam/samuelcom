"use client";

import { useState } from "react";
import { toast } from "sonner";
import { X, Code, AlignLeft, Eye } from "lucide-react";
import { EmailTemplate } from "./types";

// ── TEMPLATE MODAL ────────────────────────────────────────────────────────
export function TplModal({ tpl, onClose, onSave }: {
  tpl: EmailTemplate | null; onClose: () => void; onSave: () => Promise<void>;
}) {
  const [name, setName]     = useState(tpl?.name    ?? "");
  const [subj, setSubj]     = useState(tpl?.subject ?? "");
  const [html, setHtml]     = useState(tpl?.body_html ?? "");
  const [text, setText]     = useState(tpl?.body_text ?? "");
  const [tab, setTab]       = useState<"html" | "text">("html");
  const [prev, setPrev]     = useState(false);
  const [busy, setBusy]     = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { toast.error("Name required"); return; }
    if (!subj.trim()) { toast.error("Subject required"); return; }
    setBusy(true);
    const r = await fetch("/api/mail/templates", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: tpl?.id, name, subject: subj, bodyHtml: html, bodyText: text }),
    });
    setBusy(false);
    if (!r.ok) { toast.error("Save failed"); return; }
    toast.success(tpl ? "Template updated" : "Template created");
    await onSave();
  }

  return (
    <div className="adm-form-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="adm-form-modal">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div className="adm-form-title" style={{ margin: 0 }}>{tpl ? "Edit Template" : "New Template"}</div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(240,236,228,.4)", cursor: "pointer" }}><X size={16} /></button>
        </div>
        <form onSubmit={save}>
          <div className="adm-field"><label className="adm-label">Template Name *</label><input className="adm-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Welcome Email" required /></div>
          <div className="adm-field"><label className="adm-label">Subject *</label><input className="adm-input" value={subj} onChange={(e) => setSubj(e.target.value)} placeholder="Email subject line" required /></div>

          <div style={{ display: "flex", gap: "6px", marginBottom: "12px", alignItems: "center" }}>
            <button type="button" className={`adm-btn adm-btn--sm ${tab === "html" ? "adm-btn--gold" : "adm-btn--ghost"}`} onClick={() => setTab("html")}><Code size={9} style={{ marginRight: 4 }} />HTML Body</button>
            <button type="button" className={`adm-btn adm-btn--sm ${tab === "text" ? "adm-btn--gold" : "adm-btn--ghost"}`} onClick={() => setTab("text")}><AlignLeft size={9} style={{ marginRight: 4 }} />Plain Text</button>
            {tab === "html" && <button type="button" className={`adm-btn adm-btn--sm ${prev ? "adm-btn--gold" : "adm-btn--ghost"}`} onClick={() => setPrev(!prev)} style={{ marginLeft: "auto" }}><Eye size={9} style={{ marginRight: 4 }} />Preview</button>}
          </div>

          {tab === "html" && (
            <div className="adm-field">
              <label className="adm-label">HTML <span style={{ color: "rgba(240,236,228,.2)" }}>{html.length} chars</span></label>
              {prev
                ? <div className="adm-html-preview" dangerouslySetInnerHTML={{ __html: html }} />
                : <textarea className="adm-textarea" style={{ fontFamily: "'Poppins',sans-serif", fontSize: "13px" }} value={html} onChange={(e) => setHtml(e.target.value)} placeholder="<h1>Hello,</h1><p>Your content here.</p>" />
              }
            </div>
          )}
          {tab === "text" && (
            <div className="adm-field">
              <label className="adm-label">Plain Text Fallback <span style={{ color: "rgba(240,236,228,.2)" }}>{text.length} chars</span></label>
              <textarea className="adm-textarea" value={text} onChange={(e) => setText(e.target.value)} placeholder={"Hello,\n\nYour content here."} />
            </div>
          )}

          <div className="adm-form-actions">
            <button type="button" className="adm-btn adm-btn--ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="adm-btn adm-btn--gold" disabled={busy}>{busy ? "Saving…" : tpl ? "Save Changes" : "Create Template"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
