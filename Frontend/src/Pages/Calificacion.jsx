// import React, { useEffect, useState } from "react";
// import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
// import Layoutprincipal from "../Layouts/Layoutprincipal";
// import Layoutcontenido2 from "../Layouts/Layoutcontenido2";
// import { BarState } from "../Components/BarState";
// import { ModalComent } from "../Components/ModalComent";
// import BotonPrincipal from "../Components/BotonPrincipal";
// import Loader from "../Components/Loader";
// import { usePostCalificacion } from "../../hooks/usePostCalificacion";
// import { ModalConfirm } from "../Components/ModalConfirm"; // Importa el modal

// const Calificacion = () => {
//     const { idproyecto } = useParams();
//     const location = useLocation();
//     const navigate = useNavigate();
//     const promedioObjetivos = location.state?.promedioObjetivos || 0;
//     const promedioAlcance = location.state?.promedio || 0;
//     const [promedioFinal, setPromedioFinal] = useState(0);
//     const [viewLoading, setViewLoading] = useState(true);
//     const { postCalificacion, loading } = usePostCalificacion();
//     const [mostrarModal, setMostrarModal] = useState(false);

//     useEffect(() => {
//         const promedioFinalCalculado = Math.round((promedioObjetivos + promedioAlcance) / 2);
//         setPromedioFinal(promedioFinalCalculado);
//         setViewLoading(false);
//     }, [promedioAlcance, promedioObjetivos]);

//     const guardarCalificacion = async (estado, comentario) => {
//         const detalles = [...(location.state.detallesObjetivos || []), ...(location.state.detallesAlcance || [])];

//         const exito = await postCalificacion(idproyecto, promedioFinal, estado, comentario, detalles);

//         if (exito) {
//             if (estado === "Aceptado") {
//                 navigate("/asignar-proyectos");
//             } else {
//                 setMostrarModal(true);
//             }
//         } else {
//             console.error("Hubo un problema al guardar la calificación o al actualizar el proyecto.");
//         }
//     };

//     const handleAceptar = (comentario) => {
//         guardarCalificacion("Aceptado", comentario);
//     };

//     const handleDevolver = (comentario) => {
//         guardarCalificacion("Devuelto", comentario);
//     };

//     const handleRechazar = (comentario) => {
//         guardarCalificacion("Rechazado", comentario);
//     };

//     const cerrarModal = () => {
//         setMostrarModal(false);
//         navigate("/"); // Redirige a la vista de inicio
//     };

//     return (
//         <Layoutprincipal title="Detalle del proyecto">
//             {viewLoading ? (
//                 <Loader />
//             ) : (
//                 <Layoutcontenido2 title="" text1="Calificación del proyecto">
//                     {loading ? (
//                         <Loader />
//                     ) : (
//                         <div className="w-full h-full">
//                             <div className="flex flex-col justify-end text-center gap-y-5">
//                                 <p className="text-xl font-bold">Promedio Final: {promedioFinal.toFixed(2)}</p>
//                                 <div className="w-full h-full">
//                                     <BarState promedioFinal={promedioFinal} />
//                                 </div>
//                             </div>
//                             <div className="w-full flex flex-row justify-center mt-6 gap-x-2">
//                                 <ModalComent text="Rechazar" buttonColor="bg-red-500" onSubmit={handleRechazar} />
//                                 <ModalComent text="Devolver" buttonColor="bg-yellow-400" onSubmit={handleDevolver} />
//                                 <ModalComent text="Aceptar" buttonColor="bg-green-700" onSubmit={handleAceptar} />
//                             </div>
//                             <div className="w-full flex flex-row justify-center mt-3">
//                                 <Link to={`/alcance/${idproyecto}`}>
//                                     <BotonPrincipal Text="Atrás" textColor="text-black" />
//                                 </Link>
//                             </div>
//                         </div>
//                     )}
//                 </Layoutcontenido2>
//             )}
//             {mostrarModal && <ModalConfirm onClose={cerrarModal} />}
//         </Layoutprincipal>
//     );
// };

// export default Calificacion;

import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import Layoutprincipal from "../Layouts/Layoutprincipal";
import Layoutcontenido2 from "../layouts/Layoutcontenido2";
import { BarState } from "../Components/BarState";
import { ModalComent } from "../Components/ModalComent";
import BotonPrincipal from "../Components/BotonPrincipal";
import Loader from "../Components/Loader";
import { ModalConfirm } from "../Components/ModalConfirm";
import usePostCalificacion from "../../hooks/usePostCalificacion"; // Importa el hook

const Calificacion = () => {
    const { idproyecto } = useParams();
    const location = useLocation();
    const navigate = useNavigate(); // Inicializa useNavigate
    const promedioObjetivos = location.state?.promedioObjetivos || 0;
    const promedioAlcance = location.state?.promedio || 0;
    const [promedioFinal, setPromedioFinal] = useState(0);
    const [viewLoading, setViewLoading] = useState(true);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [comentario, setComentario] = useState("");
    const [estado, setEstado] = useState("");

    const { postCalificacion, loading } = usePostCalificacion(); // Usa el hook

    useEffect(() => {
        const promedioFinalCalculado = Math.round((promedioObjetivos + promedioAlcance) / 2);
        setPromedioFinal(promedioFinalCalculado);
        setViewLoading(false);
    }, [promedioAlcance, promedioObjetivos]);

    const handleAceptar = (comentario) => {
        setEstado("Aceptado");
        setComentario(comentario);
        setShowConfirmModal(true);
    };

    const handleDevolver = (comentario) => {
        setEstado("Devuelto");
        setComentario(comentario);
        setShowConfirmModal(true);
    };

    const handleRechazar = (comentario) => {
        setEstado("Rechazado");
        setComentario(comentario);
        setShowConfirmModal(true);
    };

    const handleConfirmClose = async () => {
        const detalles = [...(location.state.detallesObjetivos || []), ...(location.state.detallesAlcance || [])];
        try {
            await postCalificacion(idproyecto, promedioFinal, estado, comentario, detalles);
            navigate(`/asignar-proyectos/${idproyecto}`); // Redirige a la vista de asignación de proyectos
        } catch (error) {
            console.error("Error al guardar la calificación:", error);
            // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje de error
        }
    };

    const handleCancelConfirm = () => {
        setShowConfirmModal(false);
    };

    return (
        <LayoutPrincipal title="Detalle del proyecto">
            {viewLoading ? (
                <Loader />
            ) : (
                <Layoutcontenido2 title="" text1="Calificacion del proyecto">
                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="w-full h-full">
                            <div className="flex flex-col justify-end text-center gap-y-5">
                                <p className="text-xl font-bold">Promedio Final: {promedioFinal.toFixed(2)}</p>
                                <div className="w-full h-full">
                                    <BarState promedioFinal={promedioFinal} />
                                </div>
                            </div>
                            <div className="w-full flex flex-row justify-center mt-6 gap-x-2">
                                <ModalComent text="Rechazar" buttonColor="bg-red-500" onSubmit={handleRechazar} />
                                <ModalComent text="Devolver" buttonColor="bg-yellow-400" onSubmit={handleDevolver} />
                                <ModalComent text="Aceptar" buttonColor="bg-green-700" onSubmit={handleAceptar} />
                            </div>
                            <div className="w-full flex flex-row justify-center mt-3">
                                <Link to={`/alcance/${idproyecto}`}>
                                    <BotonPrincipal Text="Atrás" textColor="text-black" />
                                </Link>
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
        </LayoutPrincipal>
    );
};

export default Calificacion;