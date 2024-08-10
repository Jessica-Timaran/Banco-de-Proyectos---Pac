import express from 'express';
import { 
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
    updatePassword, checkIfUserExists 
} from '../controllers/datacontroler.js';
import { v4 as uuidv4 } from 'uuid';
import transporter from '../config/nodemailerConfig.js';

const router = express.Router();
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
        let { nombre, impacto, responsable, disponibilidad, dia, idalcance, idobjetivos, idarea, idficha, idpersona } = req.body;

        // Convertir cadenas vacías a null
        idalcance = idalcance || null;
        idobjetivos = idobjetivos || null;
        idarea = idarea || null;
        idficha = idficha || null;
        idpersona = idpersona || null;

        const newProject = await registerProject({ nombre, impacto, responsable, disponibilidad, dia, idalcance, idobjetivos, idarea, idficha, idpersona });
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

export default router;