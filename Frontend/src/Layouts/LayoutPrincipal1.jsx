import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Menu from '../Components/Menu'; // Keep this import as is
import PostLayout1 from './PostLayout1';

const LayoutPrincipal1 = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <PostLayout1 title={title}>
      <div className="flex h-screen overflow-hidden">
        <Menu isOpen={isOpen} toggleMenu={toggleMenu} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="w-full bg-white sticky ">
            <Navbar text="usuario" toggleMenu={toggleMenu} />
          </header>
   
            {children}
       
        </div>
      </div>
    </PostLayout1>
  );
};

export default LayoutPrincipal1;