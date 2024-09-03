import React from 'react';
import RadioButton2 from './RadioButton2'; // Asegúrate de que el nombre de importación coincida con el archivo correcto

const Grid = ({ Text1, id1, id2, name }) => {
  return (
    <div className="w-full bg-white">
      <div className="grid rounded-lg">
        {/* Filas de la tabla */}
        <div className="grid grid-cols-12 items-center border-b py-4">
          {/* Columna Pregunta */}
          <div className="col-span-12 md:col-span-10 flex items-center pl-4">
            <span className="text-lg">{Text1}</span>
          </div>

          {/* Columna Sí */}
          <div className="col-span-6 md:col-span-1 flex justify-center items-center space-x-2">
            <RadioButton2 id={id1} name={name} value="" />
          </div>

          {/* Columna No */}
          <div className="col-span-6 md:col-span-1 flex justify-center items-center space-x-2">
            <RadioButton2 id={id2} name={name} value="" />
          </div>
        </div>
        {/* Añadir más filas aquí */}
      </div>
    </div>
  );
};

export default Grid;
