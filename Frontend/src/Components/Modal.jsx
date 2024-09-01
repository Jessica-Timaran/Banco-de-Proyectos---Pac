import React, { useState } from 'react';
import '../css/Modal.css'

const Modal = ({ Text }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* Botón para abrir el modal */}
      <button onClick={openModal}>Open Modal</button>

      {/* Modal */}
      {isOpen && (
        <div className="modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-[#B9B9B9] bg-opacity-70">
          <div className="bg-white rounded shadow-lg w-96 max-[768px]:w-[20rem]">
            <div className="border-b px-4 py-2 flex justify-end items-center">
              <button className="text-black close-modal" onClick={closeModal}>&times;</button>
            </div>
            <div className="border-b px-4 py-2 flex flex-col justify-center items-center">
              <span className="font-Josefin-Slab">{Text}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
