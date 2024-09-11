import React from 'react';
import { Button, Dialog, DialogPanel, Card, Text } from '@tremor/react';

export function ModalConfirm({ onConfirm, onCancel, confirmText = "¿Estás seguro de realizar esta acción?" }) {
  const [isOpen, setIsOpen] = React.useState(true);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(); // Llama a la función para guardar los datos
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel(); // Cierra el modal sin realizar ninguna acción adicional
    }
  };

  return (
    <Dialog open={isOpen} onClose={() => {}} static={true}>
      <DialogPanel>
        <Card className="max-w-md mx-auto border-none">
          <div className="flex flex-col items-center text-center">
            <Text className="text-2xl font-bold text-gray-800 mb-2">
              Estas a punto de Guadar el proyecto
            </Text>
            <Text className="text-gray-600 mb-6">
              {confirmText}
            </Text>
            <div className="flex space-x-4">
              <Button
                className="max-w-32 bg-white text-black"
                size="xl"
                variant="secondary"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
              <Button
                className="max-w-32 bg-[#A3E784]"
                size="xl"
                variant="primary"
                onClick={handleConfirm}
              >
                Confirmar
              </Button>
            </div>
          </div>
        </Card>
      </DialogPanel>
    </Dialog>
  );
}
