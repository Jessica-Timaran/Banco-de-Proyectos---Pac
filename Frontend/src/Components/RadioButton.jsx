import React from 'react';

const RadioButton = ({ Text, id, name = "estado", value, checked, disabled, onClick }) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={id || value}
        name={name}
        value={value}
        className="form-radio h-5 w-5 focus:ring-lime-600 checked:bg-lime-400"
        checked={checked}
        disabled={disabled}
        onChange={onClick}  // Captura el evento de cambio
        readOnly={onClick ? false : true} // Solo es de lectura si no hay onClick
      />
      <label htmlFor={id || value} className="ml-2 text-sm font-josefin-slab">
        {Text}
      </label>
    </div>
  );
};

export default RadioButton;
