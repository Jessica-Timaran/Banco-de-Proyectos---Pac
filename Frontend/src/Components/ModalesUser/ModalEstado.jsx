import React from 'react';
import { useNavigate } from 'react-router-dom';

const ModalEstado = ({ estado, isOpen }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/Usuario/VistaUsuario');
  };

  if (!isOpen) return null; // No renderizar el modal si isOpen es false

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h3 className="text-xl font-semibold mb-4">Estado del Proyecto</h3>
        <p className="mb-6">Su proyecto fue: <strong>{estado}</strong>.</p>
        <button
          onClick={handleClose}
          className="w-full bg-[#90cc74] text-white py-2 px-4 rounded hover:bg-lime-600"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalEstado;