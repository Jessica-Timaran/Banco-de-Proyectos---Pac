import { useState, useEffect } from 'react';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '../Input2';
import SelectBoxArea from '../SelectBoxR';
import PropTypes from 'prop-types';
import { useTipoArea } from '../../../hooks/SuperAdmin/useTipoArea';

export default function ModalTipoAreas({ onClose, onAddTipoArea }) {
    const [areaOptions, setAreaOptions] = useState([]);
    const { formValues, errors, handleSubmit, handleInputChange, isSubmitting } = useTipoArea(async (data) => {
        onAddTipoArea(data);  // Llama al callback para agregar un área y actualizar la vista en el componente padre
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
            const response = await fetch("https://banco-de-proyectos-pac.onrender.com/api/superAdmin/areas");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data.map((area) => ({ value: area.idarea, label: area.area }));
        } catch (error) {
            console.error("Error al obtener áreas:", error);
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
                    className="absolute right-4 top-4 p-2 bg-transparent border-none"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <i className="fas fa-times size-5" aria-hidden={true}></i>
                </button>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="flex flex-col p-[5%] space-y-6">
                        <div className="col-span-full sm:col-span-3 space-y-2">
                            <SelectBoxArea
                                id="idarea"
                                Text="Seleccione un Área"
                                options={areaOptions}
                                value={formValues.idarea}
                                onChange={handleInputChange}
                                error={errors.idarea}
                            />
                            <Input2
                                id="nombreTipoArea"
                                type="text"
                                placeholder="Nombre del Tipo de Área"
                                Text="Tipo de Área:"
                                value={formValues.nombreTipoArea}
                                onChange={handleInputChange}
                                error={errors.nombreTipoArea}
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
                            id="guardarBtn"
                            className="bg-Verde text-white px-4 py-2 rounded justify-end"
                            disabled={isSubmitting} // Deshabilitar el botón mientras se envía el formulario
                        >
                            {isSubmitting ? 'Registrando...' : 'Agregar'}
                        </button>
                    </div>
                </form>
            </DialogPanel>
        </Dialog>
    );
}

ModalTipoAreas.propTypes = {
    onClose: PropTypes.func.isRequired,
    onAddTipoArea: PropTypes.func.isRequired,
};
