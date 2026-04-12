"use client";

import { useState } from "react";
import Link from "next/link";
import type { PostMeta } from "../lib/blog";

const PAGE_SIZE = 6;

type Props = {
  posts: PostMeta[];
};

function ArrowRight() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
      <path
        d="M3 8h10m0 0L9 4m4 4L9 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogListClient({ posts }: Props) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  const visible = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <div className="space-y-4">
        {visible.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group card-glass p-6 sm:p-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 hover:border-[#E8FF8B]/20 transition-all"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <time dateTime={post.date} className="text-xs text-[#666666]">
                  {formatDate(post.date)}
                </time>
                <span className="text-[#333333]">·</span>
                <span className="text-xs text-[#666666]">{post.readingTime}</span>
              </div>
              <h2 className="text-lg font-bold tracking-tight mb-2 group-hover:text-[#E8FF8B] transition-colors leading-snug">
                {post.title}
              </h2>
              <p className="text-sm text-[#A3A3A3] leading-relaxed line-clamp-2">
                {post.description}
              </p>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/5 text-[#666666] border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <span className="text-[#666666] group-hover:text-[#E8FF8B] group-hover:translate-x-1 transition-all shrink-0 mt-1">
              <ArrowRight />
            </span>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="px-4 py-2 text-sm border border-white/10 rounded-lg disabled:opacity-30 hover:border-white/20 transition-colors"
          >
            ← Précédent
          </button>
          <span className="text-sm text-[#666666]">
            Page {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 text-sm border border-white/10 rounded-lg disabled:opacity-30 hover:border-white/20 transition-colors"
          >
            Suivant →
          </button>
        </div>
      )}
    </>
  );
}
