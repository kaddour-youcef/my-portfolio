// next.config.mjs (or .js/.ts)
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',           // write static HTML to /out
  trailingSlash: true,        // avoids needing server rewrites on GH Pages
  images: { unoptimized: true }, // no image optimizer on Pages

  // IMPORTANT: your repo name
  basePath: isProd ? '/my-portfolio' : '',
  assetPrefix: isProd ? '/my-portfolio/' : undefined,

  // your existing settings
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
