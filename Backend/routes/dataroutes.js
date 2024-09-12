// import express from 'express';
// import { pool } from '../config/db.js';
// import { v4 as uuidv4 } from 'uuid';
// import transporter from '../config/nodemailerConfig.js';
// import bcrypt from 'bcrypt';
// import { sendEmail, updateProfile, checkIfUserExists, getAssignedProjects,  updatePassword,
//     checkEmailExists,
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
//     agregarPersona,
//     getProyectosUsuario,
//     getProyectos,
//     getProyectoById, 
//     getRespuestasByProyecto, 
//     getRespuestasAlcanceByProyecto, 
//     guardarCalificacion, 
//     actualizarEstadoRespuestas, 
//     getFichas, 
//     getAprendicesByFicha,
//     asignarProyecto,
//     getTipoDeArea,
//     actualizarIdCalificacion,
//     updateProject,
//     getProyectosAsignados,
//     actualizarEstadoRespuestasAlcance
    


// } from '../controllers/datacontroler.js';

// const router = express.Router();


// router.post('/send-email', sendEmail);

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



// router.post('/update-profile', async (req, res) => {
//     const { id, nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña } = req.body;
  
//     const idPersona = parseInt(id, 10);  // Convertir id a número
//     console.log('ID de persona recibido:', idPersona); // Verifica el ID recibido
  
//     if (isNaN(idPersona)) {
//       return res.status(400).json({ error: 'ID de persona inválido.' });
//     }
  
//     try {
//       let updateQuery = 'UPDATE personas SET nombre = $1, tipodocumento = $2, numerodocumento = $3, nombreempresa = $4, telefono = $5, correo = $6';
//       let values = [nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo];
  
//       if (contraseña) {
//         const hashedPassword = await bcrypt.hash(contraseña, 10);
//         updateQuery += ', contraseña = $7';
//         values.push(hashedPassword);
//       }
  
//       updateQuery += ' WHERE idpersonas = $8 RETURNING *';
//       values.push(id);
  
//       const result = await pool.query(updateQuery, values);
  
//       if (result.rows.length > 0) {
//         res.status(200).json({ message: 'Perfil actualizado con éxito', profile: result.rows[0] });
//       } else {
//         res.status(404).json({ error: 'Usuario no encontrado' });
//       }
//     } catch (error) {
//       console.error('Error al actualizar el perfil:', error);
//       res.status(500).json({ error: 'Error al actualizar el perfil', details: error.message });
//     }
//   });
  
  
//   // Ruta para actualizar la contraseña
//   router.post('/update-password', async (req, res) => {
//     const { email, newPassword } = req.body;
  
//     try {
//       const user = await updatePassword(email, newPassword);
//       res.status(200).json({ message: 'Contraseña actualizada con éxito', user });
//     } catch (error) {
//       console.error('Error al actualizar la contraseña:', error);
//       res.status(500).json({ error: 'Error al actualizar la contraseña', details: error.message });
//     }
//   });
  
//   // Ruta para solicitar el enlace de recuperación de contraseña
//   router.post('/reset-password', async (req, res) => {
//     const { email } = req.body;
  
//     try {
//       // Verificar si el usuario existe
//       const userExists = await checkIfUserExists(email);
  
//       if (!userExists) {
//         return res.status(404).json({ error: 'Por favor regístrate para hacer el cambio de contraseña.' });
//       }
  
//       const resetToken = uuidv4(); // Genera un token único
//       const resetLink = `http://localhost:5173/UpdatePassword?token=${resetToken}&email=${encodeURIComponent(email)}`;
  
//       const mailOptions = {
//         from: 'pac.bancodeproyectos@gmail.com',
//         to: email,
//         subject: 'Recuperación de Contraseña',
//         html: `<p>Haga clic en el siguiente enlace para restablecer su contraseña: <a href="${resetLink}">Restablecer Contraseña</a></p>`
//       };
  
//       await transporter.sendMail(mailOptions);
//       res.status(200).json({ message: 'Enlace de restablecimiento enviado' });
//     } catch (error) {
//       console.error('Error al enviar el enlace de restablecimiento:', error);
//       res.status(500).json({ error: `Error al enviar el enlace de restablecimiento: ${error.message}` });
//     }
//   });


// // Ruta para establecer una cookie
// router.get('/set-cookie', (req, res) => {
//     res.cookie('testCookie', 'testValue', { maxAge: 900000, httpOnly: true });
//     res.send('Cookie has been set');
//   });



// // Ruta para verificar la cookie
// router.get('/get-cookie', (req, res) => {
//   const cookie = req.cookies['testCookie'];
//   res.send(`Cookie value is: ${cookie}`);
// });

  
// router.post('/check-email', async (req, res) => {
//     const { correo } = req.body;

//     if (!correo) {
//         return res.status(400).json({ error: 'Correo electrónico es requerido.' });
//     }

//     try {
//         const exists = await checkEmailExists(correo);
//         res.json({ exists });
//     } catch (error) {
//         console.error('Error en el endpoint check-email:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // Ruta para obtener todas las personas
// router.get('/personas', async (req, res) => {
//     try {
//         const personas = await getAllPersonas();
//         res.json(personas);
//     } catch (error) {
//         console.error('Error al obtener personas:', error);
//         res.status(500).json({ error: 'Internal server error', details: error.message });
//     }
// });

// // Ruta para obtener todos los usuarios
// router.get('/usuarios', async (req, res) => {
//     try {
//         const usuarios = await getAllUsuario();
//         res.json(usuarios);
//     } catch (error) {
//         console.error('Error al obtener usuarios:', error);
//         res.status(500).json({ error: 'Internal server error', details: error.message });
//     }
// });


// /*----------------------------------------------Usuario-------------------------------------------------------------------*/



// // Ruta para registrar una nueva persona
// router.post('/register', async (req, res) => {
//     try {
//         const { nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol } = req.body;

//         // Verificar si el correo ya existe
//         const emailExists = await checkEmailExists(correo);
//         if (emailExists) {
//             return res.status(409).json({ error: 'El correo electrónico ya está registrado.' });
//         }

//         // Registrar la nueva persona si el correo no existe
//         const newPerson = await registerPerson({ nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol });
//         res.status(201).json(newPerson);
//     } catch (error) {
//         console.error('Error al registrar persona:', error);
//         res.status(500).json({ error: 'Internal server error', details: error.message });
//     }
// });

// // Ruta para iniciar sesión
// router.post('/login', async (req, res) => {
//     try {
//         const { correo, contraseña } = req.body;
//         const user = await loginPerson(correo, contraseña);

//         if (user) {
//             req.session.userId = user.id;
//             req.session.rol = user.rol;

//             // Verifica que se esté enviando el id, nombre y rol del usuario
//             res.status(200).json({ 
//                 id: user.id, // Aquí asegúrate de que `id` esté presente
//                 rol: user.rol,
//                 nombre: user.nombre // Asegúrate de que `nombre` esté presente
//             });
//         } else {
//             res.status(401).json({ error: 'Correo o contraseña incorrectossss' });
//         }
//     } catch (error) {
//         console.error('Error al iniciar sesión:', error);
//         res.status(500).json({ error: 'Internal server error', details: error.message });
//     }
// });




// router.get('/ruta-protegida', (req, res) => {
//     if (req.session.userId) {
//         // El usuario está autenticado
//         res.send('Acceso concedido');
//     } else {
//         res.status(401).send('No autenticado');
//     }
// });





// // Ruta para registrar un nuevo proyecto
// router.post('/proyectos', async (req, res) => {
//     try {
//         console.log('Solicitud recibida:', req.body);
//         let { nombre, impacto, responsable, disponibilidad, dia, idarea, idficha, idpersona, idrespuestaobjetivos, idrespuestaalcance, iditems, idtiposdearea } = req.body;

//         // Asegúrate de que el idpersona está presente y es válido
//         if (!idpersona) {
//             return res.status(400).json({ error: 'Id de usuario no disponible. El usuario debe estar autenticado.' });
//         }

//         // Convertir cadenas vacías a null
//         idarea = idarea || null;
//         idficha = idficha || null;
//         idrespuestaobjetivos = idrespuestaobjetivos || null;
//         idrespuestaalcance = idrespuestaalcance || null;
//         iditems = iditems || null;
//         idtiposdearea = idtiposdearea || null;

//         const newProject = await registerProject({ 
//             nombre, 
//             impacto, 
//             responsable, 
//             disponibilidad, 
//             dia, 
//             idarea, 
//             idficha, 
//             idpersona,  // Aquí asegúrate de usar idpersona
//             idrespuestaobjetivos, 
//             idrespuestaalcance, 
//             iditems, 
//             idtiposdearea 
//         });
//         res.status(201).json(newProject);
//     } catch (error) {
//         console.error('Error al registrar proyecto:', error);
//         res.status(500).json({ error: 'Internal server error', details: error.message });
//     }
// });

// // Ruta para actualizar un proyecto existente
// router.put('/proyectos/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         let { nombre, impacto, responsable, disponibilidad, dia, idarea, idficha, idpersona, idrespuestaobjetivos, idrespuestaalcance, iditems, idtiposdearea } = req.body;

//         // Asegúrate de que el idpersona está presente y es válido
//         if (!idpersona) {
//             return res.status(400).json({ error: 'Id de usuario no disponible. El usuario debe estar autenticado.' });
//         }

//         // Convertir cadenas vacías a null
//         idarea = idarea || null;
//         idficha = idficha || null;
//         idrespuestaobjetivos = idrespuestaobjetivos || null;
//         idrespuestaalcance = idrespuestaalcance || null;
//         iditems = iditems || null;
//         idtiposdearea = idtiposdearea || null;

//         const updatedProject = await updateProject({
//             idproyecto: id,
//             nombre,
//             impacto,
//             responsable,
//             disponibilidad,
//             dia,
//             idarea,
//             idficha,
//             idpersona,
//             idrespuestaobjetivos,
//             idrespuestaalcance,
//             iditems,
//             idtiposdearea,
//         });

//         res.status(200).json(updatedProject);
//     } catch (error) {
//         console.error('Error al actualizar proyecto:', error);
//         res.status(500).json({ error: 'Internal server error', details: error.message });
//     }
// });

// // Ruta para obtener todas las preguntas junto con sus categorías
// router.get('/alcances', async (req, res) => {
//     try {
//         const alcances = await getAllAlcances();
//         res.json(alcances);
//     } catch (error) {
//         console.error('Error al obtener alcances:', error);
//         res.status(500).json({ error: 'Internal server error', details: error.message });
//     }
// });

// // Ruta para obtener todas las áreas
// router.get('/areas', async (req, res) => {
//     try {
//         const areas = await getAllAreas();
//         res.json(areas);
//     } catch (error) {
//         console.error('Error al obtener áreas:', error);
//         res.status(500).json({ error: 'Error interno del servidor', detalles: error.message });
//     }
// });

// // Ruta para obtener los tipos de área de acuerdo al área seleccionada
// router.get('/tipos-de-area/:idArea', async (req, res) => {
//     try {
//       const idArea = req.params.idArea;
//       const tiposDeArea = await getTiposDeAreaPorArea(idArea);
//       res.json(tiposDeArea);
//     } catch (error) {
//       console.error('Error al obtener tipos de área:', error);
//       res.status(500).json({ error: 'Internal server error', details: error.message });
//     }
//   });

//   router.get('/items/:idArea/:idTiposDeArea', async (req, res) => {
//     try {
//       const { idArea, idTiposDeArea } = req.params;
//       const items = await getItemsPorAreaYTipo(idArea, idTiposDeArea);
//       res.json(items);
//     } catch (error) {
//       console.error('Error al obtener ítems:', error);
//       res.status(500).json({ error: 'Internal server error', details: error.message });
//     }
//   });

// // Ruta para obtener todos los objetivos
// router.get('/objetivos', async (req, res) => {
//     try {
//         const objetivos = await getObjetivos();
//         res.json(objetivos);
//     } catch (error) {
//         console.error('Error al obtener objetivos:', error);
//         res.status(500).json({ error: 'Internal server error', details: error.message });
//     }
// });
// //Ruta para guardar respuestas de alcance
// router.post('/guardarRespuestas', async (req, res) => {
//     const idproyecto = parseInt(req.body.idproyecto, 10);
//     console.log('ID Proyecto recibido:', idproyecto);

//     if (isNaN(idproyecto)) {
//         return res.status(400).json({ error: 'ID del proyecto inválido' });
//     }

//     try {
//         const respuestas = req.body;
//         const respuestasAlcance = [];

//         for (const [key, value] of Object.entries(respuestas)) {
//             if (key !== 'idproyecto') {
//                 const idalcance = parseInt(key.replace('pregunta', ''), 10);
//                 respuestasAlcance.push({
//                     idproyecto,
//                     idalcance,
//                     respuesta: value === 'true'
//                 });
//             }
//         }

//         await guardarRespuestas(respuestasAlcance);
        
//         // Aquí enviamos una respuesta exitosa al cliente
//         res.status(200).json({ 
//             message: 'Respuestas guardadas correctamente',
//             redirectUrl: '/VistaUsuario' 
//         });
//     } catch (error) {
//         console.error('Error al guardar respuestas:', error);
//         res.status(500).json({ error: 'Error interno del servidor', details: error.message });
//     }
// });


// router.get('/objetivos/:idarea', async (req, res) => {
//     const { idarea } = req.params;
//     try {
//         const objetivos = await getObjetivosPorArea(idarea);
//         res.json(objetivos);
//     } catch (error) {
//         console.error('Error al obtener objetivos:', error);
//         res.status(500).json({ error: 'Error al obtener objetivos' });
//     }
// });


// router.post('/proyectos/seleccionar-area', async (req, res) => {
//     if (!req.body || !req.body.areaId || !req.body.projectId) {
//         res.status(400).json({ error: 'Faltan parámetros en el cuerpo de la solicitud' });
//         return;
//     }

//     const { areaId, projectId } = req.body;

//     try {
//         const updatedProject = await updateProjectWithArea(areaId, projectId);
//         res.status(200).json({
//             message: 'Área seleccionada correctamente',
//             updatedProject,
//         });
//     } catch (error) {
//         console.error('Error al seleccionar el área:', error);
//         res.status(500).json({ error: 'Error al seleccionar el área' });
//     }
// });

// router.post('/update-proyecto', async (req, res) => {
//     const { projectId, tipoId } = req.body;

//     if (!projectId || !tipoId) {
//         return res.status(400).json({ error: 'Faltan parámetros en el cuerpo de la solicitud' });
//     }

//     try {
//         const result = await updateProjectTipo(tipoId, projectId);
//         res.status(200).json(result);
//     } catch (error) {
//         console.error('Error al actualizar el proyecto:', error);
//         res.status(500).json({ error: 'Error interno del servidor' });
//     }
// });

// // Ruta para actualizar el ítem del proyecto
// router.post('/update-proyecto-item', async (req, res) => {
//     const { projectId, itemId } = req.body;
  
//     if (!projectId || !itemId) {
//       return res.status(400).json({ error: 'Faltan parámetros en el cuerpo de la solicitud' });
//     }
  
//     try {
//       const result = await updateProyectoItem({ projectId, itemId });
//       res.status(200).json(result);
//     } catch (error) {
//       console.error('Error al actualizar el ítem:', error);
//       res.status(500).json({ error: 'Error interno del servidor' });
//     }
//   });
  
// // Ruta para guardar las respuestas de objetivos
// router.post('/guardarRespuestasObjetivos', async (req, res) => {
//     const idproyecto = parseInt(req.body.idproyecto, 10);
//     console.log('ID Proyecto recibido:', idproyecto);
  
//     if (isNaN(idproyecto)) {
//       return res.status(400).json({ error: 'ID del proyecto inválido' });
//     }
  
//     try {
//       const respuestas = req.body;
//       const respuestasObjetivos = [];
  
//       for (const [key, value] of Object.entries(respuestas)) {
//         if (key !== 'idproyecto') {
//           const idobjetivos = key.replace('pregunta', ''); // Obtener el id de objetivo de la pregunta
//           respuestasObjetivos.push({ idproyecto, idobjetivos, respuesta: value === 'true' });
//         }
//       }
  
//       await guardarRespuestasObjetivos(respuestasObjetivos);
//       res.redirect(`http://localhost:4321/VistaAlcance?idproyecto=${idproyecto}`);
//     } catch (error) {
//       console.error('Error al guardar respuestas:', error);
//       res.status(500).json({ error: 'Error interno del servidor', details: error.message });
//     }
// });

// router.post('/agregarpersona', async (req, res) => {
//     try {
//         const { nombre, tipodocumento, numerodocumento, telefono, correo, contraseña, idrol, estado } = req.body; // Incluye `estado`

//         // Verificar si el correo ya existe
//         const emailExists = await checkEmailExists(correo);
//         if (emailExists) {
//             return res.status(409).json({ error: 'El correo electrónico ya está registrado.' });
//         }

//         // Registrar la nueva persona si el correo no existe
//         const newPerson = await agregarPersona({ nombre, tipodocumento, numerodocumento, telefono, correo, contraseña, idrol, estado }); // Incluye `estado`
//         res.status(201).json(newPerson);
//     } catch (error) {
//         console.error('Error al registrar persona:', error);
//         res.status(500).json({ error: 'Internal server error', details: error.message });
//     }
// });

// router.get('/proyectos', getProyectosUsuario);


// /*------------------------------Administrador---------------------------------------------------------------------------------------*/



// router.get('/respuestas/:idproyecto', async (req, res) => {
//   try {
//       const { idproyecto } = req.params;
//       console.log(`ID de proyecto recibido en el backend: ${idproyecto}`); // Verifica el valor del ID

//       // Llamada al controlador para obtener las respuestas del proyecto
//       const respuestas = await getRespuestasByProyecto(idproyecto);

//       if (respuestas && respuestas.length > 0) {
//           res.json({
//               proyecto: {
//                   id: idproyecto,
//                   nombre: respuestas[0].proyecto_nombre,
//               },
//               respuestas: respuestas.map((respuesta) => ({
//                   id: respuesta.idrespuestasobjetivos,
//                   descripcion: respuesta.descripcion,
//                   respuesta: respuesta.respuesta,
//                   categoria: respuesta.categoria,  // Incluye la categoría en la respuesta
//               })),
//           });
//       } else {
//           res.status(404).json({ error: 'Respuestas no encontradas para el proyecto' });
//       }
//   } catch (error) {
//       console.error('Error al obtener las respuestas del proyecto:', error);
//       res.status(500).json({ error: 'Error interno del servidor', details: error.message });
//   }
// });


//   router.get('/respuestasalcance/:idproyecto', async (req, res) => {
//     try {
//       const { idproyecto } = req.params;
  
//       const respuestasAlcance = await getRespuestasAlcanceByProyecto(idproyecto);
      
//       if (respuestasAlcance && respuestasAlcance.length > 0) {
//         res.json({
//           respuestasAlcance: respuestasAlcance.map((respuesta) => ({
//             idalcance: respuesta.idalcance,
//             descripcion: respuesta.descripcion,
//             respuesta: respuesta.respuesta,
//             categoria: respuesta.categoria // La categoría ahora es correcta
//           })),
//         });
//       } else {
//         res.status(404).json({ error: 'Respuestas de alcance no encontradas para el proyecto' });
//       }
//     } catch (error) {
//       console.error('Error al obtener las respuestas de alcance del proyecto:', error);
//       res.status(500).json({ error: 'Error interno del servidor', details: error.message });
//     }
//   });
  

//   // Ruta para guardar la calificación
// router.post('/calificaciones', guardarCalificacion);

// // Ruta para actualizar el estado de las respuestas
// router.post('/actualizarEstadoRespuestas', actualizarEstadoRespuestas);

// // Ruta para obtener todas las fichas activas
// router.get('/fichas', getFichas);

// // Ruta para obtener aprendices por ficha
// router.get('/aprendices/:idficha', getAprendicesByFicha);

// // Ruta para asignar proyectos
// router.post('/asignar-proyectos', asignarProyecto);

// // Ruta para actualizar el estado de las respuestas de alcance
// router.post('/actualizarEstadoRespuestasAlcance', actualizarEstadoRespuestasAlcance);

// // Ruta para actualizar el idcalificacion en la tabla proyecto
// router.put('/actualizar-idcalificacion', actualizarIdCalificacion);

// /*------------------------------Administrador---------------------------------------------------------------------------------------*/



 
// //SuperAdmin: 

// router.post('/personas/:id/unlink-proyecto/:idproyecto', async (req, res) => {
//     try {
//       const { id, idproyecto } = req.params;
//       await unlinkUserFromProject(id, idproyecto);
//       res.json({ message: 'Usuario desligado del proyecto con éxito' });
//     } catch (error) {
//       console.error('Error al desligar usuario del proyecto:', error);
//       res.status(500).json({ error: 'Error interno del servidor', details: error.message });
//     }
//   });

//   router.get('/personas/:id/proyectos', async (req, res) => {
//     try {
//       const { id } = req.params;
//       const projects = await getUserProjects(id);
//       res.json(projects);
//     } catch (error) {
//       console.error('Error al obtener proyectos del usuario:', error);
//       res.status(500).json({ error: 'Error interno del servidor', details: error.message });
//     }
//   });

//   router.get('/ficha', async (req, res) => {
//     try {
//         const ficha = await getAllFicha();
//         res.json(ficha);
//     } catch (error) {
//         console.error('Error al obtener fichas:', error);
//         res.status(500).json({ error: 'Error interno del servidor', detalles: error.message });
//     }
// });


//   // Ruta para obtener todos los proyectos
// router.get('/proyecto', async (req, res) => {
//     try {
//         const proyectos = await obtenerTodosLosProyectos();
//         res.json(proyectos);
//     } catch (error) {
//         console.error('Error al obtener proyectos:', error);
//         res.status(500).json({ error: 'Error al obtener proyectos' });
//     }
// });

// router.get('/ficha', async (req, res) => {
//     try {
//         const ficha = await getAllFicha();
//         res.json(ficha);
//     } catch (error) {
//         console.error('Error al obtener fichas:', error);
//         res.status(500).json({ error: 'Error interno del servidor', detalles: error.message });
//     }
// });


// // Definir la ruta para registrar el área
// router.post('/api/registerArea', async (req, res) => {
//     try {
//         const { area } = req.body;
//         const newArea = await registerArea({ area });
//         if (newArea.error) {
//             return res.status(400).json({ error: newArea.error });
//         }
//         return res.status(201).json(newArea);
//     } catch (error) {
//         console.error('Error al registrar área:', error);
//         return res.status(500).json({ error: 'Error al registrar área' });
//     }
// });

// //Registro ficha
// router.post('/registerFicha', async (req, res) => {
//     try {
//         const newFicha = await registerFicha(req.body);
//         res.status(201).json(newFicha);
//     } catch (error) {
//         res.status(500).json({ error: 'Error al registrar ficha' });
//     }
// });


// // Obtener tipos de área por área específica
// router.get('/tipodearea/:idarea', async (req, res) => {
//     const idarea = Number(req.params.idarea); // Asegurarse de que idarea es un número

//     if (isNaN(idarea)) {
//         return res.status(400).json({ error: 'El idarea debe ser un número válido.' });
//     }
//     try {
//         const tiposDeArea = await getTipoDeArea(idarea);
//         res.status(200).json(tiposDeArea);
//     } catch (error) {
//         console.error('Error al obtener tipos de área:', error);
//         res.status(500).json({ error: 'Error interno del servidor', details: error.message });
//     }
// });

// // Registro de tipo de área
// router.post('/registerTipoDeArea', async (req, res) => {
//     try {
//         const { tiposdearea, estado, idarea } = req.body;
//         // console.log("holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",req);
        
//         if (typeof idarea !== 'number' || isNaN(idarea)) {
//             return res.status(400).json({ error: 'El idarea debe ser un número válido.' });
//         }

//         const newTipoDeArea = await registerTipoDeArea({ tiposdearea, estado, idarea });
//         if (newTipoDeArea.error) {
//             return res.status(400).json({ error: newTipoDeArea.error });
//         }

//         res.status(201).json(newTipoDeArea);
//     } catch (error) {
//         console.error('Error al registrar tipo aaaade área aaaaa:', error.message);
//         return res.status(500).json({ error: error.message });
//     }
// });

// // Ruta para registrar un nuevo item en itemsarea
// router.post('/api/registerItemArea', async (req, res) => {
//     try {
//         const { items, estado, idtiposdearea, idarea } = req.body;
//         const newItem = await registerItemArea({ items, estado, idtiposdearea, idarea });
//         res.status(201).json(newItem);
//     } catch (error) {
//         console.error('Error al registrar item:', error);
//         res.status(500).json({ error: 'Error al registrar item.', details: error.message });
//     }
// });


// //--------------------------------Administrador Filtros-----------------------------------//

// router.get('/proyectos/asignados', getProyectosAsignados);

// // Ruta para obtener proyectos, con filtrado opcional por estado de calificación
// router.get('/proyectos', getProyectos);

// router.get('/proyectos/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log(`ID recibido en el backend: ${id}`); // Verifica el valor del ID
//         const proyecto = await getProyectoById(id);

//         if (proyecto) {
//             res.json(proyecto);
//         } else {
//             res.status(404).json({ error: 'Proyecto no encontrado' });
//         }
//     } catch (error) {
//         console.error('Error al obtener el proyecto:', error);
//         res.status(500).json({ error: 'Internal server error', details: error.message });
//     }
// });
// //------------------------------------------------------------------------------------------------------------------------------------------------------

// export default router;