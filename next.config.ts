import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  redirects: async () => [
    {
      source: "/pack-discovery-ia",
      destination: "/pack-discovery",
      permanent: false,
    },
  ],
};

export default nextConfig;
