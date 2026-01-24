import React from 'react';

const InstructorSection: React.FC = () => {
  return (
    <section className="px-4 py-8 md:py-16 bg-gradient-to-b from-[#0a0a1f] to-[#14142e]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-black mb-2 md:mb-4 tracking-tight">
            USTOZINGIZ KIM?
          </h2>
          <div className="flex items-center justify-center gap-2 md:gap-6 mb-3 md:mb-6">
            <div className="h-px bg-white/40 w-8 md:w-24"></div>
            <p className="text-base sm:text-lg md:text-3xl font-serif text-white px-2">
              IMAN AKHMEDOVA
            </p>
            <div className="h-px bg-white/40 w-8 md:w-24"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-8 lg:gap-12 items-start">
          <div className="col-span-1">
            <div className="rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(139,92,246,0.4)] md:shadow-[0_20px_50px_rgba(139,92,246,0.5)] border-2 md:border-4 border-purple-500/40">
              <div className="aspect-[2/4] relative">
                <img
                  src="/iman.jpg"
                  alt="Iman Akhmedova"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="col-span-1 space-y-3 sm:space-y-4 md:space-y-8">
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm md:backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-3xl p-3 sm:p-4 md:p-8 border border-white/10 shadow-lg">
              <h4 className="text-sm sm:text-base md:text-2xl font-black mb-2 md:mb-6 text-white text-left">
                SHAXSIY NATIJA:
              </h4>
              <div className="bg-gradient-to-r from-purple-900/40 to-purple-700/40 p-3 sm:p-4 md:p-6 rounded-lg md:rounded-xl text-center">
                <p className="text-xs sm:text-sm md:text-2xl font-bold leading-tight">
                  20.000$ qarzdan 4 oy ichida, oson va tez qutilish
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-800/80 to-purple-950/80 backdrop-blur-sm md:backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-3xl p-3 sm:p-4 md:p-8 border border-purple-400/30 shadow-xl">
              <h4 className="text-sm sm:text-base md:text-2xl font-black mb-3 md:mb-8 text-white text-left">
                MIJOZLAR NATIJASI:
              </h4>
              <div className="space-y-2 sm:space-y-3 md:space-y-5">
                <div className="flex items-start gap-2 sm:gap-4 bg-white/5 p-2 sm:p-3 md:p-6 rounded-lg md:rounded-xl hover:bg-white/10 transition-all">
                  <div className="bg-purple-600 text-white min-w-6 sm:min-w-8 md:min-w-12 h-6 sm:h-8 md:h-12 rounded-full flex items-center justify-center text-xs sm:text-sm md:text-xl font-bold shrink-0">
                    1
                  </div>
                  <p className="text-xs sm:text-sm md:text-xl leading-tight">
                    27 kunda 10.000$ qarzdan qutilish
                  </p>
                </div>
                
                <div className="flex items-start gap-2 sm:gap-4 bg-white/5 p-2 sm:p-3 md:p-6 rounded-lg md:rounded-xl hover:bg-white/10 transition-all">
                  <div className="bg-purple-600 text-white min-w-6 sm:min-w-8 md:min-w-12 h-6 sm:h-8 md:h-12 rounded-full flex items-center justify-center text-xs sm:text-sm md:text-xl font-bold shrink-0">
                    2
                  </div>
                  <p className="text-xs sm:text-sm md:text-xl leading-tight">
                    21 kunda 2 qavatli uy olish
                  </p>
                </div>
                
                <div className="flex items-start gap-2 sm:gap-4 bg-white/5 p-2 sm:p-3 md:p-6 rounded-lg md:rounded-xl hover:bg-white/10 transition-all">
                  <div className="bg-purple-600 text-white min-w-6 sm:min-w-8 md:min-w-12 h-6 sm:h-8 md:h-12 rounded-full flex items-center justify-center text-xs sm:text-sm md:text-xl font-bold shrink-0">
                    3
                  </div>
                  <p className="text-xs sm:text-sm md:text-xl leading-tight">
                    10.000 dan ortiq turmush qurish va tiklanish holatlari
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-2">
          <button className="bg-gradient-to-b from-[#8b5cf6] via-[#7c3aed] to-[#6d28d9] hover:from-[#7c3aed] hover:via-[#6d28d9] hover:to-[#5b21b6] text-white font-black py-6 px-20 rounded-full text-xl md:text-2xl shadow-[0_10px_0_0_#4c1d95,0_15px_30px_rgba(139,92,246,0.5)] hover:shadow-[0_8px_0_0_#4c1d95,0_12px_30px_rgba(139,92,246,0.6)] active:shadow-[0_3px_0_0_#4c1d95] active:translate-y-2 transform transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]">
            Kursga qatnashish
          </button>
        </div>
      </div>
    </section>
  );
};

export default InstructorSection;