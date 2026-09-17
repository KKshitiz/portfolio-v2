import type { Metadata } from "next";
import { Suspense } from "react";
import { MicroList } from "@/components/micro-list";
import { getAllMicroPosts, getTagCounts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Micro",
  description: "Short thoughts and quick updates.",
};

export default function MicroPage() {
  const posts = getAllMicroPosts();
  const tags = getTagCounts(posts);

  return (
    <section>
      <header className="mb-10">
        <h1 className="font-serif text-4xl tracking-tight mb-3">Micro</h1>
        <p className="text-muted">Short thoughts and quick updates.</p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted">Nothing here yet.</p>
      ) : (
        // MicroList reads the ?tag= param via useSearchParams, which needs a
        // Suspense boundary for the page to stay statically rendered.
        <Suspense fallback={null}>
          <MicroList posts={posts} tags={tags} />
        </Suspense>
      )}
    </section>
  );
}
