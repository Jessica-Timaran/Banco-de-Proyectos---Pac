import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom'; // useLocation para obtener el estado previo
import { Card, Title, Select, SelectItem, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button } from '@tremor/react';
import LayoutPrincipal1 from '../Layouts/LayoutPrincipal1';
import Layoutcontenido2 from '../Layouts/Layoutcontenido2';
import BotonSegundo from '../Components/BotonSegundo';
import useFichasYAprendices from '../../hooks/Admin/useFichasYAprendices';
import { useAsignarProyecto } from '../../hooks/Admin/useAsignarProyecto';
import BotonBack from '../Components/BotonBack';

const AsignarProyectos = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook para obtener el estado previo
  const { idproyecto } = useParams();
  const {
    fichas,
    aprendices,
    selectedFicha,
    setSelectedFicha,
    loading,
    error,
  } = useFichasYAprendices();

  const [selectedAprendices, setSelectedAprendices] = useState([]);
  const { asignarProyecto, loading: saving, error: assignError } = useAsignarProyecto();

  const handleCheckboxChange = (idpersona) => {
    setSelectedAprendices(prevState =>
      prevState.includes(idpersona)
        ? prevState.filter(id => id !== idpersona)
        : [...prevState, idpersona]
    );
  };

  const handleGuardarClick = async () => {
    try {
      if (selectedAprendices.length === 0) {
        await asignarProyecto(idproyecto, null);
        alert('No se seleccionó ningún aprendiz, la asignación se actualizó a NULL.');
        return;
      }

      for (const idpersona of selectedAprendices) {
        await asignarProyecto(idproyecto, idpersona);
      }

      alert('Asignación guardada correctamente');
    } catch (error) {
      alert('Hubo un error al guardar la asignación');
    }
  };

  // Maneja el clic en el botón "Atrás" y reabre el modal si es necesario
  const handleBackClick = () => {
    if (location.state && location.state.fromModal) {
      navigate(-1); // Navegar hacia atrás
    } else {
      navigate('/proyectos'); // Si no venimos del modal, volvemos a la lista de proyectos
    }
  };

  return (
    <LayoutPrincipal1 title="Asignación de Proyecto">
      <Layoutcontenido2 text1="">
        <div className="flex justify-start pb-4 w-full">
          <BotonBack 
            Text="Atrás" 
            textColor="text-white" 
            className="bg-[#2eb694] hover:bg-lime-500 font-bold py-2 px-4 rounded" 
            onClick={handleBackClick} // Usamos el manejador de clic para regresar
          />
        </div>
        <Card className='h-auto'>
          <div className="flex items-center mb-6">
            <Button variant="light" color="gray" className="mr-4">
              Asignación de proyecto
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Title>Proyecto Aprobado</Title>
              {loading && <p>Cargando...</p>}
              {error && <p>Error: {error}</p>}
              <Select
                className="mt-2"
                placeholder="Seleccione ficha"
                onValueChange={(value) => setSelectedFicha(value)}
                value={selectedFicha}
              >
                {fichas.map((ficha) => (
                  <SelectItem key={ficha.idficha} value={ficha.idficha}>
                    {ficha.nombre} - {ficha.numeroficha}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div>
              <Title className="mb-2">Listado de Aprendices</Title>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Nombre</TableHeaderCell>
                    <TableHeaderCell>Seleccionar</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {aprendices.map((aprendiz) => (
                    <TableRow key={aprendiz.idpersonas}>
                      <TableCell>{aprendiz.nombre}</TableCell>
                      <TableCell>
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-green-500"
                          checked={selectedAprendices.includes(aprendiz.idpersonas)}
                          onChange={() => handleCheckboxChange(aprendiz.idpersonas)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="flex justify-end mt-6 mr-4 space-x-4">
            <BotonSegundo Text='Guardar' onClick={handleGuardarClick} disabled={saving} />
          </div>

          {assignError && <p className="text-red-500">Error al guardar la asignación: {assignError}</p>}
        </Card>
      </Layoutcontenido2>
    </LayoutPrincipal1>
  );
};

export default AsignarProyectos;