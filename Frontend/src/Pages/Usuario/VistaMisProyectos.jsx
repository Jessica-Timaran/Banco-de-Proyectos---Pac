import React, { useEffect, useState } from 'react';
import GridPrueba from '../../Components/GridPrueba.jsx';
import Loader from '../../Components/Loader.jsx';
import LayoutPrincipal1 from '../../Layouts/LayoutPrincipal1.jsx';
import BotonPrincipal from '../../Components/BotonPrincipal.jsx';

const Prueba = () => {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProyectos = async () => {
      const userId = JSON.parse(localStorage.getItem('user'));

      if (!userId) {
        console.error('Error: idpersona no encontrado en localStorage');
        return;
      }

      try {
        const response = await fetch(`https://banco-de-proyectos-pac.onrender.com/api/user/proyectos?userId=${userId.id}`);
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
    <LayoutPrincipal1 title="">
      <div className="flex justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl my-10">
          <div className="flex flex-col">
            {/* Encabezado del grid fijo */}
            <div className="grid grid-cols-12 bg-[#2eb694] font-bold py-4 px-4 sm:px-6 rounded-t-lg border-b sticky top-0 z-10">
              <div className="col-span-5 md:col-span-5 text-left flex items-center text-sm sm:text-base text-white">
                PROYECTOS
              </div>
              <div className="col-span-3 md:col-span-3 text-center hidden sm:block text-white">
                RESPONSABLE
              </div>
              <div className="col-span-4 md:col-span-4  text-center text-white">
                ESTADO
              </div>
            </div>
            
            {/* Contenido scrollable */}
            <div className="overflow-y-auto max-h-[80vh]">
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
          </div>
          <div className="mt-6">
            <a href='/Usuario/VistaUsuario' className="flex justify-end">
              <BotonPrincipal Text="Volver" />
            </a>
          </div>
        </div>
      </div>
    </LayoutPrincipal1>
  );
  
};

export default Prueba;