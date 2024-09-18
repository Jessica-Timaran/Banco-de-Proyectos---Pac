import { pool } from '../../config/db.js';


 //-----------En este controlador obtengo el promedio final de la bd---------



  const obtenerPromedioFinalProyecto = async (req, res) => {
    try {
      const { idproyecto } = req.params;
  
      // Consulta SQL directa usando pool
      const result = await pool.query(
        `SELECT puntosobjetivos, puntosalcance
         FROM proyecto
         WHERE idproyecto = $1`, // Usamos $1 para los parámetros en PostgreSQL
        [idproyecto] // Array de valores para reemplazar los placeholders en la consulta
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Proyecto no encontrado' });
      }
  
      const proyecto = result.rows[0];
      return res.json(proyecto);
    } catch (error) {
      console.error('Error al obtener los datos del proyecto:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  };




export {
  
  obtenerPromedioFinalProyecto
 };