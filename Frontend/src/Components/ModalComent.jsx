import { Button, Dialog, DialogPanel, Title, Text } from '@tremor/react';
import React, { useState } from 'react';

export function ModalComent({ buttonColor = 'bg-blue-500', text = 'Abrir comentario', onSubmit }) {
  const [isOpen, setIsOpen] = useState(false);
  const [comentario, setComentario] = useState('');

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(comentario);
    }
    setIsOpen(false);
    setComentario('');
  };

  return (
    <>
      <Button
        className={`${buttonColor} text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300`}
        onClick={() => setIsOpen(true)}
      >
        {text}
      </Button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} static={true}>
        <DialogPanel className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <Title>Añadir Comentario</Title>
            <Button
              variant="light"
              icon={() => (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            />
          </div>

          <Text className="mb-4">Por favor, ingrese su comentario a continuación:</Text>

          <textarea
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            rows="4"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Escriba su comentario aquí..."
          />

          <div className="flex justify-end space-x-2">
            <Button
              variant="secondary"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Enviar
            </Button>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
}