import { useEffect, useState } from 'react';
import Loader from '../../../Components/Loader';

const GridListFicha = () => {
  const [fichas, setFichas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  // Función para obtener las fichas del servidor
  const fetchFichas = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:4000/api/ficha');
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

  // Mostrar el loader mientras se cargan los datos
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-x-auto sm:overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 table-auto">
        <thead className="bg-[#A3E784]">
          <tr>
            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm md:text-base text-gray-900">Nombre del Ficha</th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm md:text-base text-gray-900">Número ficha</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {fichas.map((item) => (
            <tr key={item.idficha}>
              <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm md:text-base">{item.nombre}</td>
              <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm md:text-base">{item.numeroficha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GridListFicha;