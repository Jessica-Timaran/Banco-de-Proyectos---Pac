import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import LayoutPrincipal from '../../Layouts/Layoutprincipal';
import Grid from '../../Components/Grid';
import BotonPrincipal from '../../Components/BotonPrincipal';
import BotonSegundo from '../../Components/BotonSegundo';
import Loader from '../../Components/Loader'; // Importa el componente Loader

const VistaAlcance = () => {
  const [alcances, setAlcances] = useState([]);
  const [groupedAlcances, setGroupedAlcances] = useState({});
  const [selectedValues, setSelectedValues] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const idproyecto = new URLSearchParams(window.location.search).get('idproyecto') || '';
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/user/alcances');
        if (!response.ok) {
          throw new Error('La respuesta de la red no fue correcta');
        }
        const data = await response.json();
        setAlcances(data);
      } catch (error) {
        console.error('No se han podido recuperar los alcances:', error);
      } finally {
        setLoading(false); // Desactiva el estado de carga cuando los datos se han cargado
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
      
      // Redirigir al obtener una respuesta exitosa
      navigate('/Usuario/VistaUsuario');
    } catch (error) {
      console.error('Error al guardar respuestas:', error);
    } finally {
      console.log('Finalmente, redirigiendo...');
    }
  };

  const handleBackClick = () => {
    // Recupera la URL de retorno desde localStorage
    const returnUrl = localStorage.getItem('objetivosReturnUrl') || '/VistaObjetivos';
    navigate(returnUrl);
  };

  // Muestra el loader mientras los datos se están cargando
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
    </LayoutPrincipal>
  );
};

export default VistaAlcance;

