const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages with custom domain - static export
  output: 'export',
  distDir: process.env.NEXT_DIST_DIR || 'out',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: { unoptimized: true },
  trailingSlash: true,
};

module.exports = nextConfig;
