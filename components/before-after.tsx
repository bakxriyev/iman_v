import React from 'react';
import  { useState } from 'react';
import Modal from './ReegisterModal';

const BeforeAfterSection: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-8 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 text-transparent bg-clip-text">
          KURSDA NIMALARNI O'RGANASIZ?
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Before */}
          <div className="bg-gradient-to-br from-[#2a1a3a] via-[#3a2550] to-[#2a1a3a] rounded-3xl p-6 md:p-8 border-2 border-purple-500/20 shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:shadow-[0_0_40px_rgba(139,92,246,0.25)] transition-all">
            <div className="mb-6">
              <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center mb-4 border-2 border-purple-400/20 overflow-hidden">
                <img 
                  src="https://ik.imagekit.io/kamron/avvalgi.png" 
                  alt="Oldingi siz"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-300 to-purple-300 text-transparent bg-clip-text">OLDINGI SIZ:</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 hover:translate-x-2 transition-transform">
                <span className="text-purple-400 flex-shrink-0 text-lg">●</span>
                <span>Tinimsiz duolar, ibodatlar qilasiz lekin natija yo'q</span>
              </li>
              <li className="flex items-start gap-2 hover:translate-x-2 transition-transform">
                <span className="text-purple-400 flex-shrink-0 text-lg">●</span>
                <span>Maqsadlariz, ibodatlaringizga dangasiz, bir ishni ohirigacha yetkaza olmaysiz</span>
              </li>
              <li className="flex items-start gap-2 hover:translate-x-2 transition-transform">
                <span className="text-purple-400 flex-shrink-0 text-lg">●</span>
                <span>Muammoni hal qilish uchun kurslar, kitoblar o'qiysiz natijalar esa vaqtinchalik</span>
              </li>
              <li className="flex items-start gap-2 hover:translate-x-2 transition-transform">
                <span className="text-purple-400 flex-shrink-0 text-lg">●</span>
                <span>Doimiy yomon hayollardan qiynalasiz, o'zingizga nisbatan ishonchingiz past</span>
              </li>
            </ul>
          </div>

          {/* After */}
          <div className="bg-gradient-to-br from-[#8b5cf6] via-[#7c3aed] to-[#6d28d9] rounded-3xl p-6 md:p-8 border-2 border-purple-300/50 shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:shadow-[0_0_50px_rgba(139,92,246,0.6)] transition-all">
            <div className="mb-6">
              <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-purple-800/50 rounded-2xl flex items-center justify-center mb-4 border-2 border-purple-300/30 overflow-hidden">
                <img 
                  src="https://ik.imagekit.io/kamron/keyin.png" 
                  alt="Kursdan keyingi siz"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">KURSDAN KEYINGI SIZ:</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 hover:translate-x-2 transition-transform">
                <span className="text-purple-100 flex-shrink-0 text-lg">●</span>
                <span>Istalgan duolaringiz tez va oson ijobat bo'ladi</span>
              </li>
              <li className="flex items-start gap-2 hover:translate-x-2 transition-transform">
                <span className="text-purple-100 flex-shrink-0 text-lg">●</span>
                <span>Har qanday ishni bosimsiz, dangasaliksiz qilasiz va ohirigacha yetkazasiz</span>
              </li>
              <li className="flex items-start gap-2 hover:translate-x-2 transition-transform">
                <span className="text-purple-100 flex-shrink-0 text-lg">●</span>
                <span>Siz xohlagan munosabat va puldagi natijalar davomiy bo'ladi</span>
              </li>
              <li className="flex items-start gap-2 hover:translate-x-2 transition-transform">
                <span className="text-purple-100 flex-shrink-0 text-lg">●</span>
                <span>Yomon hayollarsiz, huzur halovatda hotirjam yashaysiz</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-2">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-b from-[#8b5cf6] via-[#7c3aed] to-[#6d28d9] hover:from-[#7c3aed] hover:via-[#6d28d9] hover:to-[#5b21b6] text-white font-black py-6 px-20 rounded-full text-xl md:text-2xl shadow-[0_10px_0_0_#4c1d95,0_15px_30px_rgba(139,92,246,0.5)] hover:shadow-[0_8px_0_0_#4c1d95,0_12px_30px_rgba(139,92,246,0.6)] active:shadow-[0_3px_0_0_#4c1d95] active:translate-y-2 transform transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
            >
              Kursga qatnashish
            </button>
          </div>
      </div>
       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
    
  );
};

export default BeforeAfterSection;