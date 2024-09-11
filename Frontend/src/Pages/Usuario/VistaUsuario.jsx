import React, { useEffect, useState } from 'react';
import LayoutHome from '../../Layouts/LayoutHome';
import CartaUsuario from '../../Components/CartaUsuario';
import Loader from '../../Components/Loader';

const VistaUsuario = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula un tiempo de carga de 2 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Si está cargando, muestra solo el Loader
  if (loading) {
    return <Loader />;
  }

  // Si no está cargando, renderiza el contenido dentro del layout
  return (
    <LayoutHome title="">
      <div id="content" className="">
        <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
          <div className="w-full max-w-7xl flex-grow px-4 sm:px-8 md:px-0">
            <div className="flex flex-col md:flex-row items-start">
              <div className="w-full md:w-1/2 p-4 md:p-8">
                <span className="text-4xl sm:text-6xl md:text-9xl font-josefin-slab mb-4 block">Bienvenido</span>
                <span className="text-3xl sm:text-5xl md:text-8xl text-[#A3E784] font-inter mb-4 block">USUARIO</span>
                <p className="text-base sm:text-lg md:text-3xl font-josefin-slab mb-8 mt-4 md:mt-20">
                  ¡Hola! querido usuario, aquí podrás registrar tus proyectos o, si ya tienes, podrás visualizarlos y saber el estado en el que se encuentran. ¡Ten una buena experiencia en el aplicativo!
                </p>
              </div>
              <div className="w-full md:w-1/2 flex justify-center items-center p-4 md:p-8">
                <img className="w-full max-w-md h-auto" src="/Img/usuario.png" alt="Imagen Principal" />
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl">
                <a href="/Usuario/RegistroProyecto">
                  <CartaUsuario Text="Registrar proyectos" />
                </a>
                <a href="/Usuario/VistaMisProyectos">
                  <CartaUsuario Text="Ver proyectos" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutHome>
  );
};

export default VistaUsuario;