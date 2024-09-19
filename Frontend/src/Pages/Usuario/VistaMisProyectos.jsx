import React, { useEffect, useState } from 'react';
import GridPrueba from '../../Components/GridPrueba.jsx';
import Loader from '../../Components/Loader.jsx';
import BotonPrincipal from '../../Components/BotonPrincipal.jsx';
import LayoutPrincipal from '../../layouts/LayoutPrincipal.jsx';

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
      <div className="flex justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl my-10">
          <div className="flex flex-col">
            <div className="grid grid-cols-12 bg-[#A3E784] font-bold py-4 px-4 sm:px-6 rounded-t-lg border-b">
              <div className="col-span-6 md:col-span-6 text-left flex items-center text-sm sm:text-base">PROYECTOS</div>
              <div className="col-span-3 md:col-span-3 text-start hidden sm:block">RESPONSABLE</div>
              <div className="col-span-3 md:col-span-3 text-end">ESTADO</div>
            </div>
            
            {proyectos.map((proyecto) => (
              <GridPrueba
                key={proyecto.idproyecto}
                Text1={proyecto.nombre}
                estado={proyecto.estado}
                idproyecto={proyecto.idproyecto}
                responsable={proyecto.responsable}
              />
            ))}
          </div>
          <div className="mt-6">
            <a href='/Usuario/VistaUsuario' className="flex justify-end">
              <BotonPrincipal Text="Volver" />
            </a>
          </div>
        </div>
      </div>
    </LayoutPrincipal>
  );
};

export default Prueba;