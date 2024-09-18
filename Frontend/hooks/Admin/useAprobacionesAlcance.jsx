import { useState, useEffect } from 'react';

const useAprobacionesAlcance = (idproyecto) => {
  const [aprobaciones, setAprobaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAprobaciones = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/save/aprobaciones-alcance/${idproyecto}`);
        if (!response.ok) {
          throw new Error('Error al obtener las aprobaciones');
        }
        const data = await response.json();
        setAprobaciones(data.aprobaciones);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAprobaciones();
  }, [idproyecto]);

  return { aprobaciones, loading, error };
};

export default useAprobacionesAlcance;