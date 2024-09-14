import React from 'react';
import BotonSegundo from './BotonSegundo';

const Card = ({ Text, onClick, className = '', isBold = false }) => {
  return (
    <div
      className={`w-full sm:w-80 md:w-96 lg:w-72 h-72 bg-[#FBFCFF] rounded-lg border-2 border-[#FBFCFF] shadow-lg flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 m-4 sm:m-6 lg:m-8 hover:border-[#A3E784] transition duration-300 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <h2 className={`text-2xl font-josefin-slab mb-4 text-center leading-tight p-4 ${isBold ? 'font-bold' : ''}`}>
        {Text}
      </h2>
      <div className="w-full md:w-auto text-sm md:text-base ">
        <BotonSegundo Text="Seleccionar" />
      </div>
    </div>
  );
};

export default Card;