import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import CardProyect from "../Components/CardProyect";
import RadioButton from "../Components/RadioButton";
import BotonSegundo from "../Components/BotonSegundo";
import Layoutcontenido from "../Layouts/Layoutcontenido";
import Layoutprincipal from "../layouts/LayoutPrincipal";

const Calificar = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('Recibidos'); // Estado para controlar el filtro seleccionado

  // Función para obtener proyectos desde la API, filtrados por estado
  const fetchProyecto = async (estado) => {
    try {
      // Limpiar el estado antes de realizar la nueva petición
      setData([]);
      
      // Construir la URL con el filtro de estado
      let url = `http://localhost:4000/api/admin/proyectos?estado=${estado}`;
      
      // Llamada a la API para obtener proyectos según el estado seleccionado
      console.log('Fetching URL:', url);
      const response = await fetch(url);
      if (response.ok) {
        const proyectos = await response.json();
        console.log('Proyectos obtenidos:', proyectos);
        setData(proyectos);
      } else {
        console.error("Error al obtener los proyectos:", response.statusText);
      }
    } catch (error) {
      console.error("Error de red al obtener los proyectos:", error);
    }
  };

  // Usar useEffect para llamar a fetchProyecto cada vez que cambie el filtro
  useEffect(() => {
    fetchProyecto(filter);
  }, [filter]); // Se llama cada vez que el filtro cambia

  return (
    <Layoutprincipal title="Proyectos">
      <Layoutcontenido title="contenido">
        <div className="">
          <div className="w-full">
             <div className="w-auto">
              <div className="flex flex-wrap justify-start gap-y-4 lg:px-40 gap-x-8 lg:gap-y-4 mt-4 w-auto max-h-full mb-10"> 
                <RadioButton
                  Text="Recibidos"
                  onClick={() => setFilter('Recibidos')}
                />
                <RadioButton
                  Text="Aceptado"
                  onClick={() => setFilter('Aceptado')}
                />
                <RadioButton
                  Text="Rechazado"
                  onClick={() => setFilter('Rechazado')}
                />
                <RadioButton
                  Text="Devueltos"
                  onClick={() => setFilter('Devuelto')}
                />
              </div>
            </div> 

            <div className="flex justify-center flex-wrap w-full">
              {data.length > 0 ? (
                data.map((proyecto) => (
                  <CardProyect
                    key={proyecto.idproyecto}
                    Text={proyecto.nombre}
                  >
                    <Link to={`/Detalle/${proyecto.idproyecto}`}>
                      <BotonSegundo Text="Ver" />
                    </Link>
                  </CardProyect>
                ))
              ) : (
                <p className="text-center">No hay proyectos para mostrar.</p>
              )}
            </div>
          </div>
        </div>
      </Layoutcontenido>
    </Layoutprincipal>
  );
};

export default Calificar;