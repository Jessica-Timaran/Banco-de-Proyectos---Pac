import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import transporter from '../config/nodemailerConfig.js';

// Controlador para obtener proyectos con filtrado opcional por estado de calificación
const getProyectos = async (req, res) => {
  try {
    const { estado } = req.query;

    let query;
    const values = [];

    if (estado === 'Recibidos') {
      // Filtrar para obtener proyectos que no están aceptados, devueltos o rechazados
      query = `
        SELECT * 
        FROM proyecto 
        WHERE estado IS NULL OR estado NOT IN ('Aceptado', 'Rechazado', 'Devuelto')`;
    } else {
      // Filtrar por el estado específico
      query = `
        SELECT * 
        FROM proyecto 
        WHERE estado = $1`;
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
    const result = await client.query(
      `SELECT p.*, 
              a.area AS nombre_area, 
              p.promediofinal AS calificacion_resultado, 
              p.estado AS calificacion_estado
       FROM proyecto p
       LEFT JOIN area a ON p.idarea = a.idarea
       WHERE p.idproyecto = $1`, 
      [numericId]
    );

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

    // Actualiza el proyecto con el nuevo promedio final, estado y comentario
    const updateProyecto = await pool.query(
      "UPDATE proyecto SET promediofinal = $1, estado = $2, comentario = $3 WHERE idproyecto = $4",
      [resultado, estado, comentario, idproyecto]
    );

    // Si la actualización afecta alguna fila (es decir, si el proyecto existía y fue actualizado)
    if (updateProyecto.rowCount > 0) {
      res.status(200).json({ message: "Proyecto actualizado exitosamente" });
    } else {
      res.status(404).json({ message: "Proyecto no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar el proyecto:", error);
    res.status(500).json({ message: "Error al actualizar el proyecto" });
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

// Controlador para mostrar los proyectos asignados en la vista Asignados
const getProyectosAsignados = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT p.idproyecto, p.nombre, p.responsable
      FROM proyecto p
      JOIN asignaciones_proyectos ap ON p.idproyecto = ap.idproyecto
    `);

    if (result.rows.length > 0) {
      res.json(result.rows);  // Retornar los proyectos asignados
    } else {
      res.status(404).json({ message: 'No hay proyectos asignados.' });
    }
  } catch (error) {
    console.error('Error al obtener proyectos asignados:', error);
    res.status(500).json({ message: 'Error al obtener proyectos asignados' });
  }
};

// Controlador para ver a los aprendices asignados
const getPersonasAsignadas = async (req, res) => {
  const { idproyecto } = req.params;
  try {
    const query = `
      SELECT p.nombre AS nombre_persona 
      FROM personas p
      JOIN asignaciones_proyectos ap ON p.idpersonas = ap.idpersona
      WHERE ap.idproyecto = $1
    `;
    const result = await pool.query(query, [idproyecto]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No hay personas asignadas a este proyecto.' });
    }

    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener las personas asignadas:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
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

// Enviar correos para los comentenatrio
export const enviarCorreo = async (req, res) => {
  const { email, comentario } = req.body;
  const subject = `Notificación sobre el Estado de su Proyecto`;


  const htmlContent = `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
     
          <h2 style="color: #4CAF50;">Estado de su Proyecto: </h2>
          <p style="font-size: 16px; color: #555;">Has recibido un nuevo comentario:</p>
          <blockquote style="border-left: 5px solid #4CAF50; padding-left: 15px; margin: 10px 0; font-style: italic;">
            ${comentario}
          </blockquote>
          <p style="font-size: 14px; color: #777;">Este es un correo automático, por favor no respondas.</p>
        </div>
      </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: 'pac.bancodeproyectos@gmail.com',
      to: email,
      subject: subject,
      html: htmlContent,
    });
    res.status(200).json({ message: 'Correo enviado exitosamente' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ message: 'Error al enviar el correo' });
  }
};

// controlador para actualizar el puntaje de objetivos
const actualizarPuntosObjetivos = async (req, res) => {
  const { idproyecto } = req.params;
  const { puntosobjetivos } = req.body;

  if (!idproyecto || puntosobjetivos === undefined) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    const result = await pool.query(
      'UPDATE proyecto SET puntosobjetivos = $1 WHERE idproyecto = $2 RETURNING *',
      [puntosobjetivos, idproyecto]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar puntos objetivos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Este se encarga de volver a mostrar el puntaje de objetivos

const obtenerPuntosObjetivos = async (req, res) => {
  const { idproyecto } = req.params;

  if (!idproyecto) {
    return res.status(400).json({ error: 'Falta el id del proyecto' });
  }

  try {
    const result = await pool.query(
      'SELECT puntosobjetivos FROM proyecto WHERE idproyecto = $1',
      [idproyecto]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener puntos objetivos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para actualizar puntosalcance en la tabla proyecto
const actualizarPuntosAlcance = async (req, res) => {
  const { idproyecto } = req.params;
  const { puntosalcance } = req.body;

  try {
      const result = await pool.query(
          'UPDATE proyecto SET puntosalcance = $1 WHERE idproyecto = $2',
          [puntosalcance, idproyecto]
      );

      if (result.rowCount === 0) {
          return res.status(404).json({ message: 'Proyecto no encontrado' });
      }

      res.status(200).json({ message: 'Puntos de alcance actualizados correctamente' });
  } catch (err) {
      console.error('Error al actualizar puntos de alcance', err);
      res.status(500).json({ message: 'Error al actualizar puntos de alcance' });
  }
};


export {
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
  actualizarPuntosObjetivos,
  obtenerPuntosObjetivos,
  actualizarPuntosAlcance,
  getPersonasAsignadas

};