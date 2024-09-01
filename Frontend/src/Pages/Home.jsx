import React from 'react';
import BotonPrincipal from '../Components/BotonPrincipal';
import BotonSegundo from '../Components/BotonSegundo';

const Home = () => {
  return (
    <div className="p-10 bg-white flex justify-center items-center h-screen m-0">
      <div className="flex flex-col items-start w-1/2 p-8">
        <div className="flex space-x-4">
          <img className="w-20 h-20 mb-20" src="/img/logoSena.png" alt="Logo" />
        </div>
        <span className="text-9xl font-josefin-slab">Banco de proyectos</span>
        <span className="text-8xl text-Verde font-inter mb-50">ADSO</span>
        <span className="text-2xl font-josefin-sans mb-10 w-30">
          ¿Tienes una idea que quema en tu mente? ¡Es hora de compartirla! Únete a nuestro banco de proyectos y convierte tu visión en realidad. ¿Estás listo para dar el primer paso hacia el éxito?
        </span>

        <div className="flex space-x-4">
          <a href="/Inicio">
            <BotonPrincipal Text="Iniciar Sesión" />
          </a>
          <a href="/Registro1">
            <BotonSegundo Text="Regístrate" />
          </a>
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <img className="scale-90" src="/img/Principal.png" alt="Principal Image" />
      </div>
    </div>
  );
};

export default Home;
