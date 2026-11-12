"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X, Upload, Search, ExternalLink } from "lucide-react";
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
          style={{ background: "rgba(84,108,250,0.10)", border: "1px solid rgba(84,108,250,0.25)", color: "#546cfa", borderRadius: "7px", padding: "0 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0 }}
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
    <div style={{ padding: "14px", background: "rgba(84,108,250,0.04)", borderRadius: "8px", border: "1px solid rgba(84,108,250,0.12)", display: "flex", flexDirection: "column", gap: "8px" }}>
      {photo.url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photo.url} alt={photo.alt || ""} style={{ maxHeight: "120px", objectFit: "cover", borderRadius: "5px", border: "1px solid rgba(53,71,209,0.14)" }} />
      )}
      <div style={{ display: "flex", gap: "8px" }}>
        <input className="adm-input" value={photo.url} onChange={(e) => onChange({ ...photo, url: e.target.value })} placeholder="Photo URL" style={{ flex: 1, fontSize: "12px" }} />
        <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
          style={{ background: "rgba(84,108,250,0.10)", border: "1px solid rgba(84,108,250,0.25)", color: "#546cfa", borderRadius: "7px", padding: "0 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", fontWeight: 600, flexShrink: 0 }}>
          <Upload size={10} />{uploading ? "…" : "Upload"}
        </button>
        <button type="button" onClick={onRemove}
          style={{ background: "transparent", border: "1px solid rgba(53,71,209,0.14)", color: "rgba(15,23,42,.58)", borderRadius: "7px", padding: "0 12px", cursor: "pointer", fontSize: "11px", flexShrink: 0 }}>
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
type StatusFilter = "all" | "published" | "draft";

export function PostsTab({ posts, onNew, onEdit, onDelete, onToggle }: {
  posts: BlogPost[]; onNew: () => void;
  onEdit: (p: BlogPost) => void;
  onDelete: (id: string, title: string) => void;
  onToggle: (id: string, val: boolean) => Promise<void>;
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [category, setCategory] = useState("all");

  const publishedCount = posts.filter((p) => p.published).length;
  const draftCount = posts.length - publishedCount;

  const q = query.trim().toLowerCase();
  const shown = posts.filter((p) =>
    (status === "all" || (status === "published") === p.published) &&
    (category === "all" || p.category === category) &&
    (!q || p.title.toLowerCase().includes(q) || p.slug.includes(q))
  );

  return (
    <>
      <div className="adm-header">
        <div>
          <div className="adm-page-title">Blog Posts</div>
          <p className="adm-page-sub">{publishedCount} published · {draftCount} draft{draftCount !== 1 ? "s" : ""}</p>
        </div>
        <button className="adm-btn adm-btn--gold" onClick={onNew} style={{ display: "flex", alignItems: "center", gap: "6px" }}><Plus size={10} />New Post</button>
      </div>

      {posts.length > 0 && (
        <div className="adm-filters">
          <div className="adm-search">
            <Search size={14} aria-hidden="true" />
            <input className="adm-input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by title or slug" aria-label="Search posts" />
          </div>
          <select className="adm-select" value={status} onChange={(e) => setStatus(e.target.value as StatusFilter)} aria-label="Filter by status">
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
          <select className="adm-select" value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
          </select>
        </div>
      )}

      {posts.length === 0 ? <p className="adm-empty">No posts yet.</p> : shown.length === 0 ? (
        <p className="adm-empty">No posts match these filters.</p>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>Title</th><th>Cat.</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>
              {shown.map((p) => (
                <tr key={p.id}>
                  <td style={{ color: "#0f172a", maxWidth: "240px" }}>
                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</div>
                    <div style={{ fontSize: "10px", color: "rgba(15,23,42,.45)", fontFamily: "var(--font-body)", marginTop: "2px" }}>/{p.category}/blog/{p.slug}</div>
                  </td>
                  <td style={{ textTransform: "capitalize" }}>{p.category}</td>
                  <td><span className={`adm-badge ${p.published ? "adm-badge--published" : "adm-badge--draft"}`}>{p.published ? "Published" : "Draft"}</span></td>
                  <td>{new Date(p.created_at).toLocaleDateString("en-GB")}</td>
                  <td>
                    <div className="adm-action-row">
                      <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => onToggle(p.id, !p.published)}>{p.published ? "Unpublish" : "Publish"}</button>
                      {p.published && (
                        <a className="adm-btn adm-btn--ghost adm-btn--sm" href={`/${p.category}/blog/${p.slug}`} target="_blank" rel="noopener noreferrer" title="View live post" aria-label={`View "${p.title}" on the site`}>
                          <ExternalLink size={9} />
                        </a>
                      )}
                      <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => onEdit(p)} title="Edit" aria-label={`Edit "${p.title}"`}><Pencil size={9} /></button>
                      <button className="adm-btn adm-btn--danger adm-btn--sm" onClick={() => onDelete(p.id, p.title)} title="Delete" aria-label={`Delete "${p.title}"`}><Trash2 size={9} /></button>
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

// ── CONTENT HELPERS ───────────────────────────────────────────────────────
const WORDS_PER_MINUTE = 200;
const EXCERPT_TARGET = 160;

function countWords(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/gi, " ").trim().split(/\s+/).filter(Boolean).length;
}

type Wrap = { label: string; title: string; before: string; after: string; placeholder: string };
const TOOLBAR: Wrap[] = [
  { label: "H2", title: "Heading",     before: "<h2>",           after: "</h2>",                 placeholder: "Heading" },
  { label: "H3", title: "Subheading",  before: "<h3>",           after: "</h3>",                 placeholder: "Subheading" },
  { label: "P",  title: "Paragraph",   before: "<p>",            after: "</p>",                  placeholder: "Paragraph text" },
  { label: "B",  title: "Bold",        before: "<strong>",       after: "</strong>",             placeholder: "bold text" },
  { label: "I",  title: "Italic",      before: "<em>",           after: "</em>",                 placeholder: "italic text" },
  { label: "Quote", title: "Quote",      before: "<blockquote>",   after: "</blockquote>",         placeholder: "Quotation" },
];

// ── POST MODAL ────────────────────────────────────────────────────────────
export function PostModal({ post, posts, onClose, onSave, db }: {
  post: BlogPost | null;
  posts: BlogPost[];
  onClose: () => void;
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
  const [view, setView] = useState<"write" | "preview">("write");
  // Existing posts keep their stored read time; new posts follow the word count until edited by hand
  const [readTimeManual, setReadTimeManual] = useState(!!post);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const initial = useRef(JSON.stringify(form));

  const dirty = JSON.stringify(form) !== initial.current;
  const words = countWords(form.content);
  const suggestedMinutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));

  const duplicateSlug = !!form.slug && posts.some(
    (p) => p.id !== post?.id && p.category === form.category && p.slug === form.slug
  );
  const liveAddressChanges = !!post?.published && (form.slug !== post.slug || form.category !== post.category);

  function setF<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  function setContent(content: string) {
    setForm((p) => ({
      ...p,
      content,
      read_time_minutes: readTimeManual ? p.read_time_minutes : Math.max(1, Math.round(countWords(content) / WORDS_PER_MINUTE)),
    }));
  }

  const requestClose = useCallback(() => {
    if (dirty && !window.confirm("You have unsaved changes. Close without saving?")) return;
    onClose();
  }, [dirty, onClose]);

  // Also warn before a refresh or tab close wipes unsaved work
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") requestClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [requestClose]);

  // Wrap the selected text in the content box with HTML tags
  function wrapSelection(before: string, after: string, placeholder: string) {
    const el = contentRef.current;
    if (!el) return;
    const { selectionStart: start, selectionEnd: end, value } = el;
    const selected = value.slice(start, end) || placeholder;
    setContent(value.slice(0, start) + before + selected + after + value.slice(end));
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  }

  function insertLink() {
    const url = window.prompt("Link address (https://…)");
    if (url) wrapSelection(`<a href="${url.replace(/"/g, "&quot;")}">`, "</a>", "link text");
  }

  function insertList() {
    const el = contentRef.current;
    if (!el) return;
    const { selectionStart: start, selectionEnd: end, value } = el;
    const lines = (value.slice(start, end) || "List item").split(/\n+/).filter(Boolean);
    const html = "<ul>\n" + lines.map((l) => `  <li>${l.trim()}</li>`).join("\n") + "\n</ul>";
    setContent(value.slice(0, start) + html + value.slice(end));
    requestAnimationFrame(() => el.focus());
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) { toast.error("Title required"); return; }
    if (!form.slug.trim())  { toast.error("Slug required"); return; }
    if (duplicateSlug) { toast.error("Another post in this category already uses this slug"); return; }
    setBusy(true);
    const { error } = post
      ? await db.from("main_blog_posts").update({ ...form, updated_at: new Date().toISOString() }).eq("id", post.id)
      : await db.from("main_blog_posts").insert({ ...form, author: "Samuel Kobina Gyasi" });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success(post ? "Post updated" : "Post created");
    await onSave();
  }

  const excerptLen = form.excerpt.length;

  return (
    <div className="adm-form-overlay" onClick={(e) => { if (e.target === e.currentTarget) requestClose(); }}>
      <div className="adm-form-modal" role="dialog" aria-modal="true" aria-labelledby="post-modal-title">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div id="post-modal-title" className="adm-form-title" style={{ margin: 0 }}>
            {post ? "Edit Post" : "New Blog Post"}
            {dirty && <span className="adm-unsaved">Unsaved changes</span>}
          </div>
          <button type="button" onClick={requestClose} aria-label="Close" style={{ background: "none", border: "none", color: "rgba(15,23,42,.58)", cursor: "pointer" }}><X size={16} /></button>
        </div>
        <form onSubmit={save}>
          <div className="adm-field"><label className="adm-label">Title *</label>
            <input className="adm-input" value={form.title} onChange={(e) => { setF("title", e.target.value); if (!post) setF("slug", slugify(e.target.value)); }} placeholder="Post title" required />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="adm-field"><label className="adm-label">Slug *</label>
              <input className="adm-input" value={form.slug} onChange={(e) => setF("slug", slugify(e.target.value))} placeholder="url-slug" required aria-invalid={duplicateSlug} />
            </div>
            <div className="adm-field"><label className="adm-label">Category *</label>
              <select className="adm-select" value={form.category} onChange={(e) => setF("category", e.target.value)}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
          </div>
          <p className="adm-hint" style={{ marginTop: "-8px" }}>Address: /{form.category}/blog/{form.slug || "your-slug"}</p>
          {duplicateSlug && <p className="adm-warn adm-warn--error">Another {form.category} post already uses this slug. Choose a different one.</p>}
          {liveAddressChanges && !duplicateSlug && (
            <p className="adm-warn">This post is live. Changing the slug or category changes its address, so links people have already shared will stop working.</p>
          )}

          <div className="adm-field">
            <label className="adm-label">Excerpt</label>
            <textarea className="adm-textarea" style={{ minHeight: "80px" }} value={form.excerpt} onChange={(e) => setF("excerpt", e.target.value)} placeholder="Short summary shown on blog cards and in search results" />
            <p className={`adm-hint${excerptLen > EXCERPT_TARGET + 40 ? " adm-hint--over" : ""}`}>{excerptLen} characters · about {EXCERPT_TARGET} reads best</p>
          </div>

          <div className="adm-field">
            <div className="adm-content-head">
              <label className="adm-label" style={{ marginBottom: 0 }}>Content (HTML)</label>
              <div className="adm-tabs" role="tablist" aria-label="Content view">
                <button type="button" role="tab" aria-selected={view === "write"} className={view === "write" ? "active" : ""} onClick={() => setView("write")}>Write</button>
                <button type="button" role="tab" aria-selected={view === "preview"} className={view === "preview" ? "active" : ""} onClick={() => setView("preview")}>Preview</button>
              </div>
            </div>
            {view === "write" ? (
              <>
                <div className="adm-toolbar" role="toolbar" aria-label="Formatting">
                  {TOOLBAR.map((t) => (
                    <button key={t.label} type="button" title={t.title} aria-label={t.title} onClick={() => wrapSelection(t.before, t.after, t.placeholder)}>{t.label}</button>
                  ))}
                  <button type="button" title="Bulleted list" aria-label="Bulleted list" onClick={insertList}>List</button>
                  <button type="button" title="Link" aria-label="Link" onClick={insertLink}>Link</button>
                </div>
                <textarea ref={contentRef} className="adm-textarea adm-textarea--content" value={form.content} onChange={(e) => setContent(e.target.value)} placeholder="<p>Full article…</p>" />
              </>
            ) : (
              <div className="adm-html-preview adm-post-preview">
                {form.content.trim()
                  ? <div dangerouslySetInnerHTML={{ __html: form.content }} />
                  : <p className="adm-hint">Nothing to preview yet.</p>}
              </div>
            )}
            <p className="adm-hint">{words.toLocaleString()} words · about {suggestedMinutes} min read</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <ImageUploadField label="Featured Image" value={form.featured_image_url} onChange={(v) => setF("featured_image_url", v)} placeholder="https://… or upload" />
            <div className="adm-field"><label className="adm-label">Read Time (min)</label>
              <input className="adm-input" type="number" min={1} max={60} value={form.read_time_minutes}
                onChange={(e) => { setReadTimeManual(true); setF("read_time_minutes", parseInt(e.target.value, 10) || 1); }} />
              {readTimeManual && form.read_time_minutes !== suggestedMinutes && words > 0 && (
                <button type="button" className="adm-link-btn" onClick={() => { setReadTimeManual(false); setF("read_time_minutes", suggestedMinutes); }}>
                  Use {suggestedMinutes} min from the word count
                </button>
              )}
            </div>
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
                style={{ background: "rgba(84,108,250,0.08)", border: "1px solid rgba(84,108,250,0.20)", color: "#546cfa", padding: "10px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                <Plus size={12} /> Add Photo
              </button>
            </div>
          </div>
          <div className="adm-toggle-row">
            <button type="button" className={`adm-toggle${form.published ? " on" : ""}`} onClick={() => setF("published", !form.published)} aria-label="Toggle published" aria-pressed={form.published} />
            <span className="adm-toggle-label">{form.published ? "Published, visible on the site" : "Draft, not visible on the site"}</span>
          </div>
          <div className="adm-form-actions">
            <button type="button" className="adm-btn adm-btn--ghost" onClick={requestClose}>Cancel</button>
            <button type="submit" className="adm-btn adm-btn--gold" disabled={busy || duplicateSlug}>{busy ? "Saving…" : post ? "Save Changes" : "Create Post"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
