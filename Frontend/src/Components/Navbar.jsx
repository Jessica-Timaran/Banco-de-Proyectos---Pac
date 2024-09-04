import React from 'react';
import Buscador from '../Components/Buscador'; // Asegúrate de que la ruta es correcta

const Navbar = ({ Text }) => {
  return (
    <nav className="bg-Color_carta flex p-4 justify-between z-40">
      <div className="flex items-start z-20">
        <Buscador type="search" />
      </div>
      <div className="flex grid-cols-2 justify-center items-center mr-6">
        <img
          src="/img/logo.svg"
          alt="User Avatar"
          className="flex rounded-full w-12 h-12 mr-2 justify-end"
        />
        <span className="text-black">
          Karen Riascos
          <br />
          {Text}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;