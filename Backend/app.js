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
    origin: (origin, callback) => {
        const whitelist = [
            'https://bancodeproyectospac.netlify.app',
            /^https:\/\/[a-zA-Z0-9]+--bancodeproyectospac\.netlify\.app$/
        ];
        if (whitelist.some(pattern => typeof pattern === 'string' ? pattern === origin : pattern.test(origin))) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
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

app.use((req, res, next) => {
    const origin = req.headers.origin;
    const whitelist = [
        'https://bancodeproyectospac.netlify.app',
        /^https:\/\/[a-zA-Z0-9]+--bancodeproyectospac\.netlify\.app$/
    ];
    if (whitelist.some(pattern => typeof pattern === 'string' ? pattern === origin : pattern.test(origin))) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
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
