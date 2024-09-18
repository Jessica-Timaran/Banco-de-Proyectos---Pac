import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../public/Img/Logo.png'; // Asegúrate de que la ruta sea correcta
import '../css/Sidebar.css'; // Asegúrate de incluir tu archivo CSS para estilos

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const userRole = parseInt(localStorage.getItem('userRole'), 10);

  const menuItems = {
    1: [
      { icon: 'fas fa-home', to: '/VistaAdmin', label: 'Home' },
      { icon: 'fas fa-folder-open', to: '/calificar', label: 'Proyectos' },
      // { icon: 'fas fa-user', to: '/VistaAprobados', label: 'Vista Aprobados' },
      // { icon: 'fas fa-cog', to: '/AsignarProyecto', label: 'Asignar Proyecto' },
    ],
    4: [
      { icon: 'fas fa-home', to: '/Aprendiz/VistaAprendiz', label: 'Home' },
      { icon: 'fas fa-tachometer-alt', to: '/Aprendiz/VistaProyectos', label: 'Proyectos Asignados' },
      { icon: 'fas fa-user-edit', to: '/Aprendiz/EditarPefil', label: 'Editar Perfil' },
    ],
    3: [
      { icon: 'fas fa-user-plus', to: '/CrearFichas', label: 'Crear Usuario' },
      { icon: 'fas fa-folder-open', to: '/CrearUsuario', label: 'Crear Fichas' },
      { icon: 'fas fa-edit', to: '/EditarRegistro', label: 'Editar Registro' },
      { icon: 'fas fa-upload', to: '/CargaMasiva', label: 'Cargar Aprendices' },
    ],
    2: [
      { icon: 'fas fa-home', to: '/Usuario/VistaUsuario', label: 'Home' },
      { icon: 'fa-solid fa-folder-plus', to: '/Usuario/VistaMisProyectos', label: 'Mis Proyectos' },
      { icon: 'fas fa-project-diagram', to: '/Aprendiz/EditarPefil', label: 'Editar Perfil' },
    ],
  };

  const roleMenuItems = menuItems[userRole] || [];

  const handleLogout = () => {
    localStorage.clear(); // Limpia el localStorage
    window.location.href = '/'; // Redirige a la página de login
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Escucha los cambios de tamaño de pantalla para actualizar el estado
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false); // Mantiene el sidebar cerrado si cambia a pantalla grande
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {/* Botón de menú para pantallas pequeñas */}
      <button
        className="md:hidden p-4 fixed top-0 left-0 z-50"
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
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
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#A3E784]">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Logo" className="w-10 h-10" />
            <span
              className={`text-xl font-semibold whitespace-nowrap dark:text-black transition-opacity duration-300 ${
                isOpen || !isSmallScreen ? 'opacity-100' : 'opacity-0'
              }`}
            >
              PAC
            </span>
          </div>
          <ul className="space-y-3 font-medium mt-5">
            {roleMenuItems.map((item, index) => (
              <li key={index} className="w-full">
                <Link
                  to={item.to}
                  className="flex items-center p-2 text-black rounded-lg dark:text-black group w-full hover:bg-gray-200"
                >
                  <i className={`${item.icon} static-icon text-black`} aria-hidden="true"></i>
                  <span
                    className={`ml-3 whitespace-nowrap text-black transition-opacity duration-300 ${
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
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-black group w-full hover:bg-gray-200"
              >
                <i className="fas fa-sign-out-alt static-icon text-black" aria-hidden="true"></i>
                <span
                  className={`ml-3 whitespace-nowrap text-black transition-opacity duration-300 ${
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

      {/* Overlay para cerrar el sidebar al hacer clic fuera de él en pantallas pequeñas */}
      {isOpen && isSmallScreen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
