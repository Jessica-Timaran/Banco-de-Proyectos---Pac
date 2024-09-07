import React from 'react';
import ModalUsuario from '../../Components/ModalUsuario'// Ajusta la ruta según la ubicación de tu archivo

const CrearArea = () => {
    return (
      <div>
        <h1>Bienvenido a la Página Principal</h1>
        <ModalUsuario /> {/* Aquí renderizas el modal */}
      </div>
    );
};

export default CrearArea;

