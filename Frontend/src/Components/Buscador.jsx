import React from 'react';

const Buscador = ({ type }) => {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder="Buscar"
        id="searchInput"
        name="search"
        required
        className="bg-[#F5F6FA] font-['sans-serif'] w-[450px] rounded-[20px] border border-[#D5D5D5] ml-[4pc] px-[20px] py-[7px] my-[10px] text-[15px] pl-[45px] max-[768px]:w-[17em]"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-[18px] absolute top-[24px] left-[6em]"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#2c3e50"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
        <path d="M21 21l-6 -6" />
      </svg>
    </div>
  );
};

export default Buscador;
