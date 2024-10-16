
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../public/Img/Logo.png';
import '../css/Sidebar.css';


const Sidebar = ({ isOpen, toggleMenu, setIsOpen }) => {

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [userRole, setUserRole] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        if (parsedUser && parsedUser.rol) {
          setUserRole(parsedUser.rol);
          console.log('User role set:', parsedUser.rol);
        } else {
          setError('Invalid user data in localStorage');
          console.error('Invalid user data:', parsedUser);
        }
      } catch (e) {
        setError('Error parsing user data from localStorage');
        console.error('Error parsing user data:', e);
      }
    } else {
      setError('No user data found in localStorage');
      console.error('No user data found in localStorage');
    }
  }, []);

  const menuItems = {
    1: [
      { icon: 'fas fa-home', to: '/VistaAdmin', label: 'Home' },
      { icon: 'fas fa-folder-open', to: '/calificar', label: 'Proyectos' },
      { icon: 'fa-solid  fa-users', to: '/Asignados', label: 'Proyectos Asignados' },
    ],
    4: [
      { icon: 'fas fa-home', to: '/Aprendiz/VistaAprendiz', label: 'Home' },
      { icon: 'fa-solid  fa-users', to: '/Aprendiz/VistaProyectos', label: 'Proyectos Asignados' },
      { icon: 'fas fa-user-edit', to: '/Aprendiz/EditarPerfil', label: 'Editar Perfil' },
    ],
    3: [
      { icon: 'fas fa-user-plus', to: '/SuperAdmin/usuarios', label: 'Crear Usuario' },
      { icon: 'fas fa-folder-open', to: '/SuperAdmin/registrocompleto', label: 'Registro completo' },
      { icon: 'fas fa-upload', to: '/SuperAdmin/proyectos', label: 'Ver proyectos' },
    ],
    2: [
      { icon: 'fas fa-home', to: '/Usuario/VistaUsuario', label: 'Home' },
      { icon: 'fas fa-folder-open', to: '/Usuario/VistaMisProyectos', label: 'Mis Proyectos' },
      { icon: 'fas fa-project-diagram', to: '/Aprendiz/EditarPerfil', label: 'Editar Perfil' },
    ],
  };

  const roleMenuItems = userRole && menuItems[userRole] ? menuItems[userRole] : [];

  const handleLogout = () => {
    console.log('User logged out');
    localStorage.clear();
    navigate('/');
  };


 // Use Effect para cerrar el menú en pantallas grandes
 useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 768) { // Cambia 768 si necesitas un tamaño diferente
      setIsOpen(false); // Cierra el menú al pasar a pantalla grande
    } else {
      setIsSmallScreen(true); // Para manejar la lógica de pantalla pequeña
    }
  };

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, [setIsOpen]);

useEffect(() => {
  // Cambia el estado de isSmallScreen
  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 768);
  };

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);



  if (error) {
    console.error('Sidebar Error:', error);
    return <div>Error: {error}. Please <Link to="/">login again</Link>.</div>;
  }
  
  console.log('Role Menu Items:', roleMenuItems);

  return (
<div>
  <aside
    id="sidebar"
    className={`sidebar fixed top-0 left-0 z-40 h-full bg-gray-50 transition-all duration-300 transform ${
      isSmallScreen
        ? isOpen
          ? 'translate-x-0 w-64'
          : '-translate-x-full w-64'
        : isOpen
        ? 'w-64'
        : 'w-16'
    } md:translate-x-0`}
    onMouseEnter={() => !isSmallScreen && setIsOpen(true)}
    onMouseLeave={() => !isSmallScreen && setIsOpen(false)}
  >
    <div className="h-full px-3 py-4 bg-[#2eb694] overflow-hidden">
      {/* Logo and title */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="w-10 h-10" />
        <span
          className={`text-xl font-semibold whitespace-nowrap text-white transition-opacity duration-300 ${
            isOpen || !isSmallScreen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          PAC
        </span>
      </div>

      {/* Menu items */}
      <ul className="space-y-3 font-medium mt-5">
        {roleMenuItems.map((item, index) => (
          <li key={index} className="w-full">
            <Link
              to={item.to}
              className={`flex items-center p-2 text-black rounded-lg dark:text-black group w-full hover:bg-gray-200 active:bg-gray-200 cursor-pointer`}
              onMouseEnter={() => {
                // Activar el hover manualmente
                document.querySelector(`.hoverable-item-${index}`).classList.add('hover:bg-gray-200');
              }}
              onMouseLeave={() => {
                // Desactivar el hover manualmente
                document.querySelector(`.hoverable-item-${index}`).classList.remove('hover:bg-gray-200');
              }}
              onClick={() => {
                console.log('Navigating to:', item.to); // Muestra el enlace al que navegas
                toggleMenu(); // Cierra el menú
              }}
            >
              <i className={`${item.icon} static-icon text-white`} aria-hidden="true"></i>
              <span
                className={`ml-3 whitespace-nowrap text-white transition-opacity duration-300 ${
                  isOpen || !isSmallScreen ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {item.label}
              </span>
            </Link>
          </li>
        ))}
        <li className="w-full">
          <button
            onClick={handleLogout}
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-black group w-full hover:bg-gray-200 active:bg-gray-200 cursor-pointer"
            onMouseEnter={() => {
              // Activar el hover manualmente
              document.querySelector('.hoverable-logout').classList.add('hover:bg-gray-200');
            }}
            onMouseLeave={() => {
              // Desactivar el hover manualmente
              document.querySelector('.hoverable-logout').classList.remove('hover:bg-gray-200');
            }}
          >
            <i className="fas fa-sign-out-alt static-icon text-white" aria-hidden="true"></i>
            <span
              className={`ml-3 whitespace-nowrap text-white transition-opacity duration-300 ${
                isOpen || !isSmallScreen ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Salir
            </span>
          </button>
        </li>
      </ul>
    </div>
  </aside>

  {/* Overlay for small screens */}
  {isOpen && isSmallScreen && (
    <div
      className="fixed inset-0 bg-black opacity-50 z-30"
      onClick={toggleMenu}
    ></div>
  )}
</div>


  
  );
};

export default Sidebar;
