import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Layoutprincipal from "../layouts/LayoutPrincipal";
import Grid2 from "../Components/Grid2";
import BotonPrincipal from "../Components/BotonPrincipal";
import BotonSegundo from "../Components/BotonSegundo";
import BarraPreguntas from "../Components/BarraPreguntas";
import useDetalleCalificacion from "../../hooks/Admin/useDetalleCalificacion";
import useAprobacionesAdmin from "../../hooks/Admin/useAprobacionesAdmin";
import Loader from "../Components/Loader";
import useFetchRespuestas from "../../hooks/Admin/useFetchRespuestas";

const Objetivos = () => {
  const { idproyecto } = useParams();

  return <ObjetivosComponent key={idproyecto} idproyecto={idproyecto} />;
};

const ObjetivosComponent = ({ idproyecto }) => {
  const [promedio, setPromedio] = useState(null);
  const navigate = useNavigate();

  const { 
    guardarDetalleCalificacion, 
    actualizarPuntosObjetivos, 
    obtenerPuntosObjetivos, 
    puntosObjetivos, 
    loading: loadingGuardar, 
    error: errorGuardar 
  } = useDetalleCalificacion(idproyecto);

  const { aprobaciones, loading: loadingAprobaciones, error: errorAprobaciones } = useAprobacionesAdmin(idproyecto);
  const { respuestas, selecciones, setSelecciones, calificaciones, setCalificaciones } = useFetchRespuestas(idproyecto);

  useEffect(() => {
    if (aprobaciones.length > 0) {
      const calificacionesActualizadas = aprobaciones.reduce((acc, aprobacion) => {
        acc[aprobacion.idrespuestasobjetivos] = aprobacion.estado;
        return acc;
      }, {});
      setCalificaciones((prev) => ({ ...prev, ...calificacionesActualizadas }));
    }
  }, [aprobaciones]);

  useEffect(() => {
    const aprobados = Object.values(calificaciones).filter(cal => cal === "Aprobado").length;
    const promedioCalculado = respuestas.length > 0 ? (aprobados / respuestas.length) * 100 : 0;
    setPromedio(promedioCalculado);
  }, [calificaciones, respuestas.length]);

  useEffect(() => {
    if (puntosObjetivos !== null) {
      setPromedio(puntosObjetivos);
    }
  }, [puntosObjetivos]);

  const handleSelectionChange = (id, value) => {
    setSelecciones((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleEvaluarChange = (id, value) => {
    setCalificaciones((prev) => ({
      ...prev,
      [id]: value === "1" ? "Aprobado" : "No aceptado",
    }));
  };

  const handleNextClick = async () => {
    const allAnswered = respuestas.every((respuesta) => selecciones[respuesta.id] && calificaciones[respuesta.id]);

    if (!allAnswered) {
      alert("Debes seleccionar todas las opciones de calificar para poder avanzar");
      return;
    }

    const detalles = respuestas.map((respuesta) => ({
      idproyecto,
      idrespuestasobjetivos: respuesta.id,
      estado: calificaciones[respuesta.id],
    }));

    try {
      await guardarDetalleCalificacion(detalles);

      // Actualiza los puntos objetivos en la base de datos
      await actualizarPuntosObjetivos(promedio);

      // Navega a la siguiente pantalla
      navigate(`/alcance/${idproyecto}`, {
        state: {
          promedioObjetivos: promedio,
          detallesObjetivos: detalles,
        },
      });
    } catch (err) {
      console.error('Error al guardar los detalles:', err);
    }
  };

  const preguntasAgrupadas = respuestas.reduce((acc, respuesta) => {
    if (!respuesta.categoria) {
      console.warn(`Pregunta sin categoría encontrada: ${respuesta.descripcion}`);
    }
    if (!acc[respuesta.categoria]) {
      acc[respuesta.categoria] = [];
    }
    acc[respuesta.categoria].push(respuesta);
    return acc;
  }, {});

  if (loadingGuardar || loadingAprobaciones) {
    return <Loader />;
  }

  return (
    <Layoutprincipal title="Objetivos del Proyecto">
      <div className="flex justify-center min-h-screen">
        <div className="p-10 w-full max-w-7xl my-10">
          <div className="flex flex-col">
            <div className="text-left mb-4">
              <h1 className="font-josefin-slab text-2xl text-black">Respuestas</h1>
            </div>

            <div className="flex justify-center">
              <BarraPreguntas Text1={"Objetivos del proyecto"} Text2={"Sí"} Text3={"No"} Text4={"Calificar"} />
            </div>

            {Object.keys(preguntasAgrupadas).map((categoria, idx) => (
              <div key={idx}>
                <div className="text-lg font-bold grid-cols-12 bg-green-50 md:col-span-10 pl-4 col-span-12 flex py-2">
                  {categoria || 'Sin Categoría'}
                </div>

                {preguntasAgrupadas[categoria].map((respuesta) => (
                  <Grid2
                    key={respuesta.id}
                    Text1={respuesta.descripcion}
                    id1={`respuesta-si-${respuesta.id}`}
                    id2={`respuesta-no-${respuesta.id}`}
                    name={`respuesta-${respuesta.id}`}
                    seleccionado={selecciones[respuesta.id] || "No"}
                    onChange={handleSelectionChange}
                    handleEvaluarChange={handleEvaluarChange}
                    id={respuesta.id}
                    calificacion={calificaciones[respuesta.id]}  // Aquí se muestra la calificación del administrador
                  />
                ))}
              </div>
            ))}

            <div className="text-right mt-4">
              <h2 className="text-xl font-bold">Promedio de Calificaciones: {promedio !== null ? promedio.toFixed(2) : "N/A"}</h2>
            </div>

            <div className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
              <Link to={`/Detalle/${idproyecto}`}>
                <BotonPrincipal Text="Volver" />
              </Link>
              <BotonSegundo Text="Siguiente" textColor="text-black" onClick={handleNextClick} />
            </div>
          </div>
        </div>
      </div>
    </Layoutprincipal>
  );
};

export default Objetivos;