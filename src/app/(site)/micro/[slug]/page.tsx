import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { getAllMicroPosts, getMicroPost } from "@/lib/content";
import { formatDate } from "@/lib/format";

interface MicroPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllMicroPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: MicroPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getMicroPost(slug);
  if (!post) return { title: "Post not found" };

  const preview = post.content.trim().slice(0, 100);
  return { title: preview, description: preview };
}

export default async function MicroPostPage({ params }: MicroPostPageProps) {
  const { slug } = await params;
  const post = getMicroPost(slug);

  if (!post) {
    notFound();
  }

  const { date, tags } = post.frontmatter;

  return (
    <article>
      <Link
        href="/micro"
        className="inline-flex items-center gap-1.5 text-sm text-subtle hover:text-foreground transition-colors mb-10"
      >
        <ArrowLeft size={14} />
        Micro
      </Link>

      <header className="mb-6">
        <time dateTime={date} className="text-sm text-subtle">
          {formatDate(date, { year: "numeric", month: "long", day: "numeric" })}
        </time>
        {tags && tags.length > 0 && (
          <p className="mt-2 text-xs text-subtle">{tags.join(" · ")}</p>
        )}
      </header>

      <MarkdownRenderer content={post.content} />
    </article>
  );
}
