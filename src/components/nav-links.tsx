"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { name: "Writing", link: "/blogs" },
  { name: "Micro", link: "/micro" },
  { name: "Projects", link: "/projects" },
  { name: "About", link: "/about" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation">
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm sm:gap-x-5">
        {NAV_LINKS.map((navLink) => {
          const isActive = pathname.startsWith(navLink.link);
          return (
            <li key={navLink.name}>
              <Link
                href={navLink.link}
                className={`transition-colors ${
                  isActive
                    ? "text-foreground font-medium"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {navLink.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
