import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutPrincipal from '../../layouts/LayoutPrincipal';
import Layoutcontenido from '../../Layouts/Layoutcontenido4';
import GridListItems from './GridList/GridListItems';
import Loader from '../../Components/Loader';
import BotonSegundoModal from '../../Components/BotonSegundoModal';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const Area = () => {
  const [loading, setLoading] = useState(true);
  const [, setIsModalOpen] = useState(false);
  const [, setCurrentUser] = useState(null);
  const [, setActionType] = useState('');

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

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setActionType('edit');
    setIsModalOpen(true); // Abrir el modal
  };

  const handleDeleteClick = (user) => {
    setCurrentUser(user);
    setActionType('delete');
    setIsModalOpen(true); // Abrir el modal
  };


  const handleGoBack = () => {
    navigate('/dashboard'); // Redirigir al dashboard
  };

  

  return (
    <LayoutPrincipal title="Items">
      {loading ? (
        <div id="loader" className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <Layoutcontenido title="Items">
          <div className="flex flex-col w-full p-10 mb-10">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleGoBack}
                className="flex items-center text-black hover:text-Verde"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Volver
              </button>
              <BotonSegundoModal text="Agregar Tipo Area" id="addUserBtn" onClick={handleAddClick} />
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <GridListItems onEdit={handleEditClick} onDelete={handleDeleteClick} />
            </div>
          </div>
        </Layoutcontenido>
      )}
    </LayoutPrincipal>
  );
};

export default Area;