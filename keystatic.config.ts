import { collection, config, fields } from "@keystatic/core";

// Switch on the app slug rather than NODE_ENV so the project builds before the
// GitHub App exists, then upgrades to GitHub mode automatically once the env
// vars are set. NEXT_PUBLIC_ is required: this config is imported by the admin
// UI client bundle too, and a server/client mismatch here breaks the editor.
const githubAppSlug = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG;

const storage = githubAppSlug
  ? ({
      kind: "github",
      repo: { owner: "KKshitiz", name: "portfolio-v2" },
    } as const)
  : ({ kind: "local" } as const);

// Keep the editor to plain-markdown features only. Markdoc tags such as
// {% callout %} would round-trip into the file but react-markdown cannot
// render them, so they are left disabled.
const markdocOptions = {
  bold: true,
  italic: true,
  strikethrough: true,
  code: true,
  heading: [2, 3, 4] as const,
  blockquote: true,
  orderedList: true,
  unorderedList: true,
  table: true,
  link: true,
  image: true,
  codeBlock: true,
  divider: true,
};

const tags = fields.array(fields.text({ label: "Tag" }), {
  label: "Tags",
  itemLabel: (props) => props.value,
});

export default config({
  storage,
  ui: {
    brand: { name: "Kshitiz Kamal" },
    navigation: {
      Content: ["posts", "micro"],
      Work: ["projects"],
    },
  },
  collections: {
    posts: collection({
      label: "Blog",
      path: "content/blog/*",
      slugField: "title",
      entryLayout: "content",
      // `extension: "md"` on the content field is what keeps these as plain .md
      // files rather than .mdoc, so src/lib/content.ts reads them unchanged.
      format: { contentField: "content", data: "yaml" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        date: fields.date({
          label: "Publish date",
          defaultValue: { kind: "today" },
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        tags,
        image: fields.image({
          label: "Cover image",
          directory: "public/images/blog",
          publicPath: "/images/blog",
        }),
        content: fields.markdoc({
          label: "Content",
          extension: "md",
          options: {
            ...markdocOptions,
            image: {
              directory: "public/images/blog",
              publicPath: "/images/blog",
            },
          },
        }),
      },
    }),

    micro: collection({
      label: "Micro",
      path: "content/micro/*",
      slugField: "slug",
      entryLayout: "content",
      format: { contentField: "content", data: "yaml" },
      schema: {
        slug: fields.slug({ name: { label: "Slug" } }),
        date: fields.date({
          label: "Publish date",
          defaultValue: { kind: "today" },
        }),
        tags,
        content: fields.markdoc({
          label: "Note",
          extension: "md",
          options: {
            ...markdocOptions,
            image: {
              directory: "public/images/micro",
              publicPath: "/images/micro",
            },
          },
        }),
      },
    }),

    projects: collection({
      label: "Projects",
      path: "content/projects/*",
      slugField: "name",
      format: { contentField: "content", data: "yaml" },
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        description: fields.text({
          label: "Description",
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        hostedUrl: fields.url({ label: "Live URL" }),
        repo: fields.text({
          label: "GitHub repo",
          description:
            "owner/name — used to pull live stars, language and last-updated. Leave blank for private or non-GitHub projects.",
        }),
        tags,
        featured: fields.checkbox({
          label: "Featured on home page",
          defaultValue: false,
        }),
        order: fields.integer({
          label: "Sort order",
          description: "Lower numbers appear first.",
          defaultValue: 0,
        }),
        content: fields.markdoc({
          label: "Notes",
          extension: "md",
          options: markdocOptions,
        }),
      },
    }),
  },
});
