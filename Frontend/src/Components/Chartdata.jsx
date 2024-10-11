import React, { useEffect, useState } from 'react';
import { BarChart } from '@tremor/react';
import Loader from '../Components/Loader';

const dataFormatter = (number) => 
  Intl.NumberFormat('us').format(number).toString();

export function Chartdata() {
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

  const agruparPorEstado = (proyectos) => {
    const estados = {
      'Proyectos aceptados': 0,
      'Proyectos rechazados': 0,
      'Proyectos devueltos': 0,
      'Proyectos en proceso': 0,
    };

    proyectos.forEach((proyecto) => {
      const estadoNormalizado = proyecto.estado.toLowerCase();

      switch (estadoNormalizado) {
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

    return [
      {
        name: '',
        'Proyectos aceptados': estados['Proyectos aceptados'],
        'Proyectos rechazados': estados['Proyectos rechazados'],
        'Proyectos devueltos': estados['Proyectos devueltos'],
        'Proyectos en proceso': estados['Proyectos en proceso'],
      }
    ];
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <p className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Total de proyectos en el sistema
      </p>
      <BarChart
        className="mt-6"
        data={data}
        index="name"
        categories={['Proyectos aceptados', 'Proyectos rechazados', 'Proyectos devueltos', 'Proyectos en proceso']}
        colors={['green', 'red', 'yellow', 'orange']}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    </>
  );
}