import React, { useEffect } from 'react';

const BotonPrincipal = ({ Text, className = '', id }) => {
  useEffect(() => {
    const handleClick = (event) => {
      const button = event.currentTarget;

      // Reiniciar la clase de fondo en todos los botones de tipo BotonPrincipal para quitar el efecto
      document.querySelectorAll('button.boton-principal').forEach(btn => {
        btn.classList.remove('bg-[#A3E784]');
      });

      // Añadir la clase de fondo al botón clicado para aplicar el efecto
      button.classList.add('bg-[#A3E784]');
    };

    // Escuchar los clics en todos los botones dentro del contenedor adecuado (si es necesario)
    document.querySelectorAll('button.boton-principal').forEach(button => {
      button.addEventListener('click', handleClick);
    });

    // Limpiar el efecto de los event listeners cuando el componente se desmonte
    return () => {
      document.querySelectorAll('button.boton-principal').forEach(button => {
        button.removeEventListener('click', handleClick);
      });
    };
  }, []);

  return (
    <button
      id={id}
      className={`boton-principal relative cursor-pointer font-semibold overflow-hidden z-10 border border-[#A3E784] group w-[175px] h-[44px] py-[10px] rounded-[5px] mt-3 self-center ${className}`}
    >
      <span className="relative z-10 text-black group-hover:text-black text-[18px] duration-500">
        {Text}
      </span>
      <span className="absolute w-full h-full bg-[#A3E784] -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
      <span className="absolute w-full h-full bg-[#A3E784] -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
    </button>
  );
};

export default BotonPrincipal;
