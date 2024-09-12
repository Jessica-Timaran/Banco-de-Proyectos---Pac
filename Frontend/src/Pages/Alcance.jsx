import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import Layoutprincipal from '../Layouts/Layoutprincipal';
import BarraPreguntas from '../Components/BarraPreguntas';
import Grid from '../Components/Grid';
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
        const response = await fetch(`http://localhost:4000/api/respuestasalcance/${idproyecto}`);
        if (response.ok) {
          const data = await response.json();
          setRespuestasAlcance(data.respuestasAlcance);

          const seleccionesIniciales = data.respuestasAlcance.reduce((acc, respuesta) => {
            acc[respuesta.idalcance] = respuesta.respuesta ? "Sí" : "No";
            return acc;
          }, {});
          setSelecciones(seleccionesIniciales);

          const calificacionesIniciales = data.respuestasAlcance.reduce((acc, respuesta) => {
            acc[respuesta.idalcance] = 0;
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
    const total = Object.values(calificaciones).reduce((acc, cal) => acc + cal, 0);
    const promedioCalculado = respuestasAlcance.length > 0 ? (total / (respuestasAlcance.length * 10)) * 100 : 0;
    setPromedio(promedioCalculado);
  }, [calificaciones, respuestasAlcance.length]);

  const handleSelectionChange = (id, value) => {
    setSelecciones((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleEvaluarChange = (id, value) => {
    const nuevaCalificacion = value === "1" ? 10 : 0;

    setCalificaciones((prev) => ({
      ...prev,
      [id]: nuevaCalificacion,
    }));
  };

  const handleNextClick = () => {
    const promedioObjetivos = location.state?.promedioObjetivos || 0;
    const detallesAlcance = respuestasAlcance.map((respuesta) => ({
      idrespuesta: respuesta.idalcance,
      tipo_respuesta: "alcance",
      estado: selecciones[respuesta.idalcance] === "Sí" ? "Aprobado" : "No aceptado",
    }));

    navigate(`/calificacion/${idproyecto}`, {
      state: {
        promedio: promedio,
        promedioObjetivos: promedioObjetivos,
        detallesAlcance: detallesAlcance,
        detallesObjetivos: location.state?.detallesObjetivos || [],
      },
    });
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
                    <Grid
                      key={respuesta.idalcance}
                      Text1={respuesta.descripcion}
                      id1={`respuesta-si-${respuesta.idalcance}`}
                      id2={`respuesta-no-${respuesta.idalcance}`}
                      name={`respuesta-${respuesta.idalcance}`}
                      seleccionado={selecciones[respuesta.idalcance]}
                      onChange={(e) => handleSelectionChange(respuesta.idalcance, e.target.value)}
                      handleEvaluarChange={handleEvaluarChange}
                      id={respuesta.idalcance}
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