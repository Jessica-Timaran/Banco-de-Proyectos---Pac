import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '../Input2';
import SelectBoxRol2 from '../SelectBoxRol2';
import SelectBoxFicha from '../SelectBoxFicha';
import SelectBoxTi from '../SelectBoxTI2';
import PropTypes from 'prop-types';
import { useForm } from '../../../hooks/SuperAdmin/useForm';

export default function ModalUsuario({ onClose, onAddMember }) {
  const { formValues, errors, handleInputChange, handleSelectChange, handleSubmit, handleRolChange } = useForm(async (data) => {
    onAddMember(data);
    setSuccessMessage('Registro exitoso');  // Establece el mensaje de éxito
    setTimeout(() => {
    onClose();
  }, 2000);
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!isSubmitting) handleSubmit(e);  // Llama a handleSubmit solo si no se está enviando
  };

  return (
    <Dialog open={true} onClose={onClose} static={true} className="z-[100]">
      <DialogPanel className="w-full max-w-2xl p-6 sm:mx-auto relative">
        <button
          type="button"
          className="absolute right-4 top-4 p-2 bg-transparent border-none"
          onClick={onClose}
          aria-label="Close"
        >
          <i className="fas fa-times size-5" aria-hidden={true}></i>
        </button>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <h4 className="font-semibold">Añade nuevo usuario</h4>
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div className="space-y-4">
              <Input2
                id="nombre"
                type="text"
                Text="Nombre"
                placeholder="Nombre del usuario"
                value={formValues.nombre}
                onChange={handleInputChange}
                error={errors.nombre}
              />
              <SelectBoxTi
                id="tipodocumento"
                text="Tipo de documento"
                value={formValues.tipodocumento}
                onChange={(value) => handleInputChange({ target: { id: 'tipodocumento', value } })}
                error={errors.tipodocumento}
              />
              <Input2
                id="numerodocumento"
                type="text"
                Text="Numero de documento"
                placeholder="Número de documento"
                value={formValues.numerodocumento}
                onChange={handleInputChange}
                error={errors.numerodocumento}
              />
              <Input2
                id="correo"
                type="email"
                Text="Correo"
                placeholder="Correo"
                value={formValues.correo}
                onChange={handleInputChange}
                error={errors.correo}
              />
            </div>
            <div className="space-y-4">
              <Input2
                id="contraseña"
                type="password"
                Text="Contraseña"
                placeholder="Contraseña"
                value={formValues.contraseña}
                onChange={handleInputChange}
                error={errors.contraseña}
              />
              <SelectBoxRol2
                id="idrol"
                text="Seleccione un rol:"
                value={formValues.idrol}
                onChange={handleRolChange}
                error={errors.idrol}
              />
              {formValues.idrol === '4' && (
                <SelectBoxFicha
                  id="idficha"
                  text="Seleccione una ficha:"
                  value={formValues.idficha}
                  onChange={(value) => handleSelectChange('idficha', value)}  // Actualiza idficha
                  error={errors.idficha}
                />
              )}
              <Input2
                id="celular"
                type="text"
                Text="Celular"
                placeholder="Celular"
                value={formValues.celular}
                onChange={handleInputChange}
                error={errors.celular}
              />
            </div>
          </div>
          {successMessage && (
            <div className="mt-4 text-green-600">
              {successMessage}
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              id="guardarBtn"
              className="bg-verde text-white px-8 py-2 rounded"
            >
              Agregar
            </button>
          </div>
        </form>
      </DialogPanel>
    </Dialog>
  );
}

ModalUsuario.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddMember: PropTypes.func.isRequired,
};
