import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutPrincipal from '../../Layouts/LayoutPrincipal1';
import Layoutcontenido from '../../Layouts/Layoutcontenido4';
import GridListObjetivos from './GridList/GridListObjetivos';
import Loader from '../../Components/Loader';
import BotonSegundoModal from '../../Components/BotonSegundoModal1';
import ModalObjetivos from '../../Components/Modales/ModalObjetivos';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const Objetivo = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [objetivos, setObjetivos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchObjetivos = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:4000/api/objetivos');
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
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddObjetivo = async (newObjetivo) => {
    try {
      const response = await fetch('http://localhost:4000/api/objetivos', {
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

      const addedObjetivo = await response.json();
      setObjetivos(prevObjetivo => [...prevObjetivo, addedObjetivo]); // Actualizar la lista de items
      handleCloseModal(); // Cerrar el modal
      window.location.reload();
    } catch (error) {
      console.error('Error al agregar item:', error);
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
                className="flex items-center text-black hover:text-Verde"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Volver
              </button>
              <BotonSegundoModal text="Agregar Objetivo" id="addObjetivoBtn" onClick={handleAddClick} />
            </div>
            <div>
              <GridListObjetivos objetivos={objetivos} setObjetivos={setObjetivos} />
            </div>
            {isModalOpen && (
              <ModalObjetivos
                onClose={handleCloseModal}
                onAddObjetivo={handleAddObjetivo}
              />
            )}
          </div>
        </Layoutcontenido>
      )}
    </LayoutPrincipal>
  );
};

export default Objetivo;
