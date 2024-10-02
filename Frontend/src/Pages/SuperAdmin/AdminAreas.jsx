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
  const [currentArea, setCurrentArea] = useState(null);
  const [areas, setAreas] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAreas = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://banco-de-proyectos-pac.onrender.com/api/superAdmin/areas');
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
    setCurrentArea(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentArea(null);
    setSuccessMessage(''); // Reiniciar mensaje de éxito al cerrar el modal
  };

  const handleAddArea = async (newArea) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setLoading(true);

    try {
      const response = await fetch('https://banco-de-proyectos-pac.onrender.com/api/superAdmin/areas', {
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

      setSuccessMessage('Registro exitoso'); // Mostrar mensaje de éxito
      handleCloseModal(); // Cierra el modal inmediatamente después de un registro exitoso
      // Recarga solo la lista de áreas después de agregar
      const updatedResponse = await fetch('https://banco-de-proyectos-pac.onrender.com/api/superAdmin/areas');
      const updatedData = await updatedResponse.json();
      setAreas(updatedData);
    } catch (error) {
      console.error('Error detallado al agregar área:', error);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
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
                className="flex items-center text-black hover:text-verde"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Volver
              </button>
              <BotonSegundoModal text="Agregar Area" id="addUserBtn" onClick={handleAddClick}/>
            </div>
            {successMessage && (
              <div className="mb-4 text-green-500">
                {successMessage}
              </div>
            )}
            <div>
              <GridListArea areas={areas} setAreas={setAreas} />
            </div>
            {isModalOpen && (
              <Areas
                onClose={handleCloseModal}
                onAddArea={handleAddArea}
                area={currentArea}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
        </Layoutcontenido>
      )}
    </LayoutPrincipal>
  );
};

export default Area;
