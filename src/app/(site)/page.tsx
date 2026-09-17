import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getAllBlogPosts, getAllProjects, getReadingTime } from "@/lib/content";
import { formatDate } from "@/lib/format";

export default function Home() {
  const recentPosts = getAllBlogPosts().slice(0, 3);
  const featuredProjects = getAllProjects().filter(
    (project) => project.frontmatter.featured
  );

  return (
    <div className="flex flex-col gap-16">
      <section className="pt-4">
        <h1 className="font-serif text-4xl sm:text-5xl tracking-tight leading-[1.15] mb-5">
          Hi, I&apos;m Kshitiz.
        </h1>
        <p className="text-lg text-muted leading-relaxed max-w-xl">
          Full-stack developer working across mobile and web. I build useful
          software and write about the craft of making things.
        </p>
      </section>

      {recentPosts.length > 0 && (
        <Section title="Writing" href="/blogs" linkLabel="All writing">
          <ul className="flex flex-col">
            {recentPosts.map((post) => (
              <li
                key={post.slug}
                className="border-t border-border first:border-t-0 first:pt-0 py-5"
              >
                <Link href={`/blogs/${post.slug}`} className="group block">
                  <h3 className="font-serif text-lg tracking-tight mb-1 group-hover:text-link transition-colors">
                    {post.frontmatter.title}
                  </h3>
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
        </Section>
      )}

      {featuredProjects.length > 0 && (
        <Section title="Projects" href="/projects" linkLabel="All projects">
          <ul className="flex flex-col">
            {featuredProjects.map((project) => {
              const { name, description, hostedUrl } = project.frontmatter;
              return (
                <li
                  key={project.slug}
                  className="border-t border-border first:border-t-0 first:pt-0 py-5"
                >
                  <a
                    href={hostedUrl ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <h3 className="font-serif text-lg tracking-tight mb-1 inline-flex items-baseline gap-1.5 group-hover:text-link transition-colors">
                      {name}
                      <ArrowUpRight
                        size={13}
                        className="text-subtle group-hover:text-link transition-colors shrink-0"
                      />
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {description}
                    </p>
                  </a>
                </li>
              );
            })}
          </ul>
        </Section>
      )}
    </div>
  );
}

function Section({
  title,
  href,
  linkLabel,
  children,
}: {
  title: string;
  href: string;
  linkLabel: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="text-xs uppercase tracking-[0.14em] text-subtle">
          {title}
        </h2>
        <Link
          href={href}
          className="text-xs text-subtle hover:text-foreground transition-colors"
        >
          {linkLabel} →
        </Link>
      </div>
      {children}
    </section>
  );
}
