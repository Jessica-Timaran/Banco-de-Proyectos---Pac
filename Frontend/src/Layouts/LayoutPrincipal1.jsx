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
 <div>
<header className="w-full h-full bg-white sticky top-0 z-10">
            <Navbar text="" toggleMenu={toggleMenu} />
          </header>
          <aside className='w-full'>
          <Menu isOpen={isOpen} toggleMenu={toggleMenu} />
        </aside>
            {children}
      </div>
    </PostLayout1>
  );
};

export default LayoutPrincipal1;
