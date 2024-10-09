import { useState } from 'react';

export const useSendEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendEmail = async (email, comentario) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://banco-de-proyectos-pac.onrender.com/api/admin/enviocorreo', { // Usa la ruta correcta para enviar el correo
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,        // El correo electrónico del destinatario
          comentario: comentario, // El comentario que se desea enviar
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el correo');
      }

      setLoading(false);
      return true;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      return false;
    }
  };

  return {
    sendEmail,
    loading,
    error,
  };
};