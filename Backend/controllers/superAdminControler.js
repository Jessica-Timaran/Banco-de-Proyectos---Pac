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

  

export async function getAllCategorias() {
    try {
        const client = await pool.connect();
        const query = `
          SELECT idcategoriasalcance, nombre
          FROM categoriasalcance;
        `;
        const result = await client.query(query);
        client.release();
        return result.rows;
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        throw error;
    }
}


export const insertAlcance = async (req, res) => {
    const { descripcion, idcategoriasalcance } = req.body;
  
    // Validar si los datos requeridos están presentes
    if (!descripcion || !idcategoriasalcance) {
      console.log('Faltan datos requeridos:', { descripcion, idcategoriasalcance });
      return res.status(400).json({ message: 'Faltan datos requeridos.' });
    }
  
    const query = `
      INSERT INTO alcance (descripcion, idcategoriasalcance)
      VALUES ($1, $2)
      RETURNING *;
    `;
  
    const values = [descripcion, idcategoriasalcance];
  
    try {
      const result = await pool.query(query, values); // pool.query para ejecutar la consulta
      console.log('Alcance insertado:', result.rows[0]);
      res.status(201).json(result.rows[0]); // Retorna el alcance insertado
    } catch (error) {
      console.error('Error al insertar alcance:', error);
      res.status(500).json({ message: 'No se pudo insertar el alcance' });
    }
  };

export const insertObjetivo = async (req, res) => {
    const { descripcion, idcategoriasobjetivos } = req.body;

    // Validar si los datos requeridos están presentes
    if (!descripcion || !idcategoriasobjetivos) {
        console.log('Faltan datos requeridos:', { descripcion, idcategoriasobjetivos });
        return res.status(400).json({ message: 'Faltan datos requeridos.' });
    }

    const query = `
        INSERT INTO objetivos (descripcion, idcategoriasobjetivos)
        VALUES ($1, $2)
        RETURNING *;
    `;

    const values = [descripcion, idcategoriasobjetivos];

    try {
        const result = await pool.query(query, values); // Use pool.query here
        console.log('Objetivo insertado:', result.rows[0]);
        res.status(201).json(result.rows[0]); // Retorna el objetivo insertado
    } catch (error) {
        console.error('Error al insertar objetivo:', error);
        res.status(500).json({ message: 'No se pudo insertar el objetivo' });
    }
}; 

export async function insertItem(req, res) {
    const { tipoArea, itemName } = req.body;

    if (!tipoArea || !itemName) {
        console.log('Faltan datos requeridos:', { tipoArea, itemName });
        return res.status(400).json({ message: 'Faltan datos requeridos.' });
    }

    try {
        const query = `
            INSERT INTO items (idtiposdearea, items)
            VALUES ($1, $2)
            RETURNING *;
        `;
        const values = [tipoArea, itemName];
        const result = await pool.query(query, values);
        console.log('Ítem insertado:', result.rows[0]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al insertar el ítem:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
}

export async function getTiposDeArea(req, res) {
    try {
        const query = `
            SELECT
                idtiposdearea,
                tiposdearea
            FROM
                tipodearea;
        `;
        const result = await pool.query(query); // Ejecutamos la consulta
        res.status(200).json(result.rows); // Accedemos a los resultados con result.rows
    } catch (error) {
        console.error('Error al obtener los tipos de área:', error);
        res.status(500).json({ message: 'Error al obtener los tipos de área' });
    }
}
// Obtener los items por id de tipo de área
export async function getItemsByTipoDeArea(req, res) {
    const { idtiposdearea } = req.params; // Obtenemos el id del tipo de área desde la URL
    try {
        const query = `
            SELECT 
                iditemsarea, 
                items, 
                idtiposdearea
            FROM 
                items
            WHERE 
                idtiposdearea = $1;
        `;
        const result = await pool.query(query, [idtiposdearea]); // Ejecutamos la consulta con parámetro
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron items para el tipo de área proporcionado' });
        }
        res.status(200).json(result.rows); // Accedemos a los resultados con result.rows
    } catch (error) {
        console.error('Error al obtener los items por tipo de área:', error);
        res.status(500).json({ message: 'Error al obtener los items por tipo de área' });
    }
}


// Función asincrónica para agregar un nuevo tipo de área
    const addTipoDeArea = async (req, res) => {
    const { nombreTipoArea, idarea } = req.body;

    if (!nombreTipoArea || !idarea) {
        return res.status(400).json({ error: 'Nombre del tipo de área y ID de área son requeridos.' });
    }

    try {
        // Ejecutar la consulta para insertar el nuevo tipo de área
        const result = await pool.query(
            'INSERT INTO tipodearea (tiposdearea, idarea) VALUES ($1, $2) RETURNING *',
            [nombreTipoArea, idarea]
        );

        res.status(201).json(result.rows[0]);  // Devuelve el nuevo tipo de área insertado
    } catch (error) {
        console.error('Error al insertar tipo de área:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};


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
        idficha: idrol === 4 && idficha ? parseInt(idficha, 10) : null,  // Solo guarda idficha si el rol es "Aprendiz"
      };
  
      const resultado = await pool.query(
        'INSERT INTO personas (nombre, tipodocumento, numerodocumento, correo, contraseña, telefono, idrol, idficha) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [nombre, tipodocumento, numerodocumento, correo, contraseña, celular, nuevaPersona.idrol, nuevaPersona.idficha]
      );
  
      res.status(201).json({ message: 'Usuario registrado exitosamente', usuario: resultado.rows[0] });
    } catch (error) {
      console.error('Error al registrar persona:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  }
  


// Función para obtener todos los proyectos de la base de datos
async function obtenerTodosLosProyectos() {
    try {
        console.log('Obteniendo todos los proyectos...');
        const cliente = await pool.connect();
        const consulta = 'SELECT idproyecto, nombre, responsable, estado  FROM proyecto';
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
        const result = await client.query('SELECT idficha, nombre, numeroficha FROM ficha');
        client.release();
        return result.rows;
    } catch (error) {
        console.error('Error al obtener fichas:', error);
        throw error;
    }
}


// Controlador para registrar un área
async function registerArea({ area }) {
    try {
        // Asegúrate de que 'area' no sea undefined
        if (!area) {
            throw new Error('El campo "area" es obligatorio.');
        }

        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO area (area) VALUES ($1) RETURNING *',
            [area.trim()]
        );
        client.release();
        console.log('Área registrada con éxito:', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error al registrar el área:', error);
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


export async function getItemsByAreaAndType(idarea, idtiposdearea) {
    try {
        const client = await pool.connect();
        const query = `
            SELECT items.iditems, items.items, tipo_de_area.tiposdearea, area.area
            FROM items
            INNER JOIN tipo_de_area ON items.idtiposdearea = tipo_de_area.idtiposdearea
            INNER JOIN area ON tipo_de_area.idarea = area.idarea
            WHERE items.idarea = $1 AND items.idtiposdearea = $2
        `;
        const result = await client.query(query, [idarea, idtiposdearea]);
        client.release();
        return result.rows;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
}


export async function registerComplete(req, res) {
    console.log('Received registerComplete request');
    console.log('Request body:', req.body);
  
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
  
      const { area, tiposDeArea, items, categoriaObjetivos, objetivos, categoriaAlcance, alcances } = req.body;
  
      // Registrar área
      const areaResult = await client.query('INSERT INTO area (area) VALUES ($1) RETURNING idarea', [area]);
      const areaId = areaResult.rows[0].idarea;
  
      // Registrar tipos de área y obtener sus IDs
      const tiposDeAreaIds = [];
      for (const tipoArea of tiposDeArea) {
        const tipoAreaResult = await client.query(
          'INSERT INTO tipodearea (tiposdearea, idarea) VALUES ($1, $2) RETURNING idtiposdearea',
          [tipoArea, areaId]
        );
        tiposDeAreaIds.push(tipoAreaResult.rows[0].idtiposdearea);
      }
  
      // Registrar ítems asociados con área y tipo de área
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        // Asumimos que cada item corresponde a un tipo de área en el mismo orden
        // Si hay más items que tipos de área, se repite cíclicamente
        const tipoAreaId = tiposDeAreaIds[i % tiposDeAreaIds.length];
        await client.query(
          'INSERT INTO items (items, idarea, idtiposdearea) VALUES ($1, $2, $3)',
          [item, areaId, tipoAreaId]
        );
      }
  
      // Registrar categoría de objetivos
      const catObjResult = await client.query(
        'INSERT INTO categoriasobjetivos (nombre) VALUES ($1) RETURNING idcategoriasobjetivos',
        [categoriaObjetivos]
      );
      const catObjId = catObjResult.rows[0].idcategoriasobjetivos;
  
      // Registrar objetivos
      for (const objetivo of objetivos) {
        await client.query(
          'INSERT INTO objetivos (descripcion, idcategoriasobjetivos) VALUES ($1, $2)',
          [objetivo, catObjId]
        );
      }
  
      // Registrar categoría de alcance
      const catAlcResult = await client.query(
        'INSERT INTO categoriasalcance (nombre) VALUES ($1) RETURNING idcategoriasalcance',
        [categoriaAlcance]
      );
      const catAlcId = catAlcResult.rows[0].idcategoriasalcance;
  
      // Registrar alcances
      for (const alcance of alcances) {
        await client.query(
          'INSERT INTO alcance (descripcion, idcategoriasalcance) VALUES ($1, $2)',
          [alcance, catAlcId]
        );
      }
  
      await client.query('COMMIT');
      res.status(201).json({ message: 'Registro completo realizado con éxito' });
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error en el registro completo:', error);
      res.status(500).json({ message: 'Error al realizar el registro completo', error: error.message });
    } finally {
      client.release();
    }
  }

  // Función para registrar una nueva ficha
export async function registerFicha(req, res) {
    const { nombre, numeroficha } = req.body;

    try {
        console.log('Datos recibidos en registerFicha:', { nombre, numeroficha });
        
        const client = await pool.connect();
        
        // Insertar la ficha en la tabla fichas
        const result = await client.query(
            'INSERT INTO ficha (nombre, numeroficha) VALUES ($1, $2) RETURNING *',
            [nombre, numeroficha]
        );

        client.release();
        console.log('Ficha registrada con éxito:', result.rows[0]);

        // Enviar la respuesta al cliente con la ficha registrada
        return res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al registrar ficha:', error);
        return res.status(500).json({ error: 'Error al registrar ficha' });
    }
}





export {
    getAllPersonas,
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
    registerItemArea,
    checkEmailExists,
    getItemsPorAreaYTipo,
    addTipoDeArea
};