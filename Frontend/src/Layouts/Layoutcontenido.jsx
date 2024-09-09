import React from 'react';

const Layoutcontenido = ({ title, children }) => {
  return (
    <main className="flex justify-center items-center min-h-screen min-w-full 2xl:p-10 pl-9 p-10">
      <div className="xl:w-2/3 h-auto p-8 rounded-lg border-none bg-white">
        {children}
      </div>
    </main>
  );
};

export default Layoutcontenido;
