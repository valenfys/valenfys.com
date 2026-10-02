import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      // Import Markdown as bytes (Turbopack has no plain-text type), so content edits hot-reload in `next dev`.
      "*.md": { type: "bytes" },
    },
  },
};

export default nextConfig;
