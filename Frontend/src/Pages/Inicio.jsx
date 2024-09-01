import React from 'react';
import LayoutFormulario from '../Layouts/LayoutFormulario.jsx';
import Input from '../Components/Input.jsx';
import BotonPrincipal from '../Components/BotonPrincipal.jsx';
import '../css/Inicio.css'

const Inicio = () => {
  return (
    <LayoutFormulario title="Formulario">
      <div className="flex 2xl:h-screen h-auto sm:96 items-center justify-center 2xl:gap-x-72">
        <div className="flex content-center">
          <form
            id="formu"
            action="http://localhost:4000/api/login"
            method="POST"
            className="form flex flex-col 2xl:w-96 sm:w-[600px] sm:h-[900px] justify-center items-center 2xl:gap-28 gap-y-20 sm:gap-y-24"
          >
            <div className="logo-sena flex m-auto items-center justify-center w-56 h-20 sm:w-96 sm:h-32 2xl:max-w-80 2xl:max-h-32 bg-custom-green 2xl:rounded-bl-[50px] 2xl:rounded-br-[50px] rounded-bl-[40px] rounded-br-[40px]">
              <img
                className="sena sm:w-20 sm:h-20 w-12 h-12"
                src="/public/img/logoSena.png"
                alt="Logo Sena"
              />
            </div>

            <div className="login flex flex-col items-center 2xl:gap-4 2xl:min-w-96 w-56 sm:w-96 gap-y-4 sm:gap-y-7">
              <div className="text-3xl 2xl:pb-8">LOGIN</div>

              <div className="relative w-full">
                <Input type="email" Text="" placeholder="Correo:" id="CorreoInicio" />
                <span id="correoError" className="error-message"></span>
              </div>

              <div className="relative w-full">
                <Input type="password" Text="" placeholder="Contraseña:" id="contrasenaInicio" />
                <i
                  className="bx bx-show cursor-pointer absolute right-3 top-2/4 transform -translate-y-2/4"
                  id="togglePasswordInicio"
                ></i>
                <span id="contrasenaError" className="error-message"></span>
              </div>

              <span id="globalError" className="error-message"></span>

              <div className="flex justify-end w-full">
                <a href="/OlvidarContraseña" className="text-blue-500 underline decoration-1">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* Botón principal como input de tipo submit */}
              <BotonPrincipal Text="Login" />
            </div>

            <div className="boton items-center text-center sm:mb-20">
              <div className="flex">¿No tienes cuenta?</div>
              <a href="/Registro1" className="signup text-blue-500 underline decoration-1">
                Registrarse
              </a>
            </div>
          </form>
        </div>

        <div className="hidden md:hidden lg:hidden xl:block 2xl:block 2xl:w-[800px] 2xl:h-[800px] xl:h-[650px] xl:w-[550px] sm:w-[700px] sm:h-[700px]">
          <img
            className="sm:w-auto sm:h-auto 2xl:w-full 2xl:h-full"
            src="../../public/img/nino.png"
            alt="Imagen niño"
          />
        </div>
      </div>
    </LayoutFormulario>
  );
};

export default Inicio;
