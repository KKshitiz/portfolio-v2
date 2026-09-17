# kshitizkamal.in

Personal site and blog. Next.js App Router, markdown content in the repo, and a
browser-based editor that commits posts back to GitHub.

## Getting started

```bash
pnpm install
pnpm dev
```

- Site: http://localhost:3000
- Editor: http://localhost:3000/keystatic

## Writing

Content lives in `content/` as plain markdown with YAML frontmatter:

| Folder              | What it is                         |
| ------------------- | ---------------------------------- |
| `content/blog/`     | Long-form posts (`/blogs`)         |
| `content/micro/`    | Short notes (`/micro`)             |
| `content/projects/` | Project entries (`/projects`)      |

Edit them in a text editor, or through [Keystatic](https://keystatic.com) at
`/keystatic`. Locally the editor writes straight to disk; in production it
commits to this repo through a GitHub App.

`src/lib/content.ts` reads and parses these files — it is the single place that
knows about the content directory layout.

## Projects and GitHub

Each entry in `content/projects/` may set a `repo` field (`owner/name`). At
build time `src/lib/github.ts` fetches live stars, language, and last-pushed
date, revalidating hourly.

If the GitHub API is unavailable, rate-limited, or the repo is private, the
fetch returns `null` and the page falls back to the curated content — it never
fails the build.

## Environment

Copy `.env.example` to `.env`. Everything is optional for local development:
with no `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` set, the editor runs in local
mode and needs no auth.

For production, visit `/keystatic` on the deployed site once and follow the
GitHub App setup. It generates four `KEYSTATIC_*` values — copy all of them into
your Vercel environment variables.

`GITHUB_TOKEN` is optional and only raises the projects-page API rate limit from
60/hour to 5,000/hour.

## Structure

```
src/app/(site)/      Public pages — own layout, imports globals.css
src/app/keystatic/   Editor UI, deliberately outside (site) so the
                     site stylesheet cannot bleed into it
src/app/api/         Keystatic route handler
src/components/      Shared UI
src/lib/             Content parsing, GitHub API, formatting
keystatic.config.ts  Content schema
```
