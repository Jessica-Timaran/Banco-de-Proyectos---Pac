import React from 'react';
import { useUser } from '../Context/UserContext';
import logoUser from '../../public/user-solid.svg'

const Navbar = ({  toggleMenu }) => {
  const { user } = useUser();

  if (user === null) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="bg-Color_carta flex p-4 justify-between z-40">
      <div className="flex items-center z-20">
        <button onClick={toggleMenu} className="text-black mr-4">
          <i className="fas fa-bars text-2xl"></i>
        </button>
      </div>
      <div className="flex grid-cols-2 justify-center items-center mr-6">
      <img
           src={logoUser}
          alt="User Icon"
          className="flex rounded-full w-7 h-7 mr-2 justify-end"
        />
        <span className="text-black">
          {user.nombre } {/* Mostrar el nombre del usuario o "Invitado" */}
          <br />
      
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
