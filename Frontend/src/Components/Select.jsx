import React, { useState } from 'react';

const Select = () => {
  const [selected, setSelected] = useState('html');

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <div className="flex space-x-2 rounded-xl select-none">
      <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
        <input
          type="radio"
          name="radio"
          value="html"
          className="peer hidden"
          checked={selected === 'html'}
          onChange={handleChange}
        />
        <span
          className={`tracking-widest peer-checked:bg-[#A3E784] peer-checked:text-black text-center text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out w-full ${selected === 'html' ? 'bg-[#A3E784] text-black' : ''}`}
        >
          Semanal
        </span>
      </label>

      <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
        <input
          type="radio"
          name="radio"
          value="react"
          className="peer hidden"
          checked={selected === 'react'}
          onChange={handleChange}
        />
        <span
          className={`tracking-widest peer-checked:bg-[#A3E784] peer-checked:text-black text-center text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out w-full ${selected === 'react' ? 'bg-[#A3E784] text-black' : ''}`}
        >
          Quincenal
        </span>
      </label>

      <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
        <input
          type="radio"
          name="radio"
          value="vue"
          className="peer hidden"
          checked={selected === 'vue'}
          onChange={handleChange}
        />
        <span
          className={`tracking-widest peer-checked:bg-[#A3E784] peer-checked:text-black text-center text-gray-700 p-2 w-full rounded-lg transition duration-150 ease-in-out ${selected === 'vue' ? 'bg-[#A3E784] text-black' : ''}`}
        >
          Mensual
        </span>
      </label>
    </div>
  );
};

export default Select;
