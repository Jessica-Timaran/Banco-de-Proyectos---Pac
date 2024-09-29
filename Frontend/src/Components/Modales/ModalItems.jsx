import { useState, useEffect } from 'react';
import { RiCloseLine } from '@remixicon/react';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '../Input2';
import SelectBoxItems from '../SelectBoxItems';
import PropTypes from 'prop-types';
import { useItemForm } from '../../../hooks/SuperAdmin/useItemForm';

const fetchArea = async () => {
    try {
        const response = await fetch("http://localhost:4000/api/tipos-de-area");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.map((area) => ({ id: area.idtiposdearea, nombre: area.tiposdearea }));
    } catch (error) {
        console.error("Error al obtener tipos de área:", error);
        return [];
    }
};

export default function TipoArea({ onClose }) {
    const { formValues, errors, handleInputChange, handleSelectChange, handleSubmit } = useItemForm(onClose);
    const [areaOptions, setAreaOptions] = useState([]);
    const [isClient, setIsClient] = useState(false); // Estado para verificar si está en el cliente

    useEffect(() => {
        setIsClient(true); // Cambiar a true una vez que el componente se monte
    }, []);

    useEffect(() => {
        const loadAreas = async () => {
            const areas = await fetchArea();
            setAreaOptions(areas);
        };

        if (isClient) {
            loadAreas();
        }
    }, [isClient]);

    useEffect(() => {
        if (formValues.tipoArea) {
            console.log("Tipo de área en useEffect:", formValues.tipoArea);
            handleSelectChange({ target: { id: 'tipoArea', value: formValues.tipoArea } });
        }
    }, [formValues.tipoArea]);

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
                                <SelectBoxItems
                                    id="tipoArea"
                                    Text="Seleccione un Tipo de Área"
                                    options={areaOptions}
                                    value={formValues.tipoArea}
                                    onChange={handleSelectChange}
                                />
                                {<p className="text-red-500 text-sm mt-1">{errors.tipoArea}</p>}
                            </div>
                            <div>
                                <Input2
                                    id="itemName" // Asegúrate de que este id coincide con el estado del formulario
                                    type="text"
                                    placeholder="Placeholder"
                                    value={formValues.itemName} // Asegúrate de que este valor coincide con el estado del formulario
                                    onChange={handleInputChange}
                                    required
                                    className={`bg-[#F5F6FA] w-full min-h-6 mt-3 rounded-[4px] border px-[20px] py-[7px] mb-2 text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong ${errors.itemName ? 'border-red-500' : 'border-[#D5D5D5]'}`}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Botón para enviar el formulario */}
                    <button
                        type="submit"
                        id="guardarBtn"
                        className="bg-blue-500 text-white px-4 py-2 rounded justify-end" // Estilos del botón con clases Tailwind
                    >
                        Agregar
                    </button>
                </form>
            </DialogPanel>
        </Dialog>
    );
}

TipoArea.propTypes = {
    onClose: PropTypes.func.isRequired,
};
