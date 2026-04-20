"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react";
import { BlogPost, CATEGORIES, slugify } from "./types";
import { createClient } from "@/lib/supabase/client";

// ── IMAGE UPLOAD HELPER ───────────────────────────────────────────────────
async function uploadImage(file: File): Promise<string> {
  const supabase = createClient();
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `blog/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from("main_blog_images").upload(path, file, { upsert: false });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from("main_blog_images").getPublicUrl(path);
  return data.publicUrl;
}

// ── REUSABLE IMAGE URL + UPLOAD FIELD ────────────────────────────────────
function ImageUploadField({ label, value, onChange, placeholder }: {
  label: React.ReactNode; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      onChange(url);
      toast.success("Image uploaded");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="adm-field">
      <label className="adm-label">{label}</label>
      <div style={{ display: "flex", gap: "8px" }}>
        <input className="adm-input" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder ?? "https://…"} style={{ flex: 1 }} />
        <button type="button" onClick={() => fileRef.current?.click()}
          style={{ background: "rgba(34,197,94,0.10)", border: "1px solid rgba(34,197,94,0.25)", color: "#22c55e", borderRadius: "7px", padding: "0 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0 }}
          disabled={uploading}>
          <Upload size={11} />{uploading ? "…" : "Upload"}
        </button>
      </div>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
    </div>
  );
}

// ── PHOTO ATTACHMENT ROW (with upload) ────────────────────────────────────
function PhotoAttachmentRow({ photo, onChange, onRemove }: {
  photo: { url: string; caption?: string; alt?: string };
  onChange: (v: { url: string; caption?: string; alt?: string }) => void;
  onRemove: () => void;
}) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      onChange({ ...photo, url });
      toast.success("Photo uploaded");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div style={{ padding: "14px", background: "rgba(34,197,94,0.04)", borderRadius: "8px", border: "1px solid rgba(34,197,94,0.12)", display: "flex", flexDirection: "column", gap: "8px" }}>
      {photo.url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photo.url} alt={photo.alt || ""} style={{ maxHeight: "120px", objectFit: "cover", borderRadius: "5px", border: "1px solid rgba(255,255,255,0.08)" }} />
      )}
      <div style={{ display: "flex", gap: "8px" }}>
        <input className="adm-input" value={photo.url} onChange={(e) => onChange({ ...photo, url: e.target.value })} placeholder="Photo URL" style={{ flex: 1, fontSize: "12px" }} />
        <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
          style={{ background: "rgba(34,197,94,0.10)", border: "1px solid rgba(34,197,94,0.25)", color: "#22c55e", borderRadius: "7px", padding: "0 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", fontWeight: 600, flexShrink: 0 }}>
          <Upload size={10} />{uploading ? "…" : "Upload"}
        </button>
        <button type="button" onClick={onRemove}
          style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.40)", borderRadius: "7px", padding: "0 12px", cursor: "pointer", fontSize: "11px", flexShrink: 0 }}>
          Remove
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
        <input className="adm-input" value={photo.caption || ""} onChange={(e) => onChange({ ...photo, caption: e.target.value })} placeholder="Caption (optional)" style={{ fontSize: "12px" }} />
        <input className="adm-input" value={photo.alt || ""} onChange={(e) => onChange({ ...photo, alt: e.target.value })} placeholder="Alt text (optional)" style={{ fontSize: "12px" }} />
      </div>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
    </div>
  );
}

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
    spotify_url:        post?.spotify_url        ?? "",
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
            <ImageUploadField label="Featured Image" value={form.featured_image_url} onChange={(v) => setF("featured_image_url", v)} placeholder="https://… or upload" />
            <div className="adm-field"><label className="adm-label">Read Time (min)</label><input className="adm-input" type="number" min={1} max={60} value={form.read_time_minutes} onChange={(e) => setF("read_time_minutes", parseInt(e.target.value, 10) || 5)} /></div>
          </div>
          <ImageUploadField label={<>Cover Image <span style={{fontSize:"11px",opacity:.5}}>(hero banner at top of post)</span></>} value={form.cover_image_url} onChange={(v) => setF("cover_image_url", v)} placeholder="https://… (full-width header image)" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <ImageUploadField label={<>Mid-Article Image <span style={{fontSize:"11px",opacity:.5}}>(shown mid-content)</span></>} value={form.mid_image_url} onChange={(v) => setF("mid_image_url", v)} />
            <ImageUploadField label={<>Infographic <span style={{fontSize:"11px",opacity:.5}}>(summary visual at end)</span></>} value={form.infographic_url} onChange={(v) => setF("infographic_url", v)} />
          </div>
          <div className="adm-field">
            <label className="adm-label">Spotify Link <span style={{fontSize:"11px",opacity:.5}}>(podcast episode / track URL for listeners)</span></label>
            <input className="adm-input" value={form.spotify_url} onChange={(e) => setF("spotify_url", e.target.value)} placeholder="https://open.spotify.com/episode/…" />
          </div>
          
          {/* Photo Attachments */}
          <div className="adm-field">
            <label className="adm-label">Photo Attachments <span style={{fontSize:"11px",opacity:.5}}>(additional photos for the blog content)</span></label>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {form.photo_attachments?.map((photo, idx) => (
                <PhotoAttachmentRow
                  key={idx}
                  photo={photo}
                  onChange={(updated) => {
                    const next = [...(form.photo_attachments || [])];
                    next[idx] = updated;
                    setF("photo_attachments", next);
                  }}
                  onRemove={() => setF("photo_attachments", form.photo_attachments?.filter((_, i) => i !== idx) || [])}
                />
              ))}
              <button type="button" onClick={() => setF("photo_attachments", [...(form.photo_attachments || []), { url: "", caption: "", alt: "" }])}
                style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.20)", color: "#22c55e", padding: "10px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                <Plus size={12} /> Add Photo
              </button>
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
