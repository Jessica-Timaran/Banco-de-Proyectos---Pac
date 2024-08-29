import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';

// Función para verificar si el correo electrónico ya está registrado
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
        throw error;
    }
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
        throw error;
    }
}

// Función para obtener todas las personas
async function getAllPersonas() {
    try {
        console.log('Obteniendo todas las personas...');
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM personas');
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

// Función para registrar una nueva persona
async function registerPerson({ nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol, estado }) {
    try {
        console.log('Datos recibidos en registerPerson:', { nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol, estado });

        // Cifrar la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        console.log('Contraseña cifrada:', hashedPassword);

        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO personas (nombre, tipodocumento, numerodocumento, nombreempresa, telefono, correo, contraseña, idrol, estado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [nombre, tipodocumento, numerodocumento, nombreempresa || null, telefono, correo, hashedPassword, idrol, estado || null]
        );
        client.release();
        console.log('Persona registrada con éxito:', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error al registrar persona:', error);
        throw error;
    }
}

// Función para iniciar sesión
async function loginPerson(correo, contraseña) {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM personas WHERE correo = $1', [correo]);
        client.release();

        if (result.rows.length > 0) {
            const person = result.rows[0];
            const match = await bcrypt.compare(contraseña, person.contraseña);
            if (match) {
                return { id: person.id, rol: person.idrol };  // Devuelve el rol del usuario
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

// Función para registrar una nueva ficha
async function registerFicha({ nombre, numeroFicha, estado }) {
    try {
        console.log('Datos recibidos en registerFicha:', { nombre, numeroFicha, estado });

        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO ficha (nombre, numeroficha, estado) VALUES ($1, $2, $3) RETURNING *',
            [nombre, numeroFicha, estado]
        );
        client.release();
        console.log('Ficha registrada con éxito:', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error al registrar ficha:', error);
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

// Función para obtener todos los proyectos Steeven
async function getAllProyectos() {
    try {
        console.log('Obteniendo todos los proyectos...');
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM proyecto');
        client.release();
        console.log('Proyectos obtenidos con éxito:', result.rows);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        throw error;
    }
}

// Función para obtener un proyecto por ID Steeven
async function getProyectoById(id) {
    try {
        const numericId = parseInt(id); // Convertir a entero
        if (isNaN(numericId)) {
            throw new Error('ID inválido');
        }
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM proyecto WHERE idproyecto = $1', [numericId]);
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
        const result = await client.query('SELECT idarea, area, estado FROM area');
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
        SELECT t.idtiposdearea, t.tiposdearea, t.estado
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

async function guardarRespuestas(respuestas) {
    try {
        const client = await pool.connect();

        for (const respuesta of respuestas) {
            const { idproyecto, idalcance, respuesta: valorRespuesta } = respuesta;

            // Convertir idproyecto a número
            const idproyectoNumero = parseInt(idproyecto, 10);

            await client.query(
                'INSERT INTO respuestasalcance (idproyecto, idalcance, respuesta) VALUES ($1, $2, $3)',
                [idproyectoNumero, idalcance, valorRespuesta]
            );
        }

        client.release();
        console.log('Respuestas guardadas con éxito');
    } catch (error) {
        console.error('Error al guardar respuestas:', error);
        throw error;
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
    try {
        const client = await pool.connect();

        for (const respuesta of respuestas) {
            const { idproyecto, idobjetivos, respuesta: valorRespuesta } = respuesta;

            // Guarda en la tabla respuestasobjetivos con el idproyecto
            await client.query(
                'INSERT INTO respuestasobjetivos (idproyecto, idobjetivos, respuesta) VALUES ($1, $2, $3)',
                [idproyecto, idobjetivos, valorRespuesta]
            );
        }

        client.release();
        console.log('Respuestas guardadas con éxito');
    } catch (error) {
        console.error('Error al guardar respuestas:', error);
        throw error;
    }
}

export {
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
    checkIfUserExists,
    updatePassword,
    getTiposDeAreaPorArea,
    getItemsPorAreaYTipo,
    getObjetivos,
    guardarRespuestas,
    updateProjectWithArea,
    getObjetivosPorArea,
    updateProjectTipo,
    updateProyectoItem,
    guardarRespuestasObjetivos

};