"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { BlogPost, CATEGORIES, slugify } from "./types";

// ── POSTS TAB ─────────────────────────────────────────────────────────────
export function PostsTab({ posts, onNew, onEdit, onDelete, onToggle }: {
  posts: BlogPost[]; onNew: () => void;
  onEdit: (p: BlogPost) => void;
  onDelete: (id: string, title: string) => void;
  onToggle: (id: string, val: boolean) => Promise<void>;
}) {
  return (
    <>
      <div className="adm-header">
        <div><div className="adm-page-title">Blog Posts</div><p className="adm-page-sub">{posts.length} post{posts.length !== 1 ? "s" : ""}</p></div>
        <button className="adm-btn adm-btn--gold" onClick={onNew} style={{ display: "flex", alignItems: "center", gap: "6px" }}><Plus size={10} />New Post</button>
      </div>
      {posts.length === 0 ? <p className="adm-empty">No posts yet.</p> : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>Title</th><th>Cat.</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id}>
                  <td style={{ color: "#f0ece4", maxWidth: "240px" }}>
                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</div>
                    <div style={{ fontSize: "10px", color: "rgba(240,236,228,.25)", fontFamily: "'Poppins',sans-serif", marginTop: "2px" }}>/{p.category}/blog/{p.slug}</div>
                  </td>
                  <td style={{ textTransform: "capitalize" }}>{p.category}</td>
                  <td><span className={`adm-badge ${p.published ? "adm-badge--published" : "adm-badge--draft"}`}>{p.published ? "Published" : "Draft"}</span></td>
                  <td>{new Date(p.created_at).toLocaleDateString("en-GB")}</td>
                  <td>
                    <div className="adm-action-row">
                      <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => onToggle(p.id, !p.published)}>{p.published ? "Unpublish" : "Publish"}</button>
                      <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => onEdit(p)}><Pencil size={9} /></button>
                      <button className="adm-btn adm-btn--danger adm-btn--sm" onClick={() => onDelete(p.id, p.title)}><Trash2 size={9} /></button>
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

// ── POST MODAL ────────────────────────────────────────────────────────────
export function PostModal({ post, onClose, onSave, db }: {
  post: BlogPost | null; onClose: () => void;
  onSave: () => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  db: any;
}) {
  const [form, setForm] = useState({
    title:              post?.title              ?? "",
    slug:               post?.slug               ?? "",
    category:           post?.category           ?? "leadership",
    excerpt:            post?.excerpt            ?? "",
    content:            post?.content            ?? "",
    read_time_minutes:  post?.read_time_minutes  ?? 5,
    featured_image_url: post?.featured_image_url ?? "",
    cover_image_url:    post?.cover_image_url    ?? "",
    mid_image_url:      post?.mid_image_url      ?? "",
    infographic_url:    post?.infographic_url    ?? "",
    photo_attachments:  post?.photo_attachments  ?? [],
    published:          post?.published          ?? false,
  });
  const [busy, setBusy] = useState(false);

  function setF<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) { toast.error("Title required"); return; }
    if (!form.slug.trim())  { toast.error("Slug required"); return; }
    setBusy(true);
    const { error } = post
      ? await db.from("blog_posts").update({ ...form, updated_at: new Date().toISOString() }).eq("id", post.id)
      : await db.from("blog_posts").insert({ ...form, author: "Samuel Kobina Gyasi" });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success(post ? "Post updated" : "Post created");
    await onSave();
  }

  return (
    <div className="adm-form-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="adm-form-modal">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div className="adm-form-title" style={{ margin: 0 }}>{post ? "Edit Post" : "New Blog Post"}</div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(240,236,228,.4)", cursor: "pointer" }}><X size={16} /></button>
        </div>
        <form onSubmit={save}>
          <div className="adm-field"><label className="adm-label">Title *</label>
            <input className="adm-input" value={form.title} onChange={(e) => { setF("title", e.target.value); if (!post) setF("slug", slugify(e.target.value)); }} placeholder="Post title" required />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="adm-field"><label className="adm-label">Slug *</label><input className="adm-input" value={form.slug} onChange={(e) => setF("slug", e.target.value)} placeholder="url-slug" required /></div>
            <div className="adm-field"><label className="adm-label">Category *</label>
              <select className="adm-select" value={form.category} onChange={(e) => setF("category", e.target.value)}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
          </div>
          <div className="adm-field"><label className="adm-label">Excerpt</label><textarea className="adm-textarea" style={{ minHeight: "80px" }} value={form.excerpt} onChange={(e) => setF("excerpt", e.target.value)} placeholder="Short summary…" /></div>
          <div className="adm-field"><label className="adm-label">Content (HTML)</label><textarea className="adm-textarea" value={form.content} onChange={(e) => setF("content", e.target.value)} placeholder="<p>Full article…</p>" /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="adm-field"><label className="adm-label">Featured Image URL</label><input className="adm-input" value={form.featured_image_url} onChange={(e) => setF("featured_image_url", e.target.value)} placeholder="https://…" /></div>
            <div className="adm-field"><label className="adm-label">Read Time (min)</label><input className="adm-input" type="number" min={1} max={60} value={form.read_time_minutes} onChange={(e) => setF("read_time_minutes", parseInt(e.target.value, 10) || 5)} /></div>
          </div>
          <div className="adm-field"><label className="adm-label">Cover Image URL <span style={{fontSize:"11px",opacity:.5}}>(hero banner at top of post)</span></label><input className="adm-input" value={form.cover_image_url} onChange={(e) => setF("cover_image_url", e.target.value)} placeholder="https://… (full-width header image)" /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="adm-field"><label className="adm-label">Mid-Article Image URL <span style={{fontSize:"11px",opacity:.5}}>(shown mid-content)</span></label><input className="adm-input" value={form.mid_image_url} onChange={(e) => setF("mid_image_url", e.target.value)} placeholder="https://…" /></div>
            <div className="adm-field"><label className="adm-label">Infographic URL <span style={{fontSize:"11px",opacity:.5}}>(summary visual at end)</span></label><input className="adm-input" value={form.infographic_url} onChange={(e) => setF("infographic_url", e.target.value)} placeholder="https://…" /></div>
          </div>
          
          {/* Photo Attachments */}
          <div className="adm-field">
            <label className="adm-label">Photo Attachments <span style={{fontSize:"11px",opacity:.5}}>(additional photos for the blog content)</span></label>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {form.photo_attachments?.map((photo, idx) => (
                <div key={idx} style={{ display: "flex", gap: "8px", alignItems: "flex-start", padding: "12px", background: "rgba(139,92,246,0.05)", borderRadius: "8px", border: "1px solid rgba(139,92,246,0.15)" }}>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                    <input className="adm-input" value={photo.url} onChange={(e) => {
                      const newPhotos = [...(form.photo_attachments || [])];
                      newPhotos[idx] = { ...newPhotos[idx], url: e.target.value };
                      setF("photo_attachments", newPhotos);
                    }} placeholder="Photo URL" style={{ fontSize: "13px" }} />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      <input className="adm-input" value={photo.caption || ""} onChange={(e) => {
                        const newPhotos = [...(form.photo_attachments || [])];
                        newPhotos[idx] = { ...newPhotos[idx], caption: e.target.value };
                        setF("photo_attachments", newPhotos);
                      }} placeholder="Caption (optional)" style={{ fontSize: "13px" }} />
                      <input className="adm-input" value={photo.alt || ""} onChange={(e) => {
                        const newPhotos = [...(form.photo_attachments || [])];
                        newPhotos[idx] = { ...newPhotos[idx], alt: e.target.value };
                        setF("photo_attachments", newPhotos);
                      }} placeholder="Alt text (optional)" style={{ fontSize: "13px" }} />
                    </div>
                  </div>
                  <button type="button" onClick={() => {
                    const newPhotos = form.photo_attachments?.filter((_, i) => i !== idx) || [];
                    setF("photo_attachments", newPhotos);
                  }} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", padding: "8px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}>Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => {
                setF("photo_attachments", [...(form.photo_attachments || []), { url: "", caption: "", alt: "" }]);
              }} style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.3)", color: "#8b5cf6", padding: "10px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>+ Add Photo Attachment</button>
            </div>
          </div>
          <div className="adm-toggle-row">
            <button type="button" className={`adm-toggle${form.published ? " on" : ""}`} onClick={() => setF("published", !form.published)} aria-label="Toggle published" />
            <span className="adm-toggle-label">{form.published ? "Published — visible on site" : "Draft — not visible"}</span>
          </div>
          <div className="adm-form-actions">
            <button type="button" className="adm-btn adm-btn--ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="adm-btn adm-btn--gold" disabled={busy}>{busy ? "Saving…" : post ? "Save Changes" : "Create Post"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
