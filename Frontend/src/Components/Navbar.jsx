import React from 'react';
import { useUser } from '../Context/UserContext'; // Importa el contexto del usuario
import Buscador from '../Components/Buscador'; // Asegúrate de que la ruta es correcta

const Navbar = ({ Text }) => {
  const { user } = useUser(); // Usa el contexto del usuario

  if (user === null) {
    return <div>Loading...</div>; // O cualquier indicador de carga
  }

  return (
    <nav className="bg-Color_carta flex p-4 justify-between z-40">
    <div className="flex items-start z-20">
      <Buscador type="search" />
    </div>
    <div className="flex grid-cols-2 justify-center items-center mr-6">
        <img
          src="/Img/perfil.png"
          alt="User Avatar"
          className="flex rounded-full w-12 h-12 mr-2 justify-end"
        />
        <span className="text-black">
          {user.nombre || 'Invitado'} {/* Mostrar el nombre del usuario o "Invitado" */}
          <br />
          {Text}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
