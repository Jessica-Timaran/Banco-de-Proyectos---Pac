import express from 'express';
import { pool } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';
import transporter from '../config/nodemailerConfig.js';
import bcrypt from 'bcrypt';
import {
    getAllPersonas,
    getAllUsuario,
    getAllAlcances,
    getAllAreas,
    getTiposDeAreaPorArea,
    getObjetivosPorArea,
    getObjetivos,
    agregarPersona,
    obtenerTodosLosProyectos,
    getAllFicha,
    registerArea,
 
    getTipoDeArea,
    registerTipoDeArea,
    registerItemArea,
    checkEmailExists,
  
    insertItem,
    addTipoDeArea,
    getItemsByTipoDeArea,
    registerFicha,
    getTiposDeArea
} from '../controllers/superAdminControler.js';

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
// Ruta para agregar una persona
router.post('/agregarpersona', agregarPersona);
// Ruta para obtener todas las personas
router.get('/personas', async (req, res) => {
    try {
        const personas = await getAllPersonas();
        res.json(personas);
    } catch (error) {
        console.error('Error al obtener personas:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
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





// Ruta para obtener todos los proyectos
router.get('/proyecto', async (req, res) => {
    try {
        const proyectos = await obtenerTodosLosProyectos();
        res.json(proyectos);
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        res.status(500).json({ error: 'Error al obtener proyectos' });
    }
});


  router.get('/ficha', async (req, res) => {
    try {
        const ficha = await getAllFicha();
        res.json(ficha);
    } catch (error) {
        console.error('Error al obtener fichas:', error);
        res.status(500).json({ error: 'Error interno del servidor', detalles: error.message });
    }
});


// Definir la ruta para registrar el área
router.post('/registerArea', async (req, res) => {
    try {
        const { area } = req.body;

        // Verifica si el campo "area" está presente
        if (!area) {
            return res.status(400).json({ message: 'El campo "area" es obligatorio.' });
        }

        const newArea = await registerArea({ area });
        res.status(201).json({
            message: 'Área registrada exitosamente',
            area: newArea
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el área', error: error.message });
    }
});


//Registro ficha
router.post('/registerFicha', async (req, res) => {
    try {
        const newFicha = await registerFicha(req.body);
        res.status(201).json(newFicha);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar ficha' });
    }
});


// Obtener tipos de área por área específica
router.get('/tipodearea/:idarea', async (req, res) => {
    const idarea = Number(req.params.idarea); // Asegurarse de que idarea es un número

    if (isNaN(idarea)) {
        return res.status(400).json({ error: 'El idarea debe ser un número válido.' });
    }
    try {
        const tiposDeArea = await getTipoDeArea(idarea);
        res.status(200).json(tiposDeArea);
    } catch (error) {
        console.error('Error al obtener tipos de área:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
});

// Registro de tipo de área
router.post('/registerTipoDeArea', async (req, res) => {
    try {
        const { tiposdearea, estado, idarea } = req.body;
        // console.log("holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",req);
        
        if (typeof idarea !== 'number' || isNaN(idarea)) {
            return res.status(400).json({ error: 'El idarea debe ser un número válido.' });
        }

        const newTipoDeArea = await registerTipoDeArea({ tiposdearea, estado, idarea });
        if (newTipoDeArea.error) {
            return res.status(400).json({ error: newTipoDeArea.error });
        }

        res.status(201).json(newTipoDeArea);
    } catch (error) {
        console.error('Error al registrar tipo aaaade área aaaaa:', error.message);
        return res.status(500).json({ error: error.message });
    }
});

// Ruta para registrar un nuevo item en itemsarea
router.post('/api/registerItemArea', async (req, res) => {
    try {
        const { items, estado, idtiposdearea, idarea } = req.body;
        const newItem = await registerItemArea({ items, estado, idtiposdearea, idarea });
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error al registrar item:', error);
        res.status(500).json({ error: 'Error al registrar item.', details: error.message });
    }
});


router.post('/insertItem', insertItem);
router.get('/tipos-de-area', getTiposDeArea);
router.post('/tipos-de-area', addTipoDeArea);
router.get('/items/:idtiposdearea', getItemsByTipoDeArea);

router.post('/fichas', registerFicha);


export default router;