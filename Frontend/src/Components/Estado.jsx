import React from 'react';

const Estado = () => {
  return (
    <div className="flex space-x-4">
      {/* Botón Active */}
      <button className="flex items-center px-3 py-1 bg-green-100 text-green-600 rounded-full">
        <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></span>
        Active
      </button>

      {/* Botón Devolver */}
      <button className="flex items-center px-3 py-1 bg-red-100 text-red-600 rounded-full">
        <span className="inline-block w-2.5 h-2.5 bg-red-500 rounded-full mr-2"></span>
        Devuelto
      </button>
    </div>
  );
};

export default Estado;
