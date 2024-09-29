'use client'

import PropTypes from 'prop-types';
import { useState } from 'react';
import { Dialog, DialogPanel } from '@tremor/react';
import Input2 from '../Input2';
import { useFichaForm } from '../../../hooks/SuperAdmin/useFichaForm';

export default function ModalFicha({ onClose, onAddFicha }) {
  // Obtiene los valores del formulario, errores y funciones de manejo del formulario desde el hook useFichaForm
  const { formValues, errors, handleInputChange, handleSubmit } = useFichaForm((data) => {
    onAddFicha(data);  // Llama al callback para actualizar la vista cuando se registra una ficha
    setSuccessMessage('Registro exitoso');  // Establece el mensaje de éxito
    setTimeout(() => {
      onClose();  // Cierra el modal después de un breve período
    }, 2000); // Espera 2 segundos antes de cerrar el modal, puedes ajustar este tiempo según sea necesario
  });

  const [successMessage, setSuccessMessage] = useState('');  // Estado que maneja el mensaje de éxito

  return (
    <Dialog open={true} onClose={onClose} static={true} className="z-[100]">
      <DialogPanel className="sm:max-w-md">
        {/* Botón para cerrar el modal */}
        <button
          type="button"
          className="absolute right-4 top-4 p-2 bg-transparent border-none"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <i className="fas fa-times size-5" aria-hidden={true}></i>
        </button>

        {/* Formulario para agregar una nueva ficha */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h4 className="font-semibold">Añade nueva ficha</h4>

          <div className="flex flex-col p-[5%] space-y-4">
            <div className="col-span-full sm:col-span-3 space-y-2">
              {/* Campo de entrada para el nombre del programa */}
              <div className="relative">
                <Input2
                  id="nombre"
                  type="text"
                  placeholder="Sistemas"
                  Text="Nombre del programa:"
                  value={formValues.nombre}  // Valor controlado del input
                  onChange={handleInputChange}  // Maneja el cambio de valor
                  error={errors.nombre}  // Muestra error si existe
                />
              </div>

              {/* Campo de entrada para el número de ficha */}
              <div className="relative">
                <Input2
                  id="numeroficha"
                  type="text"
                  placeholder="2694265"
                  Text="Número de ficha:"
                  value={formValues.numeroficha}  // Valor controlado del input
                  onChange={handleInputChange}  // Maneja el cambio de valor
                  error={errors.numeroficha}  // Muestra error si existe
                />
              </div>
            </div>
          </div>

          {/* Muestra el mensaje de éxito si existe */}
          {successMessage && (
            <div className="mt-4 text-green-600">
              {successMessage}
            </div>
          )}

          {/* Botón para agregar la nueva ficha */}
          <button
            type="submit"
            id="guardarBtn"
            className="bg-blue-500 text-white px-4 py-2 rounded justify-end"
          >
            Agregar
          </button>
        </form>
      </DialogPanel>
    </Dialog>
  );
}

// Definición de los tipos de propiedades requeridas para el componente
ModalFicha.propTypes = {
  onClose: PropTypes.func.isRequired,  // Función para cerrar el modal
  onAddFicha: PropTypes.func.isRequired,  // Función que se llama al agregar la ficha
};
