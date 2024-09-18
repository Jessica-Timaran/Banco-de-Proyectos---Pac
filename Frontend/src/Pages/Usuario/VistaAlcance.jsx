import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutPrincipal from '../../layouts/LayoutPrincipal';
import Grid from '../../Components/Grid';
import BotonPrincipal from '../../Components/BotonPrincipal';
import BotonSegundo from '../../Components/BotonSegundo';
import Loader from '../../Components/Loader';
import ModalEstado from '../../Components/ModalesUser/ModalEstado';

const VistaAlcance = () => {
  const [alcances, setAlcances] = useState([]);
  const [groupedAlcances, setGroupedAlcances] = useState({});
  const [selectedValues, setSelectedValues] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar la visibilidad del modal
  const [estadoProyecto, setEstadoProyecto] = useState(''); // Estado para almacenar el estado del proyecto
  const idproyecto = new URLSearchParams(window.location.search).get('idproyecto') || '';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAlcances = await fetch('http://localhost:4000/api/user/alcances');
        if (!responseAlcances.ok) {
          throw new Error('La respuesta de la red no fue correcta');
        }
        const dataAlcances = await responseAlcances.json();
        setAlcances(dataAlcances);
      } catch (error) {
        console.error('No se han podido recuperar los alcances:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const grouped = alcances.reduce((acc, alcance) => {
      if (!acc[alcance.categoria]) {
        acc[alcance.categoria] = [];
      }
      acc[alcance.categoria].push(alcance);
      return acc;
    }, {});
    setGroupedAlcances(grouped);
  }, [alcances]);

  const handleRadioChange = (idalcance, value) => {
    setSelectedValues(prevValues => ({
      ...prevValues,
      [idalcance]: value,
    }));
  };

  const calculatePromedio = (respuestas) => {
    const totalAlcances = respuestas.length;
    const totalTrue = respuestas.filter(respuesta => respuesta.respuesta === true).length;
    const promedio = totalAlcances > 0 ? Math.round((totalTrue / totalAlcances) * 100) : 0;

    console.log(`Total de respuestas: ${totalAlcances}`);
    console.log(`Respuestas TRUE: ${totalTrue}`);
    console.log(`Promedio: ${promedio}%`);

    return promedio;
  };

  const determinarEstadoProyecto = (promedioFinal) => {
    if (promedioFinal >= 0 && promedioFinal <= 30) {
      return 'Rechazado';
    } else if (promedioFinal >= 31 && promedioFinal <= 70) {
      return 'Devuelto';
    } else if (promedioFinal >= 71 && promedioFinal <= 100) {
      return 'Aceptado';
    } else {
      return 'Desconocido';
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("handleSubmit ejecutado");
  
    const allQuestionsAnswered = Object.keys(groupedAlcances).every((categoria) => {
      return groupedAlcances[categoria].every((alcance) => {
        return selectedValues[alcance.idalcance] !== undefined;
      });
    });
  
    if (!allQuestionsAnswered) {
      setError("Por favor, responda todas las preguntas antes de continuar.");
      return;
    }
  
    setError(null);
    setLoading(true); // Inicia el loader
  
    const data = {
      ...selectedValues,
      idproyecto: idproyecto,
    };
  
    try {
      console.log("Antes de realizar fetch...");
      const response = await fetch('http://localhost:4000/api/user/guardarRespuestas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      console.log("Fetch completado.");
  
      const result = await response.json();
      console.log('Response status:', response.status);
  
      if (!response.ok) {
        console.log('Error en la respuesta:', result.error || 'Error desconocido');
        throw new Error(`Error al guardar respuestas: ${result.error || 'Error desconocido'}`);
      }
  
      console.log('Respuestas guardadas correctamente:', result);
  
      // Obtener respuestas después de guardar
      const respuestasResponse = await fetch(`http://localhost:4000/api/user/respuestasalcance/${idproyecto}`);
      if (!respuestasResponse.ok) {
        throw new Error('La respuesta de la red no fue correcta');
      }
      const respuestasData = await respuestasResponse.json();
      const promedioAlcance = calculatePromedio(respuestasData.respuestasAlcance);
  
      console.log(`Promedio calculado después de guardar: ${promedioAlcance}%`);
  
      // Guardar el promedio en la base de datos
      const updateResponse = await fetch(`http://localhost:4000/api/promedioFinal/proyectos/${idproyecto}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          puntosalcance: promedioAlcance,
        }),
      });
  
      if (!updateResponse.ok) {
        throw new Error('Error al actualizar el promedio de alcance.');
      }
  
      console.log('Promedio de alcance actualizado correctamente.');
  
      // Obtener los puntos para calcular el promedio final
      const promedioFinalResponse = await fetch(`http://localhost:4000/api/promedio/proyectos/${idproyecto}/promediofinal`);
      if (!promedioFinalResponse.ok) {
        throw new Error('Error al obtener el promedio final del proyecto');
      }
      const finalData = await promedioFinalResponse.json();
  
      // Convertir a números
      const puntosObjetivos = parseFloat(finalData.puntosobjetivos) || 0;
      const puntosAlcance = parseFloat(finalData.puntosalcance) || 0;
  
      console.log(`Puntos Objetivos: ${puntosObjetivos}`);
      console.log(`Puntos Alcance: ${puntosAlcance}`);
  
      // Calcular el promedio final
      const promedioFinal = (puntosObjetivos + puntosAlcance) / 2;
  
      console.log(`Promedio final calculado: ${promedioFinal}%`);
  
      // Determinar el estado del proyecto
      const estadoProyecto = determinarEstadoProyecto(promedioFinal);
  
      console.log(`Estado del proyecto determinado: ${estadoProyecto}`);
  
      // Guardar el promedio final y el estado en la base de datos
      const guardarFinalResponse = await fetch(`http://localhost:4000/api/promedioFinal/proyectos/${idproyecto}/proyectofinal`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          proyectofinal: promedioFinal,
          estado: estadoProyecto,
        }),
      });
  
      if (!guardarFinalResponse.ok) {
        throw new Error('Error al guardar el promedio final y el estado del proyecto.');
      }
  
      console.log('Promedio final y estado guardados correctamente en la base de datos.');
  
      // Mostrar el modal con el estado del proyecto
      setEstadoProyecto(estadoProyecto);
      setIsOpen(true);
  
    } catch (error) {
      console.error('Error al guardar respuestas o actualizar promedio:', error);
    } finally {
      setLoading(false); // Finaliza el loader
      console.log('Finalmente, redirigiendo...');
    }
  };
  

  const handleBackClick = () => {
    const returnUrl = localStorage.getItem('objetivosReturnUrl') || '/VistaObjetivos';
    navigate(returnUrl);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <LayoutPrincipal title="">
      <div className="flex justify-center min-h-screen">
        <div className="p-10 w-full max-w-7xl my-10">
          <div className="flex flex-col">
            <div className="text-left mb-4">
              <h1 className="font-josefin-slab text-2xl text-black">
                Por favor marque “SI” o “NO” en cada pregunta
              </h1>
            </div>
            <button
              onClick={handleBackClick} 
              className="flex items-center text-black hover:text-lime-600"
            >
              <i className="fas fa-arrow-left w-5 h-5 mr-2 "></i>
              Volver
            </button>

            {error && (
              <div className="text-red-500 mb-4">
                {error}
              </div>
            )}

            <form id="respuestasForm" onSubmit={handleSubmit}>
              <input type="hidden" name="idproyecto" id="idproyecto" value={idproyecto} />

              <div className="grid grid-cols-12 bg-[#A3E784] font-bold py-4 rounded-t-lg border-b">
                <div className="col-span-12 md:col-span-2 text-center md:text-left px-6">ALCANCE</div>
              </div>

              <div className="grid grid-cols-12 bg-green-50 font-semibold py-4 rounded-t-lg border-b">
                <div className="col-span-12 md:col-span-10 text-center md:text-left pl-4">Tipo de alcance</div>
                <div className="hidden md:block col-span-1 text-center">Sí</div>
                <div className="hidden md:block col-span-1 text-center">No</div>
              </div>

              {Object.keys(groupedAlcances).map((categoria) => (
                <React.Fragment key={categoria}>
                  <div className="grid-cols-12 bg-green-50 md:col-span-10 pl-4 col-span-12 flex py-2">
                    {categoria}
                  </div>

                  {groupedAlcances[categoria].map((alcance, index) => (
                    <Grid
                      key={alcance.idalcance}
                      Text1={`${index + 1}. ${alcance.descripcion}`}
                      id1={`termsCheckbox1-grid${alcance.idalcance}`}
                      id2={`termsCheckbox2-grid${alcance.idalcance}`}
                      name={`pregunta${alcance.idalcance}`}
                      checkedValue={selectedValues[alcance.idalcance]}
                      onChange={(e) => handleRadioChange(alcance.idalcance, e.target.value)}
                    />
                  ))}
                </React.Fragment>
              ))}

              <div className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  onClick={handleBackClick}
                  className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                  <BotonPrincipal Text="Volver" />
                </button>
                <button
                  type="submit"
                  className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                  <BotonSegundo Text="Guardar" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Renderizar el modal */}
      <ModalEstado estado={estadoProyecto} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </LayoutPrincipal>
  );
};

export default VistaAlcance;