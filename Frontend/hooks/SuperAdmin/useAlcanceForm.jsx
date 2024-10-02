import { useState } from 'react';
import axios from 'axios';

const useAlcanceForm = (onSubmitSuccess) => {
    const [formValues, setFormValues] = useState({
        descripcion: '',
        categoria: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { id, value } = e.target;  // Usamos `id` en lugar de `name`
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value,  // Actualizamos el campo usando `id`
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [id]: '',  // Limpiamos los errores basados en `id`
        }));
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!formValues.descripcion.trim()) {
            newErrors.descripcion = 'La descripción es requerida.';
            valid = false;
        }

        if (!formValues.categoria) {
            newErrors.categoria = 'Debes seleccionar una categoría.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const alcanceData = {
                descripcion: formValues.descripcion,
                idcategoriasalcance: formValues.categoria,
            };

            await axios.post('https://banco-de-proyectos-pac.onrender.com/api/superAdmin/insertAlcance', alcanceData);
            setIsSubmitting(false);
            onSubmitSuccess(alcanceData);
        } catch (error) {
            console.error('Error inserting alcance:', error);
            setErrors((prevErrors) => ({
                ...prevErrors,
                submit: 'Error inserting alcance',
            }));
            setIsSubmitting(false);
        }
    };

    return {
        formValues,
        isSubmitting,
        errors,
        handleInputChange,
        handleSubmit,
    };
};

export default useAlcanceForm;





