import React from "react";

const Input2 = ({placeholder, type, Text, id}) => {
  return (
    <div className="space-y-2 w-full">
      <label htmlFor={id} className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {Text}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required
        className="bg-[#F5F6FA] w-full min-h-6 mt-3 rounded-[4px] border border-[#D5D5D5] px-[20px] py-[7px] mb-2 text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong"/>
    </div>
  );
};

export default Input2;