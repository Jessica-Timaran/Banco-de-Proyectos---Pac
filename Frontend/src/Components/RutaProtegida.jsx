import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RutaProtegida = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/Principal/Inicio" />; // Redirige al inicio de sesión si no está autenticado
    }

    return children;
};

export default RutaProtegida;
