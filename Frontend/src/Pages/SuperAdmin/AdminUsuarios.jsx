import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutPrincipal from '../../Layouts/LayoutPrincipal1';
import Layoutcontenido from '../../Layouts/Layoutcontenido4';
import GridList from './GridList/GridListU';
import Loader from '../../Components/Loader';
import BotonSegundoModal from '../../Components/BotonSegundoModal';
import ModalUsuario from '../../Components/Modales/ModalUsuario';

const Usuarios = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('https://banco-de-proyectos-pac.onrender.com/api/superAdmin/usuarios');
        if (!response.ok) {
          throw new Error('Error al cargar los usuarios');
        }
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddUsuario = async (newUsuario) => {
    try {
      const response = await fetch('https://banco-de-proyectos-pac.onrender.com/api/superAdmin/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUsuario),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al registrar el usuario: ${errorData.message || response.statusText}`);
      }

      const addedUsuario = await response.json();
      setUsuarios((prevUsuarios) => [...prevUsuarios, addedUsuario]);
      handleCloseModal();
      window.location.reload(); // Recargar la página para actualizar la lista
    } catch (error) {
      console.error('Error al agregar usuario:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  const handleGoBack = () => {
    navigate('/SuperAdmin/dashboard'); // Redirigir al dashboard
  };

  return (
    <LayoutPrincipal title="Usuarios">
      {loading ? (
        <div id="loader" className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <Layoutcontenido title="Usuarios">
          <div className="flex flex-col w-full p-10 mb-10">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleGoBack}
                className="flex items-center text-black hover:text-Verde"
              >
                <i className="fas fa-arrow-left w-5 h-5 mr-2"></i>
                Volver
              </button>
              <BotonSegundoModal text="Agregar Usuario" id="addUserBtn" onClick={handleAddClick} />
            </div>
            <div>
              <GridList usuarios={usuarios} setUsuarios={setUsuarios} />
            </div>
            {isModalOpen && (
              <ModalUsuario
                onClose={handleCloseModal}
                onAddUsuario={handleAddUsuario}
              />
            )}
          </div>
        </Layoutcontenido>
      )}
    </LayoutPrincipal>
  );
};

export default Usuarios;
