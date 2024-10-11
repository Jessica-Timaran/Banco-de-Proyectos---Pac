import { Title, Text } from '@tremor/react';
import { useEffect, useState } from 'react';
import LayoutPrincipal1 from '../Layouts/LayoutPrincipal1';
import Layoutcontenido from '../Layouts/Layoutcontenido'
import CardBase from '../Components/CardBase'
import Loader from '../Components/Loader'
import { ChartDonut } from '../Components/ChartDonut'
import { Chartdata } from '../Components/Chartdata'


const VistaAdmin = () => {
  // Estado para controlar la carga de la página
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula un tiempo de carga de 2 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Limpia el temporizador al desmontar el componente
    return () => clearTimeout(timer);
  }, []);


  return (
    <LayoutPrincipal1 title="Proyectos">
      {loading ? (
        // Muestra el loader mientras se cargan los datos
        <div id="loader" className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <Layoutcontenido title="">
          {/* Encabezado */}
          <div className="bg-verde p-4 sm:p-6 md:p-8 lg:p-10 rounded">
            <Title className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold">Bienvenido Instructor</Title>
            <Text className="text-white font-extrabold text-sm sm:text-base md:text-lg">Banco de Proyectos</Text>
          </div>

          <div className="w-full border-[1px] rounded-t-lg mt-16 sm:p-10 flex sm:justify-start justify-center items-center flex-wrap  ">
            <div className="w-full h-full sm:px-8 ">
            <Chartdata />
            </div>

            <div className="w-full h-full flex justify-center items-center">
            <ChartDonut />
            </div>
           
          </div>



        </Layoutcontenido>
      )}
    </LayoutPrincipal1>
  );
};

export default VistaAdmin;