const mysql2 = require('mysql2');

const conn = mysql2.createConnection({
  host: 'sql5.freesqldatabase.com',
  user: 'sql5784546',
  password: 'NEBq6v4FKw',
  database: 'sql5784546',
  port: 3306,
});

// Función para obtener mangas paginados
function obtenerMangasPaginados(pagina = 1, porPagina = 10) {
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

// Función para obtener el total de mangas
function obtenerTotalMangas() {
  return new Promise((resolve, reject) => {
    conn.query('SELECT COUNT(*) as total FROM mangas', (err, results) => {
      if (err) reject(err);
      resolve(results[0].total);
    });
  });
}

// Función para obtener mangas por género
function obtenerMangasPorGenero(generoId, pagina = 1, porPagina = 10) {
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

// Ejemplo de uso
async function main() {
  try {
    // Obtener primera página de mangas
    const pagina1 = await obtenerMangasPaginados(1, 10);
    console.log('Primera página de mangas:', pagina1);

    // Obtener total de mangas
    const total = await obtenerTotalMangas();
    console.log('Total de mangas:', total);

    // Obtener mangas de género Shonen (ID: 1)
    const mangasShonen = await obtenerMangasPorGenero(1, 1, 10);
    console.log('Mangas de género Shonen:', mangasShonen);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    conn.end();
  }
}

main(); 