import { useState } from 'react';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '../Input2';
import PropTypes from 'prop-types';
import { useAreaForm } from '../../../hooks/SuperAdmin/useAreaForm';

export default function Areas({ onClose, onAddArea }) {
    // Hook useAreaForm maneja los valores del formulario, errores, y funciones de manejo de eventos
    const { formValues, errors, handleInputChange, handleSubmit } = useAreaForm((data) => {
        onAddArea(data);  // Llama al callback para agregar un área y actualizar la vista en el componente padre
        setSuccessMessage('Registro exitoso');  // Establece el mensaje de éxito
        setTimeout(() => {
            onClose();  // Cierra el modal automáticamente después de un breve período de tiempo (2 segundos en este caso)
        }, 2000); // Temporizador de 2000 milisegundos antes de cerrar el modal
    });

    // Hook useState para manejar el estado del mensaje de éxito
    const [successMessage, setSuccessMessage] = useState('');

    // Retorno del JSX que define la interfaz del modal y el formulario
    return (
        <Dialog
            open={true} // Define que el modal está abierto
            onClose={onClose} // Llama a la función onClose cuando se intenta cerrar el modal
            static={true} // Hace que el modal no se cierre al hacer clic fuera de él
            className="z-[100]" // Define el nivel de profundidad (z-index) para asegurarse de que esté sobre otros elementos
        >
            <DialogPanel className="sm:max-w-md"> {/* Define el tamaño máximo del modal en pantallas pequeñas */}
                <button
                    type="button"
                    className="absolute right-4 top-4 p-2 bg-transparent border-none" // Botón para cerrar el modal
                    onClick={onClose} // Ejecuta la función onClose cuando se hace clic en el botón
                    aria-label="Close" // Etiqueta accesible para lectores de pantalla
                >
                    <i className="fas fa-times size-5" aria-hidden={true}></i> {/* Ícono de "cerrar" */}
                </button>
                
                {/* Formulario para agregar una nueva área */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h4 className="font-semibold">Añade una nueva Área</h4> {/* Título del formulario */}
                    <div className="relative flex flex-col p-[5%] Flex-box space-y-6"> {/* Contenedor del campo de entrada */}
                        <Input2
                            id="area" // Identificador del campo
                            type="text" // Tipo de entrada de texto
                            placeholder="Nombre del Área" // Texto de sugerencia para el campo
                            value={formValues.area} // Valor controlado del campo, proporcionado por el hook useAreaForm
                            onChange={handleInputChange} // Función que maneja los cambios en el valor del campo
                            error={errors.area} // Muestra errores de validación si existen
                        />
                    </div>
                    
                    {/* Si existe un mensaje de éxito, se muestra */}
                    {successMessage && (
                    <div className="mt-4 text-green-600">
                        {successMessage} {/* Muestra el mensaje de éxito en texto verde */}
                    </div>
                    )}
                    
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

// Definición de tipos de propiedades requeridas para el componente
Areas.propTypes = {
    onClose: PropTypes.func.isRequired, // onClose es requerido y debe ser una función
    onAddArea: PropTypes.func.isRequired, // onAddArea es requerido y debe ser una función
};
