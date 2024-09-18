import React from 'react';
import Navbar from '../Components/Navbar';
import Menu from '../Components/Menu';
import PosLayout from './PostLayout';

// Componente principal
const Layoutprincipal = ({ title, children }) => {
  return (
    <PosLayout title={title}>
      <div>
        <header className="w-full h-full bg-white sticky top-0 z-10">
          <Navbar text="usuario" />
        </header>

        <aside className='w-full'>
          <Menu />
        </aside>

          {children}

      </div>
    </PosLayout>
  );
};

export default Layoutprincipal;