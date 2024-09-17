import { useState } from 'react';

export function useFichaForm(onSuccess) {
  const [formValues, setFormValues] = useState({
    nombre: '',
    estado: true, // Estado por defecto como booleano
    numeroficha: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    const nombrePattern = /^[A-Za-zÀ-ÿ\s.,]{2,50}$/;
    if (!nombrePattern.test(formValues.nombre.trim())) {
      errors.nombre = 'El nombre debe contener solo letras y tener entre 2 y 50 caracteres.';
      isValid = false;
    }

    const numerofichaPattern = /^[0-9]{7}$/;
    if (!numerofichaPattern.test(formValues.numeroficha.trim())) {
      errors.numeroficha = "Debe contener solo números, exactamente 7 dígitos";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'estado') {
      setFormValues(prevValues => ({ ...prevValues, [id]: value === 'true' }));
    } else {
      setFormValues(prevValues => ({ ...prevValues, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Valores del formulario:", formValues);
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:4000/api/superAdmin/fichas', { // URL correcta de la API
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
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
        console.error('Error al registrar ficha:', error);
        setErrors(prevErrors => ({ ...prevErrors, submit: error.message }));
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