import React from 'react';

const CartaUsuario = ({ Text }) => {
  return (
    <div className="w-full sm:w-5/6 md:w-80 h-auto sm:h-60 bg-[#FBFCFF] rounded-xl border-2 border-[#FBFCFF] shadow-lg flex flex-col items-center justify-center p-4 sm:p-8 mb-4 sm:m-8  hover:border-[#A3E784] transition duration-300 cursor-pointer">
      <h2 className="text-base sm:text-xl md:text-2xl font-josefin-slab mb-2 sm:mb-4 text-center leading-tight p-2 sm:p-4 font-bold">
        {Text}
      </h2>
      <button className="group cursor-pointer outline-none hover:rotate-90 duration-300">
        <svg
          className="stroke-[#A3E784] fill-none group-active:duration-0 duration-300"
          viewBox="0 0 24 24"
          height="60px"
          width="60px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeWidth="1.5" d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"></path>
          <path strokeWidth="1.5" d="M8 12H16"></path>
          <path strokeWidth="1.5" d="M12 16V8"></path>
        </svg>
      </button>
    </div>
  );
};

export default CartaUsuario;