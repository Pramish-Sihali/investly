import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.investly.baliyoventures.com",
      },
    ],
  },
};

export default nextConfig;