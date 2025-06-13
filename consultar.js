// index.js
const mysql = require('mysql2');
const faker = require('@faker-js/faker').faker;

const connection = mysql.createConnection({
  host: 'sql5.freesqldatabase.com',
  user: 'sql5784546',
  password: 'NEBq6v4FKw',
  database: 'sql5784546',
  port: 3306,
});

connection.connect(err => {
  if (err) throw err;
  console.log('✅ Conectado a la base de datos');

  const mangas = [];
  for (let i = 0; i < 3500; i++) {
    mangas.push([
      faker.commerce.productName(),
      faker.person.fullName(),
      faker.date.past().toISOString().slice(0, 10),
    ]);
  }

  const createTable = `CREATE TABLE IF NOT EXISTS mangas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255),
    autor VARCHAR(255),
    fecha_publicacion DATE
  )`;

  connection.query(createTable, err => {
    if (err) throw err;

    const insertQuery = 'INSERT INTO mangas (titulo, autor, fecha_publicacion) VALUES ?';
    connection.query(insertQuery, [mangas], (err, result) => {
      if (err) throw err;
      console.log(`✅ ${result.affectedRows} mangas insertados correctamente`);
      connection.end();
    });
  });
});

// consultar.js
const mysql2 = require('mysql2');

const conn = mysql2.createConnection({
  host: 'sql5.freesqldatabase.com',
  user: 'sql5784546',
  password: 'NEBq6v4FKw',
  database: 'sql5784546',
  port: 3306,
});

conn.connect(err => {
  if (err) throw err;
  console.log('✅ Conectado a la base de datos para consultar');

  conn.query('SELECT COUNT(*) AS total FROM mangas', (err, results) => {
    if (err) throw err;
    console.log(`📦 Total de mangas registrados: ${results[0].total}`);
    conn.end();
  });
});

