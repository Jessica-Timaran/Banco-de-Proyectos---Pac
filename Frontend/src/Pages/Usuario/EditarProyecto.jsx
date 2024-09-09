import React from 'react';
import Layoutcontenido2 from '../../layouts/Layoutcontenido2.jsx';
import LayoutPrincipal2 from '../../layouts/LayoutPrincipal2.jsx';
import Input from '../../Components/Input.jsx';
import BotonPrincipal from '../../Components/BotonPrincipal.jsx';
import BotonSegundo from '../../Components/BotonSegundo.jsx';
import RadioButton from '../../Components/RadioButton.jsx';
import '../css/EditarProyecto.css'; // Carga el archivo CSS para los estilos

const EditarProyecto = () => {
  return (
    <LayoutPrincipal2 title="">
      <Layoutcontenido2 title="" text1="Editar Proyecto">
        <div className="w-1/2 mx-auto">
          <div className="flex font-josefin-slab flex-col space-y-8">
            <Input type="text" Text="Nombre Del Proyecto" placeholder="Ejemplo: Pac" id="NombreDelProyecto" />
            <Input type="text" Text="Sector Impactado" placeholder="Impacto Del Proyecto:" id="ImpactoDelProyecto" />
            <Input type="text" Text="Responsable" placeholder="Responsable Del Proyecto" id="Responsable" />

            <div className="space-y-2">
              <label className="font-josefin-slab font-semibold text-black">
                Disponibilidad Para Reuniones Con El Equipo Desarrollador
              </label>
            </div>

            <div className="grid sm:grid-cols-3 grid-cols-1 sm:gap-y-4 gap-4">
              <div className="flex justify-center">
                <BotonPrincipal className="w-25" Text="Semanal" />
              </div>
              <div className="flex justify-center">
                <BotonPrincipal className="w-25" Text="Quincenal" />
              </div>
              <div className="flex justify-center">
                <BotonPrincipal className="w-25" Text="Mensual" />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-x-8 sm:gap-y-4 mt-4">
              <RadioButton Text="Lunes" />
              <RadioButton Text="Martes" />
              <RadioButton Text="Miércoles" />
              <RadioButton Text="Jueves" />
              <RadioButton Text="Viernes" />
              <RadioButton Text="Sábado" />
            </div>

            <div className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <a href="/VistaAreas1">
                <BotonSegundo Text="Siguiente" />
              </a>
            </div>
          </div>
        </div>
      </Layoutcontenido2>
    </LayoutPrincipal2>
  );
};

export default EditarProyecto;
