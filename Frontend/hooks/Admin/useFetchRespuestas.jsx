import { useState, useEffect } from "react";

const useFetchRespuestas = (idproyecto) => {
  const [respuestas, setRespuestas] = useState([]);
  const [selecciones, setSelecciones] = useState({});
  const [calificaciones, setCalificaciones] = useState({});

  useEffect(() => {
    const fetchRespuestas = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/admin/respuestas/${idproyecto}`);
        if (response.ok) {
          const data = await response.json();
          setRespuestas(data.respuestas);

          const seleccionesIniciales = data.respuestas.reduce((acc, respuesta) => {
            acc[respuesta.id] = respuesta.respuesta ? "Sí" : "No";
            return acc;
          }, {});
          setSelecciones(seleccionesIniciales);

          const calificacionesIniciales = data.respuestas.reduce((acc, respuesta) => {
            acc[respuesta.id] = respuesta.estado || null;
            return acc;
          }, {});
          setCalificaciones(calificacionesIniciales);
        } else {
          console.error("Error al obtener las respuestas:", response.statusText);
        }
      } catch (error) {
        console.error("Error de red al obtener las respuestas:", error);
      }
    };

    fetchRespuestas();
  }, [idproyecto]);

  return { respuestas, selecciones, setSelecciones, calificaciones, setCalificaciones };
};

export default useFetchRespuestas;