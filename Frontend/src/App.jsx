import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VistaAlcance from './Pages/VistaAlcance';
import ObjetivosPrueba from './Pages/ObjetivosPrueba';
import RegistroProyecto from './Pages/RegistroProyecto';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VistaAlcance />} />
        <Route path="/ObjetivosPrueba" element={<ObjetivosPrueba />} />
        <Route path="/RegistroProyecto" element={<RegistroProyecto />} />
      </Routes>
    </Router>
  );
};

export default App;
