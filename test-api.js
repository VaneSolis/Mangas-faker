const axios = require('axios');

const API_BASE = 'http://localhost:3000/api';

async function testAPI() {
  try {
    console.log('🧪 Probando la API de Mangas con JWT...\n');

    // 1. Registrar un usuario
    console.log('1️⃣ Registrando usuario...');
    const registerResponse = await axios.post(`${API_BASE}/auth/register`, {
      username: 'usuario_test',
      email: 'test@example.com',
      password: '123456'
    });
    console.log('✅ Usuario registrado:', registerResponse.data.message);
    const token = registerResponse.data.token;
    console.log('🔑 Token recibido:', token.substring(0, 20) + '...\n');

    // 2. Hacer login
    console.log('2️⃣ Haciendo login...');
    const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
      email: 'test@example.com',
      password: '123456'
    });
    console.log('✅ Login exitoso:', loginResponse.data.message);
    const loginToken = loginResponse.data.token;
    console.log('🔑 Token de login:', loginToken.substring(0, 20) + '...\n');

    // 3. Obtener perfil (requiere token)
    console.log('3️⃣ Obteniendo perfil...');
    const profileResponse = await axios.get(`${API_BASE}/auth/profile`, {
      headers: { Authorization: `Bearer ${loginToken}` }
    });
    console.log('✅ Perfil obtenido:', profileResponse.data.user);
    console.log('');

    // 4. Obtener mangas (público)
    console.log('4️⃣ Obteniendo lista de mangas...');
    const mangasResponse = await axios.get(`${API_BASE}/mangas?pagina=1&porPagina=5`);
    console.log('✅ Mangas obtenidos:', mangasResponse.data.mangas.length, 'mangas');
    console.log('📖 Primer manga:', mangasResponse.data.mangas[0]?.titulo);
    console.log('');

    // 5. Obtener total de mangas
    console.log('5️⃣ Obteniendo total de mangas...');
    const totalResponse = await axios.get(`${API_BASE}/mangas/total`);
    console.log('✅ Total de mangas:', totalResponse.data.total);
    console.log('');

    // 6. Crear un nuevo manga (requiere token)
    console.log('6️⃣ Creando un nuevo manga...');
    const newManga = {
      titulo: 'Manga de Prueba',
      autor: 'Autor de Prueba',
      fecha_publicacion: '2024-01-01',
      genero_id: 1
    };
    const createResponse = await axios.post(`${API_BASE}/mangas`, newManga, {
      headers: { Authorization: `Bearer ${loginToken}` }
    });
    console.log('✅ Manga creado:', createResponse.data.message);
    console.log('🆔 ID del manga:', createResponse.data.id);
    console.log('');

    // 7. Obtener mangas por género
    console.log('7️⃣ Obteniendo mangas por género (Shonen)...');
    const generoResponse = await axios.get(`${API_BASE}/mangas/genero/1?pagina=1&porPagina=3`);
    console.log('✅ Mangas de Shonen:', generoResponse.data.mangas.length, 'mangas');
    console.log('📖 Primer manga Shonen:', generoResponse.data.mangas[0]?.titulo);
    console.log('');

    console.log('🎉 ¡Todas las pruebas completadas exitosamente!');
    console.log('📚 Visita http://localhost:3000/api-docs para ver la documentación completa');

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

// Ejecutar las pruebas
testAPI(); 