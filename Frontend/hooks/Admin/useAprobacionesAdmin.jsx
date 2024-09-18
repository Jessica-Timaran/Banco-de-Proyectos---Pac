import { useState, useEffect } from 'react';

const useAprobacionesAdmin = (idproyecto) => {
  const [aprobaciones, setAprobaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAprobaciones = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:4000/api/save/aprobaciones/${idproyecto}`);
        if (!response.ok) {
          throw new Error('Error al obtener las aprobaciones del administrador');
        }
        
        const data = await response.json();
        console.log(data);
        setAprobaciones(data.aprobaciones); // Asegúrate de que tu API devuelva un array llamado `aprobaciones`
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAprobaciones();
  }, [idproyecto]);

  return { aprobaciones, loading, error };
};

export default useAprobacionesAdmin;