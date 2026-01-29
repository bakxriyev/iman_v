import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ 1. Asosiy optimizatsiya sozlamalari
  reactStrictMode: true,
  compress: true, // Gzip compression
  
  // ✅ 2. Turbopack muammosini hal qilish
  // Bu qatorni qo'shish kerak (muhim!)
  turbopack: {},
  
  // ✅ 3. Rasm optimizatsiyasi
  images: {
    formats: ['image/webp'], // WebP formatini avval o'rnating
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Mobil va desktop uchun
    imageSizes: [16, 32, 64, 96, 128, 256, 384], // Kichik o'lchamlar
    minimumCacheTTL: 60, // Minimum cache vaqti (sekund)
  },
  
  // ✅ 4. Tajribali optimizatsiyalar
  experimental: {
    optimizeCss: true, // CSS optimizatsiyasi
    scrollRestoration: true, // Scroll joylashuvini saqlash
  },
  
  // ✅ 5. Production uchun console log'larini olib tashlash
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'] // Faqat error va warn log'larini qoldiring
    } : false,
  },
  
  // ✅ 6. Xavfsizlik headerlari
  async headers() {
    return [
      {
        source: '/(.*)', // Barcha URL'lar uchun
        headers: [
          // Brauzer optimizatsiyasi
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          // XSS himoyasi
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // Frame himoyasi
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          // MIME type himoyasi
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // Cache boshqaruvi
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400'
          }
        ],
      },
    ];
  },
  
  // ✅ 7. Webpack optimizatsiyasi (agar kerak bo'lsa)
  webpack: (config, { dev, isServer }) => {
    // Production rejimda optimallashtirish
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