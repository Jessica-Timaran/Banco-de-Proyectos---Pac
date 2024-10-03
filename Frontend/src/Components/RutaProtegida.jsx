
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RutaProtegida = ({ allowedRoles }) => {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const isAuthorized = user && allowedRoles.includes(user.rol.toString());

    if (!user) {
        return <Navigate to="/Principal/Inicio" replace />;
    }

    if (!isAuthorized) {
        return <Navigate to="/403" replace />;
    }

    return <Outlet />;
};

export default RutaProtegida;