import { ExternalLink, GitFork, Github, Star } from "lucide-react";
import type { Metadata } from "next";
import { getAllProjects, type ProjectFrontmatter, type Post } from "@/lib/content";
import { getManyRepoStats, type RepoStats } from "@/lib/github";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've designed, built, and shipped.",
};

// Matches the revalidate window on the GitHub fetches in src/lib/github.ts.
export const revalidate = 3600;

export default async function ProjectsPage() {
  const projects = getAllProjects();
  const stats = await getManyRepoStats(
    projects
      .map((project) => project.frontmatter.repo)
      .filter((repo): repo is string => Boolean(repo))
  );

  return (
    <section>
      <header className="mb-12">
        <h1 className="font-serif text-4xl tracking-tight mb-3">Projects</h1>
        <p className="text-muted">
          Things I&apos;ve designed, built, and shipped.
        </p>
      </header>

      <ul className="flex flex-col">
        {projects.map((project) => (
          <ProjectRow
            key={project.slug}
            project={project}
            stats={
              project.frontmatter.repo
                ? stats.get(project.frontmatter.repo) ?? null
                : null
            }
          />
        ))}
      </ul>
    </section>
  );
}

function ProjectRow({
  project,
  stats,
}: {
  project: Post<ProjectFrontmatter>;
  stats: RepoStats | null;
}) {
  const { name, description, hostedUrl, repo, tags } = project.frontmatter;

  // Drop curated tags the live GitHub language already covers, so a
  // TypeScript repo tagged "TypeScript" doesn't render it twice.
  const extraTags = (tags ?? []).filter(
    (tag) => tag.toLowerCase() !== stats?.language?.toLowerCase()
  );

  return (
    <li className="py-7 border-t border-border first:border-t-0 first:pt-0">
      <div className="flex items-baseline justify-between gap-4 mb-1.5">
        <h2 className="font-serif text-xl tracking-tight">
          {hostedUrl ? (
            <a
              href={hostedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-1.5 hover:text-link transition-colors"
            >
              {name}
              <ExternalLink
                size={13}
                className="text-subtle group-hover:text-link transition-colors shrink-0"
              />
            </a>
          ) : (
            name
          )}
        </h2>
        {repo && (
          <a
            href={stats?.url ?? `https://github.com/${repo}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on GitHub`}
            className="text-subtle hover:text-foreground transition-colors shrink-0"
          >
            <Github size={16} />
          </a>
        )}
      </div>

      <p className="text-muted leading-relaxed mb-3">{description}</p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-subtle">
        {/* Live from the GitHub API; absent when the repo is private or the
            API is unavailable, in which case the curated tags still render. */}
        {stats && (
          <>
            {stats.language && (
              <span className="text-muted">{stats.language}</span>
            )}
            <span className="inline-flex items-center gap-1">
              <Star size={12} />
              {stats.stars}
            </span>
            {stats.forks > 0 && (
              <span className="inline-flex items-center gap-1">
                <GitFork size={12} />
                {stats.forks}
              </span>
            )}
            <span>
              updated{" "}
              {new Date(stats.pushedAt).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </span>
          </>
        )}
        {extraTags.length > 0 && (
          <span className="text-subtle">{extraTags.join(" · ")}</span>
        )}
      </div>
    </li>
  );
}
