import React from 'react';

const Layoutcontenido5 = ({title, children}) => {
  return (
    <div className="text-center px-6 mt-[1%]">
      <span className="text-2xl font-bold font-nunito-sans text-center">
        {title}
      </span>

      <main className="flex justify-center mt-[1%] h-auto max-w-full px-4">
        <div className="flex-wrap w-[65%] max-[768px]:w-[70%] bg-white rounded-lg border-none border-Borde_gris flex items-center justify-center">
          <div className="w-[80%] mb-4">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layoutcontenido5;