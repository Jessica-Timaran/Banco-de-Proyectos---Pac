import React from 'react';
import LayoutPrincipal from '../layouts/LayoutPrincipal.jsx';
import GridPrueba from '../Components/GridPrueba.jsx';
import Estado from '../Components/Estado.jsx';
import GridDevolver from '../Components/GridDevolver.jsx';
import Grid2 from '../Components/Grid2.jsx';
import EstadoAprobado from '../Components/EstadoAprobado.jsx';

const Prueba = () => {
  return (
    <LayoutPrincipal title="">
      <div className="flex justify-center min-h-screen">
        <div className="p-10 w-full max-w-7xl my-10">
          <div className="flex flex-col">
            <div className="grid grid-cols-12 bg-[#A3E784] font-bold py-4 rounded-t-lg border-b">
              <div className="col-span-12 md:col-span-10 text-center md:text-left px-6">ESTADO</div>
              <div className="col-span-12 md:col-span-2 text-center md:text-left px-6">ESTADO</div>
            </div>

            <GridPrueba Text1="PAC" id1="" id2="" name="" categoria="">
              <Estado />
            </GridPrueba>

            <GridPrueba Text1="Boteritos" id1="" id2="" name="" categoria="">
              <Estado />
            </GridPrueba>

            <GridDevolver Text1="Boteritos" />

            <GridDevolver Text1="Software contable liviano" />

            <Grid2 Text1="Plataforma Banca II">
              <EstadoAprobado />
            </Grid2>
          </div>
        </div>
      </div>
    </LayoutPrincipal>
  );
};

export default Prueba;
