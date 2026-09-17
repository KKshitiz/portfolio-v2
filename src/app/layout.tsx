import type { Metadata } from "next";
import localFont from "next/font/local";
import { Newsreader } from "next/font/google";

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

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  display: "swap",
});

const SITE_DESCRIPTION =
  "Personal site of Kshitiz Kamal. Developer writing about software, design, and the craft of building things.";

export const metadata: Metadata = {
  metadataBase: new URL("https://kshitizkamal.in"),
  title: {
    default: "Kshitiz Kamal",
    template: "%s — Kshitiz Kamal",
  },
  description: SITE_DESCRIPTION,
  keywords: ["portfolio", "developer", "full-stack", "blog", "technology"],
  authors: [{ name: "Kshitiz Kamal" }],
  creator: "Kshitiz Kamal",
  openGraph: {
    title: "Kshitiz Kamal",
    description: SITE_DESCRIPTION,
    url: "https://kshitizkamal.in",
    siteName: "Kshitiz Kamal",
    locale: "en_US",
    type: "website",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kshitiz Kamal",
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
