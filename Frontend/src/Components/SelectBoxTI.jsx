import React from 'react';

const SelectBoxTI = ({ Text, id, value, onChange }) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="space-y-2 w-1/2 font-josefin-slab font-semibold">
        {Text}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="bg-[#F5F6FA] w-full min-h-11 mt-3 rounded-[4px] border border-[#D5D5D5] px-[20px] py-[7px] mb-2 text-[15px] transition-transform transform outline-none focus:translate-y-[-5px]"
      >
        <option value="" disabled>
          Tipo de documento
        </option>
        <option value="CC">Cédula de ciudadanía</option>
        <option value="CE">Cédula de extranjería</option>
        <option value="TI">Tarjeta de identidad</option>
        <option value="PEP">Permiso especial de permanencia</option>
        <option value="PPT">Permiso de protección temporal</option>
      </select>
    </div>
  );
};

export default SelectBoxTI;
