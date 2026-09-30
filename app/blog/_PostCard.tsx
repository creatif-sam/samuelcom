"use client";

import Image from "next/image";
import Link from "next/link";
import { Post, CAT_META, CAT_GRADIENTS, fmtCard } from "./_blog-types";

export function PostCard({ post }: { post: Post }) {
  const meta = CAT_META[post.category];

  return (
    <Link href={`/${post.category}/blog/${post.slug}`} className="blgp-card">
      <div className="blgp-card-img">
        {post.featured_image_url ? (
          <Image
            src={post.featured_image_url}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="blgp-card-img-inner"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="blgp-card-img-inner" style={{ background: CAT_GRADIENTS[post.category] ?? "#e5e7eb" }} />
        )}
        <div className="blgp-card-img-pattern" />
      </div>

      <div className="blgp-card-body">
        <span
          className="blgp-card-cat"
          style={{ background: meta?.bg ?? "#f3f4f6", color: meta?.color ?? "#374151" }}
        >
          {meta?.label ?? post.category}
        </span>

        <div className="blgp-card-title">{post.title}</div>
        {post.excerpt && <p className="blgp-card-excerpt">{post.excerpt}</p>}

        <div className="blgp-card-author">
          <span className="blgp-avatar">SG</span>
          <div className="blgp-card-author-info">
            <span className="blgp-card-author-name">Samuel K. Gyasi</span>
            <span className="blgp-card-author-date">{fmtCard(post.created_at)} · {post.read_time_minutes} min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
