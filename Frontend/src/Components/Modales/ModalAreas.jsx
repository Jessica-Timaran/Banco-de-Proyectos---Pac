import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '../Input2';
import PropTypes from 'prop-types';
import { useAreaForm } from '../../../hooks/useAreaForm';

export default function Areas({ onClose, onAddArea }) {
  const { formValues, errors, handleInputChange, handleSubmit } = useAreaForm((data) => {
    onAddArea(data);  // Llama al callback para actualizar la vista
    onClose();  // Cierra el modal después de añadir el área
  });

  return (
    <Dialog
      open={true}
      onClose={onClose}
      static={true}
      className="z-[100]"
    >
      <DialogPanel className="w-full max-w-2xl p-6 sm:mx-auto relative">
        <button
          type="button"
          className="absolute right-4 top-4 p-2 bg-transparent border-none"
          onClick={onClose}
          aria-label="Close"
        >
          <i className="fas fa-times size-5" aria-hidden={true}></i>
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h4 className="font-semibold">Añade una nueva Área</h4>
          <div className="relative flex flex-col p-[5%] Flex-box space-y-6">
            <Input2
              id="area"
              type="text"
              placeholder="Nombre del Área"
              value={formValues.area}
              onChange={handleInputChange}
              error={errors.area}
            />
          </div>
          <button
            type="submit"
            id="guardarBtn"
            className="bg-blue-500 text-white px-4 py-2 rounded justify-end"
          >
            Agregar
          </button>
        </form>
      </DialogPanel>
    </Dialog>
  );
}

Areas.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddArea: PropTypes.func.isRequired,
};
