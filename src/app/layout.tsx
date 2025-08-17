import { Facebook, Github, Twitter } from "lucide-react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";
import { NavLinks } from "./ui/nav-links";

const socialLinks = [
  { icon: Facebook, link: "https://facebook.com" },
  { icon: Twitter, link: "https://twitter.com" },
  { icon: Github, link: "https://github.com" },
];

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Kshitiz Kamal - Portfolio",
  description: "Personal portfolio and blog of Kshitiz Kamal. Full-stack developer, writer, and technology enthusiast.",
  keywords: ["portfolio", "developer", "full-stack", "blog", "technology"],
  authors: [{ name: "Kshitiz Kamal" }],
  creator: "Kshitiz Kamal",
  openGraph: {
    title: "Kshitiz Kamal - Portfolio",
    description: "Personal portfolio and blog of Kshitiz Kamal. Full-stack developer, writer, and technology enthusiast.",
    url: "https://kshitizkamal.in", // Replace with your actual domain
    siteName: "Kshitiz Kamal Portfolio",
    images: [
      {
        url: "/og-image.jpg", // You'll need to add this image to your public folder
        width: 1200,
        height: 630,
        alt: "Kshitiz Kamal - Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kshitiz Kamal - Portfolio",
    description: "Personal portfolio and blog of Kshitiz Kamal. Full-stack developer, writer, and technology enthusiast.",
    images: ["/og-image.jpg"], // Same image as Open Graph
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="flex flex-col max-w-3xl mx-auto min-h-screen justify-between">
          <header className="flex items-center justify-between py-10">
            <Link href="/">
              <h3 className="text-3xl font-bold">Kshitiz Kamal</h3>
            </Link>
            <NavLinks />
          </header>
          {children}

          <footer className="flex flex-col justify-center items-center gap-y-4 my-10">
            <nav
              aria-label="Social navigation"
              className="flex space-x-2 items-center justify-center"
            >
              {socialLinks.map((social) => (
                <a
                  href={social.link}
                  key={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon />
                </a>
              ))}
            </nav>
            <div>Kshitiz Kamal • ©{new Date().getFullYear()}</div>
          </footer>
        </main>
      </body>
    </html>
  );
}
