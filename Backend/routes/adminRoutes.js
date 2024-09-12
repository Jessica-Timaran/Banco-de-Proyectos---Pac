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
   actualizarEstadoRespuestas, 
   getFichas, 
   getAprendicesByFicha,
   asignarProyecto,
   actualizarEstadoRespuestasAlcance,
   actualizarIdCalificacion,
   getProyectosAsignados,
   getSearch
 
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
router.post('/calificaciones', guardarCalificacion);

// Ruta para actualizar el estado de las respuestas
router.post('/actualizarEstadoRespuestas', actualizarEstadoRespuestas);

// Ruta para obtener todas las fichas activas
router.get('/fichas', getFichas);

// Ruta para obtener aprendices por ficha
router.get('/aprendices/:idficha', getAprendicesByFicha);

// Ruta para asignar proyectos
router.post('/asignar-proyectos', asignarProyecto);

// Ruta para actualizar el estado de las respuestas de alcance
router.post('/actualizarEstadoRespuestasAlcance', actualizarEstadoRespuestasAlcance);

// Ruta para actualizar el idcalificacion en la tabla proyecto
router.put('/actualizar-idcalificacion', actualizarIdCalificacion);

// // Ruta para obtener proyectos asignados a aprendices
// router.get('/assigned-projects', async (req, res) => {
//   try {
//       const projects = await getAssignedProjects();
//       res.status(200).json(projects);
//   } catch (error) {
//       console.error('Error al obtener proyectos asignados:', error);
//       res.status(500).json({ error: 'Error al obtener proyectos asignados' });
//   }
// });

// Ruta para buscar proyectos
router.get('/search', getSearch);


export default router;