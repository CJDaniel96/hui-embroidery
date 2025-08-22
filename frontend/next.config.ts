import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
    ],
    // 圖片格式優化
    formats: ['image/webp', 'image/avif'],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
