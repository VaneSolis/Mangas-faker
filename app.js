const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
const mangasRoutes = require('./routes/mangas');

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Configuración de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Rutas de la API
app.use('/api/mangas', mangasRoutes);

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Mangas. Visita /api-docs para ver la documentación.');
});

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  console.log(`📚 Documentación disponible en http://localhost:${port}/api-docs`);
}); 