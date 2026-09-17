"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { MicroFrontmatter, Post } from "@/lib/content";
import { formatDate } from "@/lib/format";

interface MicroListProps {
  posts: Post<MicroFrontmatter>[];
  tags: { name: string; count: number }[];
}

/**
 * Filtering is driven by the `?tag=` query param rather than local state so a
 * filtered view is linkable and shareable. Reading it through useSearchParams
 * (instead of the page's searchParams prop) keeps /micro statically rendered.
 */
export function MicroList({ posts, tags }: MicroListProps) {
  const activeTag = useSearchParams().get("tag");

  const visiblePosts = activeTag
    ? posts.filter((post) => post.frontmatter.tags?.includes(activeTag))
    : posts;

  return (
    <>
      {tags.length > 0 && (
        <nav aria-label="Filter by tag" className="flex flex-wrap gap-x-4 gap-y-2 mb-10">
          <TagLink label="All" href="/micro" isActive={!activeTag} />
          {tags.map((tag) => (
            <TagLink
              key={tag.name}
              label={tag.name}
              count={tag.count}
              href={`/micro?tag=${encodeURIComponent(tag.name)}`}
              isActive={activeTag === tag.name}
            />
          ))}
        </nav>
      )}

      {visiblePosts.length === 0 ? (
        <p className="text-muted">
          Nothing tagged{" "}
          <span className="text-foreground">{activeTag}</span>.{" "}
          <Link href="/micro" className="text-link hover:underline underline-offset-4">
            Show all
          </Link>
        </p>
      ) : (
        <ul className="flex flex-col gap-y-8">
          {visiblePosts.map((post) => (
            <li key={post.slug} className="border-l border-border pl-5">
              <Link href={`/micro/${post.slug}`} className="group block">
                <time
                  dateTime={post.frontmatter.date}
                  className="text-xs text-subtle"
                >
                  {formatDate(post.frontmatter.date)}
                </time>
                <p className="mt-1.5 leading-relaxed group-hover:text-link transition-colors">
                  {post.content.trim()}
                </p>
              </Link>
              {/* Outside the post link: nesting an <a> inside an <a> is invalid. */}
              {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                <div className="flex flex-wrap gap-x-3 mt-2">
                  {post.frontmatter.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/micro?tag=${encodeURIComponent(tag)}`}
                      className={`text-xs transition-colors ${
                        activeTag === tag
                          ? "text-foreground"
                          : "text-subtle hover:text-foreground"
                      }`}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function TagLink({
  label,
  count,
  href,
  isActive,
}: {
  label: string;
  count?: number;
  href: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`text-sm transition-colors ${
        isActive
          ? "text-foreground border-b border-foreground"
          : "text-subtle hover:text-foreground border-b border-transparent"
      }`}
    >
      {label}
      {count !== undefined && (
        <span className="text-subtle ml-1 text-xs">{count}</span>
      )}
    </Link>
  );
}
