import React from "react";
import Image from "next/image";

const HeroVideoPlayer: React.FC = () => {
  return (
    <div className="w-full max-w-7xl -mt-12 mx-auto px-4">
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <div className="relative aspect-[3/4]"> {/* Aspect-video (16:9) ni aspect-[3/4] (portret) ga o'zgartirdim, chunki rasm vertikal */}
          {/* Rasm + gradient overlay */}
          <Image
            src="/imana.png"
            alt="Hero Rasm"
            fill
            className="object-cover object-center" // object-center saqlangan, rasm markazda
            priority // Yuklanishni tezlashtirish uchun
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px" // Hajm optimizatsiyasi
          />
      
          
        </div>
      </div>
    </div>
  );
};

export default HeroVideoPlayer;