"use client"

import React, { useState, useEffect, Suspense, lazy } from 'react';
import dynamic from 'next/dynamic';

// Kritik komponentlarni lazy load qilamiz (tez yuklanish uchun)
const Header = dynamic(() => import('../components/header'), { 
  ssr: false,
  loading: () => <div className="h-16"></div>
});

const MainHeading = dynamic(() => import('../components/main-heading'), {
  ssr: false,
  loading: () => <div className="h-24"></div>
});

const CountdownTimer = dynamic(() => import('../components/sanoq'), {
  ssr: false,
  loading: () => <div className="h-12"></div>
});

// Pastki qism komponentlari - lazy load
const InstructorSection = dynamic(() => import('../components/instructor'), {
  ssr: false,
  loading: () => <div className="h-10"></div>
});

const BeforeAfterSection = dynamic(() => import('../components/before-after'), {
  ssr: false,
  loading: () => <div className="h-10"></div>
});

const TestimonialsSection = dynamic(() => import('../components/rasmlar'), {
  ssr: false,
  loading: () => <div className="h-10"></div>
});

const VideoCarouselSection = dynamic(() => import('../components/videos'), {
  ssr: false,
  loading: () => <div className="h-10"></div>
});

// HeroVideo - shart emas, lekin lazy load
const HeroVideoPlayer = dynamic(() => import('../components/HeroVideo'), {
  ssr: false,
  loading: () => <div className="aspect-video bg-gradient-to-br from-purple-900/20 to-black/50 rounded-2xl"></div>
});

// RegistrationForm - kritik, lekin lazy load
const RegistrationForm = dynamic(() => import('../components/RegistrationForm'), {
  ssr: false,
  loading: () => (
    <div className="max-w-md mx-auto border-3 border-purple-400/50 rounded-3xl p-6 md:p-8 mb-6 bg-gradient-to-br from-purple-500/10 via-purple-600/10 to-purple-500/10 backdrop-blur-sm shadow-[0_0_30px_rgba(139,92,246,0.3)]">
      <div className="h-8 bg-purple-500/20 rounded mb-4"></div>
      <div className="space-y-4">
        <div className="h-12 bg-purple-500/10 rounded-xl"></div>
        <div className="h-12 bg-purple-500/10 rounded-xl"></div>
        <div className="h-16 bg-gradient-to-b from-purple-600/20 to-purple-700/20 rounded-full"></div>
      </div>
    </div>
  )
});

// Inline Critical CSS - Birinchi ochilish uchun juda muhim
const criticalStyles = `
  @font-face {
    font-display: swap;
  }
  
  * {
    box-sizing: border-box;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  body {
    margin: 0;
    padding: 0;
    background: linear-gradient(180deg, #0a0a1f 0%, #0f0f28 20%, #14142e 40%, #0f0f28 60%, #0a0a1f 80%, #050510 100%);
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    overflow-x: hidden;
    min-height: 100vh;
  }
  
  /* Skeleton loader styles */
  .skeleton {
    background: linear-gradient(90deg, #1a1a2e 25%, #2a2a4a 50%, #1a1a2e 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  /* Image optimization */
  img {
    content-visibility: auto;
  }
  
  /* Prevent layout shift */
  .content-visibility-auto {
    content-visibility: auto;
  }
  
  /* Optimize animations */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

const ImanAhmedovaLanding: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    hero: true,
    instructor: false,
    beforeAfter: false,
    testimonials: false,
    videos: false
  });

  // Hydration tekshiruvi
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Intersection Observer - Lazy loading uchun
  useEffect(() => {
    if (!isHydrated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target.id;
            setVisibleSections(prev => ({
              ...prev,
              [section]: true
            }));
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    // Observe sections
    const sections = ['instructor', 'beforeAfter', 'testimonials', 'videos'];
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isHydrated]);

  const handleFormSubmit = (data: { name: string; phone: string }) => {
    console.log('Form submitted:', data);
    setFormSubmitted(true);
  };

  const handlePlayToggle = (isPlaying: boolean) => {
    console.log('Video is playing:', isPlaying);
  };

  const handleFullscreenToggle = (isFullscreen: boolean) => {
    console.log('Fullscreen:', isFullscreen);
  };

  // Preload critical resources
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Preconnect to critical domains
      const preconnectLinks = [
        'https://t.me',
        'https://b.imanakhmedovna.uz',
        'https://fast.wistia.net'
      ];

      preconnectLinks.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = url;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });

      // Preload critical images
      const criticalImages = ['https://ik.imagekit.io/kamron/iman.jpg', 'https://ik.imagekit.io/kamron/logo.png'];
      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    }
  }, []);

  return (
    <>
      {/* Inline Critical CSS */}
      <style dangerouslySetInnerHTML={{ __html: criticalStyles }} />
      
      {/* Preload Fonts */}
      <link
        rel="preload"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap"
        as="style"
        onLoad={() => {
          const link = document.createElement('link');
          link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap';
          link.rel = 'stylesheet';
          document.head.appendChild(link);
        }}
      />

      <div className="min-h-screen text-white font-sans relative" 
           style={{background: 'linear-gradient(180deg, #0a0a1f 0%, #0f0f28 20%, #14142e 40%, #0f0f28 60%, #0a0a1f 80%, #050510 100%)'}}>
        
        {/* Hero Section - Birinchi ekran */}
        <section className="relative px-4 py-8 md:py-12 content-visibility-auto">
          <div className="max-w-6xl mx-auto">
            <Header />
            <MainHeading />
            
            <div className="relative">
              <Suspense fallback={
                <div className="aspect-video bg-gradient-to-br from-purple-900/20 to-black/50 rounded-2xl skeleton"></div>
              }>
                <HeroVideoPlayer />
              </Suspense>

              {/* Tugma rasm ustiga sal chiqib turishi uchun */}
              <div className="absolute inset-x-0 bottom-0 flex justify-center translate-y-1/2 px-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full max-w-md bg-gradient-to-b from-[#8b5cf6] via-[#7c3aed] to-[#6d28d9] text-white font-black py-6 rounded-full text-xl md:text-2xl shadow-[0_10px_0_0_#4c1d95,0_15px_30px_rgba(139,92,246,0.5)] hover:shadow-[0_8px_0_0_#4c1d95,0_12px_30px_rgba(139,92,246,0.6)] active:shadow-[0_3px_0_0_#4c1d95] active:translate-y-2 transform transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Ro'yxatdan o'tish
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Modal */}
        {isModalOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 overflow-y-auto"
            onClick={() => setIsModalOpen(false)}
          >
            <div 
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <Suspense fallback={
                <div className="max-w-md mx-auto border-3 border-purple-400/50 rounded-3xl p-6 md:p-8 mb-6 bg-gradient-to-br from-purple-500/10 via-purple-600/10 to-purple-500/10 backdrop-blur-sm shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                  <div className="h-8 bg-purple-500/20 rounded mb-4 skeleton"></div>
                  <div className="space-y-4">
                    <div className="h-12 bg-purple-500/10 rounded-xl skeleton"></div>
                    <div className="h-12 bg-purple-500/10 rounded-xl skeleton"></div>
                    <div className="h-16 bg-gradient-to-b from-purple-600/20 to-purple-700/20 rounded-full skeleton"></div>
                  </div>
                </div>
              }>
                <RegistrationForm 
                  isModal={true} 
                  onClose={() => setIsModalOpen(false)} 
                />
              </Suspense>
            </div>
          </div>
        )}

        {/* Lazy Loaded Sections with Intersection Observer */}
        <div id="instructor" className="content-visibility-auto">
          {visibleSections.instructor && (
            <Suspense fallback={
              <div className="px-4 py-8 md:py-16 bg-gradient-to-b from-[#0a0a1f] to-[#14142e] min-h-[400px]">
                <div className="max-w-6xl mx-auto">
                  <div className="h-12 bg-purple-500/10 rounded mb-8 skeleton"></div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="h-[400px] bg-purple-500/10 rounded-3xl skeleton"></div>
                    <div className="space-y-4">
                      <div className="h-24 bg-purple-500/10 rounded-xl skeleton"></div>
                      <div className="h-64 bg-purple-500/10 rounded-xl skeleton"></div>
                    </div>
                  </div>
                </div>
              </div>
            }>
              <InstructorSection />
            </Suspense>
          )}
        </div>

        <div id="beforeAfter" className="content-visibility-auto">
          {visibleSections.beforeAfter && (
            <Suspense fallback={
              <div className="px-4 py-12 md:py-16 min-h-[400px]">
                <div className="max-w-4xl mx-auto">
                  <div className="h-12 bg-purple-500/10 rounded mb-8 skeleton"></div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="h-[500px] bg-purple-500/10 rounded-3xl skeleton"></div>
                    <div className="h-[500px] bg-purple-500/10 rounded-3xl skeleton"></div>
                  </div>
                </div>
              </div>
            }>
              <BeforeAfterSection />
            </Suspense>
          )}
        </div>

        <div id="testimonials" className="content-visibility-auto">
          {visibleSections.testimonials && (
            <Suspense fallback={
              <div className="px-4 py-12 md:py-16 min-h-[600px]">
                <div className="max-w-6xl mx-auto">
                  <div className="h-12 bg-purple-500/10 rounded mb-8 skeleton"></div>
                  <div className="h-[500px] bg-purple-500/10 rounded-3xl skeleton"></div>
                </div>
              </div>
            }>
              <TestimonialsSection />
            </Suspense>
          )}
        </div>

        <div id="videos" className="content-visibility-auto">
          {visibleSections.videos && (
            <Suspense fallback={
              <div className="px-4 py-16 min-h-[400px]">
                <div className="max-w-6xl mx-auto">
                  <div className="h-12 bg-purple-500/10 rounded mb-8 skeleton"></div>
                  <div className="h-[400px] bg-purple-500/10 rounded-3xl skeleton"></div>
                </div>
              </div>
            }>
              <VideoCarouselSection />
            </Suspense>
          )}
        </div>

        {/* Fixed Countdown Timer at Bottom */}
        <Suspense fallback={<div className="h-12"></div>}>
          <CountdownTimer 
            initialHours={24}
            initialMinutes={0}
            initialSeconds={0}
            size="small"
            fixed={true}
          />
        </Suspense>

        {/* Spacer for fixed countdown */}
        <div className="h-12"></div>

        {/* Loading progress indicator */}
        {!isHydrated && (
          <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-50">
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default ImanAhmedovaLanding;