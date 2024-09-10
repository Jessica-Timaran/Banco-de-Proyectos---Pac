import { useState, useEffect } from 'react';
import Loader from '../../../Components/Loader';


const GridListProyectos = () => {
  const [data, setData] = useState([]); // Inicializa el estado con un array vacío
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/proyecto');
        const proyectos = await response.json();
        setData(proyectos);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false); // Oculta el loader después de la carga
      }
    };

    fetchProyectos();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#A3E784]">
          <tr>
            <th className="px-6 py-3 text-left text-gray-900">Nombre</th>
            <th className="px-6 py-3 text-left text-gray-900">Responsable</th>
            <th className="px-6 py-3 text-left text-gray-900">Estado</th>
          </tr>
        </thead>
        {loading ? (
        <div id="loader" className="flex items-center justify-center h-screen absolute inset-0">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex-grow" /> {/* Espaciador superior */}
            <Loader />
            <div className="flex-grow" /> {/* Espaciador inferior */}
          </div>
        </div>
      ) : (
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.idproyecto}>
              <td className="px-6 py-4 whitespace-nowrap">{item.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.responsable}</td>
            </tr>
          ))}
        </tbody>
      )}
      </table>
    </div>
  );
}


export default GridListProyectos;