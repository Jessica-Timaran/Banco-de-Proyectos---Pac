import React, { useEffect, useState } from 'react';
import LayoutPrincipal from '../layouts/LayoutPrincipal.jsx';
import Card from '../Components/Card.jsx';
import Layoutcontenido from '../Layouts/Layoutcontenido.jsx';
import BotonPrincipal from '../Components/BotonPrincipal.jsx';
import Loader from '../Components/Loader.jsx'; // Asegúrate de que este componente Loader existe en React

const PruebaLoader = ({ id }) => {
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTiposDeArea = async (idArea) => {
      try {
        const response = await fetch(`http://localhost:4000/api/tipos-de-area/${idArea}`);
        if (!response.ok) {
          throw new Error(`Error fetching tipos de area: ${response.statusText}`);
        }
        const data = await response.json();
        setTipos(data);
      } catch (error) {
        console.error('Error fetching tipos de area:', error);
        setTipos([]);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTiposDeArea(id);
    } else {
      setLoading(false);
    }
  }, [id]);

  return (
    <LayoutPrincipal title="">
      <Layoutcontenido title="">
        <div className="p-8">
          <h1 className="text-3xl font-bold font-josefin-slab">Tipos de Área</h1>
          <p className="text-lg font-josefin-slab">Por favor seleccione el área en la cual se centrará su proyecto</p>
        </div>

        {loading ? (
          <Loader /> // Muestra un loader mientras se cargan los datos
        ) : (
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tipos.length > 0 ? (
                tipos.map(tipo => (
                  <div key={tipo.idtiposdearea}>
                    <a href={`/Services/${id}-${tipo.idtiposdearea}`}>
                      <Card Text={tipo.tiposdearea} />
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-lg font-josefin-slab">No se encontraron tipos de área.</p>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 md:p-8">
          <a href="/VistaAreas1" className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 md:pr-8">
            <BotonPrincipal Text="Volver" />
          </a>
        </div>
      </Layoutcontenido>
    </LayoutPrincipal>
  );
};

export default PruebaLoader;
