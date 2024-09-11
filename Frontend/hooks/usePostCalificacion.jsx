// src/hooks/usePostCalificacion.js

import { useState } from "react";

export const usePostCalificacion = () => {
    const [loading, setLoading] = useState(false);

    const postCalificacion = async (idproyecto, promedioFinal, estado, comentario, detalles) => {
        setLoading(true);

        const calificacionData = {
            idproyecto,
            resultado: promedioFinal.toFixed(2),
            estado,
            comentario,
            detalles
        };

        try {
            const response = await fetch("http://localhost:4000/api/calificaciones", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(calificacionData),
            });

            setLoading(false);

            if (response.ok) {
                return true;
            } else {
                console.error("Error al guardar la calificación");
                return false;
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            setLoading(false);
            return false;
        }
    };

    return { postCalificacion, loading };
};