import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Plain static files in out/, so the site can live on any static host.
  output: "export",
  trailingSlash: true,
  // Photos are pre-sized by scripts/sync-photos.mjs, so no runtime optimizer is needed.
  images: { unoptimized: true },
  allowedDevOrigins: ["127.0.0.1"],
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  experimental: { optimizePackageImports: ["@phosphor-icons/react"] },
};

export default nextConfig;
