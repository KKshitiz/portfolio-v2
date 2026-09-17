import Link from "next/link";
import type { BlogFrontmatter, Post } from "@/lib/content";
import { getReadingTime } from "@/lib/content";
import { formatDate } from "@/lib/format";

export function PostList({ posts }: { posts: Post<BlogFrontmatter>[] }) {
  return (
    <ul className="flex flex-col">
      {posts.map((post) => (
        <li
          key={post.slug}
          className="border-t border-border first:border-t-0 first:pt-0 py-7"
        >
          <Link href={`/blogs/${post.slug}`} className="group block">
            <h2 className="font-serif text-xl tracking-tight mb-1.5 group-hover:text-link transition-colors">
              {post.frontmatter.title}
            </h2>
            <p className="text-muted leading-relaxed mb-2.5">
              {post.frontmatter.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-subtle">
              <time dateTime={post.frontmatter.date}>
                {formatDate(post.frontmatter.date)}
              </time>
              <span aria-hidden="true">·</span>
              <span>{getReadingTime(post.content)} min read</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
