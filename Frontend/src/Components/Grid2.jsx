import React from 'react';
import RadioButton2 from '../Components/RadioButton2';

const Grid = ({ Text1, id1, id2, name, categoria, seleccionado, onChange, nuevaColumnaContenido }) => {
  return (
    <div className="w-full bg-white">
      <div className="grid rounded-lg">
        {/* Filas de la tabla */}
        <div className="grid grid-cols-12 items-center border-b py-4">
          {/* Columna Pregunta */}
          <div className="col-span-12 md:col-span-8 flex items-center pl-4">
            <span className="text-lg">{Text1}</span>
          </div>

          {/* Columna Sí */}
          <div className="col-span-6 md:col-span-2 flex justify-center items-center space-x-2">
            <RadioButton2
              Text="Sí"
              id={id1}
              name={name}
              checked={seleccionado === "Sí"}
              onChange={onChange}
            />
          </div>

          {/* Columna No */}
          <div className="col-span-6 md:col-span-2 flex justify-center items-center space-x-2">
            <RadioButton2
              Text="No"
              id={id2}
              name={name}
              checked={seleccionado === "No"}
              onChange={onChange}
            />
          </div>

          {/* Columna Nueva */}
          <div className="col-span-12 md:col-span-12 flex justify-center items-center">
            {nuevaColumnaContenido}
          </div>
        </div>
        {/* Añadir más filas aquí si es necesario */}
      </div>
    </div>
  );
};

export default Grid;