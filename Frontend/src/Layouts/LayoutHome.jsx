import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Menu from '../Components/Menu';
import PostLayout2 from '../Layouts/PostLayout2';

const LayoutHome = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <PostLayout2 title={title}>
      <div className="flex h-screen overflow-hidden">
        <Menu isOpen={isOpen} toggleMenu={toggleMenu} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="w-full bg-white sticky ">
            <Navbar text="usuario" toggleMenu={toggleMenu} />
          </header>
   
            {children}
       
        </div>
      </div>
    </PostLayout2>
  );
};

export default LayoutHome;
