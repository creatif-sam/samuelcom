export const blogCss = `
/* ── BLOG PAGE ── */
.blgp {
  background: #f9fafb;
  min-height: 100vh;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  color: #101828;
}

/* ── FEATURED HERO ── */
.blgp-featured-wrap {
  max-width: 1280px;
  margin: 0 auto;
  padding: 100px 32px 0;
}
.blgp-featured {
  display: block;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  color: #fff;
  height: clamp(340px, 42vw, 480px);
  background: #1d2939;
}
.blgp-feat-img {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center top;
  transition: transform 0.6s ease;
}
.blgp-featured:hover .blgp-feat-img { transform: scale(1.03); }
.blgp-feat-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.08) 0%,
    rgba(0,0,0,0.18) 40%,
    rgba(0,0,0,0.72) 100%
  );
  z-index: 1;
}
.blgp-feat-tag {
  position: absolute;
  top: 24px; left: 28px;
  z-index: 2;
  display: inline-flex; align-items: center;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 20px;
  padding: 5px 14px;
  font-size: 13px; font-weight: 600;
  color: #fff;
  letter-spacing: 0.02em;
}
.blgp-feat-category {
  position: absolute;
  top: 24px; left: 110px;
  z-index: 2;
  display: inline-flex; align-items: center;
  border-radius: 20px;
  padding: 5px 14px;
  font-size: 12px; font-weight: 600;
  letter-spacing: 0.02em;
}
.blgp-feat-body {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  z-index: 2;
  padding: 28px 80px 36px 36px;
}
.blgp-feat-title {
  font-size: clamp(22px, 3.2vw, 38px);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
  max-width: 680px;
}
.blgp-feat-desc {
  font-size: clamp(13px, 1.3vw, 15px);
  line-height: 1.65;
  color: rgba(255,255,255,0.78);
  max-width: 560px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.blgp-feat-arrow {
  position: absolute;
  right: 28px; bottom: 36px;
  z-index: 2;
  width: 52px; height: 52px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.3);
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; color: #fff;
  transition: background 0.2s, transform 0.2s;
}
.blgp-featured:hover .blgp-feat-arrow {
  background: rgba(255,255,255,0.28);
  transform: translateX(3px);
}

/* ── CONTENT AREA ── */
.blgp-main {
  max-width: 1280px;
  margin: 0 auto;
  padding: 52px 32px 80px;
}
.blgp-section-title {
  font-size: clamp(18px, 2vw, 24px);
  font-weight: 700;
  color: #101828;
  margin-bottom: 32px;
  letter-spacing: -0.01em;
}

/* ── GRID ── */
.blgp-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  margin-bottom: 48px;
}

/* ── POST CARD ── */
.blgp-card {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #eaecf0;
  border-radius: 14px;
  overflow: hidden;
  text-decoration: none;
  color: #101828;
  transition: box-shadow 0.2s, transform 0.2s;
}
.blgp-card:hover {
  box-shadow: 0 8px 30px rgba(16,24,40,0.1);
  transform: translateY(-3px);
}
.blgp-card-img {
  height: 200px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}
.blgp-card-img-inner {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
}
.blgp-card:hover .blgp-card-img-inner { transform: scale(1.05); }
.blgp-card-img-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px);
  background-size: 20px 20px;
  z-index: 1;
}
.blgp-card-body {
  padding: 20px 22px 22px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.blgp-card-cat {
  display: inline-flex; align-items: center;
  font-size: 12px; font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 10px;
  width: fit-content;
  letter-spacing: 0.01em;
}
.blgp-card-title {
  font-size: 16px; font-weight: 700;
  line-height: 1.4;
  letter-spacing: -0.01em;
  color: #101828;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.2s;
}
.blgp-card:hover .blgp-card-title { color: #22c55e; }
.blgp-card-excerpt {
  font-size: 13px;
  line-height: 1.7;
  color: #667085;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
  margin-bottom: 18px;
}
.blgp-card-author {
  display: flex; align-items: center; gap: 10px;
  padding-top: 14px;
  border-top: 1px solid #f2f4f7;
}
.blgp-avatar {
  width: 34px; height: 34px;
  border-radius: 50%;
  background: #22c55e;
  color: #0a0a0a;
  font-size: 11px; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  letter-spacing: 0.02em;
}
.blgp-card-author-info {
  display: flex; flex-direction: column; gap: 1px;
}
.blgp-card-author-name { font-size: 13px; font-weight: 600; color: #344054; }
.blgp-card-author-date { font-size: 12px; color: #667085; }

/* ── LOAD MORE ── */
.blgp-load-row {
  display: flex; justify-content: center;
  margin-top: 16px;
}
.blgp-load-btn {
  padding: 14px 36px;
  border: 1.5px solid #d0d5dd;
  border-radius: 8px;
  background: #fff;
  color: #344054;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 14px; font-weight: 600;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  display: flex; align-items: center; gap: 8px;
}
.blgp-load-btn:hover {
  border-color: #22c55e;
  color: #22c55e;
  box-shadow: 0 2px 10px rgba(34,197,94,0.12);
}
.blgp-load-btn:disabled { opacity: 0.5; cursor: not-allowed; }

/* ── EMPTY ── */
.blgp-empty {
  text-align: center;
  padding: 80px 20px;
  color: #667085;
  font-size: 15px;
  grid-column: 1 / -1;
}

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .blgp-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .blgp-featured-wrap { padding: 90px 20px 0; }
  .blgp-feat-body { padding: 20px 70px 28px 24px; }
  .blgp-feat-arrow { right: 16px; bottom: 28px; width: 42px; height: 42px; font-size: 18px; }
  .blgp-main { padding: 36px 20px 60px; }
}
@media (max-width: 640px) {
  .blgp-grid { grid-template-columns: 1fr; }
  .blgp-featured { height: clamp(280px, 72vw, 380px); }
}
`;
