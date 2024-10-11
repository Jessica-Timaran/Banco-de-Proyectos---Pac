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
       <div>
        <header className="w-full bg-white">
        <Navbar text="usuario" toggleMenu={toggleMenu} />
        </header>
        <aside>
        <Menu isOpen={isOpen} toggleMenu={toggleMenu} />
        </aside>
        {children}
       
        </div>
    </PostLayout2>
  );
};

export default LayoutHome;