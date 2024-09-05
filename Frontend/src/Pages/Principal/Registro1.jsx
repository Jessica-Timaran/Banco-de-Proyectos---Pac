import React, { useState } from "react";
import Input from "../../Components/Input";
import BotonPrincipal from "../../Components/BotonPrincipal";
import AceptarTerminos from "../../Components/AceptarTerminos";
import SelectBoxTI from "../../Components/SelectBoxTI";

const Registro1 = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    tipoDocumento: "",
    numeroDc: "",
    correoRegistro: "",
    telefono: "",
    nombreEmpresa: "",
    contrasenaRegistro: "",
    confirmarContrasena: "",
    aceptarTerminos: false,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const validateForm = async () => {
    let valid = true;
    const newErrors = {};

    if (!formData.tipoDocumento || formData.tipoDocumento === "Elije una opción") {
      valid = false;
      newErrors.tipoDocumentoError = "Debes seleccionar una opción.";
    }

    if (!formData.nombre || !/^[A-Za-z\s]+$/.test(formData.nombre) || formData.nombre.split(" ").length < 2) {
      valid = false;
      newErrors.nombreError = "Ingrese un nombre completo válido.";
    }

    if (!formData.correoRegistro) {
      valid = false;
      newErrors.correoError = "El correo electrónico es requerido.";
    } else if (!/\S+@\S+\.\S+/.test(formData.correoRegistro)) {
      valid = false;
      newErrors.correoError = "El correo electrónico debe tener formato válido.";
    } else {
      try {
        const response = await fetch("http://localhost:4000/api/check-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ correo: formData.correoRegistro }),
        });

        const result = await response.json();

        if (response.ok && result.exists) {
          valid = false;
          newErrors.correoError = "Este correo electrónico ya está en uso.";
        }
      } catch (error) {
        newErrors.correoError = "Error al verificar el correo electrónico.";
        valid = false;
      }
    }

    if (!formData.contrasenaRegistro || formData.contrasenaRegistro.length < 8) {
      valid = false;
      newErrors.contrasenaError = "La contraseña debe tener al menos 8 caracteres.";
    } else if (!/[A-Z]/.test(formData.contrasenaRegistro)) {
      valid = false;
      newErrors.contrasenaError = "La contraseña debe contener al menos una letra mayúscula.";
    }

    if (formData.contrasenaRegistro !== formData.confirmarContrasena) {
      valid = false;
      newErrors.confirmarContrasenaError = "Las contraseñas no coinciden.";
    }

    if (!/^\d{10}$/.test(formData.numeroDc)) {
      valid = false;
      newErrors.numeroDcError = "Ingrese un número de documento válido de 10 dígitos.";
    }

    if (!/^\d{10}$/.test(formData.telefono)) {
      valid = false;
      newErrors.telefonoError = "Ingrese un número de teléfono válido de 10 dígitos.";
    }

    if (!formData.aceptarTerminos) {
      valid = false;
      newErrors.terminosError = "Debe aceptar los términos y condiciones.";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await validateForm();
    if (isValid) {
      const data = {
        nombre: formData.nombre.trim(),
        tipodocumento: formData.tipoDocumento,
        numerodocumento: formData.numeroDc.trim(),
        nombreempresa: formData.nombreEmpresa.trim(),
        telefono: formData.telefono.trim(),
        correo: formData.correoRegistro.trim(),
        contraseña: formData.contrasenaRegistro,
        idrol: 2,
      };

      try {
        const response = await fetch("http://localhost:4000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          setSuccessMessage("¡Registro exitoso!");
          setTimeout(() => {
            window.location.href = "/Principal/Inicio";
          }, 2000);
        } else {
          console.error("Error en el registro");
        }
      } catch (error) {
        console.error("Error al enviar la solicitud:", error);
      }
    }
  };

  return (
    <div className="flex 2xl:h-screen h-auto sm:96 items-center justify-center 2xl:gap-x-72">
      <div className="flex content-center">
        <form
          id="formu"
          className="form flex flex-col w-96 items-center gap-4"
          onSubmit={handleSubmit}
        >
          <div className="logo-sena flex m-auto items-center justify-center w-80 h-28 bg-[#A3E784] rounded-bl-[50px] rounded-br-[50px]">
            <img
              className="sena w-20 h-20"
              src="/public/img/logo.png"
              alt="Logo Sena"
            />
          </div>

          <div className="registro flex flex-col items-center gap-2 min-w-96">
            <div className="text-3xl">REGISTRO</div>

            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Nombre Completo:"
                id="registroNombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
              />
              <span id="nombreError" className="error-message">
                {errors.nombreError}
              </span>
            </div>

            <div className="relative w-full">
              <SelectBoxTI
                Text=""
                id="tipoDocumento"
                name="tipoDocumento"
                value={formData.tipoDocumento}
                onChange={handleInputChange}
              />
              <span id="tipoDocumentoError" className="error-message">
                {errors.tipoDocumentoError}
              </span>
            </div>

            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Número De Documento:"
                id="numeroDc"
                name="numeroDc"
                value={formData.numeroDc}
                onChange={handleInputChange}
              />
              <span id="numeroDcError" className="error-message">
                {errors.numeroDcError}
              </span>
            </div>

            <div className="relative w-full">
              <Input
                type="email"
                placeholder="Correo:"
                id="CorreoRegistro"
                name="correoRegistro"
                value={formData.correoRegistro}
                onChange={handleInputChange}
              />
              <span id="correoError" className="error-message">
                {errors.correoError}
              </span>
            </div>

            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Teléfono:"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
              />
              <span id="telefonoError" className="error-message">
                {errors.telefonoError}
              </span>
            </div>

            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Nombre De la Empresa:"
                id="nombreEmpresa"
                name="nombreEmpresa"
                value={formData.nombreEmpresa}
                onChange={handleInputChange}
              />
              <span id="empresaError" className="error-message">
                {errors.empresaError}
              </span>
            </div>

            <div className="relative w-full">
              <Input
                type={passwordVisible ? "text" : "password"}
                placeholder="Contraseña:"
                id="contrasenaRegistro"
                name="contrasenaRegistro"
                value={formData.contrasenaRegistro}
                onChange={handleInputChange}
              />
              <i
                className={`bx ${passwordVisible ? "bx-hide" : "bx-show"} cursor-pointer absolute right-3 top-2/4 transform -translate-y-2/4`}
                onClick={togglePasswordVisibility}
              ></i>
              <span id="contrasenaError" className="error-message">
                {errors.contrasenaError}
              </span>
            </div>

            <div className="relative w-full">
              <Input
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Confirmar Contraseña:"
                id="confirmarContrasena"
                name="confirmarContrasena"
                value={formData.confirmarContrasena}
                onChange={handleInputChange}
              />
              <i
                className={`bx ${confirmPasswordVisible ? "bx-hide" : "bx-show"} cursor-pointer absolute right-3 top-2/4 transform -translate-y-2/4`}
                onClick={toggleConfirmPasswordVisibility}
              ></i>
              <span id="confirmarContrasenaError" className="error-message">
                {errors.confirmarContrasenaError}
              </span>
            </div>

            <div className="relative w-full">
              <div className="flex items-center">
                <AceptarTerminos
                  Text="Aceptar Términos y Condiciones"
                  id="aceptarTerminos"
                  name="aceptarTerminos"
                  checked={formData.aceptarTerminos}
                  onChange={handleInputChange}
                />
              </div>
              <span id="terminosError" className="error-message">
                {errors.terminosError}
              </span>
            </div>

            <BotonPrincipal Text="Registrarse" id="Registro" />
            <span id="successMessage" className="success-message">
              {successMessage}
            </span>
            <h3 className="w-[200px] h-[44px] py-[10px] cursor-pointer text-[15px] mt-3 self-center">
              Ya tienes cuenta?
              <a
                href="/Principal/Inicio"
                className="text-blue-500 underline decoration-1"
              >
                Iniciar Sesión
              </a>
            </h3>
          </div>
        </form>
      </div>

      <div className="hidden md:hidden lg:hidden xl:block 2xl:block 2xl:w-[800px] 2xl:h-[800px] xl:h-[650px] xl:w-[550px] sm:w-[700px] sm:h-[700px]">
        <img
          className="sm:w-auto sm:h-auto 2xl:w-full 2xl:h-full"
          src="/Img/registro.png"
          alt="Registro"
        />
      </div>
    </div>
  );
};

export default Registro1;
