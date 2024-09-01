import React, { useEffect, useState } from 'react';
import LayoutPrincipal from '../layouts/LayoutPrincipal.jsx';
import Grid from '../Components/Grid.jsx';
import BotonPrincipal from '../Components/BotonPrincipal.jsx';
import BotonSegundo from '../Components/BotonSegundo.jsx';

// Aquí obtendrás idarea e idtiposdearea desde las props o la ruta
const ObjetivosPrueba = ({ match }) => {
  const { idarea, idtiposdearea } = match.params;

  const [objetivos, setObjetivos] = useState([]);
  const [groupedObjetivos, setGroupedObjetivos] = useState({});

  useEffect(() => {
    const fetchObjetivos = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/objetivos');
        if (!response.ok) {
          throw new Error('La respuesta de la red no fue correcta');
        }
        const data = await response.json();
        setObjetivos(data);
        
        // Agrupar objetivos por categoría
        const grouped = data.reduce((acc, objetivo) => {
          if (!acc[objetivo.categoria]) {
            acc[objetivo.categoria] = [];
          }
          acc[objetivo.categoria].push(objetivo);
          return acc;
        }, {});
        setGroupedObjetivos(grouped);

      } catch (error) {
        console.error('No se han podido recuperar los objetivos:', error);
      }
    };

    fetchObjetivos();
  }, []);

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

            <div className="grid grid-cols-12 bg-[#A3E784] font-bold py-4 rounded-t-lg border-b">
              <div className="col-span-12 md:col-span-2 text-center md:text-left px-6">
                OBJETIVOS
              </div>
            </div>

            <div className="grid grid-cols-12 bg-green-50 font-semibold py-4 rounded-t-lg border-b">
              <div className="col-span-12 md:col-span-10 text-center md:text-left pl-4">
                Tipos de objetivos
              </div>
              <div className="hidden md:block col-span-1 text-center">Sí</div>
              <div className="hidden md:block col-span-1 text-center">No</div>
            </div>

            {Object.keys(groupedObjetivos).map((categoriaNombre) => (
              <React.Fragment key={categoriaNombre}>
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
                  />
                ))}
              </React.Fragment>
            ))}

            <div className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <a href={`/Services/${idarea}-${idtiposdearea}`}>
                <BotonPrincipal Text="Volver" />
              </a>
              <a href="/VistaAlcance" className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                <BotonSegundo Text="Siguiente" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </LayoutPrincipal>
  );
};

export default ObjetivosPrueba;
