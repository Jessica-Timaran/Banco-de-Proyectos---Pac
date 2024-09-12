import React from 'react';

const Input2 = ({ placeholder, type, Text, id, value, onChange, error }) => {
  return (
    <div className="space-y-2 w-full">
      <label
        htmlFor={id}
        className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
      >
        {Text}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value} // Asegúrate de que el valor del input sea manejado
        onChange={onChange} // Asegúrate de que el cambio del input sea manejado
        required
        className={`bg-[#F5F6FA] w-full min-h-6 mt-3 rounded-[4px] border px-[20px] py-[7px] mb-2 text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong ${error ? 'border-red-500' : 'border-[#D5D5D5]'}`} // Cambia el color del borde si hay un error
      />
      {error && (
        <p className="text-red-500 text-sm">{error}</p> // Muestra el mensaje de error en rojo
      )}
    </div>
  );
};

export default Input2;
