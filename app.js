const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
const mangasRoutes = require('./routes/mangas');
const authRoutes = require('./routes/auth');
const User = require('./models/User');

const app = express();
const port = 3000;

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
  res.send('Bienvenido a la API de Mangas. Visita /api-docs para ver la documentación.');
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
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  console.log(`📚 Documentación disponible en http://localhost:${port}/api-docs`);
}); 