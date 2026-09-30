"use client";

import Image from "next/image";
import Link from "next/link";
import { Post, CAT_META, CAT_GRADIENTS } from "./_blog-types";

export function FeaturedPost({ post }: { post: Post }) {
  const meta = CAT_META[post.category];

  return (
    <div className="blgp-featured-wrap">
      <Link href={`/${post.category}/blog/${post.slug}`} className="blgp-featured">
        {post.featured_image_url ? (
          <Image
            src={post.featured_image_url}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1216px"
            className="blgp-feat-img"
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        ) : (
          <div className="blgp-feat-img" style={{ background: CAT_GRADIENTS[post.category] ?? "#1d2939" }} />
        )}
        <div className="blgp-feat-overlay" />

        <span className="blgp-feat-tag">Featured</span>
        <span
          className="blgp-feat-category"
          style={{ background: meta?.bg ?? "#f3f4f6", color: meta?.color ?? "#374151" }}
        >
          {meta?.label ?? post.category}
        </span>

        <div className="blgp-feat-body">
          <h1 className="blgp-feat-title">{post.title}</h1>
          {post.excerpt && <p className="blgp-feat-desc">{post.excerpt}</p>}
        </div>

        <div className="blgp-feat-arrow">→</div>
      </Link>
    </div>
  );
}
