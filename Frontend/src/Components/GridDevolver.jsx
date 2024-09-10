// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import BotonEditar from './BotonEditar'; // Asegúrate de que la ruta sea correcta

const GridDevolver = ({ users }) => {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-4">
        Usuarios
      </h3>
      <p className="text-sm leading-6 text-gray-600 dark:text-gray-400 mb-6">
        Aquí puedes ver la lista de todos los usuarios registrados en la plataforma.
      </p>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rol
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acción
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{user.nombre}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{user.rol}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.estado === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user.estado}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href={`/EditarUsuario/${user.id}`} className="text-indigo-600 hover:text-indigo-900">
                  <BotonEditar />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Definir las PropTypes
GridDevolver.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
      rol: PropTypes.string.isRequired,
      estado: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default GridDevolver;