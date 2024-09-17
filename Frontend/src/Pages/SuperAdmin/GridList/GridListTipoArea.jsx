import React from 'react';
import { useState, useEffect } from 'react';
import Loader from '../../../Components/Loader';

const GridListTipoArea = () => {
    const [areas, setAreas] = useState([]);
    const [tipos, setTipos] = useState({});
    const [items, setItems] = useState({});
    const [loading, setLoading] = useState(true);
    const [openAreas, setOpenAreas] = useState({});
    const [openTipos, setOpenTipos] = useState({});

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/superAdmin/areas');
                if (!response.ok) {
                    throw new Error(`Error fetching areas: ${response.statusText}`);
                }
                const data = await response.json();
                setAreas(data);
            } catch (error) {
                console.error('Error fetching areas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAreas();
    }, []);

    const fetchTiposDeArea = async (idArea) => {
        try {
            const response = await fetch(`http://localhost:4000/api/superAdmin/tipos-de-area/${idArea}`);
            if (!response.ok) {
                throw new Error(`Error fetching tipos de area: ${response.statusText}`);
            }
            const data = await response.json();
            setTipos((prevTipos) => ({
                ...prevTipos,
                [idArea]: data
            }));
        } catch (error) {
            console.error('Error fetching tipos de area:', error);
        }
    };

    const fetchItems = async (idArea, idTipoDeArea) => {
        try {
            const response = await fetch(`http://localhost:4000/api/items/${idArea}/${idTipoDeArea}`);
            if (!response.ok) {
                throw new Error(`Error fetching items: ${response.statusText}`);
            }
            const data = await response.json();
            setItems((prevItems) => ({
                ...prevItems,
                [`${idArea}-${idTipoDeArea}`]: data
            }));
        } catch (error) {
            console.error('Error fetching items:', error);
            setItems((prevItems) => ({
                ...prevItems,
                [`${idArea}-${idTipoDeArea}`]: []
            }));
        }
    };

    const handleToggleArea = (idArea) => {
        setOpenAreas((prevOpenAreas) => {
            const isCurrentlyOpen = prevOpenAreas[idArea];
            return { ...prevOpenAreas, [idArea]: !isCurrentlyOpen };
        });

        if (!tipos[idArea]) {
            fetchTiposDeArea(idArea);
        }
    };

    const handleToggleTipo = (idArea, idTipoDeArea) => {
        setOpenTipos((prevOpenTipos) => {
            const key = `${idArea}-${idTipoDeArea}`;
            const isCurrentlyOpen = prevOpenTipos[key];
            return { ...prevOpenTipos, [key]: !isCurrentlyOpen };
        });

        if (!items[`${idArea}-${idTipoDeArea}`]) {
            fetchItems(idArea, idTipoDeArea);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#A3E784]">
                    <tr>
                        <th className="px-6 py-3 text-left text-gray-900 w-full">Nombre de la Categoría</th>
                    </tr>
                </thead>
                {loading ? (
                    <tbody>
                        <tr>
                            <td colSpan="2" className="flex items-center justify-center h-screen">
                                <div className="flex flex-col items-center justify-center h-full">
                                    <Loader />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                ) : (
                    <tbody className="min-w-full bg-white divide-y divide-gray-200">
                        {areas.map((area) => (
                            <React.Fragment key={area.idarea}>
                                <tr className="bg-gray-50">
                                    <td
                                        className="px-6 py-4 whitespace-nowrap flex items-center w-full cursor-pointer"
                                        onClick={() => handleToggleArea(area.idarea)}
                                    >
                                        {openAreas[area.idarea] ? (
                                            <i className="fas fa-chevron-up w-5 h-5 mr-2" />
                                        ) : (
                                            <i className="fas fa-chevron-down w-5 h-5 mr-2" />
                                        )}
                                        <span className="font-bold text-gray-900">{area.area}</span>
                                    </td>
                                </tr>
                                {openAreas[area.idarea] && tipos[area.idarea] && tipos[area.idarea].map((tipo) => (
                                    <React.Fragment key={tipo.idtipoarea}>
                                        <tr>
                                            <td 
                                                className="px-6 py-4 whitespace-nowrap pl-8 w-full cursor-pointer" 
                                                onClick={() => handleToggleTipo(area.idarea, tipo.idtipoarea)}
                                            >
                                                {openTipos[`${area.idarea}-${tipo.idtipoarea}`] ? (
                                                    <i className="fas fa-chevron-up w-5 h-5 mr-2" />
                                                ) : (
                                                    <i className="fas fa-chevron-down w-5 h-5 mr-2" />
                                                )}
                                                <span className="font-medium text-gray-900">{tipo.tiposdearea}</span>
                                            </td>
                                        </tr>
                                        {openTipos[`${area.idarea}-${tipo.idtipoarea}`] && 
                                         items[`${area.idarea}-${tipo.idtipoarea}`] && 
                                         items[`${area.idarea}-${tipo.idtipoarea}`].map((item) => (
                                            <tr key={item.iditemsarea}>
                                                <td className="px-6 py-4 whitespace-nowrap pl-16 w-full">
                                                    <span className="text-gray-900">{item.items}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
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