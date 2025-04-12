import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  transpilePackages: ['rsuite/esm/locales'],
  experimental: {
    esmExternals: 'loose',
  },
};

export default nextConfig;
