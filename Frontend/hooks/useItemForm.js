import { useState, useEffect } from 'react';

export function useItemForm(onSuccess) {
    const [formValues, setFormValues] = useState({
        tipoArea: '',
        itemName: '',
    });

    const [errors, setErrors] = useState({});
    const [types, setTypes] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/superAdmin/tipos-de-area');
                if (!response.ok) {
                    throw new Error(`Error fetching types: ${response.statusText}`);
                }
                const data = await response.json();
                setTypes(data);
                console.log("Tipos de área cargados:", data);
            } catch (error) {
                console.error('Error fetching types:', error);
            }
        };

        fetchTypes();
    }, []);

    useEffect(() => {
        const fetchItems = async () => {
            if (formValues.tipoArea) {
                try {
                    const response = await fetch(`http://localhost:4000/api/superAdmin/items/${formValues.tipoArea}`);
                    if (!response.ok) {
                        throw new Error(`Error fetching items: ${response.statusText}`);
                    }
                    const data = await response.json();
                    setItems(data);
                    console.log("Ítems cargados:", data);
                } catch (error) {
                    console.error('Error fetching items:', error);
                }
            }
        };

        fetchItems();
    }, [formValues.tipoArea]);

    const validateForm = () => {
        const errors = {};
        let isValid = true;

        const itemPattern = /^[A-Za-zÀ-ÿ\s.,]{2,50}$/;
        if (!itemPattern.test(formValues.itemName.trim())) {
            errors.itemName = 'El nombre debe contener solo letras y tener entre 2 y 50 caracteres.';
            isValid = false;
        }

        if (!formValues.tipoArea) {
            errors.tipoArea = 'Selecciona un tipo de área.';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        console.log(`Cambio en input: ${id} = ${value}`);
        setFormValues(prevValues => ({ ...prevValues, [id]: value }));
    };

    const handleSelectChange = (e) => {
        const { id, value } = e.target;
        console.log(`Cambio en select: ${id} = ${value}`);
        setFormValues(prevValues => ({ ...prevValues, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Datos del formulario antes de enviar:", formValues);
            try {
                const response = await fetch('http://localhost:4000/api/superAdmin/insertItem', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formValues)
                });

                if (!response.ok) {
                    const error = await response.json();
                    console.error('Error en la respuesta del servidor:', error);
                    alert('Error al registrar el ítem: ' + (error.message || 'Error desconocido'));
                    return;
                }

                const data = await response.json();
                alert('Ítem registrado con éxito: ' + JSON.stringify(data));
                onSuccess(data);
            } catch (error) {
                console.error('Error al registrar el ítem:', error);
                alert('Error al registrar el ítem: ' + error.message);
            }
        }
    };

    return {
        formValues,
        errors,
        handleInputChange,
        handleSelectChange,
        handleSubmit,
        types,
        items
    };
}