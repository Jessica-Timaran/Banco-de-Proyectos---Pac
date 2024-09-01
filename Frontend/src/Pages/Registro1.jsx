import React, { useState } from 'react';
import Input from '../Components/Input.jsx';
import BotonPrincipal from '../Components/BotonPrincipal.jsx';
import AceptarTerminos from '../Components/AceptarTerminos.jsx';
import SelectBoxTI from '../Components/SelectBoxTI.jsx';
import { Link } from 'react-router-dom'; // Asegúrate de que tu proyecto esté configurado con react-router-dom

const Registro1 = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    tipoDocumento: '',
    numeroDocumento: '',
    correo: '',
    telefono: '',
    nombreEmpresa: '',
    contrasena: '',
    confirmarContrasena: '',
    aceptarTerminos: false,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.tipoDocumento) newErrors.tipoDocumento = 'Seleccione un tipo de documento';
    if (!formData.numeroDocumento) newErrors.numeroDocumento = 'El número de documento es obligatorio';
    if (!formData.correo) newErrors.correo = 'El correo es obligatorio';
    if (!formData.telefono) newErrors.telefono = 'El teléfono es obligatorio';
    if (!formData.nombreEmpresa) newErrors.nombreEmpresa = 'El nombre de la empresa es obligatorio';
    if (!formData.contrasena) newErrors.contrasena = 'La contraseña es obligatoria';
    if (formData.contrasena !== formData.confirmarContrasena) newErrors.confirmarContrasena = 'Las contraseñas no coinciden';
    if (!formData.aceptarTerminos) newErrors.aceptarTerminos = 'Debe aceptar los términos y condiciones';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Aquí iría la lógica para enviar el formulario
      setSuccessMessage('¡Registro exitoso!');
      // Limpieza de errores y datos si es necesario
    }
  };

  return (
    <div className="flex h-screen items-center justify-center gap-x-72">
      <div className="flex content-center">
        <form id="formu" className="form flex flex-col w-96 items-center gap-4" onSubmit={handleSubmit}>

          <div className="logo-sena flex m-auto items-center justify-center w-80 h-28 bg-custom-green rounded-bl-[50px] rounded-br-[50px]">
            <img className="sena w-20 h-20" src="/public/img/logoSena.png" alt="Logo Sena" width="100" height="100" />
          </div>

          <div className="registro flex flex-col items-center gap-2 min-w-96">
            <div className="text-3xl">REGISTRO</div>

            <div className="relative w-full">
              <Input type="text" placeholder="Nombre Completo:" id="nombre" value={formData.nombre} onChange={handleChange} />
              {errors.nombre && <span className="error-message">{errors.nombre}</span>}
            </div>

            <div className="relative w-full">
              <SelectBoxTI id="tipoDocumento" value={formData.tipoDocumento} onChange={handleChange} />
              {errors.tipoDocumento && <span className="error-message">{errors.tipoDocumento}</span>}
            </div>

            <div className="relative w-full">
              <Input type="text" placeholder="Número De Documento:" id="numeroDocumento" value={formData.numeroDocumento} onChange={handleChange} />
              {errors.numeroDocumento && <span className="error-message">{errors.numeroDocumento}</span>}
            </div>

            <div className="relative w-full">
              <Input type="email" placeholder="Correo:" id="correo" value={formData.correo} onChange={handleChange} />
              {errors.correo && <span className="error-message">{errors.correo}</span>}
            </div>

            <div className="relative w-full">
              <Input type="text" placeholder="Teléfono:" id="telefono" value={formData.telefono} onChange={handleChange} />
              {errors.telefono && <span className="error-message">{errors.telefono}</span>}
            </div>

            <div className="relative w-full">
              <Input type="text" placeholder="Nombre De la Empresa:" id="nombreEmpresa" value={formData.nombreEmpresa} onChange={handleChange} />
              {errors.nombreEmpresa && <div id="empresaError" className="error-message">{errors.nombreEmpresa}</div>}
            </div>

            <div className="relative w-full">
              <Input type="password" placeholder="Contraseña:" id="contrasena" value={formData.contrasena} onChange={handleChange} />
              <i className='bx bx-show cursor-pointer absolute right-3 top-2/4 transform -translate-y-2/4' id="togglePasswordRegistro" />
              {errors.contrasena && <span id="contrasenaError" className="error-message">{errors.contrasena}</span>}
            </div>

            <div className="relative w-full">
              <Input type="password" placeholder="Confirmar Contraseña:" id="confirmarContrasena" value={formData.confirmarContrasena} onChange={handleChange} />
              <i className='bx bx-show cursor-pointer absolute right-3 top-2/4 transform -translate-y-2/4' id="togglePasswordConfirmacion" />
              {errors.confirmarContrasena && <span id="confirmarContrasenaError" className="error-message">{errors.confirmarContrasena}</span>}
            </div>

            <div className="relative w-full">
              <div className="flex items-center">
                <AceptarTerminos id="aceptarTerminos" checked={formData.aceptarTerminos} onChange={handleChange} />
                {errors.aceptarTerminos && <span id="terminosError" className="error-message">{errors.aceptarTerminos}</span>}
              </div>
            </div>

            <BotonPrincipal Text="Registrarse" id="Registro" type="submit" />
            {successMessage && <span id="successMessage" className="success-message">{successMessage}</span>}
            <h3 className="w-[200px] h-[44px] py-[10px] cursor-pointer text-[15px] mt-3 self-center">
              ¿Ya tienes cuenta? <Link to="/Inicio" className="text-blue-500 underline decoration-1">Iniciar Sesión</Link>
            </h3>
          </div>
        </form>
      </div>

      <div className="hidden lg:block w-full lg:w-[800px]">
        <img className="w-[800px] h-[800px]" src="../../public/img/registro.png" alt="Registro" />
      </div>
    </div>
  );
};

export default Registro1;
