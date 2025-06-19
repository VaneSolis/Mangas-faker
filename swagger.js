const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Mangas',
      version: '1.0.0',
      description: 'API para gestionar una colección de mangas con autenticación JWT',
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://mangas-faker-production.up.railway.app' 
          : 'http://localhost:3000',
        description: process.env.NODE_ENV === 'production' ? 'Servidor de producción' : 'Servidor de desarrollo',
      },
    ],
  },
  apis: ['./routes/*.js'], // archivos que contienen las anotaciones de Swagger
};

const specs = swaggerJsdoc(options);

module.exports = specs; 