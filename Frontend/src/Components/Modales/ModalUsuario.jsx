import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '../Input2';
import SelectBoxRol2 from '../SelectBoxRol2';
import SelectBoxFicha from '../SelectBoxFicha';
import SelectBoxTi from '../SelectBoxTI2';
import RadioButton3 from '../RadioButton3';
import PropTypes from 'prop-types';
import { useForm } from '../../../hooks/useForm';

export default function ModalUsuario({ onClose, onAddMember }) {
  const { formValues, errors, handleInputChange, handleSubmit } = useForm(async (data) => {
    onAddMember(data);
    onClose();
  });

  const handleRolChange = (value) => {
    handleInputChange({ target: { id: 'tipoRol', value } });
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <h4 className="font-semibold">Añade nuevo usuario</h4>
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div className="space-y-4">
              <Input2
                id="nombreUsu"
                type="text"
                placeholder="Nombre del usuario"
                value={formValues.nombreUsu}
                onChange={handleInputChange}
                error={errors.nombreUsu}
              />
              <SelectBoxTi
                id="tipoDocumento"
                text="Tipo de documento"
                value={formValues.tipoDocumento}
                onChange={(value) => handleInputChange({ target: { id: 'tipoDocumento', value } })}
                error={errors.tipoDocumento}
              />
              <Input2
                id="numeroDoc"
                type="text"
                placeholder="Número de documento"
                value={formValues.numeroDoc}
                onChange={handleInputChange}
                error={errors.numeroDoc}
              />
              <Input2
                id="correo"
                type="email"
                placeholder="Correo"
                value={formValues.correo}
                onChange={handleInputChange}
                error={errors.correo}
              />
            </div>
            <div className="space-y-4">
              <Input2
                id="contrasena"
                type="password"
                placeholder="Contraseña"
                value={formValues.contrasena}
                onChange={handleInputChange}
                error={errors.contrasena}
              />
              <SelectBoxRol2
                id="tipoRol"
                text="Seleccione un rol:"
                value={formValues.tipoRol}
                onChange={handleRolChange}
                error={errors.tipoRol}
              />
              {formValues.tipoRol.toLowerCase() === 'aprendiz' && (
                <SelectBoxFicha
                  id="fichaSeleccionada"
                  text="Seleccione una ficha:"
                  value={formValues.fichaSeleccionada}
                  onChange={(value) => handleInputChange({ target: { id: 'fichaSeleccionada', value } })}
                  error={errors.fichaSeleccionada}
                />
              )}
              <div className="space-y-6">
                <div className="flex">
                  <RadioButton3
                    Text="Activo"
                    id="estadoActivo"
                    value="Activo"
                    checked={formValues.estado === 'Activo'}
                    onChange={() => handleInputChange({ target: { id: 'estado', value: 'Activo' } })}
                    error={errors.estado}
                  />
                  <RadioButton3
                    Text="Inactivo"
                    id="estadoInactivo"
                    value="Inactivo"
                    checked={formValues.estado === 'Inactivo'}
                    onChange={() => handleInputChange({ target: { id: 'estado', value: 'Inactivo' } })}
                    error={errors.estado}
                  />
                </div>
              </div>
              <Input2
                id="celular"
                type="text"
                placeholder="Celular"
                value={formValues.celular}
                onChange={handleInputChange}
                error={errors.celular}
              />
            </div>
          </div>
          <button
            type="submit"
            id="guardarBtn"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Agregar
          </button>
        </form>
      </DialogPanel>
    </Dialog>
  );
}

ModalUsuario.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddMember: PropTypes.func.isRequired,
};
