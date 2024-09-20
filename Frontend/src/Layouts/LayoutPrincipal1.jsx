import React from 'react';
import Navbar from '../Components/Navbar';
import Menu from '../Components/Menu';
import PostLayout1 from './PostLayout1';

// Componente principal
const LayoutPrincipal1 = ({ title, children }) => {
  return (
    <PostLayout1 title={title}>
      <div>
        <header className="w-full h-full bg-white sticky top-0 z-10">
          <Navbar text="usuario" />
        </header>

        <aside className='w-full'>
          <Menu />
        </aside>

          {children}

      </div>
    </PostLayout1>
  );
};

export default LayoutPrincipal1;