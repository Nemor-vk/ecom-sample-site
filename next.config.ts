import type { NextConfig } from "next";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-worlkaround-plugin');

const nextConfig: NextConfig = {
  images: {
    domains: ["ssgafvsdeptagcagtmgw.supabase.co", "ik.imagekit.io"], // Add your hostname here
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }
    return config;
  },
};

export default nextConfig;
