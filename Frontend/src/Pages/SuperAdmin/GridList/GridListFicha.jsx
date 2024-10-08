import { useEffect, useState } from 'react';
import React from 'react';
import Loader from '../../../Components/Loader';

const GridListFicha = () => {
  const [fichas, setFichas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openFichas, setOpenFichas] = useState({}); // Maneja el estado de las fichas abiertas

  // Función para obtener las fichas del servidor
  const fetchFichas = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://banco-de-proyectos-pac.onrender.com/api/superAdmin/ficha');
      if (!response.ok) throw new Error(`Error al obtener las fichas: ${response.statusText}`);

      const fichasData = await response.json();
      setFichas(fichasData);
    } catch (error) {
      console.error('Error al obtener las fichas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Efecto para cargar las fichas al montar el componente
  useEffect(() => {
    fetchFichas();
  }, []);

  // Función para alternar la visibilidad de las fichas
  const handleToggleFicha = (idficha) => {
    setOpenFichas((prevOpenFichas) => ({
      ...prevOpenFichas,
      [idficha]: !prevOpenFichas[idficha], // Alterna el estado abierto/cerrado
    }));
  };

  // Mostrar el loader mientras se cargan los datos
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-x-auto sm:overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 table-auto">
        <thead className="bg-[#2eb694]">
          <tr>
            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm md:text-base text-white">
              Nombre del Ficha
            </th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm md:text-base text-white">
              Número ficha
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {fichas.map((ficha) => (
            <React.Fragment key={ficha.idficha}>
              {/* Fila principal de cada ficha */}
              <tr
                className="bg-gray-50 cursor-pointer"
                onClick={() => handleToggleFicha(ficha.idficha)} // Alterna la visibilidad de los detalles de la ficha
              >
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm md:text-base flex items-center">
                  {openFichas[ficha.idficha] ? (
                    <i className="fas fa-chevron-up w-5 h-5 mr-2" />
                  ) : (
                    <i className="fas fa-chevron-down w-5 h-5 mr-2" />
                  )}
                  {ficha.nombre}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm md:text-base">
                  {ficha.numeroficha}
                </td>
              </tr>

              {/* Detalles de la ficha, visibles solo si está expandida */}
              {openFichas[ficha.idficha] && (
                <tr>
                  <td colSpan="2" className="px-6 py-4 whitespace-nowrap bg-gray-100">
                    {/* Aquí podrías agregar más información sobre la ficha */}
                    <div className="text-sm text-gray-700">
                      Detalles adicionales de la ficha <strong>{ficha.nombre}</strong>...
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GridListFicha;
