import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true, // Gzip

  experimental: {
    optimizeCss: false, // CSS optimizatsiyasini Turbopack bilan emas
    scrollRestoration: true,
  },
};

export default nextConfig;
