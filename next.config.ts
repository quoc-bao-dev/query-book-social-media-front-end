import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'picsum.photos',
      'loremflickr.com',
      'avatars.githubusercontent.com',
      'query-book-social-media-image-server.onrender.com',
    ], // Add your local development domain
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // Bỏ qua ESLint khi build
  },
  experimental: {
    turbopack: false, // Tắt Turbopack
  },
};

export default withNextIntl(nextConfig);
