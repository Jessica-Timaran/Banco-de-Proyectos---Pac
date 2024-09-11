import React, { useState } from 'react';
import LayoutFormulario from "../../layouts/LayoutFormulario";
import Input from "../../Components/Input";
import BotonPrincipal from "../../Components/BotonPrincipal";
import '../../css/Incio.css';
import { useUser } from '../../Context/UserContext';

const Inicio = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [correoError, setCorreoError] = useState('');
  const [contrasenaError, setContrasenaError] = useState('');
  const [globalError, setGlobalError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const { setUser } = useUser();

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

      console.log('Respuesta del servidor:', result); // Verifica la respuesta aquí

      if (response.ok) {
        if (result.id && result.nombre) {
          setUser({ id: result.id, nombre: result.nombre, rol: result.rol });
          localStorage.setItem('userId', result.id);
          localStorage.setItem('userRole', result.rol);
          localStorage.setItem('userName', result.nombre);

          // Muestra el mensaje de éxito
          setSuccessMessage('Inicio de sesión exitoso');

          // Redirige después de 2 segundos para que se vea el mensaje de éxito
          setTimeout(() => {
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
          }, 2000);
        } else {
          console.error("El ID o nombre del usuario no se encontró en la respuesta");
        }
      } else {
        if (response.status === 401) {
          setGlobalError('Correo o contraseña incorrectos');
        } else {
          setGlobalError('Error en el servidor. Intenta nuevamente.');
        }
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      setGlobalError('Error en la conexión. Intenta nuevamente.');
    }
  };

 
  return (
    <LayoutFormulario title="Formulario">
      <div className="flex flex-col lg:flex-row min-h-screen items-center justify-center lg:gap-x-8 xl:gap-x-16 2xl:gap-x-24 px-4 py-8 lg:py-0">
        <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl lg:w-1/2">
          <form
            id="formu"
            onSubmit={handleSubmit}
            className="form flex flex-col w-full justify-center items-center gap-y-8 lg:gap-y-12 2xl:gap-y-16"
          >
            <div className="logo-sena flex m-auto items-center justify-center w-56 h-20 sm:w-72 sm:h-24 lg:w-80 lg:h-28 2xl:w-96 2xl:h-32 bg-[#A3E784] rounded-bl-[40px] rounded-br-[40px]">
              <img
                className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
                src="/public/img/logo.png"
                alt="Logo Sena"
              />
            </div>

            <div className="login flex flex-col items-center gap-y-4 w-full max-w-sm">
              <div className="text-2xl sm:text-3xl pb-4 lg:pb-8">LOGIN</div>

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

              {globalError && (
                <span id="globalError" className="error-message">
                  {globalError}
                </span>
              )}

              {successMessage && (
                <span className="text-green-600 font-bold mt-2 text-center">
                  {successMessage}
                </span>
              )}

              <div className="flex justify-end w-full">
                <a href="/OlvidarContraseña" className="text-blue-500 underline decoration-1">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <BotonPrincipal Text="Login" />
            </div>

            <div className="boton items-center text-center">
              <div className="flex justify-center">¿No tienes cuenta?</div>
              <a href="/Principal/Registro1" className="signup text-blue-500 underline decoration-1">
                Registrarse
              </a>
            </div>
            </form>
        </div>

        <div className="hidden lg:flex lg:w-1/2 xl:w-[600px] 2xl:w-[800px] items-center justify-center">
          <img
            className="w-full h-auto max-h-[80vh] object-contain"
            src="../../public/img/nino.png"
            alt="Imagen niño"
          />
        </div>
      </div>
    </LayoutFormulario>
  );
};

export default Inicio;