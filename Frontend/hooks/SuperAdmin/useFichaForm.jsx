import { useState } from 'react';

export function useFichaForm(onSuccess) {
  const [formValues, setFormValues] = useState({
    nombre: '',
    numeroficha: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      errors.numeroficha = 'Debe contener solo números, exactamente 7 dígitos';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        const response = await fetch('https://banco-de-proyectos-pac.onrender.com/api/superAdmin/registerFicha', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Error desconocido');
        }

        const data = await response.json();
        onSuccess(data);
      } catch (error) {
        setErrors((prevErrors) => ({ ...prevErrors, submit: error.message }));
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return {
    formValues,
    errors,
    handleInputChange,
    handleSubmit,
    isSubmitting,
  };
}
