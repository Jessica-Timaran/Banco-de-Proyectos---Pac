import { useState } from 'react';

const useTipoArea = (onClose) => {
    const [formData, setFormData] = useState({
        nombreTipoArea: '',
        idarea: ''
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        // Validar Nombre del tipo de área
        const nombrePattern = /^[A-Za-zÀ-ÿ\s.,0-9()]{2,50}$/;
        const nombreValue = formData.nombreTipoArea.trim();
        const digitCount = (nombreValue.match(/\d/g) || []).length;

        if (!nombrePattern.test(nombreValue) || digitCount !== 1) {
            newErrors.nombreTipoArea = "El nombre debe contener solo letras y un solo número.";
            isValid = false;
        }

        // Validar idarea
        if (!formData.idarea) {
            newErrors.idarea = "Debe seleccionar un área.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:4000/api/superAdmin/tipos-de-area', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error(`Error: ${await response.text()}`);
                }

                const data = await response.json();
                setSuccessMessage('Tipo de Área registrado con éxito');
                console.log('Tipo de Área registrado con éxito:', data);

                // Reset form after success
                setFormData({
                    nombreTipoArea: '',
                    idarea: ''
                });

                // Cerrar el modal después de enviar con éxito
                if (onClose) onClose();

            } catch (error) {
                console.error('Error al registrar tipo de área:', error);
                setErrorMessage('Hubo un problema al registrar el tipo de área.');
            }
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    return {
        formData,
        errors,
        successMessage,
        errorMessage,
        handleSubmit,
        handleChange
    };
};

export default useTipoArea;