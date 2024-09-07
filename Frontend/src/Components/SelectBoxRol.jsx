import React from 'react';
import PropTypes from 'prop-types';

const SelectBoxRol = ({ id, text, value, onChange }) => {
  return (
    <div className="">
      <label htmlFor={id} className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {text}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#F5F6FA] w-full min-h-11 mt-3 rounded-[4px] border border-[#D5D5D5] px-[20px] py-[7px] mb-2 text-[15px] transition-transform transform outline-none focus:translate-y-[-5px]"
      >
        <option value="" disabled>
          Elige una opción
        </option>
        <option value="1">Instructor</option>
        <option value="4">Aprendiz</option>
      </select>
    </div>
  );
};

SelectBoxRol.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SelectBoxRol;
