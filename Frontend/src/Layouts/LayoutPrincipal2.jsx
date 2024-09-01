import React from 'react';
import Navbar2 from '../Components/Navbar2';
import Menu from '../Components/Menu';
import PostLayout from '../Layouts/PostLayout';

const LayoutPrincipal2 = ({ title, children }) => {
  return (
    <PostLayout title="Instructor">
      <div>
        <header className="w-full bg-white">
          <Navbar2 Text="djcds" />
        </header>
        <aside>
          <Menu />
        </aside>
        {children}
      </div>
    </PostLayout>
  );
};

export default LayoutPrincipal2;
