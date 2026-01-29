import React from 'react';

const MainHeading: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
        3 OYDA <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-500 text-transparent bg-clip-text">ISTALGAN ORZUYINGIZGA</span>
      </h2>
      <h3 className="text-2xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-pink-300 via-purple-300 to-pink-400 text-transparent bg-clip-text">
        "NIYATLAR ILMI" BILAN ERISHING
      </h3>
    </div>
  );
};

export default MainHeading;