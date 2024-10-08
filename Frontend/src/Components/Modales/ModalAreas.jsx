import { useState } from 'react';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '../Input2';
import PropTypes from 'prop-types';
import { useAreaForm } from '../../../hooks/SuperAdmin/useAreaForm';

export default function Areas({ onClose, onAddArea }) {
  const { formValues, errors, handleInputChange, handleSubmit, isSubmitting } = useAreaForm((data) => {
    onAddArea(data);  // Llama al callback para agregar un área y actualizar la vista en el componente padre
    setSuccessMessage('Registro exitoso');  // Establece el mensaje de éxito
    setTimeout(() => {
      onClose();  // Cierra el modal automáticamente después de 2 segundos
    }, 2000);  // Temporizador antes de cerrar el modal
  });

  const [successMessage, setSuccessMessage] = useState('');  // Estado que maneja el mensaje de éxito

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!isSubmitting) handleSubmit(e);  // Llama a handleSubmit solo si no se está enviando
  };

  return (
    <Dialog open={true} onClose={onClose} static={true} className="z-[100]">
      <DialogPanel className="sm:max-w-md">
        <button
          type="button"
          className="absolute right-4 top-4 p-2 bg-transparent border-none"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <i className="fas fa-times size-5" aria-hidden={true}></i>
        </button>
        
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <h4 className="font-semibold">Añade una nueva Área</h4>
          <div className="relative flex flex-col p-[5%] space-y-6">
            <Input2
              id="area"
              type="text"
              placeholder="Nombre del Área"
              value={formValues.area}
              onChange={handleInputChange}
              error={errors.area}
            />
          </div>
          
          {successMessage && (
            <div className="mt-4 text-green-600">
              {successMessage}
            </div>
          )}

          <div className='flex justify-end mt-8'>
            <button
              type="submit"
              id="guardarBtn"
              className="bg-Verde text-white px-4 py-2 rounded justify-end"
              disabled={isSubmitting}  // Deshabilita el botón mientras se envía el formulario
            >
              {isSubmitting ? 'Registrando...' : 'Agregar'}
            </button>
          </div>
        </form>
      </DialogPanel>
    </Dialog>
  );
}

Areas.propTypes = {
  onClose: PropTypes.func.isRequired,  // Función para cerrar el modal
  onAddArea: PropTypes.func.isRequired,  // Función que se llama al agregar un área
};
