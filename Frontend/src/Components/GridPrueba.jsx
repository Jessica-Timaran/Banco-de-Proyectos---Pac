import React from 'react';
import Estado from './Estado';

const GridPrueba = ({ Text1, estado }) => {
  return (
    <div className="w-full bg-white">
      <div className="grid rounded-lg">
        {/* Filas de la tabla */}
        <div className="grid grid-cols-12 items-center border-b py-4 px-10">
          {/* Columna Proyecto */}
          <div className="col-span-12 md:col-span-10 flex items-center">
            <span className="text-lg">{Text1}</span>
          </div>

          {/* Columna Estado */}
          <div className="col-span-6 md:col-span-2 flex justify-center items-center space-x-2">
            <Estado estado={estado} />
          </div>
        </div>
        {/* Añadir más filas aquí */}
      </div>
    </div>
  );
};

export default GridPrueba;