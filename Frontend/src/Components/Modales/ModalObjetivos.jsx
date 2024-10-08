import { useState, useEffect } from 'react';
import { RiCloseLine } from '@remixicon/react';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '../Input2';
import SelectBoxArea from '../SelectBoxR';
import PropTypes from 'prop-types';
import { useObjetivosForm } from '../../../hooks/SuperAdmin/useObjetivosForm';

export default function Objetivo({ onClose, onAddObjetivo }) {
    const [categorias, setCategoriaOptions] = useState([]);  // Estado para las categorías
    const { formValues, errors, handleInputChange, handleSubmit, isSubmitting } = useObjetivosForm(async (data) => {
        onAddObjetivo(data);  // Agrega el objetivo
        setSuccessMessage('Registro exitoso');  // Mensaje de éxito
        setTimeout(() => {
            setSuccessMessage('');  // Limpia el mensaje de éxito
            onClose();  // Cierra el modal después de 2 segundos
        }, 2000);
    });

    const [successMessage, setSuccessMessage] = useState('');  // Estado para el mensaje de éxito

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!isSubmitting) handleSubmit(e);  // Llama a handleSubmit solo si no se está enviando
      };


    const fetchCategorias = async () => {
        try {
            const response = await fetch("https://banco-de-proyectos-pac.onrender.com/api/superAdmin/objetivos");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            const categoriasUnicas = [...new Set(data.map(objetivo => objetivo.categoria))];
            return categoriasUnicas.map((categoria, index) => ({ value: index + 1, label: categoria }));
        } catch (error) {
            console.error("Error al obtener categorías:", error);
            return [];
        }
    };

    useEffect(() => {
        const loadCategorias = async () => {
            const categorias = await fetchCategorias();
            setCategoriaOptions(categorias);
        };
        loadCategorias();
    }, []);

    return (
        <Dialog open={true} onClose={onClose} static={true} className="z-[100]">
            <DialogPanel className="sm:max-w-md">
                <button
                    type="button"
                    className="absolute right-4 top-4 p-2 bg-transparent border-none text-tremor-content-subtle hover:text-tremor-content hover:bg-tremor-background-subtle dark:text-dark-tremor-content-subtle dark:hover:bg-dark-tremor-background-subtle dark:hover:text-tremor-content"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <RiCloseLine className="size-5" aria-hidden={true} />
                </button>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="flex flex-col p-[5%] space-y-6">
                        <div className="col-span-full sm:col-span-3 space-y-2">
                            <div>
                                <SelectBoxArea
                                    id="idcategoriasobjetivos"
                                    Text="Seleccione una Categoría"
                                    options={categorias}
                                    value={formValues.idcategoriasobjetivos}
                                    onChange={handleInputChange}
                                    error={errors.idcategoriasobjetivos}
                                />
                            </div>
                            <div>
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
                    </div>
                    {successMessage && (
                        <div className="mt-4 text-green-600">
                            {successMessage}
                        </div>
                    )}
                    <div className='flex justify-end mt-8'>
                        <button
                            type="submit"
                            id="guardarBtn"
                            className="bg-verde text-white px-4 py-2 rounded justify-end"
                            disabled={isSubmitting} // Deshabilita el botón mientras se envía el formulario
                        >
                            {isSubmitting ? 'Registrando...' : 'Agregar'}
                        </button>
                    </div>
                </form>
            </DialogPanel>
        </Dialog>
    );
}

Objetivo.propTypes = {
    onClose: PropTypes.func.isRequired,
    onAddObjetivo: PropTypes.func.isRequired,
};
