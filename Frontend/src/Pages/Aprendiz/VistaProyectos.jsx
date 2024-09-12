import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardProyect from "../../Components/CardAprendiz.jsx";
import BotonSegundo from "../../Components/BotonSegundo";
import LayoutPrincipal from "../../Layouts/Layoutprincipal.jsx";
import Layoutcontenido from "../../Layouts/Layoutcontenido3";
import ModalAsignaciones from "../../Components/Modales/Modal";

const Calificar = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProjectPeople, setSelectedProjectPeople] = useState([]);
  const [selectedProjectName, setSelectedProjectName] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/aprendiz/assigned-projects');
        if (!response.ok) {
          throw new Error('Error al obtener los proyectos');
        }
        const data = await response.json();
        console.log('Datos recibidos:', data); // Para depuración
        setProjects(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleOpenModal = (projectName, people) => {
    console.log('Abriendo modal para:', projectName, people); // Para depuración
    setSelectedProjectName(projectName);
    setSelectedProjectPeople(people);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProjectPeople([]);
    setSelectedProjectName('');
  };

  return (
    <LayoutPrincipal title="Proyectos">
      <Layoutcontenido title="Proyectos Asignados">
        {loading ? (
          <p className="text-center">Cargando proyectos...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 font-josefin-slab">
            {projects.map((project, index) => (
              <CardProyect
                key={index}
                Text={project.nombre_proyecto}
                onOpenModal={() => handleOpenModal(project.nombre_proyecto, project.personas_asignadas)}
              >
                  <a href="/Aprendiz/Formulario">
                  <BotonSegundo Text="Informe Proyecto" />
                  </a>
              </CardProyect>
            ))}
          </div>
        ) : (
          <p className="text-center">No hay proyectos para mostrar.</p>
        )}
        <ModalAsignaciones
          isOpen={modalOpen}
          onClose={handleCloseModal}
          projectName={selectedProjectName}
          people={selectedProjectPeople}
        />
      </Layoutcontenido>
    </LayoutPrincipal>
  );
};

export default Calificar;