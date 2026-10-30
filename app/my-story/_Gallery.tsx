"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./my-story.module.css";
import { galleryPhotos } from "./_gallery-data";

const INITIAL_COUNT = 12;

export function Gallery() {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const visible = expanded ? galleryPhotos : galleryPhotos.slice(0, INITIAL_COUNT);
  const total = galleryPhotos.length;

  // Fade tiles in as they scroll into view (re-run when more tiles are revealed)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-visible", "true");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    tileRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [expanded]);

  const open = (i: number) => {
    lastFocused.current = document.activeElement as HTMLElement;
    setActive(i);
  };
  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setActive((i) => (i === null ? i : (i + dir + total) % total)),
    [total]
  );

  // Lightbox: keyboard controls, scroll lock and focus handling
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  // Return focus to the tile that opened the lightbox
  useEffect(() => {
    if (active === null) lastFocused.current?.focus();
  }, [active]);

  const current = active === null ? null : galleryPhotos[active];

  return (
    <section className={styles.mspGallery} aria-labelledby="gallery-heading">
      <div className={styles.mspGalleryInner}>
        <header className={styles.mspGalleryHeader}>
          <p className={styles.mspGalleryEyebrow}>Gallery</p>
          <h2 id="gallery-heading" className={styles.mspGalleryHeading}>
            Moments Along <em>the Way</em>
          </h2>
          <p className={styles.mspGallerySub}>
            Gatherings, classrooms, and pulpits — snapshots of a life given to knowledge
            sharing, service, and community.
          </p>
        </header>

        <div className={styles.mspGalleryGrid}>
          {visible.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              ref={(el) => { tileRefs.current[i] = el; }}
              className={styles.mspGalleryTile}
              style={{ transitionDelay: `${(i % 4) * 0.08}s` }}
              onClick={() => open(i)}
              aria-label={`Open photo: ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width:640px) 50vw, (max-width:1100px) 33vw, 25vw"
              />
              {photo.caption && (
                <span className={styles.mspGalleryCaption}>{photo.caption}</span>
              )}
            </button>
          ))}
        </div>

        {total > INITIAL_COUNT && (
          <div className={styles.mspGalleryMore}>
            <button type="button" onClick={() => setExpanded((v) => !v)}>
              {expanded ? "Show fewer" : `View all ${total} photos`}
            </button>
          </div>
        )}
      </div>

      {current && active !== null && (
        <div
          className={styles.mspLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={close}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touchStartX.current = null;
          }}
        >
          <button
            ref={closeRef}
            type="button"
            className={styles.mspLightboxClose}
            onClick={close}
            aria-label="Close"
          >
            ✕
          </button>
          <button
            type="button"
            className={`${styles.mspLightboxNav} ${styles.mspLightboxPrev}`}
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <figure className={styles.mspLightboxFigure} onClick={(e) => e.stopPropagation()}>
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="100vw"
              className={styles.mspLightboxImg}
              priority
            />
            <figcaption>
              <span>{current.caption ?? current.alt}</span>
              <span className={styles.mspLightboxCount}>
                {active + 1} / {total}
              </span>
            </figcaption>
          </figure>
          <button
            type="button"
            className={`${styles.mspLightboxNav} ${styles.mspLightboxNext}`}
            onClick={(e) => { e.stopPropagation(); step(1); }}
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
