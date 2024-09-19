// TiposDeArea.js
import React, { useState, useEffect } from 'react';
import Card from "../../../Components/Card";
import Layoutcontenido from '../../../Layouts/Layoutcontenido';
import BotonPrincipal from "../../../Components/BotonPrincipal";
import Loader from '../../../Components/Loader';
import LayoutPrincipal from '../../../layouts/LayoutPrincipal';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';

const TiposDeArea = () => {
  const { id } = useParams();
  const location = useLocation();
  const projectId = new URLSearchParams(location.search).get('projectId');
  const navigate = useNavigate();

  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTiposDeArea = async (idArea) => {
      try {
        const response = await fetch(`http://localhost:4000/api/user/tipos-de-area/${idArea}`);
        if (!response.ok) {
          throw new Error(`Error fetching tipos de area: ${response.statusText}`);
        }
        const data = await response.json();
        setTipos(data);
      } catch (error) {
        console.error('Error fetching tipos de area:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTiposDeArea(id);
    }
  }, [id]);

  const handleCardClick = async (tipoId) => {
    if (!tipoId || !projectId) {
      console.error('No se pudo obtener el id del tipo o del proyecto');
      return;
    }
  
    try {
      console.log('Enviando solicitud para actualizar el proyecto...');
      const response = await fetch('http://localhost:4000/api/user/update-proyecto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId, tipoId }),
      });
  
      if (!response.ok) {
        throw new Error('Error updating proyecto: ' + response.statusText);
      }
  
      const result = await response.json();
      console.log('Proyecto actualizado correctamente:', result);
  
      // Guarda la URL de TiposDeArea en localStorage
      const returnUrl = `/Usuario/Services/TiposDeArea/${id}?projectId=${projectId}`;
      localStorage.setItem('tiposReturnUrl', returnUrl);
  
      // Redirige a ItemsDeArea
      navigate(`/Usuario/Services/ItemsDeArea/${id}/${tipoId}?projectId=${projectId}`);
    } catch (error) {
      console.error('Error al actualizar el proyecto:', error);
    }
  };
  

  if (loading) {
    return <Loader />;  // Puedes reemplazar esto con un componente Loader si lo tienes
  }

  return (
    <LayoutPrincipal title="">
      <Layoutcontenido title="">
        <div className="p-8 mx-16">
          <h1 className="text-3xl font-bold font-josefin-slab">Tipos de Área</h1>
          <p className="text-lg font-josefin-slab">Por favor seleccione el tipo de área en la cual se centrará su proyecto</p>
        </div>

        <div className="flex justify-center">
        <div className="flex justify-center flex-wrap w-full h-full">
            {tipos.length > 0 ? (
              tipos.map(tipo => (
                <div key={tipo.idtiposdearea} className="card-container">
                  <Card 
                    Text={tipo.tiposdearea} 
                    onClick={() => handleCardClick(tipo.idtiposdearea)} 
                  />
                </div>
              ))
            ) : (
              <p className="text-lg font-josefin-slab">No se encontraron tipos de área.</p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 md:p-20">
          <Link to={`/Usuario/VistaAreas1?projectId=${projectId}`} >
            <BotonPrincipal Text="Volver" />
          </Link>
        </div>
      </Layoutcontenido>
    </LayoutPrincipal>
  );
};

export default TiposDeArea;
