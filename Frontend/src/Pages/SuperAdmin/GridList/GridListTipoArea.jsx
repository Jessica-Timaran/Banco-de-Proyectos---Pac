import { useState, useEffect } from 'react';
import React from 'react';



const GridListTipoArea = () => {
    // Estados del componente
    const [areas, setAreas] = useState([])
    const [tipos, setTipos] = useState({});
    const [loading, setLoading] = useState(true);
    const [openAreas, setOpenAreas] = useState({});

   
    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const response = await fetch('https://banco-de-proyectos-pac.onrender.com/api/superAdmin/areas');
                if (!response.ok) throw new Error(`Error al obtener las áreas: ${response.statusText}`);
                
                const data = await response.json();
                setAreas(data);
            } catch (error) {
                console.error('Error al obtener las áreas:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAreas();
    }, []);

   
    const fetchTiposDeArea = async (idArea) => {
        try {
            const response = await fetch(`https://banco-de-proyectos-pac.onrender.com/api/superAdmin/tipos-de-area/${idArea}`);
            if (!response.ok) throw new Error(`Error al obtener los tipos de área: ${response.statusText}`);
            
            const data = await response.json();
            setTipos(prevTipos => ({ ...prevTipos, [idArea]: data })); // Actualiza los tipos de área para el área especificada
        } catch (error) {
            console.error('Error al obtener los tipos de área:', error);
        }
    };

    
    const handleToggleArea = (idArea) => {
        setOpenAreas(prevOpenAreas => {
            const isCurrentlyOpen = prevOpenAreas[idArea];
            return { ...prevOpenAreas, [idArea]: !isCurrentlyOpen }; // Alterna el estado abierto/cerrado
        });

        // Si aún no se han cargado los tipos de esa área, los solicita
        if (!tipos[idArea]) fetchTiposDeArea(idArea);
    };

    return (
        <div className="w-full max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            {/* Tabla principal */}
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#2eb694]">
                    <tr>
                        <th className="px-6 py-3 text-left text-white w-full">Nombre de la Categoría</th>
                    </tr>
                </thead>
                    <tbody className="min-w-full bg-white divide-y divide-gray-200">
                        {/* Mapeo de las áreas obtenidas */}
                        {areas.map(area => (
                            <React.Fragment key={area.idarea}>
                                {/* Fila principal de cada área */}
                                <tr className="bg-gray-50">
                                    <td
                                        className="px-6 py-4 whitespace-nowrap flex items-center w-full cursor-pointer"
                                        onClick={() => handleToggleArea(area.idarea)}  // Alterna la visibilidad de los tipos de área
                                    >
                                        {/* Icono de abrir/cerrar */}
                                        {openAreas[area.idarea] ? (
                                            <i className="fas fa-chevron-up w-5 h-5 mr-2" />
                                        ) : (
                                            <i className="fas fa-chevron-down w-5 h-5 mr-2" />
                                        )}
                                        <span className="font-bold text-gray-900">{area.area}</span>
                                    </td>
                                </tr>
                                {/* Tipos de área asociados, si el área está abierta */}
                                {openAreas[area.idarea] && tipos[area.idarea] && tipos[area.idarea].map(tipo => (
                                    <tr key={tipo.idtipoarea}>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap pl-8 w-full cursor-pointer"
                                            onClick={() => handleToggleArea(tipo.idtipoarea)}  // Esto parece innecesario, pero puede personalizarse
                                        >
                                            <span className="font-medium text-gray-900">{tipo.tiposdearea}</span>
                                        </td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
            </table>
        </div>
    );
};

export default GridListTipoArea;
