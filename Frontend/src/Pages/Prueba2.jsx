import React, { useEffect, useState } from 'react';
import LayoutPrincipal from '../layouts/LayoutPrincipal.jsx';
import Card from '../Components/Card.jsx';
import Layoutcontenido from '../Layouts/Layoutcontenido.jsx';
import BotonPrincipal from '../Components/BotonPrincipal.jsx';
import { useParams, Link } from 'react-router-dom';

const Prueba2 = () => {
  const { id } = useParams();
  const [tipos, setTipos] = useState([]);

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
      }
    };

    if (id) {
      fetchTiposDeArea(id);
    }
  }, [id]);

  return (
    <LayoutPrincipal title="">
      <Layoutcontenido title="">
        <div className="p-8">
          <h1 className="text-3xl font-bold font-josefin-slab">Tipos de Área</h1>
          <p className="text-lg font-josefin-slab">Por favor seleccione el tipo de área en la cual se centrará su proyecto</p>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tipos.length > 0 ? (
              tipos.map((tipo) => (
                <div key={tipo.idtiposdearea}>
                  <Link to={`/Services/${id}-${tipo.idtiposdearea}`}>
                    <Card Text={tipo.tiposdearea} />
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-lg font-josefin-slab">No se encontraron tipos de área.</p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 md:p-8">
          <Link to={`/VistaAreas1`} className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 md:pr-8">
            <BotonPrincipal Text="Volver" />
          </Link>
        </div>
      </Layoutcontenido>
    </LayoutPrincipal>
  );
};

export default Prueba2;
