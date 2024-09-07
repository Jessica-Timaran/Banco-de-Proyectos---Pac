import React from 'react';

const Estado = () => {
  return (
    <div className="flex space-x-4 ">
      {/* Botón Active */}
      <button className="flex items-center px-3 py-1 bg-green-100 text-green-600 rounded-full">
        <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full "></span>
        Aceptado
      </button>

      {/* Botón Devolver */}
      <button className="flex items-center px-3 py-1 bg-red-100 text-red-600 rounded-full">
        <span className="inline-block w-2.5 h-2.5 bg-red-500 rounded-full "></span>
        Devuelto
      </button>

      {/* Botón Editar */}
      <button className="flex items-center px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
        <span className="inline-block w-2.5 h-2.5 bg-blue-500 rounded-full "></span>
        Editar
      </button>
    </div>
  );
};

export default Estado;
