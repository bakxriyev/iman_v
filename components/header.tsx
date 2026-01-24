import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-start mb-0">
      <div>
        <img className='w-28 h-28 -mt-8' src="/logo.png" alt="logo" />
      </div>
      <div className="text-right text-xs md:text-sm">
        <p>Yillab olgan bilimlarimni</p>
        <p>pastagi videoda</p>
        <p>bo'lishaman</p>
      </div>
    </div>
  );
};

export default Header;