import React from 'react';
import { Button, Dialog, DialogPanel } from '@tremor/react';

export function ModalConfirm({ onClose }) {
  const [isOpen, setIsOpen] = React.useState(true); // Iniciar como abierto

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) {
      onClose(); // Llamar al manejador de cierre pasado como prop
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} static={true}>
      <DialogPanel>
        <div className="w-10 h-10 flex justify-center items-center">
          <i className="fa-solid fa-check w-10 h-10 flex justify-center items-center"></i>
        </div>
        <Button className="mt-8 w-full" onClick={handleClose}>
          <p>El proyecto ya se reviso</p>
          <p>Volver al inicio</p>
        </Button>
      </DialogPanel>
    </Dialog>
  );
}