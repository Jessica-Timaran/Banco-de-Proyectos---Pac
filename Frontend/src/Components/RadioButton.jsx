import React from 'react';

const RadioButton = ({ Text, id, name, checked, onChange }) => {
  return (
    <div className="flex items-center">
      <input 
        type="radio" 
        id={id} 
        name={name} 
        checked={checked}
        onChange={onChange}
        className="form-radio h-5 w-5 focus:ring-red-600 checked:bg-Verde" 
      />
      <label htmlFor={id} className="ml-2 text-sm font-josefin-slab">
        {Text}
      </label>
    </div>
  );
};

export default RadioButton;
