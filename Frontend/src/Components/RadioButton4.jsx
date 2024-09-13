import React from 'react';

const RadioButton4 = ({ Text, onClick, value, checked }) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={value}
        name="estado"
        value={value}
        className="form-radio h-5 w-5 focus:ring-lime-600 checked:bg-lime-400"
        onChange={onClick}  //Captura el evento de cambio 
        checked={checked}   // Establece si está seleccionado
      />
      <label htmlFor={value} className="ml-2 text-sm font-josefin-slab">{Text}</label>
    </div>
  );
};

export default RadioButton4;