
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ObjetivosPrueba from './Pages/ObjetivosPrueba';
import RegistroProyecto from './Pages/RegistroProyecto';
import TiposDeArea from './Pages/Services/TiposDeArea';
import ItemsDeArea from './Pages/Services/ItemsDeArea';
import ObjetivosDeArea from './Pages/Vista_Objetivos/ObjetivosDeArea';
import VistaAreas1 from './Pages/VistaAreas1';
import VistaAlcance from './Pages/VistaAlcance'; 
import VistaUsuario from './Pages/VistaUsuario';
import VistaMisProyectos from './Pages/VistaMisProyectos'
import Prueba from './Pages/Prueba';
import Home from './Pages/Principal/Registro1';
import Inicio from './Pages/Principal/Incio';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/ObjetivosPrueba" element={<ObjetivosPrueba />} />
        <Route path="/RegistroProyecto" element={<RegistroProyecto />} />
        <Route path="/Services/TiposDeArea/:id" element={<TiposDeArea />} />
        <Route path="/Services/ItemsDeArea/:idarea/:idtiposdearea" element={<ItemsDeArea />} />
        <Route path="/Vista_Objetivos/ObjetivosDeArea/:idarea/:idtiposdearea" element={<ObjetivosDeArea />} />
        <Route path="/VistaAreas1" element={<VistaAreas1 />} />
        <Route path="/VistaUsuario" element={<VistaUsuario />} />
        <Route path="/VistaAlcance" element={<VistaAlcance />} />
        <Route path="/VistaMisProyectos" element={<VistaMisProyectos />} />
        <Route path="/Prueba" element={<Prueba />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Incio" element={<Inicio />} />
        <Route path="/" element={<Home />} /> {/* Página inicial */}
        <Route path="/" element={<Navigate to="/Inicio" replace />} /> {/* Redirige a Inicio */}
      
      </Routes>
    </Router>
  );
};

export default App;
