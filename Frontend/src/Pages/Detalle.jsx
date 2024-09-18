import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layoutprincipal from "../layouts/LayoutPrincipal";
import Layoutcontenido2 from "../Layouts/Layoutcontenido2";
import { ListProject } from "../Components/ListProject";
import BotonPrincipal from "../Components/BotonPrincipal";
import BotonSegundo from "../Components/BotonSegundo";
import { ListItem } from "@tremor/react";
import Loader from "../Components/Loader"; // Importa el componente Loader

const Detalle = () => {
  const { id } = useParams(); // Obtener el parámetro `id` de la URL
  const [proyecto, setProyecto] = useState({
    nombre: "",
    impacto: "",
    responsable: "",
    disponibilidad: "",
    dia: "",
    nombre_area: "", // Cambié `idarea` a `nombre_area` para reflejar el nombre del área
    promediofinal: "", // Aquí reflejamos el nuevo campo de la calificación
    estado: "", // Aquí reflejamos el nuevo campo para el estado
  });
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga

  useEffect(() => {
    const fetchProyecto = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/admin/proyectos/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setProyecto(data);
        } else {
          console.error("Error al obtener el proyecto:", response.statusText);
        }
      } catch (error) {
        console.error("Error de red al obtener el proyecto:", error);
      } finally {
        setIsLoading(false); // Indica que la carga ha terminado
      }
    };

    fetchProyecto();
  }, [id]);

  return (
    <Layoutprincipal title="Detalle del proyecto">
      <Layoutcontenido2 title="" text1="Detalle del proyecto">
        {isLoading ? (
          <Loader /> // Mostrar Loader mientras se cargan los datos
        ) : (
          <div className="h-full w-full p-2 ">
            <ListProject>
              <ListItem>
                <span className="text-xs sm:text-xl">Nombre del proyecto</span>
                <span className="sm:text-xl">
                  {proyecto.nombre || "No disponible"}
                </span>
              </ListItem>
              <ListItem>
                <span className="text-xs sm:text-xl">Sector impactado</span>
                <span className="text-xs sm:text-xl">
                  {proyecto.impacto || "No disponible"}
                </span>
              </ListItem>
              <ListItem>
                <span className="text-xs sm:text-xl">Responsable</span>
                <span className="text-xs sm:text-xl">
                  {proyecto.responsable || "No disponible"}
                </span>
              </ListItem>
              <ListItem>
                <span className="text-xs sm:text-xl">Disponibilidad</span>
                <span className="text-xs sm:text-xl">
                  {proyecto.disponibilidad || "No disponible"}
                </span>
              </ListItem>
              <ListItem>
                <span className="text-xs sm:text-xl">Día</span>
                <span className="text-xs sm:text-xl">
                  {proyecto.dia || "No disponible"}
                </span>
              </ListItem>
              <ListItem>
                <span className="text-xs sm:text-xl">Área del proyecto</span>
                <span className="text-xs sm:text-xl">
                  {proyecto.nombre_area || "No disponible"}
                </span>
              </ListItem>
              <ListItem>
                <span className="text-xs sm:text-xl">Calificación</span>
                <span className="sm:text-xl">
                  {proyecto.promediofinal || "No disponible"}
                </span>
              </ListItem>
              <ListItem>
                <span className="text-xs sm:text-xl">Estado</span>
                <span className="sm:text-xl">
                  {proyecto.estado || "No disponible"}
                </span>
              </ListItem>
            </ListProject>
            <div className="flex flex-col items-center justify-end lg:justify-end lg:flex-row space-y-2 sm:space-y-0 sm:space-x-4 m-6 ">
              <Link to="/Calificar">
                <BotonPrincipal Text="Atras" />
              </Link>

              <Link to={`/respuestas/${id}`}>
                <BotonSegundo Text="Siguiente" />
              </Link>
            </div>
          </div>
        )}
      </Layoutcontenido2>
    </Layoutprincipal>
  );
};

export default Detalle;
