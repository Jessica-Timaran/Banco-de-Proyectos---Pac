import React from 'react';
import Input from '../../Components/Input.jsx';
import SelectBoxTI from '../../Components/SelectBoxTI.jsx';
import LayoutPrincipal from '../../layouts/LayoutPrincipal.jsx';
import Layoutcontenido3 from '../../Layouts/Layoutcontenido3.jsx';
import BotonPrincipal from '../../Components/BotonPrincipal.jsx';
import ModalPerfil from '../../Components/Modal.jsx';
import '../css/EditarPerfil.css'

const EditarPerfil = () => {
  const showModal = () => {
    document.querySelector('.modal').classList.remove('hidden');
  };

  const closeModal = () => {
    document.querySelector('.modal').classList.add('hidden');
  };

  return (
    <LayoutPrincipal title="Editar Perfil">
      <Layoutcontenido3 title="Editar Perfil">
        <div className="w-full md:w-1/2">
          <div className="flex flex-col p-[5%] Flex-box">
            <Input placeholder="Nombre completo" type="text" Text="Nombre completo *" id="nombre" />
            <SelectBoxTI Text="Tipo de documento:" />
            <Input placeholder="Número de documento" type="text" Text="Número de documento" id="numeroDoc" />
            <Input placeholder="Teléfono" type="text" Text="Teléfono *" id="telefono" />
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <div className="flex flex-col p-[5%] Flex-box">
            <Input placeholder="Correo" type="email" Text="Correo:" id="correo" />
            <Input type="text" Text="Nombre de la Empresa:" placeholder="Nombre de la Empresa" id="nombreEmpresa" />
            <Input placeholder="Contraseña" type="password" Text="Contraseña *" id="contraseña" />
            <Input placeholder="Confirmar Contraseña" type="password" Text="Confirmar Contraseña *" id="confiContraseña" />
            <div className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <div>
                <BotonPrincipal Text="Guardar" />
              </div>
            </div>
          </div>
        </div>

        <ModalPerfil Text="Perfil actualizado" />

        <div className="modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-[#B9B9B9] bg-opacity-70">
          <div className="bg-white rounded shadow-lg w-96 max-[768px]:w-[20rem]">
            <div className="border-b px-4 py-2 flex justify-end items-center">
              <button className="text-black close-modal" onClick={closeModal}> &cross; </button>
            </div>
            <div className="border-b px-4 py-2 flex flex-col justify-center items-center">
              <span className="font-Josefin-Slab">Perfil actualizado</span>
            </div>
          </div>
        </div>
      </Layoutcontenido3>
    </LayoutPrincipal>
  );
};

export default EditarPerfil;
