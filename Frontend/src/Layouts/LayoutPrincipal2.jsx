import React from 'react';
import Navbar2 from '../Components/Navbar2';
import PostLayout1 from './PostLayout1';
import Menu from '../Components/Menu';


const LayoutPrincipal2 = ({ title, children }) => {
  return (
    <PostLayout1 title="Instructor">
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
    </PostLayout1>
  );
};

export default LayoutPrincipal2;
