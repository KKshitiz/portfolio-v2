import { Github, Twitter } from "lucide-react";
import Link from "next/link";
import { NavLinks } from "@/components/nav-links";

const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/KKshitiz", label: "GitHub" },
  { icon: Twitter, link: "https://twitter.com/KKshitiz", label: "Twitter" },
];

/**
 * Site chrome. Shared by the (site) route group layout and the root
 * not-found page, which sits outside that group and would otherwise
 * render without header or footer.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans antialiased">
      <div className="w-full max-w-2xl mx-auto px-6 flex flex-col flex-1">
        <header className="flex flex-col items-start gap-3 py-8 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:py-10">
          <Link
            href="/"
            className="font-serif text-lg tracking-tight whitespace-nowrap hover:text-muted transition-colors"
          >
            Kshitiz Kamal
          </Link>
          <NavLinks />
        </header>

        <main className="flex-1 pb-16">{children}</main>

        <footer className="flex items-center justify-between py-8 text-sm text-muted border-t border-border">
          <span>&copy; {new Date().getFullYear()} Kshitiz Kamal</span>
          <nav
            aria-label="Social navigation"
            className="flex items-center gap-4"
          >
            {SOCIAL_LINKS.map((social) => (
              <a
                href={social.link}
                key={social.label}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-muted hover:text-foreground transition-colors"
              >
                <social.icon size={17} />
              </a>
            ))}
          </nav>
        </footer>
      </div>
    </div>
  );
}
