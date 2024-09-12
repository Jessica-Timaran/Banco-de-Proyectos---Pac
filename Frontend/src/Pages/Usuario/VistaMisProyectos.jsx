import React, { useEffect, useState } from 'react';
import LayoutPrincipal from '../../Layouts/Layoutprincipal.jsx';
import GridPrueba from '../../Components/GridPrueba.jsx';
import Loader from '../../Components/Loader.jsx';
import BotonPrincipal from '../../Components/BotonPrincipal.jsx';

const Prueba = () => {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProyectos = async () => {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        console.error('Error: idpersona no encontrado en localStorage');
        return;
      }

      try {
        const response = await fetch(`http://localhost:4000/api/user/proyectos?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setProyectos(data);
        } else {
          console.error('Error al obtener los proyectos');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProyectos();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <LayoutPrincipal title="">
      <div className="flex justify-center min-h-screen">
        <div className="p-10 w-full max-w-7xl my-10">
          <div className="flex flex-col">
            <div className="grid grid-cols-12 bg-[#A3E784] font-bold py-4 px-10 rounded-t-lg border-b">
              <div className="col-span-12 md:col-span-10 text-center md:text-left">PROYECTOS</div>
              <div className="col-span-12 md:col-span-2 text-center md:text-center">ESTADO</div>
            </div>

            {proyectos.map((proyecto) => (
              <GridPrueba
                key={proyecto.idproyecto}
                Text1={proyecto.nombre}
                estado={proyecto.estado}
                idproyecto={proyecto.idproyecto} // Pasar el idproyecto al componente GridPrueba
              />
            ))}
          </div>
          <div>
            <a href='/Usuario/VistaUsuario' className="flex flex-col items-center sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <BotonPrincipal Text="Volver" />
            </a>
          </div>
        </div>
      </div>
    </LayoutPrincipal>
  );
};

export default Prueba;