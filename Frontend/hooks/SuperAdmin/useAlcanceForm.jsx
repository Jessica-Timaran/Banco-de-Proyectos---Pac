import { useState, useEffect } from 'react';
import axios from 'axios';

const useAlcanceForm = () => {
    const [formState, setFormState] = useState({
        alcanceName: '',
        selectedCategory: '',
    });
    const [categories, setCategories] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({
        alcanceName: '',
        selectedCategory: '',
    });

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/categorias');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    fetch: 'Error fetching categories'
                }));
            }
        };
        fetchCategories();
    }, []);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormState((prevState) => ({
          ...prevState,
          [name]: value,
      }));
  
      // Reset error message when user types
      setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: '', // Clear error for the specific field being changed
      }));
  };
    const validateForm = () => {
        let valid = true;
        const newErrors = {
            alcanceName: '',
            selectedCategory: '',
        };

        if (!formState.alcanceName.trim()) {
            newErrors.alcanceName = 'La descripción es requerida.';
            valid = false;
        }

        if (!formState.selectedCategory) {
            newErrors.selectedCategory = 'Debes seleccionar una categoría.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setErrors({}); // Reset all errors
  
      if (!validateForm()) {
          setIsSubmitting(false);
          return false; // Retorna falso si hay errores
      }
  
      // Si la validación es exitosa
      try {
          const alcanceData = {
              descripcion: formState.alcanceName,
              idcategoriasalcance: formState.selectedCategory,
          };
  
          await axios.post('http://localhost:4000/api/insertAlcance', alcanceData);
          setIsSubmitting(false);
          return true; // Retorna verdadero si se envió exitosamente
      } catch (error) {
          console.error('Error inserting alcance:', error);
          setErrors((prevErrors) => ({
              ...prevErrors,
              submit: 'Error inserting alcance',
          }));
          setIsSubmitting(false);
          return false; // Retorna falso si hay error en el envío
      }
  };

    return {
        formState,
        categories,
        isSubmitting,
        errors, // Ahora contiene los errores
        handleInputChange,
        handleSubmit,
    };
};

export default useAlcanceForm;
