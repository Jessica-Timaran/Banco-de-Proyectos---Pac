import React from 'react';

const RadioButton2 = ({ id, name, value, checked, onChange }) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="form-radio h-5 w-5 focus:ring-red-600"
      />
      <label htmlFor={id} className="ml-2">{value}</label>
    </div>
  );
};

export default RadioButton2;
