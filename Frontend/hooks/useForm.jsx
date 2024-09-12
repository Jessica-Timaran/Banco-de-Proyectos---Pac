import { useState } from 'react';

export function useForm(onSuccess) {
  const [formValues, setFormValues] = useState({
    nombreUsu: '',
    tipoDocumento: '',
    numeroDoc: '',
    correo: '',
    contrasena: '',
    tipoRol: '', // Mapeado a 'rol'
    celular: '',
    fichaSeleccionada: '',
    estado: 'Activo',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Validar Nombre
    const nombrePattern = /^[A-Za-z\s]{2,50}$/;
    if (!nombrePattern.test(formValues.nombreUsu.trim())) {
      errors.nombreUsu = "El nombre debe contener solo letras.";
      isValid = false;
    }

    // Validar Tipo de documento
    if (!formValues.tipoDocumento) {
      errors.tipoDocumento = "Este campo es obligatorio.";
      isValid = false;
    }

    // Validar Número de documento
    const numeroDocPattern = /^[0-9]{6,10}$/;
    if (!numeroDocPattern.test(formValues.numeroDoc.trim())) {
      errors.numeroDoc = "El número de documento no es válido.";
      isValid = false;
    }

    // Validar Correo Electrónico
    const correoPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!correoPattern.test(formValues.correo.trim())) {
      errors.correo = "El correo debe tener un formato válido.";
      isValid = false;
    }

    // Validar Contraseña
    if (formValues.contrasena.trim().length < 8) {
      errors.contrasena = "La contraseña debe tener al menos 8 caracteres.";
      isValid = false;
    }

    // Validar Tipo de Rol
    if (!formValues.tipoRol) {
      errors.tipoRol = "Este campo es obligatorio.";
      isValid = false;
    }

    // Validar Celular
    const celularPattern = /^[0-9]{10,12}$/;
    if (!celularPattern.test(formValues.celular.trim())) {
      errors.celular = "El teléfono no es válido.";
      isValid = false;
    }

    // Validar Ficha (solo si el rol es Aprendiz)
    if (formValues.tipoRol.toLowerCase() === 'aprendiz' && !formValues.fichaSeleccionada) {
      errors.fichaSeleccionada = "Debe seleccionar una ficha.";
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
        const response = await fetch('http://localhost:4000/api/agregarpersona', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...formValues,
            rol: formValues.tipoRol  // Renombrar tipoRol a rol
          })
        });
  
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Error desconocido');
        }
  
        const data = await response.json();
        onSuccess(data);
      } catch (error) {
        console.error('Error al registrar usuario:', error);
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
