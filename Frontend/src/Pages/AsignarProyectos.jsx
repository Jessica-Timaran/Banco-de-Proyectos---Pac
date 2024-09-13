
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Title, Select, SelectItem, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button } from '@tremor/react';
import Layoutprincipal from '../layouts/LayoutPrincipal';
import Layoutcontenido2 from '../Layouts/Layoutcontenido2';
import BotonSegundo from '../Components/BotonSegundo';
import useFichasYAprendices from '../../hooks/useFichasYAprendices'; //hook para mostrar las fichas y aprendices disponibles
import { useAsignarProyecto } from '../../hooks/useAsignarProyecto'; //hooks para la funcionalidad de guardar en la bd 

const AsignarProyectos = () => {
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
  const { asignarProyecto, loading: saving, error: assignError } = useAsignarProyecto(); // Usa el hook

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
      await asignarProyecto(idproyecto, null); // Envía null si no hay aprendices seleccionados
      alert('No se seleccionó ningún aprendiz, la asignación se actualizó a NULL.');
      return;
    }

    for (const idpersona of selectedAprendices) {
      await asignarProyecto(idproyecto, idpersona); // Llama al hook para cada aprendiz seleccionado
    }

    alert('Asignación guardada correctamente');
  } catch (error) {
    alert('Hubo un error al guardar la asignación');
  }
};


  return (
    <Layoutprincipal title="Asignación de Proyecto">
      <Layoutcontenido2 text1="Asignar Proyecto">
        <Card className='h-[450px]'>
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
    </Layoutprincipal>
  );
};

export default AsignarProyectos;