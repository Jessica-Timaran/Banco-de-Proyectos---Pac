import React, {  useState, useEffect} from 'react';
import InputField from '../../Components/Input.jsx'; // Asegúrate de que esta importación sea correcta
import BotonSegundo from '../../Components/BotonSegundo.jsx';

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
      const response = await fetch("http://localhost:4000/api/aprendiz/reset-password", {
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



    <div className=" flex justify-center  ">
    <div className=" w-[100em]  flex column items-center ">
      <div className="bg-white  rounded-lg  w-[40%]  flex flex-col items-center   ">
      <div className="logo-sena flex m-auto items-center justify-center w-56 h-20 sm:w-72 sm:h-24 lg:w-80 lg:h-28 2xl:w-96 2xl:h-32 bg-[#A3E784] rounded-bl-[40px] rounded-br-[40px]">
              <img
                className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
                src="/public/img/logo.png"
                alt="Logo Sena"
              />
            </div>
        <h2 className="text-[33px] font-bold text-gray-800 text-center mt-[15%]  ">
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
      <div className=" bg-white p-8 rounded-lg  w-[60%]  ">
        <img src={Img2} className="w-[80em] h-[50%]  " />

      </div>
    </div>
    </div>
  );
};

export default OlvidarContraseña;