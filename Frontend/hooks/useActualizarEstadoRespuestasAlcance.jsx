import { useState } from 'react';

const useActualizarEstadoRespuestasAlcance = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const actualizarEstadoRespuestasAlcance = async (detallesAlcance) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:4000/api/save/actualizar-estado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ detallesAlcance }),
            });

            if (!response.ok) {
                throw new Error('Error actualizando el estado');
            }

            const data = await response.json();
            setLoading(false);
            return data;
        } catch (error) {
            setError(error.message);
            setLoading(false);
            throw error; // Asegúrate de lanzar el error para que se maneje correctamente en la llamada
        }
    };

    const actualizarPuntosAlcance = async (idproyecto, puntos) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:4000/api/admin/proyecto/${idproyecto}/actualizarPuntosAlcance`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ puntosalcance: puntos }),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar los puntos de alcance');
            }

            const data = await response.json();
            setLoading(false);
            return data;
        } catch (error) {
            setError(error.message);
            setLoading(false);
            throw error; // Asegúrate de lanzar el error para que se maneje correctamente en la llamada
        }
    };

    return { actualizarEstadoRespuestasAlcance, actualizarPuntosAlcance, loading, error };
};

export default useActualizarEstadoRespuestasAlcance;