import React from 'react';
import Buscador from '../Components/Buscador';

const Navbar = ({ Text }) => {
  return (
    <nav className="bg-white flex p-4 justify-between">
      <div className="flex items-start">
        <Buscador type="search" />
      </div>
      
      <div className="flex grid-cols-2 justify-center items-center mr-6 max-[768px]:hidden">
        <img src="/public/img/perfil.png" alt="User Avatar" className="flex rounded-full w-12 h-12 mr-2 justify-end" />
        <span className="text-black">Karen Riascos <br />{Text}</span>
      </div>
    </nav>
  );
};

export default Navbar;
