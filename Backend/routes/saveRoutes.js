import express from 'express';
import { pool } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';
import transporter from '../config/nodemailerConfig.js';
import bcrypt from 'bcrypt';

import {

    actualizarEstadoRespuestas,
    actualizarEstadoRespuestasAlcance,
    getAprobacionesAdmin,
    getAprobacionesAlcance,
    getCorreoByProyectoId

} from '../controllers/saveControler.js';

const router = express.Router(); 

// Ruta para actualizar el estado de las respuestas
router.post('/actualizarEstadoRespuestas', actualizarEstadoRespuestas);

// Ruta para actualizar el estado de respuestasalcance
router.post('/actualizar-estado', actualizarEstadoRespuestasAlcance);

// Ruta para obtener las aprobaciones del administrador
router.get('/aprobaciones/:idproyecto', getAprobacionesAdmin);

router.get('/aprobaciones-alcance/:idproyecto', getAprobacionesAlcance);

router.get('/correo/:idproyecto', getCorreoByProyectoId);


export default router;