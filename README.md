# 🎌 API de Mangas con JWT

API REST para gestionar una colección de mangas con autenticación JWT, paginación y documentación Swagger.

## 🚀 Características

- ✅ Autenticación JWT
- ✅ Paginación de resultados
- ✅ Filtrado por géneros
- ✅ Documentación Swagger
- ✅ Roles de usuario (user/admin)
- ✅ Base de datos MySQL
- ✅ Despliegue en Railway

## 📋 Endpoints

### Autenticación
- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Inicio de sesión
- `GET /api/auth/profile` - Perfil del usuario (requiere token)

### Mangas (Públicos)
- `GET /api/mangas` - Lista paginada de mangas
- `GET /api/mangas/:id` - Obtener manga por ID
- `GET /api/mangas/genero/:generoId` - Mangas por género
- `GET /api/mangas/total` - Total de mangas

### Mangas (Protegidos)
- `POST /api/mangas` - Crear manga (requiere token)
- `PUT /api/mangas/:id` - Actualizar manga (requiere token)
- `DELETE /api/mangas/:id` - Eliminar manga (requiere admin)

## 🛠️ Instalación Local

1. **Clonar el repositorio:**
```bash
git clone <tu-repositorio>
cd mangas-faker
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**
```bash
cp env.example .env
# Editar .env con tus credenciales
```

4. **Poblar la base de datos:**
```bash
node poblar-db.js
```

5. **Iniciar el servidor:**
```bash
npm start
```

## 🌐 Despliegue en Railway

1. **Conectar con GitHub:**
   - Ve a [Railway](https://railway.app)
   - Conecta tu repositorio de GitHub

2. **Configurar variables de entorno en Railway:**
   - `DB_HOST`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`
   - `DB_PORT`
   - `JWT_SECRET`
   - `NODE_ENV=production`

3. **Desplegar:**
   - Railway detectará automáticamente el `Procfile`
   - El proyecto se desplegará automáticamente

## 📚 Documentación

- **Swagger UI:** `/api-docs`
- **Health Check:** `/health`

## 🔧 Variables de Entorno

```env
DB_HOST=tu_host_mysql
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=tu_database
DB_PORT=3306
JWT_SECRET=tu_clave_secreta
NODE_ENV=production
PORT=3000
```

## 🧪 Pruebas

```bash
# Probar la API
npm test

# Obtener token JWT
node get-token.js
```

## 📁 Estructura del Proyecto

```
mangas-faker/
├── app.js                 # Punto de entrada
├── swagger.js            # Configuración Swagger
├── models/               # Modelos de datos
│   ├── Manga.js
│   └── User.js
├── controllers/          # Controladores
│   ├── mangaController.js
│   └── authController.js
├── routes/              # Rutas
│   ├── mangas.js
│   └── auth.js
├── middleware/          # Middleware
│   └── auth.js
└── Procfile            # Configuración Railway
```

## 🔐 Autenticación

Para usar endpoints protegidos, incluye el header:
```
Authorization: Bearer <tu_token_jwt>
```

## 📝 Licencia

MIT
