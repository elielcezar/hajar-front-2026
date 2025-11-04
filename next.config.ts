import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hajar.ecwd.cloud',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'hajar-imoveis.s3.sa-east-1.amazonaws.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  // Otimizações para SEO e performance
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;

