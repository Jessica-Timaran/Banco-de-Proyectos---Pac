import React, { useState, useEffect } from 'react';
import LayoutFormulario from "../../layouts/LayoutFormulario";
import Input from "../../Components/Input";
import BotonPrincipal from "../../Components/BotonPrincipal";
import '../../css/Incio.css';

const Inicio = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [correoError, setCorreoError] = useState('');
  const [contrasenaError, setContrasenaError] = useState('');
  const [globalError, setGlobalError] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  const togglePasswordVisibility = () => {
    setMostrarContrasena(!mostrarContrasena);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCorreoError('');
    setContrasenaError('');
    setGlobalError('');

    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contraseña: contrasena }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setGlobalError('Correo o contraseña incorrectos');
        } else {
          setGlobalError('Error en el servidor. Intenta nuevamente.');
        }
      } else {
        // Redirige según el rol del usuario
        switch (result.rol) {
          case 1:
            window.location.href = '/Admin/VistaAdministrador';
            break;
          case 2:
            window.location.href = '/Usuario/VistaUsuario';
            break;
          case 3:
            window.location.href = '/SuperAdmin/VistaSuperadmin';
            break;
          case 4:
            window.location.href = '/Aprendiz/VistaAprendiz';
            break;
          default:
            setGlobalError('Rol de usuario desconocido');
            break;
        }
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      setGlobalError('Error en la conexión. Intenta nuevamente.');
    }
  };

  return (
    <LayoutFormulario title="Formulario">
      <div className="flex 2xl:h-screen h-auto sm:96 items-center justify-center 2xl:gap-x-72">
        <div className="flex content-center">
          <form
            id="formu"
            onSubmit={handleSubmit}
            className="form flex flex-col 2xl:w-96 sm:w-[600px] sm:h-[900px] justify-center items-center 2xl:gap-28 gap-y-20 sm:gap-y-24"
          >
            <div className="logo-sena flex m-auto items-center justify-center w-56 h-20 sm:w-96 sm:h-32 2xl:max-w-80 2xl:max-h-32 bg-[#A3E784] 2xl:rounded-bl-[50px] 2xl:rounded-br-[50px] rounded-bl-[40px] rounded-br-[40px]">
              <img
                className="sena sm:w-20 sm:h-20 w-12 h-12"
                src="/public/img/logo.png"
                alt="Logo Sena"
              />
            </div>

            <div className="login flex flex-col items-center 2xl:gap-4 2xl:min-w-96 w-56 sm:w-96 gap-y-4 sm:gap-y-7">
              <div className="text-3xl 2xl:pb-8">LOGIN</div>

              <div className="relative w-full">
                <Input
                  type="email"
                  Text=""
                  placeholder="Correo:"
                  id="CorreoInicio"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
                <span id="correoError" className="error-message">
                  {correoError}
                </span>
              </div>

              <div className="relative w-full">
                <Input
                  type={mostrarContrasena ? 'text' : 'password'}
                  Text=""
                  placeholder="Contraseña:"
                  id="contrasenaInicio"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                />
                <i
                  className={`bx cursor-pointer absolute right-3 top-2/4 transform -translate-y-2/4 ${mostrarContrasena ? 'bx-hide' : 'bx-show'}`}
                  onClick={togglePasswordVisibility}
                ></i>
                <span id="contrasenaError" className="error-message">
                  {contrasenaError}
                </span>
              </div>

              <span id="globalError" className="error-message">
                {globalError}
              </span>

              <div className="flex justify-end w-full">
                <a href="/OlvidarContraseña" className="text-blue-500 underline decoration-1">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <BotonPrincipal Text="Login" />
            </div>

            <div className="boton items-center text-center sm:mb-20">
              <div className="flex">¿No tienes cuenta?</div>
              <a href="/Principal/Registro1" className="signup text-blue-500 underline decoration-1">
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