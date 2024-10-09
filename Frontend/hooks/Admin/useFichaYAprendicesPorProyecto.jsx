import { useState, useEffect } from 'react';

const useFichaYAprendicesPorProyecto = (idproyecto) => {
  const [ficha, setFicha] = useState(null);
  const [aprendices, setAprendices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFichaYAprendices = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://banco-de-proyectos-pac.onrender.com/api/admin/proyectos/${idproyecto}/ficha-aprendices`);
        const data = await response.json();

        if (response.ok) {
          setFicha(data.ficha);
          setAprendices(data.aprendices);
        } else {
          throw new Error(data.message || 'Error al obtener los datos');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFichaYAprendices();
  }, [idproyecto]);

  return { ficha, aprendices, loading, error };
};

export default useFichaYAprendicesPorProyecto;