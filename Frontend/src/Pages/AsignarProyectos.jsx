import { useState, useEffect } from 'react';
import LayoutPrincipal2 from '../../layouts/LayoutPrincipal2';
import Layoutcontenido2 from '../../Layouts/Layoutcontenido2';
import AprendicesList from '../../Components/AprendicesList';
import Loader from '../../Components/Loader';
import BotonSegundo from '../../Components/BotonSegundo';
import FichaSelector from '../../Components/FichaSelector';

const AsignarProyectos = () => {
    const [fichas, setFichas] = useState([]);
    const [selectedNombreFicha, setSelectedNombreFicha] = useState('');
    const [selectedNumeroFicha, setSelectedNumeroFicha] = useState('');
    const [aprendices, setAprendices] = useState([]);
    const [assignedAprendices, setAssignedAprendices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Obtener las fichas al montar el componente
        const fetchFichas = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/fichas');
                const data = await response.json();
                setFichas(data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener las fichas:', error);
                setLoading(false);
            }
        };

        fetchFichas();
    }, []);

    const handleNombreFichaChange = async (event) => {
        const fichaId = event.target.value;
        setSelectedNombreFicha(fichaId);
        setAssignedAprendices([]);
        
        // Obtener los aprendices asociados a la ficha seleccionada
        try {
            const response = await fetch(`http://localhost:4000/api/aprendices/${fichaId}`);
            const data = await response.json();
            setAprendices(data);
        } catch (error) {
            console.error('Error al obtener los aprendices:', error);
        }
    };

    const handleNumeroFichaChange = async (event) => {
        const fichaId = event.target.value;
        setSelectedNumeroFicha(fichaId);
        setAssignedAprendices([]);

        // Obtener los aprendices asociados a la ficha seleccionada
        try {
            const response = await fetch(`http://localhost:4000/api/aprendices/${fichaId}`);
            const data = await response.json();
            setAprendices(data);
        } catch (error) {
            console.error('Error al obtener los aprendices:', error);
        }
    };

    const handleAssignAprendiz = (aprendiz) => {
        if (!assignedAprendices.find(a => a.id === aprendiz.id)) {
            setAssignedAprendices([...assignedAprendices, aprendiz]);
        }
    };

    const handleRemoveAprendiz = (aprendiz) => {
        setAssignedAprendices(assignedAprendices.filter(a => a.id !== aprendiz.id));
    };

    const handleConfirm = () => {
        console.log("Proyecto asignado a:", assignedAprendices);
    };

    return (
        <LayoutPrincipal2 title="">
            {loading ? (
                <div className="loading-container">
                    <Loader />
                </div>
            ) : (
                <div className="content-container">
                    <Layoutcontenido2 title="" text1="Asignación de Proyectos">
                        <div className="w-full mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Selección de Ficha por Nombre */}
                                <FichaSelector
                                    fichas={fichas}
                                    selectedFicha={selectedNombreFicha}
                                    onChange={handleNombreFichaChange}
                                    displayField="nombre"
                                />

                                {/* Selección de Ficha por Número */}
                                <FichaSelector
                                    fichas={fichas}
                                    selectedFicha={selectedNumeroFicha}
                                    onChange={handleNumeroFichaChange}
                                    displayField="numeroficha"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Aprendices Disponibles */}
                                <AprendicesList
                                    title="Aprendices Disponibles"
                                    items={aprendices}
                                    buttonText="Asignar"
                                    buttonAction={handleAssignAprendiz}
                                    buttonColor="bg-[#A3E784]"
                                />

                                {/* Aprendices Asignados */}
                                <AprendicesList
                                    title="Equipo del Proyecto"
                                    items={assignedAprendices}
                                    buttonText="Remover"
                                    buttonAction={handleRemoveAprendiz}
                                    buttonColor="bg-red-400"
                                />
                            </div>

                            <div className="mt-8 max-w-md mx-auto">
                                <BotonSegundo
                                    Text="Confirmar Asignación de Proyecto"
                                    onClick={handleConfirm}
                                    additionalClasses={`w-full py-3 text-sm font-medium rounded-lg ${
                                        assignedAprendices.length > 0
                                            ? 'bg-[#A3E784] text-white hover:bg-[#A3E784]'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    } transition-colors`}
                                    disabled={assignedAprendices.length === 0}
                                />
                            </div>
                        </div>
                    </Layoutcontenido2>
                </div>
            )}
        </LayoutPrincipal2>
    );
};

export default AsignarProyectos;