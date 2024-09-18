import { useState } from "react";
import { useNavigate } from "react-router-dom";

const usePostCalificacion = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const postCalificacion = async (idproyecto, promedioFinal, estado, comentario) => {
        setLoading(true);

        const calificacionData = {
            idproyecto,
            resultado: promedioFinal.toFixed(2),
            estado,
            comentario,
        };

        try {
            // Realiza la solicitud para actualizar la calificación en el proyecto
            const response = await fetch("http://localhost:4000/api/admin/proyectos/calificar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(calificacionData),
            });

            if (response.ok) {
                setLoading(false);
                navigate("/calificar");
            } else {
                console.error("Error al actualizar el proyecto");
                setLoading(false);
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            setLoading(false);
        }
    };

    return { postCalificacion, loading };
};

export default usePostCalificacion;