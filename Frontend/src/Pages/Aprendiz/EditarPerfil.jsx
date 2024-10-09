import React, { useState, useEffect } from 'react';
import Input from '../../Components/Input.jsx';
import SelectBoxTI from '../../Components/SelectBoxTI.jsx';
import LayoutPrincipal1 from '../../Layouts/LayoutPrincipal1.jsx';
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
    telefono: '',
    correo: '',
    contraseña: '',
    confiContraseña: '',
    estado: true
  });

  const [errors, setErrors] = useState({
    nombre: '',
    numerodocumento: '',
    telefono: '',
    correo: '',
    contraseña: '',
    confiContraseña: '',
    tipodocumento: '',
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
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('Usuario recuperado:', user);
    if (user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: user.id,
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
    const isValid = validateForm();
    if (isValid) {
      try {
        const response = await fetch('https://banco-de-proyectos-pac.onrender.com/api/aprendiz/update-profile', {
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

          setFormData((prevFormData) => ({
            id: prevFormData.id,
            nombre: '',
            tipodocumento: '',
            numerodocumento: '',
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
    <LayoutPrincipal1 title="Editar Perfil">
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
              <div className="text-red-500">{errors.nombre}</div>
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
              <div className="text-red-500">{errors.numerodocumento}</div>
              <Input
                placeholder="Teléfono"
                type="text"
                Text="Teléfono *"
                id="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
              <div className="text-red-500">{errors.telefono}</div>
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
              <div className="relative">
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
              </div>
              <div className="text-red-500">{errors.contraseña}</div>
              <div className="relative mt-[2%] ">
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
              </div>
              <div className="col-span-2 flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="mt-[5%]">
                  
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
    </LayoutPrincipal1>
  );
};

export default EditarPerfil;