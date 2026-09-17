import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          has: [{ type: "host", value: "resume.kshitizkamal.in" }],
          destination: "/resume.pdf",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
