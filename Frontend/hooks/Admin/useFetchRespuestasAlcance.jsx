import { useEffect, useState } from 'react';

const useFetchRespuestasAlcance = (idproyecto) => {
  const [respuestasAlcance, setRespuestasAlcance] = useState([]);
  const [selecciones, setSelecciones] = useState({});
  const [calificaciones, setCalificaciones] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRespuestasAlcance = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/admin/respuestasalcance/${idproyecto}`);
        if (response.ok) {
          const data = await response.json();
          setRespuestasAlcance(data.respuestasAlcance);

          const seleccionesIniciales = data.respuestasAlcance.reduce((acc, respuesta) => {
            acc[respuesta.idalcance] = respuesta.respuesta ? "Sí" : "No";
            return acc;
          }, {});
          setSelecciones(seleccionesIniciales);

          const calificacionesIniciales = data.respuestasAlcance.reduce((acc, respuesta) => {
            acc[respuesta.idalcance] = respuesta.estado || null; // Usa null si no hay estado
            return acc;
          }, {});
          setCalificaciones(calificacionesIniciales);
        } else {
          console.error("Error al obtener las respuestas de alcance:", response.statusText);
        }
      } catch (error) {
        console.error("Error de red al obtener las respuestas de alcance:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRespuestasAlcance();
  }, [idproyecto]);

  return { respuestasAlcance, selecciones, calificaciones, isLoading, setSelecciones, setCalificaciones };
};

export default useFetchRespuestasAlcance;