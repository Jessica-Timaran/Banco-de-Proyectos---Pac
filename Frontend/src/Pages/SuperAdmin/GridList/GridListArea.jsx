import { useState, useEffect } from 'react';
import Loader from '../../../Components/Loader';

const GridListArea = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/superAdmin/areas');
        const areas = await response.json();
        setData(areas);
      } catch (error) {
        console.error('Error al obtener áreas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAreas();
  }, []);


  return (
    <div className="w-full max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#A3E784]">
          <tr>
            <th className="px-6 py-3 text-left text-gray-900">Nombre del Área</th>
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
        <tbody className="bg-white divide-y divide-gray-200 overflow-hidden">
        {data.map((item) => (
              <tr key={item.idarea}>
                <td className="px-6 py-4 whitespace-nowrap">{item.area}</td>
              </tr>
          ))}
        </tbody>
      )}
      </table>
    </div>
  );
};


export default GridListArea;
