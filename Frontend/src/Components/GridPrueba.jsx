import React from 'react';
import Estado from './Estado';

const GridPrueba = ({ Text1, estado, idproyecto, responsable }) => {
  return (
    <div className="w-full bg-white">
      <div className="rounded-lg">
        <div className="grid grid-cols-12 items-center border-b p-4">
          <div className="col-span-6 md:col-span-6 flex items-center">
            <span className="text-sm sm:text-base pl-0 sm:pl-4">{Text1}</span>
          </div>
          <div className="col-span-3 md:col-span-3 items-center justify-start sm:flex hidden">
            <span className="text-sm sm:text-base">{responsable}</span>
          </div>
          <div className="col-span-6 md:col-span-3 flex justify-end items-center">
            <Estado estado={estado} idproyecto={idproyecto} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridPrueba;