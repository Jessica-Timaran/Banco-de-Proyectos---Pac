import React, { useState, useEffect } from 'react';
import Loader from '../../../Components/Loader';

const GridListObjetivos = () => {
  const [categorias, setCategorias] = useState([]);
  const [groupedObjetivos, setGroupedObjetivos] = useState({});
  const [loading, setLoading] = useState(true);
  const [openCategorias, setOpenCategorias] = useState({});

  useEffect(() => {
    const fetchObjetivos = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/superAdmin/objetivos');
        if (!response.ok) {
          throw new Error(`Error fetching objetivos: ${response.statusText}`);
        }
        const data = await response.json();

        // Agrupar los objetivos por categoría
        const grouped = data.reduce((acc, objetivo) => {
          if (!acc[objetivo.categoria]) {
            acc[objetivo.categoria] = [];
          }
          acc[objetivo.categoria].push(objetivo);
          return acc;
        }, {});
        setCategorias(Object.keys(grouped));
        setGroupedObjetivos(grouped);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching objetivos:', error);
        setLoading(false);
      }
    };

    fetchObjetivos();
  }, []);

  const handleToggleCategoria = (categoria) => {
    setOpenCategorias((prevOpenCategorias) => ({
      ...prevOpenCategorias,
      [categoria]: !prevOpenCategorias[categoria],
    }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#A3E784]">
          <tr>
            <th className="px-6 py-3 text-left text-gray-900 w-full">Nombre de la Categoría</th>
          </tr>
        </thead>
        {loading ? (
          <tbody>
            <tr>
              <td colSpan="2" className="flex items-center justify-center h-screen">
                <div className="flex flex-col items-center justify-center h-full">
                  <Loader />
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="min-w-full bg-white divide-y divide-gray-200">
            {categorias.map((categoria) => (
              <React.Fragment key={categoria}>
                <tr className="bg-gray-50">
                  <td
                    className="px-6 py-4 whitespace-nowrap flex items-center w-full"
                    onClick={() => handleToggleCategoria(categoria)}
                  >
                  {openCategorias[categoria] ? (
                    <i className="fas fa-chevron-up w-5 h-5 mr-2" />
                    ) : (
                      <i className="fas fa-chevron-down w-5 h-5 mr-2" />
                    )}
                    <span className="font-bold text-gray-900">{categoria}</span>
                  </td>
                </tr>
                {openCategorias[categoria] && groupedObjetivos[categoria] && groupedObjetivos[categoria].map((objetivo) => (
                  <tr key={objetivo.idobjetivos}>
                    <td className="px-6 py-4 whitespace-nowrap pl-8 w-full" colSpan="2">
                        <span className="font-medium text-gray-900">{objetivo.descripcion}</span>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};


export default GridListObjetivos;
