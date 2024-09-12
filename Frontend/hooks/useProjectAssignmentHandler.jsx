import { useState } from 'react';

export const useProjectAssignmentHandler = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const assignProject = async (idficha, selectedAprendices, idproyecto) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:4000/api/admin/asignar-proyectos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idficha, selectedAprendices, idproyecto }),  // Enviar array de aprendices
            });

            if (!response.ok) {
                throw new Error('Error en la asignación del proyecto');
            }

            const data = await response.json();
            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            setError(error.message);
            throw error;  // Lanza el error para manejarlo en el componente
        }
    };

    return {
        assignProject,
        loading,
        error,
    };
};
