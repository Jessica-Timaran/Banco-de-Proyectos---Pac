document.addEventListener("DOMContentLoaded", function () {
    const guardarBtn = document.getElementById("guardarBtn");

    guardarBtn.addEventListener("click", function (event) {
        event.preventDefault();

        // Validar todos los campos
        const isValid = validateForm();

        if (isValid) {
            // Si el formulario es válido, puedes mostrar el modal o enviar los datos al servidor
            const modal = document.querySelector('.modal');
            modal.classList.remove('hidden');

            const closeModal = document.querySelector('.close-modal');
            closeModal?.addEventListener('click', function() {
                modal?.classList.add('hidden');
            });

            // Mapeo de roles
            const roleMap = {
                'superadmin': 3,
                'administrador': 1,
                'aprendiz': 4,
            };

            // Obtener los datos del formulario
            const formData = {
                nombre: document.getElementById("nombreUsu").value.trim(),
                tipodocumento: document.getElementById("tipoDoc").value,
                numerodocumento: document.getElementById("numeroDoc").value.trim(),
                nombreempresa: document.getElementById("nombreEmpresa") ? document.getElementById("nombreEmpresa").value.trim() : null, // Campo opcional
                telefono: document.getElementById("celular").value.trim(),
                correo: document.getElementById("correo").value.trim(),
                contraseña: document.getElementById("contrasena").value.trim(),
                idrol: roleMap[document.getElementById("tipoRol").value.toLowerCase()], // Convertir el nombre del rol a su ID
                estado: document.querySelector('input[name="estado"]:checked') ? document.querySelector('input[name="estado"]:checked').value : null // Campo opcional
            };

            console.log('Datos del formulario:', formData);

            fetch('http://localhost:4000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => {
                        throw new Error(`Error: ${error.error || 'Unknown error'}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('Usuario registrado con éxito:', data);
            })
            .catch(error => {
                console.error('Error al registrar usuario:', error);
            });
        }
    });

    function validateForm() {
        let isValid = true;

        // Validar Nombre del usuario (solo letras)
        const nombreUsu = document.getElementById("nombreUsu");
        const nombreError = document.getElementById("nombreError");
        const nombrePattern = /^[A-Za-z\s]{2,50}$/;
        if (!nombrePattern.test(nombreUsu.value.trim())) {
            nombreError.textContent = "El nombre debe contener solo letras";
            isValid = false;
        } else {
            nombreError.textContent = "";
        }

        // Validar Tipo de documento
        const tipoDoc = document.getElementById("tipoDoc");
        const tipoDocError = document.getElementById("tipoDocError");
        if (tipoDoc.selectedIndex === 0) {
            tipoDocError.textContent = "Este campo es obligatorio.";
            isValid = false;
        } else {
            tipoDocError.textContent = "";
        }

        // Validar Número de documento (solo números, longitud mínima de 10 dígitos)
        const numeroDoc = document.getElementById("numeroDoc");
        const numeroDocError = document.getElementById("numeroDocError");
        const numeroDocPattern = /^[0-9]{6,15}$/;
        if (!numeroDocPattern.test(numeroDoc.value.trim())) {
            numeroDocError.textContent = "El número de documento debe tener una longitud de 10 dígitos.";
            isValid = false;
        } else {
            numeroDocError.textContent = "";
        }

        // Validar Correo Electrónico
        const correo = document.getElementById("correo");
        const correoError = document.getElementById("correoError");
        const correoPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!correoPattern.test(correo.value.trim())) {
            correoError.textContent = "El correo debe tener un formato válido (ejemplo@dominio.com).";
            isValid = false;
        } else {
            correoError.textContent = "";
        }

        // Validar Contraseña (longitud mínima 8 caracteres)
        const contrasena = document.getElementById("contrasena");
        const contrasenaError = document.getElementById("contrasenaError");
        if (contrasena.value.trim().length < 8) {
            contrasenaError.textContent = "La contraseña debe tener al menos 8 caracteres.";
            isValid = false;
        } else {
            contrasenaError.textContent = "";
        }

        // Validar Tipo de Rol
        const tipoRol = document.getElementById("tipoRol");
        const tipoRolError = document.getElementById("tipoRolError");
        if (tipoRol.selectedIndex === 0) {
            tipoRolError.textContent = "Este campo es obligatorio.";
            isValid = false;
        } else {
            tipoRolError.textContent = "";
        }

        // Validar Estado (al menos un radio button debe estar seleccionado)
        const estadoActivo = document.getElementById("estadoActivo");
        const estadoInactivo = document.getElementById("estadoInactivo");
        const estadoError = document.getElementById("estadoError");
        if (!estadoActivo.checked && !estadoInactivo.checked) {
            estadoError.textContent = "Debe seleccionar un estado.";
            isValid = false;
        } else {
            estadoError.textContent = "";
        }

        // Validar Teléfono (solo números, longitud mínima de 10 dígitos)
        const celular = document.getElementById("celular");
        const celularError = document.getElementById("celularError");
        const celularPattern = /^[0-9]{10,15}$/;
        if (!celularPattern.test(celular.value.trim())) {
            celularError.textContent = "El teléfono debe contener solo números, con una longitud de 10 dígitos.";
            isValid = false;
        } else {
            celularError.textContent = "";
        }

        return isValid;
    }
});