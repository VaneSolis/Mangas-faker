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

  // Crear tabla de géneros
  const createGenerosTable = `CREATE TABLE IF NOT EXISTS generos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
  )`;

  connection.query(createGenerosTable, err => {
    if (err) throw err;
    console.log('✅ Tabla de géneros creada correctamente');

    // Insertar géneros de ejemplo
    const generos = [
      ['Shonen'],
      ['Shojo'],
      ['Seinen'],
      ['Josei'],
      ['Mecha'],
      ['Fantasy'],
      ['Horror'],
      ['Romance']
    ];

    const insertGeneros = 'INSERT INTO generos (nombre) VALUES ?';
    connection.query(insertGeneros, [generos], (err, result) => {
      if (err) throw err;
      console.log(`✅ ${result.affectedRows} géneros insertados correctamente`);

      // Crear tabla de mangas
      const createMangasTable = `CREATE TABLE IF NOT EXISTS mangas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(255),
        autor VARCHAR(255),
        fecha_publicacion DATE,
        genero_id INT,
        FOREIGN KEY (genero_id) REFERENCES generos(id)
      )`;

      connection.query(createMangasTable, err => {
        if (err) throw err;
        console.log('✅ Tabla de mangas creada correctamente');

        // Insertar mangas
        const mangas = [];
        for (let i = 0; i < 3500; i++) {
          mangas.push([
            faker.commerce.productName(),
            faker.person.fullName(),
            faker.date.past().toISOString().slice(0, 10),
            Math.floor(Math.random() * 8) + 1
          ]);
        }
        const insertMangas = 'INSERT INTO mangas (titulo, autor, fecha_publicacion, genero_id) VALUES ?';
        connection.query(insertMangas, [mangas], (err, result) => {
          if (err) throw err;
          console.log(`✅ ${result.affectedRows} mangas insertados correctamente`);
          connection.end();
        });
      });
    });
  });
}); 