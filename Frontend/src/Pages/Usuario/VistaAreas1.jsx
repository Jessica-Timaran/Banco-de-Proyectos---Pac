import React, { useEffect, useState } from 'react';
import LayoutPrincipal from '../../layouts/LayoutPrincipal';
import Card from '../../Components/Card';
import Layoutcontenido from '../../Layouts/Layoutcontenido';
import BotonPrincipal from '../../Components/BotonPrincipal';
import Loader from '../../Components/Loader';

const VistaAreas1 = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/user/areas');
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

  const handleCardClick = async (areaId) => {
    const projectId = new URLSearchParams(window.location.search).get('projectId');

    if (!areaId || !projectId) {
      console.error('No se pudo obtener el id del área o del proyecto');
      return;
    }

    try {
      console.log(`Enviando solicitud para seleccionar el área: ${areaId}`);
      const response = await fetch('http://localhost:4000/api/user/proyectos/seleccionar-area', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ areaId, projectId }),
      });

      if (!response.ok) {
        throw new Error(`Error en la respuesta del servidor: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Área seleccionada correctamente:', data);

      // Redirige a la vista TiposDeArea en la carpeta Services, incluyendo projectId en la URL
      window.location.href = `/Usuario/Services/TiposDeArea/${areaId}?projectId=${projectId}`;
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  if (loading) {
    return <Loader />; // Asegúrate de tener un componente Loader
  }

  const projectId = new URLSearchParams(window.location.search).get('projectId'); // Obtener projectId

  return (
    <LayoutPrincipal title="">
      <Layoutcontenido title="">
        <div className="p-8 mx-16">
          <h1 className="text-3xl font-bold font-josefin-slab">Áreas de Proyectos</h1>
          <p className="text-lg font-josefin-slab">Por favor seleccione el área en la cual se centrará su proyecto</p>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {areas.map((area) => (
              <Card
                key={area.idarea}
                Text={area.area}
                onClick={() => handleCardClick(area.idarea)} // Pasar la función onClick
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 md:p-20">
          <a href={`/Usuario/RegistroProyecto/${projectId}`} className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 md:pr-8">
            <BotonPrincipal Text="Volver" />
          </a>
        </div>
      </Layoutcontenido>
    </LayoutPrincipal>
  );
};

export default VistaAreas1;