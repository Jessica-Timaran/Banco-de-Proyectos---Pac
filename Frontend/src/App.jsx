
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import RegistroProyecto from './Pages/Usuario/RegistroProyecto';
import TiposDeArea from './Pages/Usuario/Services/TiposDeArea';
import ItemsDeArea from './Pages/Usuario/Services/ItemsDeArea';
import ObjetivosDeArea from './Pages/Usuario/Vista_Objetivos/ObjetivosDeArea';
import VistaAreas1 from './Pages/Usuario/VistaAreas1';
import VistaAlcance from './Pages/Usuario/VistaAlcance'; 
import VistaUsuario from './Pages/Usuario/VistaUsuario';
import VistaMisProyectos from './Pages/Usuario/VistaMisProyectos'
import Home from './Pages/Principal/Home';
import Inicio from './Pages/Principal/Incio';
import Registro1 from './Pages/Principal/Registro1';


import Prueba from './Pages/Usuario/Prueba'


const App = () => {
  return (
    <Router>
      <Routes>
       
        <Route path="/Usuario/RegistroProyecto" element={<RegistroProyecto />} />
        <Route path="/Usuario/Services/TiposDeArea/:id" element={<TiposDeArea />} />
        <Route path="/Usuario/Services/ItemsDeArea/:idarea/:idtiposdearea" element={<ItemsDeArea />} />
        <Route path="/Usuario/Vista_Objetivos/ObjetivosDeArea/:idarea/:idtiposdearea" element={<ObjetivosDeArea />} />
        <Route path="/Usuario/VistaAreas1" element={<VistaAreas1 />} />
        <Route path="/Usuario/VistaUsuario" element={<VistaUsuario />} />
        <Route path="/Usuario/VistaAlcance" element={<VistaAlcance />} />
        <Route path="/Usuario/VistaMisProyectos" element={<VistaMisProyectos />} />
        <Route path="/Usuario/Prueba" element={<Prueba />} />
        <Route path="/" element={<Home />} />
        <Route path="/Principal/Inicio" element={<Inicio />} />
        <Route path="/Principal/Registro1" element={<Registro1 />} />
        <Route path="/Usuario/Prueba" element={<Prueba />} />
       


    
      
      </Routes>
    </Router>
  );
};

export default App;
