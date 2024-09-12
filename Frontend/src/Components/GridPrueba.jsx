import React from 'react';
import Estado from './Estado';

const GridPrueba = ({ Text1, estado, idproyecto }) => {
  return (
    <div className="w-full bg-white">
      <div className="grid rounded-lg">
        <div className="grid grid-cols-12 items-center border-b py-4 px-10 ">
          <div className="col-span-12 md:col-span-10 flex items-center ">
            <span className="text-lg">{Text1}</span>
          </div>
          <div className="col-span-12 md:col-span-2 flex justify-center items-center space-x-2">
            <Estado estado={estado} idproyecto={idproyecto} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridPrueba;