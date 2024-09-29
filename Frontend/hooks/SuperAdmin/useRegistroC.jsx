import { useState } from 'react';

const useRegistroC = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // Función para contar palabras en un string
  const countWords = (text) => text.trim().split(/\s+/).length;

  // Validación por campo o conjunto de campos (en caso de que sean arrays)
  const validate = (field, value) => {
    let error = '';

    if (Array.isArray(value)) {
      // Si el valor es un array (como los inputs dinámicos)
      value.forEach((val, index) => {
        if (!val.trim()) {
          error = `El campo ${field} ${index + 1} es obligatorio`;
        } else {
          // Validación específica para los "tipos de área"
          if (field.includes('tipoArea')) {
            if (!/\d/.test(val)) {
              error = `El tipo de área ${index + 1} debe contener al menos un número`;
            } else if (countWords(val) > 30) {
              error = `El tipo de área ${index + 1} no debe exceder las 30 palabras`;
            }
          }

          // Validación específica para "áreas" (sin necesidad de contener un número)
          if (field.includes('area')) {
            if (countWords(val) > 30) {
              error = `El área ${index + 1} no debe exceder las 30 palabras`;
            }
          }
        }
      });
    } else {
      if (!value.trim()) {
        error = `El campo ${field} es obligatorio`;
      } else if (countWords(value) > 30) {
        error = `El campo ${field} no debe exceder las 30 palabras`;
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    return error === '';
  };

  const validateAll = () => {
    let isValid = true;
    Object.keys(values).forEach((field) => {
      if (!validate(field, values[field])) {
        isValid = false;
      }
    });
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleArrayInputChange = (field, index, value) => {
    const updatedValues = [...values[field]];
    updatedValues[index] = value;
    setValues((prevValues) => ({ ...prevValues, [field]: updatedValues }));
  };

  return {
    values,
    errors,
    handleInputChange,
    handleArrayInputChange,
    validateAll,
  };
};

export default useRegistroC;
