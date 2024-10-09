import { pool } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import transporter from '../config/nodemailerConfig.js';

import multer from 'multer';

export function generateToken(email) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    return token;
}


async function checkIfUserExists(correo) {
    try {
        const client = await pool.connect();
        const result = await client.query(
            'SELECT * FROM personas WHERE correo = $1',
            [correo]
        );
        client.release();

        return result.rows.length > 0;
    } catch (error) {
        console.error('Error al verificar si el usuario existe:', error);
        throw new Error('Error en la base de datos al verificar el usuario.');
    }
}

export function verifyResetToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return reject(new Error('Token inválido'));
            }
            resolve(decoded.email); // Asegúrate de que el token contenga el correo
        });
    });
}

async function updatePassword(correo, nuevaContraseña) {
    try {
        const hashedPassword = await bcrypt.hash(nuevaContraseña, 10);

        const client = await pool.connect();
        const result = await client.query(
            'UPDATE personas SET contraseña = $1 WHERE correo = $2 RETURNING *',
            [hashedPassword, correo]
        );
        client.release();

        if (result.rows.length > 0) {
            return result.rows[0];
        } else {
            throw new Error('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        throw new Error('Error en la base de datos al actualizar la contraseña.');
    }
}

async function checkEmailExists(correo) {
    if (!correo) {
        throw new Error('El correo electrónico es requerido.');
    }
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT COUNT(*) FROM personas WHERE correo = $1', [correo]);
        client.release();

        return result.rows[0].count > 0;
    } catch (error) {
        console.error('Error en checkEmailExists:', error);
        throw new Error('Error en la base de datos al verificar el correo electrónico.');
    }
}
// Configuración de multer para manejar la subida de archivos
const upload = multer({ 
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
      if (file.mimetype === 'application/pdf') {
        cb(null, true);
      } else {
        cb(new Error('Solo se permiten archivos PDF'), false);
      }
    }
  }).single('file');
  
  export const sendEmail = (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
  
      const { fromEmail, toEmail, subject, message } = req.body;
  
      let mailOptions = {
        from: fromEmail,
        to: toEmail,
        subject: subject,
        text: message,
      };
  
      if (req.file) {
        mailOptions.attachments = [{
          filename: req.file.originalname,
          content: req.file.buffer
        }];
      }
  
      try {
        let info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        res.status(200).json({ message: "Correo enviado con éxito" });
      } catch (error) {
        console.error("Error al enviar el correo:", error);
        res.status(500).json({ error: "Error al enviar el correo" });
      }
    });
  };




// Ejemplo de cómo podrías usar session en tu controlador
export const someControllerFunction = (req, res) => {
    // Aquí puedes trabajar con req.session si necesitas manejar la sesión
    res.status(200).json({ message: 'Controlador de datos funcionando' });
};

export const getAssignedProjects = async () => {
    try {
        const result = await pool.query(
            `SELECT 
                proyecto.idproyecto,
                proyecto.nombre AS nombre_proyecto,
                json_agg(json_build_object('nombre_persona', personas.nombre)) AS personas_asignadas
            FROM 
                asignaciones_proyectos
            JOIN 
                proyecto ON asignaciones_proyectos.idproyecto = proyecto.idproyecto
            JOIN 
                personas ON asignaciones_proyectos.idpersona = personas.idpersonas
            WHERE 
                personas.idrol = 4 AND 
                asignaciones_proyectos.estado = TRUE  -- Filtra por estado true
            GROUP BY 
                proyecto.idproyecto, proyecto.nombre;`
        );
        return result.rows;
    } catch (error) {
        throw new Error('Error al obtener proyectos asignados: ' + error.message);
    }
};

export const updateProfile = async (id, nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña) => {
    try {
        const result = await pool.query(
            `UPDATE personas 
             SET nombre = $1, tipodocumento = $2, numerodocumento = $3, nombreempresa = $4, telefono = $5, correo = $6, contraseña = $7
             WHERE id = $8 RETURNING *`, // Cambiar idrol por id
            [nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, id] // Usar el id de la persona en lugar de idrol
        );
        return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
        throw new Error('Error al actualizar el perfil');
    }
};




// Función para registrar una nueva persona
async function registerPerson({ nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol }) {
    try {
        console.log('Contraseña original:', contraseña);
        
        // Cifrar la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        
        console.log('Contraseña cifrada:', hashedPassword);

        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO personas (nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, hashedPassword, idrol] 
        );
        client.release();
        console.log('Persona registrada con éxito:', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error al registrar persona:', error);
        throw error;
    }
}

async function loginPerson(correo, contraseña) {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM personas WHERE correo = $1', [correo]);
        client.release();

        if (result.rows.length > 0) {
            const person = result.rows[0];
            const match = await bcrypt.compare(contraseña, person.contraseña);
            if (match) {
                console.log('ID del usuario encontrado:', person.idpersonas);  // Mostrar el ID en el backend
                console.log('nombre encontrado:', person.nombre);  // Mostrar el ID en el backend
                return { id: person.idpersonas, rol: person.idrol, nombre: person.nombre };  // Devuelve el idpersonas y el rol del usuario
            } else {
                return null;
            }
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
}
// Función para registrar un nuevo proyecto
async function registerProject({ nombre, impacto, responsable, disponibilidad, dia, idarea, idficha, idpersona, idrespuestaobjetivos, idrespuestaalcance, iditems, idtiposdearea }) {
    try {
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO proyecto (nombre, impacto, responsable, disponibilidad, dia, idarea, idficha, idpersona, idrespuestaobjetivos, idrespuestaalcance, iditems, idtiposdearea) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
            [nombre, impacto, responsable, disponibilidad, dia, idarea, idficha, idpersona, idrespuestaobjetivos, idrespuestaalcance, iditems, idtiposdearea]
        );
        client.release();
        console.log('Proyecto registrado con éxito:', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error al registrar proyecto:', error);
        throw error;
    }
}



async function guardarRespuestas(respuestas) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN'); // Inicia una transacción
  
      for (const respuesta of respuestas) {
        const { idproyecto, idalcance, respuesta: valorRespuesta } = respuesta;
  
        // Verifica si ya existe una respuesta para este proyecto y alcance
        const selectQuery = `
          SELECT idrespuesta 
          FROM respuestasalcance 
          WHERE idproyecto = $1 AND idalcance = $2
        `;
        const selectResult = await client.query(selectQuery, [idproyecto, idalcance]);
  
        if (selectResult.rows.length > 0) {
          // Si existe, realiza un UPDATE
          const idrespuesta = selectResult.rows[0].idrespuesta;
          const updateQuery = `
            UPDATE respuestasalcance 
            SET respuesta = $1 
            WHERE idrespuesta = $2
          `;
          await client.query(updateQuery, [valorRespuesta, idrespuesta]);
        } else {
          // Si no existe, realiza un INSERT
          const insertQuery = `
            INSERT INTO respuestasalcance (idproyecto, idalcance, respuesta) 
            VALUES ($1, $2, $3) RETURNING idrespuesta
          `;
          const result = await client.query(insertQuery, [idproyecto, idalcance, valorRespuesta]);
  
          // Extrae el idrespuesta generado
          const idrespuesta = result.rows[0].idrespuesta;
  
          // Ahora, actualiza la tabla `proyecto` con este idrespuesta
          const updateQuery = 'UPDATE proyecto SET idrespuestaalcance = $1 WHERE idproyecto = $2';
          await client.query(updateQuery, [idrespuesta, idproyecto]);
        }
      }
  
      await client.query('COMMIT'); // Confirma la transacción
      console.log('Respuestas y actualización del proyecto guardadas con éxito');
    } catch (error) {
      await client.query('ROLLBACK'); // Revertir en caso de error
      console.error('Error al guardar respuestas:', error);
      throw error;
    } finally {
      client.release();
    }
  }
  
async function updateProjectWithArea(areaId, projectId) { // Agrega async aquí
    try {
        const client = await pool.connect();
        const result = await client.query(
            'UPDATE proyecto SET idarea = $1 WHERE idproyecto = $2 RETURNING *',
            [areaId, projectId]
        );
        
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error al actualizar el proyecto con el área:', error);
        throw error;
    }
}

  


async function updateProjectTipo(areaId, projectId) {
    try {
        const result = await pool.query(
            `UPDATE proyecto SET idtiposdearea = $1 WHERE idproyecto = $2`,
            [areaId, projectId]
        );

        if (result.rowCount === 0) {
            throw new Error('Proyecto no encontrado');
        }

        return { message: 'Proyecto actualizado correctamente' };
    } catch (error) {
        console.error('Error updating proyecto:', error);
        throw error;
    }
}

async function updateProyectoItem({ projectId, itemId }) {
    try {
      // Asegúrate de que los valores estén presentes
      if (!projectId || !itemId) {
        throw new Error('Faltan parámetros en la solicitud');
      }
  
      const result = await pool.query(
        `UPDATE proyecto SET iditems = $1 WHERE idproyecto = $2`,
        [itemId, projectId]
      );
  
      if (result.rowCount === 0) {
        throw new Error('Proyecto no encontrado');
      }
  
      return { message: 'Ítem actualizado correctamente' };
    } catch (error) {
      console.error('Error updating proyecto:', error);
      throw error;
    }
  }
  
  async function guardarRespuestasObjetivos(respuestas) {
    const client = await pool.connect();

    try {
        // Iniciar una transacción
        await client.query('BEGIN');

        for (const respuesta of respuestas) {
            const { idproyecto, idobjetivos, respuesta: valorRespuesta } = respuesta;

            // Verifica si ya existe una respuesta para este proyecto y objetivo
            const selectQuery = `
                SELECT idrespuestasobjetivos 
                FROM respuestasobjetivos 
                WHERE idproyecto = $1 AND idobjetivos = $2
            `;
            const selectResult = await client.query(selectQuery, [idproyecto, idobjetivos]);

            if (selectResult.rows.length > 0) {
                // Si existe, realiza un UPDATE
                const idrespuestasobjetivos = selectResult.rows[0].idrespuestasobjetivos;
                const updateQuery = `
                    UPDATE respuestasobjetivos 
                    SET respuesta = $1 
                    WHERE idrespuestasobjetivos = $2
                `;
                await client.query(updateQuery, [valorRespuesta, idrespuestasobjetivos]);
            } else {
                // Si no existe, realiza un INSERT
                const insertQuery = `
                    INSERT INTO respuestasobjetivos (idproyecto, idobjetivos, respuesta) 
                    VALUES ($1, $2, $3) RETURNING idrespuestasobjetivos
                `;
                const insertResult = await client.query(insertQuery, [idproyecto, idobjetivos, valorRespuesta]);

                // Extrae el idrespuestasobjetivos generado
                const idrespuestasobjetivos = insertResult.rows[0].idrespuestasobjetivos;

                // Actualiza la tabla `proyecto` con este idrespuestasobjetivos si es necesario
                const updateProyectoQuery = `
                    UPDATE proyecto 
                    SET idrespuestaobjetivos = $1 
                    WHERE idproyecto = $2
                `;
                await client.query(updateProyectoQuery, [idrespuestasobjetivos, idproyecto]);
            }
        }

        // Finaliza la transacción
        await client.query('COMMIT');
        console.log('Respuestas y actualización del proyecto guardadas con éxito');
    } catch (error) {
        console.error('Error al guardar respuestas:', error);

        // Si ocurre un error, deshaz la transacción
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

// Función para obtener todas las personas
async function getAllPersonas() {
    try {
        console.log('Obteniendo todas las personas...');
        const client = await pool.connect();
        const result = await client.query('SELECT idpersonas, nombre, correo, estado, idrol FROM personas');
        client.release();
        console.log('Personas obtenidas con éxito:', result.rows);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener personas:', error);
        throw error;
    }
}


// Función para obtener todos los usuarios
async function getAllUsuario() {
    try {
        console.log('Obteniendo todos los usuarios...');
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM usuario');
        client.release();
        console.log('Usuarios obtenidos con éxito:', result.rows);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
}

// Función para obtener todas las preguntas junto con sus categorías
async function getAllAlcances() {
    try {
        const client = await pool.connect();
        const query = `
            SELECT a.idalcance, a.descripcion, a.aplica, c.nombre as categoria
            FROM alcance a
            JOIN categoriasalcance c ON a.idcategoriasalcance = c.idcategoriasalcance
        `;
        const result = await client.query(query);
        client.release();
        return result.rows;
    } catch (error) {
        console.error('Error al obtener alcances:', error);
        throw error;
    }
}

async function getAllAreas() {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT idarea, area FROM area');
        client.release();
        return result.rows;
    } catch (error) {
        console.error('Error al obtener áreas:', error);
        throw error;
    }
}

async function getTiposDeAreaPorArea(idArea) {
    try {
      const client = await pool.connect();
      const query = `
        SELECT t.idtiposdearea, t.tiposdearea
        FROM tipodearea t
        WHERE t.idarea = $1
      `;
      const result = await client.query(query, [idArea]);
      client.release();
      return result.rows;
    } catch (error) {
      console.error('Error al obtener tipos de área:', error);
      throw error;
    }
  }

  async function getItemsPorAreaYTipo(idArea, idTiposDeArea) {
    try {
      const client = await pool.connect();
      const query = `
        SELECT * FROM items
        WHERE idarea = $1 AND idtiposdearea = $2
      `;
      const result = await client.query(query, [idArea, idTiposDeArea]);
      client.release();
      return result.rows;
    } catch (error) {
      console.error('Error al obtener ítems:', error);
      throw error;
    }
  }

// Obtener objetivos por área
async function getObjetivosPorArea(idArea) {
    try {
        const query = `
            SELECT o.idobjetivos, o.descripcion, o.aplica, co.nombre AS categoria
            FROM objetivos o
            JOIN categoriasobjetivos co ON o.idcategoriasobjetivos = co.idcategoriasobjetivos
            WHERE o.idarea = $1
        `;
        const result = await pool.query(query, [idArea]);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener objetivos por área:', error);
        throw error;
    }
}
  
// Obtener todos los objetivos
async function getObjetivos() {
    try {
        const query = `
            SELECT o.idobjetivos, o.descripcion, o.aplica, o.idarea, co.nombre AS categoria
            FROM objetivos o
            JOIN categoriasobjetivos co ON o.idcategoriasobjetivos = co.idcategoriasobjetivos
        `;
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener objetivos:', error);
        throw error;
    }
};

// Función para obtener todos los proyectos de la base de datos
async function obtenerTodosLosProyectos() {
    try {
        console.log('Obteniendo todos los proyectos...');
        const cliente = await pool.connect();
        const consulta = 'SELECT idproyecto, nombre, responsable FROM proyecto';
        console.log('Ejecutando consulta:', consulta); 
        const resultado = await cliente.query(consulta);
        cliente.release();
        console.log('Proyectos obtenidos con éxito:', resultado.rows);
        return resultado.rows;
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        throw error;
    }
}


async function getAllFicha() {
  try {
      const client = await pool.connect();
      const result = await client.query('SELECT idficha, nombre, estado, numeroficha FROM ficha');
      client.release();
      return result.rows;
  } catch (error) {
      console.error('Error al obtener fichas:', error);
      throw error;
  }
}

// Combine all your exports in a single statement
export {
    multer,
    checkEmailExists,
    checkIfUserExists,
    updatePassword,
    getAllPersonas,
    obtenerTodosLosProyectos,
    getAllFicha,
    getAllUsuario,
    registerPerson,
    loginPerson,
    registerProject,
    getAllAlcances,
    getAllAreas,
    getTiposDeAreaPorArea,
    getItemsPorAreaYTipo,
    getObjetivos,
    guardarRespuestas,
    getObjetivosPorArea,
    updateProjectWithArea,
    updateProjectTipo,
    updateProyectoItem,
    guardarRespuestasObjetivos,

  };