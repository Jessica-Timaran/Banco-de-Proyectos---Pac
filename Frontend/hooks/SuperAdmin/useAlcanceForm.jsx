import { useState, useEffect } from 'react';
import axios from 'axios';

const useAlcanceForm = () => {
    const [formState, setFormState] = useState({
        alcanceName: '',          // Inicializa el campo para el nombre del alcance
        selectedCategory: '',     // Inicializa el campo para la categoría seleccionada
    });
    const [categories, setCategories] = useState([]);  // Almacena las categorías desde el API
    const [isSubmitting, setIsSubmitting] = useState(false);  // Controla el estado de envío del formulario
    const [errors, setErrors] = useState({
        alcanceName: '',          // Errores asociados al nombre del alcance
        selectedCategory: '',     // Errores asociados a la categoría seleccionada
    });

    // Fetch de categorías desde el API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/categorias');  // Obtiene las categorías desde el backend
                setCategories(response.data);  // Almacena las categorías en el estado
            } catch (error) {
                console.error('Error fetching categories:', error);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    fetch: 'Error fetching categories'  // Error al obtener las categorías
                }));
            }
        };
        fetchCategories();  // Llama la función para obtener las categorías
    }, []);

    // Manejo de cambios en los inputs del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,  // Actualiza el valor del input correspondiente
        }));

        // Restablece el error del campo que se está cambiando
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',  // Limpia el error específico del campo
        }));
    };

    // Función de validación del formulario
    const validateForm = () => {
        let valid = true;
        const newErrors = {
            alcanceName: '',
            selectedCategory: '',
        };

        // Validación del campo de nombre del alcance
        if (!formState.alcanceName.trim()) {
            newErrors.alcanceName = 'La descripción es requerida.';
            valid = false;
        }

        // Validación del campo de categoría seleccionada
        if (!formState.selectedCategory) {
            newErrors.selectedCategory = 'Debes seleccionar una categoría.';
            valid = false;
        }

        setErrors(newErrors);  // Actualiza los errores
        return valid;
    };

    // Manejo del envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});  // Limpia los errores previos

        // Si la validación falla, detener el proceso
        if (!validateForm()) {
            setIsSubmitting(false);
            return false;  // Retorna falso si hay errores
        }

        // Si la validación es exitosa
        try {
            const alcanceData = {
                descripcion: formState.alcanceName,  // Asigna la descripción del alcance
                idcategoriasalcance: formState.selectedCategory,  // Asigna la categoría seleccionada
            };

            await axios.post('http://localhost:4000/api/insertAlcance', alcanceData);  // Envía los datos al backend
            setIsSubmitting(false);
            return true;  // Retorna verdadero si se envió exitosamente
        } catch (error) {
            console.error('Error inserting alcance:', error);
            setErrors((prevErrors) => ({
                ...prevErrors,
                submit: 'Error inserting alcance',  // Error al intentar enviar los datos
            }));
            setIsSubmitting(false);
            return false;  // Retorna falso si hay error en el envío
        }
    };

    return {
        formState,         // Devuelve el estado del formulario
        categories,        // Devuelve las categorías obtenidas
        isSubmitting,      // Devuelve el estado de envío
        errors,            // Devuelve los errores para mostrarlos en el formulario
        handleInputChange, // Devuelve la función para manejar cambios en los inputs
        handleSubmit,      // Devuelve la función para manejar el envío del formulario
    };
};

export default useAlcanceForm;
