import { useState, useEffect } from 'react';
import React from 'react';
import Loader from '../../../Components/Loader';

/**
 * Componente GridListTipoArea
 * Este componente muestra una lista de áreas y, al hacer clic en cada área,
 * despliega los tipos de área asociados a dicha área. Además, utiliza un
 * loader mientras los datos se están cargando.
 */
const GridListTipoArea = () => {
    // Estados del componente
    const [areas, setAreas] = useState([]);            // Almacena las áreas obtenidas de la API
    const [tipos, setTipos] = useState({});            // Almacena los tipos de área asociados a cada área
    const [loading, setLoading] = useState(true);      // Controla el estado de carga
    const [openAreas, setOpenAreas] = useState({});    // Controla qué áreas están abiertas para mostrar sus tipos

    /**
     * useEffect - Se ejecuta al montar el componente
     * Realiza la solicitud a la API para obtener las áreas.
     * Una vez que los datos son recibidos, se almacenan en el estado y se desactiva el loading.
     */
    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/areas');
                if (!response.ok) throw new Error(`Error al obtener las áreas: ${response.statusText}`);
                
                const data = await response.json();
                setAreas(data);  // Guardamos las áreas en el estado
            } catch (error) {
                console.error('Error al obtener las áreas:', error);
            } finally {
                setLoading(false); // Finaliza el estado de carga
            }
        };
        fetchAreas();  // Llamamos a la función para obtener las áreas
    }, []);

    /**
     * fetchTiposDeArea - Función asíncrona
     * Solicita a la API los tipos de área correspondientes a un área específica.
     * @param {number} idArea - El ID del área para la cual se quieren obtener los tipos.
     */
    const fetchTiposDeArea = async (idArea) => {
        try {
            const response = await fetch(`http://localhost:4000/api/tipos-de-area/${idArea}`);
            if (!response.ok) throw new Error(`Error al obtener los tipos de área: ${response.statusText}`);
            
            const data = await response.json();
            setTipos(prevTipos => ({ ...prevTipos, [idArea]: data })); // Actualiza los tipos de área para el área especificada
        } catch (error) {
            console.error('Error al obtener los tipos de área:', error);
        }
    };

    /**
     * handleToggleArea - Función para alternar la visibilidad de los tipos de área.
     * Si el área ya está abierta, se cierra; si está cerrada, se abre y carga los tipos si aún no están cargados.
     * @param {number} idArea - El ID del área que se desea abrir/cerrar.
     */
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
                <thead className="bg-[#A3E784]">
                    <tr>
                        <th className="px-6 py-3 text-left text-gray-900 w-full">Nombre de la Categoría</th>
                    </tr>
                </thead>
                
                {/* Si está en estado de carga, muestra el Loader */}
                {loading ? (
                    <tbody>
                        <tr>
                            <td colSpan="2" className="flex items-center justify-center h-screen">
                                <Loader />
                            </td>
                        </tr>
                    </tbody>
                ) : (
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
                )}
            </table>
        </div>
    );
};

export default GridListTipoArea;
