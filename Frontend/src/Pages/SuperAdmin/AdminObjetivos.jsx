import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import LayoutPrincipal from '../../Layouts/LayoutPrincipal1';
import Layoutcontenido from '../../Layouts/Layoutcontenido4';
import GridListObjetivos from './GridList/GridListObjetivos';
import Loader from '../../Components/Loader';
import BotonSegundoModal from '../../Components/BotonSegundoModal1';
import ModalObjetivos from '../../Components/Modales/ModalObjetivos';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const Objetivos = () => {
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

  const handleAddMember = (user) => {
    // Lógica para agregar un objetivo (o usuario)
    console.log('Agregar ', user);

    // Aquí puedes llamar a tu función de agregar objetivo
    // Por ejemplo, si tienes una función para enviar datos a la API:
    // agregarObjetivo(user).then(() => {
    //   // Recargar la página después de agregar
    //   window.location.reload();
    // });

    // Recarga la página directamente como ejemplo
    window.location.reload(); // Recargar la página
  };

  const handleGoBack = () => {
    navigate('/SuperAdmin/dashboard'); // Redirigir al dashboard
  };

  return (
    <LayoutPrincipal title="Objetivos">
      {loading ? (
        <div id="loader" className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <Layoutcontenido title="Objetivos">
          <div className="flex flex-col w-full p-10 mb-10">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleGoBack}
                className="flex items-center text-black hover:text-Verde"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Volver
              </button>
              <BotonSegundoModal text="Agregar Objetivos" id="addUserBtn" onClick={handleAddClick} />
            </div>
            <div>
              <GridListObjetivos />
            </div>
            {isModalOpen && (
              <ModalObjetivos
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

export default Objetivos;
