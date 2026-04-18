"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { Testimonial } from "./types";

// ── TESTIMONIALS TAB ──────────────────────────────────────────────────────
export function TestimonialsTab({ testimonials, onNew, onEdit, onDelete, onToggle }: {
  testimonials: Testimonial[];
  onNew: () => void;
  onEdit: (t: Testimonial) => void;
  onDelete: (id: string, name: string) => void;
  onToggle: (id: string, val: boolean) => Promise<void>;
}) {
  const published = testimonials.filter((t) => t.published).length;
  return (
    <>
      <div className="adm-header">
        <div>
          <div className="adm-page-title">Testimonials</div>
          <p className="adm-page-sub">{published} published · {testimonials.length} total</p>
        </div>
        <button className="adm-btn adm-btn--gold" onClick={onNew} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <Plus size={12} /> Add Testimonial
        </button>
      </div>

      {testimonials.length === 0 ? (
        <div className="adm-empty" style={{ padding: "60px 0", textAlign: "center" }}>
          No testimonials yet. Add the first one.
        </div>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role / Company</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t) => (
                <tr key={t.id}>
                  <td style={{ color: "#f0ece4", maxWidth: "200px" }}>
                    <div style={{ fontWeight: 600 }}>{t.name}</div>
                    <div style={{ fontSize: "11px", color: "rgba(240,236,228,.4)", marginTop: "2px", fontStyle: "italic" }}>
                      {t.quote.slice(0, 60)}{t.quote.length > 60 ? "…" : ""}
                    </div>
                  </td>
                  <td style={{ fontSize: "12px", color: "rgba(240,236,228,.5)" }}>
                    {[t.role, t.company].filter(Boolean).join(" · ") || "—"}
                  </td>
                  <td>
                    <span style={{ color: "#22c55e", letterSpacing: "2px" }}>
                      {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`adm-badge ${t.published ? "adm-badge--published" : "adm-badge--draft"}`}
                      style={{ cursor: "pointer", background: "none", border: "none" }}
                      onClick={() => onToggle(t.id, !t.published)}
                      title={t.published ? "Click to unpublish" : "Click to publish"}
                    >
                      {t.published ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td>
                    <div className="adm-action-row">
                      <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => onEdit(t)}>
                        <Pencil size={10} />
                      </button>
                      <button className="adm-btn adm-btn--danger adm-btn--sm" onClick={() => onDelete(t.id, t.name)}>
                        <Trash2 size={10} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

// ── TESTIMONIAL MODAL ─────────────────────────────────────────────────────
export function TestimonialModal({ testimonial, onClose, onSave, db }: {
  testimonial: Testimonial | null;
  onClose: () => void;
  onSave: () => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  db: any;
}) {
  const [name,      setName]      = useState(testimonial?.name       ?? "");
  const [role,      setRole]      = useState(testimonial?.role       ?? "");
  const [company,   setCompany]   = useState(testimonial?.company    ?? "");
  const [avatarUrl, setAvatarUrl] = useState(testimonial?.avatar_url ?? "");
  const [quote,     setQuote]     = useState(testimonial?.quote      ?? "");
  const [rating,    setRating]    = useState(testimonial?.rating     ?? 5);
  const [published, setPub]       = useState(testimonial?.published  ?? false);
  const [sortOrder, setSort]       = useState(testimonial?.sort_order ?? 0);
  const [saving,    setSaving]    = useState(false);

  async function handleSave() {
    if (!name.trim() || !quote.trim()) { toast.error("Name and quote are required"); return; }
    setSaving(true);
    const payload = {
      name: name.trim(),
      role: role.trim() || null,
      company: company.trim() || null,
      avatar_url: avatarUrl.trim() || null,
      quote: quote.trim(),
      rating,
      published,
      sort_order: sortOrder,
    };
    const { error } = testimonial
      ? await db.from("testimonials").update(payload).eq("id", testimonial.id)
      : await db.from("testimonials").insert(payload);
    setSaving(false);
    if (error) { toast.error("Save failed: " + error.message); return; }
    toast.success(testimonial ? "Testimonial updated" : "Testimonial added");
    await onSave();
  }

  return (
    <div className="adm-form-overlay" onClick={onClose}>
      <div className="adm-form-panel" onClick={(e) => e.stopPropagation()}>
        <div className="adm-form-header">
          <div className="adm-form-title">{testimonial ? "Edit Testimonial" : "New Testimonial"}</div>
          <button className="adm-icon-btn" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="adm-form-body">
          <div className="adm-form-row">
            <div className="adm-field">
              <label className="adm-label">Name *</label>
              <input className="adm-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
            </div>
            <div className="adm-field">
              <label className="adm-label">Role</label>
              <input className="adm-input" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Professor, Director" />
            </div>
          </div>
          <div className="adm-form-row">
            <div className="adm-field">
              <label className="adm-label">Company / Organisation</label>
              <input className="adm-input" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. UM6P, World Bank" />
            </div>
            <div className="adm-field">
              <label className="adm-label">Avatar URL</label>
              <input className="adm-input" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://…" />
            </div>
          </div>
          <div className="adm-field">
            <label className="adm-label">Quote *</label>
            <textarea className="adm-textarea" style={{ minHeight: "100px" }} value={quote} onChange={(e) => setQuote(e.target.value)} placeholder="What did they say about Samuel?" />
          </div>
          <div className="adm-form-row">
            <div className="adm-field">
              <label className="adm-label">Rating (1–5)</label>
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                {[1,2,3,4,5].map((n) => (
                  <button key={n} type="button" onClick={() => setRating(n)}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: "24px", color: n <= rating ? "#22c55e" : "rgba(34,197,94,.2)", padding: "0" }}>
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="adm-field">
              <label className="adm-label">Sort Order (lower = first)</label>
              <input className="adm-input" type="number" min={0} value={sortOrder} onChange={(e) => setSort(Number(e.target.value))} />
            </div>
          </div>
          <div className="adm-field" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input type="checkbox" id="ts-pub" checked={published} onChange={(e) => setPub(e.target.checked)}
              style={{ width: "16px", height: "16px", accentColor: "#22c55e", cursor: "pointer" }} />
            <label htmlFor="ts-pub" className="adm-label" style={{ margin: 0, cursor: "pointer" }}>
              Publish immediately (visible on site)
            </label>
          </div>
        </div>
        <div className="adm-form-actions">
          <button className="adm-btn adm-btn--ghost" onClick={onClose}>Cancel</button>
          <button className="adm-btn adm-btn--gold" onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : testimonial ? "Update" : "Add Testimonial"}
          </button>
        </div>
      </div>
    </div>
  );
}
