document.addEventListener("DOMContentLoaded", function () {
    const guardarBtn = document.getElementById("guardarBtn");

    guardarBtn.addEventListener("click", function (event) {
        event.preventDefault();

        // Validar todos los campos
        const isValid = validateForm();

        if (isValid) {
            // Mostrar el modal
            const modal = document.querySelector('.modal');
            modal.classList.remove('hidden');

            const closeModal = document.querySelector('.close-modal');
            closeModal?.addEventListener('click', function() {
                modal?.classList.add('hidden');
            });

            // Enviar datos al servidor
            const formData = {
                nombre: document.getElementById("nombreFicha").value.trim(),
                numeroFicha: document.getElementById("FichasNum").value.trim(),
                estado: document.querySelector('input[name="estado"]:checked')?.value
            };

            console.log('Datos del formulario:', formData); // Log de los datos enviados

            fetch('http://localhost:4000/api/registerFicha', {
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
                console.log('Ficha registrada con éxito:', data);
            })
            .catch(error => {
                console.error('Error al registrar ficha:', error);
            });
        }
    });

    function validateForm() {
        let isValid = true;

        // Validar Nombre de la ficha (solo letras)
        const nombreFicha = document.getElementById("nombreFicha");
        const nombreError = document.getElementById("nombreError");
        const nombreFichaPattern = /^[A-Za-z\s]{2,50}$/;
        if (!nombreFichaPattern.test(nombreFicha.value.trim())) {
            nombreError.textContent = "El nombre debe contener solo letras";
            isValid = false;
        } else {
            nombreError.textContent = "";
        }

        // Validar Número de ficha (solo números, longitud exacta de 7 dígitos)
        const FichasNum = document.getElementById("FichasNum");
        const FichasNumError = document.getElementById("FichasNumError");
        const FichasNumPattern = /^[0-9]{7}$/;
        if (!FichasNumPattern.test(FichasNum.value.trim())) {
            FichasNumError.textContent = "El número de ficha debe contener solo números, con una longitud de 7 dígitos.";
            isValid = false;
        } else {
            FichasNumError.textContent = "";
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

        return isValid;
    }
});