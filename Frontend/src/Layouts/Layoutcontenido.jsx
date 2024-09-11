import React from 'react';

const Layoutcontenido = ({ children }) => {
  return (
    <main className="flex justify-center items-center min-h-screen w-full sm:p-6 md:p-8 lg:p-10 p-10 xl:pl-32 2xl:pl-32 xl:pr-8">
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-md overflow-hidden ">
        <div className="p-4 sm:p-6 md:p-8 lg:p-10">
          {children}
        </div>
      </div>
    </main>
  );
};

export default Layoutcontenido;