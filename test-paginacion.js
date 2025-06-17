const mysql2 = require('mysql2');

const conn = mysql2.createConnection({
  host: 'sql5.freesqldatabase.com',
  user: 'sql5784546',
  password: 'NEBq6v4FKw',
  database: 'sql5784546',
  port: 3306,
});

// Función para obtener mangas paginados
async function obtenerMangasPaginados(pagina = 1, porPagina = 10) {
  return new Promise((resolve, reject) => {
    const offset = (pagina - 1) * porPagina;
    
    const query = `
      SELECT m.*, g.nombre as genero 
      FROM mangas m 
      LEFT JOIN generos g ON m.genero_id = g.id 
      LIMIT ? OFFSET ?
    `;
    
    conn.query(query, [porPagina, offset], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

// Función para obtener mangas por género
async function obtenerMangasPorGenero(generoId, pagina = 1, porPagina = 10) {
  return new Promise((resolve, reject) => {
    const offset = (pagina - 1) * porPagina;
    
    const query = `
      SELECT m.*, g.nombre as genero 
      FROM mangas m 
      LEFT JOIN generos g ON m.genero_id = g.id 
      WHERE m.genero_id = ?
      LIMIT ? OFFSET ?
    `;
    
    conn.query(query, [generoId, porPagina, offset], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

// Función para obtener todos los géneros
async function obtenerGeneros() {
  return new Promise((resolve, reject) => {
    conn.query('SELECT * FROM generos', (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

async function main() {
  try {
    console.log('=== PRUEBA DE PAGINACIÓN ===');
    console.log('\nPágina 1 de mangas:');
    const pagina1 = await obtenerMangasPaginados(1, 5);
    console.log(JSON.stringify(pagina1, null, 2));

    console.log('\nPágina 2 de mangas:');
    const pagina2 = await obtenerMangasPaginados(2, 5);
    console.log(JSON.stringify(pagina2, null, 2));

    console.log('\n=== PRUEBA DE MANGAS POR GÉNERO ===');
    // Primero obtenemos los géneros disponibles
    const generos = await obtenerGeneros();
    console.log('\nGéneros disponibles:');
    console.log(JSON.stringify(generos, null, 2));

    // Obtenemos mangas del primer género (Shonen)
    console.log('\nMangas de género Shonen (ID: 1):');
    const mangasShonen = await obtenerMangasPorGenero(1, 1, 5);
    console.log(JSON.stringify(mangasShonen, null, 2));

    // Obtenemos mangas del segundo género (Shojo)
    console.log('\nMangas de género Shojo (ID: 2):');
    const mangasShojo = await obtenerMangasPorGenero(2, 1, 5);
    console.log(JSON.stringify(mangasShojo, null, 2));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    conn.end();
  }
}

main(); 