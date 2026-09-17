import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { getAllBlogPosts, getBlogPost, getReadingTime } from "@/lib/content";
import { formatDate } from "@/lib/format";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post not found" };

  const { title, description, image, date } = post.frontmatter;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: date,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const { title, date, tags } = post.frontmatter;

  return (
    <article>
      <Link
        href="/blogs"
        className="inline-flex items-center gap-1.5 text-sm text-subtle hover:text-foreground transition-colors mb-10"
      >
        <ArrowLeft size={14} />
        Writing
      </Link>

      <header className="mb-10">
        <h1 className="font-serif text-3xl sm:text-4xl tracking-tight leading-tight mb-4">
          {title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-subtle">
          <time dateTime={date}>
            {formatDate(date, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span aria-hidden="true">·</span>
          <span>{getReadingTime(post.content)} min read</span>
        </div>
        {/* Guarded: Keystatic omits `tags` entirely when the list is empty. */}
        {tags && tags.length > 0 && (
          <p className="mt-3 text-xs text-subtle">{tags.join(" · ")}</p>
        )}
      </header>

      <MarkdownRenderer content={post.content} />
    </article>
  );
}
