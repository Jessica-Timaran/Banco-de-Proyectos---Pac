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
  const [currentObjetivo, setCurrentObjetivo] = useState(null);
  const [objetivos, setObjetivos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchObjetivos = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://banco-de-proyectos-pac.onrender.com/api/superAdmin/objetivos');
        if (!response.ok) {
          throw new Error('Error al cargar los objetivos');
        }
        const data = await response.json();
        setObjetivos(data);
      } catch (error) {
        console.error('Error al cargar objetivos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchObjetivos();
  }, []);

  const handleAddClick = () => {
    setCurrentObjetivo(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentObjetivo(null);
    setSuccessMessage(''); // Reiniciar mensaje de éxito al cerrar el modal
  };

  const handleAddObjetivo = async (newObjetivo) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setLoading(true);

    try {
      const response = await fetch('https://banco-de-proyectos-pac.onrender.com/api/superAdmin/objetivos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newObjetivo),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al registrar el objetivo: ${errorData.message || response.statusText}`);
      }

      handleCloseModal(); // Cierra el modal inmediatamente después de un registro exitoso
      setSuccessMessage('Registro exitoso'); // Mostrar mensaje de éxito
      setObjetivos((prevObjetivos) => [...prevObjetivos, newObjetivo]); // Añade el nuevo objetivo a la lista
    } catch (error) {
      console.error('Error detallado al agregar objetivo:', error);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
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
                className="flex items-center text-black hover:text-verde"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Volver
              </button>
              <BotonSegundoModal text="Agregar Objetivo" id="addObjetivoBtn" onClick={handleAddClick} />
            </div>
            {successMessage && (
              <div className="mb-4 text-green-500">
                {successMessage}
              </div>
            )}
            <div>
              <GridListObjetivos objetivos={objetivos} setObjetivos={setObjetivos} />
            </div>
            {isModalOpen && (
              <ModalObjetivos
                onClose={handleCloseModal}
                onAddObjetivo={handleAddObjetivo}
                objetivo={currentObjetivo}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
        </Layoutcontenido>
      )}
    </LayoutPrincipal>
  );
};

export default Objetivos;

