import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import LayoutPrincipal from '../../layouts/LayoutPrincipal';
import Layoutcontenido from '../../Layouts/Layoutcontenido4';
import GridList from './GridList/GridListU';
import Loader from '../../Components/Loader';
import BotonSegundoModal from '../../Components/BotonSegundoModal';
import ModalUsuario from '../../Components/Modales/ModalUsuario';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const Usuarios = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [actionType, setActionType] = useState('');


  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleAddClick = () => {
    setCurrentUser(null);
    setActionType('add');
    setIsModalOpen(true);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const handleAddMember = (user) => {
    // Lógica para agregar un usuario
    console.log('Agregar', user);
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
              <p className="mt-4 text-lg leading-6 text-gray-600 text-left">
              <button
                onClick={handleGoBack}
                className="flex items-center text-black hover:text-Verde"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Volver
              </button>
              </p>
              <BotonSegundoModal text="Agregar Usuario" id="addUserBtn" onClick={handleAddClick}/>
            </div>
            <div >
              <GridList />
            </div>
            {isModalOpen && (
              <ModalUsuario
                onClose={handleCloseModal}
                onAddMember={handleAddMember}
                user={currentUser}
                actionType={actionType}
              />
            )}
          </div>
        </Layoutcontenido>
      )}
    </LayoutPrincipal>
  );
};

export default Usuarios;


// // Controlador para agregar persona
// async function agregarPersona(req, res) {
//   try {
//     console.log('Datos recibidos:', req.body);

//     const { 
//       nombre = '', 
//       tipodocumento = '', 
//       numerodocumento = '', 
//       correo = '', 
//       contraseña = '', 
//       celular = '', 
//       idrol = '', 
//       idficha = null 
//     } = req.body;

//     // Verificar si faltan datos requeridos
//     if (!nombre || !tipodocumento || !numerodocumento || !correo || !contraseña || !idrol || !celular) {
//       return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
//     }

//     // Registrar a la persona en la base de datos
//     const nuevaPersona = {
//       nombre,
//       tipodocumento,
//       numerodocumento,
//       correo,
//       contraseña,
//       telefono: celular,
//       idrol,
//       idficha: idrol === 4 ? idficha : null,  // Solo asigna idficha si el rol es '4' (Aprendiz)
//       estado: true
//     };
    

//     const resultado = await pool.query(
//       'INSERT INTO personas (nombre, tipodocumento, numerodocumento, correo, contraseña, telefono, idrol, idficha, estado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
//       [nombre, tipodocumento, numerodocumento, correo, contraseña, celular, idrol, idficha, nuevaPersona.estado]  // Estado booleano
//     );

//     res.status(201).json({ message: 'Usuario registrado exitosamente', usuario: resultado.rows[0] });
//   } catch (error) {
//     console.error('Error al registrar persona:', error);
//     res.status(500).json({ error: 'Internal server error', details: error.message });
//   }
// }
