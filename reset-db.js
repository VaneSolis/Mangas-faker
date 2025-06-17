const mysql2 = require('mysql2');

const connection = mysql2.createConnection({
  host: 'sql5.freesqldatabase.com',
  user: 'sql5784546',
  password: 'NEBq6v4FKw',
  database: 'sql5784546',
  port: 3306,
});

connection.connect(err => {
  if (err) throw err;
  console.log('✅ Conectado a la base de datos');

  // Eliminar tablas si existen
  connection.query('DROP TABLE IF EXISTS mangas', err => {
    if (err) throw err;
    console.log('✅ Tabla mangas eliminada correctamente');

    connection.query('DROP TABLE IF EXISTS generos', err => {
      if (err) throw err;
      console.log('✅ Tabla generos eliminada correctamente');
      connection.end();
    });
  });
}); 