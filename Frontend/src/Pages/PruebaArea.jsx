import React, { useEffect, useState } from 'react';
import LayoutPrincipal from '../layouts/LayoutPrincipal.jsx';
import Card from '../Components/Card.jsx';
import Layoutcontenido from '../Layouts/Layoutcontenido.jsx';
import BotonPrincipal from '../Components/BotonPrincipal.jsx';
import Loader from '../Components/Loader.jsx'; // Asegúrate de que este componente Loader existe en React

const PruebaArea = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/areas');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAreas(data);
      } catch (error) {
        console.error('Error al obtener áreas:', error);
        setAreas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAreas();
  }, []);

  if (loading) {
    return <Loader />; // Muestra un loader mientras los datos se están cargando
  }

  return (
    <LayoutPrincipal title="">
      <Layoutcontenido title="">
        <div className="p-8">
          <h1 className="text-3xl font-bold font-josefin-slab">Áreas de Proyectos</h1>
          <p className="text-lg font-josefin-slab">Por favor seleccione el área en la cual se centrará su proyecto</p>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {areas.length > 0 ? (
              areas.map((area) => (
                <div key={area.idarea}>
                  <a href={`/Services/${area.idarea}`}>
                    <Card Text={area.area} />
                  </a>
                </div>
              ))
            ) : (
              <p className="text-lg font-josefin-slab">No se encontraron áreas.</p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 md:p-8">
          <a href="/RegistroProyecto" className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 md:pr-8">
            <BotonPrincipal Text="Volver" />
          </a>
        </div>
      </Layoutcontenido>
    </LayoutPrincipal>
  );
};

export default PruebaArea;
