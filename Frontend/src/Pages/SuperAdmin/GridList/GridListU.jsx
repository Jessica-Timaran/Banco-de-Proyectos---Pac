import { useState, useEffect } from 'react';
import Loader from '../../../Components/Loader';

const roleNames = {
  1: 'Administrador',
  2: 'Usuario',
  3: 'SuperAdmin',
  4: 'Aprendiz'
};

  // eslint-disable-next-line react/prop-types
const Badge = ({ variant, children }) => {
  const bgColor = variant === 'active' ? 'bg-green-200' : 'bg-red-200';
  return <span className={`px-2 py-1 text-sm ${bgColor} rounded-lg`}>{children}</span>;
};


const GridList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(90);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://banco-de-proyectos-pac.onrender.com/api/superAdmin/personas');
      const users = await response.json();
      setData(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

   // Calcular los índices de los elementos a mostrar en la página actual
   const indexOfLastItem = currentPage * itemsPerPage; // Último índice de la página actual
   const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Primer índice de la página actual
   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem); // Elementos a mostrar en la página actual
 
   // Cambiar de página
   const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
   // Calcular el número total de páginas
   const totalPages = Math.ceil(data.length / itemsPerPage);


  return (
    <div className="w-full max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#2eb694] font-bold">
          <tr>
            <th className="px-6 py-3 text-left text-gray-900">Nombre</th>
            <th className="px-6 py-3 text-left text-gray-900">Correo</th>
            <th className="px-6 py-3 text-left text-gray-900">Estado</th>
            <th className="px-6 py-3 text-left text-gray-900">Rol</th>
          </tr>
        </thead>
        {loading ? (
          <tbody>
            <tr>
              <td colSpan="5" className="text-center py-4">
                <Loader />
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="bg-white divide-y divide-gray-200 overflow-hidden">
            {currentItems.map((item) => (
              <tr key={item.idpersonas}>
                <td className="px-6 py-4 whitespace-nowrap">{item.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.correo}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={item.estado ? 'active' : 'inactive'}>
                    {item.estado ? 'Activo' : 'Inactivo'}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {roleNames[item.idrol] || 'Desconocido'}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
       {/* Paginación */}
       <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}
              >
                {index + 1}
              </button>
            ))}
             </div>
    </div>
  );
};

export default GridList;
