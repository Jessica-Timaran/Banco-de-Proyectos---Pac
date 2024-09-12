import React from 'react';

const TextArea = ({ placeholder, Text, id, value, onChange, name }) => {
    return (
        <div className="w-full">
            <label htmlFor={id} className="font-josefin-slab font-semibold text-black">
                {Text}
            </label>
            <textarea
                id={id}
                name={name} 
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="bg-[#F5F6FA] w-full min-h-11 mt-3 rounded-[4px] border border-[#D5D5D5] px-[20px] py-[10px] mb-2 text-[15px] transition-transform transform outline-none focus:translate-y-[-5px]"
            />
        </div>
    );
};

export default TextArea;