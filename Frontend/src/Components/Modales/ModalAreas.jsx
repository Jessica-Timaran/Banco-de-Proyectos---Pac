import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '../Input2';
import PropTypes from 'prop-types';
import { useAreaForm } from '../../../hooks/useAreaForm';
import BotonSegundo from '../BotonSegundoModal';

export default function Areas({ onClose, onAddArea }) {
  const { formValues, errors, handleInputChange, handleSubmit } = useAreaForm(async (newArea) => {
    try {
      // Llama a la función para actualizar la tabla con el nuevo área
      onAddArea(newArea);

      // Cierra el modal
      onClose();
    } catch (error) {
      console.error('Error al añadir el área:', error);
    }
  });

  return (
    <Dialog open={true} onClose={onClose} static={true} className="z-[100]">
      <DialogPanel className="sm:max-w-md">
        <button
          type="button"
          className="absolute right-4 top-4 p-2 bg-transparent border-none text-tremor-content-subtle hover:text-tremor-content hover:bg-tremor-background-subtle dark:text-dark-tremor-content-subtle dark:hover:bg-dark-tremor-background-subtle dark:hover:text-tremor-content"
          onClick={onClose}
          aria-label="Close"
        >
          <i className="fas fa-times size-5" aria-hidden={true}></i>
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col p-[5%] space-y-6">
            <div className="col-span-full sm:col-span-3 space-y-2">
              <div>
                <Input2
                  id="area"
                  Text="Ingrese Área:"
                  type="text"
                  placeholder="Nombre del Área"
                  value={formValues.area}
                  onChange={handleInputChange}
                  error={errors.area}
                />
              </div>
            </div>
          </div>
          <BotonSegundo text="Guardar" id="guardarBtn" />
        </form>
      </DialogPanel>
    </Dialog>
  );
}

Areas.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddArea: PropTypes.func.isRequired,
};
