import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

async function checkEmailExists(correo) {
    if (!correo) {
        throw new Error('El correo electrónico es requerido.');
    }
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT COUNT(*) FROM personas WHERE correo = $1', [correo]);
        client.release();
        
        if (result.rows[0].count > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error en checkEmailExists:', error);
        throw new Error('Error en la base de datos al verificar el correo electrónico.');
    }
}

// Controlador para agregar persona
async function agregarPersona(req, res) {
    try {
      console.log('Datos recibidos:', req.body);
  
      const {
        nombre = '',
        tipodocumento = '',
        numerodocumento = '',
        correo = '',
        contraseña = '',
        celular = '',
        idrol = '',
        idficha = null
      } = req.body;
  
      // Verificar si faltan datos requeridos
      if (!nombre || !tipodocumento || !numerodocumento || !correo || !contraseña || !idrol || !celular) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
      }
  
      // Registrar a la persona en la base de datos
      const nuevaPersona = {
        nombre,
        tipodocumento,
        numerodocumento,
        correo,
        contraseña,
        telefono: celular,
        idrol: parseInt(idrol, 10),
        idficha: idrol === 4 && idficha !== null ? parseInt(idficha, 10) : null,
        estado: true
      };
  
      const resultado = await pool.query(
        'INSERT INTO personas (nombre, tipodocumento, numerodocumento, correo, contraseña, telefono, idrol, idficha, estado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [nombre, tipodocumento, numerodocumento, correo, contraseña, celular, nuevaPersona.idrol, nuevaPersona.idficha, nuevaPersona.estado]
      );
  
      res.status(201).json({ message: 'Usuario registrado exitosamente', usuario: resultado.rows[0] });
    } catch (error) {
      console.error('Error al registrar persona:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
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


// Función para registrar Área
async function registerArea({ area }) {
    try {
        console.log('Datos recibidos en registerArea:', { area });

        const client = await pool.connect();

        // Verificar si el área ya existe
        const checkQuery = 'SELECT COUNT(*) FROM area WHERE area = $1';
        const checkResult = await client.query(checkQuery, [area]);

        if (parseInt(checkResult.rows[0].count) > 0) {
            console.log('El área ya existe.');
            client.release();
            return { error: 'El área ya existe.' };
        } else {
            // Insertar el área si no existe
            const insertQuery = 'INSERT INTO area (area) VALUES ($1) RETURNING *';
            const result = await client.query(insertQuery, [area]);
            client.release();
            console.log('Área registrada con éxito:', result.rows[0]);
            return result.rows[0];
        }
    } catch (error) {
        console.error('Error al registrar área:', error.message, error.stack);
        throw error;
    }
}
// Función para registrar una nueva ficha
async function registerFicha({ nombre, numeroFicha }) {
    try {
        console.log('Datos recibidos en registerFicha:', { nombre, numeroFicha});

        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO ficha (nombre, numeroficha, estado ) VALUES ($1, $2, $3) RETURNING *',
            [nombre, numeroFicha, true]
        );
        client.release();
        console.log('Ficha registrada con éxito:', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error al registrar ficha:', error);
        throw error;
    }
}


// Función para obtener todos los tipos de área por un área específica
async function getTipoDeArea(idarea) {
    try {
        console.log('Obteniendo tipos de área para el área con ID:', idarea);
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM tipodearea WHERE idarea = $1', [idarea]);
        client.release();
        console.log('Tipos de área obtenidos con éxito:', result.rows);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener tipos de área:', error);
        throw error;
    }
}

// Función para registrar un nuevo tipo de área
async function registerTipoDeArea({ tiposdearea, estado, idarea }) {
    const client = await pool.connect();
    console.log("aaaaaaaaaaaaaaa  " ,tiposdearea);
    console.log("aaaaaaaaaaaaaaa  " ,estado);
    console.log("aaaaaaaaaaaaaaa  " ,idarea);
    
    try {
        const condi = 0;
        const checkQuery = 'SELECT MAX(idtiposdearea) FROM tipodearea WHERE idtiposdearea != $1';
        const checkResult = await client.query(checkQuery, [condi]);
      
        console.error('>>>>>>>>>>>> ',checkResult);

        if (parseInt(checkResult.rows[0].max) > 0) {
            const cont=checkResult.rows[0].max+1;
            console.error('>>>>>>>>>>>> ',cont);
            const insertQuery = 'INSERT INTO tipodearea (idtiposdearea,tiposdearea, estado, idarea) VALUES ($1, $2, $3,$4) RETURNING *';
            const result = await client.query(insertQuery, [cont,tiposdearea, estado, idarea]);
            client.release();
            return result.rows[0];
        }else{
        console.error('Error al registrar tipo de área:aaaaa');

        }
    } catch (error) {
        console.error('Error al registrar tipo de área:', error.message);
        // throw error;
    }
}

// Función para registrar un nuevo item en itemsarea
async function registerItemArea({ items, estado, idtiposdearea, idarea }) {
    try {
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO itemsarea (items, estado, idtiposdearea, idarea) VALUES ($1, $2, $3, $4) RETURNING *',
            [items, estado, idtiposdearea, idarea]
        );
        client.release();
        console.log('Item registrado con éxito:', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error al registrar item:', error);
        throw error;
    }
}


export {
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
    registerFicha,
    getTipoDeArea,
    registerTipoDeArea,
    registerItemArea,
    checkEmailExists

};