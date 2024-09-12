// import { pool } from '../config/db.js';
// import bcrypt from 'bcrypt';
// import { v4 as uuidv4 } from 'uuid';

// import transporter from '../config/nodemailerConfig.js';

// import multer from 'multer';
// // Configuración de multer para manejar la subida de archivos
// const upload = multer({ 
//     storage: multer.memoryStorage(),
//     fileFilter: (req, file, cb) => {
//       if (file.mimetype === 'application/pdf') {
//         cb(null, true);
//       } else {
//         cb(new Error('Solo se permiten archivos PDF'), false);
//       }
//     }
//   }).single('file');
  
//   export const sendEmail = (req, res) => {
//     upload(req, res, async (err) => {
//       if (err) {
//         return res.status(400).json({ error: err.message });
//       }
  
//       const { fromEmail, toEmail, subject, message } = req.body;
  
//       let mailOptions = {
//         from: fromEmail,
//         to: toEmail,
//         subject: subject,
//         text: message,
//       };
  
//       if (req.file) {
//         mailOptions.attachments = [{
//           filename: req.file.originalname,
//           content: req.file.buffer
//         }];
//       }
  
//       try {
//         let info = await transporter.sendMail(mailOptions);
//         console.log("Message sent: %s", info.messageId);
//         res.status(200).json({ message: "Correo enviado con éxito" });
//       } catch (error) {
//         console.error("Error al enviar el correo:", error);
//         res.status(500).json({ error: "Error al enviar el correo" });
//       }
//     });
//   };

//   export const getAssignedProjects = async () => {
//     try {
//         const result = await pool.query(
//             `SELECT 
//                 proyecto.idproyecto,
//                 proyecto.nombre AS nombre_proyecto,
//                 json_agg(json_build_object('nombre_persona', personas.nombre)) AS personas_asignadas
//             FROM 
//                 asignaciones_proyectos
//             JOIN 
//                 proyecto ON asignaciones_proyectos.idproyecto = proyecto.idproyecto
//             JOIN 
//                 personas ON asignaciones_proyectos.idpersona = personas.idpersonas
//             WHERE 
//                 personas.idrol = 4
//             GROUP BY 
//                 proyecto.idproyecto, proyecto.nombre;`
//         );
//         return result.rows;
//     } catch (error) {
//         throw new Error('Error al obtener proyectos asignados: ' + error.message);
//     }
// };

// export const updateProfile = async (id, nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña) => {
//     try {
//         const result = await pool.query(
//             `UPDATE personas 
//              SET nombre = $1, tipodocumento = $2, numerodocumento = $3, nombreempresa = $4, telefono = $5, correo = $6, contraseña = $7
//              WHERE id = $8 RETURNING *`, // Cambiar idrol por id
//             [nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, id] // Usar el id de la persona en lugar de idrol
//         );
//         return result.rows.length > 0 ? result.rows[0] : null;
//     } catch (error) {
//         throw new Error('Error al actualizar el perfil');
//     }
// };

// async function updatePassword(correo, nuevaContraseña) {
//   try {
//       const hashedPassword = await bcrypt.hash(nuevaContraseña, 10);

//       const client = await pool.connect();
//       const result = await client.query(
//           'UPDATE personas SET contraseña = $1 WHERE correo = $2 RETURNING *',
//           [hashedPassword, correo]
//       );
//       client.release();

//       if (result.rows.length > 0) {
//           return result.rows[0];
//       } else {
//           throw new Error('Usuario no encontrado');
//       }
//   } catch (error) {
//       console.error('Error al actualizar la contraseña:', error);
//       throw error;
//   }
// }

// async function checkIfUserExists(correo) {
//   try {
//       const client = await pool.connect();
//       const result = await client.query(
//           'SELECT * FROM personas WHERE correo = $1',
//           [correo]
//       );
//       client.release();

//       return result.rows.length > 0;
//   } catch (error) {
//       console.error('Error al verificar si el usuario existe:', error);
//       throw error;
//   }
// }


// async function checkEmailExists(correo) {
//     if (!correo) {
//         throw new Error('El correo electrónico es requerido.');
//     }
//     try {
//         const client = await pool.connect();
//         const result = await client.query('SELECT COUNT(*) FROM personas WHERE correo = $1', [correo]);
//         client.release();
        
//         if (result.rows[0].count > 0) {
//             return true;
//         } else {
//             return false;
//         }
//     } catch (error) {
//         console.error('Error en checkEmailExists:', error);
//         throw new Error('Error en la base de datos al verificar el correo electrónico.');
//     }
// }

// // Función para obtener todas las personas
// async function getAllPersonas() {
//     try {
//         console.log('Obteniendo todas las personas...');
//         const client = await pool.connect();
//         const result = await client.query('SELECT * FROM personas');
//         client.release();
//         console.log('Personas obtenidas con éxito:', result.rows);
//         return result.rows;
//     } catch (error) {
//         console.error('Error al obtener personas:', error);
//         throw error;
//     }
// }

// // Función para obtener todos los usuarios
// async function getAllUsuario() {
//     try {
//         console.log('Obteniendo todos los usuarios...');
//         const client = await pool.connect();
//         const result = await client.query('SELECT * FROM usuario');
//         client.release();
//         console.log('Usuarios obtenidos con éxito:', result.rows);
//         return result.rows;
//     } catch (error) {
//         console.error('Error al obtener usuarios:', error);
//         throw error;
//     }
// }

// // Función para registrar una nueva persona
// async function registerPerson({ nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol }) {
//     try {
//         console.log('Contraseña original:', contraseña);
        
//         // Cifrar la contraseña
//         const hashedPassword = await bcrypt.hash(contraseña, 10);
        
//         console.log('Contraseña cifrada:', hashedPassword);

//         const client = await pool.connect();
//         const result = await client.query(
//             'INSERT INTO personas (nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
//             [nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, hashedPassword, idrol] 
//         );
//         client.release();
//         console.log('Persona registrada con éxito:', result.rows[0]);
//         return result.rows[0];
//     } catch (error) {
//         console.error('Error al registrar persona:', error);
//         throw error;
//     }
// }

// // Función para iniciar sesión
// async function loginPerson(correo, contraseña) {
//     try {
//         const client = await pool.connect();
//         const result = await client.query('SELECT idpersonas, idrol, nombre, contraseña FROM personas WHERE correo = $1', [correo]); // Asegúrate de seleccionar 'contraseña'
//         client.release();

//         if (result.rows.length > 0) {
//             const person = result.rows[0];
//             if (!person.contraseña) {
//                 console.error('Error: contraseña no encontrada en la base de datos');
//                 return null;
//             }

//             const match = await bcrypt.compare(contraseña, person.contraseña);
//             if (match) {
//                 return { 
//                     id: person.idpersonas,  // Cambié 'id' a 'idpersonas'
//                     rol: person.idrol, 
//                     nombre: person.nombre 
//                 };
//             } else {
//                 return null;
//             }
//         } else {
//             return null;
//         }
//     } catch (error) {
//         console.error('Error al iniciar sesión:', error);
//         throw error;
//     }
// }


// // Función para registrar un nuevo proyecto
// async function registerProject({ nombre, impacto, responsable, disponibilidad, dia, idarea, idficha, idpersona, idrespuestaobjetivos, idrespuestaalcance, iditems, idtiposdearea }) {
//     try {
//         const client = await pool.connect();
//         const result = await client.query(
//             'INSERT INTO proyecto (nombre, impacto, responsable, disponibilidad, dia, idarea, idficha, idpersona, idrespuestaobjetivos, idrespuestaalcance, iditems, idtiposdearea) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
//             [nombre, impacto, responsable, disponibilidad, dia, idarea, idficha, idpersona, idrespuestaobjetivos, idrespuestaalcance, iditems, idtiposdearea] // Aquí asegúrate de usar idpersona
//         );
//         client.release();
//         console.log('Proyecto registrado con éxito:', result.rows[0]);
//         return result.rows[0];
//     } catch (error) {
//         console.error('Error al registrar proyecto:', error);
//         throw error;
//     }
// }


// // Función para obtener todas las preguntas junto con sus categorías
// async function getAllAlcances() {
//     try {
//         const client = await pool.connect();
//         const query = `
//             SELECT a.idalcance, a.descripcion, a.aplica, c.nombre as categoria 
//             FROM alcance a
//             JOIN categoriasalcance c ON a.idcategoriasalcance = c.idcategoriasalcance
//         `;
//         const result = await client.query(query);
//         client.release();
//         return result.rows;
//     } catch (error) {
//         console.error('Error al obtener alcances:', error);
//         throw error;
//     }
// }

// async function getAllAreas() {
//     try {
//         const client = await pool.connect();
//         const result = await client.query('SELECT idarea, area FROM area');
//         client.release();
//         return result.rows;
//     } catch (error) {
//         console.error('Error al obtener áreas:', error);
//         throw error;
//     }
// }

// async function getTiposDeAreaPorArea(idArea) {
//     try {
//       const client = await pool.connect();
//       const query = `
//         SELECT t.idtiposdearea, t.tiposdearea
//         FROM tipodearea t
//         WHERE t.idarea = $1
//       `;
//       const result = await client.query(query, [idArea]);
//       client.release();
//       return result.rows;
//     } catch (error) {
//       console.error('Error al obtener tipos de área:', error);
//       throw error;
//     }
//   }

//   async function getItemsPorAreaYTipo(idArea, idTiposDeArea) {
//     try {
//       const client = await pool.connect();
//       const query = `
//         SELECT * FROM items
//         WHERE idarea = $1 AND idtiposdearea = $2
//       `;
//       const result = await client.query(query, [idArea, idTiposDeArea]);
//       client.release();
//       return result.rows;
//     } catch (error) {
//       console.error('Error al obtener ítems:', error);
//       throw error;
//     }
//   }

// // Obtener todos los objetivos
// async function getObjetivos() {
//     try {
//         const query = `
//             SELECT o.idobjetivos, o.descripcion, o.aplica, o.idarea, co.nombre AS categoria
//             FROM objetivos o
//             JOIN categoriasobjetivos co ON o.idcategoriasobjetivos = co.idcategoriasobjetivos
//         `;
//         const result = await pool.query(query);
//         return result.rows;
//     } catch (error) {
//         console.error('Error al obtener objetivos:', error);
//         throw error;
//     }
// };

// async function guardarRespuestas(respuestas) {
//     const client = await pool.connect();
//     try {
//       await client.query('BEGIN'); // Inicia una transacción
  
//       for (const respuesta of respuestas) {
//         const { idproyecto, idalcance, respuesta: valorRespuesta } = respuesta;
  
//         // Verifica si ya existe una respuesta para este proyecto y alcance
//         const selectQuery = `
//           SELECT idrespuesta 
//           FROM respuestasalcance 
//           WHERE idproyecto = $1 AND idalcance = $2
//         `;
//         const selectResult = await client.query(selectQuery, [idproyecto, idalcance]);
  
//         if (selectResult.rows.length > 0) {
//           // Si existe, realiza un UPDATE
//           const idrespuesta = selectResult.rows[0].idrespuesta;
//           const updateQuery = `
//             UPDATE respuestasalcance 
//             SET respuesta = $1 
//             WHERE idrespuesta = $2
//           `;
//           await client.query(updateQuery, [valorRespuesta, idrespuesta]);
//         } else {
//           // Si no existe, realiza un INSERT
//           const insertQuery = `
//             INSERT INTO respuestasalcance (idproyecto, idalcance, respuesta) 
//             VALUES ($1, $2, $3) RETURNING idrespuesta
//           `;
//           const result = await client.query(insertQuery, [idproyecto, idalcance, valorRespuesta]);
  
//           // Extrae el idrespuesta generado
//           const idrespuesta = result.rows[0].idrespuesta;
  
//           // Ahora, actualiza la tabla `proyecto` con este idrespuesta
//           const updateQuery = 'UPDATE proyecto SET idrespuestaalcance = $1 WHERE idproyecto = $2';
//           await client.query(updateQuery, [idrespuesta, idproyecto]);
//         }
//       }
  
//       await client.query('COMMIT'); // Confirma la transacción
//       console.log('Respuestas y actualización del proyecto guardadas con éxito');
//     } catch (error) {
//       await client.query('ROLLBACK'); // Revertir en caso de error
//       console.error('Error al guardar respuestas:', error);
//       throw error;
//     } finally {
//       client.release();
//     }
//   }
  
// async function updateProjectWithArea(areaId, projectId) { // Agrega async aquí
//     try {
//         const client = await pool.connect();
//         const result = await client.query(
//             'UPDATE proyecto SET idarea = $1 WHERE idproyecto = $2 RETURNING *',
//             [areaId, projectId]
//         );
        
//         client.release();
//         return result.rows[0];
//     } catch (error) {
//         console.error('Error al actualizar el proyecto con el área:', error);
//         throw error;
//     }
// }

  
// // Obtener objetivos por área
// async function getObjetivosPorArea(idArea) {
//     try {
//         const query = `
//             SELECT o.idobjetivos, o.descripcion, o.aplica, co.nombre AS categoria
//             FROM objetivos o
//             JOIN categoriasobjetivos co ON o.idcategoriasobjetivos = co.idcategoriasobjetivos
//             WHERE o.idarea = $1
//         `;
//         const result = await pool.query(query, [idArea]);
//         return result.rows;
//     } catch (error) {
//         console.error('Error al obtener objetivos por área:', error);
//         throw error;
//     }
// }

// async function updateProjectTipo(areaId, projectId) {
//     try {
//         const result = await pool.query(
//             `UPDATE proyecto SET idtiposdearea = $1 WHERE idproyecto = $2`,
//             [areaId, projectId]
//         );

//         if (result.rowCount === 0) {
//             throw new Error('Proyecto no encontrado');
//         }

//         return { message: 'Proyecto actualizado correctamente' };
//     } catch (error) {
//         console.error('Error updating proyecto:', error);
//         throw error;
//     }
// }

// async function updateProyectoItem({ projectId, itemId }) {
//     try {
//       // Asegúrate de que los valores estén presentes
//       if (!projectId || !itemId) {
//         throw new Error('Faltan parámetros en la solicitud');
//       }
  
//       const result = await pool.query(
//         `UPDATE proyecto SET iditems = $1 WHERE idproyecto = $2`,
//         [itemId, projectId]
//       );
  
//       if (result.rowCount === 0) {
//         throw new Error('Proyecto no encontrado');
//       }
  
//       return { message: 'Ítem actualizado correctamente' };
//     } catch (error) {
//       console.error('Error updating proyecto:', error);
//       throw error;
//     }
//   }
  
//   async function guardarRespuestasObjetivos(respuestas) {
//     const client = await pool.connect();

//     try {
//         // Iniciar una transacción
//         await client.query('BEGIN');

//         for (const respuesta of respuestas) {
//             const { idproyecto, idobjetivos, respuesta: valorRespuesta } = respuesta;

//             // Verifica si ya existe una respuesta para este proyecto y objetivo
//             const selectQuery = `
//                 SELECT idrespuestasobjetivos 
//                 FROM respuestasobjetivos 
//                 WHERE idproyecto = $1 AND idobjetivos = $2
//             `;
//             const selectResult = await client.query(selectQuery, [idproyecto, idobjetivos]);

//             if (selectResult.rows.length > 0) {
//                 // Si existe, realiza un UPDATE
//                 const idrespuestasobjetivos = selectResult.rows[0].idrespuestasobjetivos;
//                 const updateQuery = `
//                     UPDATE respuestasobjetivos 
//                     SET respuesta = $1 
//                     WHERE idrespuestasobjetivos = $2
//                 `;
//                 await client.query(updateQuery, [valorRespuesta, idrespuestasobjetivos]);
//             } else {
//                 // Si no existe, realiza un INSERT
//                 const insertQuery = `
//                     INSERT INTO respuestasobjetivos (idproyecto, idobjetivos, respuesta) 
//                     VALUES ($1, $2, $3) RETURNING idrespuestasobjetivos
//                 `;
//                 const insertResult = await client.query(insertQuery, [idproyecto, idobjetivos, valorRespuesta]);

//                 // Extrae el idrespuestasobjetivos generado
//                 const idrespuestasobjetivos = insertResult.rows[0].idrespuestasobjetivos;

//                 // Actualiza la tabla `proyecto` con este idrespuestasobjetivos si es necesario
//                 const updateProyectoQuery = `
//                     UPDATE proyecto 
//                     SET idrespuestaobjetivos = $1 
//                     WHERE idproyecto = $2
//                 `;
//                 await client.query(updateProyectoQuery, [idrespuestasobjetivos, idproyecto]);
//             }
//         }

//         // Finaliza la transacción
//         await client.query('COMMIT');
//         console.log('Respuestas y actualización del proyecto guardadas con éxito');
//     } catch (error) {
//         console.error('Error al guardar respuestas:', error);

//         // Si ocurre un error, deshaz la transacción
//         await client.query('ROLLBACK');
//         throw error;
//     } finally {
//         client.release();
//     }
// }


// // Función para actualizar un proyecto existente
// async function updateProject({ idproyecto, nombre, impacto, responsable, disponibilidad, dia, idarea, idficha, idpersona, idrespuestaobjetivos, idrespuestaalcance, iditems, idtiposdearea }) {
//   try {
//       const client = await pool.connect();
//       const result = await client.query(
//           'UPDATE proyecto SET nombre = $1, impacto = $2, responsable = $3, disponibilidad = $4, dia = $5, idarea = $6, idficha = $7, idpersona = $8, idrespuestaobjetivos = $9, idrespuestaalcance = $10, iditems = $11, idtiposdearea = $12 WHERE idproyecto = $13 RETURNING *',
//           [nombre, impacto, responsable, disponibilidad, dia, idarea, idficha, idpersona, idrespuestaobjetivos, idrespuestaalcance, iditems, idtiposdearea, idproyecto]
//       );
//       client.release();
//       console.log('Proyecto actualizado con éxito:', result.rows[0]);
//       return result.rows[0];
//   } catch (error) {
//       console.error('Error al actualizar proyecto:', error);
//       throw error;
//   }
// }


// // En tu controlador
// const getProyectosUsuario = async (req, res) => {
//     const { userId } = req.query; // Obtener userId de la query string
  
//     try {
//       const result = await pool.query(
//         `SELECT p.idproyecto, p.nombre, c.estado
//          FROM proyecto p
//          JOIN calificacion c ON p.idcalificacion = c.idcalificacion
//          WHERE p.idpersona = $1`,
//         [userId]
//       );
//       res.json(result.rows);
//     } catch (err) {
//       console.error('Error al obtener los proyectos del usuario:', err.message);
//       res.status(500).json({ error: 'Error al obtener los proyectos' });
//     }
//   };
  


//   //-------------------------------Administrador------------------------------:

// // Controlador para obtener proyectos con filtrado opcional por estado de calificación
// const getProyectos = async (req, res) => {
//   try {
//     const { estado } = req.query;

//     let query;
//     const values = [];

//     if (estado === 'Recibidos') {
//       // Filtrar para obtener proyectos que no están aceptados, devueltos o rechazados
//       query = `
//         SELECT p.*, c.estado 
//         FROM proyecto p 
//         LEFT JOIN calificacion c ON p.idproyecto = c.idproyecto
//         WHERE c.estado IS NULL OR c.estado NOT IN ('Aceptado', 'Rechazado', 'Devuelto')`;
//     } else {
//       // Filtrar por el estado específico
//       query = `
//         SELECT p.*, c.estado 
//         FROM proyecto p 
//         INNER JOIN calificacion c ON p.idproyecto = c.idproyecto
//         WHERE c.estado = $1`;
//       values.push(estado);
//     }

//     console.log('SQL Query:', query);
//     console.log('Values:', values);

//     const result = await pool.query(query, values);
//     console.log('Resultados de la consulta:', result.rows);

//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error al obtener los proyectos:", error);
//     res.status(500).send("Error al obtener los proyectos");
//   }
// };

// // Función para obtener un proyecto por ID
// async function getProyectoById(id) {
//   try {
//     const numericId = parseInt(id); // Convertir a entero
//     if (isNaN(numericId)) {
//       throw new Error('ID inválido');
//     }
//     const client = await pool.connect();
//     const result = await client.query(`
//       SELECT p.*, 
//              a.area AS nombre_area, 
//              c.resultado AS calificacion_resultado, 
//              c.estado AS calificacion_estado
//       FROM proyecto p
//       LEFT JOIN area a ON p.idarea = a.idarea
//       LEFT JOIN calificacion c ON p.idproyecto = c.idproyecto
//       WHERE p.idproyecto = $1
//     `, [numericId]);

//     client.release();
//     if (result.rows.length > 0) {
//       return result.rows[0];
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error('Error al obtener el proyecto por ID:', error);
//     throw error;
//   }
// }


// const getRespuestasByProyecto = async (idproyecto) => {
//   try {
//     const result = await pool.query(
//       `SELECT ro.idrespuestasobjetivos, ro.idproyecto, ro.idobjetivos, ro.respuesta, 
//               o.descripcion, c.nombre AS categoria
//          FROM respuestasobjetivos ro
//          JOIN objetivos o ON ro.idobjetivos = o.idobjetivos
//          JOIN categoriasobjetivos c ON o.idcategoriasobjetivos = c.idcategoriasobjetivos
//          WHERE ro.idproyecto = $1`,
//       [idproyecto]
//     );

//     return result.rows;
//   } catch (error) {
//     console.error('Error al obtener las respuestas de la base de datos:', error);
//     throw error; // Lanzar el error para que sea manejado en las rutas
//   }
// };


// const getRespuestasAlcanceByProyecto = async (idproyecto) => {
//   try {
//     const result = await pool.query(
//       `SELECT ra.idrespuesta, ra.idproyecto, ra.idalcance, ra.respuesta, 
//               a.descripcion, c.nombre AS categoria
//          FROM respuestasalcance ra
//          JOIN alcance a ON ra.idalcance = a.idalcance
//          JOIN categoriasalcance c ON a.idcategoriasalcance = c.idcategoriasalcance
//          WHERE ra.idproyecto = $1`,
//       [idproyecto]
//     );

//     console.log(result.rows); // Imprime los resultados para verificar que las categorías están incluidas
//     return result.rows;
//   } catch (error) {
//     console.error('Error al obtener las respuestas de alcance de la base de datos:', error);
//     throw error;
//   }
// };

// // Controlador para guardar la calificación
// const guardarCalificacion = async (req, res) => {
//   try {
//     const { idproyecto, resultado, estado, comentario } = req.body;

//     // Verifica que todos los datos necesarios estén presentes
//     if (!idproyecto || !resultado || !estado || !comentario) {
//       return res.status(400).json({ message: "Todos los campos son obligatorios" });
//     }

//     // Verifica si ya existe una calificación para este proyecto
//     const existingCalificacion = await pool.query(
//       "SELECT idcalificacion FROM calificacion WHERE idproyecto = $1",
//       [idproyecto]
//     );

//     let idcalificacion;
//     if (existingCalificacion.rows.length > 0) {
//       // Si ya existe, actualiza la calificación existente
//       idcalificacion = existingCalificacion.rows[0].idcalificacion;
//       await pool.query(
//         "UPDATE calificacion SET resultado = $1, estado = $2, comentario = $3 WHERE idcalificacion = $4",
//         [resultado, estado, comentario, idcalificacion]
//       );
//     } else {
//       // Si no existe, inserta una nueva calificación
//       const result = await pool.query(
//         "INSERT INTO calificacion (resultado, estado, idproyecto, comentario) VALUES ($1, $2, $3, $4) RETURNING idcalificacion",
//         [resultado, estado, idproyecto, comentario]
//       );

//       idcalificacion = result.rows[0].idcalificacion;
//     }

//     res.status(201).json({ message: "Calificación guardada exitosamente", idcalificacion: idcalificacion });
//   } catch (error) {
//     console.error("Error al guardar la calificación:", error);
//     res.status(500).json({ message: "Error al guardar la calificación" });
//   }
// };





// // Obtener todas las fichas activas
// const getFichas = async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM ficha WHERE estado = TRUE');
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Error al obtener las fichas:', err.message);
//     res.status(500).json({ error: 'Server Error', message: err.message });
//   }
// };

// // Obtener aprendices por ficha
// const getAprendicesByFicha = async (req, res) => {
//   const { idficha } = req.params;
//   try {
//     const result = await pool.query(
//       'SELECT * FROM personas WHERE idficha = $1 AND idrol = $2',
//       [idficha, 4] // Ahora idrol = 4 es el rol del aprendiz
//     );
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Error al obtener los aprendices:', err.message);
//     res.status(500).json({ error: 'Server Error', message: err.message });
//   }
// };

// // Controlador para asignar proyectos

// const asignarProyecto = async (req, res) => {
//   const { idproyecto, idpersona } = req.body;

//   console.log('Datos recibidos:', { idproyecto, idpersona });

//   try {
//     if (!idpersona) {
//       // Si no se envía ningún aprendiz, actualiza el campo a NULL
//       const result = await pool.query(
//         `UPDATE asignaciones_proyectos 
//          SET idpersona = NULL
//          WHERE idproyecto = $1
//          RETURNING *`,
//         [idproyecto]
//       );

//       console.log('Asignación actualizada a NULL:', result.rows[0]);
//       return res.status(200).json({ success: true, message: 'Asignación actualizada a NULL', data: result.rows[0] });
//     }

//     // Verificar si ya existe una asignación con esos valores
//     const existingRecord = await pool.query(
//       `SELECT * FROM asignaciones_proyectos WHERE idproyecto = $1 AND idpersona = $2`,
//       [idproyecto, idpersona]
//     );

//     if (existingRecord.rows.length > 0) {
//       // Si ya existe, actualizar la asignación
//       const updatedRecord = await pool.query(
//         `UPDATE asignaciones_proyectos 
//          SET idproyecto = $1, idpersona = $2
//          WHERE idproyecto = $1 AND idpersona = $2
//          RETURNING *`,
//         [idproyecto, idpersona]
//       );
      
//       console.log('Asignación actualizada:', updatedRecord.rows[0]);
//       return res.status(200).json({ success: true, message: 'Asignación actualizada', data: updatedRecord.rows[0] });
//     } else {
//       // Si no existe, realizar la inserción
//       const newRecord = await pool.query(
//         `INSERT INTO asignaciones_proyectos (idproyecto, idpersona)
//          VALUES ($1, $2)
//          RETURNING *`,
//         [idproyecto, idpersona]
//       );

//       console.log('Asignación creada:', newRecord.rows[0]);
//       return res.status(201).json({ success: true, message: 'Asignación creada', data: newRecord.rows[0] });
//     }
//   } catch (error) {
//     console.error('Error al asignar proyecto:', error.message);
//     res.status(500).json({ success: false, message: 'Error al asignar proyecto', error: error.message });
//   }
// };


// // Controlador para actualizar el estado de las respuestas objetivos
// const actualizarEstadoRespuestas = async (req, res) => {
//   const detalles = req.body;
//   console.log('Datos recibidos para actualizar:', detalles);
  
//   try {
//     const queries = detalles.map((detalle) => {
//       const { idproyecto, idrespuestasobjetivos, estado } = detalle;
//       const estadoFinal = estado === "Aprobado" ? "Aprobado" : "No aceptado";
//       console.log(`Actualizando estado para idproyecto: ${idproyecto}, idrespuestasobjetivos: ${idrespuestasobjetivos}, estado: ${estadoFinal}`);
//       return pool.query(
//         `UPDATE respuestasobjetivos 
//          SET estado = $1 
//          WHERE idproyecto = $2 AND idrespuestasobjetivos = $3
//          RETURNING *`,
//         [estadoFinal, idproyecto, idrespuestasobjetivos]
//       );
//     });

//     const results = await Promise.all(queries);
//     const updatedRows = results.map(result => result.rows[0]);
//     res.status(200).json({ message: 'Estados actualizados correctamente', updatedData: updatedRows });
//   } catch (error) {
//     console.error('Error al actualizar estados:', error);
//     res.status(500).json({ message: 'Error al actualizar estados', error: error.message });
//   }
// };


// // Controlador para actualizar el estado de las respuestas de alcance
// const actualizarEstadoRespuestasAlcance = async (req, res) => {
//   const detalles = req.body;
//   console.log('Datos recibidos para actualizar:', detalles);

//   try {
//     const queries = detalles.map((detalle) => {
//       const { idproyecto, idrespuesta, estado } = detalle;
      
//       // Validación de datos
//       if (!idproyecto || !idrespuesta) {
//         throw new Error(`Datos incompletos: idproyecto: ${idproyecto}, idrespuesta: ${idrespuesta}`);
//       }

//       const estadoFinal = estado || "No aceptado";
//       console.log(`Actualizando estado para idproyecto: ${idproyecto}, idrespuesta: ${idrespuesta}, estado: ${estadoFinal}`);
      
//       return pool.query(
//         `UPDATE respuestasalcance
//          SET estado = $1
//          WHERE idproyecto = $2 AND idrespuesta = $3
//          RETURNING *`,
//         [estadoFinal, idproyecto, idrespuesta]
//       );
//     });

//     const results = await Promise.all(queries);
//     const updatedRows = results.map(result => result.rows[0]);
//     res.status(200).json({ message: 'Estados actualizados correctamente', updatedData: updatedRows });
//   } catch (error) {
//     console.error('Error al actualizar estados:', error);
//     res.status(400).json({ message: 'Error al actualizar estados', error: error.message });
//   }
// };


// const actualizarIdCalificacion = async (req, res) => {
//   const { idproyecto, idcalificacion } = req.body;

//   try {
//     // Actualiza el proyecto con el idcalificacion
//     const result = await pool.query(
//       `UPDATE proyecto 
//        SET idcalificacion = $1 
//        WHERE idproyecto = $2 
//        RETURNING *`,
//       [idcalificacion, idproyecto]
//     );

//     if (result.rowCount > 0) {
//       res.status(200).json({ message: "idcalificacion actualizado correctamente", proyecto: result.rows[0] });
//     } else {
//       res.status(404).json({ message: "Proyecto no encontrado" });
//     }
//   } catch (error) {
//     console.error("Error al actualizar idcalificacion:", error);
//     res.status(500).json({ message: "Error al actualizar idcalificacion" });
//   }
// };


// const getProyectosAsignados = async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT p.idproyecto, p.nombre, p.responsable
//       FROM proyecto p
//       JOIN asignaciones_proyectos ap ON p.idproyecto = ap.idproyecto
//       JOIN personas pe ON ap.idpersona = pe.idpersonas
//     `);

//     if (result.rows.length > 0) {
//       res.json(result.rows);
//     } else {
//       res.status(404).json({ message: 'No hay proyectos asignados.' });
//     }
//   } catch (error) {
//     console.error('Error al obtener proyectos asignados:', error);
//     res.status(500).json({ message: 'Error al obtener proyectos asignados' });
//   }
// };

// //------------------------------------------------------------------------------------------------  


// //SuperAdmin

// async function agregarPersona({ nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol, estado }) {
//   try {
//       console.log('Datos recibidos en registerPerson:', { nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol, estado });

//       // Cifrar la contraseña
//       const hashedPassword = await bcrypt.hash(contraseña, 10);
//       console.log('Contraseña cifrada:', hashedPassword);

//       const client = await pool.connect();
//       const result = await client.query(
//           'INSERT INTO personas (nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol, estado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
//           [nombre, tipodocumento, numerodocumento, nombreempresa || null, telefono, correo, hashedPassword, idrol, estado || null]
//       );
//       client.release();
//       console.log('Persona registrada con éxito:', result.rows[0]);
//       return result.rows[0];
//   } catch (error) {
//       console.error('Error al registrar persona:', error);
//       throw error;
//   }
// }

// const getUserNameById = async (userId) => {
//   try {
//       const user = await User.findById(userId); // Suponiendo que estás utilizando Mongoose
//       return user ? user.name : null;
//   } catch (error) {
//       console.error('Error al obtener el nombre de usuario:', error);
//       return null;
//   }
// };

// // Función para obtener todos los proyectos de la base de datos
// async function obtenerTodosLosProyectos() {
//   try {
//       console.log('Obteniendo todos los proyectos...');
//       const cliente = await pool.connect();
//       const consulta = 'SELECT idproyecto, nombre, responsable FROM proyecto';
//       console.log('Ejecutando consulta:', consulta); 
//       const resultado = await cliente.query(consulta);
//       cliente.release();
//       console.log('Proyectos obtenidos con éxito:', resultado.rows);
//       return resultado.rows;
//   } catch (error) {
//       console.error('Error al obtener proyectos:', error);
//       throw error;
//   }
// }


// async function getAllFicha() {
//   try {
//       const client = await pool.connect();
//       const result = await client.query('SELECT idficha, nombre, estado, numeroficha FROM ficha');
//       client.release();
//       return result.rows;
//   } catch (error) {
//       console.error('Error al obtener fichas:', error);
//       throw error;
//   }
// }

// async function getUserProjects(idpersonas) {
//   const client = await pool.connect();
//   try {
//     const result = await client.query('SELECT idproyecto, nombre FROM proyecto WHERE idpersona = $1', [idpersonas]);
//     return result.rows;
//   } finally {
//     client.release();
//   }
// }

// // Función para registrar Área
// async function registerArea({ area }) {
//   try {
//       console.log('Datos recibidos en registerArea:', { area });

//       const client = await pool.connect();

//       // Verificar si el área ya existe
//       const checkQuery = 'SELECT COUNT(*) FROM area WHERE area = $1';
//       const checkResult = await client.query(checkQuery, [area]);

//       if (parseInt(checkResult.rows[0].count) > 0) {
//           console.log('El área ya existe.');
//           client.release();
//           return { error: 'El área ya existe.' };
//       } else {
//           // Insertar el área si no existe
//           const insertQuery = 'INSERT INTO area (area) VALUES ($1) RETURNING *';
//           const result = await client.query(insertQuery, [area]);
//           client.release();
//           console.log('Área registrada con éxito:', result.rows[0]);
//           return result.rows[0];
//       }
//   } catch (error) {
//       console.error('Error al registrar área:', error.message, error.stack);
//       throw error;
//   }
// }
// // Función para registrar una nueva ficha
// async function registerFicha({ nombre, numeroFicha }) {
//   try {
//       console.log('Datos recibidos en registerFicha:', { nombre, numeroFicha  });

//       const client = await pool.connect();
//       const result = await client.query(
//           'INSERT INTO ficha (nombre, numeroficha ) VALUES ($1, $2) RETURNING *',
//           [nombre, numeroFicha, estado]
//       );
//       client.release();
//       console.log('Ficha registrada con éxito:', result.rows[0]);
//       return result.rows[0];
//   } catch (error) {
//       console.error('Error al registrar ficha:', error);
//       throw error;
//   }
// }


// // Función para obtener todos los tipos de área por un área específica
// async function getTipoDeArea(idarea) {
//   try {
//       console.log('Obteniendo tipos de área para el área con ID:', idarea);
//       const client = await pool.connect();
//       const result = await client.query('SELECT * FROM tipodearea WHERE idarea = $1', [idarea]);
//       client.release();
//       console.log('Tipos de área obtenidos con éxito:', result.rows);
//       return result.rows;
//   } catch (error) {
//       console.error('Error al obtener tipos de área:', error);
//       throw error;
//   }
// }

// // Función para registrar un nuevo tipo de área
// async function registerTipoDeArea({ tiposdearea, estado, idarea }) {
//   const client = await pool.connect();
//   console.log("aaaaaaaaaaaaaaa  " ,tiposdearea);
//   console.log("aaaaaaaaaaaaaaa  " ,estado);
//   console.log("aaaaaaaaaaaaaaa  " ,idarea);
  
//   try {
//       const condi = 0;
//       const checkQuery = 'SELECT MAX(idtiposdearea) FROM tipodearea WHERE idtiposdearea != $1';
//       const checkResult = await client.query(checkQuery, [condi]);
    
//       console.error('>>>>>>>>>>>> ',checkResult);

//       if (parseInt(checkResult.rows[0].max) > 0) {
//           const cont=checkResult.rows[0].max+1;
//           console.error('>>>>>>>>>>>> ',cont);
//           const insertQuery = 'INSERT INTO tipodearea (idtiposdearea,tiposdearea, estado, idarea) VALUES ($1, $2, $3,$4) RETURNING *';
//           const result = await client.query(insertQuery, [cont,tiposdearea, estado, idarea]);
//           client.release();
//           return result.rows[0];
//       }else{
//       console.error('Error al registrar tipo de área:aaaaa');

//       }
//   } catch (error) {
//       console.error('Error al registrar tipo de área:', error.message);
//       // throw error;
//   }
// }

// // Función para registrar un nuevo item en itemsarea
// async function registerItemArea({ items, estado, idtiposdearea, idarea }) {
//   try {
//       const client = await pool.connect();
//       const result = await client.query(
//           'INSERT INTO itemsarea (items, estado, idtiposdearea, idarea) VALUES ($1, $2, $3, $4) RETURNING *',
//           [items, estado, idtiposdearea, idarea]
//       );
//       client.release();
//       console.log('Item registrado con éxito:', result.rows[0]);
//       return result.rows[0];
//   } catch (error) {
//       console.error('Error al registrar item:', error);
//       throw error;
//   }
// }

// async function unlinkUserFromProject(idpersonas, idproyecto) {
//   const client = await pool.connect();
//   try {
//     await client.query('UPDATE proyecto SET idpersona = NULL WHERE idproyecto = $1 AND idpersona = $2', [idproyecto, idpersonas]);
//   } finally {
//     client.release();
//   }
// }

// export {updatePassword,  checkIfUserExists,
//     getAllPersonas,
//     getAllUsuario,
//     registerPerson,
//     loginPerson,
//     registerProject,
//     getAllAlcances,
//     getAllAreas,
//     getTiposDeAreaPorArea,
//     getItemsPorAreaYTipo,
//     getObjetivos,
//     guardarRespuestas,
//     getObjetivosPorArea,
//     updateProjectWithArea,
//     updateProjectTipo,
//     updateProyectoItem,
//     guardarRespuestasObjetivos,
//     checkEmailExists,
//     agregarPersona,
//     getUserNameById,
//     getProyectosUsuario,
//     getProyectos,
//     getProyectoById,
//     getRespuestasByProyecto,
//     getRespuestasAlcanceByProyecto,
//     guardarCalificacion,
//     actualizarEstadoRespuestas,
//     getFichas,
//     getAprendicesByFicha,
//     getUserProjects,
//     getAllFicha,
//     obtenerTodosLosProyectos,
//     asignarProyecto,
//     actualizarIdCalificacion,
//     registerFicha,
//     registerItemArea,
//     registerTipoDeArea,
//     getTipoDeArea,
//     registerArea, 
//     updateProject,
//     getProyectosAsignados, 
//     actualizarEstadoRespuestasAlcance

// };