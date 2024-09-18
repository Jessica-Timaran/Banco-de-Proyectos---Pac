import express from 'express';
import { 
    actualizarPuntosAlcance,
    guardarPromedioFinal,


} from '../../controllers/controllersUser/promedioFinal.js';

const router = express.Router();



router.put('/proyectos/:idproyecto', actualizarPuntosAlcance);


router.put('/proyectos/:idproyecto/proyectofinal', guardarPromedioFinal);


export default router;