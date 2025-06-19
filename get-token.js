const axios = require('axios');

async function getToken() {
  try {
    console.log('🔑 Generando token JWT...\n');
    
    const response = await axios.post('http://localhost:3000/api/auth/register', {
      username: 'swagger_user',
      email: 'swagger@test.com',
      password: '123456'
    });
    
    console.log('✅ Usuario registrado exitosamente');
    console.log('🔑 Token JWT:');
    console.log(response.data.token);
    console.log('\n📋 Copia este token y pégalo en Swagger en el campo "Value"');
    console.log('📍 Luego haz clic en "Authorize" y podrás probar los endpoints protegidos');
    
  } catch (error) {
    if (error.response?.data?.error?.includes('ya está registrado')) {
      console.log('🔄 Usuario ya existe, intentando login...\n');
      
      const loginResponse = await axios.post('http://localhost:3000/api/auth/login', {
        email: 'swagger@test.com',
        password: '123456'
      });
      
      console.log('✅ Login exitoso');
      console.log('🔑 Token JWT:');
      console.log(loginResponse.data.token);
      console.log('\n📋 Copia este token y pégalo en Swagger en el campo "Value"');
      console.log('📍 Luego haz clic en "Authorize" y podrás probar los endpoints protegidos');
    } else {
      console.error('❌ Error:', error.response?.data || error.message);
    }
  }
}

getToken(); 