import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ObjetivosPrueba from './Pages/ObjetivosPrueba';
import RegistroProyecto from './Pages/RegistroProyecto';
import TiposDeArea from './Pages/Services/TiposDeArea';
import ItemsDeArea from './Pages/Services/ItemsDeArea';
import ObjetivosDeArea from './Pages/Vista_Objetivos/ObjetivosDeArea';
import VistaAreas1 from './Pages/VistaAreas1';
import VistaAlcance from './Pages/VistaAlcance'; 

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
        <Route path="/VistaAlcance/:idproyecto" element={<VistaAlcance />} />

      </Routes>
    </Router>
  );
};

export default App;
