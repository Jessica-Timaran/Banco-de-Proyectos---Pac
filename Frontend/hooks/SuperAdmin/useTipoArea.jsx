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
        if (!nombreValue) {
            errors.nombreTipoArea = 'El nombre es obligatorio';
            isValid = false;
        } else if (!nombrePattern.test(nombreValue)) {
            errors.nombreTipoArea = 'El nombre no es válido';
            isValid = false;
        }

        // Validar Área
        if (!formValues.idarea) {
            errors.idarea = 'Debes seleccionar un área';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            await onSuccess(formValues); // Llamar a la función onSuccess
        }
    };

    return {
        formValues,
        errors,
        handleInputChange,
        handleSubmit,
    };
}
