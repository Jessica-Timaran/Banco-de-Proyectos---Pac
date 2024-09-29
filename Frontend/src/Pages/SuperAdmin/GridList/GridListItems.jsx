import React, { useState, useEffect } from 'react';
import Loader from '../../../Components/Loader';

const GridListItems = () => {
  const [tiposDeArea, setTiposDeArea] = useState([]);
  const [itemsByTipoDeArea, setItemsByTipoDeArea] = useState({});
  const [loading, setLoading] = useState(true);
  const [openTipo, setOpenTipo] = useState(null); // Estado para controlar qué tipo de área está abierto

  // Cargar todos los tipos de área
  useEffect(() => {
    const fetchTiposDeArea = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/tipos-de-area');
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        setTiposDeArea(data);
      } catch (error) {
        console.error('Error fetching tipos de área:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTiposDeArea();
  }, []);

  // Cargar los items asociados a un tipo de área específico
  const fetchItemsByTipoDeArea = async (idtiposdearea) => {
    if (itemsByTipoDeArea[idtiposdearea]) return; // Evitar volver a cargar si ya se ha cargado antes

    try {
      const response = await fetch(`http://localhost:4000/api/items/${idtiposdearea}`);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();
      setItemsByTipoDeArea((prevItems) => ({
        ...prevItems,
        [idtiposdearea]: data, // Guardar los items por tipo de área
      }));
    } catch (error) {
      console.error('Error fetching items by tipo de área:', error);
    }
  };

  const handleToggleTipo = (idTipoDeArea) => {
    if (openTipo === idTipoDeArea) {
      setOpenTipo(null); // Cerrar si ya está abierto
    } else {
      setOpenTipo(idTipoDeArea); // Abrir el tipo de área
      fetchItemsByTipoDeArea(idTipoDeArea); // Cargar los items si no se han cargado
    }
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
            {tiposDeArea.map((tipoDeArea) => (
              <React.Fragment key={tipoDeArea.idtiposdearea}>
                <tr className="bg-gray-50">
                  <td
                    className="px-6 py-4 whitespace-nowrap cursor-pointer w-full"
                    onClick={() => handleToggleTipo(tipoDeArea.idtiposdearea)}
                  >
                    {openTipo === tipoDeArea.idtiposdearea ? (
                      <i className="fas fa-chevron-down w-5 h-5 mr-2 text-gray-500"></i>
                    ) : (
                      <i className="fas fa-chevron-right w-5 h-5 mr-2 text-gray-500"></i>
                    )}
                    <span className="font-bold text-gray-900">{tipoDeArea.tiposdearea}</span>
                  </td>
                </tr>
                {openTipo === tipoDeArea.idtiposdearea && itemsByTipoDeArea[tipoDeArea.idtiposdearea] && (
                  itemsByTipoDeArea[tipoDeArea.idtiposdearea].map((item) => (
                    <tr key={item.iditemsarea}>
                      <td className="px-6 py-4 whitespace-nowrap pl-16 w-full">
                        <span className="text-gray-900">{item.items}</span>
                      </td>
                    </tr>
                  ))
                )}
              </React.Fragment>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default GridListItems;
