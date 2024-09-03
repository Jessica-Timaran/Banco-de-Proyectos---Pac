// ItemsDeArea.js
import React, { useState, useEffect } from 'react';
import LayoutPrincipal from '../../layouts/LayoutPrincipal';
import Card from '../../Components/Card';
import Layoutcontenido from '../../Layouts/Layoutcontenido';
import BotonPrincipal from '../../Components/BotonPrincipal';
import Loader from '../../Components/Loader';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const ItemsDeArea = () => {
  const { idarea, idtiposdearea } = useParams();
  const location = useLocation();
  const projectId = new URLSearchParams(location.search).get('projectId');
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/items/${idarea}/${idtiposdearea}`);
        if (!response.ok) {
          throw new Error(`Error fetching items: ${response.statusText}`);
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    if (idarea && idtiposdearea) {
      fetchItems();
    }
  }, [idarea, idtiposdearea]);

  const handleCardClick = async (itemId) => {
    if (!itemId || !projectId) {
      console.error('No se pudo obtener el id del ítem o del proyecto');
      return;
    }

    try {
      console.log(`Enviando solicitud para actualizar el ítem: ${itemId}`);
      const response = await fetch('http://localhost:4000/api/update-proyecto-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId, itemId }),
      });

      if (!response.ok) {
        throw new Error(`Error en la respuesta del servidor: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Ítem actualizado correctamente:', data);

      // Redirige a la vista de objetivos, pasando el projectId
      if (idarea) {
        navigate(`/Vista_Objetivos/ObjetivosDeArea/${idarea}/${idtiposdearea}?projectId=${projectId}`);

      } else {
        console.error('ID del área no disponible para redirección.');
      }
    } catch (error) {
      console.error('Error al actualizar el ítem:', error);
    }
  };

  if (loading) {
    return <Loader />; // Asegúrate de tener un componente Loader
  }

  return (
    <LayoutPrincipal title="">
      <Layoutcontenido title="">
        <div className="p-8">
          <h1 className="text-3xl font-bold font-josefin-slab">Items de Áreas</h1>
          <p className="text-lg font-josefin-slab">Por favor seleccione el ítem en el cual se centrará su proyecto</p>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.length > 0 ? (
              items.map(item => (
                <div key={item.iditemsarea} className="card-container">
                  <Card
                    Text={item.items}
                    onClick={() => handleCardClick(item.iditemsarea)}
                  />
                </div>
              ))
            ) : (
              <p className="text-lg font-josefin-slab">No se encontraron ítems.</p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 md:p-8">
          <a href={`/Services/${idarea}`} className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 md:pr-8">
            <BotonPrincipal Text="Volver" />
          </a>
        </div>
      </Layoutcontenido>
    </LayoutPrincipal>
  );
};

export default ItemsDeArea;
