document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('update-password-form');
    const messageElement = document.getElementById('message');
    const tokenInput = document.getElementById('token');
    const emailInput = document.getElementById('email');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const togglePasswordNew = document.getElementById('togglePasswordRegistro');
    const togglePasswordConfirm = document.getElementById('togglePasswordConfirmacion');
  
    // Extraer el token y el email de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const email = urlParams.get('email');
  
    if (token && email && tokenInput && emailInput) {
      tokenInput.value = token;
      emailInput.value = email;
    }
  
    if (form && messageElement && newPasswordInput && confirmPasswordInput) {
      form.addEventListener('submit', async function(event) {
        event.preventDefault();
  
        let valid = true;
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;
  
        // Validaciones para la nueva contraseña
        if (!newPassword || newPassword.length < 8) {
          valid = false;
          messageElement.textContent = 'La contraseña debe tener al menos 8 caracteres.';
          messageElement.classList.add('text-red-500');
        } else if (!/[A-Z]/.test(newPassword)) {
          valid = false;
          messageElement.textContent = 'La contraseña debe contener al menos una letra mayúscula.';
          messageElement.classList.add('text-red-500');
        } else if (newPassword !== confirmPassword) {
          valid = false;
          messageElement.textContent = 'Las contraseñas no coinciden.';
          messageElement.classList.add('text-red-500');
        } else {
          messageElement.classList.remove('text-red-500');
        }
  
        if (valid) {
          try {
            const response = await fetch('http://localhost:4000/api/update-password', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ token, email, newPassword })
            });
  
            const result = await response.json();
  
            if (response.ok) {
              messageElement.textContent = 'Contraseña actualizada exitosamente.';
              messageElement.classList.remove('text-red-500');
              messageElement.classList.add('text-green-500');
            } else {
              messageElement.textContent = result.error;
              messageElement.classList.add('text-red-500');
            }
          } catch (error) {
            messageElement.textContent = 'Error al actualizar la contraseña.';
            messageElement.classList.add('text-red-500');
          }
        }
      });
    }
  
    // Función para mostrar/ocultar la contraseña
    // Función para mostrar/ocultar la contraseña
    const togglePasswordVisibility = (inputField, toggleIcon) => {
      if (inputField.type === 'password') {
        inputField.type = 'text';
        toggleIcon.classList.add('bx-show');
        toggleIcon.classList.remove('bx-hide');
      } else {
        inputField.type = 'password';
        toggleIcon.classList.add('bx-hide');
        toggleIcon.classList.remove('bx-show');
      }
    };
  
    if (togglePasswordNew) {
      togglePasswordNew.addEventListener('click', () => {
        togglePasswordVisibility(newPasswordInput, togglePasswordNew);
      });
    }
  
    if (togglePasswordConfirm) {
      togglePasswordConfirm.addEventListener('click', () => {
        togglePasswordVisibility(confirmPasswordInput, togglePasswordConfirm);
      });
    }
  });