import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

// Controlador para obtener proyectos con filtrado opcional por estado de calificación
const getProyectos = async (req, res) => {
  try {
    const { estado } = req.query;

    let query;
    const values = [];

    if (estado === 'Recibidos') {
      // Filtrar para obtener proyectos que no están aceptados, devueltos o rechazados
      query = `
        SELECT p.*, c.estado 
        FROM proyecto p 
        LEFT JOIN calificacion c ON p.idproyecto = c.idproyecto
        WHERE c.estado IS NULL OR c.estado NOT IN ('Aceptado', 'Rechazado', 'Devuelto')`;
    } else {
      // Filtrar por el estado específico
      query = `
        SELECT p.*, c.estado 
        FROM proyecto p 
        INNER JOIN calificacion c ON p.idproyecto = c.idproyecto
        WHERE c.estado = $1`;
      values.push(estado);
    }

    console.log('SQL Query:', query);
    console.log('Values:', values);

    const result = await pool.query(query, values);
    console.log('Resultados de la consulta:', result.rows);

    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener los proyectos:", error);
    res.status(500).send("Error al obtener los proyectos");
  }
};

// Función para obtener un proyecto por ID
async function getProyectoById(id) {
  try {
    const numericId = parseInt(id); // Convertir a entero
    if (isNaN(numericId)) {
      throw new Error('ID inválido');
    }
    const client = await pool.connect();
    const result = await client.query(`
      SELECT p.*, 
             a.area AS nombre_area, 
             c.resultado AS calificacion_resultado, 
             c.estado AS calificacion_estado
      FROM proyecto p
      LEFT JOIN area a ON p.idarea = a.idarea
      LEFT JOIN calificacion c ON p.idproyecto = c.idproyecto
      WHERE p.idproyecto = $1
    `, [numericId]);

    client.release();
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error al obtener el proyecto por ID:', error);
    throw error;
  }
}


const getRespuestasByProyecto = async (idproyecto) => {
  try {
    const result = await pool.query(
      `SELECT ro.idrespuestasobjetivos, ro.idproyecto, ro.idobjetivos, ro.respuesta, 
              o.descripcion, c.nombre AS categoria
         FROM respuestasobjetivos ro
         JOIN objetivos o ON ro.idobjetivos = o.idobjetivos
         JOIN categoriasobjetivos c ON o.idcategoriasobjetivos = c.idcategoriasobjetivos
         WHERE ro.idproyecto = $1`,
      [idproyecto]
    );

    return result.rows;
  } catch (error) {
    console.error('Error al obtener las respuestas de la base de datos:', error);
    throw error; // Lanzar el error para que sea manejado en las rutas
  }
};


const getRespuestasAlcanceByProyecto = async (idproyecto) => {
  try {
    const result = await pool.query(
      `SELECT ra.idrespuesta, ra.idproyecto, ra.idalcance, ra.respuesta, 
              a.descripcion, c.nombre AS categoria
         FROM respuestasalcance ra
         JOIN alcance a ON ra.idalcance = a.idalcance
         JOIN categoriasalcance c ON a.idcategoriasalcance = c.idcategoriasalcance
         WHERE ra.idproyecto = $1`,
      [idproyecto]
    );

    console.log(result.rows); // Imprime los resultados para verificar que las categorías están incluidas
    return result.rows;
  } catch (error) {
    console.error('Error al obtener las respuestas de alcance de la base de datos:', error);
    throw error;
  }
};

// Controlador para guardar la calificación
const guardarCalificacion = async (req, res) => {
  try {
    const { idproyecto, resultado, estado, comentario } = req.body;

    // Verifica que todos los datos necesarios estén presentes
    if (!idproyecto || !resultado || !estado || !comentario) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Verifica si ya existe una calificación para este proyecto
    const existingCalificacion = await pool.query(
      "SELECT idcalificacion FROM calificacion WHERE idproyecto = $1",
      [idproyecto]
    );

    let idcalificacion;
    if (existingCalificacion.rows.length > 0) {
      // Si ya existe, actualiza la calificación existente
      idcalificacion = existingCalificacion.rows[0].idcalificacion;
      await pool.query(
        "UPDATE calificacion SET resultado = $1, estado = $2, comentario = $3 WHERE idcalificacion = $4",
        [resultado, estado, comentario, idcalificacion]
      );
    } else {
      // Si no existe, inserta una nueva calificación
      const result = await pool.query(
        "INSERT INTO calificacion (resultado, estado, idproyecto, comentario) VALUES ($1, $2, $3, $4) RETURNING idcalificacion",
        [resultado, estado, idproyecto, comentario]
      );

      idcalificacion = result.rows[0].idcalificacion;
    }

    res.status(201).json({ message: "Calificación guardada exitosamente", idcalificacion: idcalificacion });
  } catch (error) {
    console.error("Error al guardar la calificación:", error);
    res.status(500).json({ message: "Error al guardar la calificación" });
  }
};


// Obtener todas las fichas activas
const getFichas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ficha WHERE estado = TRUE');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener las fichas:', err.message);
    res.status(500).json({ error: 'Server Error', message: err.message });
  }
};

// Obtener aprendices por ficha
const getAprendicesByFicha = async (req, res) => {
  const { idficha } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM personas WHERE idficha = $1 AND idrol = $2',
      [idficha, 4] // Ahora idrol = 4 es el rol del aprendiz
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener los aprendices:', err.message);
    res.status(500).json({ error: 'Server Error', message: err.message });
  }
};

// Controlador para asignar proyectos

const asignarProyecto = async (req, res) => {
  const { idproyecto, idpersona } = req.body;

  console.log('Datos recibidos:', { idproyecto, idpersona });

  try {
    if (!idpersona) {
      // Si no se envía ningún aprendiz, actualiza el campo a NULL
      const result = await pool.query(
        `UPDATE asignaciones_proyectos 
         SET idpersona = NULL
         WHERE idproyecto = $1
         RETURNING *`,
        [idproyecto]
      );

      console.log('Asignación actualizada a NULL:', result.rows[0]);
      return res.status(200).json({ success: true, message: 'Asignación actualizada a NULL', data: result.rows[0] });
    }

    // Verificar si ya existe una asignación con esos valores
    const existingRecord = await pool.query(
      `SELECT * FROM asignaciones_proyectos WHERE idproyecto = $1 AND idpersona = $2`,
      [idproyecto, idpersona]
    );

    if (existingRecord.rows.length > 0) {
      // Si ya existe, actualizar la asignación
      const updatedRecord = await pool.query(
        `UPDATE asignaciones_proyectos 
         SET idproyecto = $1, idpersona = $2
         WHERE idproyecto = $1 AND idpersona = $2
         RETURNING *`,
        [idproyecto, idpersona]
      );
      
      console.log('Asignación actualizada:', updatedRecord.rows[0]);
      return res.status(200).json({ success: true, message: 'Asignación actualizada', data: updatedRecord.rows[0] });
    } else {
      // Si no existe, realizar la inserción
      const newRecord = await pool.query(
        `INSERT INTO asignaciones_proyectos (idproyecto, idpersona)
         VALUES ($1, $2)
         RETURNING *`,
        [idproyecto, idpersona]
      );

      console.log('Asignación creada:', newRecord.rows[0]);
      return res.status(201).json({ success: true, message: 'Asignación creada', data: newRecord.rows[0] });
    }
  } catch (error) {
    console.error('Error al asignar proyecto:', error.message);
    res.status(500).json({ success: false, message: 'Error al asignar proyecto', error: error.message });
  }
};


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


// Controlador para actualizar el estado de las respuestas de alcance
const actualizarEstadoRespuestasAlcance = async (req, res) => {
  const detalles = req.body;
  console.log('Datos recibidos para actualizar:', detalles);

  try {
    const queries = detalles.map((detalle) => {
      const { idproyecto, idrespuesta, estado } = detalle;
      
      // Validación de datos
      if (!idproyecto || !idrespuesta) {
        throw new Error(`Datos incompletos: idproyecto: ${idproyecto}, idrespuesta: ${idrespuesta}`);
      }

      const estadoFinal = estado || "No aceptado";
      console.log(`Actualizando estado para idproyecto: ${idproyecto}, idrespuesta: ${idrespuesta}, estado: ${estadoFinal}`);
      
      return pool.query(
        `UPDATE respuestasalcance
         SET estado = $1
         WHERE idproyecto = $2 AND idrespuesta = $3
         RETURNING *`,
        [estadoFinal, idproyecto, idrespuesta]
      );
    });

    const results = await Promise.all(queries);
    const updatedRows = results.map(result => result.rows[0]);
    res.status(200).json({ message: 'Estados actualizados correctamente', updatedData: updatedRows });
  } catch (error) {
    console.error('Error al actualizar estados:', error);
    res.status(400).json({ message: 'Error al actualizar estados', error: error.message });
  }
};


const actualizarIdCalificacion = async (req, res) => {
  const { idproyecto, idcalificacion } = req.body;

  try {
    // Actualiza el proyecto con el idcalificacion
    const result = await pool.query(
      `UPDATE proyecto 
       SET idcalificacion = $1 
       WHERE idproyecto = $2 
       RETURNING *`,
      [idcalificacion, idproyecto]
    );

    if (result.rowCount > 0) {
      res.status(200).json({ message: "idcalificacion actualizado correctamente", proyecto: result.rows[0] });
    } else {
      res.status(404).json({ message: "Proyecto no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar idcalificacion:", error);
    res.status(500).json({ message: "Error al actualizar idcalificacion" });
  }
};


const getProyectosAsignados = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.idproyecto, p.nombre, p.responsable
      FROM proyecto p
      JOIN asignaciones_proyectos ap ON p.idproyecto = ap.idproyecto
      JOIN personas pe ON ap.idpersona = pe.idpersonas
    `);

    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).json({ message: 'No hay proyectos asignados.' });
    }
  } catch (error) {
    console.error('Error al obtener proyectos asignados:', error);
    res.status(500).json({ message: 'Error al obtener proyectos asignados' });
  }
};

const getSearch = async (req, res) => {
  try {
    const { nombre } = req.query;

    // Verificar si se ha ingresado un nombre para buscar
    if (!nombre) {
      return res.status(400).json({ message: 'Por favor, ingrese un nombre de proyecto para buscar.' });
    }

    // Construir la consulta basada en el nombre del proyecto
    let query = `
      SELECT p.idproyecto, p.nombre, p.impacto, p.responsable, p.disponibilidad, p.dia,
             p.idrespuestaobjetivos, p.idarea, p.idficha, p.idpersona, p.idrespuestaalcance,
             p.iditems, p.idtiposdearea, p.idcalificacion
      FROM proyecto p
      WHERE p.nombre ILIKE '%${nombre}%'
    `;

    const result = await pool.query(query);

    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).json({ message: 'No se encontraron proyectos con ese nombre.' });
    }
  } catch (error) {
    console.error('Error al buscar proyectos:', error);
    res.status(500).json({ message: 'Error al buscar proyectos' });
  }
};




export {
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

};