import { useState } from 'react';

const useTipoArea = () => {
    const [formData, setFormData] = useState({
        nombreTipoArea: '',
        estado: true,
        idarea: 7
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

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

        // Validar Estado (al menos un radio button debe estar seleccionado)
        if (!formData.estado) {
            newErrors.estado = "Debe seleccionar un estado.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:4000/api/superAdmin/registerTipoDeArea', {
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
                    estado: true,
                    idarea: 7
                });
                setTimeout(() => {
                    window.location.href = '/VistaCrearRegistro';
                }, 1000);

            } catch (error) {
                console.error('Error al registrar tipo de área:', error);
                setSuccessMessage("Hubo un problema al registrar el tipo de área.");
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
        handleSubmit,
        handleChange
    };
};

export default useTipoArea;
