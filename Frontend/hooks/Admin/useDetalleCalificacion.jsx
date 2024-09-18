import { useState, useEffect } from 'react';
// guarda el estado de la asignacion, aprobado o no aceptado
const useDetalleCalificacion = (idproyecto) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [puntosObjetivos, setPuntosObjetivos] = useState(null);

  const guardarDetalleCalificacion = async (detalles) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/save/actualizarEstadoRespuestas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(detalles),
      });

      if (!response.ok) {
        throw new Error('Error al guardar los detalles de calificación');
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      throw error;
    }
  };

  // actualizar el campo de la tabla proyecto "puntaje"
  const actualizarPuntosObjetivos = async (puntos) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/admin/proyecto/${idproyecto}/actualizarPuntosObjetivos`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ puntosobjetivos: puntos }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar los puntos objetivos');
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      throw error;
    }
  };

  // obtiene el promedio final
  const obtenerPuntosObjetivos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/admin/proyecto/${idproyecto}/puntosObjetivos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener los puntos objetivos');
      }

      const data = await response.json();
      setPuntosObjetivos(data.puntosobjetivos !== null ? Number(data.puntosobjetivos) : 0); // Asegúrate de que siempre sea un número
      setLoading(false);
      return data;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    if (idproyecto) {
      obtenerPuntosObjetivos();
    }
  }, [idproyecto]);

  return { 
    guardarDetalleCalificacion, 
    actualizarPuntosObjetivos, 
    obtenerPuntosObjetivos, 
    puntosObjetivos, 
    loading, 
    error 
  };
};

export default useDetalleCalificacion;