import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import LayoutPrincipal from '../../layouts/LayoutPrincipal';
import Layoutcontenido from '../../Layouts/Layoutcontenido4';
import GridListAlcance from './GridList/GridListAlcance';
import Loader from '../../Components/Loader';
import BotonSegundoModal from '../../Components/BotonSegundoModal';
import ModalAlcance from '../../Components/Modales/ModalAlcance';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const Area = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [actionType, setActionType] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleAddClick = () => {
    setCurrentUser(null);
    setActionType('add');
    setIsModalOpen(true); // Abrir el modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cerrar el modal
    setCurrentUser(null);
  };

  const handleAddMember = (alcance) => {
    // Lógica para agregar un usuario
    console.log('Agregar', alcance);
  };


  const handleGoBack = () => {
    navigate('/SuperAdmin/dashboard'); // Redirigir al dashboard
  };

  

  return (
    <LayoutPrincipal title="Alcance">
      {loading ? (
        <div id="loader" className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <Layoutcontenido title="Alcance">
          <div className="flex flex-col w-full p-10 mb-10">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleGoBack}
                className="flex items-center text-black hover:text-Verde"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Volver
              </button>
              <BotonSegundoModal text="Agregar Alcance" id="addUserBtn" onClick={handleAddClick} />
            </div>
            <div>
              <GridListAlcance />
            </div>
            {isModalOpen && (
              <ModalAlcance
                onClose={handleCloseModal}
                onAddMember={handleAddMember}
                user={currentUser}
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
