import Link from "next/link";

export function NotFoundContent() {
  return (
    <section className="py-20 text-center">
      <p className="font-serif text-6xl tracking-tight mb-4">404</p>
      <h1 className="text-lg mb-2">This page doesn&apos;t exist</h1>
      <p className="text-muted mb-8">
        It may have been moved, or the link might be wrong.
      </p>
      <Link
        href="/"
        className="text-sm text-link hover:underline underline-offset-4"
      >
        ← Back home
      </Link>
    </section>
  );
}
