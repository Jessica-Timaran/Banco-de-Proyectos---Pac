import React, { useEffect, useState } from 'react';
import Card from '../../Components/Card';
import Layoutcontenido from '../../Layouts/Layoutcontenido';
import BotonPrincipal from '../../Components/BotonPrincipal';
import LayoutPrincipal1 from '../../Layouts/LayoutPrincipal1';
import Loader from '../../Components/Loader';


const VistaAreas1 = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch('https://banco-de-proyectos-pac.onrender.com/api/user/areas');
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
      const response = await fetch('https://banco-de-proyectos-pac.onrender.com/api/user/proyectos/seleccionar-area', {
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
    <LayoutPrincipal1 title="">
      <Layoutcontenido title="">
        <div className="p-8">
          <h1 className="text-3xl font-bold font-josefin-slab">Áreas de Proyectos</h1>
          <p className="text-lg font-josefin-slab">Por favor seleccione el área en la cual se centrará su proyecto</p>
        </div>

        <div className="flex justify-center">
          <div className="flex justify-center flex-wrap w-full h-full">
            {areas.map((area) => (
              <Card
                key={area.idarea}
                Text={area.area}
                onClick={() => handleCardClick(area.idarea)} // Pasar la función onClick
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end flex-wrap w-full h-full">
          <a href={`/Usuario/RegistroProyecto/${projectId}`}>
            <BotonPrincipal Text="Volver" />
          </a>
        </div>
      </Layoutcontenido>
    </LayoutPrincipal1>
  );
};

export default VistaAreas1;