import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import Layoutprincipal from '../layouts/LayoutPrincipal';
import BarraPreguntas from '../Components/BarraPreguntas';
import Grid2 from '../Components/Grid2';
import BotonPrincipal from '../Components/BotonPrincipal';
import BotonSegundo from '../Components/BotonSegundo';
import Loader from '../Components/Loader';

const Alcance = () => {
  const { idproyecto } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [respuestasAlcance, setRespuestasAlcance] = useState([]);
  const [selecciones, setSelecciones] = useState({});
  const [calificaciones, setCalificaciones] = useState({});
  const [promedio, setPromedio] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRespuestasAlcance = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/admin/respuestasalcance/${idproyecto}`);
        if (response.ok) {
          const data = await response.json();
          setRespuestasAlcance(data.respuestasAlcance);

          const seleccionesIniciales = data.respuestasAlcance.reduce((acc, respuesta) => {
            acc[respuesta.idalcance] = respuesta.respuesta ? "Sí" : "No";
            return acc;
          }, {});
          setSelecciones(seleccionesIniciales);

          const calificacionesIniciales = data.respuestasAlcance.reduce((acc, respuesta) => {
            acc[respuesta.idalcance] = respuesta.estado || null; // Usa null si no hay estado
            return acc;
          }, {});
          setCalificaciones(calificacionesIniciales);
        } else {
          console.error("Error al obtener las respuestas de alcance:", response.statusText);
        }
      } catch (error) {
        console.error("Error de red al obtener las respuestas de alcance:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRespuestasAlcance();
  }, [idproyecto]);

  useEffect(() => {
    const aprobados = Object.values(calificaciones).filter(cal => cal === "Aprobado").length;
    const promedioCalculado = respuestasAlcance.length > 0 ? (aprobados / respuestasAlcance.length) * 100 : 0;
    setPromedio(promedioCalculado);
  }, [calificaciones, respuestasAlcance.length]);

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
    // Verificar si todas las preguntas tienen una respuesta seleccionada
    const allAnswered = respuestasAlcance.every((respuesta) => selecciones[respuesta.idalcance] && calificaciones[respuesta.idalcance]);

    if (!allAnswered) {
      alert("Debes seleccionar todas las opciones de calificar para poder avanzar");
      return;
    }

    const detallesAlcance = respuestasAlcance.map((respuesta) => ({
      idproyecto,
      idrespuestasalcance: respuesta.idalcance,
      estado: calificaciones[respuesta.idalcance],
    }));

    try {
      // Aquí puedes agregar tu lógica para guardar los detalles si es necesario
      // await guardarDetalleCalificacion(detallesAlcance);

      // Actualiza los datos localmente después de guardar
      setRespuestasAlcance((prevRespuestas) =>
        prevRespuestas.map((respuesta) => ({
          ...respuesta,
          estado: selecciones[respuesta.idalcance] === "Sí" ? "Aprobado" : "No aceptado",
        }))
      );

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
      {isLoading ? (
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

              <div className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
                <Link to={`/respuestas/${idproyecto}`}>
                  <BotonPrincipal Text="Volver" />
                </Link>
                <BotonSegundo Text="Siguiente" textColor="text-black" onClick={handleNextClick} />
              </div>
            </div>
          </div>
        </div>
      )}
    </Layoutprincipal>
  );
};

export default Alcance;