import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';

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
async function registerProject({ nombre, impacto, responsable, disponibilidad, dia, idalcance, idobjetivos, idarea, idficha, idpersona }) {
    try {
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO proyecto (nombre, impacto, responsable, disponibilidad, idalcance, idobjetivos, idarea, idficha, idpersona, dia) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [nombre, impacto, responsable, disponibilidad, idalcance, idobjetivos, idarea, idficha, idpersona, dia]
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
    updatePassword
};