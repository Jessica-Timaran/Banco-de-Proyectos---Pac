import React from 'react';
import PropTypes from 'prop-types';

const ButtonComponent = ({ Text, className = '', id, onClick }) => {
  return (
    <button
      id={id}
      className={`boton-principal bg-[#2eb694] relative cursor-pointer font-semibold overflow-hidden z-10 border border-[#2eb694] group w-[175px] h-[44px] py-[10px] rounded-[5px] mt-3 self-center ${className}`}
      onClick={onClick} // Ejecuta la función pasada como prop
    >
      <span className="relative z-10 text-white group-hover:text-white text-[18px] duration-500">
        {Text}
      </span>
    
    </button>
  );
};



export default ButtonComponent;