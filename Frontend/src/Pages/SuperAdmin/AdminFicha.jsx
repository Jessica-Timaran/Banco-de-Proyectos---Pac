import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutPrincipal from '../../layouts/LayoutPrincipal';
import Layoutcontenido from '../../Layouts/Layoutcontenido4';
import GridListFicha from './GridList/GridListFicha';
import Loader from '../../Components/Loader';
import BotonSegundoModal from '../../Components/BotonSegundoModal';
import ModalFicha from '../../Components/Modales/ModalFichas';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const Fichas = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFicha, setCurrentFicha] = useState(null);
  const [actionType, setActionType] = useState('');
  const [fichas, setFichas] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleAddClick = () => {
    setCurrentFicha(null);
    setActionType('add');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentFicha(null);
  };

  const handleAddFicha = async (newFicha) => {
    try {
      console.log('Intentando registrar nueva ficha:', newFicha);
      const response = await fetch('http://localhost:4000/api/registerFicha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFicha)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al registrar la ficha: ${errorData.message || response.statusText}`);
      }

      const addedFicha = await response.json();
      console.log('Ficha registrada exitosamente:', addedFicha);
      setFichas(prevFichas => [...prevFichas, addedFicha]);
      handleCloseModal();
    } catch (error) {
      console.error('Error detallado al agregar ficha:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  const handleGoBack = () => {
    navigate('/SuperAdmin/dashboard');
  };

  return (
    <LayoutPrincipal title="Fichas">
      {loading ? (
        <div id="loader" className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <Layoutcontenido title="Fichas">
          <div className="flex flex-col w-full p-10 mb-10">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleGoBack}
                className="flex items-center text-black hover:text-Verde"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Volver
              </button>
              <BotonSegundoModal text="Agregar Ficha" id="addFichaBtn" onClick={handleAddClick} />
            </div>
            <div>
              <GridListFicha fichas={fichas} setFichas={setFichas} />
            </div>
            {isModalOpen && (
              <ModalFicha
                onClose={handleCloseModal}
                onAddFicha={handleAddFicha}
                actionType={actionType}
                Ficharea={currentFicha}
              />
            )}
          </div>
        </Layoutcontenido>
      )}
    </LayoutPrincipal>
  );
};

export default Fichas;