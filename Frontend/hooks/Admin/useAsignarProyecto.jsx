import { useState } from 'react';

export const useAsignarProyecto = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const asignarProyecto = async (idproyecto, idpersona) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:4000/api/admin/asignar-proyectos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idproyecto, idpersona }),
      });

      if (!response.ok) {
        throw new Error('Error al asignar proyecto');
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      console.error(err);
    }
  };

  return {
    asignarProyecto,
    loading,
    error,
  };
};