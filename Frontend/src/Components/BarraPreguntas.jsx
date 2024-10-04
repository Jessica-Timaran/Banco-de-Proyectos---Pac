import React from 'react';

const BarraPreguntas = ({ Text1, Text2, Text3, Text4 }) => {
  return (
    <div className="w-full bg-[#2eb694]">
      <div className="grid rounded-lg">
        {/* Filas de la barra en una sola línea */}
        <div className="grid grid-cols-12 items-center border-b py-4 px-4">
          
          {/* Columna Pregunta */}
          <div className="col-span-4 md:col-span-6 flex items-center pl-4">
            <span className="text-xl  font-bold text-white">{Text1}</span>
          </div>

          {/* Columnas de las Opciones (Sí, No, Calificar) */}
          <div className="col-span-4 md:col-span-4 flex justify-center items-center space-x-6">
            <span className="text-xl  font-bold text-white">{Text2}</span>
            <span className="text-xl  font-bold  text-white">{Text3}</span>
            </div>

            <div  className="col-span-4 md:col-span-2 flex justify-center items-center">
            <span className="text-xl  font-bold  text-white">{Text4}</span>
            </div>

           
          
        </div>
      </div>
    </div>
  );
};

export default BarraPreguntas;