import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import LayoutPrincipal from '../../layouts/LayoutPrincipal';
import Layoutcontenido from '../../Layouts/Layoutcontenido4';
import GridListProyectos from './GridList/GridListProyectos';
import Loader from '../../Components/Loader';



const Proyectos = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);



  const handleGoBack = () => {
    navigate('/SuperAdmin/dashboard'); // Redirigir al dashboard
  };

;

  return (
    <LayoutPrincipal title="Proyectos">
      {loading ? (
        <div id="loader" className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <Layoutcontenido title="Proyectos">
        <div className="flex flex-col w-full p-10 mb-10">
            <div className="flex justify-between items-center mb-4">
              <p className="mt-4 text-lg leading-6 text-black text-left">
              <button
              onClick={handleGoBack}
              className="flex items-center text-black hover:text-Verde"
            >
              <i className="fas fa-arrow-left w-5 h-5 mr-2"></i>
              Volver
            </button>
              </p>
            </div>
              <GridListProyectos  />
          </div>
        </Layoutcontenido>
      )}
    </LayoutPrincipal>
  );
};

export default Proyectos;