import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ButtonComponent = ({ Text, className = '', id }) => {
  const [activeButtonId, setActiveButtonId] = useState(null);

  const handleClick = () => {
    setActiveButtonId(id);
  };

  return (
    <button
      id={id}
      className={`boton-principal relative cursor-pointer font-semibold overflow-hidden z-10 border border-[#2eb694] group w-[175px] h-[44px] py-[10px] rounded-[5px] mt-3 self-center ${className} ${activeButtonId === id ? 'bg-[#2eb694]' : ''}`}
      onClick={handleClick}
    >
      <span
        className="relative z-10 text-black group-hover:text-white text-[18px] duration-500"
      >
        {Text}
      </span>
      <span
        className="absolute w-full h-full bg-[#2eb694] -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"
      ></span>
      <span
        className="absolute w-full h-full bg-[#2eb694] -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"
      ></span>
    </button>
  );
};

ButtonComponent.propTypes = {
  Text: PropTypes.string.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default ButtonComponent;