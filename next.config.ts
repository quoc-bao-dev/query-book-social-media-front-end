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
        ], // Add your local development domain
    },
};

export default withNextIntl(nextConfig);
