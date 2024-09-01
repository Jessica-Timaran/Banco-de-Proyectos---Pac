import React from 'react';

const Navbar2 = ({ Text }) => {
  return (
    <nav className="bg-white flex p-2 sm:p-4 justify-end">
      <div className="flex items-center mr-2 sm:mr-6">
        <img
          src="/public/img/perfil.png"
          alt="User Avatar"
          className="rounded-full w-8 h-8 sm:w-12 sm:h-12 mr-2"
        />
        <span className="text-black text-xs sm:text-base">
          Karen Riascos <br />
          {Text}
        </span>
      </div>
    </nav>
  );
};

export default Navbar2;
