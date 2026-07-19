const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages requires static export
  output: 'export',
  distDir: process.env.NEXT_DIST_DIR || 'out',
  basePath: '/ssvnauka',
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
