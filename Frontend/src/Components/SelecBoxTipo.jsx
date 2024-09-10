import React from 'react';

const SelectBoxTipo = ({id, text}) => {

  return (
    <form className="">
      <label htmlFor={id} className="pace-y-2 w-1/2 font-nunito-sans font-semibold">{text}</label>
      <select
        id={id}
        className="bg-[#F5F6FA] w-full min-h-11 mt-3 rounded-[4px] border border-[#D5D5D5] px-[20px] py-[7px] mb-2 text-[15px] transition-transform transform outline-none focus:translate-y-[-5px]"
      >
        <option selected>Elige una opción</option>
        <option value="Tipo">Tipo</option>
        <option value="Tipo">Tipo</option>
        <option value="Tipo">Tipo</option>
      </select>
    </form>
  );
};

export default SelectBoxTipo;