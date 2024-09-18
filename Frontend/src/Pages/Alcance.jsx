import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import Layoutprincipal from '../layouts/LayoutPrincipal';
import BarraPreguntas from '../Components/BarraPreguntas';
import Grid2 from '../Components/Grid2';
import BotonPrincipal from '../Components/BotonPrincipal';
import BotonSegundo from '../Components/BotonSegundo';
import Loader from '../Components/Loader';
import useFetchRespuestasAlcance from '../../hooks/Admin/useFetchRespuestasAlcance';
import useActualizarEstadoRespuestasAlcance from '../../hooks/Admin/useActualizarEstadoRespuestasAlcance';
import useAprobacionesAlcance from '../../hooks/Admin/useAprobacionesAlcance';

const Alcance = () => {
  const { idproyecto } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { respuestasAlcance, selecciones, calificaciones, isLoading, setSelecciones, setCalificaciones } = useFetchRespuestasAlcance(idproyecto);
  const { aprobaciones: asignaciones, loading: loadingAsignaciones, error: errorAsignaciones } = useAprobacionesAlcance(idproyecto);
  const [promedio, setPromedio] = useState(0);
  const { actualizarEstadoRespuestasAlcance, actualizarPuntosAlcance, loading: loadingActualizar, error: errorActualizar } = useActualizarEstadoRespuestasAlcance();

  useEffect(() => {
    const aprobados = Object.values(calificaciones).filter(cal => cal === "Aprobado").length;
    const promedioCalculado = respuestasAlcance.length > 0 ? (aprobados / respuestasAlcance.length) * 100 : 0;
    setPromedio(promedioCalculado);
  }, [calificaciones, respuestasAlcance.length]);

  // Cargar las asignaciones de "Aprobado" y "No aceptado" cuando se cargue la vista
  useEffect(() => {
    if (asignaciones.length > 0) {
      const nuevasCalificaciones = {};
      asignaciones.forEach(asignacion => {
        nuevasCalificaciones[asignacion.idalcance] = asignacion.estado;
      });
      setCalificaciones(nuevasCalificaciones);
    }
  }, [asignaciones]);

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
    const allAnswered = respuestasAlcance.every((respuesta) => selecciones[respuesta.idalcance] && calificaciones[respuesta.idalcance]);

    if (!allAnswered) {
      alert("Debes seleccionar todas las opciones de calificar para poder avanzar");
      return;
    }

    const detallesAlcance = respuestasAlcance
      .filter(respuesta => respuesta.idalcance !== undefined && calificaciones[respuesta.idalcance] !== undefined)
      .map((respuesta) => ({
        idproyecto: Number(idproyecto),
        idrespuesta: Number(respuesta.idalcance),
        estado: String(calificaciones[respuesta.idalcance]),
      }));

    console.log('Detalles que se enviarán:', detallesAlcance);  // Verifica los datos antes de enviarlos

    try {
      // Actualizar el estado de las respuestas de alcance
      await actualizarEstadoRespuestasAlcance(detallesAlcance);

      // Actualizar los puntos de alcance en la base de datos
      await actualizarPuntosAlcance(idproyecto, promedio);

      // Navegar a la siguiente página
      navigate(`/calificacion/${idproyecto}`, {
        state: {
          promedio: promedio,
          promedioObjetivos: location.state?.promedioObjetivos || 0,
          detallesAlcance: detallesAlcance,
          detallesObjetivos: location.state?.detallesObjetivos || [],
        },
      });
    } catch (err) {
      console.error('Error al guardar los detalles:', err);
    }
  };

  const preguntasAgrupadas = respuestasAlcance.reduce((acc, respuesta) => {
    if (!respuesta.categoria) {
      console.warn(`Pregunta sin categoría encontrada: ${respuesta.descripcion}`);
    }
    if (!acc[respuesta.categoria]) {
      acc[respuesta.categoria] = [];
    }
    acc[respuesta.categoria].push(respuesta);
    return acc;
  }, {});

  return (
    <Layoutprincipal title="">
      {isLoading || loadingAsignaciones ? (
        <Loader />
      ) : (
        <div className="flex justify-center min-h-screen">
          <div className="p-10 w-full max-w-7xl my-10">
            <div className="flex flex-col ">
              <div className="text-left mb-4">
                <h1 className="font-josefin-slab text-2xl text-black">
                  Por favor marque “SI” o “NO” en cada pregunta
                </h1>
              </div>

              <div className="flex justify-center">
                <BarraPreguntas Text1="Alcance" Text2="Sí" Text3="No" Text4="Calificar" />
              </div>

              {Object.keys(preguntasAgrupadas).map((categoria, idx) => (
                <div key={idx}>
                  <div className="text-lg font-bold grid-cols-12 bg-green-50 md:col-span-10 pl-4 col-span-12 flex py-2">
                    {categoria || 'Sin Categoría'}
                  </div>

                  {preguntasAgrupadas[categoria].map((respuesta) => (
                    <Grid2
                      key={respuesta.idalcance}
                      Text1={respuesta.descripcion}
                      id1={`respuesta-si-${respuesta.idalcance}`}
                      id2={`respuesta-no-${respuesta.idalcance}`}
                      name={`respuesta-${respuesta.idalcance}`}
                      seleccionado={selecciones[respuesta.idalcance]}
                      onChange={(e) => handleSelectionChange(respuesta.idalcance, e.target.value)}
                      handleEvaluarChange={handleEvaluarChange}
                      id={respuesta.idalcance}
                      calificacion={calificaciones[respuesta.idalcance]}
                    />
                  ))}
                </div>
              ))}

              <div className="text-right mt-4">
                <h2 className="text-xl font-bold">Promedio de Calificaciones: {promedio !== null ? promedio.toFixed(2) : "N/A"}</h2>
              </div>

              <div className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
                <Link to={`/respuestas/${idproyecto}`}>
                  <BotonPrincipal Text="Volver" />
                </Link>
                <BotonSegundo Text="Siguiente" textColor="text-black" onClick={handleNextClick} disabled={loadingActualizar} />
              </div>

              {errorActualizar && <p style={{ color: 'red' }}>Error: {errorActualizar}</p>}
              {errorAsignaciones && <p style={{ color: 'red' }}>Error cargando asignaciones: {errorAsignaciones.message}</p>}
            </div>
          </div>
        </div>
      )}
    </Layoutprincipal>
  );
};

export default Alcance;