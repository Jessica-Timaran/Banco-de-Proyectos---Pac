import { useState } from 'react';

export function useFichaForm(onSuccess) {
  const [formValues, setFormValues] = useState({
    nombre: '',
    estado: 'Activo',  // Valor por defecto para el estado
    numeroficha: ''
  });

  const [errors, setErrors] = useState({});

  // Función para validar el formulario
  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Validar nombre (solo letras y espacios, entre 2 y 50 caracteres)
    const nombrePattern = /^[A-Za-zÀ-ÿ\s.,]{2,50}$/;
    if (!nombrePattern.test(formValues.nombre.trim())) {
      errors.nombre = 'El nombre debe contener solo letras y tener entre 2 y 50 caracteres.';
      isValid = false;
    }

    // Validar número de ficha (solo números, exactamente 7 dígitos)
    const numerofichaPattern = /^[0-9]{7}$/;
    if (!numerofichaPattern.test(formValues.numeroficha.trim())) {
      errors.numeroficha = 'El número de ficha debe contener solo números y tener 7 dígitos.';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  // Manejar cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues(prevValues => ({ ...prevValues, [id]: value }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Valores del formulario:', formValues);  // Para depuración

    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:4000/api/superAdmin/registerFicha', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues)  // Enviar los valores del formulario
        });

        if (!response.ok) {
          const error = await response.json();
          console.error('Error en la respuesta del servidor:', error);
          throw new Error(error.error || 'Error desconocido');
        }

        const data = await response.json();
        onSuccess(data);  // Llamar al callback en caso de éxito
      } catch (error) {
        console.error('Error al registrar ficha:', error);
      }
    }
  };

  return {
    formValues,
    errors,
    handleInputChange,
    handleSubmit,
  };
}
