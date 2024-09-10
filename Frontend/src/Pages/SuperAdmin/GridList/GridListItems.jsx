import React from 'react';
import { useState, useEffect } from 'react';
import Loader from '../../../Components/Loader';

const GridListArea = () => {
  const [areas, setAreas] = useState([]);
  const [tipos, setTipos] = useState({});
  const [loading, setLoading] = useState(true);
  const [openAreas, setOpenAreas] = useState({});

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/areas');
        if (!response.ok) {
          throw new Error(`Error fetching areas: ${response.statusText}`);
        }
        const data = await response.json();
        setAreas(data);
      } catch (error) {
        console.error('Error fetching areas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAreas();
  }, []);

  const fetchTiposDeArea = async (idArea) => {
    try {
      const response = await fetch(`http://localhost:4000/api/tipos-de-area/${idArea}`);
      if (!response.ok) {
        throw new Error(`Error fetching tipos de area: ${response.statusText}`);
      }
      const data = await response.json();
      setTipos((prevTipos) => ({
        ...prevTipos,
        [idArea]: data
      }));
    } catch (error) {
      console.error('Error fetching tipos de area:', error);
    }
  };

  const handleToggleArea = (idArea) => {
    setOpenAreas((prevOpenAreas) => {
      const isCurrentlyOpen = prevOpenAreas[idArea];
      return { ...prevOpenAreas, [idArea]: !isCurrentlyOpen };
    });

    if (!tipos[idArea]) {
      fetchTiposDeArea(idArea);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#A3E784]">
          <tr>
            <th className="px-6 py-3 text-left text-gray-900 w-full">Nombre del Área</th>
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
            {areas.map((area) => (
              <React.Fragment key={area.idarea}>
                <tr className="bg-gray-100">
                  <td
                    className="px-6 py-4 whitespace-nowrap flex items-center w-full"
                    onClick={() => handleToggleArea(area.idarea)}
                  >
                    {openAreas[area.idarea] ? (
                      <i className="fas fa-chevron-up w-5 h-5 mr-2" />
                    ) : (
                      <i className="fas fa-chevron-down w-5 h-5 mr-2" />
                    )}
                    <span className="font-bold text-gray-900">{area.area}</span>
                  </td>
                </tr>
                {openAreas[area.idarea] && tipos[area.idarea] && tipos[area.idarea].map((tipo) => (
                  <tr key={tipo.idtipoarea}>
                    <td className="px-6 py-4 whitespace-nowrap pl-8 w-full" colSpan="2">
                      <div className="flex justify-between">
                      <span className="font-medium text-gray-900">{tipo.tiposdearea}</span>
                        </div>
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


export default GridListArea;