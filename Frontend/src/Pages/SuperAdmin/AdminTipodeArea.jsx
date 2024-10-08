import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutPrincipal from '../../Layouts/LayoutPrincipal1';
import Layoutcontenido from '../../Layouts/Layoutcontenido4';
import GridListTipoArea from './GridList/GridListTipoArea';
import Loader from '../../Components/Loader';
import BotonSegundoModal from '../../Components/BotonSegundoModal1';
import ModalTipoAreas from '../../Components/Modales/ModalTipoAreas';

const TipoArea = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tipoAreas, setTipoAreas] = useState([]);
  const navigate = useNavigate();

  // Fetch para obtener los tipos de áreas desde la API
  useEffect(() => {
    const fetchTipoAreas = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/tipos-de-area');
        if (!response.ok) {
          throw new Error('Error al cargar los tipos de área');
        }
        const data = await response.json();
        setTipoAreas(data);
      } catch (error) {
        console.error('Error al cargar tipos de área:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTipoAreas();
  }, []);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Lógica para agregar un nuevo tipo de área
  const handleAddTipoArea = async (newTipoArea) => {
    try {
      const response = await fetch('http://localhost:4000/api/tipos-de-area', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTipoArea),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al registrar el tipo de área: ${errorData.message || response.statusText}`);
      }

      const addedTipoArea = await response.json();
      setTipoAreas(prevTipoAreas => [...prevTipoAreas, addedTipoArea]);
      handleCloseModal();
      window.location.reload();
    } catch (error) {
      console.error('Error al agregar tipo de área:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  const handleGoBack = () => {
    navigate('/SuperAdmin/dashboard');
  };

  return (
    <LayoutPrincipal title="Tipos de Área">
      {loading ? (
        <div id="loader" className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <Layoutcontenido title="Tipos de Área">
          <div className="flex flex-col w-full p-10 mb-10">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleGoBack}
                className="flex items-center text-black hover:text-Verde"
              >
                <i className="fas fa-arrow-left w-5 h-5 mr-2"></i>
                Volver
              </button>
              <BotonSegundoModal text="Agregar Tipo Área" id="addTipoAreaBtn" onClick={handleAddClick} />
            </div>

            {/* Tabla de tipos de área */}
            <div>
              <GridListTipoArea tipoAreas={tipoAreas} setTipoAreas={setTipoAreas} />
            </div>

            {/* Modal para agregar un nuevo tipo de área */}
            {isModalOpen && (
              <ModalTipoAreas
                onClose={handleCloseModal}
                onAddTipoArea={handleAddTipoArea}
              />
            )}
          </div>
        </Layoutcontenido>
      )}
    </LayoutPrincipal>
  );
};

export default TipoArea;
