
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
import Home from './Pages/Principal/Home';
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
        <Route path="/" element={<Home />} />
        <Route path="/Principal/Inicio" element={<Inicio />} />


    
      
      </Routes>
    </Router>
  );
};

export default App;
