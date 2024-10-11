import { useState } from 'react';

export function useForm(onSuccess) {
  const [formValues, setFormValues] = useState({
    nombre: '',
    tipodocumento: '',
    numerodocumento: '',
    correo: '',
    contraseña: '',
    celular: '',
    idrol: '',
    idficha: '', // Inicializar como cadena vacía
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    const nombrePattern = /^[A-Za-z\s]{2,50}$/;
    if (!nombrePattern.test(formValues.nombre.trim())) {
      errors.nombre = 'El nombre debe contener solo letras y tener entre 2 y 50 caracteres.';
      isValid = false;
    }

    if (!formValues.tipodocumento) {
      errors.tipodocumento = 'Este campo es obligatorio.';
      isValid = false;
    }

    const numeroDocPattern = /^[0-9]{6,10}$/;
    if (!numeroDocPattern.test(formValues.numerodocumento.trim())) {
      errors.numerodocumento = 'El número de documento debe tener entre 6 y 10 dígitos.';
      isValid = false;
    }

    const correoPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!correoPattern.test(formValues.correo.trim())) {
      errors.correo = 'El correo debe tener un formato válido.';
      isValid = false;
    }

    if (formValues.contraseña.trim().length < 8) {
      errors.contraseña = 'La contraseña debe tener al menos 8 caracteres.';
      isValid = false;
    }

    const celularPattern = /^[0-9]{10,12}$/;
    if (!celularPattern.test(formValues.celular.trim())) {
      errors.celular = 'El teléfono debe tener entre 10 y 12 dígitos.';
      isValid = false;
    }

    if (!formValues.idrol) {
      errors.idrol = 'Este campo es obligatorio.';
      isValid = false;
    }

    if (formValues.idrol === '4' && !formValues.idficha) {
      errors.idficha = 'Debe seleccionar una ficha para el rol de Aprendiz.';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [id]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleRolChange = (value) => {
    handleSelectChange('idrol', value);
    if (value !== '4') {
      handleSelectChange('idficha', '');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);  // Bloquear el envío adicional

    try {
      const userData = {
        ...formValues,
        idrol: parseInt(formValues.idrol, 10),
        idficha: formValues.idrol === '4' ? parseInt(formValues.idficha, 10) : null,
      };

      const response = await fetch('https://banco-de-proyectos-pac.onrender.com/api/superAdmin/agregarpersona', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error desconocido');
      }

      const data = await response.json();
      onSuccess(data);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);  // Reestablecer el estado
    }
  };

  return {
    formValues,
    errors,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    handleRolChange,
    isSubmitting,  // Exponer isSubmitting para deshabilitar el botón
  };
}
