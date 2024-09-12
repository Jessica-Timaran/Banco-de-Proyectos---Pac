import { useState } from 'react';

export function useFichaForm(onSuccess) {
  const [formValues, setFormValues] = useState({
  nombre: '',
  estado: 'Activo', // Valor por defecto para el estado
  numeroficha:''
  });

  const [errors, setErrors] = useState({});

  
  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Validar Nombre del ficha (solo letras y espacios)
    const nombrePattern = /^[A-Za-zÀ-ÿ\s.,]{2,50}$/;
    if (!nombrePattern.test(formValues.nombre.trim())) {
      errors.nombre = 'El nombre debe contener solo letras y tener entre 2 y 50 caracteres.';  // Cambiado a 'errors.area'
      isValid = false;
    }

     // Validar Número ficha
     const numerofichaPattern = /^[0-9]{7}$/;
     if (!numerofichaPattern.test(formValues.numeroficha.trim())) {
       errors.numeroficha = "Debe contener solo numeros, al menos 7";
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
    console.log("Valores del formulario:", formValues); // Agrega esta línea para depuración
    if (validateForm()) {
    try {
      const response = await fetch('http://localhost:4000/api/registerFicha', {
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
