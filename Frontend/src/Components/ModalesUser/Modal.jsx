import React from 'react';

const Modal = ({ isOpen, onClose, projectName, people }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-11/12 md:w-2/3 lg:w-1/2 max-w-2xl overflow-hidden">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-2xl font-semibold text-gray-800">{projectName}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition duration-150"
            aria-label="Cerrar"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Personas Asignadas</h3>
          <ul className="space-y-2">
            {people.map((person, index) => (
              <li key={index} className="flex items-center bg-gray-50 rounded-md p-3 ">
                <span className="h-8 w-8 rounded-full bg-[#A3E784] text-white flex items-center justify-center mr-3">
                  {person.nombre_persona.charAt(0).toUpperCase()}
                </span>
                <span className="text-gray-800">{person.nombre_persona}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Modal;