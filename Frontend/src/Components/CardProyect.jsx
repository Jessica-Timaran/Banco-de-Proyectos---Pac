import React from 'react';

const CardProyect = ({ Text, id, children }) => {
  return (
    <div className="xl:w-72 xl:h-60 bg-Color_carta rounded-lg shadow-lg flex flex-col items-center justify-center p-8 m-8">
      <h2 className="text-2xl font-josefin-slab mb-4 text-center leading-tight p-4">
        {Text} {id}
      </h2>
      <button className="group cursor-pointer outline-none hover:rotate-90 duration-300">
        {/* Aquí puedes agregar contenido adicional para el botón si es necesario */}
      </button>
      {children}
    </div>
  );
};

export default CardProyect;