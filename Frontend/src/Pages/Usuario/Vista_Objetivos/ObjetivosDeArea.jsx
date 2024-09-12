import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import LayoutPrincipal from '../../../Layouts/Layoutprincipal';
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

  useEffect(() => {
    const grouped = objetivos.reduce((acc, objetivo) => {
      if (!acc[objetivo.categoria]) {
        acc[objetivo.categoria] = [];
      }
      acc[objetivo.categoria].push(objetivo);
      return acc;
    }, {});
    setGroupedObjetivos(grouped);
  }, [objetivos]);

  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setRespuestas({
      ...respuestas,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const allQuestionsAnswered = Object.keys(groupedObjetivos).every((categoriaNombre) => {
      return groupedObjetivos[categoriaNombre].every((objetivo) => {
        return respuestas[`pregunta${objetivo.idobjetivos}`] !== undefined;
      });
    });
  
    if (!allQuestionsAnswered) {
      setError("Por favor, responda todas las preguntas antes de continuar.");
      return;
    }
  
    setError(null);
  
    const data = {
      ...respuestas,
      idproyecto: projectId || '',
    };
  
    try {
    const response = await fetch(`http://localhost:4000/api/user/guardarRespuestasObjetivos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
      if (!response.ok) {
        throw new Error(`Error al actualizar respuestas: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log('Respuestas actualizadas correctamente:', result);
    } catch (error) {
      console.error('Error al actualizar respuestas:', error);
    } finally {
      navigate(`/Usuario/VistaAlcance?idproyecto=${projectId}`);
    }
  };


  const handleBackClick = () => {
    // Recupera la URL de ItemsDeArea desde localStorage
    const returnUrl = localStorage.getItem('itemsReturnUrl') || '/';
  navigate(returnUrl);
};
useEffect(() => {
  // Guarda la URL de ObjetivosDeArea para volver a ItemsDeArea
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