import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import Layoutprincipal from "../layouts/LayoutPrincipal";
import Layoutcontenido2 from "../Layouts/Layoutcontenido2";
import { BarState } from "../Components/BarState";
import { ModalComent } from "../Components/ModalComent";
import BotonPrincipal from "../Components/BotonPrincipal";
import BotonBack from "../Components/BotonBack";
import Loader from "../Components/Loader";
import { ModalConfirm } from "../Components/ModalConfirm";
import usePostCalificacion from "../../hooks/Admin/usePostCalificacion";
import { Card, Text, Metric } from "@tremor/react";
import { useSendEmail } from '../../hooks/Admin/useSendEmail'; // Importar el hook para enviar correos

const Calificacion = () => {
    const { idproyecto } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const promedioObjetivos = location.state?.promedioObjetivos || 0;
    const promedioAlcance = location.state?.promedio || 0;
    const [promedioFinal, setPromedioFinal] = useState(0);
    const [viewLoading, setViewLoading] = useState(true);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [comentario, setComentario] = useState("");
    const [estado, setEstado] = useState("");
    const [email, setEmail] = useState(""); // Estado para el correo electrónico
    const [showModalComent, setShowModalComent] = useState(false); // Para manejar el ModalComent

    const { postCalificacion, loading } = usePostCalificacion();
    const { sendEmail, loading: sendingEmail, error } = useSendEmail();

    useEffect(() => {
        const promedioFinalCalculado = Math.round((promedioObjetivos + promedioAlcance) / 2);
        setPromedioFinal(promedioFinalCalculado);
        setViewLoading(false);
    }, [promedioAlcance, promedioObjetivos]);

    const handleAction = (action) => {
        setEstado(action);
        setShowModalComent(true); // Abrir el modal de comentario
    };

    const handleConfirmClose = async () => {
        try {
            // Guardar comentario en la base de datos
            await postCalificacion(idproyecto, promedioFinal, estado, comentario);
            
            // Enviar el correo después de guardar la calificación
            await sendEmail(email, comentario);

            // Redirección según el estado
            if (estado === "Aceptado") {
                navigate(`/asignar-proyectos/${idproyecto}`);
            } else {
                navigate(`/Detalle/${idproyecto}`);
            }
        } catch (error) {
            console.error("Error al guardar la calificación:", error);
        }
    };

    const handleCancelConfirm = () => {
        setShowConfirmModal(false);
        setShowModalComent(false);
    };

    return (
        <Layoutprincipal title="Detalle del proyecto">
            {viewLoading ? (
                <Loader />
            ) : (
                <Layoutcontenido2 title="" text1="Calificación del proyecto">
                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="w-full mx-auto ">
                            <div className="flex justify-start pb-4">
                                <Link to={`/alcance/${idproyecto}`}>
                                    <BotonBack Text="Atrás" textColor="text-white" className="bg-verde hover:bg-lime-500 font-bold py-2 px-4 rounded" />
                                </Link>
                            </div>
                            <div className="md:w-full px-2">
                            <Card className="mb-8 p-6">
                                <Text className="text-center text-xl font-semibold mb-2">Promedio Final</Text>
                                <Metric className="text-center text-4xl font-bold mb-4">{promedioFinal.toFixed(2)}</Metric>
                                <div className="w-full h-24 mt-4">
                                    <BarState promedioFinal={promedioFinal} />
                                </div>
                            </Card>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 px-5">
                                <Card decoration="top" decorationColor="emerald">
                                    <Text>Objetivos</Text>
                                    <Metric>{promedioObjetivos.toFixed(2)}</Metric>
                                </Card>
                                <Card decoration="top" decorationColor="emerald">
                                    <Text>Alcance</Text>
                                    <Metric>{promedioAlcance.toFixed(2)}</Metric>
                                </Card>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 px-5">
                                <ModalComent 
                                    text="Rechazar" 
                                    buttonColor="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" 
                                    onSubmit={(comentario, email) => { 
                                        setComentario(comentario); 
                                        setEmail(email); 
                                        setEstado("Rechazado"); 
                                        setShowConfirmModal(true);
                                    }} 
                                />
                                <ModalComent 
                                    text="Devolver" 
                                    buttonColor="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded" 
                                    onSubmit={(comentario, email) => { 
                                        setComentario(comentario); 
                                        setEmail(email); 
                                        setEstado("Devuelto"); 
                                        setShowConfirmModal(true);
                                    }} 
                                />
                                <ModalComent 
                                    text="Aceptar" 
                                    buttonColor="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded" 
                                    onSubmit={(comentario, email) => { 
                                        setComentario(comentario); 
                                        setEmail(email); 
                                        setEstado("Aceptado"); 
                                        setShowConfirmModal(true);
                                    }} 
                                />
                            </div>
                        </div>
                    )}

                    {showConfirmModal && (
                        <ModalConfirm
                            onConfirm={handleConfirmClose}
                            onCancel={handleCancelConfirm}
                        />
                    )}
                </Layoutcontenido2>
            )}
        </Layoutprincipal>
    );
};

export default Calificacion;