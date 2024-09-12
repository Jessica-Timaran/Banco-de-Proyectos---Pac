import React from 'react';
import { useNavigate } from 'react-router-dom';

const Estado = ({ estado, idproyecto }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/Usuario/RegistroProyecto/${idproyecto}`);
  };

  return (
    <div className="flex space-x-4">
      {estado === 'Aceptado' && (
        <button className="flex items-center px-3 py-1 bg-green-100 text-green-600 rounded-full">
          <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full"></span>
          Aceptado
        </button>
      )}
      
      {estado === 'Rechazado' && (
        <button className="flex items-center px-3 py-1 bg-red-100 text-red-600 rounded-full">
          <span className="inline-block w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          Rechazado
        </button>
      )}
      
      {estado === 'Devuelto' && (
        <>
          <button className="flex items-center px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full">
            <span className="inline-block w-2.5 h-2.5 bg-yellow-500 rounded-full"></span>
            Devuelto
          </button>
          <button
            className="flex items-center px-3 py-1 bg-blue-100 text-blue-600 rounded-full"
            onClick={handleEditClick}
          >
            <span className="inline-block w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
            Editar
          </button>
        </>
      )}
    </div>
  );
};

export default Estado;