import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import CardProyect from "../Components/CardProyect";
import RadioButton from "../Components/RadioButton";
import BotonSegundo from "../Components/BotonSegundo";
import Layoutcontenido from "../Layouts/Layoutcontenido";
import LayoutPrincipal from "../Layouts/Layoutprincipal";

const Calificar = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('Recibidos'); // Estado para controlar el filtro seleccionado

  // Función para obtener proyectos desde la API, filtrados por estado
  const fetchProyecto = async (estado) => {
    try {
      // Limpiar el estado antes de realizar la nueva petición
      setData([]);
      
      let url = `http://localhost:4000/api/proyectos?estado=${estado}`;
      if (estado === 'Asignados') {
        url = 'http://localhost:4000/api/proyectos/asignados';
      }
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
    <LayoutPrincipal title="Proyectos">
      <Layoutcontenido title="contenido">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-7xl">
            <div className="flex justify-start mb-4 ml-9">
              <div className="grid grid-cols-5 gap-x-8 gap-y-4 mt-4"> 
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
                <RadioButton
                  Text="Asignados"
                  onClick={() => setFilter('Asignados')}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 font-josefin-slab">
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
    </LayoutPrincipal>
  );
};

export default Calificar;