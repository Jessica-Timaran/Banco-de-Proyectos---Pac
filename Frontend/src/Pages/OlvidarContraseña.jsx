import React, { useState } from 'react';
import Input from '../Components/Input.jsx';
import BotonPrincipal from '../Components/BotonPrincipal.jsx';
import Modal from '../Components/Modal.jsx';

const OlvidarContraseña = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="flex h-screen items-center justify-center gap-x-72">
      <div className="flex content-center">
        <form id="formu" action="/Inicio" className="form flex flex-col w-96 items-center gap-20">
          <div className="logo-sena flex m-auto items-center justify-center w-80 h-28 bg-custom-green rounded-bl-[50px] rounded-br-[50px]">
            <img className="sena w-20 h-20" src="/public/img/logoSena.png" width="10" height="10" alt="Logo Sena"/>
          </div>

          <div className="registro flex flex-col items-center gap-20 min-w-96">
            <div className="text-3xl">OLVIDAR CONTRASEÑA</div>

            <div className="relative w-full">
              <Input type="text" Text="" placeholder="Correo:" id="registroNombre" />
              <span id="nombreError" className="error-message"></span>
            </div>

            <BotonPrincipal Text="Recuperar" className="show-modal" onClick={handleShowModal} />

            <h3 className="w-[200px] h-[44px] py-[10px] cursor-pointer text-[15px] mt-3 self-center">
              ¿Ya tienes cuenta? 
              <a href="/Inicio" className="text-blue-500 underline decoration-1">Iniciar Sesión</a>
            </h3>
          </div>
        </form>
      </div>

      <div className="hidden lg:block w-full lg:w-[800px]">
        <img className="w-[800px] h-[800px]" src="../../public/img/registro.png" alt="Registro" />
      </div>

      {isModalOpen && (
        <Modal Text="Se le ha enviado un link a su correo">
          <button className="close-modal" onClick={handleCloseModal}>Cerrar</button>
        </Modal>
      )}
    </div>
  );
};

export default OlvidarContraseña;
