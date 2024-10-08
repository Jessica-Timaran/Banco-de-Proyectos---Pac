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
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  // Fetch para obtener los items desde la API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/items');
        if (!response.ok) {
          throw new Error('Error al cargar los items');
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error al cargar items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleAddClick = () => {
    setIsModalOpen(true); // Abrir el modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cerrar el modal
  };

  // Lógica para agregar un nuevo item
  const handleAddItem = async (newItem) => {
    try {
      const response = await fetch('http://localhost:4000/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al registrar el item: ${errorData.message || response.statusText}`);
      }

      const addedItem = await response.json();
      setItems(prevItems => [...prevItems, addedItem]); // Actualizar la lista de items
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
                className="flex items-center text-black hover:text-Verde"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Volver
              </button>
              <BotonSegundoModal text="Agregar Items" id="addItemBtn" onClick={handleAddClick} />
            </div>

            {/* Tabla de items */}
            <div>
              <GridListItems items={items} setItems={setItems} />
            </div>

            {/* Modal para agregar un nuevo item */}
            {isModalOpen && (
              <ModalItems
                onClose={handleCloseModal}
                onAddItem={handleAddItem} // Asegúrate de que ModalItems acepte esta prop
              />
            )}
          </div>
        </Layoutcontenido>
      )}
    </LayoutPrincipal>
  );
};

export default Items;
