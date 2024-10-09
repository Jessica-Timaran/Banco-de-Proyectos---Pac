"use client";

import React, { useEffect, useState } from 'react';
import { BarChart } from "@tremor/react";
import Loader from '../Components/Loader';

const dataFormatter = (number) => `$ ${Intl.NumberFormat('us').format(number)}`;

export function BarChart() {
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

  // Agrupar los proyectos por estado (aceptado, rechazado, devuelto, en proceso, otros)
  const agruparPorEstado = (proyectos) => {
    const estados = {
      "Aceptado": 0,
      "Rechazado": 0,
      "Devuelto": 0,
      "En Proceso": 0,
      "Otros": 0,
    };

    proyectos.forEach((proyecto) => {
      // Agrupación según el estado del proyecto
      switch (proyecto.estado.toLowerCase()) {
        case 'aceptado':
          estados["Aceptado"] += 1;
          break;
        case 'rechazado':
          estados["Rechazado"] += 1;
          break;
        case 'devuelto':
          estados["Devuelto"] += 1;
          break;
        case 'en proceso':
          estados["En Proceso"] += 1;
          break;
        default:
          estados["Otros"] += 1; // Otros estados se agrupan bajo "Otros"
          break;
      }
    });

    // Convertir el objeto en un arreglo compatible con el BarChart
    return Object.entries(estados).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const coloresPersonalizados = [
    { name: "Aceptado", color: "green" },
    { name: "Rechazado", color: "red" },
    { name: "Devuelto", color: "yellow" },
    { name: "En Proceso", color: "blue" },
    { name: "Otros", color: "gray" },
  ];

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="mx-auto space-y-12">
      <div className="space-y-3">
        <div className="flex justify-center">
          <BarChart
            data={data}
            index="name"
            categories={coloresPersonalizados.map((group) => group.name)}
            valueFormatter={dataFormatter}
            onValueChange={(value) => console.log(value)}
            yAxisWidth={48}
            colors={coloresPersonalizados.map((group) => group.color)} // Asignar colores personalizados
          />
        </div>
      </div>
    </div>
  );
}
