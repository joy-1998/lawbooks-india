/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const isProd = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.GITHUB_ACTIONS || process.env.DEPLOY_TARGET === 'gh-pages';
const basePath = isGitHubPages ? '/lawbooks-india' : '';

const nextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  experimental: {},
};

module.exports = withPWA(nextConfig);
