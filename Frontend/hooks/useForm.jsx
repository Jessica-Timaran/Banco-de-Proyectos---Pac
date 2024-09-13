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
    idficha: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Validar Nombre
    const nombrePattern = /^[A-Za-z\s]{2,50}$/;
    if (!nombrePattern.test(formValues.nombre.trim())) {
      errors.nombre = 'El nombre debe contener solo letras y tener entre 2 y 50 caracteres.';
      isValid = false;
    }

    // Validar Tipo de documento
    if (!formValues.tipodocumento) {
      errors.tipodocumento = 'Este campo es obligatorio.';
      isValid = false;
    }

    // Validar Número de documento
    const numeroDocPattern = /^[0-9]{6,10}$/;
    if (!numeroDocPattern.test(formValues.numerodocumento.trim())) {
      errors.numerodocumento = 'El número de documento debe tener entre 6 y 10 dígitos.';
      isValid = false;
    }

    // Validar Correo Electrónico
    const correoPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!correoPattern.test(formValues.correo.trim())) {
      errors.correo = 'El correo debe tener un formato válido.';
      isValid = false;
    }

    // Validar Contraseña
    if (formValues.contraseña.trim().length < 8) {
      errors.contraseña = 'La contraseña debe tener al menos 8 caracteres.';
      isValid = false;
    }

    // Validar Celular
    const celularPattern = /^[0-9]{10,12}$/;
    if (!celularPattern.test(formValues.celular.trim())) {
      errors.celular = 'El teléfono debe tener entre 10 y 12 dígitos.';
      isValid = false;
    }

    // Validar ID Rol
    if (!formValues.idrol) {
      errors.idrol = 'Este campo es obligatorio.';
      isValid = false;
    }

    // Validar Ficha (si el rol es Aprendiz)
    if (formValues.idrol === '4' && !formValues.idficha) {
      errors.idficha = 'Debe seleccionar una ficha para el rol de Aprendiz.';
      isValid = false;
    }

    setErrors(errors);
    console.log('Errores de validación:', errors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [id]: value }));
  };

  const handleSelectChange = (id, value) => {
    setFormValues((prevValues) => ({ ...prevValues, [id]: value }));
  };

  const handleRolChange = (value) => {
    handleSelectChange('idrol', value);
    if (value !== '4') {
      handleSelectChange('idficha', '');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valida el formulario antes de proceder
    if (validateForm()) {
      try {
        // Crea el objeto de datos para enviar, asegurándote de convertir idrol e idficha si es necesario
        const userData = {
          nombre: formValues.nombre,
          tipodocumento: formValues.tipodocumento,
          numerodocumento: formValues.numerodocumento,
          correo: formValues.correo,
          contraseña: formValues.contraseña,
          celular: formValues.celular,
          idrol: parseInt(formValues.idrol, 10), // Asegúrate de que idrol sea un número
          idficha: formValues.idrol === '4' ? parseInt(formValues.idficha, 10) : null, // Si idrol es '4', convierte idficha a número
        };

        // Verifica la salida de los datos
        console.log('Datos a enviar:', userData);

        // Enviar los datos al backend
        const response = await fetch('http://localhost:4000/api/superAdmin/agregarpersona', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        // Maneja la respuesta del servidor
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Error desconocido');
        }

        // Si la respuesta es exitosa
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        onSuccess(data); // Llama a la función de éxito
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        setErrors({ submit: error.message });
      }
    }
  };

  return {
    formValues,
    errors,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    handleRolChange,
  };
}
