import React from 'react';

const Input = ({ placeholder, type, Text, id, value, onChange }) => {
  return (
    <div className="space-y-2 w-full">
      <label htmlFor={id} className="font-josefin-slab font-semibold text-black">
        {Text}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required
        value={value}
        onChange={onChange}
        className="bg-[#F5F6FA] w-full min-h-11 mt-3 rounded-[4px] border border-[#D5D5D5] px-[20px] py-[7px] mb-2 text-[15px] transition-transform transform outline-none focus:translate-y-[-5px]"
      />
    </div>
  );
};

export default Input;