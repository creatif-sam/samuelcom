"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Phone, Send, Copy, CheckCheck, ExternalLink } from "lucide-react";

// ── WHATSAPP ──────────────────────────────────────────────────────────────
export function WhatsApp() {
  const DEFAULT_NUM = "233244000000";
  const [num, setNum]     = useState(DEFAULT_NUM);
  const [saved, setSaved] = useState(DEFAULT_NUM);
  const [recip, setRecip] = useState("");
  const [msg, setMsg]     = useState("Hello Samuel, I'd like to connect.");
  const [copied, setCopied] = useState(false);

  const chatLink    = `https://wa.me/${saved.replace(/\D/g, "")}`;
  const composeLink = recip
    ? `https://wa.me/${recip.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`
    : "";

  const QUICK = [
    "Hello! I'd love to connect with you.",
    "Hi Samuel, I'm interested in your speaking services.",
    "Hi, I'd like to discuss a collaboration.",
    "Hello Samuel, I have a question about your work.",
  ];

  async function copy() {
    await navigator.clipboard.writeText(chatLink);
    setCopied(true);
    toast.success("Link copied");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <div className="adm-header">
        <div><div className="adm-page-title">WhatsApp</div><p className="adm-page-sub">Manage your WhatsApp presence</p></div>
      </div>

      <div className="adm-wa-grid">
        {/* Your number */}
        <div className="adm-wa-card">
          <div className="adm-wa-card-title"><Phone size={13} style={{ marginRight: 8 }} />Your WhatsApp Number</div>
          <div className="adm-field">
            <label className="adm-label">Phone (with country code)</label>
            <input className="adm-input" value={num} onChange={(e) => setNum(e.target.value)} placeholder="233XXXXXXXXX" />
          </div>
          <div className="adm-action-row" style={{ flexWrap: "wrap" }}>
            <button className="adm-btn adm-btn--gold adm-btn--sm" onClick={() => { setSaved(num); toast.success("Number saved"); }}>Save</button>
            <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={copy} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              {copied ? <CheckCheck size={9} /> : <Copy size={9} />}{copied ? "Copied!" : "Copy Link"}
            </button>
            <a href={chatLink} target="_blank" rel="noreferrer" className="adm-btn adm-btn--ghost adm-btn--sm" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "5px" }}>
              <ExternalLink size={9} />Open WhatsApp
            </a>
          </div>
          <div className="adm-wa-link-preview">
            <span style={{ display: "block", fontFamily: "'Space Mono',monospace", fontSize: "9px", color: "rgba(240,236,228,.35)", marginBottom: "4px" }}>Your chat link:</span>
            <a href={chatLink} target="_blank" rel="noreferrer" style={{ color: "#25d366", fontFamily: "'Space Mono',monospace", fontSize: "11px", wordBreak: "break-all" }}>{chatLink}</a>
          </div>
        </div>

        {/* Compose / send */}
        <div className="adm-wa-card">
          <div className="adm-wa-card-title"><Send size={13} style={{ marginRight: 8 }} />Send Quick Message</div>
          <div className="adm-field">
            <label className="adm-label">Recipient Number</label>
            <input className="adm-input" value={recip} onChange={(e) => setRecip(e.target.value)} placeholder="233XXXXXXXXX" />
          </div>
          <div className="adm-field">
            <label className="adm-label">Message</label>
            <textarea className="adm-textarea" style={{ minHeight: "90px" }} value={msg} onChange={(e) => setMsg(e.target.value)} />
          </div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
            {QUICK.map((q) => (
              <button key={q} className="adm-btn adm-btn--ghost adm-btn--sm" style={{ fontSize: "9px" }} onClick={() => setMsg(q)}>
                {q.slice(0, 30)}…
              </button>
            ))}
          </div>
          {composeLink
            ? <a href={composeLink} target="_blank" rel="noreferrer" className="adm-btn adm-btn--gold" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}><Phone size={11} />Open in WhatsApp</a>
            : <button className="adm-btn adm-btn--ghost" disabled style={{ opacity: .35 }}>Enter recipient first</button>
          }
        </div>
      </div>

      {/* Preview */}
      <div style={{ marginTop: "40px" }}>
        <div className="adm-section-title" style={{ marginBottom: "16px" }}>Chat Button Preview</div>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
          <a href={chatLink} target="_blank" rel="noreferrer" style={{ background: "#25d366", color: "#fff", padding: "14px 24px", display: "inline-flex", alignItems: "center", gap: "10px", fontFamily: "'Space Mono',monospace", fontSize: "10px", letterSpacing: ".15em", textDecoration: "none" }}>
            <Phone size={14} />Chat on WhatsApp
          </a>
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "9px", color: "rgba(240,236,228,.25)", letterSpacing: ".1em" }}>
            Site-visible chat button
          </span>
        </div>
      </div>
    </>
  );
}
