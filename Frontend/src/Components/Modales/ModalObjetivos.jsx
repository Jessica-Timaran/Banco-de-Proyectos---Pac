import { useState, useEffect } from 'react';
import { RiCloseLine } from '@remixicon/react';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '../Input2';
import BotonSegundo from '../BotonSegundoModal';
import SelectBoxArea from '../SelectBoxArea';
import PropTypes from 'prop-types';
import { useObjetivosForm } from '../../../hooks/SuperAdmin/useObjetivosForm';

// Función para obtener categorías
const fetchCategorias = async () => {
    try {
        const response = await fetch("http://localhost:4000/api/objetivos");
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

export default function TipoArea({ onClose, onAddCategoria }) {
    const [categorias, setCategoriaOptions] = useState([]);

    useEffect(() => {
        const loadCategorias = async () => {
            const categorias = await fetchCategorias();
            setCategoriaOptions(categorias);
        };
        loadCategorias();
    }, []);

    const { formValues, errors, handleInputChange, handleSubmit } = useObjetivosForm((data) => {
        onAddCategoria(data);
        onClose();
    });

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
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col p-[5%] space-y-6">
                        <div className="col-span-full sm:col-span-3 space-y-2">
                            <div>
                                <SelectBoxArea
                                    id="idcategoriasobjetivos"
                                    Text="Seleccione una Categoría"
                                    options={categorias}
                                    value={formValues.idcategoriasobjetivos}
                                    onChange={handleInputChange}
                                />
                                {errors.idcategoriasobjetivos && <span className="text-red-600">{errors.idcategoriasobjetivos}</span>}
                            </div>
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
                        </div>
                    </div>
                    <BotonSegundo text="Agregar" id="guardarBtn" />
                </form>
            </DialogPanel>
        </Dialog>
    );
}

TipoArea.propTypes = {
    onClose: PropTypes.func.isRequired,
    onAddCategoria: PropTypes.func.isRequired,
};
