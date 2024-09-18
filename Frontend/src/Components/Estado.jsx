import React from 'react';
import { useNavigate } from 'react-router-dom';

const Estado = ({ estado, idproyecto }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/Usuario/RegistroProyecto/${idproyecto}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <button
        className={`flex items-center justify-center px-3 py-1 text-sm font-medium rounded-full ${
          estado === 'Aceptado'
            ? 'bg-green-100 text-green-600'
            : estado === 'Rechazado'
            ? 'bg-red-100 text-red-600'
            : estado === 'Devuelto' || estado === 'En proceso'
            ? 'bg-orange-100 text-orange-600'
            : ''
        }`}
        style={{ minWidth: '120px' }} // Establece un ancho mínimo
      >
        <span
          className={`inline-block w-2.5 h-2.5 rounded-full mr-2 ${
            estado === 'Aceptado'
              ? 'bg-green-500'
              : estado === 'Rechazado'
              ? 'bg-red-500'
              : estado === 'Devuelto' || estado === 'En proceso'
              ? 'bg-orange-500'
              : ''
          }`}
        ></span>
        {estado}
      </button>

      {(estado === 'Devuelto' || estado === 'En proceso') && (
        <button
          className="flex items-center justify-center px-3 py-1 text-sm font-medium bg-blue-100 text-blue-600 rounded-full"
          style={{ minWidth: '120px' }} // Establece un ancho mínimo para mantener la consistencia
          onClick={handleEditClick}
        >
          <span className="inline-block w-2.5 h-2.5 bg-blue-500 rounded-full mr-2"></span>
          Editar
        </button>
      )}
    </div>
  );
};

export default Estado;
