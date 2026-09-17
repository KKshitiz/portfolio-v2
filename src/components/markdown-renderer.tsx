import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        // rehypeRaw parses inline HTML (e.g. <details>) that markdown alone
        // leaves as literal text. Safe here because every post is authored by
        // the repo owner through Keystatic or git — never user submissions.
        rehypePlugins={[
          rehypeRaw,
          rehypeSlug,
          rehypeAutolinkHeadings,
          rehypeHighlight,
        ]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
