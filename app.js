require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
const mangasRoutes = require('./routes/mangas');
const authRoutes = require('./routes/auth');
const User = require('./models/User');

const app = express();
const port = process.env.PORT || 3000;

// Configuración de CORS
const corsOptions = {
  origin: [
    'https://mangas-faker-production.up.railway.app',
    'http://localhost:3000',
    'http://localhost:3001',
    'https://swagger.io',
    'https://editor.swagger.io'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware para CORS
app.use(cors(corsOptions));

// Middleware para parsear JSON
app.use(express.json());

// Configuración de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas de la API de mangas
app.use('/api/mangas', mangasRoutes);

// Ruta de inicio
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a la API de Mangas',
    version: '1.0.0',
    documentation: '/api-docs',
    endpoints: {
      auth: '/api/auth',
      mangas: '/api/mangas'
    }
  });
});

// Ruta de health check para Railway
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Crear tabla de usuarios al iniciar la aplicación
async function initializeDatabase() {
  try {
    await User.createTable();
    console.log('✅ Tabla de usuarios creada/verificada correctamente');
  } catch (error) {
    console.error('❌ Error al crear la tabla de usuarios:', error);
  }
}

app.listen(port, async () => {
  await initializeDatabase();
  console.log(`🚀 Servidor corriendo en puerto ${port}`);
  console.log(`📚 Documentación disponible en /api-docs`);
  console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
}); 