import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutPrincipal from '../../Layouts/LayoutPrincipal1';
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
  const [fichas, setFichas] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para el envío

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFichas = async () => {
      try {
        const response = await fetch('https://banco-de-proyectos-pac.onrender.com/api/superAdmin/ficha');
        if (!response.ok) {
          throw new Error('Error al cargar las fichas');
        }
        const data = await response.json();
        setFichas(data);
      } catch (error) {
        console.error('Error al cargar fichas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFichas();
  }, []);

  const handleAddClick = () => {
    setCurrentFicha(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentFicha(null);
  };

  const handleAddFicha = async (newFicha) => {
    setIsSubmitting(true); // Iniciar el estado de envío
    try {
      console.log('Intentando registrar nueva ficha:', newFicha);
      const response = await fetch('https://banco-de-proyectos-pac.onrender.com/api/superAdmin/ficha', {
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
      setFichas(prevFichas => [...prevFichas, addedFicha]);
      handleCloseModal();
    } catch (error) {
      console.error('Error detallado al agregar ficha:', error);
    } finally {
      setIsSubmitting(false); // Terminar el estado de envío
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
        <Layoutcontenido>
          <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center pb-6 space-x-4">
              <div className="inline-flex items-center space-x-2">
                <ArrowLeftIcon className="h-6 w-6" aria-hidden="true" onClick={handleGoBack} />
                <span className="text-xl font-bold text-gray-900">Fichas</span>
              </div>
              <BotonSegundoModal text="Añadir" id="addButton" onClick={handleAddClick} />
            </div>

            <GridListFicha fichas={fichas} />

            {/* Modal para agregar nueva ficha */}
            {isModalOpen && (
              <ModalFicha
                onClose={handleCloseModal}
                onAddFicha={handleAddFicha}
                ficha={currentFicha}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
        </Layoutcontenido>
      )}
    </LayoutPrincipal>
  );
};

export default Fichas;
