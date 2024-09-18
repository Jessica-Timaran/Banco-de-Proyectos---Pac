import express from 'express';
import { 
   
    obtenerPromedioFinalProyecto

} from '../../controllers/controllersUser/ObtenerPromedio.js';

const router = express.Router();




router.get('/proyectos/:idproyecto/promediofinal', obtenerPromedioFinalProyecto);



export default router;