document.addEventListener('DOMContentLoaded', function() {
    const formu = document.getElementById('formu');
    const correoInicio = document.getElementById('CorreoInicio');
    const contrasenaInicio = document.getElementById('contrasenaInicio');
    const correoError = document.getElementById('correoError');
    const contrasenaError = document.getElementById('contrasenaError');
    const globalError = document.getElementById('globalError');
    const togglePasswordInicio = document.getElementById('togglePasswordInicio');

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

            correoError.textContent = '';  // Limpiar mensajes de error
            contrasenaError.textContent = '';
            globalError.textContent = '';

            const correoValue = correoInicio ? correoInicio.value.trim() : '';
            const contrasenaValue = contrasenaInicio ? contrasenaInicio.value : '';

            try {
                const response = await fetch('http://localhost:4000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ correo: correoValue, contraseña: contrasenaValue })
                });

                const result = await response.json();

                if (!response.ok) {
                    if (response.status === 401) {
                        globalError.textContent = 'Correo o contraseña incorrectos';
                    } else {
                        globalError.textContent = 'Error en el servidor. Intenta nuevamente.';
                    }
                } else {
                    // Redirige según el rol del usuario
                    switch (result.rol) {
                        case 1:
                            window.location.href = '/VistaAdministrador';
                            break;
                        case 2:
                            window.location.href = '/VistaUsuario';
                            break;
                        case 3:
                            window.location.href = '/VistaSuperadmin';
                            break;
                        case 4:
                            window.location.href = '/VistaAprendiz';
                            break;
                        default:
                            globalError.textContent = 'Rol de usuario desconocido';
                            break;
                    }
                }
            } catch (error) {
                console.error('Error en el inicio de sesión:', error);
                globalError.textContent = 'Error en la conexión. Intenta nuevamente.';
            }
        });
    }
});