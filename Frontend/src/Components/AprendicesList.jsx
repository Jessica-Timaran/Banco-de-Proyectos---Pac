import React from 'react';
import BotonSegundo from './BotonSegundo';

const AprendicesList = ({ title, items, buttonText, buttonAction, buttonColor }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 transition-all duration-300 hover:shadow-lg">
      <h2 className="text-xl  mb-4 text-gray-700">{title}</h2>
      {items.length > 0 ? (
        <ul className="space-y-3">
          {items.map(item => (
            <li key={item.idpersona} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <span className="flex items-center">
                {/* Si tienes un avatar para cada aprendiz, puedes mostrarlo aquí. Si no, puedes eliminar este span */}
                {item.avatar && <span className="text-2xl mr-3">{item.avatar}</span>}
                <span>{item.nombre}</span>
              </span>
              <BotonSegundo
                Text={buttonText}
                onClick={() => buttonAction(item)} // Asegúrate de pasar la función correctamente
                additionalClasses={`h-9 px-4 text-sm ${buttonColor} text-white hover:bg-opacity-90 transition-colors rounded-md`}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center italic">No hay elementos disponibles.</p>
      )}
    </div>
  );
};

export default AprendicesList;