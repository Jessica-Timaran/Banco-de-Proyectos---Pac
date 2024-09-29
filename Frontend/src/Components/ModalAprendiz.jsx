import React from 'react';
import { Card, Title, Text, Button } from "@tremor/react";
import { useNavigate } from 'react-router-dom'; // Importamos el hook de navegación

const ModalAprendiz = ({ isOpen, onClose, projectId, projectName, responsable, aprendices }) => {
  const navigate = useNavigate(); // Inicializamos el hook de navegación

  const handleEditClick = () => {
    // Navega a la vista de edición de proyectos pasando el estado "fromModal"
    navigate(`/asignar-proyectos/${projectId}`, {
      state: { fromModal: true }, // Aquí indicamos que venimos desde el modal
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10">
      <Card className="w-full max-w-lg">
        <div className="space-y-6">
          <div className="space-y-2">
            <Title className="text-xl font-semibold">Nombre del proyecto</Title>
            <Card className="bg-gray-100 p-2">
              <Text>{projectName}</Text>
            </Card>
          </div>

          <div className="space-y-2">
            <Title className="text-xl font-semibold">Responsable</Title>
            <Card className="bg-gray-100 p-2">
              <Text>{responsable}</Text>
            </Card>
          </div>

          <div className="space-y-2">
            <Title className="text-xl font-semibold">Aprendices Asignados</Title>
            {aprendices.map((aprendiz, index) => (
              <Card key={index} className="bg-gray-100 p-2">
                <Text>{aprendiz.nombre_persona}</Text>
              </Card>
            ))}
          </div>

          <div className="flex justify-center gap-x-2">
            <Button variant="secondary" className="px-8" onClick={onClose}>
              Volver
            </Button>
            <Button variant="secondary" className="px-8" onClick={handleEditClick}>
              Editar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ModalAprendiz;