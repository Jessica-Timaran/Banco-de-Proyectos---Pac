import React from 'react';
import LayoutPrincipal from '../../layouts/LayoutPrincipal';
import BarraPreguntas from '../../Components/BarraPreguntas';
import EstadoAprobado from '../../Components/EstadoAprobado';
import EstadoRechazado from '../../Components/EstadoRechazado';
import GridDevolver from '../../Components/GridDevolver';
import Grid2 from '../../Components/Grid2'

const VistaMisProyectos = () => {
  return (
    <LayoutPrincipal title="">
      <div className="flex justify-center min-h-screen">
        <div className="p-10 w-full max-w-7xl my-10">
          <div className="flex flex-col space-y-8">

            <div className="flex justify-center">
              <BarraPreguntas Text1="Objetivos" Text2="Estado" Text3="" />
            </div>

            <Grid2 Text1="PAC">
              <EstadoAprobado />
            </Grid2>

            <GridDevolver Text1="Boteritos" />

            <GridDevolver Text1="Software contable liviano" />

            <Grid2 Text1="Plataforma Banca II">
              <EstadoAprobado />
            </Grid2>

            <Grid2 Text1="Libro de registro de operaciones diarias">
              <EstadoRechazado />
            </Grid2>

            <Grid2 Text1="MISE">
              <EstadoAprobado />
            </Grid2>

            <Grid2 Text1="Agendamiento centro de estetica facial">
              <EstadoAprobado />
            </Grid2>

            <Grid2 Text1="Mesa de soporte">
              <EstadoRechazado />
            </Grid2>

          </div>
        </div>
      </div>
    </LayoutPrincipal>
  );
};

export default VistaMisProyectos;
