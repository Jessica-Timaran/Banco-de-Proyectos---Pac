import React from 'react';

const CardProyect = ({ Text, onOpenModal, children }) => {
  return (
    <div className="relative xl:w-72 xl:h-60 bg-Color_carta rounded-lg shadow-lg flex flex-col items-center justify-center p-8">
      <button 
        className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200 transition-colors"
        onClick={onOpenModal}
        aria-label="Ver personas asignadas"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </button>
      <h2 className="text-2xl font-josefin-slab mb-4 text-center leading-tight p-4">
        {Text}
      </h2>
      {children}
    </div>
  );
};

export default CardProyect;