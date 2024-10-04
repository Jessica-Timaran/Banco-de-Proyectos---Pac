import React from 'react';
import { useUser } from '../Context/UserContext';

const Navbar2 = ({ Text }) => {
  const { user } = useUser();

  if (user === null) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <nav className="bg-Color_carta flex p-4 justify-between z-40 h-20  ">
    <div className="flex items-start z-20 ">
      {/* <Buscador type="search" /> */}
    </div>
    <div className="flex grid-cols-2 justify-center items-center mr-6 ">
        <img
           src={logoUser}
          alt="User Icon"
          className="flex rounded-full w-7 h-7 mr-2 justify-end"
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
export default Navbar2;