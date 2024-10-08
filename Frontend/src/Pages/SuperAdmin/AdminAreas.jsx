import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutPrincipal from '../../Layouts/LayoutPrincipal1';
import Layoutcontenido from '../../Layouts/Layoutcontenido4';
import GridListArea from './GridList/GridListArea';
import Loader from '../../Components/Loader';
import BotonSegundoModal from '../../Components/BotonSegundoModal';
import Areas from '../../Components/Modales/ModalAreas';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const Area = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [areas, setAreas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAreas = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:4000/api/areas');
        if (!response.ok) {
          throw new Error('Error al cargar las áreas');
        }
        const data = await response.json();
        setAreas(data); // Cambié setFichas a setAreas
      } catch (error) {
        console.error('Error al cargar áreas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAreas();
  }, []);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddArea = async (newArea) => {
    try {
      const response = await fetch('http://localhost:4000/api/areas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newArea),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al registrar el área: ${errorData.message || response.statusText}`);
      }

      const addedArea = await response.json();
      setAreas(prevAreas => [...prevAreas, addedArea]);
      handleCloseModal();
      window.location.reload();
    } catch (error) {
      console.error('Error al agregar areas:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  const handleGoBack = () => {
    navigate('/SuperAdmin/dashboard'); // Redirigir al dashboard
  };

  return (
    <LayoutPrincipal title="Areas">
      {loading ? (
        <div id="loader" className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <Layoutcontenido title="Areas">
          <div className="flex flex-col w-full p-10 mb-10">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleGoBack}
                className="flex items-center text-black hover:text-Verde"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Volver
              </button>
              <BotonSegundoModal text="Agregar Area" id="addUserBtn" onClick={handleAddClick}/>
            </div>
            <div>
              <GridListArea areas={areas} setAreas={setAreas} />
            </div>
            {isModalOpen && (
              <Areas
                onClose={handleCloseModal}
                onAddArea={handleAddArea}
              />
            )}
          </div>
        </Layoutcontenido>
      )}
    </LayoutPrincipal>
  );
};

export default Area;
