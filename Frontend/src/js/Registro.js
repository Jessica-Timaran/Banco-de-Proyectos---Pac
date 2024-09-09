document.addEventListener('DOMContentLoaded', function () {
    const formu = document.getElementById('formu');
    const nombre = document.getElementById('registroNombre');
    const empresa = document.getElementById('nombreEmpresa');
    const correoRegistro = document.getElementById('CorreoRegistro');
    const contrasenaRegistro = document.getElementById('contrasenaRegistro');
    const confirmarContrasena = document.getElementById('confirmarContrasena');
    const numeroDc = document.getElementById('numeroDc');
    const telefono = document.getElementById('telefono');
    const aceptarTerminos = document.getElementById('aceptarTerminos');
    const successMessage = document.getElementById('successMessage');
    const tipoDocumento = document.getElementById('tipoDocumento');

    const tipoDocumentoError = document.getElementById('tipoDocumentoError');
    const nombreError = document.getElementById('nombreError');
    const empresaError = document.getElementById('empresaError');
    const correoError = document.getElementById('correoError');
    const contrasenaError = document.getElementById('contrasenaError');
    const confirmarContrasenaError = document.getElementById('confirmarContrasenaError');
    const numeroDcError = document.getElementById('numeroDcError');
    const telefonoError = document.getElementById('telefonoError');
    const terminosError = document.getElementById('terminosError');
    const togglePasswordRegistro = document.getElementById('togglePasswordRegistro');
    const togglePasswordConfirmacion = document.getElementById('togglePasswordConfirmacion');

    if (formu) {
        formu.addEventListener('submit', async function (event) {
            event.preventDefault();
            let valid = true;

            // Limpiar mensajes de error
            tipoDocumentoError.textContent = '';
            nombreError.textContent = '';
            empresaError.textContent = '';
            correoError.textContent = '';
            contrasenaError.textContent = '';
            confirmarContrasenaError.textContent = '';
            numeroDcError.textContent = '';
            telefonoError.textContent = '';
            terminosError.textContent = '';
            successMessage.textContent = '';

            // Validación del tipo de documento
            const tipoDocumentoValue = tipoDocumento ? tipoDocumento.value.trim() : '';
            if (!tipoDocumentoValue || tipoDocumentoValue === 'Elije una opción') {
                valid = false;
                tipoDocumentoError.textContent = 'Debes seleccionar una opción.';
            }

            // Validación del nombre
            const nombreValue = nombre ? nombre.value.trim() : '';
            if (!nombreValue || !/^[A-Za-z\s]+$/.test(nombreValue) || nombreValue.split(' ').length < 2) {
                valid = false;
                nombreError.textContent = 'Ingrese un nombre completo válido.';
            }

            // Validación del correo electrónico
            const correoValue = correoRegistro ? correoRegistro.value.trim() : '';
            if (!correoValue) {
                valid = false;
                correoError.textContent = 'El correo electrónico es requerido.';
            } else if (!/\S+@\S+\.\S+/.test(correoValue)) {
                valid = false;
                correoError.textContent = 'El correo electrónico debe tener formato válido.';
            } else {
                // Verificar si el correo ya está en uso
                try {
                    const response = await fetch('http://localhost:4000/api/check-email', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ correo: correoValue })
                    });

                    const result = await response.json();

                    if (response.ok && result.exists) {
                        valid = false;
                        correoError.textContent = 'Este correo electrónico ya está en uso.';
                    }
                } catch (error) {
                    correoError.textContent = 'Error al verificar el correo electrónico.';
                    valid = false;
                }
            }

            // Validación de la contraseña
            const contrasenaValue = contrasenaRegistro ? contrasenaRegistro.value : '';
            if (!contrasenaValue || contrasenaValue.length < 8) {
                valid = false;
                contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres.';
            } else if (!/[A-Z]/.test(contrasenaValue)) {
                valid = false;
                contrasenaError.textContent = 'La contraseña debe contener al menos una letra mayúscula.';
            }

            // Validación de la confirmación de contraseña
            const confirmarContrasenaValue = confirmarContrasena ? confirmarContrasena.value : '';
            if (contrasenaValue !== confirmarContrasenaValue) {
                valid = false;
                confirmarContrasenaError.textContent = 'Las contraseñas no coinciden.';
            }

            // Validación del número de documento
            const numeroDcValue = numeroDc ? numeroDc.value.trim() : '';
            if (!/^\d{10}$/.test(numeroDcValue)) {
                valid = false;
                numeroDcError.textContent = 'Ingrese un número de documento válido de 10 dígitos.';
            }

            // Validación del teléfono
            const telefonoValue = telefono ? telefono.value.trim() : '';
            if (!/^\d{10}$/.test(telefonoValue)) {
                valid = false;
                telefonoError.textContent = 'Ingrese un número de teléfono válido de 10 dígitos.';
            }

            // Validación de aceptación de términos y condiciones
            if (!aceptarTerminos || !aceptarTerminos.checked) {
                valid = false;
                terminosError.textContent = 'Debe aceptar los términos y condiciones.';
            }

            if (valid) {
                const data = {
                    nombre: nombre.value.trim(),
                    tipodocumento: tipoDocumentoValue,
                    numerodocumento: numeroDc.value.trim(),
                    nombreempresa: empresa.value.trim(),
                    telefono: telefono.value.trim(),
                    correo: correoRegistro.value.trim(),
                    contraseña: contrasenaRegistro.value,
                    idrol: 2
                };

                console.log('Datos enviados al servidor:', data);

                try {
                    const response = await fetch('http://localhost:4000/api/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });

                    if (response.ok) {
                        successMessage.textContent = '¡Registro exitoso!';

                        setTimeout(() => {
<<<<<<< HEAD:Frontend/src/js/Principal/Registro.js
                            window.location.href = '/Principal/Inicio';
                        }, 2000);
=======
                            window.location.href = '/Inicio';
                        }, 2000); // Ajusta el tiempo según sea necesario
>>>>>>> Jessica-react:Frontend/src/js/Registro.js
                    } else {
                        console.error('Error en el registro');
                    }
                } catch (error) {
                    console.error('Error al enviar la solicitud:', error);
                }
            }
        });
    }

    if (togglePasswordRegistro) {
        togglePasswordRegistro.addEventListener('click', function () {
            if (contrasenaRegistro) {
                const type = contrasenaRegistro.getAttribute('type') === 'password' ? 'text' : 'password';
                contrasenaRegistro.setAttribute('type', type);
            }
            this.classList.toggle('bx-show');
            this.classList.toggle('bx-hide');
        });
    }

    if (togglePasswordConfirmacion) {
        togglePasswordConfirmacion.addEventListener('click', function () {
            if (confirmarContrasena) {
                const type = confirmarContrasena.getAttribute('type') === 'password' ? 'text' : 'password';
                confirmarContrasena.setAttribute('type', type);
            }
            this.classList.toggle('bx-show');
            this.classList.toggle('bx-hide');
        });
    }

    window.addEventListener('pageshow', function (event) {
        if (event.persisted && formu) {
            formu.reset();
        }
    });
});