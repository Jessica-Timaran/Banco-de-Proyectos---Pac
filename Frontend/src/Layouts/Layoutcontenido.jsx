import React from 'react';

const Layoutcontenido = ({ children }) => {
  return (
    <main className='pt-12 pb-20 pl-32 pr-20'>
      <div className="w-full min-h-screen p-8 rounded-lg bg-white">
        {children}
      </div>
      </main>
  );
};

export default Layoutcontenido;