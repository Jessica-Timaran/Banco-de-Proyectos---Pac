// Components/Card.js
import React from 'react';
import BotonSegundo from './BotonSegundo';

const Card = ({ Text, onClick }) => {
  return (
    <div
      className="xl:w-72 xl:h-60 bg-[#FBFCFF] rounded-lg shadow-lg flex flex-col items-center justify-center p-8 m-8 border-2 border-[#FBFCFF] hover:border-[#A3E784] transition duration-300 cursor-pointer"
      onClick={onClick}
    >
      <h2 className="text-2xl font-josefin-slab mb-4 text-center leading-tight p-4">
        {Text}
      </h2>
      <div className="w-full md:w-auto text-sm md:text-base">
        <BotonSegundo Text="Seleccionar" />
      </div>
    </div>
  );
};

export default Card;
