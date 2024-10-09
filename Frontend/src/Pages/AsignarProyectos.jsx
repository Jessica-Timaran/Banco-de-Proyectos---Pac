import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Card, Title, Select, SelectItem, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button } from '@tremor/react';
import Layoutprincipal from '../layouts/LayoutPrincipal';
import Layoutcontenido2 from '../Layouts/Layoutcontenido2';
import BotonSegundo from '../Components/BotonSegundo';
import useFichasYAprendices from '../../hooks/Admin/useFichasYAprendices';
import useAsignarProyecto from '../../hooks/Admin/useAsignarProyecto'; // Asegúrate de importar el hook correctamente


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
  
      // Aquí envía los ids de los aprendices seleccionados en un array
      await asignarProyecto(idproyecto, selectedAprendices); // Enviar el arreglo de ids de aprendices
  
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
    <Layoutprincipal title="Asignación de Proyecto">
      <Layoutcontenido2 text1="Asignar Proyecto">
        <Card className='h-auto'>
          <div className="flex items-center mb-6">

            <Title className="text-lg">Asignación de Proyecto</Title>
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

            <div className='w-auto'>
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