import React from 'react';
import { useUser } from '../Context/UserContext';

const Navbar2 = ({ Text }) => {
  const { user } = useUser();

  if (user === null) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <nav className="bg-white flex p-2 sm:p-4 justify-end">
      <div className="flex items-center mr-2 sm:mr-6">
        <img
          src="/Img/perfil.png"
          alt="User Avatar"
          className="rounded-full w-8 h-8 sm:w-12 sm:h-12 mr-2"
        />
        <span className="text-black text-xs sm:text-base">
          {user.nombre || 'Invitado'}
          <br />
          {Text}
        </span>
      </div>
    </nav>
  );
};

export default Navbar2;