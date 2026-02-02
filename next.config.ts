import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true, // Gzip

  experimental: {
    optimizeCss: false, // CSS optimizatsiyasini Turbopack bilan emas
    scrollRestoration: true,
  },

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
        ],
      },
    ];
  },

  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        sideEffects: true,
        usedExports: true,
        concatenateModules: true,
      };
    }
    return config;
  },
};

export default nextConfig;
