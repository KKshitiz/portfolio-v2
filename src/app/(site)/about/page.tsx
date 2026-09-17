import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Kshitiz Kamal — full-stack developer working across mobile and web.",
};

export default function AboutPage() {
  return (
    <section>
      <header className="mb-10">
        <h1 className="font-serif text-4xl tracking-tight">About</h1>
      </header>
      <div className="prose">
        <p>
          Hi, I&apos;m Kshitiz Kamal &mdash; a full-stack developer who enjoys
          building useful software and writing about technology.
        </p>
        <p>
          I work across mobile and web, primarily with Flutter, Next.js, and
          TypeScript. When I&apos;m not coding I&apos;m usually reading,
          writing, or exploring new ideas.
        </p>
        <p>
          You can find my code on{" "}
          <a
            href="https://github.com/KKshitiz"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          , or browse what I&apos;ve been building on the{" "}
          <a href="/projects">projects</a> page.
        </p>
      </div>
    </section>
  );
}
