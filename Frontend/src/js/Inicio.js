document.addEventListener('DOMContentLoaded', function() {
    const formu = document.getElementById('formu');
    const correoInicio = document.getElementById('CorreoInicio');
    const contrasenaInicio = document.getElementById('contrasenaInicio');
    const correoError = document.getElementById('correoError');
    const contrasenaError = document.getElementById('contrasenaError');
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

                    // Redirigir según el rol del usuario
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
                            correoError.textContent = 'Rol de usuario desconocido';
                            break;
                    }
                }
            } catch (error) {
                console.error('Error en el inicio de sesión:', error);
            }
        });
    }
});