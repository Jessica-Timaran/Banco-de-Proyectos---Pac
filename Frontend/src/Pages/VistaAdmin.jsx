import React, { useEffect, useState } from 'react';
import LayoutHome from '../Layouts/LayoutHome';
import CartaUsuario from '../Components/CartaUsuario';
import Loader from '../Components/Loader';
import BotonPrincipal from '../Components/BotonPrincipal';
import BotonSegundo from '../Components/BotonSegundo';
import { motion } from 'framer-motion'; // Importa framer-motion

const VistaAdmin = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula un tiempo de carga de 2 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Definimos la animación de entrada y salida
  const pageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
  };

  // Si está cargando, muestra solo el Loader
  if (loading) {
    return <Loader />;
  }

  // Si no está cargando, renderiza el contenido dentro del layout con la animación
  return (
    <LayoutHome title="">
      <motion.div
        id="content"
        className=""
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageVariants}
      >
        <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
          <div className="w-full max-w-7xl flex-grow px-4 sm:px-8 md:px-0">
            <div className="flex flex-col md:flex-row items-start">
              <div className="w-full md:w-1/2 p-4 md:p-8">
                <span className="text-4xl sm:text-6xl md:text-9xl font-josefin-slab mb-4 block">Bienvenido</span>
                <span className="text-3xl sm:text-5xl md:text-8xl text-verde font-inter mb-4 block">Instructor</span>
                <p className="text-base sm:text-lg md:text-3xl font-josefin-slab mb-8 mt-4 md:mt-20">
                  ¡Hola! querido Instructor, aquí podrás ver los proyectos registrados por parte de las empresas o usuarios. ¡Ten una buena experiencia en el aplicativo!
                </p>
              </div>
              <div className="w-full md:w-1/2 flex justify-center items-center p-4 md:p-8">
                <img className="w-full max-w-md h-auto" src="/Img/usuario.png" alt="Imagen Principal" />
              </div>
            </div>
            <div className="flex justify-start gap-x-7 mt-8 mx-7">
              <a href="/calificar">
                <BotonSegundo Text="Empezar" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </LayoutHome>
  );
};

export default VistaAdmin;
