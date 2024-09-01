import React from 'react';
import BotonSegundo from './BotonSegundo'; // Ajusta la ruta si es necesario

const CardAreas = ({ Text, Text2, Text3, Text4, Text5 }) => {
  return (
    <div className="w-full h-auto bg-[#FBFCFF] rounded-xl border-2 border-[#FBFCFF] shadow-lg flex flex-col p-8 lg:m-8">
      <h2 className="text-lg lg:text-2xl font-josefin-slab mb-4 leading-tight p-4 font-bold">{Text}</h2>
      <h2 className="text-lg lg:text-2xl font-josefin-slab leading-tight pl-4">{Text2}</h2>
      <h2 className="text-lg lg:text-2xl font-josefin-slab leading-tight pl-4">{Text3}</h2>
      <h2 className="text-lg lg:text-2xl font-josefin-slab leading-tight pl-4">{Text4}</h2>
      <h2 className="text-lg lg:text-2xl font-josefin-slab leading-tight pl-4">{Text5}</h2>

      <div className="flex w-full mt-auto text-sm md:text-base justify-center xl:justify-end">
        <a href="/VistaObjetivos">
          <BotonSegundo Text="Seleccionar" />
        </a>
      </div>
    </div>
  );
};

export default CardAreas;
