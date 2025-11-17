/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },

  // IMPORTANT: No basePath or assetPrefix when domain points to root
  basePath: "",
  assetPrefix: "",
  
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
