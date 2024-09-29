import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutPrincipal from '../../Layouts/LayoutPrincipal1';
import Layoutcontenido from '../../Layouts/Layoutcontenido4';
import GridListTipoArea from './GridList/GridListTipoArea';
import Loader from '../../Components/Loader';
import BotonSegundoModal from '../../Components/BotonSegundoModal1';
import TipoAreas from '../../Components/Modales/ModalTipoAreas';

const TipoArea = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTipoArea, setCurrentTipoArea] = useState(null);
  const [actionType, setActionType] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito
  const [reloadTable, setReloadTable] = useState(false); // Estado para recargar la tabla

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

  const handleAddTipoArea = (tipoArea) => {
    // Simular la lógica de agregar un tipo de área
    console.log('Agregar', tipoArea);

    // Mostrar mensaje de éxito
    setSuccessMessage('Registro exitoso');

    // Recargar la tabla
    setReloadTable(true);

    // Cerrar el modal después de un breve retraso
    setTimeout(() => {
      setIsModalOpen(false);
      setSuccessMessage('');
      setReloadTable(false); // Evitar recargar la tabla indefinidamente
    }, 2000);
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
              <BotonSegundoModal text="Agregar Tipo Área" id="addUserBtn" onClick={handleAddClick} />
            </div>

            {/* Mostrar mensaje de éxito si existe */}
            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                {successMessage}
              </div>
            )}

            {/* Recargar la tabla cuando se añade un nuevo tipo de área */}
            <div>
              <GridListTipoArea reload={reloadTable} />
            </div>

            {isModalOpen && (
              <TipoAreas
                onClose={handleCloseModal}
                onAddMember={handleAddTipoArea}
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
