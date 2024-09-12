import { useState } from 'react';

export function useAreaForm(onSuccess) {
  const [formValues, setFormValues] = useState({
    area: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Validar Nombre del área (solo letras y espacios)
    const nombrePattern = /^[A-Za-zÀ-ÿ\s.,]{2,50}$/;
    if (!nombrePattern.test(formValues.area.trim())) {
      errors.area = 'El nombre debe contener solo letras y tener entre 2 y 50 caracteres.';  // Cambiado a 'errors.area'
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues(prevValues => ({ ...prevValues, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:4000/api/registerArea', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formValues)
        });

        if (!response.ok) {
          const error = await response.json();
          console.error('Error en la respuesta del servidor:', error);
          throw new Error(error.error || 'Error desconocido');
        }

        const data = await response.json();
        onSuccess(data);
      } catch (error) {
        console.error('Error al registrar el área:', error);
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
