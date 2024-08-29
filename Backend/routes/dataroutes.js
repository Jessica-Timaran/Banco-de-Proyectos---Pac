import express from 'express';
import {checkEmailExists,
    getAllPersonas,
    getAllUsuario,
    registerPerson,
    loginPerson,
    registerFicha,
    registerProject,
    getAllProyectos,
    getAllAlcances,
    getProyectoById,
    getAllAreas,
    updatePassword,
    getTiposDeAreaPorArea,
    getItemsPorAreaYTipo,
    getObjetivos,
    guardarRespuestas,
    getObjetivosPorArea,
    updateProjectWithArea,
    updateProjectTipo,
    updateProyectoItem,
    guardarRespuestasObjetivos


} from '../controllers/datacontroler.js';
import { v4 as uuidv4 } from 'uuid';
import transporter from '../config/nodemailerConfig.js';




const router = express.Router();

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

// Ruta para actualizar la contraseña
router.post('/update-password', async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await updatePassword(email, newPassword);
        res.status(200).json({ message: 'Contraseña actualizada con éxito', user });
    } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        res.status(500).json({ error: 'Error al actualizar la contraseña', details: error.message });
    }
});

// Ruta para solicitar el enlace de recuperación de contraseña
router.post('/reset-password', async (req, res) => {
    const { email } = req.body;

    try {
        // Verificar si el usuario existe
        const userExists = await checkIfUserExists(email);

        if (!userExists) {
            return res.status(404).json({ error: 'Por favor regístrate para hacer el cambio de contraseña.' });
        }

        const resetToken = uuidv4(); // Genera un token único
        const resetLink = `http://localhost:4321/Principal/UpdatePassword?token=${resetToken}&email=${encodeURIComponent(email)}`;

        const mailOptions = {
            from: 'pac.bancodeproyectos@gmail.com',
            to: email,
            subject: 'Recuperación de Contraseña',
            html: `<p>Haga clic en el siguiente enlace para restablecer su contraseña: <a href="${resetLink}">Restablecer Contraseña</a></p>`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Enlace de restablecimiento enviado' });
    } catch (error) {
        console.error('Error al enviar el enlace de restablecimiento:', error);
        res.status(500).json({ error: `Error al enviar el enlace de restablecimiento: ${error.message}` });
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
        console.log('Datos recibidos en la solicitud de registro:', req.body);
        const { nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol, estado } = req.body;
        const newPerson = await registerPerson({ nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol, estado });
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
            res.status(200).json(user);
        } else {
            res.status(401).json({ error: 'Correo o contraseña incorrectos' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});


// Ruta para registrar una nueva ficha
router.post('/registerFicha', async (req, res) => {
    try {
        const newFicha = await registerFicha(req.body);
        res.status(201).json(newFicha);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar ficha' });
    }
});

// Ruta para registrar un nuevo proyecto
router.post('/proyectos', async (req, res) => {
    try {
        console.log('Solicitud recibida:', req.body);
        let { nombre, impacto, responsable, disponibilidad, dia, idarea, idficha, idpersona, idrespuestaobjetivos, idrespuestaalcance, iditems, idtiposdearea } = req.body;

        // Convertir cadenas vacías a null
        idarea = idarea || null;
        idficha = idficha || null;
        idpersona = idpersona || null;
        idrespuestaobjetivos = idrespuestaobjetivos || null;
        idrespuestaalcance = idrespuestaalcance || null;
        iditems = iditems || null;
        idtiposdearea = idtiposdearea || null;

        const newProject = await registerProject({ nombre, impacto, responsable, disponibilidad, dia, idarea, idficha, idpersona, idrespuestaobjetivos, idrespuestaalcance, iditems, idtiposdearea });
        res.status(201).json(newProject);
    } catch (error) {
        console.error('Error al registrar proyecto:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Ruta para obtener todos los proyectos Steeven
router.get('/proyectos', async (req, res) => {
    try {
        const proyectos = await getAllProyectos();
        res.json(proyectos);
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Ruta para obtener un proyecto por ID  Steeven
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

// Ruta para guardar las respuestas de alcance
router.post('/guardarRespuestas', async (req, res) => {
    const idproyecto = parseInt(req.body.idproyecto, 10);

    if (isNaN(idproyecto)) {
        return res.status(400).json({ error: 'ID del proyecto inválido' });
    }

    try {
        const respuestas = req.body;
        const respuestasAlcance = [];

        for (const [key, value] of Object.entries(respuestas)) {
            if (key !== 'idproyecto') {
                const idalcance = key.replace('pregunta', ''); // Obtener el id de alcance de la pregunta
                // Convertir el valor a booleano
                respuestasAlcance.push({ idproyecto, idalcance, respuesta: value === 'true' });
            }
        }

        await guardarRespuestas(respuestasAlcance);

        // Redirige a la URL
        res.redirect('http://localhost:4321/Usuario/VistaUsuario');
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
router.post('/updat-proyecto-item', async (req, res) => {
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

// Ruta para guardar las respuestas de objetivos
router.post('/guardarRespuestasObjetivos', async (req, res) => {
    const idproyecto = parseInt(req.body.idproyecto, 10);
    console.log('ID Proyecto recibido:', idproyecto);

    if (isNaN(idproyecto)) {
        return res.status(400).json({ error: 'ID del proyecto inválido' });
    }

    try {
        const respuestas = req.body;
        const respuestasObjetivos = [];

        for (const [key, value] of Object.entries(respuestas)) {
            if (key !== 'idproyecto') {
                const idobjetivos = key.replace('pregunta', ''); // Obtener el id de objetivo de la pregunta
                respuestasObjetivos.push({ idproyecto, idobjetivos, respuesta: value === 'true' });
            }e
        }

        await guardarRespuestasObjetivos(respuestasObjetivos);
        res.redirect('http://localhost:4321/Usuario/VistaAlcance');
    } catch (error) {
        console.error('Error al guardar respuestas:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
});
export default router;