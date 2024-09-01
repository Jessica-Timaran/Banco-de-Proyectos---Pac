import React from 'react';
import Navbar from '../Components/Navbar';
import Menu from '../Components/Menu';
import PostLayout from '../Layouts/PostLayout';

const LayoutPrincipal = ({ title, children }) => {
  return (
    <PostLayout title="Banco de proyectos">
      <div>
        <header className="w-full bg-white">
          <Navbar Text="djcds" />
        </header>
        <aside>
          <Menu />
        </aside>
        {children}
      </div>
    </PostLayout>
  );
};

export default LayoutPrincipal;
