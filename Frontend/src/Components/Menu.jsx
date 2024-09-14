import React, { useState } from 'react';
import Items1 from '../Components/Items1';
 import logoSena from '../../public/logoSena.svg';
import '../css/Sidebar.css';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const userRole = parseInt(localStorage.getItem('userRole'), 10);

  const menuItems = {
    1: [
      { icon: "fas fa-home", to: "/Calificar", label: "Home" },
      { icon: "fas fa-home", to: "/VistaProyectos", label: "Proyectos" },
      { icon: "fas fa-user", to: "/VistaAprobados", label: "Vista Aprobados" },
      { icon: "fas fa-cog", to: "/AsignarProyecto", label: "Asignar Proyecto" },
    ],
    4: [
      { icon: "fas fa-home", to: "/Aprendiz/VistaAprendiz", label: "Home" },
      { icon: "fas fa-tachometer-alt", to: "/Aprendiz/VistaProyectos", label: "Proyectos Asignados" },
      { icon: "fas fa-user-edit", to: "/Aprendiz/EditarPefil", label: "Editar Perfil" },
    ],
    3: [
      { icon: "fas fa-user-plus", to: "/CrearFichas", label: "Crear Usuario" },
      { icon: "fas fa-folder-open", to: "/CrearUsuario", label: "Crear Fichas" },
      { icon: "fas fa-edit", to: "/EditarRegistro", label: "Editar Registro" },
      { icon: "fas fa-upload", to: "/CargaMasiva", label: "Cargar Aprendices" },
    ],
    2: [
      { icon: "fas fa-home", to: "/Usuario/VistaUsuario", label: "Home" },
      { icon: "fa-solid fa-folder-plus", to: "/Usuario/VistaMisProyectos", label: "Mis Proyectos" },
      { icon: "fas fa-project-diagram", to: "/Aprendiz/EditarPefil", label: "Editar Perfil" },
    ],
  };

  const roleMenuItems = menuItems[userRole] || [];

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear(); // Limpia el localStorage
    window.location.href = '/'; // Redirige a la página de login
  };

  return (
    <div>
      <aside
        id="sidebar"
        className={`sidebar fixed top-0 left-0 z-40 h-full bg-gray-50 transition-all duration-300 transform ${
          isOpen ? 'w-64' : 'w-16'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#A3E784]">
          <div className="flex items-center">
           <img src={logoSena} alt="Logo" className="w-10 h-10 pb-2" /> 
            {isOpen && (
              <span className="text-xl font-semibold whitespace-nowrap dark:text-black ml-2 pl-2">
                PAC
              </span>
            )}
          </div>
          <ul className="space-y-3 font-medium mt-5">
            {roleMenuItems.map((item, index) => (
              <Items1 key={index} icon={item.icon} href={item.to} label={isOpen ? item.label : ''} />
            ))}
            <Items1 icon="fas fa-sign-out-alt" href="#" label={isOpen ? 'Salir' : ''} onClick={handleLogout} />
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Menu;