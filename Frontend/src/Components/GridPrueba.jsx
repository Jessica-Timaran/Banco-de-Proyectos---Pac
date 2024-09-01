import React from 'react';
import AceptarTerminos from './AceptarTerminos'; // Asegúrate de que el nombre de importación coincida con el archivo correcto
import RadioButton2 from './RadioButton2'; // Asegúrate de que el nombre de importación coincida con el archivo correcto
import Estado from './Estado'; // Asegúrate de que el nombre de importación coincida con el archivo correcto

const GridPrueba = ({ Text1, id1, id2, name, categoria }) => {
  return (
    <div className="w-full bg-white">
      <div className="grid rounded-lg">
        {/* Filas de la tabla */}
        <div className="grid grid-cols-12 items-center border-b py-4">
          {/* Columna Pregunta */}
          <div className="col-span-12 md:col-span-10 flex items-center px-6">
            <span className="text-lg">{Text1}</span>
          </div>

          {/* Columna Estado */}
          <div className="col-span-6 md:col-span-1 flex justify-center items-center space-x-2">
            <Estado />
          </div>
        </div>
        {/* Añadir más filas aquí */}
      </div>
    </div>
  );
};

export default GridPrueba;
