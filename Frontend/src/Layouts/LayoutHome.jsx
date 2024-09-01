import React from 'react';
import Navbar2 from '../Components/Navbar2';
import Menu from '../Components/Menu';
import PostLayout2 from '../Layouts/PostLayout2';

const LayoutHome = ({ title, children }) => {
  return (
    <PostLayout2 title={title}>
      <div>
        <header className="w-full bg-white">
          <Navbar2 Text="djcds" />
        </header>
        <aside>
          <Menu />
        </aside>
        {children}
      </div>
    </PostLayout2>
  );
};

export default LayoutHome;
