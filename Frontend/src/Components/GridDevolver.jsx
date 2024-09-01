import React from 'react';
import BotonEditar from './BotonEditar'; // Asegúrate de que el nombre de importación coincida con el archivo correcto
import EstadoDevuelto from './EstadoDevuelto'; // Asegúrate de que el nombre de importación coincida con el archivo correcto

const GridDevolver = ({ Text1 }) => {
  return (
    <div className="w-full bg-white">
      <div className="grid gap-4">
        <div className="grid grid-cols-12 items-center border-b py-2 mt-15 h-auto">
          <div className="col-span-10 flex items-center">
            <span className="text-lg pl-12">{Text1}</span>
          </div>
          <div className="col-span-1 flex justify-center items-center mb-2">
            <EstadoDevuelto />
          </div>
          <div className="col-span-1 flex justify-center items-center mb-2">
            <a href="/EditarProyecto">
              <BotonEditar />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridDevolver;
