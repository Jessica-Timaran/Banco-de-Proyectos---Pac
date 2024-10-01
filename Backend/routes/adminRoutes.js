import express from 'express';
import { pool } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';
import transporter from '../config/nodemailerConfig.js';
import bcrypt from 'bcrypt';

import {  
   getProyectos,
   getProyectoById, 
   getRespuestasByProyecto, 
   getRespuestasAlcanceByProyecto, 
   guardarCalificacion, 
   getFichas, 
   getAprendicesByFicha,
   asignarProyecto,
   actualizarIdCalificacion,
   getProyectosAsignados,
   getSearch,
   enviarCorreo,
   actualizarPuntosObjetivos,
   obtenerPuntosObjetivos,
   actualizarPuntosAlcance,
   getPersonasAsignadas
   
 
  } from '../controllers/adminControler.js';

const router = express.Router();

router.get('/proyectos/asignados', getProyectosAsignados);

// Ruta para obtener proyectos, con filtrado opcional por estado de calificación
router.get('/proyectos', getProyectos);

router.get('/proyectos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`ID recibido en el backend: ${id}`); // Verifica el valor del ID
        const proyecto = await getProyectoById(id);

        if (proyecto) {
            res.json(proyecto);
        } else {
            res.status(404).json({ error: 'Proyecto no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el proyecto:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});


router.get('/respuestas/:idproyecto', async (req, res) => {
  try {
      const { idproyecto } = req.params;
      console.log(`ID de proyecto recibido en el backend: ${idproyecto}`); // Verifica el valor del ID

      // Llamada al controlador para obtener las respuestas del proyecto
      const respuestas = await getRespuestasByProyecto(idproyecto);

      if (respuestas && respuestas.length > 0) {
          res.json({
              proyecto: {
                  id: idproyecto,
                  nombre: respuestas[0].proyecto_nombre,
              },
              respuestas: respuestas.map((respuesta) => ({
                  id: respuesta.idrespuestasobjetivos,
                  descripcion: respuesta.descripcion,
                  respuesta: respuesta.respuesta,
                  categoria: respuesta.categoria,  // Incluye la categoría en la respuesta
              })),
          });
      } else {
          res.status(404).json({ error: 'Respuestas no encontradas para el proyecto' });
      }
  } catch (error) {
      console.error('Error al obtener las respuestas del proyecto:', error);
      res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
});


  router.get('/respuestasalcance/:idproyecto', async (req, res) => {
    try {
      const { idproyecto } = req.params;
  
      const respuestasAlcance = await getRespuestasAlcanceByProyecto(idproyecto);
      
      if (respuestasAlcance && respuestasAlcance.length > 0) {
        res.json({
          respuestasAlcance: respuestasAlcance.map((respuesta) => ({
            idalcance: respuesta.idalcance,
            descripcion: respuesta.descripcion,
            respuesta: respuesta.respuesta,
            categoria: respuesta.categoria // La categoría ahora es correcta
          })),
        });
      } else {
        res.status(404).json({ error: 'Respuestas de alcance no encontradas para el proyecto' });
      }
    } catch (error) {
      console.error('Error al obtener las respuestas de alcance del proyecto:', error);
      res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
  });
  

  // Ruta para guardar la calificación
  router.post('/proyectos/calificar', guardarCalificacion);

// Ruta para obtener todas las fichas activas
router.get('/fichas', getFichas);

// Ruta para obtener aprendices por ficha
router.get('/aprendices/:idficha', getAprendicesByFicha);

// Ruta para asignar proyectos
router.post('/asignar-proyectos', asignarProyecto);

// Ruta para actualizar el idcalificacion en la tabla proyecto
router.put('/actualizar-idcalificacion', actualizarIdCalificacion);

// Ruta para buscar proyectos
router.get('/search', getSearch);

router.post('/enviocorreo', enviarCorreo);

// Ruta para actualizar puntos objetivos
router.put('/proyecto/:idproyecto/actualizarPuntosObjetivos', actualizarPuntosObjetivos);

// Ruta para obtener puntos objetivos
router.get('/proyecto/:idproyecto/puntosObjetivos', obtenerPuntosObjetivos);

// Ruta para actualizar puntos de alcance en la tabla proyecto
router.put('/proyecto/:idproyecto/actualizarPuntosAlcance', actualizarPuntosAlcance);

// Ruta para obtener personas asignadas a un proyecto
router.get('/proyectos/:idproyecto/personas', getPersonasAsignadas);


export default router;