import React from 'react';
import Layoutcontenido2 from '../Layouts/Layoutcontenido2';
import LayoutPrincipal2 from '../layouts/LayoutPrincipal2';
import Input from '../Components/Input';
import BotonPrincipal from '../Components/BotonPrincipal';
import BotonSegundo from '../Components/BotonSegundo';
import RadioButton from '../Components/RadioButton';
import Loader from '../Components/Loader';

const RegistroProyecto = () => {
  return (
    <LayoutPrincipal2 title="">
      <div className="loading-container">
        <Loader />
      </div>
      <div className="content-container hidden">
        <Layoutcontenido2 title="" text1="Registrar Proyecto">
          <div className="w-1/2 mx-auto">
            <div className="flex font-josefin-slab flex-col space-y-8">
              <div>
                <Input type="text" Text="Nombre Del Proyecto" placeholder="Ejemplo: Pac" id="NombreDelProyecto" />
                <span id="errorNombreDelProyecto" className="text-red-500 text-sm"></span>
              </div>
              <div>
                <label htmlFor="ImpactoDelProyecto" className="block font-josefin-slab font-semibold text-black">
                  Sector Impactado
                </label>
                <textarea
                  id="ImpactoDelProyecto"
                  placeholder="Impacto Del Proyecto:"
                  maxLength="250"
                  className="w-full p-2 border border-gray-300 rounded bg-[#F5F6FA]"
                ></textarea>
                <span id="errorImpactoDelProyecto" className="text-red-500 text-sm"></span>
              </div>
              <div>
                <Input type="text" Text="Responsable" placeholder="Responsable Del Proyecto" id="Responsable" />
                <span id="errorResponsable" className="text-red-500 text-sm"></span>
              </div>
              {/* Hidden Inputs */}
              <input type="hidden" id="idrespuestaalcance" value="" />
              <input type="hidden" id="idrespuestaobjetivo" value="" />
              <input type="hidden" id="idarea" value="" />
              <input type="hidden" id="idficha" value="" />
              <input type="hidden" id="idpersona" value="" />
              <input type="hidden" id="iditems" value="" />
              <input type="hidden" id="idtiposdearea" value="" />
              <div className="space-y-2">
                <label className="font-josefin-slab font-semibold text-black">
                  Disponibilidad Para Reuniones Con El Equipo Desarrollador
                </label>
              </div>

              <div className="grid sm:grid-cols-3 grid-cols-1 sm:gap-y-4 gap-4">
                <div className="flex justify-center">
                  <BotonPrincipal Text="Semanal" id="btnSemanal" className="btn-frecuencia" />
                </div>
                <div className="flex justify-center">
                  <BotonPrincipal Text="Quincenal" id="btnQuincenal" className="btn-frecuencia" />
                </div>
                <div className="flex justify-center">
                  <BotonPrincipal Text="Mensual" id="btnMensual" className="btn-frecuencia" />
                </div>
                <span id="errorFrecuenciaReunion" className="text-red-500 text-sm sm:col-span-3"></span>
              </div>
              
              <div className="grid sm:grid-cols-3 gap-x-8 sm:gap-y-4 mt-4">
                <RadioButton Text="Lunes" id="checkboxLunes" />
                <RadioButton Text="Martes" id="checkboxMartes" />
                <RadioButton Text="Miércoles" id="checkboxMiercoles" />
                <RadioButton Text="Jueves" id="checkboxJueves" />
                <RadioButton Text="Viernes" id="checkboxViernes" />
                <RadioButton Text="Sábado" id="checkboxSabado" />
                
                <span id="errorDiasReunion" className="text-red-500 text-sm sm:col-span-3"></span>
              </div>
             
              <div className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                <a id="nextPageLink" href="/VistaAreas1">
                  <BotonSegundo Text="Siguiente" />
                </a>
              </div>
            </div>
          </div>
        </Layoutcontenido2>
      </div>
      <script src="../js/RegistroProyecto.js" />
    </LayoutPrincipal2>
  );
};

export default RegistroProyecto;
