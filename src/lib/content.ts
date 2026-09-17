import fs from "fs";
import matter from "gray-matter";
import path from "path";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export interface BlogFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
  image?: string;
}

export interface MicroFrontmatter {
  date: string;
  tags?: string[];
}

export interface ProjectFrontmatter {
  name: string;
  description: string;
  hostedUrl?: string;
  repo?: string;
  tags?: string[];
  featured?: boolean;
  order?: number;
}

export interface Post<T> {
  slug: string;
  content: string;
  frontmatter: T;
}

function readMarkdownDirectory<T>(directory: string): Post<T>[] {
  const fullPath = path.join(CONTENT_ROOT, directory);

  if (!fs.existsSync(fullPath)) {
    return [];
  }

  const files = fs.readdirSync(fullPath).filter((f) => f.endsWith(".md"));

  return files.map((filename) => {
    const filePath = path.join(fullPath, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
      slug: filename.replace(/\.md$/, ""),
      content,
      frontmatter: data as T,
    };
  });
}

function getPostBySlug<T>(directory: string, slug: string): Post<T> | null {
  const filePath = path.join(CONTENT_ROOT, directory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    content,
    frontmatter: data as T,
  };
}

export function getAllBlogPosts(): Post<BlogFrontmatter>[] {
  return readMarkdownDirectory<BlogFrontmatter>("blog").sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export function getBlogPost(slug: string): Post<BlogFrontmatter> | null {
  return getPostBySlug<BlogFrontmatter>("blog", slug);
}

export function getAllMicroPosts(): Post<MicroFrontmatter>[] {
  return readMarkdownDirectory<MicroFrontmatter>("micro").sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export function getMicroPost(slug: string): Post<MicroFrontmatter> | null {
  return getPostBySlug<MicroFrontmatter>("micro", slug);
}

export function getAllProjects(): Post<ProjectFrontmatter>[] {
  return readMarkdownDirectory<ProjectFrontmatter>("projects").sort(
    (a, b) => (a.frontmatter.order ?? 0) - (b.frontmatter.order ?? 0)
  );
}

const WORDS_PER_MINUTE = 200;

/** Rounded-up reading time in minutes, with a floor of 1. */
export function getReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/**
 * Distinct tags across a set of posts with how often each occurs, ordered by
 * frequency then alphabetically.
 */
export function getTagCounts<T extends { tags?: string[] }>(
  posts: Post<T>[]
): { name: string; count: number }[] {
  const counts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.frontmatter.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}
