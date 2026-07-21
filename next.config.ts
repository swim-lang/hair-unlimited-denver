import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  assetPrefix: basePath || undefined,
  basePath: basePath || undefined,
  images: { unoptimized: true },
  output: isGitHubPages ? "export" : undefined,
  trailingSlash: isGitHubPages,
  typescript: { ignoreBuildErrors: isGitHubPages },
};

export default nextConfig;
