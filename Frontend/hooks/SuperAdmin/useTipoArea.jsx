import { useState } from 'react';

export function useTipoArea(onSuccess) {
    const [formValues, setFormValues] = useState({
        nombreTipoArea: '',
        idarea: ''
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        let isValid = true;

        // Validar Nombre del tipo de área
        const nombrePattern = /^[A-Za-zÀ-ÿ\s.,0-9()]{2,50}$/;
        const nombreValue = formValues.nombreTipoArea.trim();
        const digitCount = (nombreValue.match(/\d/g) || []).length;

        if (!nombrePattern.test(nombreValue) || digitCount !== 1) {
            errors.nombreTipoArea = "El nombre debe contener solo letras y un solo número.";
            isValid = false;
        }

        // Validar idarea
        if (!formValues.idarea) {
            errors.idarea = "Debe seleccionar un área.";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues(prevValues => ({ ...prevValues, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:4000/api/tipos-de-area', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formValues)
                });

                if (!response.ok) {
                    const error = await response.json();
                    console.error('Error en la respuesta del servidor:', error);
                    throw new Error(error.message || 'Error desconocido');
                }

                const data = await response.json();
                console.log('Tipo de Área registrado con éxito:', data);

                // Llamar la función onSuccess al registrar con éxito
                onSuccess(data);
            } catch (error) {
                console.error('Error al registrar tipo de área:', error);
            }
        }
    };

    return {
        formValues,
        errors,
        handleInputChange,
        handleSubmit,
    };
}

export default useTipoArea;
