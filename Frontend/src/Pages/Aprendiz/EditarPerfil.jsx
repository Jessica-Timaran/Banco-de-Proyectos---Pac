import React, { useState, useEffect } from 'react';
import Input from '../../Components/Input.jsx';
import SelectBoxTI from '../../Components/SelectBoxTI.jsx';
import LayoutPrincipal from '../../Layouts/Layoutprincipal.jsx';
import Layoutcontenido3 from '../../Layouts/Layoutcontenido3.jsx';
import BotonPrincipal from '../../Components/BotonPerfil.jsx';
import ModalPerfil from '../../Components/Modal.jsx';

import Navbar from '../../Components/Navbar'; // Ajusta la ruta si es necesario

const EditarPerfil = () => {


  const [formData, setFormData] = useState({
    id: null,
    nombre: '',
    tipodocumento: '',
    numerodocumento: '',
    nombreempresa: '',
    telefono: '',
    correo: '',
    contraseña: '',
    confiContraseña: '',
    estado: true
  });
  const [errors, setErrors] = useState({

    nombre: '',
    numerodocumento: '',  // Make sure this key matches both in validation and JSX
    telefono: '',
    correo: '',
    nombreempresa: '',
    contraseña: '',
    confiContraseña: '',
    tipodocumento: '', // Añadir error para
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

      // Validar tipo de documento
  if (!formData.tipodocumento || formData.tipodocumento === 'Elije una opción') {
    newErrors.tipodocumento = 'Debes seleccionar una opción válida.';
    isValid = false;
  }

    // Validar nombre
    if (formData.nombre.trim() === '') {
      newErrors.nombre = 'El nombre completo es obligatorio.';
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.nombre.trim())) {
      newErrors.nombre = 'El nombre solo puede contener letras y espacios.';
      isValid = false;
    } else if (formData.nombre.trim().length > 40) {
      newErrors.nombre = 'El nombre no puede tener más de 40 caracteres.';
      isValid = false;
    }

    // Validar número de documento
    if (formData.numerodocumento.trim() === '') {
      newErrors.numerodocumento = 'El número de documento es requerido.';
      isValid = false;
    } else if (!/^\d+$/.test(formData.numerodocumento.trim())) {
      newErrors.numerodocumento = 'El número de documento solo puede contener dígitos.';
      isValid = false;
    } else if (formData.numerodocumento.trim().length < 10) {
      newErrors.numerodocumento = 'El número de documento debe tener al menos 10 dígitos.';
      isValid = false;
    }

    // Validar teléfono
    if (formData.telefono.trim() === '') {
      newErrors.telefono = 'El teléfono es obligatorio';
      isValid = false;
    } else if (!/^\d+$/.test(formData.telefono.trim())) {
      newErrors.telefono = 'El teléfono solo puede contener dígitos.';
      isValid = false;
    } else if (formData.telefono.trim().length < 10) {
      newErrors.telefono = 'El teléfono debe contener al menos 10 dígitos.';
      isValid = false;
    }

    // Validar correo
    if (formData.correo.trim() === '') {
      newErrors.correo = 'El correo es requerido.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.correo.trim())) {
      newErrors.correo = 'El correo electrónico debe contener al menos un arroba (@) y un dominio.';
      isValid = false;
    }

    // Validar nombre de la empresa
    if (formData.nombreempresa.trim() === '') {
      newErrors.nombreempresa = 'El nombre de la empresa es requerido.';
      isValid = false;
    } else if (formData.nombreempresa.trim().length > 50) {
      newErrors.nombreempresa = 'El nombre de la empresa no puede tener más de 50 caracteres.';
      isValid = false;
    }

  // Validar contraseña
if (formData.contraseña.trim() === '') {
  newErrors.contraseña = 'La contraseña es requerida.';
  isValid = false;
} else if (formData.contraseña.trim().length < 8) {
  newErrors.contraseña = 'La contraseña debe tener al menos 8 caracteres.';
  isValid = false;
} else if (!/[A-Z]/.test(formData.contraseña)) {
  newErrors.contraseña = 'La contraseña debe contener al menos una letra mayúscula.';
  isValid = false;
}

// Validar confirmar contraseña
if (formData.confiContraseña.trim() === '') {
  newErrors.confiContraseña = 'Debe confirmar su contraseña.';
  isValid = false;
} else if (formData.confiContraseña.trim() !== formData.contraseña.trim()) {
  newErrors.confiContraseña = 'Las contraseñas no coinciden.';
  isValid = false;
}

    setErrors(newErrors);
    return isValid;
  };


  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showPassword, setShowPassword] = useState({
    contraseña: false,
    confiContraseña: false,
  });

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: userId,
      }));
    } else {
      setError('ID de usuario no encontrado. Inicia sesión nuevamente.');
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Primero validamos el formulario
    const isValid = validateForm();
    if (isValid) {
      try {
        const response = await fetch('http://localhost:4000/api/aprendiz/update-profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setMessage(data.message);
          setError('');
          setIsModalOpen(true);

          localStorage.setItem('userName', formData.nombre);
  
          // Limpiar los campos del formulario después de una actualización exitosa
          setFormData((prevFormData) => ({
            id: prevFormData.id, // Mantiene el id del usuario
            nombre: '',
            tipodocumento: '',
            numerodocumento: '',
            nombreempresa: '',
            telefono: '',
            correo: '',
            contraseña: '',
            confiContraseña: '',
            estado: true
          }));
        } else {
          setError(data.error || 'Error al actualizar el perfil');
        }
      } catch (error) {
        console.error('Error al hacer la solicitud:', error);
        setError('Error al hacer la solicitud: ' + error.message);
      }
    }
  };

  const handleCloseModal = () => {
  setIsModalOpen(false);
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <LayoutPrincipal title="Editar Perfil">
    <Layoutcontenido3 title="Editar Perfil">

      <div className="w-full md:w-1/2">
        <div className="flex flex-col p-[5%] Flex-box">
          <form onSubmit={handleSubmit} className="">
            <Input
              placeholder="Nombre completo"
              type="text"
              Text="Nombre completo *"
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
            <div className="text-red-500">{errors.nombre}</div> {/* Muestra el error de nombre */}

            <SelectBoxTI
              Text="Tipo de documento:"
              id="tipodocumento"
              value={formData.tipodocumento}
              onChange={handleChange}
            />
            <div className="text-red-500">{errors.tipodocumento}</div>
            <Input
              placeholder="Número de documento"
              type="text"
              Text="Número de documento"
              id="numerodocumento"
              value={formData.numerodocumento}
              onChange={handleChange}
               
              />
               <div className="text-red-500">{errors.numerodocumento}</div> {/* Muestra el error de nombre */}

             
               <Input
                placeholder="Teléfono"
                type="text"
                Text="Teléfono *"
                id="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
              <div  className="text-red-500">{errors.telefono}</div> {/* Muestra el error de teléfono */}

            </form>
          </div>
        </div>

             <div className="w-full md:w-1/2">
          <div className="flex flex-col p-[5%] Flex-box">
            <form onSubmit={handleSubmit} className="">
              <Input
                placeholder="Correo"
                type="email"
                Text="Correo:"
                id="correo"
                value={formData.correo}
                onChange={handleChange}
              />
               <div className="text-red-500">{errors.correo}</div>
              <Input
                placeholder="Nombre de la Empresa"
                type="text"
                Text="Nombre de la Empresa:"
                id="nombreempresa"
                value={formData.nombreempresa}
                onChange={handleChange}
              />
               <div  className="text-red-500">{errors.nombreempresa}</div>

              <div className="relative ">
              <Input
                  placeholder="Contraseña"

                  type={showPassword.contraseña ? 'text' : 'password'}
                    Text="Contraseña:"
                  id="contraseña"
                  value={formData.contraseña}
                  onChange={handleChange}
                />
                <i
                  className={`bx ${showPassword.contraseña ? 'bx-show' : 'bx-hide'} absolute right-2 top-[55px] transform -translate-y-1/2 cursor-pointer`}
                  onClick={() => togglePasswordVisibility('contraseña')}
                ></i>
                 <div className="text-red-500">{errors.contraseña}</div>
              </div>


              <div className="relative ">
              <Input
                  placeholder="Confirmar Contraseña"
                  type={showPassword.confiContraseña ? 'text' : 'password'}
                    Text="Confirmar Contraseña:"
                  id="confiContraseña"
                  value={formData.confiContraseña}
                  onChange={handleChange}
                />
                <i
                  className={`bx ${showPassword.confiContraseña ? 'bx-show' : 'bx-hide'} absolute right-2 top-[55px] transform -translate-y-1/2 cursor-pointer`}
                  onClick={() => togglePasswordVisibility('confiContraseña')}
                ></i>
                <div className="text-red-500">{errors.confiContraseña}</div> {/* Muestra el error de confirmar contraseña */}
              </div>

              <div className="col-span-2 flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                <div>
                  
                  <BotonPrincipal type="submit" Text="Guardar" />
                </div>
              </div>
            </form>
          </div>
        </div>

        <ModalPerfil
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          Text="¡Perfil actualizado exitosamente!"

        />
      </Layoutcontenido3>
    </LayoutPrincipal>
  );
};

export default EditarPerfil;