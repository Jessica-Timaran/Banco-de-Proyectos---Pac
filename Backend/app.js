import express from 'express';
import cors from 'cors';
// import dataRoutes from './routes/dataroutes.js';
import adminRoutes from './routes/adminRoutes.js';
import aprendizRoutes from './routes/aprendizRoutes.js';
import superAdmin from './routes/superAdminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { cookieMiddleware } from './middleware/cookieMiddleware.js';

const app = express();
const PORT = 4000;

// Configura el middleware de cookies
cookieMiddleware(app);

// Configura CORS para permitir el origen específico
app.use(cors({
    origin: 'http://localhost:5173', // Reemplaza con el origen de tu frontend
    credentials: true // Permite el uso de cookies en la solicitud
}));

// Middleware para manejar solicitudes JSON y de URL codificadas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
// app.use('/api', dataRoutes); // Prefijo de ruta para las rutas de datos
app.use('/api/admin', adminRoutes);
app.use('/api/aprendiz', aprendizRoutes);
app.use('/api/superAdmin', superAdmin);
app.use('/api/user', userRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!', details: err.message });
});

// Manejador global de errores
app.use((err, req, res, next) => {
    console.error('Error global:', err);
    res.status(500).json({ error: 'Error interno del servidor.' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
