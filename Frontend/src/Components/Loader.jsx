import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-[#A3E784] animate-bounce" style={{ animationDelay: '.7s' }}></div>
        <div className="w-4 h-4 rounded-full bg-[#A3E784] animate-bounce" style={{ animationDelay: '.3s' }}></div>
        <div className="w-4 h-4 rounded-full bg-[#A3E784] animate-bounce" style={{ animationDelay: '.7s' }}></div>
      </div>
    </div>
  );
};

export default Loader;
