import express from 'express';
import { 
    checkEmailExists,
    getAllPersonas, 
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
    agregarPersona,
    getUserNameById,
    getFichas,
    getAprendicesByFicha,
    getProyectosUsuario,
    updateProject,
    getRespuestasByProyecto,
    getRespuestasAlcanceByProyecto,
    guardarRespuestasYActualizarPuntos,
    actualizarPuntosAlcance,
    actualizarEstadoProyecto
   

} from '../controllers/userControler.js';

const router = express.Router();


// Ruta para establecer una cookie
router.get('/set-cookie', (req, res) => {
    res.cookie('testCookie', 'testValue', { maxAge: 900000, httpOnly: true });
    res.send('Cookie has been set');
  });



// Ruta para verificar la cookie
router.get('/get-cookie', (req, res) => {
  const cookie = req.cookies['testCookie'];
  res.send(`Cookie value is: ${cookie}`);
});

  
router.post('/check-email', async (req, res) => {
    const { correo } = req.body;

    if (!correo) {
        return res.status(400).json({ error: 'Correo electrónico es requerido.' });
    }

    try {
        const exists = await checkEmailExists(correo);
        res.json({ exists });
    } catch (error) {
        console.error('Error en el endpoint check-email:', error);
        res.status(500).json({ error: error.message });
    }
});



// Ruta para obtener todas las personas
router.get('/personas', async (req, res) => {
    try {
        const personas = await getAllPersonas();
        res.json(personas);
    } catch (error) {
        console.error('Error al obtener personas:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Ruta para obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await getAllUsuario();
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});


// Ruta para registrar una nueva persona
router.post('/register', async (req, res) => {
    try {
        const { nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol } = req.body;

        // Verificar si el correo ya existe
        const emailExists = await checkEmailExists(correo);
        if (emailExists) {
            return res.status(409).json({ error: 'El correo electrónico ya está registrado.' });
        }

        // Registrar la nueva persona si el correo no existe
        const newPerson = await registerPerson({ nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol });
        res.status(201).json(newPerson);
    } catch (error) {
        console.error('Error al registrar persona:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    try {
        const { correo, contraseña } = req.body;
        const user = await loginPerson(correo, contraseña);

        if (user) {
            req.session.userId = user.id;
            req.session.rol = user.rol;

            // Verifica que se esté enviando el id, nombre y rol del usuario, así como el token
            res.status(200).json({ 
                id: user.id, // ID del usuario
                rol: user.rol, // Rol del usuario
                nombre: user.nombre, // Nombre del usuario
                token: user.token // Token JWT que se generó en loginPerson
            });
        } else {
            res.status(401).json({ error: 'Correo o contraseña incorrectos' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});




router.get('/ruta-protegida', (req, res) => {
    if (req.session.userId) {
        // El usuario está autenticado
        res.send('Acceso concedido');
    } else {
        res.status(401).send('No autenticado');
    }
});



// Ruta para registrar un nuevo proyecto
router.post('/proyectos', async (req, res) => {
    try {
        console.log('Solicitud recibida:', req.body);
        let { nombre, impacto, responsable, disponibilidad, dia, idarea, idficha, idpersona, idrespuestaobjetivos, idrespuestaalcance, iditems, idtiposdearea, estado } = req.body;

        if (!idpersona) {
            return res.status(400).json({ error: 'Id de usuario no disponible. El usuario debe estar autenticado.' });
        }

        idarea = idarea || null;
        idficha = idficha || null;
        idrespuestaobjetivos = idrespuestaobjetivos || null;
        idrespuestaalcance = idrespuestaalcance || null;
        iditems = iditems || null;
        idtiposdearea = idtiposdearea || null;

        const newProject = await registerProject({ 
            nombre, 
            impacto, 
            responsable, 
            disponibilidad, 
            dia, 
            idarea, 
            idficha, 
            idpersona, 
            idrespuestaobjetivos, 
            idrespuestaalcance, 
            iditems, 
            idtiposdearea, 
            estado  // Asegúrate de pasar el estado aquí
        });
        res.status(201).json(newProject);
    } catch (error) {
        console.error('Error al registrar proyecto:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});


// Ruta para actualizar un proyecto existente
router.put('/proyectos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let { nombre, impacto, responsable, disponibilidad, dia, idarea, idficha, idpersona, idrespuestaobjetivos, idrespuestaalcance, iditems, idtiposdearea, estado } = req.body;

        if (!idpersona) {
            return res.status(400).json({ error: 'Id de usuario no disponible. El usuario debe estar autenticado.' });
        }

        idarea = idarea || null;
        idficha = idficha || null;
        idrespuestaobjetivos = idrespuestaobjetivos || null;
        idrespuestaalcance = idrespuestaalcance || null;
        iditems = iditems || null;
        idtiposdearea = idtiposdearea || null;

        const updatedProject = await updateProject({
            idproyecto: id,
            nombre,
            impacto,
            responsable,
            disponibilidad,
            dia,
            idarea,
            idficha,
            idpersona,
            idrespuestaobjetivos,
            idrespuestaalcance,
            iditems,
            idtiposdearea,
            estado  // Asegúrate de pasar el estado aquí
        });

        res.status(200).json(updatedProject);
    } catch (error) {
        console.error('Error al actualizar proyecto:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Ruta para obtener todas las preguntas junto con sus categorías
router.get('/alcances', async (req, res) => {
    try {
        const alcances = await getAllAlcances();
        res.json(alcances);
    } catch (error) {
        console.error('Error al obtener alcances:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Ruta para obtener todas las áreas
router.get('/areas', async (req, res) => {
    try {
        const areas = await getAllAreas();
        res.json(areas);
    } catch (error) {
        console.error('Error al obtener áreas:', error);
        res.status(500).json({ error: 'Error interno del servidor', detalles: error.message });
    }
});

// Ruta para obtener los tipos de área de acuerdo al área seleccionada
router.get('/tipos-de-area/:idArea', async (req, res) => {
    try {
      const idArea = req.params.idArea;
      const tiposDeArea = await getTiposDeAreaPorArea(idArea);
      res.json(tiposDeArea);
    } catch (error) {
      console.error('Error al obtener tipos de área:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  router.get('/items/:idArea/:idTiposDeArea', async (req, res) => {
    try {
      const { idArea, idTiposDeArea } = req.params;
      const items = await getItemsPorAreaYTipo(idArea, idTiposDeArea);
      res.json(items);
    } catch (error) {
      console.error('Error al obtener ítems:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

// Ruta para obtener todos los objetivos
router.get('/objetivos', async (req, res) => {
    try {
        const objetivos = await getObjetivos();
        res.json(objetivos);
    } catch (error) {
        console.error('Error al obtener objetivos:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});
//Ruta para guardar respuestas de alcance
router.post('/guardarRespuestas', async (req, res) => {
    const idproyecto = parseInt(req.body.idproyecto, 10);
    console.log('ID Proyecto recibido:', idproyecto);

    if (isNaN(idproyecto)) {
        return res.status(400).json({ error: 'ID del proyecto inválido' });
    }

    try {
        const respuestas = req.body;
        const respuestasAlcance = [];

        for (const [key, value] of Object.entries(respuestas)) {
            if (key !== 'idproyecto') {
                const idalcance = parseInt(key.replace('pregunta', ''), 10);
                respuestasAlcance.push({
                    idproyecto,
                    idalcance,
                    respuesta: value === 'true'
                });
            }
        }

        await guardarRespuestas(respuestasAlcance);
        
        // Aquí enviamos una respuesta exitosa al cliente
        res.status(200).json({ 
            message: 'Respuestas guardadas correctamente',
            redirectUrl: '/VistaUsuario' 
        });
    } catch (error) {
        console.error('Error al guardar respuestas:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
});


router.get('/objetivos/:idarea', async (req, res) => {
    const { idarea } = req.params;
    try {
        const objetivos = await getObjetivosPorArea(idarea);
        res.json(objetivos);
    } catch (error) {
        console.error('Error al obtener objetivos:', error);
        res.status(500).json({ error: 'Error al obtener objetivos' });
    }
});


router.post('/proyectos/seleccionar-area', async (req, res) => {
    if (!req.body || !req.body.areaId || !req.body.projectId) {
        res.status(400).json({ error: 'Faltan parámetros en el cuerpo de la solicitud' });
        return;
    }

    const { areaId, projectId } = req.body;

    try {
        const updatedProject = await updateProjectWithArea(areaId, projectId);
        res.status(200).json({
            message: 'Área seleccionada correctamente',
            updatedProject,
        });
    } catch (error) {
        console.error('Error al seleccionar el área:', error);
        res.status(500).json({ error: 'Error al seleccionar el área' });
    }
});

router.post('/update-proyecto', async (req, res) => {
    const { projectId, tipoId } = req.body;

    if (!projectId || !tipoId) {
        return res.status(400).json({ error: 'Faltan parámetros en el cuerpo de la solicitud' });
    }

    try {
        const result = await updateProjectTipo(tipoId, projectId);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al actualizar el proyecto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para actualizar el ítem del proyecto
router.post('/update-proyecto-item', async (req, res) => {
    const { projectId, itemId } = req.body;
  
    if (!projectId || !itemId) {
      return res.status(400).json({ error: 'Faltan parámetros en el cuerpo de la solicitud' });
    }
  
    try {
      const result = await updateProyectoItem({ projectId, itemId });
      res.status(200).json(result);
    } catch (error) {
      console.error('Error al actualizar el ítem:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
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

router.post('/agregarpersona', async (req, res) => {
    try {
        const { nombre, tipodocumento, numerodocumento, telefono, correo, contraseña, idrol, estado } = req.body; // Incluye `estado`

        // Verificar si el correo ya existe
        const emailExists = await checkEmailExists(correo);
        if (emailExists) {
            return res.status(409).json({ error: 'El correo electrónico ya está registrado.' });
        }

        // Registrar la nueva persona si el correo no existe
        const newPerson = await agregarPersona({ nombre, tipodocumento, numerodocumento, telefono, correo, contraseña, idrol, estado }); // Incluye `estado`
        res.status(201).json(newPerson);
    } catch (error) {
        console.error('Error al registrar persona:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Ruta para obtener todas las fichas activas
router.get('/fichas', getFichas);

// Ruta para obtener aprendices por ficha
router.get('/aprendices/:idficha', getAprendicesByFicha);

router.get('/proyectos', getProyectosUsuario);

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

  router.post('/guardarRespuestasYActualizarPuntos', guardarRespuestasYActualizarPuntos);

//obtener respuestas de alcance 

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
  

  router.put('/proyectos/:idproyecto', actualizarPuntosAlcance);

  router.put('/proyectos/:idproyecto/estado', actualizarEstadoProyecto);


export default router;