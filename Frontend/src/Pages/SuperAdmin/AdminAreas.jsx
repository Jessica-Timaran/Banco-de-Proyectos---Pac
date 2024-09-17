import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutPrincipal from '../../layouts/LayoutPrincipal';
import Layoutcontenido from '../../Layouts/Layoutcontenido4';
import GridListArea from './GridList/GridListArea';
import Loader from '../../Components/Loader';
import BotonSegundoModal from '../../Components/BotonSegundoModal';
import Areas from '../../Components/Modales/ModalAreas';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const Area = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [areas, setAreas] = useState([]); // Estado para almacenar las áreas
  const [currentArea, setCurrentArea] = useState(null);
  const [actionType, setActionType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/superAdmin/areas');
        const data = await response.json();
        setAreas(data);
      } catch (error) {
        console.error('Error al obtener las áreas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAreas();
  }, []);

  const handleAddClick = () => {
    setCurrentArea(null);
    setActionType('add');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentArea(null);
  };

  const handleAddArea = (newArea) => {
    // Actualiza el estado con la nueva área
    setAreas((prevAreas) => [...prevAreas, newArea]);
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
              <GridListArea areas={areas} /> {/* Pasa el estado de las áreas */}
            </div>
            {isModalOpen && (
              <Areas
                onClose={handleCloseModal}
                onAddArea={handleAddArea}
                Area={currentArea}
                actionType={actionType}
              />
            )}
          </div>
        </Layoutcontenido>
      )}
    </LayoutPrincipal>
  );
};

export default Area;
