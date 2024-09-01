import React from 'react';

const AceptarTerminos = ({ Text, id }) => {
  return (
    <>
      <label
        className="checkbox-container inline-block relative pl-[35px] pt-[10px] mb-15 cursor-pointer user-select-none"
        htmlFor={id}
      >
        <span>{Text}</span>
        <input
          type="checkbox"
          id={id}
          className="peer absolute opacity-0 cursor-pointer"
        />
        <span className="checkmark absolute top-0 left-0 h-[25px] w-[25px] bg-[#eee] rounded-[4px] mt-2 border-2 border-solid border-[#A3E784] sm:border-0"></span>
        <svg
          viewBox="0 0 69 89"
          className="absolute top-[10px] left-0 h-[20px] w-[20px] duration-500 ease-out [stroke-dasharray:100] [stroke-dashoffset:100] peer-checked:[stroke-dashoffset:0]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M.93 63.984c3.436.556 7.168.347 10.147 2.45 4.521 3.19 10.198 8.458 13.647 12.596 1.374 1.65 4.181 5.922 5.598 8.048.267.4-1.31.823-1.4.35-5.744-30.636 9.258-59.906 29.743-81.18C62.29 2.486 63.104 1 68.113 1"
            strokeWidth="6px"
            stroke="#000"
            pathLength="100"
          ></path>
        </svg>
      </label>

      <style>
        {`
          .checkbox-container input:checked ~ .checkmark {
            background-color: #A3E784;
          }
        `}
      </style>
    </>
  );
};

export default AceptarTerminos;
