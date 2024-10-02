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
  const [currentAlcance, setCurrentAlcance] = useState(null);
  const [alcances, setAlcances] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlcances = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://banco-de-proyectos-pac.onrender.com/api/superAdmin/alcances');
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
    setCurrentAlcance(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentAlcance(null);
    setSuccessMessage(''); // Reiniciar mensaje de éxito al cerrar el modal
  };

  const handleAddAlcance = async (newAlcance) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setLoading(true);

    try {
      const response = await fetch('https://banco-de-proyectos-pac.onrender.com/api/superAdmin/alcances', {
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

      setSuccessMessage('Registro exitoso'); // Mostrar mensaje de éxito
      handleCloseModal(); // Cierra el modal inmediatamente después de un registro exitoso
      // Recarga solo la lista de alcances después de agregar
      const updatedResponse = await fetch('https://banco-de-proyectos-pac.onrender.com/api/superAdmin/alcances');
      const updatedData = await updatedResponse.json();
      setAlcances(updatedData);
    } catch (error) {
      console.error('Error detallado al agregar alcance:', error);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
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
                className="flex items-center text-black hover:text-verde"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Volver
              </button>
              <BotonSegundoModal text="Agregar Alcance" id="addUserBtn" onClick={handleAddClick} />
            </div>
            {successMessage && (
              <div className="mb-4 text-green-500">
                {successMessage}
              </div>
            )}
            <div>
              <GridListAlcance alcances={alcances} setAlcances={setAlcances} />
            </div>
            {isModalOpen && (
              <ModalAlcance
                onClose={handleCloseModal}
                onAddAlcance={handleAddAlcance}
                alcance={currentAlcance}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
        </Layoutcontenido>
      )}
    </LayoutPrincipal>
  );
};

export default Alcance;
