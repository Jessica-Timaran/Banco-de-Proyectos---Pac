import { useEffect } from 'react';
import Loader from '../../../Components/Loader';

const GridListFicha = ({ fichas, setFichas }) => {
  const Badge = ({ variant, children }) => {
    const bgColor = variant === 'active' ? 'bg-green-200' : 'bg-red-200';
    return <span className={`px-2 py-1 text-sm ${bgColor} rounded-lg`}>{children}</span>;
  };

  useEffect(() => {
    const fetchFichas = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/ficha');
        const fichasData = await response.json();
        setFichas(fichasData);
      } catch (error) {
        console.error('Error al obtener las fichas:', error);
      }
    };

    fetchFichas();
  }, [setFichas]);

  if (fichas.length === 0) {
    return <Loader />;
  }

  return (
    <div className="w-full max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#A3E784]">
          <tr>
            <th className="px-6 py-3 text-left text-gray-900">Nombre del Ficha</th>
            <th className="px-6 py-3 text-left text-gray-900">Estado</th>
            <th className="px-6 py-3 text-left text-gray-900">Número ficha</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 overflow-hidden">
          {fichas.map((item) => (
            <tr key={item.idficha}>
              <td className="px-6 py-4 whitespace-nowrap">{item.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge variant={item.estado ? 'active' : 'inactive'}>
                  {item.estado ? 'Activo' : 'Inactivo'}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.numeroficha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GridListFicha;