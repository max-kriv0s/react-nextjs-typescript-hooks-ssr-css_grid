import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'old-images.hb.ru-msk.vkcs.cloud', pathname: '/uploads/**' }],
  },
};

export default nextConfig;
