import React from 'react';
import RadioButton2 from '../Components/RadioButton2';
import { Evaluar } from '../Components/Evaluar';

const Grid2 = ({ Text1, id1, id2, name, seleccionado, onChange, handleEvaluarChange, id, calificacion }) => {
  return (
    <div className="w-full bg-white">
      <div className="rounded-lg">
        {/* Fila de la tabla */}
        <div className="grid grid-cols-1 sm:grid-cols-12 items-center border-b py-2 sm:py-4 px-2 sm:px-4 gap-y-2 sm:gap-y-0">
          {/* Columna Pregunta */}
          <div className="col-span-1 sm:col-span-4 md:col-span-6 flex items-center sm:pl-4">
            <span className="text-base sm:text-lg">{Text1}</span>
          </div>

          {/* Columna Sí y No RadioButtons */}
          <div className="col-span-1 sm:col-span-4 flex justify-center items-center space-x-6">
            <RadioButton2
              Text="Sí"
              id={id1}
              name={name}
              checked={seleccionado === "Sí"}
              onChange={onChange}
            />
            <RadioButton2
              Text="No"
              id={id2}
              name={name}
              checked={seleccionado === "No"}
              onChange={onChange}
            />
          </div>

          {/* Columna Evaluar */}
          <div className="col-span-1 sm:col-span-4 md:col-span-2 flex justify-center items-center mt-2 sm:mt-0">
            <Evaluar
              onChange={(value) => handleEvaluarChange(id, value)}
              initialValue={calificacion === "Aprobado" ? "1" : calificacion === "No aceptado" ? "2" : null} // Pasamos el valor inicial
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grid2;