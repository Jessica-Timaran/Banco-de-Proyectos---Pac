import { useState,  } from 'react';

export function useObjetivosForm(onSuccess) {
    const [formValues, setFormValues] = useState({
        idcategoriasobjetivos: '',
        descripcion: '',
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        let isValid = true;

        // Validar selección de categoría
        if (!formValues.idcategoriasobjetivos) {
            errors.idcategoriasobjetivos = 'Debes seleccionar una categoría.';
            isValid = false;
        }

        // Validar descripción (mínimo 10 caracteres)
        const descripcionPattern = /^[A-Za-zÀ-ÿ\s.,]{10,}$/;
        if (!descripcionPattern.test(formValues.descripcion.trim())) {
            errors.descripcion = 'La descripción debe tener al menos 10 caracteres.';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        console.log(`Cambio en input: ${id} = ${value}`);
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:4000/api/insertObjetivo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formValues),
                });

                if (!response.ok) {
                    const error = await response.json();
                    console.error('Error en la respuesta del servidor:', error);
                    alert('Error al registrar el objetivo: ' + (error.message || 'Error desconocido'));
                    return;
                }

                const data = await response.json();
                alert('Objetivo registrado con éxito: ' + JSON.stringify(data));
                onSuccess(data);
                setFormValues({
                    idcategoriasobjetivos: '',
                    descripcion: '',
                });
            } catch (error) {
                console.error('Error al registrar el objetivo:', error);
                alert('Error al registrar el objetivo: ' + error.message);
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
