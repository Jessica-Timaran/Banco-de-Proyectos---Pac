import React from 'react';
import Navbar2 from '../Components/Navbar2';
import Menu from '../Components/Menu';
import PostLayout from '../Layouts/PostLayout'

const LayoutPrincipal2 = ({ title, children }) => {
  return (
    <PostLayout title="Instructor">
      <div className="min-h-screen">
        <header className="w-full bg-white">
          <Navbar2 Text="" />
        </header>
        <aside>
          <Menu />
        </aside>
        <main className="flex-1"> 
          {children}
        </main>
      </div>
    </PostLayout>
  );
};

export default LayoutPrincipal2;
