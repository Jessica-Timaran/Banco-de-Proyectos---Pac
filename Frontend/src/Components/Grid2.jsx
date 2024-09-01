import React from 'react';
import EstadoAprobado from './EstadoAprobado'; // Asegúrate de que el nombre de importación coincida con el archivo correcto
import BotonEditar from './BotonEditar'; // Asegúrate de que el nombre de importación coincida con el archivo correcto

const Grid2 = ({ Text1, children }) => {
  return (
    <div className="w-full bg-white">
      <div className="grid gap-4">
        <div className="grid grid-cols-12 items-center border-b py-2 mt-15 h-14">
          <div className="col-span-10 flex items-center">
            <span className="text-base pl-12">{Text1}</span>
          </div>
          <div className="col-span-1 flex justify-center items-center mb-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grid2;
