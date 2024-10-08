import React, {  useState, useEffect} from 'react';
import InputField from '../../Components/Input.jsx'; // Asegúrate de que esta importación sea correcta
import BotonSegundo from '../../Components/BotonSegundo.jsx';
import LayoutFormulario from "../../Layouts/LayoutFormulario";

import Img2 from    '../../../public/Img/usuario.png';

const OlvidarContraseña = () => {


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageClass, setMessageClass] = useState('');

  useEffect(() => {
    // Limpiar el mensaje de error cuando el usuario escribe en el campo de correo electrónico
    if (email) {
      setMessage('');
      setMessageClass('');
    }
  }, [email]);



  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Email:", email); // Verifica el valor del correo

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setMessage('Introduce un correo electrónico válido.');
      setMessageClass('text-red-500');
      return;
    }

    try {
      const response = await fetch("https://banco-de-proyectos-pac.onrender.com/api/aprendiz/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      console.log("Response:", result); // Verifica la respuesta del servidor

      if (response.ok) {
        setMessage('El enlace de restablecimiento fue enviado a tu correo.');
        setMessageClass('text-green-500');
      } else {
        setMessage(result.error || 'Por favor regístrate para hacer el cambio de contraseña.');
        setMessageClass('text-red-500');
      }
    } catch (error) {
      setMessage('Error al enviar el enlace de restablecimiento.');
      setMessageClass('text-red-500');
    }
  };

  


  return (

    <LayoutFormulario>

    <div className="flex justify-center items-center">
   
                <div className="bg-white rounded-lg w-[40%] flex flex-col items-center max-[768px]:w-[70%]   ">
                    <div className="logo-sena flex items-center justify-center w-56 h-20 sm:w-72 sm:h-24 lg:w-80 lg:h-28 2xl:w-96 2xl:h-32 bg-[#2eb694] rounded-bl-[40px] rounded-br-[40px] mb-[15%] ">
                    <img
                className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
                src="/Img/Logo.png"
                width="10"
                height="10"
                alt="Logo Sena"
              />
            </div>
        <h2 className="text-[33px] font-bold text-gray-800 text-center  ">
          Recuperar Contraseña
        </h2>
        <form id="reset-password-form" className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4 relative w-[20em] mt-[40px] ">
            <InputField
              placeholder="Correo"
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="  h-[100px] flex items-center justify-center ">
          <BotonSegundo
          Text= "Recuperar "
            type="submit"
           
            />
            </div>
          
          <p id="message" className={`mt-4 text-center ${messageClass}`}>
            {message}
          </p>
        </form>
      </div>
      <div className="bg-white p-8 rounded-lg w-[60%] flex max-[768px]:hidden">
                    <img src={Img2} className=" " />
                </div>
    </div>
    </LayoutFormulario>
  );
};

export default OlvidarContraseña;