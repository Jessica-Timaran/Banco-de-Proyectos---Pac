import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import LayoutPrincipal from '../../../layouts/LayoutPrincipal';
import Grid from "../../../Components/Grid";
import BotonPrincipal from "../../../Components/BotonPrincipal";
import BotonSegundo from "../../../Components/BotonSegundo";

const ObjetivosDeArea = () => {
  const { idarea, idtiposdearea } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [objetivos, setObjetivos] = useState([]);
  const [groupedObjetivos, setGroupedObjetivos] = useState({});
  const [respuestas, setRespuestas] = useState({});
  const [error, setError] = useState(null);
  const projectId = new URLSearchParams(location.search).get('projectId');

  // Fetch de objetivos cuando cambia el área
  useEffect(() => {
    const fetchObjetivos = async (idArea) => {
      try {
        const response = await fetch(`http://localhost:4000/api/user/objetivos/${idArea}`);
        if (!response.ok) {
          throw new Error(`Error fetching objetivos: ${response.statusText}`);
        }
        const data = await response.json();
        setObjetivos(data);
      } catch (error) {
        console.error('Error fetching objetivos:', error);
      }
    };

    if (idarea) {
      fetchObjetivos(idarea);
    }
  }, [idarea]);

  // Agrupar los objetivos por categoría
  useEffect(() => {
    const grouped = objetivos.reduce((acc, objetivo) => {
      if (!acc[objetivo.categoria]) {
        acc[objetivo.categoria] = [];
      }
      acc[objetivo.categoria].push(objetivo);
      return acc;
    }, {});
    setGroupedObjetivos(grouped);

    // Reiniciar respuestas cuando cambien los objetivos
    const initialRespuestas = objetivos.reduce((acc, objetivo) => {
      acc[`pregunta${objetivo.idobjetivos}`] = ''; // inicializa todas las preguntas sin respuesta
      return acc;
    }, {});
    setRespuestas(initialRespuestas); // Asignar respuestas solo para las preguntas actuales
  }, [objetivos]);

  // Manejar cambios en las respuestas
  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setRespuestas({
      ...respuestas,
      [name]: value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const currentRespuestas = { ...respuestas };
  
    const allQuestionsAnswered = Object.keys(groupedObjetivos).every((categoriaNombre) => {
      return groupedObjetivos[categoriaNombre].every((objetivo) => {
        return currentRespuestas[`pregunta${objetivo.idobjetivos}`] !== undefined && currentRespuestas[`pregunta${objetivo.idobjetivos}`] !== '';
      });
    });
  
    if (!allQuestionsAnswered) {
      setError("Por favor, responda todas las preguntas antes de continuar.");
      return;
    }
  
    setError(null);
  
    const rawRespuestas = Object.values(currentRespuestas);
  
    const normalizedRespuestas = rawRespuestas.map(value => {
      if (value === 'true') return true;
      if (value === 'false') return false;
      return value;
    }).filter(value => typeof value === 'boolean');
  
    const totalRespuestas = normalizedRespuestas.length;
    const respuestasPositivas = normalizedRespuestas.filter(r => r === true).length;
    const promedio = totalRespuestas > 0 ? Math.round((respuestasPositivas / totalRespuestas) * 100) : 0;
  
    const respuestasFormateadas = Object.entries(currentRespuestas).map(([key, value]) => ({
      idobjetivos: key.replace('pregunta', ''),
      respuesta: value
    }));
  
    const data = {
      respuestas: respuestasFormateadas,
      idproyecto: projectId,
      promedio: promedio
    };
  
    try {
      const response = await fetch('http://localhost:4000/api/user/guardarRespuestasYActualizarPuntos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`Error al procesar la solicitud: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log('Respuestas guardadas y puntos actualizados correctamente:', result);
  
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      setError(error.message);
    } finally {
      navigate(`/Usuario/VistaAlcance?idproyecto=${projectId}`);
    }
  };
  
  const handleBackClick = () => {
    const returnUrl = localStorage.getItem('itemsReturnUrl') || '/';
    navigate(returnUrl);
  };

  useEffect(() => {
    localStorage.setItem('objetivosReturnUrl', `/Usuario/Vista_Objetivos/ObjetivosDeArea/${idarea}/${idtiposdearea}?projectId=${projectId}`);
  }, [idarea, idtiposdearea, projectId]);

  return (
    <LayoutPrincipal title="">
      <div className="flex justify-center min-h-screen">
        <div className="p-10 w-full max-w-7xl my-10">
          <div className="flex flex-col">
            <div className="text-left mb-4">
              <h1 className="font-josefin-slab text-2xl text-black">Por favor marque “SI” o “NO” en cada pregunta</h1>
            </div>

            {error && (
              <div className="text-red-500 mb-4">
                {error}
              </div>
            )}

            <form id="respuestasForm" onSubmit={handleSubmit}>
              <input type="hidden" name="idproyecto" value={projectId || ''} />

              <button
                onClick={handleBackClick} 
                className="flex items-center text-black hover:text-lime-600"
              >
                <i className="fas fa-arrow-left w-5 h-5 mr-2"></i>
                Volver
              </button>

              <div className="grid grid-cols-12 bg-[#A3E784] font-bold py-4 rounded-t-lg border-b">
                <div className="col-span-12 md:col-span-2 text-center md:text-left px-6">OBJETIVOS</div>
              </div>

              <div className="grid grid-cols-12 bg-green-50 font-semibold py-4 rounded-t-lg border-b">
                <div className="col-span-12 md:col-span-10 text-center md:text-left pl-4">Tipos de objetivos</div>
                <div className="hidden md:block col-span-1 text-center">Sí</div>
                <div className="hidden md:block col-span-1 text-center">No</div>
              </div>

              {Object.keys(groupedObjetivos).map((categoriaNombre) => (
                <div key={categoriaNombre}>
                  <div className="grid-cols-12 bg-green-50 md:col-span-10 pl-4 col-span-12 flex py-2">
                    {categoriaNombre}
                  </div>

                  {groupedObjetivos[categoriaNombre].map((objetivo, index) => (
                    <Grid 
                      key={objetivo.idobjetivos}
                      Text1={`${index + 1}. ${objetivo.descripcion}`}
                      id1={`radioButton-grid${objetivo.idobjetivos}-si`}
                      id2={`radioButton-grid${objetivo.idobjetivos}-no`}
                      name={`pregunta${objetivo.idobjetivos}`}
                      checkedValue={respuestas[`pregunta${objetivo.idobjetivos}`] || ""}
                      onChange={handleRadioChange}
                    />
                  ))}
                </div>
              ))}

              <div className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                <button type="button" onClick={handleBackClick} className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                  <BotonPrincipal Text="Volver" />
                </button>
                <button type="submit" className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                  <BotonSegundo Text="Siguiente" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </LayoutPrincipal>
  );
};

export default ObjetivosDeArea;