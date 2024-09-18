const BotonRegistro = ({ Text, className = '', onClick, isSelected, size = 'md', type = 'button' }) => {
    const sizeClasses = {
      sm: 'w-[120px] h-[36px] text-[14px]',
      md: 'w-[150px] h-[44px] text-[16px]',
      lg: 'w-[180px] h-[48px] text-[18px]',
    };
  
    return (
      <div className="flex justify-center sm:justify-end">
        <button
          type={type}  // Asegura que el tipo sea 'button' por defecto
          className={`boton-principal relative cursor-pointer font-semibold overflow-hidden z-10 border border-[#A3E784] group 
            ${sizeClasses[size]} rounded-[5px] mt-3 self-center ${className} ${isSelected ? 'bg-[#A3E784]' : ''}`}
          onClick={onClick}
        >
          <span className="relative z-10 text-black group-hover:text-black duration-500">
            {Text}
          </span>
          <span className="absolute w-full h-full bg-[#A3E784] -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
          <span className="absolute w-full h-full bg-[#A3E784] -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
        </button>
      </div>
    );
  };
  
  export default BotonRegistro;