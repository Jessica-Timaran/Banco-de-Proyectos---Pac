import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutPrincipal from '../../Layouts/LayoutPrincipal1';
import Layoutcontenido from '../../Layouts/Layoutcontenido4';
import GridListItems from './GridList/GridListItems';
import Loader from '../../Components/Loader';
import BotonSegundoModal from '../../Components/BotonSegundoModal1';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import ModalItems from '../../Components/Modales/ModalItems'; // Importar el modal

const Items = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null); // Para manejar el item actual
  const [successMessage, setSuccessMessage] = useState(''); // Mensaje de éxito
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado de envío

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleAddClick = () => {
    setCurrentItem(null);
    setIsModalOpen(true); // Abrir el modal
  };

  const handleGoBack = () => {
    navigate('/SuperAdmin/dashboard'); // Redirigir al dashboard
  };

  const handleAddItem = async (newItem) => {
    if (isSubmitting) return; // Evitar múltiples envíos
    setIsSubmitting(true);

    try {
      const response = await fetch('https://banco-de-proyectos-pac.onrender.com/api/superAdmin/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error('Error al agregar el item');
      }

      setSuccessMessage('Registro exitoso'); // Mostrar mensaje de éxito
      handleCloseModal(); // Cierra el modal
      // Recargar la lista de items
      const updatedResponse = await fetch('https://banco-de-proyectos-pac.onrender.com/api/superAdmin/items');
      const updatedData = await updatedResponse.json();
      setItems(updatedData); // Asegúrate de definir `setItems` en tu estado
    } catch (error) {
      console.error('Error al agregar item:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
    setSuccessMessage(''); // Reiniciar mensaje de éxito al cerrar el modal
  };

  return (
    <LayoutPrincipal title="Items">
      {loading ? (
        <div id="loader" className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <Layoutcontenido title="Items">
          <div className="flex flex-col w-full p-10 mb-10">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleGoBack}
                className="flex items-center text-black hover:text-verde"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Volver
              </button>
              <BotonSegundoModal text="Agregar Items" id="addItemBtn" onClick={handleAddClick} />
            </div>
            {successMessage && (
              <div className="mb-4 text-green-500">
                {successMessage}
              </div>
            )}
            <div>
              <GridListItems />
            </div>
          </div>
          {isModalOpen && (
            <ModalItems
              item={currentItem}
              onClose={handleCloseModal}
              onAddItem={handleAddItem} // Asegúrate de que ModalItems acepte esta prop
            />
          )}
        </Layoutcontenido>
      )}
    </LayoutPrincipal>
  );
};

export default Items;
