export interface RepoStats {
  stars: number;
  forks: number;
  language: string | null;
  pushedAt: string;
  url: string;
}

interface GitHubRepoResponse {
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  pushed_at: string;
  html_url: string;
}

/**
 * Fetch live stats for a "owner/name" repo.
 *
 * Returns null on any failure — rate limiting, network errors, private or
 * deleted repos. Callers render their curated content regardless, so a GitHub
 * outage degrades the projects page rather than failing the build.
 */
export async function getRepoStats(repo: string): Promise<RepoStats | null> {
  if (!repo || !repo.includes("/")) {
    return null;
  }

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  // Unauthenticated requests are capped at 60/hour per IP, which shared build
  // IPs can exhaust. A token raises the ceiling to 5,000/hour.
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.warn(
        `[github] ${repo} returned ${response.status}; falling back to curated data`
      );
      return null;
    }

    const data = (await response.json()) as GitHubRepoResponse;

    return {
      stars: data.stargazers_count,
      forks: data.forks_count,
      language: data.language,
      pushedAt: data.pushed_at,
      url: data.html_url,
    };
  } catch (error) {
    console.warn(`[github] failed to fetch ${repo}:`, error);
    return null;
  }
}

/** Resolve stats for many repos at once, preserving input order. */
export async function getManyRepoStats(
  repos: string[]
): Promise<Map<string, RepoStats>> {
  const entries = await Promise.all(
    repos.map(async (repo) => [repo, await getRepoStats(repo)] as const)
  );

  return new Map(
    entries.filter((entry): entry is [string, RepoStats] => entry[1] !== null)
  );
}
