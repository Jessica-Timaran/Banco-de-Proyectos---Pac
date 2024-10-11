"use client";

import { useState, useEffect } from 'react';
import Loader from '../../../Components/Loader';

const Badge = ({ state }) => {
  let bgColor = 'bg-gray-200';
  let text = 'Desconocido';

  if (state) {
    const lowerState = state.toLowerCase();
    switch (lowerState) {
      case 'aceptado':
        bgColor = 'bg-green-100 text-green-600';
        text = 'Aceptado';
        break;
      case 'rechazado':
        bgColor = 'bg-red-100 text-red-600';
        text = 'Rechazado';
        break;
      case 'devuelto':
        bgColor = 'bg-yellow-100 text-yellow-600';
        text = 'Devuelto';
        break;
      case 'en proceso':
        bgColor = 'bg-orange-100 text-orange-600';
        text = 'En Proceso';
        break;
      default:
        text = state;
    }
  }

  return <span className={`px-2 py-1 text-sm ${bgColor} rounded-lg`}>{text}</span>;
};

export default function GridListProyectos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(104); // Cambia este valor según cuántos elementos quieres por página

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await fetch('https://banco-de-proyectos-pac.onrender.com/api/superAdmin/proyecto');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const proyectos = await response.json();
        console.log('Proyectos obtenidos:', proyectos);
        setData(proyectos);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProyectos();
  }, []);

  // Calcular los índices de los elementos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage; // Último índice de la página actual
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Primer índice de la página actual
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem); // Elementos a mostrar en la página actual

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="w-full max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#2eb694]">
              <tr>
                <th className="px-6 py-3 text-left text-white">Nombre</th>
                <th className="px-6 py-3 text-left text-white">Responsable</th>
                <th className="px-6 py-3 text-left text-white">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((item) => (
                <tr key={item.idproyecto}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.responsable}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge state={item.estado} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Paginación */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-verde text-white' : 'bg-gray-200 text-gray-900'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
    </div>
  );
}
