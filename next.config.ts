import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    /* config options here */
<<<<<<< HEAD
    reactStrictMode: false,
=======
    reactStrictMode: true,
    images: {
        domains: ['localhost'], // Add your local development domain
    },
>>>>>>> that-work
};

export default withNextIntl(nextConfig);
