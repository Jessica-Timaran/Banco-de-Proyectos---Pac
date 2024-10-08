import React, { useEffect, useState } from 'react';
import { DonutChart } from '@tremor/react';
import Loader from '../Components/Loader'; // Si tienes un componente de loader personalizado

const dataFormatter = (number) => `$ ${Intl.NumberFormat('us').format(number)}`;

export const ChartDonut = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await fetch('https://banco-de-proyectos-pac.onrender.com/api/superAdmin/proyecto');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const proyectos = await response.json();
        console.log('Proyectos obtenidos:', proyectos);
        
        // Agrupar los proyectos por estado
        const proyectosAgrupados = agruparPorEstado(proyectos);
        setData(proyectosAgrupados);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProyectos();
  }, []);

  // Función para agrupar los proyectos por estado
  const agruparPorEstado = (proyectos) => {
    const estados = {
      'Proyectos aceptados': 0,
      'Proyectos rechazados': 0,
      'Proyectos devueltos': 0,
      'Proyectos en proceso': 0,
    };

    proyectos.forEach((proyecto) => {
      switch (proyecto.estado.toLowerCase()) {
        case 'aceptado':
          estados['Proyectos aceptados'] += 1;
          break;
        case 'rechazado':
          estados['Proyectos rechazados'] += 1;
          break;
        case 'devuelto':
          estados['Proyectos devueltos'] += 1;
          break;
        case 'en proceso':
          estados['Proyectos en proceso'] += 1;
          break;
        default:
          break;
      }
    });

    // Convertir el objeto en un arreglo compatible con el DonutChart
    return Object.entries(estados).map(([name, value]) => ({
      name,
      value,
    }));
  };

  if (loading) {
    return <Loader />; // Reemplaza esto por tu componente de loading
  }

  return (
    <div className="mx-auto space-y-12">
      <div className="space-y-3">
        <div className="flex justify-center">
          <DonutChart
            data={data}
            variant="donut"
            valueFormatter={dataFormatter}
            onValueChange={(value) => console.log(value)}
            colors={["green", "red", "orange", "yellow"]}
          />
        </div>
      </div>
    </div>
  );
};
