import React from 'react';

export const ModalR = ({ isOpen, closeDialog, onOkClick }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg sm:max-w-lg p-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold">Registro completado exitosamente</h2>
              <p className="mt-1 text-sm leading-6">
                El proyecto se ha registrado correctamente.
              </p>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                className="bg-gray-300 text-white py-2 px-4 rounded"
                onClick={closeDialog}
              >
                Volver
              </button>
              <button
                className="bg-verde text-white py-2 px-4 rounded"
                onClick={onOkClick}
              >
                Ok, entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};