import { Button, Dialog, DialogPanel, Title, Text } from '@tremor/react';
import React, { useState } from 'react';
import { useSendEmail } from '../../hooks/Admin/useSendEmail'; // Hook para enviar correo electrónico

export function ModalComent({ buttonColor = 'bg-[#A3E784]', text = 'Abrir comentario', onSubmit }) {
  const [isOpen, setIsOpen] = useState(false);
  const [comentario, setComentario] = useState('');
  const [email, setEmail] = useState(''); // Estado para el correo electrónico
  const { sendEmail, loading: sendingEmail, error } = useSendEmail(); // Usa el hook personalizado

  const handleOpenConfirm = async () => {
    // Guardar el comentario en la base de datos primero
    if (onSubmit) {
      onSubmit(comentario);  // Mantiene la lógica de guardado del comentario en la base de datos
    }

    // No bloquear el flujo por el envío del correo: Esto se hace de forma aparte y después
    try {
      await sendEmail(email, comentario); // Envía el correo, pero no interfiere en el flujo de guardado
      console.log('Correo enviado correctamente');
    } catch (err) {
      console.error('Error al enviar el correo:', err);
    }

    setIsOpen(false);
    setComentario(''); // Resetea el comentario
    setEmail('');      // Resetea el correo electrónico
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
            <Title>Añadir Comentario y Correo</Title>
          </div>

          <Text className="mb-4">Por favor, ingrese el correo electrónico y el comentario a continuación:</Text>

          {/* Input para el correo electrónico */}
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingrese el correo electrónico"
          />

          {/* Input para el comentario */}
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
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
              onClick={handleOpenConfirm}
              className="bg-[#A3E784] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
              disabled={sendingEmail} // Deshabilitar botón mientras se envía el correo
            >
              {sendingEmail ? 'Enviando...' : 'Enviar'}
            </Button>
          </div>

          {error && <p className="text-red-500 mt-2">Error al enviar el correo: {error}</p>}
        </DialogPanel>
      </Dialog>
    </>
  );
}
