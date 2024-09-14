import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../public/Img/Logo.png"; // Asegúrate de que la ruta sea correcta

const Sidebar = () => {
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
"fa-solid fa-folder-plus"
  const roleMenuItems = menuItems[userRole] || [];

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.clear(); // Limpia el localStorage
    window.location.href = '/'; // Redirige a la página de login
  };

  return (
    <>
      <button id="menu-button" className="md:hidden p-4 fixed top-0 left-0 z-50">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>

      <aside id="sidebar" className="sidebar fixed top-0 left-0 z-40 h-full bg-gray-50 transition-transform transform -translate-x-full md:translate-x-0">
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#A3E784]">
          <Link to="/" className="flex items-center ps-2.5 mb-5">
            <img src={logo} alt="Logo" className="w-10 h-10 pb-2" />
            <span className="text-xl font-semibold whitespace-nowrap dark:text-black ml-2 pl-2">PAC</span>
          </Link>
          <ul id="menu-list" className="space-y-3 font-medium">
            {roleMenuItems.map((item, index) => (
              <li key={index}>
                <Link to={item.to} className="flex items-center p-2 text-black rounded-lg dark:text-black group">
                  <div>
                    <i className={`${item.icon} flex-shrink-0 w-5 h-5 text-black dark:text-black`} aria-hidden="true"></i>
                  </div>
                  <span className="flex-1 ms-3 whitespace-nowrap text-black">{item.label}</span> {/* Asegúrate de que el color del texto sea visible */}
                </Link>
              </li>
            ))}
            {/* Opción de Salir */}
            <li>
              <button onClick={handleLogout} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-black group w-full">
                <i className="fas fa-sign-out-alt flex-shrink-0 w-5 h-5 text-black dark:text-black" aria-hidden="true"></i>
                <span className="flex-1 ms-3 whitespace-nowrap text-black">Salir</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Estilo CSS */}
      <style jsx>{`
        body {
          font-family: "Josefin Slab", serif;
          font-optical-sizing: auto;
        }

        .sidebar {
          width: 60px; /* Ancho inicial */
          transition: width 0.3s ease, transform 0.3s ease;
        }

        .sidebar.open {
          width: 200px; /* Ancho expandido al abrir */
        }

        .sidebar:hover {
          width: 200px; /* Ancho expandido al pasar el cursor */
        }

        .sidebar ul span {
          display: none; /* Oculta los nombres de los proyectos inicialmente */
        }

        .sidebar.open ul span {
          display: inline-block; /* Muestra los nombres de los proyectos al abrir */
        }

        .sidebar:hover ul span {
          display: inline-block; /* Muestra los nombres de los proyectos al pasar el cursor */
        }

        label {
          margin-left: 8px; /* Ajusta el margen si es necesario */
          padding: 4px; /* Ajusta el padding si es necesario */
        }
      `}</style>
    </>
  );
};

export default Sidebar;