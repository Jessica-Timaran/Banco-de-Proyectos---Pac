import { useState } from 'react';

const useAsignarProyecto = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const asignarProyecto = async (idproyecto, idpersonaArray) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
  
    try {
      const response = await fetch('https://banco-de-proyectos-pac.onrender.com/api/admin/asignar-proyectos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idproyecto, idpersona: idpersonaArray }), // Enviar un arreglo de ids
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la asignación del proyecto');
      }
  
      const data = await response.json();
      setSuccess(data);
      return data;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return { asignarProyecto, loading, error, success };
};

export default useAsignarProyecto;