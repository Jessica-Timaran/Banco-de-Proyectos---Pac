import { useState, useEffect } from 'react';
import { RiCloseLine } from '@remixicon/react';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '../Input2';
import SelectBoxAlcance from '../SelectBoxAlcance';
import PropTypes from 'prop-types';
import useAlcanceForm from '../../../hooks/SuperAdmin/useAlcanceForm.jsx';

const fetchCategoriasAlcance = async () => {
    try {
        const response = await fetch("https://banco-de-proyectos-pac.onrender.com/api/superAdmin/alcances");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const categoriasUnicas = [...new Set(data.map(alcance => alcance.categoria))];
        return categoriasUnicas.map((categoria, index) => ({
            value: (index + 1).toString(),  // Ajuste del valor como string
            label: categoria
        }));
    } catch (error) {
        console.error("Error al obtener categorías:", error);
        return [];
    }
};

export default function ModalAlcance({ onClose, onAddAlcance }) {
    const [categorias, setCategoriaOptions] = useState([]);
    const { formValues, errors, isSubmitting, handleInputChange, handleSubmit } = useAlcanceForm((data) => {
        onAddAlcance(data);
        setTimeout(() => {
            onClose();
        }, 2000);
    });

    useEffect(() => {
        const loadCategorias = async () => {
            const categorias = await fetchCategoriasAlcance();
            setCategoriaOptions(categorias);
        };
        loadCategorias();
    }, []);

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogPanel>
                <button type="button" onClick={onClose} aria-label="Close">
                    <RiCloseLine />
                </button>
                <form onSubmit={handleSubmit}>
                    <SelectBoxAlcance
                        Text="Categoría"
                        id="categoria"
                        options={categorias}
                        value={formValues.categoria}
                        onChange={handleInputChange}
                        error={errors.categoria}
                    />
                   <div>
                                <Input2
                                    id="descripcion"
                                    type="text"
                                    placeholder="Descripción"
                                    Text="Descripción:"
                                    value={formValues.descripcion}
                                    onChange={handleInputChange}
                                />
                                {errors.descripcion && <span className="text-red-600">{errors.descripcion}</span>}
                            </div>
                    <div className='flex justify-end mt-8'>
                        <button
                            type="submit"
                            className="bg-verde text-white px-4 py-2 rounded"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Registrando...' : 'Agregar'}
                        </button>
                    </div>
                </form>
            </DialogPanel>
        </Dialog>
    );
}

ModalAlcance.propTypes = {
    onClose: PropTypes.func.isRequired,
    onAddAlcance: PropTypes.func.isRequired,
};
