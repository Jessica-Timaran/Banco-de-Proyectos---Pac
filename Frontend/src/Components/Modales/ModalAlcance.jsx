import { useState, useEffect } from 'react';
import { RiCloseLine } from '@remixicon/react';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '../Input2';
import SelectBoxAlcance from '../SelectBoxAlcance';
import PropTypes from 'prop-types';
import useAlcanceForm from '../../../hooks/SuperAdmin/useAlcanceForm.jsx';

// Función para obtener las categorías de la API
const fetchCategoriasAlcance = async () => {
    try {
        const response = await fetch("http://localhost:4000/api/alcances");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        
        // Extraer categorías únicas de la respuesta
        const categoriasUnicas = [...new Set(data.map(alcance => alcance.categoria))];
        
        // Convertir categorías en opciones para el select
        return categoriasUnicas.map((categoria, index) => ({
            value: index + 1,  // Ajusta según tu base de datos
            label: categoria
        }));
    } catch (error) {
        console.error("Error al obtener categorías:", error);
        return [];
    }
};

export default function Alcance({ onClose, onAddAlcance }) {
    const [categorias, setCategoriaOptions] = useState([]);

    // Cargar categorías al montar el componente
    useEffect(() => {
        const loadCategorias = async () => {
            const categorias = await fetchCategoriasAlcance();
            setCategoriaOptions(categorias);
        };
        loadCategorias();
    }, []);

    // Hook personalizado para manejar el formulario
    const { formValues, errors, handleInputChange, handleSubmit } = useAlcanceForm((data) => {
        onAddAlcance(data);
        setTimeout(() => {
            onClose();
        }, 2000); // Cerrar el modal después de 2 segundos
    });

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogPanel>
                <RiCloseLine onClick={onClose} />
                <form onSubmit={handleSubmit}>
                    <SelectBoxAlcance
                        options={categorias}
                        value={formValues.categoria}
                        onChange={handleInputChange}
                    />
                    <Input2
                        value={formValues.descripcion}
                        onChange={handleInputChange}
                        placeholder="Descripción del alcance"
                    />
                    {errors.descripcion && <span>{errors.descripcion}</span>}
                    <button type="submit">Agregar</button>
                </form>
            </DialogPanel>
        </Dialog>
    );
}

// Definición de propTypes
Alcance.propTypes = {
    onClose: PropTypes.func.isRequired,
    onAddAlcance: PropTypes.func.isRequired,
};
