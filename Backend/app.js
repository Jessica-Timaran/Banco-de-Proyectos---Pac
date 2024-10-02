import express from 'express';
import cors from 'cors';
// import dataRoutes from './routes/dataroutes.js';
import adminRoutes from './routes/adminRoutes.js';
import saveRoutes from './routes/saveRoutes.js'
import aprendizRoutes from './routes/aprendizRoutes.js';
import superAdmin from './routes/superAdminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import promedioFinal from './routes/routesUser/promedioFinal.js'
import obtenerPromedio from './routes/routesUser/obtenerPromedio.js'
import { cookieMiddleware } from './middleware/cookieMiddleware.js';

const app = express();
const PORT = process.env.PORT || 4000;


// Configura el middleware de cookies
cookieMiddleware(app);

// Configura CORS para permitir el origen específico
app.use(cors({
    origin: /^https:\/\/.*--bancodeproyectospac\.netlify\.app$/,
    credentials: true,
}));

// Middleware para manejar solicitudes JSON y de URL codificadas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
// app.use('/api', dataRoutes); // Prefijo de ruta para las rutas de datos
app.use('/api/admin', adminRoutes);
app.use('/api/save', saveRoutes);
app.use('/api/aprendiz', aprendizRoutes);
app.use('/api/superAdmin', superAdmin);
app.use('/api/user', userRoutes);

app.use('/api/promedioFinal', promedioFinal);
app.use('/api/promedio', obtenerPromedio);

// Manejo de errores 1
app.use((err, req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://bancodeproyectospac.netlify.app'); // Ajusta al dominio exacto
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});


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
