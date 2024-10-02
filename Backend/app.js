const app = express();
const PORT = process.env.PORT || 4000;

// Configura CORS para permitir el origen específico y las credenciales
app.use(cors({
    origin: 'https://bancodeproyectospac.netlify.app', // Permite tu dominio exacto
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Permitir métodos HTTP
    allowedHeaders: ['Content-Type', 'Authorization'], // Ajusta los encabezados permitidos
    credentials: true, // Permitir el uso de cookies/credenciales
}));

// Middleware para manejar solicitudes JSON y de URL codificadas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use('/api/admin', adminRoutes);
app.use('/api/save', saveRoutes);
app.use('/api/aprendiz', aprendizRoutes);
app.use('/api/superAdmin', superAdmin);
app.use('/api/user', userRoutes);
app.use('/api/promedioFinal', promedioFinal);
app.use('/api/promedio', obtenerPromedio);

// Middleware de manejo de errores CORS (si es necesario)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://bancodeproyectospac.netlify.app');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // Responde OK para solicitudes preflight
    }
    next();
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Error interno del servidor.', details: err.message });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
