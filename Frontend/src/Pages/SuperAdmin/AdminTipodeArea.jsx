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
  const [currentTipoArea, setCurrentTipoArea] = useState(null);
  const [actionType, setActionType] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [reloadTable, setReloadTable] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleAddClick = () => {
    setCurrentTipoArea(null);
    setActionType('add');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTipoArea(null);
  };

  const handleAddTipoArea = async (tipoArea) => {
    try {
      // Simular la lógica de agregar un tipo de área
      console.log('Agregar', tipoArea);

      const response = await fetch('https://banco-de-proyectos-pac.onrender.com/api/superAdmin/tipos-de-area', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tipoArea),
      });

      if (!response.ok) {
        throw new Error('Error al registrar tipo de área');
      }

      const data = await response.json();
      console.log('Tipo de Área registrado con éxito:', data);

      // Mostrar mensaje de éxito
      setSuccessMessage('Registro exitoso');

      // Recargar la tabla
      setReloadTable(true);

      // Cerrar el modal después de un breve retraso
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccessMessage('');
        setReloadTable(false);
      }, 2000);
    } catch (error) {
      console.error('Error al agregar tipo de área:', error);
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
                className="flex items-center text-black hover:text-verde"
              >
                <i className="fas fa-arrow-left w-5 h-5 mr-2"></i>
                Volver
              </button>
              <BotonSegundoModal text="Agregar Tipo Área" id="addUserBtn" onClick={handleAddClick} />
            </div>

            {/* Mostrar mensaje de éxito si existe */}
            {successMessage && (
              <div className=" text-green-700 px-4 py-3 rounded relative mb-4">
                {successMessage}
              </div>
            )}

            {/* Recargar la tabla cuando se añade un nuevo tipo de área */}
            <div>
              <GridListTipoArea reload={reloadTable} />
            </div>

            {isModalOpen && (
              <ModalTipoAreas
                onClose={handleCloseModal}
                onAddTipoArea={handleAddTipoArea}
                tipoArea={currentTipoArea}
                actionType={actionType}
              />
            )}
          </div>
        </Layoutcontenido>
      )}
    </LayoutPrincipal>
  );
};

export default TipoArea;
