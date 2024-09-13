import PropTypes from 'prop-types';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '../Input2';
import { useFichaForm } from '../../../hooks/useFichaForm';

export default function ModalFicha({ onClose, onAddFicha }) {
  const { formValues, errors, handleInputChange, handleSubmit } = useFichaForm((data) => {
    onAddFicha(data);  // Llama al callback para actualizar la vista
    onClose();  // Cierra el modal después de añadir el usuario
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
        <h4 className="font-semibold">Añade nueva ficha</h4>
          <div className="flex flex-col p-[5%] space-y-4">
            <div className="col-span-full sm:col-span-3 space-y-2">
              <div className="relative">
                <Input2
                  id="nombre"
                  type="text"
                  placeholder="Sistemas"
                  Text="Nombre del programa:"
                  value={formValues.nombre}
                  onChange={handleInputChange}
                  error={errors.nombre}
                />
              </div>

              <div className="relative">
                <Input2
                  id="numeroficha"
                  type="text"
                  placeholder="2694265"
                  Text="Número de ficha:"
                  value={formValues.numeroficha}
                  onChange={handleInputChange}
                  error={errors.numeroficha}
                />
              </div>
            </div>
          </div>
          <div className='flex justify-end'> 
          <button
            type="submit"
            id="guardarBtn"
            className="bg-verde text-black px-8 py-2 rounded"
          >
            Agregar
          </button>
          </div>
        </form>
      </DialogPanel>
    </Dialog>
  );
};

ModalFicha.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddFicha: PropTypes.func.isRequired,
};
