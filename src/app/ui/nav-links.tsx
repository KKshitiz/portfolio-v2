"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Blogs", link: "/blogs" },
  { name: "Stats", link: "/stats" },
  { name: "Projects", link: "/projects" },
  { name: "About", link: "/about" },
];

export function NavLinks() {
  const pathName = usePathname();

  return (
    <nav aria-label="Main navigation">
      <ul className="flex gap-x-3 text-xl">
        {navLinks.map((navLink) => (
          <li key={navLink.name}>
            <Link
              href={navLink.link}
              className={
                pathName === navLink.link ? "text-white font-bold" : ""
              }
            >
              {navLink.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
