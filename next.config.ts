import type { NextConfig } from "next";

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
  // webpack: (config, { isServer }) => {
  //   if (isServer) {
  //     config.plugins = [...config.plugins, new PrismaPlugin()];
  //   }
  //   return config;
  // },
};

export default nextConfig;
