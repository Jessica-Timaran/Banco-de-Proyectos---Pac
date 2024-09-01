import React from 'react';

const BotonEditar = () => {
  return (
    <>
      <label className="flex justify-center items-center p-2 gap-2 h-8 w-20 border border-[#979797] bg-[#d3d2d06f] rounded-sm cursor-pointer hover:bg-[#b8b7b795]">
        <span className="text-[#979797] text-base font-semibold">Editar</span>
      </label>

      <style>
        {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(-360deg);
            }
          }
          .button:hover .svg-icon {
            animation: spin 2s linear infinite;
          }
        `}
      </style>
    </>
  );
};

export default BotonEditar;
