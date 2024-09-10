
import PropTypes from 'prop-types';
import { RiCloseLine } from '@remixicon/react';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '../Input2';
import RadioButton from '../RadioButton3';
import SelectBoxRol from '../SelectBoxRol2';
import SelectBoxTi from '../SelectBoxTI2';
import BotonSegundoModal from '../BotonSegundoModal';
import { useState } from 'react';

export default function ModalUsuario({ onClose, onAddMember }) {
  const [formValues, setFormValues] = useState({
    tipoDocumento: '',
    nombreUsu: '',
    numeroDoc: '',
    correo: '',
    contrasena: '',
    celular: '',
    tipoRol: '',
    estado: '' // Se inicializa como cadena vacía
  });

  const [errors, setErrors] = useState({});
  const [ setSuccessMessage] = useState('');

  const validateFields = async () => {
    const newErrors = {};
    let valid = true;

    // Validación del nombre
    if (!formValues.nombreUsu.trim()) {
      newErrors.nombreUsu = 'El nombre es obligatorio.';
      valid = false;
    }

    // Validación del tipo de documento
    if (!formValues.tipoDocumento) {
      newErrors.tipoDocumento = 'Seleccione un tipo de documento.';
      valid = false;
    }

    // Validación del número de documento
    if (!formValues.numeroDoc.trim()) {
      newErrors.numeroDoc = 'El número de documento es obligatorio.';
      valid = false;
    } else if (formValues.numeroDoc.length < 7 || formValues.numeroDoc.length > 10) {
      newErrors.numeroDoc = 'El número de documento no es válido.';
      valid = false;
    }

    // Validación del correo
    if (!formValues.correo.trim()) {
      newErrors.correo = 'El correo electrónico es obligatorio.';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formValues.correo)) {
      newErrors.correo = 'El correo electrónico no es válido.';
      valid = false;
    }

    // Validación de la contraseña
    if (!formValues.contrasena.trim()) {
      newErrors.contrasena = 'La contraseña es obligatoria.';
      valid = false;
    } else if (formValues.contrasena.length < 6) {
      newErrors.contrasena = 'La contraseña debe tener al menos 6 caracteres.';
      valid = false;
    }

    // Validación del rol
    if (!formValues.tipoRol) {
      newErrors.tipoRol = 'Seleccione un rol.';
      valid = false;
    }

    // Validación del celular
    if (!formValues.celular.trim()) {
      newErrors.celular = 'El número de celular es obligatorio.';
      valid = false;
    } else if (formValues.celular.length < 10 || formValues.celular.length > 12) {
      newErrors.celular = 'El número de celular no es válido.';
      valid = false;
    }

    // Validación del estado
    if (formValues.estado === '') {
      newErrors.estado = 'Seleccione un estado.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateFields();

    if (isValid) {
      try {
        const response = await fetch('http://localhost:4000/api/agregarpersona', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre: formValues.nombreUsu,
            tipodocumento: formValues.tipoDocumento,
            numerodocumento: formValues.numeroDoc,
            telefono: formValues.celular,
            correo: formValues.correo,
            contraseña: formValues.contrasena,
            idrol: formValues.tipoRol,
            estado: formValues.estado === 'Activo',
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setSuccessMessage('Registro exitoso');
          console.log('Persona registrada con éxito:', data);
          onAddMember(formValues); // Pasar los valores del nuevo usuario a la función onAddMember
          onClose(); // Cerrar el modal

          // Restablecer valores del formulario
          setFormValues({
            tipoDocumento: '',
            nombreUsu: '',
            numeroDoc: '',
            correo: '',
            contrasena: '',
            celular: '',
            tipoRol: '',
            estado: ''
          });
        } else {
          console.error('Error al registrar persona:', response.statusText);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    } else {
      console.log('Errores en el formulario:', errors);
    }
  };

  return (
    <>
      <Dialog
        open={true}
        onClose={onClose}
        static={true}
        className="z-[100]"
      >
        <DialogPanel className="w-full max-w-2xl p-6 sm:mx-auto relative">
          <button
            type="button"
            className="absolute right-4 top-4 p-2 bg-transparent border-none text-tremor-content-subtle hover:text-tremor-content hover:bg-tremor-background-subtle dark:text-dark-tremor-content-subtle dark:hover:bg-dark-tremor-background-subtle dark:hover:text-tremor-content"
            onClick={onClose}
            aria-label="Close"
          >
            <RiCloseLine className="size-5" aria-hidden={true} />
          </button>
          <form onSubmit={handleSubmit} className="space-y-4">
            <h4 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Añade nuevo usuario
            </h4>
            <p className="mt-2 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
              Por favor llene todos los datos del usuario
            </p>
            <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
              <div className="col-span-full sm:col-span-3 space-y-4">
                <Input2
                  id="nombreUsu"
                  type="text"
                  placeholder="Nombre del usuario"
                  Text="Nombre del usuario:"
                />
                <SelectBoxTi
                  id="tipoDoc"
                  text="Tipo de documento" 
                />
                <Input2
                  id="numeroDoc"
                  type="text"
                  placeholder="Numero de documento"
                  Text="Numero de documento:"
                />
                <Input2
                  id="correo"
                  type="email"
                  placeholder="Correo"
                  Text="Correo Electronico:"
                />
              </div>
              <div className="col-span-full sm:col-span-3 space-y-4">
                <Input2
                  id="contrasena"
                  type="password"
                  placeholder="Contraseña"
                  Text="Contraseña:"
                />
                <SelectBoxRol
                  id="tipoRol"
                  text="Seleccione un rol:" 
                />
                <div className="space-y-5">
                  <span className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    Selecciona una opción:
                  </span>
                  <div className="space-y-1 flex mt-2">
                    <RadioButton Text="Activo" id="estadoActivo" />
                  </div>
                </div>
                <Input2
                  id="celular"
                  type="text"
                  placeholder="Celular"
                  Text="Celular:"
                />
              </div>
            </div>
            <BotonSegundoModal text="Agregar" id="guardarBtn" />
          </form>
        </DialogPanel>
      </Dialog>
    </>
  );
}

ModalUsuario.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddMember: PropTypes.func.isRequired,
};