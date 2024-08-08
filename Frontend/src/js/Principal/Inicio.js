document.addEventListener('DOMContentLoaded', function() {
    const formu = document.getElementById('formu');
    const correoInicio = document.getElementById('CorreoInicio');
    const contrasenaInicio = document.getElementById('contrasenaInicio');
    const correoError = document.getElementById('correoError');
    const contrasenaError = document.getElementById('contrasenaError');
    const togglePasswordInicio = document.getElementById('togglePasswordInicio');
    const loader = document.createElement('div');

    // Configurar el loader
    loader.className = 'loader'; // Asegúrate de tener estilos CSS para esta clase

    if (togglePasswordInicio) {
        togglePasswordInicio.addEventListener('click', function() {
            const type = contrasenaInicio.getAttribute('type') === 'password' ? 'text' : 'password';
            contrasenaInicio.setAttribute('type', type);
            this.classList.toggle('bx-show');
            this.classList.toggle('bx-hide');
        });
    }

    if (formu) {
        formu.addEventListener('submit', async function(event) {
            event.preventDefault();

            const correoValue = correoInicio ? correoInicio.value.trim() : '';
            const contrasenaValue = contrasenaInicio ? contrasenaInicio.value : '';

            // Validación básica
            if (!correoValue) {
                correoError.textContent = 'El correo es obligatorio.';
                return;
            } else if (!/\S+@\S+\.\S+/.test(correoValue)) {
                correoError.textContent = 'Por favor ingresa un correo válido.';
                return;
            } else {
                correoError.textContent = ''; // Limpiar mensaje de error
            }

            if (!contrasenaValue) {
                contrasenaError.textContent = 'La contraseña es obligatoria.';
                return;
            } else {
                contrasenaError.textContent = ''; // Limpiar mensaje de error
            }

            // Desactivar el botón de envío
            const submitButton = formu.querySelector('button[type="submit"]');
            submitButton.disabled = true;

            // Mostrar el loader
            formu.appendChild(loader);

            try {
                const response = await fetch('http://localhost:4000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ correo: correoValue, contraseña: contrasenaValue })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                if (result.error) {
                    correoError.textContent = result.error;
                    contrasenaError.textContent = result.error;
                } else {
                    // Almacenar el rol en localStorage
                    localStorage.setItem('userRole', result.rol);

                    // Almacenar token si está presente
                    if (result.token) {
                        localStorage.setItem('authToken', result.token);
                    }

                    // Redirigir según el rol del usuario
                    switch (result.rol) {
                        case 1:
                            window.location.href = '/Aprendiz/VistaAprendiz';
                            break;
                        case 2:
                            window.location.href = '/Usuario/VistaUsuario';
                            break;
                        case 3:
                            window.location.href = '/SuperAdmin/VistaSuperadmin';
                            break;
                        case 4:
                            window.location.href = '/Aprendiz/VistaAprendiz';
                            break;
                        default:
                            correoError.textContent = 'Rol de usuario desconocido';
                            break;
                    }
                }
            } catch (error) {
                console.error('Error en el inicio de sesión:', error);
                correoError.textContent = 'Error al iniciar sesión. Por favor, intenta de nuevo más tarde.';
            } finally {
                // Ocultar el loader
                loader.remove();

                // Reactivar el botón de envío
                submitButton.disabled = false;
            }
        });
    }
});
