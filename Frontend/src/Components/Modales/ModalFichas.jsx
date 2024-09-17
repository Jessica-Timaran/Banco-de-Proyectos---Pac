import PropTypes from 'prop-types';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '../Input2';
import RadioButton3 from '../RadioButton3';
import { useFichaForm } from '../../../hooks/useFichaForm';
import { useState } from 'react';
import BotonSegundo from '../BotonSegundo';  // Importar el nuevo botón

export default function ModalFicha({ onClose, onAddFicha }) {
  const { formValues, errors, handleInputChange, handleSubmit } = useFichaForm((data) => {
    onAddFicha(data);
    onClose();
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!isSubmitting) {
      setIsSubmitting(true);
      await handleSubmit(e);
      setIsSubmitting(false);
    }
  };

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
        className="absolute right-4 top-4 p-2 bg-transparent border-none text-tremor-content-subtle hover:text-tremor-content"
        onClick={onClose}
        aria-label="Close"
      >
        <i className="fas fa-times size-5" aria-hidden={true}></i>
      </button>
      
      {/* Formulario */}
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="flex flex-col p-[5%] space-y-6">
          <div className="col-span-full sm:col-span-3 space-y-2">
            
            {/* Input para Nombre del programa */}
            <div>
              <Input2
                id="nombre"
                type="text"
                placeholder="Nombre del programa"
                Text="Nombre del programa:"
                value={formValues.nombre}
                onChange={handleInputChange}
                error={errors.nombre}
              />
            </div>

            {/* Input para Número de ficha */}
            <div>
              <Input2
                id="numeroficha"
                type="text"
                placeholder="Número de ficha"
                Text="Número de ficha:"
                value={formValues.numeroficha}
                onChange={handleInputChange}
                error={errors.numeroficha}
              />
            </div>

            {/* Botón de Radio para Estado */}
            <div>
              <RadioButton3
                Text="Activo"
                id="estadoActivo"
                value="Activo"
                checked={formValues.estado === true}
                onChange={() => handleInputChange({ target: { id: 'estado', value: true } })}
                error={errors.estado}
              />
              <RadioButton3
                Text="Inactivo"
                id="estadoInactivo"
                value="Inactivo"
                checked={formValues.estado === false}
                onChange={() => handleInputChange({ target: { id: 'estado', value: false } })}
                error={errors.estado}
              />
            </div>
          </div>
        </div>

        {/* Botón de Guardar */}
        <BotonSegundo
          Text={isSubmitting ? 'Guardando...' : 'Agregar'}
          onClick={handleFormSubmit}
          additionalClasses="text-black bg-[#A3E784] hover:bg-[#90cc74]"
          size="md"
        />
      </form>
    </DialogPanel>
  </Dialog>
  );
}

ModalFicha.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddFicha: PropTypes.func.isRequired,
};
