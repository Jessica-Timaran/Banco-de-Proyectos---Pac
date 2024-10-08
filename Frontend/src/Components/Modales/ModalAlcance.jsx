import { useState, useEffect } from 'react';
import { RiCloseLine } from '@remixicon/react';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '../Input2';
import SelectBoxAlcance from '../SelectBoxR';
import PropTypes from 'prop-types';
import useAlcanceForm from '../../../hooks/SuperAdmin/useAlcanceForm.jsx';

export default function ModalAlcance({ onClose, onAddAlcance }) {
    const [categorias, setCategoriaOptions] = useState([]);
    const { formValues, errors, isSubmitting, handleInputChange, handleSubmit } = useAlcanceForm((data) => {
        onAddAlcance(data);
        setSuccessMessage('Registro exitoso');  // Mensaje de éxito
        setTimeout(() => {
            setSuccessMessage('');  // Limpia el mensaje de éxito
            onClose();
        }, 2000);
    });

    const [successMessage, setSuccessMessage] = useState('');  // Estado para el mensaje de éxito

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!isSubmitting) handleSubmit(e);  // Llama a handleSubmit solo si no se está enviando
      };

    const fetchCategoriasAlcance = async () => {
        try {
            const response = await fetch("https://banco-de-proyectos-pac.onrender.com/api/superAdmin/alcances");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            const categoriasUnicas = [...new Set(data.map(alcance => alcance.categoria))];
            return categoriasUnicas.map((categoria, index) => ({value: (index + 1).toString(), label: categoria }));
        } catch (error) {
            console.error("Error al obtener categorías:", error);
            return [];
        }
    };


    useEffect(() => {
        const loadCategorias = async () => {
            const categorias = await fetchCategoriasAlcance();
            setCategoriaOptions(categorias);
        };
        loadCategorias();
    }, []);

    return (
        <Dialog open={true} onClose={onClose} static={true} className="z-[100]">
            <DialogPanel className="sm:max-w-md">
                <button
                    type="button"
                    className="absolute right-4 top-4 p-2 bg-transparent border-none"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <RiCloseLine className="size-5" aria-hidden={true} />
                </button>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="flex flex-col p-[5%] space-y-6">
                        <div className="col-span-full sm:col-span-3 space-y-2">
                            <SelectBoxAlcance
                                Text="Categoría"
                                id="categoria"
                                options={categorias}
                                value={formValues.categoria}
                                onChange={handleInputChange}
                                error={errors.categoria}
                            />
                            <Input2
                                id="descripcion"
                                type="text"
                                placeholder="Descripción"
                                Text="Descripción:"
                                value={formValues.descripcion}
                                onChange={handleInputChange}
                                error={errors.descripcion}
                            />
                    </div>
                </div>
                    {successMessage && (
                        <div className="mt-4 text-green-600">
                            {successMessage}
                        </div>
                    )}
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
