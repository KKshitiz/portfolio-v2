import type { Metadata } from "next";
import { PostList } from "@/components/post-list";
import { getAllBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays and notes on software, design, and technology.",
};

export default function BlogsPage() {
  const posts = getAllBlogPosts();

  return (
    <section>
      <header className="mb-12">
        <h1 className="font-serif text-4xl tracking-tight mb-3">Writing</h1>
        <p className="text-muted">
          Essays and notes on software, design, and technology.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted">No posts yet.</p>
      ) : (
        <PostList posts={posts} />
      )}
    </section>
  );
}
