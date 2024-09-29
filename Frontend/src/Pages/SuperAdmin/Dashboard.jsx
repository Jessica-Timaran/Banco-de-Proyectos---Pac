import { Title, Text } from '@tremor/react';
import { useEffect, useState } from 'react';
import LayoutPrincipal from '../../Layouts/LayoutPrincipal1';
import Layoutcontenido from '../../Layouts/Layoutcontenido';
import { CardBase } from '../../Components/CardBase';
import Loader from '../../Components/Loader';

const Dashboard = () => {
  // Estado para controlar la carga de la página
  const [loading, setLoading] = useState(true);

  // Estados para cada tabla
  const [counts, setCounts] = useState({
    users: 0,
    fichas: 0,
    proyectos: 0,
    areas: 0,
    tiposArea: 0,
    items: 0,
    objetivos: 0,
    alcances: 0
  });

  useEffect(() => {
    // Simula un tiempo de carga de 2 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Función para obtener los datos de todas las tablas
    const fetchCounts = async () => {
      setLoading(true);
      try {
        const [personasRes, fichasRes, proyectosRes, areasRes, tiposAreaRes, itemsRes, objetivosRes, alcancesRes] = await Promise.all([
          fetch('http://localhost:4000/api/personas'),
          fetch('http://localhost:4000/api/ficha'),
          fetch('http://localhost:4000/api/proyecto'),
          fetch('http://localhost:4000/api/areas'),
          fetch('http://localhost:4000/api/tipos-de-area'),
          fetch('http://localhost:4000/api/items'),
          fetch('http://localhost:4000/api/objetivos'),
          fetch('http://localhost:4000/api/alcances')
        ]);
        


        // Procesa todas las respuestas
        const [personas, fichas, proyectos, areas, tiposArea, items, objetivos, alcances] = await Promise.all([
          personasRes.json(),
          fichasRes.json(),
          proyectosRes.json(),
          areasRes.json(),
          tiposAreaRes.json(),
          itemsRes.json(),
          objetivosRes.json(),
          alcancesRes.json()
        ]);

        // Actualiza los estados con las cantidades
        setCounts({
          users: personas.length,
          fichas: fichas.length,
          proyectos: proyectos.length,
          areas: areas.length,
          tiposArea: tiposArea.length,
          items: items.length,
          objetivos: objetivos.length,
          alcances: alcances.length
        });
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();

    // Limpia el temporizador al desmontar el componente
    return () => clearTimeout(timer);
  }, []);

  return (
    <LayoutPrincipal title="Proyectos">
      {loading ? (
        // Muestra el loader mientras se cargan los datos
        <div id="loader" className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <Layoutcontenido title="">
          {/* Encabezado */}
          <div className="bg-Verde p-4 sm:p-6 md:p-8 lg:p-10 rounded">
            <Title className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold">Bienvenido SuperAdmin</Title>
            <Text className="text-white font-extrabold text-sm sm:text-base md:text-lg">Banco de Proyectos</Text>
          </div>

          {/* Contenedor de tarjetas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-8 sm:mt-12 md:mt-16 z-0 w-full">
            <CardBase
              title="Usuarios"
              metricValue={counts.users}
              progressText="Usuarios Registrados"
              buttonTex="Ver detalle"
              route="/SuperAdmin/usuarios"
            />
            <CardBase
              title="Fichas"
              metricValue={counts.fichas}
              progressText="Aprendices"
              buttonTex="Ver detalle"
              route="/SuperAdmin/ficha"
            />
            <CardBase
              title="Proyectos"
              metricValue={counts.proyectos}
              progressText="Proyectos creados"
              buttonTex="Ver detalle"
              route="/SuperAdmin/proyectos"
            />
            <CardBase
              title="Areas"
              metricValue={counts.areas}
              progressText="Registro proyecto"
              buttonTex="Ver detalle"
              route="/SuperAdmin/areas"
            />
            <CardBase
              title="Tipos de Area"
              metricValue={counts.tiposArea}
              progressText="Registro proyecto"
              buttonTex="Ver detalle"
              route="/SuperAdmin/tipodearea"
            />
            <CardBase
              title="Items"
              metricValue={counts.items}
              progressText="Registro proyecto"
              buttonTex="Ver detalle"
              route="/SuperAdmin/items"
            />
            <CardBase
              title="Objetivo"
              metricValue={counts.objetivos}
              progressText="Registro proyecto"
              buttonTex="Ver detalle"
              route="/SuperAdmin/objetivos"
            />
            <CardBase
              title="Alcance"
              metricValue={counts.alcances}
              progressText="Registro proyecto"
              buttonTex="Ver detalle"
              route="/SuperAdmin/alcance"
            />
            <CardBase
              title="CREAR REGISTRO"
              metricValue={0}
              progressText="Registro de proyecto"
              buttonTex="Ver detalle"
              route="/SuperAdmin/registrocompleto"
            />
          </div>
        </Layoutcontenido>
      )}
    </LayoutPrincipal>
  );
};

export default Dashboard;