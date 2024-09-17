import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutPrincipal from '../../layouts/LayoutPrincipal';
import Layoutcontenido from '../../Layouts/Layoutcontenido4';
import GridListItems from './GridList/GridListItems';
import Loader from '../../Components/Loader';
import BotonSegundoModal from '../../Components/BotonSegundoModal';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import ModalItems from '../../Components/Modales/ModalItems'; // Importar el modal

const Area = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null); // Para manejar el item actual
  const [actionType, setActionType] = useState(''); // Acción actual: 'add', 'edit', 'delete'

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleAddClick = () => {
    setCurrentItem(null);
    setActionType('add');
    setIsModalOpen(true); // Abrir el modal
  };

  const handleEditClick = (item) => {
    setCurrentItem(item);
    setActionType('edit');
    setIsModalOpen(true); // Abrir el modal
  };

  const handleDeleteClick = (item) => {
    setCurrentItem(item);
    setActionType('delete');
    setIsModalOpen(true); // Abrir el modal
  };

  const handleGoBack = () => {
    navigate('/SuperAdmin/dashboard'); // Redirigir al dashboard
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
              <BotonSegundoModal text="Agregar Items" id="addItemBtn" onClick={handleAddClick} />
            </div>
            <div>
              <GridListItems onEdit={handleEditClick} onDelete={handleDeleteClick} />
            </div>
          </div>
          {isModalOpen && (
            <ModalItems
              actionType={actionType}
              item={currentItem}
              onClose={() => setIsModalOpen(false)}
              onSuccess={() => {
                setIsModalOpen(false);
                // Aquí puedes hacer una actualización de la lista de items si es necesario
              }}
            />
          )}
        </Layoutcontenido>
      )}
    </LayoutPrincipal>
  );
};

export default Area;