import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        subtle: "var(--subtle)",
        border: "var(--border)",
        accent: "var(--accent)",
        card: "var(--card)",
        link: "var(--link)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        serif: ["var(--font-newsreader)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
