document.addEventListener('DOMContentLoaded', function() {
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
        formu.reset();
    }

    if (togglePasswordRegistro) {
        togglePasswordRegistro.addEventListener('click', function() {
            if (contrasenaRegistro) {
                const type = contrasenaRegistro.getAttribute('type') === 'password' ? 'text' : 'password';
                contrasenaRegistro.setAttribute('type', type);
            }
            this.classList.toggle('bx-show');
            this.classList.toggle('bx-hide');
        });
    }

    if (togglePasswordConfirmacion) {
        togglePasswordConfirmacion.addEventListener('click', function() {
            if (confirmarContrasena) {
                const type = confirmarContrasena.getAttribute('type') === 'password' ? 'text' : 'password';
                confirmarContrasena.setAttribute('type', type);
            }
            this.classList.toggle('bx-show');
            this.classList.toggle('bx-hide');
        });
    }

    if (formu) {
        formu.addEventListener('submit', async function(event) {
            event.preventDefault();
            let valid = true;

            // Limpiar mensajes de error
            if (nombreError) nombreError.textContent = '';
            if (empresaError) empresaError.textContent = '';
            if (correoError) correoError.textContent = '';
            if (contrasenaError) contrasenaError.textContent = '';
            if (confirmarContrasenaError) confirmarContrasenaError.textContent = '';
            if (numeroDcError) numeroDcError.textContent = '';
            if (telefonoError) telefonoError.textContent = '';
            if (terminosError) terminosError.textContent = '';
            if (successMessage) successMessage.textContent = '';

            // Validación del nombre
            const nombreValue = nombre ? nombre.value.trim() : '';
            if (!nombreValue || !/^[A-Za-z\s]+$/.test(nombreValue) || nombreValue.split(' ').length < 1) {
                valid = false;
                if (nombreError) nombreError.textContent = 'Ingrese un nombre completo válido.';
            }

            // Validación del correo electrónico
            const correoValue = correoRegistro ? correoRegistro.value.trim() : '';
            if (!correoValue) {
                valid = false;
                if (correoError) correoError.textContent = 'El correo electrónico es requerido.';
            } else if (!/\S+@\S+\.\S+/.test(correoValue)) {
                valid = false;
                if (correoError) correoError.textContent = 'El correo electrónico debe tener formato válido.';
            }

            // Validación de la contraseña
            const contrasenaValue = contrasenaRegistro ? contrasenaRegistro.value : '';
            if (!contrasenaValue || contrasenaValue.length < 8) {
                valid = false;
                if (contrasenaError) contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres.';
            } else if (!/[A-Z]/.test(contrasenaValue)) {
                valid = false;
                if (contrasenaError) contrasenaError.textContent = 'La contraseña debe contener al menos una letra mayúscula.';
            }

            // Validación de la confirmación de contraseña
            const confirmarContrasenaValue = confirmarContrasena ? confirmarContrasena.value : '';
            if (contrasenaValue !== confirmarContrasenaValue) {
                valid = false;
                if (confirmarContrasenaError) confirmarContrasenaError.textContent = 'Las contraseñas no coinciden.';
            }

            // Validación del número de documento
            const numeroDcValue = numeroDc ? numeroDc.value.trim() : '';
            if (!/^\d{10}$/.test(numeroDcValue)) {
                valid = false;
                if (numeroDcError) numeroDcError.textContent = 'Ingrese un número de documento válido de 10 dígitos.';
            }

            // Validación del teléfono
            const telefonoValue = telefono ? telefono.value.trim() : '';
            if (!/^\d{10}$/.test(telefonoValue)) {
                valid = false;
                if (telefonoError) telefonoError.textContent = 'Ingrese un número de teléfono válido de 10 dígitos.';
            }

            // Validación de aceptación de términos y condiciones
            if (!aceptarTerminos || !aceptarTerminos.checked) {
                valid = false;
                if (terminosError) terminosError.textContent = 'Debe aceptar los términos y condiciones.';
            }


            if (valid) {
                const tipoDocumentoValue = document.getElementById('tipoDocumento').value;
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
                        // Mostrar mensaje de éxito
                        if (successMessage) successMessage.textContent = '¡Registro exitoso!';

                        // Redirigir después de un breve retraso para que el mensaje de éxito sea visible
                        setTimeout(() => {
                            window.location.href = '/Inicio';
                        }, 2000); // Ajusta el tiempo según sea necesario
                    } else {
                        console.error('Error en el registro');
                    }
                } catch (error) {
                    console.error('Error al enviar la solicitud:', error);
                }
            }
        });
    }

    window.addEventListener('pageshow', function(event) {
        if (event.persisted && formu) {
            formu.reset();
        }
    });
});