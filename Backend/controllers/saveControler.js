import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import transporter from '../config/nodemailerConfig.js';


// Controlador para actualizar el estado de las respuestas objetivos
const actualizarEstadoRespuestas = async (req, res) => {
    const detalles = req.body;
    console.log('Datos recibidos para actualizar:', detalles);
    
    try {
      const queries = detalles.map((detalle) => {
        const { idproyecto, idrespuestasobjetivos, estado } = detalle;
        const estadoFinal = estado === "Aprobado" ? "Aprobado" : "No aceptado";
        console.log(`Actualizando estado para idproyecto: ${idproyecto}, idrespuestasobjetivos: ${idrespuestasobjetivos}, estado: ${estadoFinal}`);
        return pool.query(
          `UPDATE respuestasobjetivos 
           SET estado = $1 
           WHERE idproyecto = $2 AND idrespuestasobjetivos = $3
           RETURNING *`,
          [estadoFinal, idproyecto, idrespuestasobjetivos]
        );
      });
  
      const results = await Promise.all(queries);
      const updatedRows = results.map(result => result.rows[0]);
      res.status(200).json({ message: 'Estados actualizados correctamente', updatedData: updatedRows });
    } catch (error) {
      console.error('Error al actualizar estados:', error);
      res.status(500).json({ message: 'Error al actualizar estados', error: error.message });
    }
  };

// Actualizar el estado de respuestasalcance
const actualizarEstadoRespuestasAlcance = async (req, res) => {
  const { detallesAlcance } = req.body;

  try {
      // Iterar sobre cada respuesta y actualizar su estado en la base de datos
      const queries = detallesAlcance.map((detalle) => {
        const { idproyecto, idrespuesta, estado } = detalle;
        return pool.query(
          'UPDATE respuestasalcance SET estado = $1 WHERE idproyecto = $2 AND idalcance = $3',
          [estado, idproyecto, idrespuesta]
        );
      });

      await Promise.all(queries);

      return res.status(200).json({ message: 'Estado actualizado correctamente' });
  } catch (error) {
      console.error('Error actualizando el estado:', error);
      return res.status(500).json({ error: 'Error al actualizar el estado' });
  }
};

  const getAprobacionesAdmin = async (req, res) => {
    const { idproyecto } = req.params;
  
    try {
      const result = await pool.query(
        `SELECT idrespuestasobjetivos, estado
         FROM respuestasobjetivos
         WHERE idproyecto = $1 AND estado IN ('Aprobado', 'No aceptado')`,
        [idproyecto]
      );
  
      if (result.rows.length > 0) {
        res.status(200).json({ aprobaciones: result.rows });
      } else {
        res.status(404).json({ message: 'No se encontraron aprobaciones para este proyecto' });
      }
    } catch (error) {
      console.error('Error al obtener las aprobaciones del administrador:', error);
      res.status(500).json({ message: 'Error al obtener las aprobaciones', error: error.message });
    }
  };

  const getAprobacionesAlcance = async (req, res) => {
    const { idproyecto } = req.params;
  
    try {
      const result = await pool.query(
        `SELECT idrespuesta, idalcance, estado
         FROM respuestasalcance
         WHERE idproyecto = $1 AND estado IN ('Aprobado', 'No aceptado')`,
        [idproyecto]
      );
  
      if (result.rows.length > 0) {
        res.status(200).json({ aprobaciones: result.rows });
      } else {
        res.status(404).json({ message: 'No se encontraron aprobaciones para este proyecto' });
      }
    } catch (error) {
      console.error('Error al obtener las aprobaciones del alcance:', error);
      res.status(500).json({ message: 'Error al obtener las aprobaciones', error: error.message });
    }
  };

  const getCorreoByProyectoId = async (req, res) => {
    try {
        const { idproyecto } = req.params;
        
        // Consulta para obtener el idpersona del proyecto
        const proyectoQuery = 'SELECT idpersona FROM proyecto WHERE idproyecto = $1';
        const proyectoResult = await pool.query(proyectoQuery, [idproyecto]);
  
        if (proyectoResult.rows.length === 0) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
  
        const idpersona = proyectoResult.rows[0].idpersona;
  
        // Consulta para obtener el correo de la persona
        const personaQuery = 'SELECT correo FROM personas WHERE idpersonas = $1';
        const personaResult = await pool.query(personaQuery, [idpersona]);
  
        if (personaResult.rows.length === 0) {
            return res.status(404).json({ message: 'Persona no encontrada' });
        }
  
        res.json(personaResult.rows[0]); // Devuelve el correo
    } catch (error) {
        console.error('Error al obtener el correo:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
  
export {
    actualizarEstadoRespuestas,
    actualizarEstadoRespuestasAlcance,
    getAprobacionesAdmin,
    getAprobacionesAlcance,
    getCorreoByProyectoId
};