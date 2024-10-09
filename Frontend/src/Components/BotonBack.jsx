import React from 'react';

const BotonBack = ({ onClick, text = "Volver" }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center text-black hover:text-lime-600"
    >
      <i className="fas fa-arrow-left w-5 h-5 mr-2"></i>
      {text}
    </button>
  );
};

export default BotonBack;