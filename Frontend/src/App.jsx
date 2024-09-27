import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './Context/UserContext'; 

/*Usuario*/
import RegistroProyecto from './Pages/Usuario/RegistroProyecto';
import TiposDeArea from './Pages/Usuario/Services/TiposDeArea';
import ItemsDeArea from './Pages/Usuario/Services/ItemsDeArea';
import ObjetivosDeArea from './Pages/Usuario/Vista_Objetivos/ObjetivosDeArea';
import VistaAreas1 from './Pages/Usuario/VistaAreas1';
import VistaAlcance from './Pages/Usuario/VistaAlcance';
import VistaUsuario from './Pages/Usuario/VistaUsuario';
import VistaMisProyectos from './Pages/Usuario/VistaMisProyectos';
import Home from './Pages/Principal/Home';
import OlvidarContraseña from './Pages/Principal/OlvidarContraseña'
import UpdatePassword  from './Pages/Principal/UpdatePassword';
import Registro1 from './Pages/Principal/Registro1';
import Inicio from './Pages/Principal/Inicio';


/*SuperAdmin */
import Dashboard from './Pages/SuperAdmin/Dashboard';
import AdminUsuarios from './Pages/SuperAdmin/AdminUsuarios';
import AdminProyectos from './Pages/SuperAdmin/AdminProyectos';
import AdminAreas from './Pages/SuperAdmin/AdminAreas';
import AdminTipoArea from './Pages/SuperAdmin/AdminTipodeArea';
import AdminObjetivos from './Pages/SuperAdmin/AdminObjetivos'
import AdminAlcance from './Pages/SuperAdmin/AdminAlcance';
import AdminItems from './Pages/SuperAdmin/AdminItems'
import AdminFicha from './Pages/SuperAdmin/AdminFicha';
import RegistroCompleto from './Pages/SuperAdmin/RegistroCompleto';

/*Administrador */
import Calificar from './Pages/Calificar';
import Detalle from './Pages/Detalle';
import Objetivos from './Pages/Objetivos';
import Alcance from './Pages/Alcance';
import Calificacion from './Pages/Calificacion';
import AsignarProyectos from './Pages/AsignarProyectos';
import VistaAdmin from './Pages/VistaAdmin';


/*Aprendiz*/

import VistaAprendiz from './Pages/Aprendiz/VistaAprendiz'
import Formulario from './Pages/Aprendiz/Formulario'
import EditarPerfil from './Pages/Aprendiz/EditarPerfil'
import VistaProyectos from './Pages/Aprendiz/VistaProyectos'
import Reporte from './Pages/Aprendiz/Reporte'


const App = () => {
  return (
    <UserProvider> {/* Envuelve toda la aplicación con UserProvider */}
      <Router>
        <Routes>
          <Route path="/Usuario/RegistroProyecto" element={<RegistroProyecto />} />
          <Route path="/Usuario/RegistroProyecto/:idproyecto" element={<RegistroProyecto />} />
          <Route path="/Usuario/Services/TiposDeArea/:id" element={<TiposDeArea />} />
          <Route path="/Usuario/Services/ItemsDeArea/:idarea/:idtiposdearea" element={<ItemsDeArea />} />
          <Route path="/Usuario/Vista_Objetivos/ObjetivosDeArea/:idarea/:idtiposdearea" element={<ObjetivosDeArea />} />
          <Route path="/Usuario/VistaAreas1" element={<VistaAreas1 />} />
          <Route path="/Usuario/VistaUsuario" element={<VistaUsuario />} />
          <Route path="/Usuario/VistaAlcance" element={<VistaAlcance />} />
          <Route path="/Usuario/VistaMisProyectos" element={<VistaMisProyectos />} />


          <Route path="/" element={<Home />} />
          <Route path="/Principal/Inicio" element={<Inicio/>} />
          <Route path="/Principal/Registro1" element={<Registro1 />} />
          <Route path="/OlvidarContraseña" element={<OlvidarContraseña />} />
        <Route path="/UpdatePassword" element={<UpdatePassword />} />
      


          <Route path="/SuperAdmin/dashboard" element={<Dashboard />} />
          <Route path="/SuperAdmin/usuarios" element={<AdminUsuarios />} />
          <Route path="/SuperAdmin/proyectos" element={<AdminProyectos/>} />
          <Route path="/SuperAdmin/areas" element={<AdminAreas/>} />
          <Route path="/SuperAdmin/tipodearea" element={<AdminTipoArea/>} />
          <Route path="/SuperAdmin/objetivos" element={<AdminObjetivos/>} />
          <Route path="/SuperAdmin/alcance" element={<AdminAlcance/>} />
          <Route path="/SuperAdmin/items" element={<AdminItems/>} />
          <Route path="/SuperAdmin/ficha" element={<AdminFicha/>} />
          <Route path="/SuperAdmin/registrocompleto" element={<RegistroCompleto />} />


          <Route path="/Aprendiz/VistaAprendiz" element={<VistaAprendiz/>} />
        <Route path="/Aprendiz/Reporte" element={<Reporte/>} />
        <Route path="/Aprendiz/VistaProyectos" element={<VistaProyectos/>} />
        <Route path="/Aprendiz/EditarPefil" element={<EditarPerfil/>} />
        <Route path="/Aprendiz/Formulario" element={<Formulario/>} />


        <Route path="/Calificar" element={<Calificar />} />
          <Route path="/Detalle/:id" element={<Detalle />} />
          <Route path="/respuestas/:idproyecto" element={<Objetivos />} />
          <Route path="/alcance/:idproyecto" element={<Alcance />} />
          <Route path="/calificacion/:idproyecto" element={<Calificacion />} />
          <Route path="/asignar-proyectos" element={<AsignarProyectos />} />
          <Route path="/asignar-proyectos/:idproyecto" element={<AsignarProyectos />} />
          <Route path="/calificar/:idproyecto" element={<Calificacion />} />
          <Route path="/VistaAdmin" element={<VistaAdmin />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
