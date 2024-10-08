import { useState, useEffect } from 'react';
import { RiCloseLine } from '@remixicon/react';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '../Input2';
import SelectBoxItems from '../SelectBoxItems';
import PropTypes from 'prop-types';
import { useItemForm } from '../../../hooks/SuperAdmin/useItemForm';


export default function Items({ onClose, onAddItem}) {
    const [areaOptions, setAreaOptions] = useState([]);
    const { formValues, errors, handleInputChange, isSubmitting, handleSubmit } = useItemForm(async (data) => {
        onAddItem(data);  // Llama al callback para agregar un área y actualizar la vista en el componente padre
        setSuccessMessage('Registro exitoso');  // Establece el mensaje de éxito
        setTimeout(() => {
          onClose();  // Cierra el modal automáticamente después de 2 segundos
        }, 2000);  // Temporizador antes de cerrar el modal
      })

    const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!isSubmitting) handleSubmit(e);  // Llama a handleSubmit solo si no se está enviando
      };


    const fetchArea = async () => {
        try {
            const response = await fetch("https://banco-de-proyectos-pac.onrender.com/api/superAdmin/tipos-de-area");
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

    useEffect(() => {
        const loadAreas = async () => {
            const areas = await fetchArea();
            setAreaOptions(areas);
        };
        loadAreas();
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
                                <SelectBoxItems
                                    id="tipoArea"
                                    Text="Seleccione un Tipo de Área"
                                    options={areaOptions}
                                    value={formValues.tipoArea}
                                    onChange={handleInputChange}
                                    error={errors.tipoArea}
                                />
                            </div>
                            <div>
                                <Input2
                                    id="itemName" // Asegúrate de que este id coincide con el estado del formulario
                                    type="text"
                                    placeholder="Placeholder"
                                    Text="Items:"
                                    value={formValues.itemName} // Asegúrate de que este valor coincide con el estado del formulario
                                    onChange={handleInputChange}
                                    error={errors.itemName}
                                />
                            </div>
                        </div>
                    </div>

                    {successMessage && (
                        <div className="mt-4 text-green-600">
                            {successMessage}
                        </div>
                    )}
                    {/* Botón para enviar el formulario */}
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

Items.propTypes = {
    onClose: PropTypes.func.isRequired,
};
