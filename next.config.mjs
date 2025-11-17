/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,

  // GitHub Pages requirements
  basePath: "/my-portfolio",
  assetPrefix: "/my-portfolio/",

  images: { unoptimized: true },

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
