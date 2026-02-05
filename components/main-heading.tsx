import React from 'react';

const MainHeading: React.FC = () => {
  return (
    <div className="text-center mb-6 md:mb-8"> {/* mb-8 ni mb-6/md:mb-8 ga o'zgartirdim, rasm bilan bo'sh joyni kamaytirish uchun */}
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
        UYG`ONISH KURSIGA
      </h2>
      <h3 className="text-2xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-pink-300 via-purple-300 to-pink-400 text-transparent bg-clip-text">
       RO`YXATDAN O`TISH
      </h3>
    </div>
  );
};

export default MainHeading;