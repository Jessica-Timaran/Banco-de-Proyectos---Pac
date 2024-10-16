import { useEffect, useState } from 'react';


const GridListFicha = () => {
  const [fichas, setFichas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Función para obtener las fichas del servidor
  const fetchFichas = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://banco-de-proyectos-pac.onrender.com/api/superAdmin/ficha');
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
          {fichas.map((item) => (
            <tr key={item.idficha}>
              <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm md:text-base">
                {item.nombre}
              </td>
              <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm md:text-base">
                {item.numeroficha}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GridListFicha;  