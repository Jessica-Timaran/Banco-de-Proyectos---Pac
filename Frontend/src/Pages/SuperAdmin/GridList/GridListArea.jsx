import { useState, useEffect } from 'react';


const GridListArea = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch('https://banco-de-proyectos-pac.onrender.com/api/superAdmin/areas');
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
        <thead className="bg-[#2eb694]">
          <tr>
            <th className="px-6 py-3 text-left text-white">Nombre del Área</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 overflow-hidden">
        {data.map((item) => (
              <tr key={item.idarea}>
                <td className="px-6 py-4 whitespace-nowrap">{item.area}</td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default GridListArea;
