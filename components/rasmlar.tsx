import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTestimonialAutoPlay, setIsTestimonialAutoPlay] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
const testimonialAutoPlayRef =
  useRef<ReturnType<typeof setTimeout> | null>(null);


  // Testimonial rasm urllari 1 dan 32 gacha
  const testimonials = Array.from({ length: 32 }, (_, i) => ({
    id: i + 1,
    img: `/${i + 1}.png`
  }));

  // Testimonial avtomatik o'tish
  useEffect(() => {
    if (isTestimonialAutoPlay) {
      testimonialAutoPlayRef.current = setInterval(() => {
        setIsTransitioning(true);
        setCurrentTestimonial((prev) => {
          const next = prev + 1;
          return next >= testimonials.length ? 0 : next;
        });
        
        setTimeout(() => setIsTransitioning(false), 500);
      }, 5000);
    }

    return () => {
      if (testimonialAutoPlayRef.current) {
        clearInterval(testimonialAutoPlayRef.current);
      }
    };
  }, [isTestimonialAutoPlay, testimonials.length]);

  const nextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentTestimonial((prev) => {
      const next = prev + 1;
      return next >= testimonials.length ? 0 : next;
    });
    
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentTestimonial((prev) => {
      const prevIndex = prev - 1;
      return prevIndex < 0 ? testimonials.length - 1 : prevIndex;
    });
    
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentTestimonial) return;
    
    setIsTransitioning(true);
    setCurrentTestimonial(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  return (
    <section className="px-4 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl text-center lg:text-4xl font-black text-white mb-4 md:mb-0">
            O'QUVCHILARIM FIKRLARI
          </h2>
          
          <div className="flex items-center justify-center gap-4">
            <div className="flex gap-2 items-center justify-center">
              <button 
                onClick={prevSlide}
                disabled={isTransitioning}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-b from-[#8b5cf6] to-[#6d28d9] hover:from-[#7c3aed] hover:to-[#5b21b6] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_5px_0_0_#4c1d95] active:shadow-[0_2px_0_0_#4c1d95] active:translate-y-1 flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button 
                onClick={nextSlide}
                disabled={isTransitioning}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-b from-[#8b5cf6] to-[#6d28d9] hover:from-[#7c3aed] hover:to-[#5b21b6] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_5px_0_0_#4c1d95] active:shadow-[0_2px_0_0_#4c1d95] active:translate-y-1 flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2a1a3a] via-[#3a2550] to-[#2a1a3a] border-2 border-purple-500/20 shadow-[0_0_30px_rgba(139,92,246,0.15)] mb-12">
          {/* Main Image Display */}
          <div className="relative p-6 md:p-8">
            <div className="relative mx-auto max-w-md">
              <div className={`aspect-[9/16] overflow-hidden rounded-2xl md:rounded-3xl transition-opacity duration-300 ${
                isTransitioning ? 'opacity-70' : 'opacity-100'
              }`}>
                <img
                  src={testimonials[currentTestimonial].img}
                  alt={`O'quvchi natijasi ${currentTestimonial + 1}`}
                  className="w-full h-full object-contain transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              
              {/* Navigation Dots */}
              <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
                {testimonials.slice(0, 10).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    disabled={isTransitioning}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
                      index === currentTestimonial 
                        ? 'bg-purple-500 scale-125' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`${index + 1}-rasmga o'tish`}
                  />
                ))}
                {testimonials.length > 10 && (
                  <span className="text-white/70 text-sm ml-2">
                    ...
                  </span>
                )}
              </div>
              
              {/* Slide Counter */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-purple-600 to-purple-800 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                {currentTestimonial + 1} / {testimonials.length}
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-b from-purple-900/20 to-transparent">
            <div className="relative">
              <div className="flex overflow-x-auto gap-3 pb-4">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={testimonial.id}
                    onClick={() => goToSlide(index)}
                    disabled={isTransitioning}
                    className={`flex-shrink-0 w-16 h-24 md:w-20 md:h-32 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      index === currentTestimonial 
                        ? 'border-purple-500 scale-105 shadow-lg shadow-purple-500/50' 
                        : 'border-transparent hover:border-purple-300/50 hover:scale-102'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <div className="aspect-[9/16] w-full h-full">
                      <img
                        src={testimonial.img}
                        alt={`Thumbnail ${testimonial.id}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 py-0.5 rounded">
                      {testimonial.id}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
        </div>
        <div className="text-center">
          <button className="bg-gradient-to-b from-[#8b5cf6] via-[#7c3aed] to-[#6d28d9] hover:from-[#7c3aed] hover:via-[#6d28d9] hover:to-[#5b21b6] text-white font-black py-6 px-20 rounded-full text-xl md:text-2xl shadow-[0_10px_0_0_#4c1d95,0_15px_30px_rgba(139,92,246,0.5)] hover:shadow-[0_8px_0_0_#4c1d95,0_12px_30px_rgba(139,92,246,0.6)] active:shadow-[0_3px_0_0_#4c1d95] active:translate-y-2 transform transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]">
            Kursga qatnashish
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;