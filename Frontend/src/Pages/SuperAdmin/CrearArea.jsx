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





// import React from 'react';
// import Input from '../../Components/Input';
// import BotonSegundo from '../../Components/BotonSegundo';
// import RadioButton from '../../Components/RadioButton'
// import LayoutPrincipal from '../../layouts/LayoutPrincipal';
// import Layoutcontenido3 from '../../Layouts/Layoutcontenido3';

// const CrearAreas = () => {
//     return (
//         <LayoutPrincipal title="">
//             <Layoutcontenido3 title="Crear Areas">
//                 <div className="w-full md:w-1/2">
//                     <div className="flex flex-col p-[5%] flex-box space-y-5">
//                         <div>
//                             <Input Text="Area" placeholder="Area" type="text" id="nombreArea" />
//                             <span id="nombreError" className="error-message"></span>
//                         </div>
//                         <div className="space-y-4">
//                             <h1>Estado:</h1>
//                             <div className="flex h-[23px]">
//                                 <RadioButton Text="Activo" id="estadoActivo" />
//                                 <RadioButton Text="Inactivo" id="estadoInactivo" />
//                             </div>
//                             <span id="estadoError" className="error-message"></span>
//                         </div>
//                         <div className="flex justify-center items-center sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
//                             <BotonSegundo Text="Agregar" id="guardarBtn" />
//                         </div>
//                     </div>
//                 </div>
//             </Layoutcontenido3>
//             <script src="../js/Area.js"></script>
//         </LayoutPrincipal>
//     );
// };

// export default CrearAreas;
