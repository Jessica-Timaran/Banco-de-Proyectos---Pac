import React from 'react';

const InputComent = ({ placeholder, Text, id, value, onChange }) => {
  return (
    <div className="space-y-2 w-full">
      <label htmlFor={id} className="font-josefin-slab font-semibold text-black">{Text}</label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        maxLength={200} // Limita el número de caracteres a 200
        className="bg-[#F5F6FA] w-full min-h-28 rounded-[4px] border border-[#D5D5D5] px-[20px] py-[10px] mb-2 text-[15px] leading-tight transition-transform transform outline-none resize-none"
      />
    </div>
  );
};

export default InputComent;