import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutPrincipal from '../../Layouts/LayoutPrincipal1';
import Layoutcontenido from '../../Layouts/Layoutcontenido4';
import GridListAlcance from './GridList/GridListAlcance';
import Loader from '../../Components/Loader';
import BotonSegundoModal from '../../Components/BotonSegundoModal';
import ModalAlcance from '../../Components/Modales/ModalAlcance';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const Alcance = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alcances, setAlcances] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlcances = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:4000/api/alcances');
        if (!response.ok) {
          throw new Error('Error al cargar los alcances');
        }
        const data = await response.json();
        setAlcances(data);
      } catch (error) {
        console.error('Error al cargar alcances:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlcances();
  }, []);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddAlcance = async (newAlcance) => {
    try {
      const response = await fetch('http://localhost:4000/api/alcances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAlcance),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al registrar el alcance: ${errorData.message || response.statusText}`);
      }

      const addedAlcances = await response.json();
      setAlcances(prevAlcances => [...prevAlcances, addedAlcances]);
      handleCloseModal();
      window.location.reload();
    } catch (error) {
      console.error('Error al agregar Alcances:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
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
              <GridListAlcance alcances={alcances} setAlcances={setAlcances} />
            </div>
            {isModalOpen && (
              <ModalAlcance
                onClose={handleCloseModal}
                onAddAlcance={handleAddAlcance}
              />
            )}
          </div>
        </Layoutcontenido>
      )}
    </LayoutPrincipal>
  );
};

export default Alcance;
