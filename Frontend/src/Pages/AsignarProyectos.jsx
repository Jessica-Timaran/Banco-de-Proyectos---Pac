import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Title, Select, SelectItem, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button } from '@tremor/react';
import Layoutprincipal from '../Layouts/LayoutPrincipal';
import Layoutcontenido2 from '../layouts/Layoutcontenido2';
import BotonPrincipal from '../Components/BotonPrincipal';
import BotonSegundo from '../Components/BotonSegundo';
import useFichasYAprendices from '../../hooks/useFichasYAprendices';

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
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const handleCheckboxChange = (idpersona) => {
    setSelectedAprendices(prevState =>
      prevState.includes(idpersona)
        ? prevState.filter(id => id !== idpersona)
        : [...prevState, idpersona]
    );
  };

  const assignProject = async (idficha, selectedAprendices, idproyecto) => {
    setSaving(true);
    setSaveError(null);
    try {
      // Aquí iría la lógica para hacer la solicitud al backend
      const response = await fetch('http://localhost:4000/api/asignar-proyectos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idficha, selectedAprendices, idproyecto }),
      });

      if (!response.ok) {
        throw new Error('Error al guardar la asignación');
      }

      alert('Asignación guardada exitosamente');
    } catch (error) {
      setSaveError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleGuardarClick = async () => {
    try {
      await assignProject(selectedFicha, selectedAprendices, idproyecto);
      // Aquí puedes agregar lógica adicional después de guardar, como redirigir al usuario.
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

          {saveError && <p className="text-red-500">Error al guardar la asignación: {saveError}</p>}
        </Card>
      </Layoutcontenido2>
    </Layoutprincipal>
  );
};

export default AsignarProyectos;
